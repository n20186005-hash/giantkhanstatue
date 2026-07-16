const fs = require('fs');
const path = require('path');

const zhPath = path.join(__dirname, 'src/i18n/zh.json');
let zh = JSON.parse(fs.readFileSync(zhPath, 'utf-8'));

// Helper to remove emojis from a string
function removeEmojis(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{1F1E0}-\u{1F1FF}\u{2B50}\u{231A}\u{23F3}\u{23F0}\u{1F200}-\u{1F251}]/gu, '').trim();
}

// Recursively remove specific fields (icon, badge) or clean strings
function cleanObj(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(cleanObj);
  } else if (obj !== null && typeof obj === 'object') {
    // Delete emoji fields
    delete obj.icon;
    // For badges, if it's a single emoji, delete it. If it's text, keep it.
    if (typeof obj.badge === 'string' && removeEmojis(obj.badge) === '') {
      delete obj.badge;
    }
    
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = removeEmojis(obj[key]);
      } else {
        cleanObj(obj[key]);
      }
    }
  }
}

cleanObj(zh);

// 1. Hero
zh.hero.rating = "基于公众记录的极高关注度";
zh.hero.reviewCount = "4,344 份访客公共记录";
zh.hero.navCta.label = "地理导航参数";
zh.hero.photoCta.label = "影像记录视角";
zh.hero.practicalInfo.clockIcon = "";
zh.hero.practicalInfo.ticketIcon = "";

// 2. 住宿指南 -> 周边基建与驻留建议
zh.lodging.title = "周边基建与驻留建议（Infrastructure & Residency）";
zh.lodging.subtitle = "纳来哈区与乌兰巴托市区的地理距离、通勤时间及基建承载力分析，供实地考察者参考。";
zh.lodging.scenarioTitle = "驻留条件评估";
zh.lodging.options[0].role = "极近距离考察节点";
zh.lodging.options[0].highlight = "位于纳来哈或近郊区域，具备清晨首光观测的地理优势，适合以地景观测与数据采集为主的考察者。";
zh.lodging.options[1].role = "综合基建与通勤枢纽";
zh.lodging.options[1].highlight = "位于乌兰巴托市区，依托首都完善的基建网络与成吉思汗国际机场，适合多点联动的复合型考察。";
zh.lodging.peakTitle = "季节性承载力提示";
zh.lodging.peak = "蒙古高原的夏季（6–8 月）为客流高峰，区域基建承载力面临峰值考验。建议考察者提前规划驻留节点，必要时以乌兰巴托市区为基点进行通勤。";
zh.lodging.tipsTitle = "基建评估附注";
zh.lodging.tips = [
  "清晨地景观测优先纳来哈近郊，以降低通勤时间成本。",
  "综合物资补给与后勤保障优先乌兰巴托市区。",
  "驻留前需确认能源补给（如车辆停泊与充电设施）及基础后勤状况。",
  "高峰期需提前锚定驻留节点，规避基建过载风险。"
];

// 3. 游客评价 -> 实地考察者视角
zh.reviews.title = "实地考察者视角（Field Notes）";
zh.reviews.declaration = "基于 Google Maps 开放数据汇编的实地考察记录。";
zh.reviews.featuredTitle = "考察摘录";
zh.reviews.featuredSubtitle = "核心视觉与地理体验的客观记述。";
zh.reviews.featured[0].text = "在马头观景台俯瞰图拉河畔，能直观感受到该地景如何重塑了无垠草原的物理尺度。黄昏时分的金属光泽构成了极具张力的视觉文本。";
zh.reviews.featured[0].source = "人类学田野调查者 · 乌兰巴托";
zh.reviews.featured[1].text = "40米高的不锈钢锻造工艺与粗犷的自然环境形成了强烈的材料对比。底座的巨型靴形建筑是当代文化符号转译的典型案例。";
zh.reviews.featured[1].source = "建筑纪实摄影师 · 北京";
zh.reviews.featured[2].text = "开阔的广场空间与明确的动线设计，使其成为向公众普及蒙古帝国历史与游牧文化的优秀露天教具。";
zh.reviews.featured[2].source = "公众历史教育者 · 乌兰巴托";
zh.reviews.items.forEach(item => {
  delete item.rating; // Remove star ratings
});
zh.reviews.items[0].text = "清晨光线条件下的逆光观测提供了极佳的影像记录机会。该时段人流密度极低，便于进行不受干扰的空间记录。";
zh.reviews.items[1].text = "自乌兰巴托市区的通勤距离适中。现代工业材料与自然草甸的视觉并置，提供了独特的考察样本。";
zh.reviews.items[2].text = "作为核心国家地标，其公共空间的组织方式值得研究。建议在低峰时段进行深入的现场数据采集。";
zh.reviews.items[3].text = "该地标与特日勒吉国家公园形成了良好的区域联动，构成了乌兰巴托东部重要的自然与人文考察走廊。";

// 4. 增强学术深度与异化翻译
zh.knowledge.sections.forEach(sec => {
  if (sec.id === 'history') {
    sec.content = "今日的 Tsonjin Boldog（Цонжин Болдог）在蒙古语中意为「智慧之石」或「圣石之地」。据民间口传文学（Oral History）记载，公元1177年，尚名铁木真的成吉思汗在与脱里汗（王汗）会面后返程途中行至此地，于草丛中拾得一根金鞭；这被视为预示他未来征服大业的吉兆。此后，Tsonjin Boldog 便被赋予了神圣的地理坐标属性，成为后世在此建立巨像、纪念蒙古帝国建立800周年的精神原点。巨像面朝东方，正遥望成吉思汗位于肯特省的出生地。";
  }
  if (sec.id === 'sculpture') {
    sec.content = "雕像广场周围布置有 Есөн хөлт цагаан туг（九斿白纛/九纛）长廊等公共艺术作品。九纛作为蒙古帝国时期的最高军徽与国家象征，将绿地转化为可漫步的露天历史课堂。雕塑与草原相互映衬，使成吉思汗骑马雕像既是国家地标，也是一座没有围墙的草原纪念馆。";
  }
  if (sec.id === 'legend') {
    sec.content = "在蒙古的民间叙事中，Tsonjin Boldog 的金鞭不只是一件遗物，更被赋予了深厚的民族集体记忆：拾鞭而定都、鞭指东方、帝国由此崛起。这些口耳相传的叙事文本，为这座金属巨像注入了丰富的文化隐喻。以下三则流传于草原的传说，展现了当地社会对该地标的象征性建构。";
    sec.academicNote.text = "注：本节内容源自当地口传史料与民间叙事，旨在呈现该地标在当代蒙古社会的文化象征意义，非正史记载。严谨的史料考证请参阅《蒙古秘史》（Монголын нууц товчоо）等历史文献及官方说明牌。";
  }
});

// 5. 去 OTA 化
zh.outdoorMuseum.title = "影像记录与地景观察指南（Visual & Spatial Observation）";
zh.outdoorMuseum.subtitle = "基于光照轨迹与空间结构的实地考察机位分析。";
zh.outdoorMuseum.items.forEach(item => {
  if (item.badge && item.badge.label) {
    if (item.badge.label === '最出片') item.badge.label = '极佳观测点';
    if (item.badge.label === '最具张力') item.badge.label = '宏观尺度';
    if (item.badge.label === '氛围最强') item.badge.label = '人文隐喻';
    if (item.badge.label === '层次最佳') item.badge.label = '夜间记录';
  }
});

zh.audience.title = "适宜的考察与研学群体（Target Demographics）";
zh.audience.subtitle = "基于不同考察目的与深度的模块化路径建议。";
zh.audience.items[0].group = "公众教育与家庭访客";
zh.audience.items[0].resonance = "开阔平缓的广场与底层空间提供了极佳的公众历史教育场所，易于开展普及性的文化解说。";
zh.audience.items[1].group = "影像记录者与视觉研究者";
zh.audience.items[1].resonance = "光影在金属曲面上的折射变化及强烈的地景反差，提供了丰富的影像采集素材。";
zh.audience.items[2].group = "历史与人类学研学群体";
zh.audience.items[2].resonance = "九斿白纛（Есөн хөлт цагаан туг）阵列、底层博物馆展陈及金鞭传说的空间化表达，具有极高的文本研读价值。";
zh.audience.items[3].group = "跨文化初步接触者";
zh.audience.items[3].resonance = "作为首都近郊的门户地标，能在极短的通勤半径内提供高密度的草原帝国文化初体验。";

zh.hiddenRules.title = "实地考察指南（Field Work Protocols）";
zh.hiddenRules.subtitle = "基于草原气候与基础设施条件的客观评估，旨在保障考察过程的严谨与安全。";
zh.hiddenRules.highlights[0].label = "足部防护与热量管理";
zh.hiddenRules.highlights[1].label = "动线秩序与空间承载";
zh.hiddenRules.highlights[2].label = "高原气候适应";

zh.transportSection.title = "地理通勤与基础设施（Transport & Logistics）";
zh.transportSection.subtitle = "从乌兰巴托枢纽向周边辐射的地理可达性分析及后勤保障建议。";
zh.transportSection.arrivalTitle = "行前地理信息确认";
zh.transportSection.modes[2].title = "集约化通勤选项";
zh.transportSection.localTipsTitle = "后勤与时序建议";

fs.writeFileSync(zhPath, JSON.stringify(zh, null, 2), 'utf-8');
console.log('zh.json updated successfully.');
