// ============================================================
// 盒马渠道数据
// 原料表：name / category / perBox
// 领料单：maker / spec / unit / perBox / roundUpTo / plusOne / roundPlus / flour
// 取整规则见 app.js 顶部注释
// ============================================================

const HEMA_ROUBAO_MATERIALS = [
  { name: '小葱（香葱）', category: '原料', perBox: 0.060536 },
  { name: '饮用水', category: '原料', perBox: 1.84584 },
  { name: '白砂糖', category: '原料', perBox: 0.304 },
  { name: '味精', category: '原料', perBox: 0.03536 },
  { name: '鸡精', category: '原料', perBox: 0.0272 },
  { name: '老抽', category: '原料', perBox: 0.0408 },
  { name: '食用盐', category: '原料', perBox: 0.02168 },
  { name: '小麦粉', category: '原料', perBox: 2.77808 },
  { name: '猪油', category: '原料', perBox: 0.02592 },
  { name: '鲜姜', category: '原料', perBox: 0.090752 },
  { name: '白猪后腿肉（4号肉）', category: '原料', perBox: 0.555592 },
  { name: '倒三七', category: '原料', perBox: 1.02792 },
  { name: '活性干酵母', category: '添加剂', perBox: 0.02072 },
  { name: '复配膨松剂', category: '添加剂', perBox: 0.01552 },
  { name: '皮冻粉', category: '添加剂', perBox: 0.00304 },
];

const HEMA_ROUBAO_REQUISITION = [
  { maker: '五得利', spec: '八星粉', unit: 'kg', flour: true },
  { maker: '五得利', spec: '包点粉', unit: 'kg', flour: true },
  { maker: '安琪', spec: '活性干酵母', unit: 'kg', perBox: 0.02072, roundUpTo: 10 },
  { maker: '三鼎', spec: '复配膨松剂', unit: 'kg', perBox: 0.01552, plusOne: true },
  { maker: '研霖', spec: '皮冻粉', unit: 'kg', perBox: 0.00304, plusOne: true },
  { maker: '缘源', spec: '倒三七', unit: 'kg', perBox: 1.02792, roundUpTo: 25 },
  { maker: '缘源', spec: '后腿肉', unit: 'kg', perBox: 0.555592, roundUpTo: 25 },
  { maker: '金锣', spec: '猪油', unit: 'kg', perBox: 0.02592, roundUpTo: 15 },
  { maker: '忻城南华', spec: '白砂糖', unit: 'kg', perBox: 0.304, roundUpTo: 50 },
  { maker: '家乐', spec: '鸡精', unit: 'kg', perBox: 0.0272, roundUpTo: 5 },
  { maker: '海天', spec: '草菇老抽', unit: 'kg', perBox: 0.0408, roundUpTo: 6.4 },
  { maker: '中盐', spec: '食用盐', unit: 'kg', perBox: 0.02168, roundPlus: 5 },
  { maker: '福瑞', spec: '味精', unit: 'kg', perBox: 0.03536, roundUpTo: 25 },
  { maker: '农贸市场', spec: '鲜姜', unit: 'kg', perBox: 0.090752, roundPlus: 5 },
  { maker: '农贸市场', spec: '小香葱', unit: 'kg', perBox: 0.060536, roundPlus: 5 },
];

const HEMA_SHAOMAI_MATERIALS = [
  { name: '白猪肥膘', category: '馅料', perBox: 0.293163 },
  { name: '料酒（浙江绍兴）', category: '馅料', perBox: 0.0359 },
  { name: '老抽', category: '馅料', perBox: 0.1077 },
  { name: '生抽（黄豆酱油）', category: '馅料', perBox: 0.0718 },
  { name: '香菇', category: '馅料', perBox: 0.034082 },
  { name: '大豆油', category: '馅料', perBox: 0.1077 },
  { name: '蚝油（李锦记）', category: '馅料', perBox: 0.0359 },
  { name: '味精（双桥）', category: '馅料', perBox: 0.0251 },
  { name: '鸡精（家乐）', category: '馅料', perBox: 0.0251 },
  { name: '小葱（香葱）', category: '馅料', perBox: 0.027889 },
  { name: '圆糯米', category: '馅料', perBox: 2.7085 },
  { name: '鸭蛋黄', category: '馅料', perBox: 0.897778 },
  { name: '小麦面粉', category: '原料', perBox: 1.6213 },
  { name: '食用盐', category: '原料', perBox: 0.0352 },
  { name: '香辛料', category: '原料', perBox: 0.0022 },
  { name: '淀粉', category: '原料', perBox: 0.1297 },
  { name: '饮用水', category: '原料', perBox: 2.6394 },
  { name: '猪肉松', category: '原料', perBox: 0.028673 },
  { name: '猪油', category: '原料', perBox: 0.033061 },
  { name: '白砂糖', category: '原料', perBox: 0.1795 },
  { name: '精制鸡油', category: '原料', perBox: 0.109898 },
  { name: '鲜姜', category: '原料', perBox: 0.039889 },
  { name: '白猪后腿肉', category: '原料', perBox: 0.403061 },
  { name: '松仁', category: '原料', perBox: 0.029 },
];

const HEMA_SHAOMAI_REQUISITION = [
  { maker: '缘源', spec: '肥膘', unit: 'kg', perBox: 0.293163, roundUpTo: 25 },
  { maker: '缘源', spec: '猪后腿肉', unit: 'kg', perBox: 0.403061, roundUpTo: 25 },
  { maker: '古越龙山', spec: '料酒', unit: 'kg', perBox: 0.0359, plusOne: true },
  { maker: '海天', spec: '草菇老抽', unit: 'kg', perBox: 0.1077, roundUpTo: 6.4 },
  { maker: '海天', spec: '生抽', unit: 'kg', perBox: 0.0718, roundUpTo: 5.65 },
  { maker: '泌阳县鸿福汇', spec: '香菇', unit: 'kg', perBox: 0.034082, roundPlus: 5 },
  { maker: '中粮油脂', spec: '大豆油', unit: 'kg', perBox: 0.1077, roundUpTo: 18.3 },
  { maker: '李锦记', spec: '蚝油', unit: 'kg', perBox: 0.0359, roundUpTo: 7 },
  { maker: '双桥', spec: '味精', unit: 'kg', perBox: 0.0251, roundUpTo: 2 },
  { maker: '家乐', spec: '鸡精', unit: 'kg', perBox: 0.0251, roundUpTo: 5 },
  { maker: '农贸市场', spec: '小香葱', unit: 'kg', perBox: 0.027889, roundPlus: 5 },
  { maker: '华锦', spec: '圆糯米', unit: 'kg', perBox: 2.7085, roundUpTo: 50 },
  { maker: '高邮', spec: '鸭蛋黄', unit: 'kg', perBox: 0.897778, roundUpTo: 1.246 },
  { maker: '益海嘉里-金龙鱼', spec: '小麦面粉', unit: 'kg', perBox: 1.6213, roundUpTo: 25 },
  { maker: '中盐', spec: '食用盐', unit: 'kg', perBox: 0.0352, roundPlus: 5 },
  { maker: '农贸市场', spec: '胡椒粉', unit: 'kg', perBox: 0.0022, plusOne: true },
  { maker: '研霖', spec: '冷冻面米制品预拌粉', unit: 'kg', perBox: 0.1297, roundUpTo: 25 },
  { maker: '金旺', spec: '猪肉松', unit: 'kg', perBox: 0.028673, roundUpTo: 2.5 },
  { maker: '金锣', spec: '猪油', unit: 'kg', perBox: 0.033061, roundUpTo: 15 },
  { maker: '忻城南华', spec: '白砂糖', unit: 'kg', perBox: 0.1795, roundUpTo: 50 },
  { maker: '金锣', spec: '精制鸡油', unit: 'kg', perBox: 0.109898, roundUpTo: 15 },
  { maker: '农贸市场', spec: '鲜姜', unit: 'kg', perBox: 0.039889, roundPlus: 5 },
  { maker: '双利', spec: '松仁', unit: 'kg', perBox: 0.029, plusOne: true },
];

// 烧麦制馅单：按「蛋黄烧麦-用量计算-制馅单」的单箱使用重量（出品率前）
// 合计 9.513939kg，×0.908141 = 8.64kg 箱规；白砂糖是馅料，不能像肉包那样排除
const HEMA_SHAOMAI_FILLING = [
  { name: '白猪肥膘', category: '馅料', perBox: 0.2873 },
  { name: '料酒', category: '馅料', perBox: 0.0359 },
  { name: '老抽', category: '馅料', perBox: 0.1077 },
  { name: '生抽', category: '馅料', perBox: 0.0718 },
  { name: '香菇（泡）', category: '馅料', perBox: 0.14362 },
  { name: '大豆油', category: '馅料', perBox: 0.1077 },
  { name: '蚝油', category: '馅料', perBox: 0.0359 },
  { name: '味精', category: '馅料', perBox: 0.0251 },
  { name: '鸡精', category: '馅料', perBox: 0.0251 },
  { name: '小葱', category: '馅料', perBox: 0.0251 },
  { name: '圆糯米', category: '馅料', perBox: 3.74346818235729 },
  { name: '鸭蛋黄', category: '馅料', perBox: 0.808 },
  { name: '小麦面粉', category: '皮料', perBox: 1.6213 },
  { name: '食用盐', category: '原料', perBox: 0.0352 },
  { name: '食用盐-馅料', category: '馅料', perBox: 0.0287227206261322 },
  { name: '食用盐-皮料', category: '皮料', perBox: 0.00647727937386784 },
  { name: '香辛料', category: '馅料', perBox: 0.0022 },
  { name: '淀粉', category: '皮料', perBox: 0.1297 },
  { name: '饮用水', category: '原料', perBox: 2.6394 },
  { name: '饮用水-馅料', category: '馅料', perBox: 0.918707744388797 },
  { name: '饮用水-馅料里的干料吸收的水', category: '原料', perBox: 1.13814869825702 },
  { name: '饮用水-皮料', category: '皮料', perBox: 0.582543557354182 },
  { name: '猪肉松', category: '馅料', perBox: 0.0281 },
  { name: '猪油', category: '皮料', perBox: 0.0324 },
  { name: '白砂糖', category: '馅料', perBox: 0.1795 },
  { name: '精制鸡油', category: '馅料', perBox: 0.1077 },
  { name: '鲜姜', category: '馅料', perBox: 0.0359 },
  { name: '白猪后腿肉', category: '馅料', perBox: 0.395 },
  { name: '松仁', category: '馅料', perBox: 0.029 },
];

// 烧麦拌馅记录表：按手写图片的顺序和标准（图片数值 = Excel 第一组馅料 ×2，合计 168.52kg/锅）
// 圆糯米、小葱、松仁、蛋黄、肉松不在本表：糯米/小葱/松仁另属米料，蛋黄/肉松成型时另加
const HEMA_SHAOMAI_MIXFILL = [
  { name: '草菇老抽',   maker: '海天',         perBox: 0.1077,             standard: 6    },
  { name: '鲜为生抽',   maker: '海天',         perBox: 0.0718,             standard: 4    },
  { name: '精制鸡油',   maker: '金锣',         perBox: 0.1077,             standard: 6    },
  { name: '大豆油',     maker: '中粮油脂',     perBox: 0.1077,             standard: 6    },
  { name: '财神蚝油',   maker: '李锦记',       perBox: 0.0359,             standard: 2    },
  { name: '白胡椒粉',   maker: '农贸市场',     perBox: 0.0022,             standard: 0.12 },
  { name: '白砂糖',     maker: '忻城南华',     perBox: 0.1795,             standard: 10   },
  { name: '味精',       maker: '双桥',         perBox: 0.0251,             standard: 1.4  },
  { name: '鸡精',       maker: '家乐薄盐',     perBox: 0.0251,             standard: 1.4  },
  { name: '盐',         maker: '中盐',         perBox: 0.0287227206261322, standard: 1.6  },
  { name: '水',         maker: '自来水',       perBox: 0.918707744388797,  standard: 80   },
  { name: '后腿肉',     maker: '绿源',         perBox: 0.395,              standard: 22   },
  { name: '肥膘',       maker: '绿源',         perBox: 0.2873,             standard: 16   },
  { name: '姜',         maker: '农贸市场',     perBox: 0.0359,             standard: 2    },
  { name: '香菇帽',     maker: '鸿福汇',       perBox: 0.14362,            standard: 8    },
  { name: '料酒',       maker: '古越龙山',     perBox: 0.0359,             standard: 2    },
];

// 烧麦和面记录表：5 行，standard 为每锅标准（100kg 面粉的皮料配方，合计 146.4kg/锅）
const HEMA_SHAOMAI_DOUGH = [
  { name: '金龙鱼雪晶粉', maker: '益海嘉里-金龙鱼', perBox: 1.6213,             standard: 100 },
  { name: '饮用水-皮料',  maker: '自来水',           perBox: 0.582543557354182,  standard: 36  },
  { name: 'YL-2201',      maker: '研霖',             perBox: 0.1297,             standard: 8   },
  { name: '猪油',         maker: '金锣',             perBox: 0.0324,             standard: 2   },
  { name: '食用盐-皮料',  maker: '中盐',             perBox: 0.00647727937386784, standard: 0.4 },
];

const HEMA_CAIBAO_MATERIALS = [
  { name: '小麦粉', category: '原料', perBox: 3.300096 },
  { name: '饮用水', category: '原料', perBox: 1.488768 },
  { name: '上海青', category: '原料', perBox: 6.005388 },
  { name: '香菇', category: '原料', perBox: 0.038364 },
  { name: '猪油', category: '原料', perBox: 0.257148 },
  { name: '白砂糖', category: '原料', perBox: 0.37728 },
  { name: '小麦淀粉', category: '原料', perBox: 0.074364 },
  { name: '味精', category: '原料', perBox: 0.042036 },
  { name: '鸡精', category: '原料', perBox: 0.032328 },
  { name: '食用盐', category: '原料', perBox: 0.048348 },
  { name: '干木耳', category: '原料', perBox: 0.023088 },
  { name: '菜籽油', category: '原料', perBox: 0.194016 },
  { name: '芝麻油', category: '原料', perBox: 0.064668 },
  { name: '复配膨松剂', category: '添加剂', perBox: 0.016008 },
  { name: '活性干酵母', category: '添加剂', perBox: 0.026484 },
];
const HEMA_CAIBAO_REQUISITION = [
  { maker: '五得利', spec: '八星粉', unit: 'kg', flour: true },
  { maker: '五得利', spec: '包点粉', unit: 'kg', flour: true },
  { maker: '泌阳县鸿福汇', spec: '干香菇', unit: 'kg', perBox: 0.038364, roundUpTo: 12 },
  { maker: '金锣', spec: '猪油', unit: 'kg', perBox: 0.257148, roundUpTo: 15 },
  { maker: '忻城南华', spec: '白砂糖', unit: 'kg', perBox: 0.37728, roundUpTo: 50 },
  { maker: '河南汉永', spec: '小麦淀粉', unit: 'kg', perBox: 0.074364, roundUpTo: 25 },
  { maker: '福瑞', spec: '味精', unit: 'kg', perBox: 0.042036, roundUpTo: 2.5 },
  { maker: '家乐', spec: '鸡精', unit: 'kg', perBox: 0.032328, roundUpTo: 5 },
  { maker: '中盐', spec: '食用盐', unit: 'kg', perBox: 0.048348, roundUpTo: 25 },
  { maker: '涡阳县建坤', spec: '干木耳', unit: 'kg', perBox: 0.023088, roundUpTo: 12 },
  { maker: '四季油脂', spec: '菜籽油', unit: 'kg', perBox: 0.194016, roundUpTo: 18.4 },
  { maker: '溢瓶香', spec: '芝麻油', unit: 'kg', perBox: 0.064668, roundUpTo: 18.4 },
  { maker: '三鼎', spec: '复配膨松剂', unit: 'kg', perBox: 0.016008, roundUpTo: 25 },
  { maker: '安琪', spec: '活性干酵母', unit: 'kg', perBox: 0.026484, roundUpTo: 2 },
  { maker: '随学坤蔬菜批发', spec: '上海青', unit: 'kg', perBox: 6.005388, roundPlus: 25 },
];

// 菜包制馅单：按「菜包-用量计算-制馅单」的单箱使用重量（出品率前，与肉包口径一致）
// 猪油总行不列入，避免与「猪油-馅料」「猪油-皮料」重复；合计 8.084216kg/箱，×0.95 出品率 = 7.68kg
const HEMA_CAIBAO_FILLING = [
  { name: '小麦粉', category: '皮料', perBox: 3.300096 },
  { name: '饮用水', category: '原料', perBox: 1.488768 },
  { name: '饮用水-皮料', category: '皮料', perBox: 1.25906232206136 },
  { name: '上海青', category: '馅料', perBox: 2.101884 },
  { name: '湿香菇', category: '馅料', perBox: 0.1616628 },
  { name: '猪油-馅料', category: '馅料', perBox: 0.226348389664314 },
  { name: '猪油-皮料', category: '皮料', perBox: 0.0307996103356862 },
  { name: '白砂糖', category: '原料', perBox: 0.37728 },
  { name: '白砂糖-馅料', category: '馅料', perBox: 0.161679695221509 },
  { name: '白砂糖-皮料', category: '皮料', perBox: 0.215600304778491 },
  { name: '小麦淀粉', category: '馅料', perBox: 0.074364 },
  { name: '味精', category: '馅料', perBox: 0.042036 },
  { name: '鸡精', category: '馅料', perBox: 0.032328 },
  { name: '食用盐', category: '原料', perBox: 0.048348 },
  { name: '食用盐-馅料', category: '馅料', perBox: 0.0452681433716111 },
  { name: '食用盐-皮料', category: '皮料', perBox: 0.00307985662838894 },
  { name: '湿木耳', category: '馅料', perBox: 0.12883104 },
  { name: '菜籽油', category: '馅料', perBox: 0.194016 },
  { name: '芝麻油', category: '馅料', perBox: 0.064668 },
  { name: '复配膨松剂', category: '皮料', perBox: 0.016008 },
  { name: '活性干酵母', category: '皮料', perBox: 0.026484 },
];
const HEMA_CAIBAO_MIXFILL = [
  { name: '上海青',       maker: '随学坤蔬菜批发', perBox: 2.101884,             standard: 325  },
  { name: '湿香菇',       maker: '泌阳县鸿福汇',   perBox: 0.1616628,            standard: 25   },
  { name: '菜籽油',       maker: '四季油脂',       perBox: 0.194016,             standard: 30   },
  { name: '芝麻油',       maker: '溢瓶香',         perBox: 0.064668,             standard: 10   },
  { name: '猪油-馅料',    maker: '金锣',           perBox: 0.226348389664314,    standard: 35   },
  { name: '白砂糖-馅料',  maker: '忻城南华',       perBox: 0.161679695221509,    standard: 25   },
  { name: '食用盐-馅料',  maker: '中盐',           perBox: 0.0452681433716111,   standard: 7    },
  { name: '味精',         maker: '福瑞',           perBox: 0.042036,             standard: 6.5  },
  { name: '鸡精',         maker: '家乐',           perBox: 0.032328,             standard: 5    },
  { name: '小麦淀粉',     maker: '河南汉永',       perBox: 0.074364,             standard: 11.5 },
  { name: '湿木耳',       maker: '涡阳县建坤',     perBox: 0.12883104,           standard: 20   },
];
// 菜包和面：八星包子粉、包点粉各 50%（合计 107.2kg/锅）
const HEMA_CAIBAO_DOUGH = [
  { name: '八星包子粉', maker: '五得利',   perBox: 1.650048,              standard: 53.6  },
  { name: '包点粉',     maker: '五得利',   perBox: 1.650048,              standard: 53.6  },
  { name: '水',         maker: '自来水',   perBox: 1.25906232206136,      standard: 40.9  },
  { name: '猪油',       maker: '金锣',     perBox: 0.0307996103356862,    standard: 1.0   },
  { name: '白砂糖',     maker: '忻城南华', perBox: 0.215600304778491,     standard: 7.0   },
  { name: '盐',         maker: '中盐',     perBox: 0.00307985662838894,   standard: 0.1   },
  { name: '复配膨松剂', maker: '三鼎',     perBox: 0.016008,              standard: 0.52  },
  { name: '酵母',       maker: '安琪',     perBox: 0.026484,              standard: 0.86  },
];

const HEMA_ROUBAO_FILLING = [
  { name: '小葱', category: '馅料', perBox: 0.05448 },
  { name: '饮用水', category: '原料', perBox: 1.84584 },
  { name: '饮用水-馅料', category: '馅料', perBox: 0.544403 },
  { name: '饮用水干料吸收水分', category: '馅料', perBox: 0.242259 },
  { name: '饮用水-皮料', category: '皮料', perBox: 1.059178 },
  { name: '白砂糖', category: '原料', perBox: 0.304 },
  { name: '白砂糖-馅料', category: '馅料', perBox: 0.122507 },
  { name: '白砂糖-皮料', category: '皮料', perBox: 0.181493 },
  { name: '味精', category: '原料', perBox: 0.03536 },
  { name: '鸡精', category: '原料', perBox: 0.0272 },
  { name: '老抽', category: '原料', perBox: 0.0408 },
  { name: '食用盐', category: '原料', perBox: 0.02168 },
  { name: '食用盐-馅料', category: '馅料', perBox: 0.019084 },
  { name: '食用盐-皮料', category: '皮料', perBox: 0.002596 },
  { name: '小麦粉', category: '皮料', perBox: 2.77808 },
  { name: '猪油', category: '皮料', perBox: 0.02592 },
  { name: '鲜姜', category: '馅料', perBox: 0.08168 },
  { name: '白猪后腿肉（4号）', category: '馅料', perBox: 0.54448 },
  { name: '猪碎肉（肥70%瘦30%）', category: '馅料', perBox: 1.00736 },
  { name: '活性干酵母', category: '皮料', perBox: 0.02072 },
  { name: '复配膨松剂', category: '皮料', perBox: 0.01552 },
  { name: '皮冻粉', category: '馅料', perBox: 0.24548 },
];

// 拌馅记录表：name / maker / perBox(用于制馅的用量) / standard(每锅标准用量 kg)
// 行顺序即物料顺序，锅数 = ⌈perBox * 箱数 / standard⌉
// 水/白砂糖/食用盐的 perBox 取「-馅料」拆分项（不是总量）
const HEMA_ROUBAO_MIXFILL = [
  { name: '葱',     maker: '农贸市场', perBox: 0.05448,  standard: 10   },
  { name: '水',     maker: '自来水',   perBox: 0.544403, standard: 100  },
  { name: '白砂糖', maker: '忻城南华', perBox: 0.122507, standard: 22.5 },
  { name: '味精',   maker: '福瑞',     perBox: 0.03536,  standard: 6.5  },
  { name: '鸡精',   maker: '家乐',     perBox: 0.0272,   standard: 5    },
  { name: '老抽',   maker: '海天',     perBox: 0.0408,   standard: 7.5  },
  { name: '食用盐', maker: '中盐',     perBox: 0.019084, standard: 3.5  },
  { name: '鲜姜',   maker: '农贸市场', perBox: 0.08168,  standard: 15   },
  { name: '4#肉',   maker: '缘源',     perBox: 0.54448,  standard: 100  },
  { name: '倒三七', maker: '缘源',     perBox: 1.00736,  standard: 185  },
  { name: '皮冻粉', maker: '研霖',     perBox: 0.24548,  standard: 45   },
];

// 和面记录表（原面小料配置表）：name / maker / perBox(用于皮料的用量) / standard(每锅标准用量 kg)
// 锅数 = ⌈perBox * 箱数 / standard⌉；standard 为 0 时按 1 锅处理
// 面粉按八星包子粉、包子粉各 50% 拆分（合计 2.77808kg/箱）；水 1.059178、猪油 0.02592
// 面粉/水/猪油的标准按现有糖 7kg/锅 反推，并保留 1 位小数：两种粉各 53.6、水 40.9、猪油 1.0
const HEMA_ROUBAO_DOUGH = [
  { name: '八星包子粉', maker: '五得利', perBox: 1.38904,  standard: 53.6 },
  { name: '包子粉',     maker: '五得利', perBox: 1.38904,  standard: 53.6 },
  { name: '水',         maker: '自来水', perBox: 1.059178, standard: 40.9 },
  { name: '猪油',       maker: '金锣',   perBox: 0.02592,  standard: 1.0  },
  { name: '白砂糖',     maker: '忻城南华', perBox: 0.181493, standard: 7.0  },
  { name: '安琪酵母',   maker: '安琪',     perBox: 0.02072,  standard: 0.8  },
  { name: '复配膨松剂', maker: '三鼎',     perBox: 0.01552,  standard: 0.6  },
  { name: '盐',         maker: '中盐',     perBox: 0.002596, standard: 0.1  },
];

// 挂到全局 PRODUCTS
if (typeof PRODUCTS === 'undefined') var PRODUCTS = {};
PRODUCTS.hema = {
  roubao:  { label: '肉包',  materials: HEMA_ROUBAO_MATERIALS,  requisition: HEMA_ROUBAO_REQUISITION,  filling: HEMA_ROUBAO_FILLING,  mixfill: HEMA_ROUBAO_MIXFILL,  dough: HEMA_ROUBAO_DOUGH },
  shaomai: { label: '烧麦',  materials: HEMA_SHAOMAI_MATERIALS, requisition: HEMA_SHAOMAI_REQUISITION, filling: HEMA_SHAOMAI_FILLING, fillingTotalExclude: ['饮用水', '饮用水-馅料里的干料吸收的水', '食用盐'], mixfill: HEMA_SHAOMAI_MIXFILL, dough: HEMA_SHAOMAI_DOUGH },
  caibao:  { label: '菜包',  materials: HEMA_CAIBAO_MATERIALS,  requisition: HEMA_CAIBAO_REQUISITION,  filling: HEMA_CAIBAO_FILLING,  mixfill: HEMA_CAIBAO_MIXFILL,  dough: HEMA_CAIBAO_DOUGH },
};
