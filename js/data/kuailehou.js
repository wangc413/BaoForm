// ============================================================
// 快乐猴渠道数据（配方来源：配方明细 2026.6.27）
// 产品：肉包 / 菜包 / 水饺 / 糯米鸡 / 菜团子
// 说明：各产品原料表、领料单等数据待补；数组为空时对应页签自动隐藏
// ============================================================

// 肉包原料表：按配方表（左表）折算，单箱 8kg（100 个 80g，馅 28g/皮 52g）
// 馅批次 100.05kg（13 行实际合计；表内 100 少算 0.05kg）、面皮批次 75.75kg
// 水/白砂糖/盐为馅料与皮料合并后的单箱总量；perBox 单位为 kg
const KH_ROUBAO_MATERIALS = [
  { name: '2#肉', category: '原料', perBox: 1.0075 },
  { name: '肥膘', category: '原料', perBox: 1.1474 },
  { name: '小香葱', category: '原料', perBox: 0.0980 },
  { name: '姜', category: '原料', perBox: 0.0560 },
  { name: '水', category: '原料', perBox: 1.6121 },
  { name: '白砂糖', category: '原料', perBox: 0.0427 },
  { name: '味精', category: '原料', perBox: 0.0196 },
  { name: '薄盐鸡精', category: '原料', perBox: 0.0140 },
  { name: '草菇老抽', category: '原料', perBox: 0.0616 },
  { name: '盐', category: '原料', perBox: 0.0286 },
  { name: '古越龙山黄酒3年陈', category: '原料', perBox: 0.0504 },
  { name: '白胡椒', category: '原料', perBox: 0.0028 },
  { name: '复配酸度调节剂', category: '添加剂', perBox: 0.0014 },
  { name: '五得利八星粉', category: '原料', perBox: 3.4323 },
  { name: '安琪酵母', category: '添加剂', perBox: 0.0275 },
  { name: '复配膨松剂', category: '添加剂', perBox: 0.0206 },
  { name: '猪油', category: '原料', perBox: 0.0343 },
  { name: '老面', category: '原料（半成品）', perBox: 0.3432 },
];
const KH_ROUBAO_REQUISITION = [];

// 菜包原料表：按配方表折算，单箱 7.68kg（96 个 80g，馅 28g/皮 52g）
// 馅批次 100kg、面皮批次 75.75kg；水/糖/盐/猪油为馅+皮合并值
const KH_CAIBAO_MATERIALS = [
  { name: '上海青', category: '原料', perBox: 1.8278 },
  { name: '香菇', category: '原料', perBox: 0.2688 },
  { name: '大豆油', category: '原料', perBox: 0.2419 },
  { name: '白砂糖', category: '原料', perBox: 0.0786 },
  { name: '香油', category: '原料', perBox: 0.0134 },
  { name: '盐', category: '原料', perBox: 0.0248 },
  { name: '味精', category: '原料', perBox: 0.0134 },
  { name: '薄盐鸡精', category: '原料', perBox: 0.0403 },
  { name: '胡萝卜', category: '原料', perBox: 0.1075 },
  { name: '猪油', category: '原料', perBox: 0.1405 },
  { name: '五得利八星粉', category: '原料', perBox: 3.2950 },
  { name: '安琪酵母', category: '添加剂', perBox: 0.0264 },
  { name: '水', category: '原料', perBox: 1.2521 },
  { name: '复配膨松剂', category: '添加剂', perBox: 0.0198 },
  { name: '老面', category: '原料（半成品）', perBox: 0.3295 },
];
const KH_CAIBAO_REQUISITION = [];

// 水饺原料表：按配方表折算，单箱 8kg（400 个 20g，馅 10g/皮 10g）
// 馅批次 100kg、皮批次 153.8kg；水/盐为馅+皮合并值；大葱油/馅料宝按半成品列示
const KH_SHUIJIAO_MATERIALS = [
  { name: '鸡胸肉', category: '原料', perBox: 0.3600 },
  { name: '肥膘', category: '原料', perBox: 1.0400 },
  { name: '大豆蛋白', category: '原料', perBox: 0.3000 },
  { name: '冻荠菜', category: '原料', perBox: 0.3200 },
  { name: '大葱', category: '原料', perBox: 0.1200 },
  { name: '包菜', category: '原料', perBox: 0.2400 },
  { name: '冻干上海青', category: '原料', perBox: 0.3200 },
  { name: '姜', category: '原料', perBox: 0.0480 },
  { name: '大葱油', category: '原料（半成品）', perBox: 0.1200 },
  { name: '馅料宝', category: '原料（半成品）', perBox: 0.3200 },
  { name: '草菇老抽', category: '原料', perBox: 0.0480 },
  { name: '猪骨素', category: '原料', perBox: 0.0600 },
  { name: '荠菜香精', category: '原料', perBox: 0.0060 },
  { name: '盐', category: '原料', perBox: 0.0330 },
  { name: '味精', category: '原料', perBox: 0.0280 },
  { name: '木薯淀粉', category: '原料', perBox: 0.0600 },
  { name: '鸡肉精粉', category: '原料', perBox: 0.0320 },
  { name: '大骨汤粉', category: '原料', perBox: 0.0120 },
  { name: '五香粉', category: '原料', perBox: 0.0060 },
  { name: '水', category: '原料', perBox: 1.8144 },
  { name: '醋酸酯淀粉', category: '原料', perBox: 0.0780 },
  { name: '五得利七星粉', category: '原料', perBox: 2.6008 },
  { name: '改良剂', category: '添加剂', perBox: 0.0208 },
  { name: '乳化剂', category: '添加剂', perBox: 0.0130 },
];
const KH_SHUIJIAO_REQUISITION = [];

// 糯米鸡原料表：按配方表折算，单箱 9.6kg（64 个 150g，皮 105g/馅 45g）
// 拌米批次 121kg、炒馅批次 100.3kg；蒸制糯米、腌鸡胸肉按半成品列示
// 大豆油为拌米 3kg + 炒馅 4kg 合并值
const KH_NUOMIJI_MATERIALS = [
  // 拌米（皮）：批次用量 ×（6.72 ÷ 121）
  { name: '蒸制糯米', category: '原料（半成品）', perBox: 5.5537 },
  { name: '大豆油', category: '原料', perBox: 0.2815 },
  { name: '水', category: '原料', perBox: 0.9997 },
  // 炒馅：批次用量 ×（2.88 ÷ 100.3）
  { name: '香菇', category: '原料', perBox: 0.2297 },
  { name: '腌鸡胸肉', category: '原料（半成品）', perBox: 0.8327 },
  { name: '胡萝卜', category: '原料', perBox: 0.2871 },
  { name: '蒜蓉', category: '原料', perBox: 0.0144 },
  { name: '姜', category: '原料', perBox: 0.0086 },
  { name: '红葱酥', category: '原料', perBox: 0.0144 },
  { name: '草菇老抽', category: '原料', perBox: 0.1062 },
  { name: '味精', category: '原料', perBox: 0.0230 },
  { name: '食盐', category: '原料', perBox: 0.0230 },
  { name: '白糖', category: '原料', perBox: 0.1235 },
  { name: '芬美兹CH805', category: '原料', perBox: 0.0086 },
  { name: '玉米淀粉', category: '原料', perBox: 0.0718 },
  { name: '香菇水', category: '原料', perBox: 0.8758 },
  { name: '猪油', category: '原料', perBox: 0.0861 },
  { name: '十三香', category: '原料', perBox: 0.0057 },
  { name: '香浓鸡鲜粉', category: '原料', perBox: 0.0086 },
  { name: '花生酱', category: '原料', perBox: 0.0287 },
  { name: '虾皮', category: '原料', perBox: 0.0086 },
  { name: '黄原胶', category: '原料', perBox: 0.0086 },
];
const KH_NUOMIJI_REQUISITION = [];

// 糯米鸡制馅单（炒馅）：单箱 2.88kg，批次 100.3kg，系数 2.88 ÷ 100.3
const KH_NUOMIJI_FILLING = [
  { name: '香菇', category: '原料', perBox: 0.2297 },
  { name: '腌鸡胸肉', category: '原料（半成品）', perBox: 0.8327 },
  { name: '胡萝卜', category: '原料', perBox: 0.2871 },
  { name: '蒜蓉', category: '原料', perBox: 0.0144 },
  { name: '姜', category: '原料', perBox: 0.0086 },
  { name: '红葱酥', category: '原料', perBox: 0.0144 },
  { name: '草菇老抽', category: '原料', perBox: 0.1062 },
  { name: '味精', category: '原料', perBox: 0.0230 },
  { name: '食盐', category: '原料', perBox: 0.0230 },
  { name: '白糖', category: '原料', perBox: 0.1235 },
  { name: '芬美兹CH805', category: '原料', perBox: 0.0086 },
  { name: '玉米淀粉', category: '原料', perBox: 0.0718 },
  { name: '香菇水', category: '原料', perBox: 0.8758 },
  { name: '大豆油', category: '原料', perBox: 0.1149 },
  { name: '猪油', category: '原料', perBox: 0.0861 },
  { name: '十三香', category: '原料', perBox: 0.0057 },
  { name: '香浓鸡鲜粉', category: '原料', perBox: 0.0086 },
  { name: '花生酱', category: '原料', perBox: 0.0287 },
  { name: '虾皮', category: '原料', perBox: 0.0086 },
  { name: '黄原胶', category: '原料', perBox: 0.0086 },
];

// 菜团子原料表：按「写报表配方」折算，单箱 12kg（120 个 100g，皮 60g/馅 40g）
// 馅批次 100kg、面皮批次 35.28kg；该面皮配方没有饮用水
const KH_CAITUANZI_MATERIALS = [
  // 馅料：批次用量 ×（4.8 ÷ 100）
  { name: '冷冻蒲公英', category: '原料', perBox: 1.4400 },
  { name: '鲜油菜苔', category: '原料', perBox: 2.4000 },
  { name: '菜籽油', category: '原料', perBox: 0.3840 },
  { name: '猪油', category: '原料', perBox: 0.5593 },
  { name: '芝麻油', category: '原料', perBox: 0.0960 },
  { name: '食用盐', category: '原料', perBox: 0.0528 },
  { name: '白砂糖', category: '原料', perBox: 0.4393 },
  { name: '味精', category: '原料', perBox: 0.0480 },
  { name: '香浓鸡鲜粉', category: '原料', perBox: 0.0192 },
  { name: '大葱', category: '原料', perBox: 0.0480 },
  { name: '姜碎', category: '原料', perBox: 0.0480 },
  // 面皮：批次用量 ×（7.2 ÷ 35.28）
  { name: '五得利四星包子粉', category: '原料', perBox: 5.1020 },
  { name: '玉米糁（湿）', category: '原料', perBox: 0.1633 },
  { name: '玉米粉', category: '原料', perBox: 0.4082 },
  { name: '黄豆粉', category: '原料', perBox: 0.1020 },
  { name: '低端糯米粉', category: '原料', perBox: 0.5102 },
  { name: '复配膨松剂', category: '添加剂', perBox: 0.1224 },
  { name: 'β-胡萝卜素', category: '添加剂', perBox: 0.0061 },
  { name: '酵母', category: '添加剂', perBox: 0.0510 },
];
const KH_CAITUANZI_REQUISITION = [];

if (typeof PRODUCTS === 'undefined') var PRODUCTS = {};
PRODUCTS.kuailehou = {
  roubao:    { label: '肉包',   materials: KH_ROUBAO_MATERIALS,    requisition: KH_ROUBAO_REQUISITION },
  caibao:    { label: '菜包',   materials: KH_CAIBAO_MATERIALS,    requisition: KH_CAIBAO_REQUISITION },
  shuijiao:  { label: '水饺',   materials: KH_SHUIJIAO_MATERIALS,  requisition: KH_SHUIJIAO_REQUISITION },
  nuomiji:   { label: '糯米鸡', materials: KH_NUOMIJI_MATERIALS,   requisition: KH_NUOMIJI_REQUISITION, filling: KH_NUOMIJI_FILLING },
  caituanzi: { label: '菜团子', materials: KH_CAITUANZI_MATERIALS, requisition: KH_CAITUANZI_REQUISITION },
};
