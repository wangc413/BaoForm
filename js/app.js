// ============================================================
// 核心逻辑（计算、切换、渲染）
// 依赖：PRODUCTS 已由 hema.js / kuailehou.js 注入全局
//
// 领料单取整规则（REQUISITION 行字段）：
//   flour: true         — 小麦粉总量 ÷ flour行数 ÷ 25 向上取整到袋 × 25（kg）
//   roundUpTo: N        — ⌈用量 ÷ N⌉ × N（酵母补10、鸡精补5、老抽补6.4、猪油补15、倒三七/后腿肉/味精补25、白砂糖补50）
//   plusOne: true       — ⌈用量⌉ + 1（膨松剂、皮冻粉：13.56→15，16.1→18）
//   roundPlus: N        — 四舍五入取整 + N（食用盐、鲜姜、小香葱 +5）
//   都没有              — perBox × 箱数，保留两位小数（默认）
// 优先级：flour > roundUpTo > plusOne > roundPlus > 默认
// ============================================================

const FLOUR_KG_PER_BAG = 25;
let currentChannel = 'hema';
let currentKey = 'roubao';
let lastPrint = null; // { channelName, productLabel, boxes, rows:[{maker,spec,unit,qty}] }
let hasResult = false; // 当前是否已经渲染过结果，用于切换产品时决定要不要自动重算

function currentProduct() {
  return PRODUCTS[currentChannel]?.[currentKey] || { label: '', materials: [], requisition: [], filling: [], mixfill: [], dough: [] };
}

// 渠道切换时重建产品按钮
function renderProductSwitch() {
  const ps = document.getElementById('productSwitch');
  ps.innerHTML = '';
  const prods = PRODUCTS[currentChannel];
  currentKey = Object.keys(prods)[0];
  Object.entries(prods).forEach(([key, prod], idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tab' + (idx === 0 ? ' active' : '');
    btn.dataset.product = key;
    btn.textContent = prod.label;
    ps.appendChild(btn);
  });
  const firstProd = prods[currentKey];
  document.getElementById('inputLabel').textContent = `请输入${firstProd.label}入库箱数`;
  document.getElementById('tabMaterial').textContent = '原料用料计算表';
  const tabFilling = document.getElementById('tabFilling');
  tabFilling.style.display = firstProd.filling?.length > 0 ? '' : 'none';
  const tabMixfill = document.getElementById('tabMixfill');
  tabMixfill.style.display = firstProd.mixfill?.length > 0 ? '' : 'none';
  const tabDough = document.getElementById('tabDough');
  tabDough.style.display = firstProd.dough?.length > 0 ? '' : 'none';
}

// 显示格式化：标准用量最多 2 位小数（0.86/0.52 这类保留 2 位），其余用量 2 位小数
function formatStd(v) {
  const n = Number(v);
  const s = (Math.round(n * 100) / 100).toFixed(2);
  return s.endsWith('0') ? s.slice(0, -1) : s;
}
function formatQty(v) {
  return (Math.round(Number(v) * 100) / 100).toFixed(2);
}

// 公共锅次表头：fullCount 个整锅 + tailLabels 个尾锅（余量/均分）
function commonPotHead(fullCount, tailLabels, cols) {
  const th = [];
  if (cols <= 4 || fullCount < 4) {
    for (let i = 1; i <= fullCount; i++) th.push(`<th>第${i}锅</th>`);
    tailLabels.forEach(label => th.push(`<th>${label}</th>`));
    return th.join('');
  }
  th.push('<th>第1锅</th>');
  th.push(`<th colspan="${fullCount - 2}">第2 ~ 第${fullCount - 1}锅</th>`);
  th.push(`<th>第${fullCount}锅</th>`);
  tailLabels.forEach(label => th.push(`<th>${label}</th>`));
  return th.join('');
}

// 公共锅次单元格：fullCount 个 ✓，后面跟尾锅数值
function commonPotCells(fullCount, values, cols) {
  if (cols <= 4 || fullCount < 4) return values.map(v => `<td>${v}</td>`).join('');
  const tails = values.slice(fullCount);
  return `<td>${values[0]}</td><td colspan="${fullCount - 2}">✓</td>`
    + `<td>${values[fullCount - 1]}</td>`
    + tails.map(v => `<td>${v}</td>`).join('');
}

// 统一渲染「带锅次」的表（拌馅/和面）
// rows: [{name, maker, perBox, standard}]；showTotal 控制「总用量(kg)」列
// commonPlan 为 true 时，所有物料共用一个“整锅 + 尾锅”计划，而不是各算各的锅数
function renderPotTable(rows, boxes, opts = {}) {
  const { showTotal = false, commonPlan = false } = opts;
  const data = rows.map(m => {
    const total = m.perBox * boxes;
    const std = +m.standard || 0;
    const pots = std > 0 ? Math.ceil(total / std) : 1;
    const fullPots = std > 0 ? Math.floor(total / std) : 0;
    const remain = std > 0 ? +(total - fullPots * std).toFixed(2) : total;
    return { ...m, total, std, pots, fullPots, remain };
  });

  const headCells = [
    '<th>物料名称</th>',
    '<th>批号</th>',
    '<th>生产厂家</th>',
    '<th>标准用量(锅/kg)</th>',
  ];
  if (showTotal) headCells.push('<th>总用量(kg)</th>');

  // 规则（按最新确认）：
  //   frac = minRatio - 最大整锅数
  //   frac > 0.5：整锅数不变，剩余量放最后一锅（一锅“余量”）
  //   frac <= 0.5：退一锅，和前一锅平分（两锅“均分”）
  //   frac = 0：只做整锅，不做尾锅
  if (commonPlan && data.length > 0 && data.every(r => r.std > 0)) {
    const minRatio = Math.min(...data.map(r => r.total / r.std));
    const full = Math.floor(minRatio + 1e-9);
    const frac = minRatio - full;
    let fullCount, tailLabels, tailOf;
    if (frac > 0.5 + 1e-9) {
      fullCount = full;
      tailLabels = [`第${full + 1}锅（余量）`];
      tailOf = row => [ formatQty(row.total - fullCount * row.std) ];
    } else if (frac > 1e-9 && full > 0) {
      fullCount = full - 1;
      tailLabels = [`第${full}锅（均分）`, `第${full + 1}锅（均分）`];
      tailOf = row => {
        const rest = row.total - fullCount * row.std;
        return [ formatQty(rest / 2), formatQty(rest / 2) ];
      };
    } else if (frac > 1e-9) {
      fullCount = 0;
      tailLabels = ['第1锅（余量）'];
      tailOf = row => [ formatQty(row.total) ];
    } else {
      fullCount = full;
      tailLabels = [];
      tailOf = () => [];
    }
    const cols = fullCount + tailLabels.length;
    if (cols > 0) {
      const head = `<tr>${headCells.join('')}${commonPotHead(fullCount, tailLabels, cols)}</tr>`;
      const body = data.map(r => {
        const tails = tailOf(r);
        const values = Array(fullCount).fill('✓').concat(tails);
        const left = [
          `<td>${r.name}</td>`,
          `<td></td>`,
          `<td>${r.maker}</td>`,
          `<td>${formatStd(r.std)}</td>`,
        ];
        if (showTotal) left.push(`<td>${formatQty(r.total)}</td>`);
        return `<tr>${left.join('')}${commonPotCells(fullCount, values, cols)}</tr>`;
      }).join('');
      return { head, body };
    }
    // cols = 0：回落到逐行模式，至少显示一锅余量
  }

  // 逐行模式（原逻辑）：各物料按自己的锅数渲染
  const maxPots = Math.max(...data.map(r => r.pots), 1);
  let potHeadCols;
  if (maxPots <= 4) {
    potHeadCols = Array.from({ length: maxPots }, (_, i) => `<th>第${i + 1}锅</th>`).join('');
  } else {
    potHeadCols = `<th>第1锅</th><th colspan="${maxPots - 3}">第2 ~ 第${maxPots - 2}锅</th><th>第${maxPots - 1}锅</th><th>第${maxPots}锅</th>`;
  }

  headCells.push(potHeadCols);
  const head = `<tr>${headCells.join('')}</tr>`;

  const body = data.map(r => {
    const cellsRaw = [];
    for (let i = 0; i < maxPots; i++) {
      if (i < r.fullPots) cellsRaw.push('✓');
      else if (i === r.fullPots && r.remain > 0) cellsRaw.push(formatQty(r.remain));
      else cellsRaw.push('');
    }
    let cellHtml;
    if (maxPots <= 4) {
      cellHtml = cellsRaw.map(v => `<td>${v}</td>`).join('');
    } else {
      const first = cellsRaw[0];
      const secondLast = cellsRaw[maxPots - 2];
      const last = cellsRaw[maxPots - 1];
      const midCells = cellsRaw.slice(1, maxPots - 2);
      const midContent = midCells.every(v => v === '✓')
        ? '✓'
        : midCells.map((v, k) => v === '' ? '' : (v === '✓' ? '✓' : `${v}(第${k + 2}锅)`))
                  .filter(s => s !== '').join('，');
      cellHtml = `<td>${first}</td><td colspan="${maxPots - 3}">${midContent}</td><td>${secondLast}</td><td>${last}</td>`;
    }
    const left = [
      `<td>${r.name}</td>`,
      `<td></td>`,
      `<td>${r.maker}</td>`,
      `<td>${formatStd(r.std)}</td>`,
    ];
    if (showTotal) left.push(`<td>${formatQty(r.total)}</td>`);
    return `<tr>${left.join('')}${cellHtml}</tr>`;
  }).join('');

  return { head, body };
}

function onCalculate() {
  const inputEl = document.getElementById('numInput');
  const resultEl = document.getElementById('result');
  const tabBarEl = document.getElementById('tabBar');

  resultEl.style.display = 'none';
  tabBarEl.style.display = 'none';
  document.querySelectorAll('.calc-table').forEach(tb => tb.style.display = 'none');
  hasResult = false;

  const raw = inputEl.value.trim();
  if (raw === '') { showError('请先输入入库箱数'); return; }
  const boxes = Number(raw);
  if (!Number.isFinite(boxes)) { showError('输入无效，请输入合法数字'); return; }
  if (boxes <= 0) { showError('入库箱数必须大于 0'); return; }

  document.getElementById('boxHeader').textContent = `入库箱数：${boxes}`;

  const product = currentProduct();
  const { materials: mats = [], requisition: reqs = [], filling: fills = [], mixfill: mixs = [], dough: doughs = [] } = product;

  // 原料表
  let body1 = '';
  if (mats.length > 0) {
    const rows = mats.map(m =>
      `<tr><td>${m.name}</td><td>${m.category}</td><td>${m.perBox}</td><td>${(m.perBox * boxes).toFixed(2)}</td></tr>`
    );
    const sum = mats.reduce((s, m) => s + m.perBox * boxes, 0);
    rows.push(`<tr class="total-row"><td>合计</td><td></td><td></td><td>${sum.toFixed(2)}</td></tr>`);
    body1 = rows.join('');
  }
  document.getElementById('tableBody').innerHTML = body1;

  // 制馅单
  let bodyF = '';
  if (fills.length > 0) {
    const rows = fills.map(m =>
      `<tr><td>${m.name}</td><td>${m.category}</td><td>${m.perBox}</td><td>${(m.perBox * boxes).toFixed(2)}</td></tr>`
    );
    // 合计 = 所有项加起来 - 饮用水 - 白砂糖 - 食用盐 - 饮用水干料吸收水分
    const _skip = new Set(product.fillingTotalExclude || ['饮用水', '饮用水干料吸收水分', '白砂糖', '食用盐']);
    const sum = fills.filter(m => !_skip.has(m.name)).reduce((s, m) => s + m.perBox * boxes, 0);
    rows.push(`<tr class="total-row"><td>合计</td><td></td><td></td><td>${sum.toFixed(2)}</td></tr>`);
    bodyF = rows.join('');
  }
  document.getElementById('fillingBody').innerHTML = bodyF;

  // 拌馅记录表
  let mixHead = '', mixBody = '';
  if (mixs.length > 0) {
    const r = renderPotTable(mixs, boxes, { showTotal: true });
    mixHead = r.head; mixBody = r.body;
  }
  document.getElementById('mixfillHead').innerHTML = mixHead;
  document.getElementById('mixfillBody').innerHTML = mixBody;

  // 和面记录表
  let doughHead = '', doughBody = '';
  if (doughs.length > 0) {
    const r = renderPotTable(doughs, boxes, { showTotal: true, commonPlan: true });
    doughHead = r.head; doughBody = r.body;
  }
  document.getElementById('doughHead').innerHTML = doughHead;
  document.getElementById('doughBody').innerHTML = doughBody;

  // 领料单
  let body2 = '';
  const printRows = [];
  if (reqs.length > 0) {
    const wheat = mats.find(m => m.name === '小麦粉' || m.name === '小麦面粉');
    const flourRows = reqs.filter(r => r.flour).length;
    const flourKg = (wheat && flourRows > 0)
      ? Math.ceil(Number((wheat.perBox * boxes).toFixed(2)) / flourRows / FLOUR_KG_PER_BAG) * FLOUR_KG_PER_BAG
      : null;
    body2 = reqs.map((r, idx) => {
      const spec = r.spec || (mats[idx] ? mats[idx].name : '');
      const unit = r.unit || 'kg';
      let qty;
      if (r.flour) {
        qty = flourKg ?? 0;
      } else if (r.roundUpTo) {
        qty = Math.round(Math.ceil(r.perBox * boxes / r.roundUpTo) * r.roundUpTo * 100) / 100;
      } else if (r.plusOne) {
        qty = Math.ceil(r.perBox * boxes) + 1;
      } else if (r.roundPlus) {
        qty = Math.round(r.perBox * boxes) + r.roundPlus;
      } else {
        qty = (r.perBox * boxes).toFixed(2);
      }
      printRows.push({ maker: r.maker, spec, unit, qty });
      return `<tr><td>${r.maker}</td><td>${spec}</td><td>${unit}</td><td>${qty}</td><td></td></tr>`;
    }).join('');

    const channelSelect = document.getElementById('channelSelect');
    lastPrint = {
      channelName: channelSelect.options[channelSelect.selectedIndex].text,
      productLabel: PRODUCTS[currentChannel][currentKey].label,
      boxes,
      rows: printRows,
    };
    document.getElementById('printPreviewBtn').style.display = 'inline-block';
  }
  document.getElementById('requisitionBody').innerHTML = body2;

  tabBarEl.style.display = 'flex';
  // 切换产品后，原先激活的页签可能已被隐藏（比如从肉包切到没有制馅单的菜包），
  // 此时回退到「原料表」，避免显示一张没有对应页签的空表
  let activeTab = document.querySelector('#tabBar .tab.active');
  if (!activeTab || activeTab.style.display === 'none') {
    document.querySelectorAll('#tabBar .tab').forEach(t => t.classList.remove('active'));
    activeTab = document.getElementById('tabMaterial');
    activeTab.classList.add('active');
  }
  document.getElementById(activeTab.dataset.target).style.display = 'table';
  hasResult = true;
}

function showError(msg) {
  const resultEl = document.getElementById('result');
  resultEl.textContent = msg;
  resultEl.classList.add('error');
  resultEl.style.display = 'block';
}

function resetUI({ keepInput = false } = {}) {
  if (!keepInput) document.getElementById('numInput').value = '';
  hasResult = false;
  document.getElementById('result').style.display = 'none';
  document.getElementById('result').classList.remove('error');
  document.getElementById('tabBar').style.display = 'none';
  document.getElementById('printPreviewBtn').style.display = 'none';
  document.getElementById('printModal').classList.remove('open');
  document.querySelectorAll('.calc-table').forEach(tb => tb.style.display = 'none');
  // 页签复位到「原料表」，否则切换产品后会残留上一次激活的页签
  document.querySelectorAll('#tabBar .tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tabMaterial').classList.add('active');
}

// 切换产品/渠道时：之前已经出过结果、且输入仍然合法，就按新产品自动重算
function autoRecalculate(hadResult) {
  if (!hadResult) return;
  const raw = document.getElementById('numInput').value.trim();
  const boxes = Number(raw);
  if (raw === '' || !Number.isFinite(boxes) || boxes <= 0) return;
  onCalculate();
}

// ===== 打印预览 =====

function openPrintPreview() {
  if (!lastPrint) return;
  const date = new Date().toLocaleDateString('zh-CN');
  const rows = lastPrint.rows.map(r =>
    `<tr><td>${r.maker}</td><td>${r.spec}</td><td>${r.unit}</td><td class="hand">${r.qty}</td><td></td></tr>`
  ).join('');
  document.getElementById('printArea').innerHTML = `
    <h2 class="doc-title">领料单</h2>
    <div class="doc-meta">
      <span>渠道：${lastPrint.channelName}</span>
      <span>产品：${lastPrint.productLabel}</span>
      <span>入库箱数：${lastPrint.boxes}</span>
      <span>日期：${date}</span>
    </div>
    <table class="print-table">
      <thead>
        <tr><th>生产厂家</th><th>品名及规格</th><th>单位</th><th>实领数量</th><th>批次</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
  document.getElementById('printModal').classList.add('open');
}

document.getElementById('printPreviewBtn').addEventListener('click', openPrintPreview);
document.getElementById('doPrintBtn').addEventListener('click', () => window.print());
document.getElementById('closePrintBtn').addEventListener('click', () => {
  document.getElementById('printModal').classList.remove('open');
});
document.getElementById('printModal').addEventListener('click', function (e) {
  if (e.target === this) this.classList.remove('open');
});

// ===== 事件绑定 =====

// tab 切换（原料表 / 领料单）
document.getElementById('tabBar').addEventListener('click', function (e) {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  document.querySelectorAll('#tabBar .tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.calc-table').forEach(tb => {
    tb.style.display = tb.id === btn.dataset.target ? 'table' : 'none';
  });
});

// 产品切换（同一渠道内）
document.getElementById('productSwitch').addEventListener('click', function (e) {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  document.querySelectorAll('#productSwitch .tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentKey = btn.dataset.product;
  const label = PRODUCTS[currentChannel][currentKey].label;
  document.getElementById('inputLabel').textContent = `请输入${label}入库箱数`;
  document.getElementById('tabMaterial').textContent = '原料用料计算表';
  const tabFilling = document.getElementById('tabFilling');
  tabFilling.style.display = PRODUCTS[currentChannel][currentKey].filling?.length > 0 ? '' : 'none';
  const tabMixfill = document.getElementById('tabMixfill');
  tabMixfill.style.display = PRODUCTS[currentChannel][currentKey].mixfill?.length > 0 ? '' : 'none';
  const tabDough = document.getElementById('tabDough');
  tabDough.style.display = PRODUCTS[currentChannel][currentKey].dough?.length > 0 ? '' : 'none';
  // 保留箱数；如果切换前已经出过结果，按新产品自动重算
  const hadResult = hasResult;
  resetUI({ keepInput: true });
  autoRecalculate(hadResult);
});

// 渠道切换
document.getElementById('channelSelect').addEventListener('change', function () {
  // 保留箱数；如果切换前已经出过结果，按新渠道首个产品自动重算
  const hadResult = hasResult;
  currentChannel = this.value;
  document.body.dataset.brand = this.value;
  renderProductSwitch();
  resetUI({ keepInput: true });
  autoRecalculate(hadResult);
});

// 回车键触发计算
document.getElementById('numInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') onCalculate();
});

// PWA：注册 Service Worker；GitHub Pages（HTTPS）或 localhost 生效
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('Service Worker 注册失败：', err);
    });
  });
}
