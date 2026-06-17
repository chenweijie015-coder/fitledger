const storageKey = "fitledger-v4";
const clone = (value) => JSON.parse(JSON.stringify(value));

const imageByGroup = {
  胸: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=82",
  背: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=900&q=82",
  肩: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=900&q=82",
  腿: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=900&q=82",
  臀: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=900&q=82",
  手臂: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=900&q=82",
  核心: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=900&q=82",
  有氧: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=82",
  自重: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=82"
};

const exerciseSeed = [
  ["bench", "胸", "杠铃卧推", "Barbell Bench Press", "卧推 4x8，哑铃上斜卧推 3x10，绳索下压 3x12"],
  ["incline-db-press", "胸", "上斜哑铃卧推", "Incline Dumbbell Press", "上斜哑铃卧推 4x10，夹胸 3x12"],
  ["pushup", "胸", "俯卧撑", "Push-up", "俯卧撑 4 组，跪姿俯卧撑递减 2 组"],
  ["cable-fly", "胸", "绳索夹胸", "Cable Fly", "绳索夹胸 4x12，俯卧撑 3 组"],
  ["pullup", "背", "引体向上", "Pull-up", "引体向上 4 组，高位下拉 3x12"],
  ["lat-pulldown", "背", "高位下拉", "Lat Pulldown", "高位下拉 4x10，坐姿划船 4x10"],
  ["seated-row", "背", "坐姿划船", "Seated Cable Row", "坐姿划船 4x10，单臂划船 3x12"],
  ["one-arm-row", "背", "单臂哑铃划船", "One-arm Dumbbell Row", "单臂哑铃划船 4x10，面拉 3x15"],
  ["deadlift", "背", "硬拉", "Deadlift", "硬拉 5x5，罗马尼亚硬拉 3x8"],
  ["shoulder-press", "肩", "哑铃推肩", "Dumbbell Shoulder Press", "哑铃推肩 4x10，侧平举 4x12"],
  ["lateral-raise", "肩", "侧平举", "Lateral Raise", "侧平举 5x12，俯身飞鸟 4x12"],
  ["face-pull", "肩", "面拉", "Face Pull", "面拉 4x15，外旋 3x15"],
  ["squat", "腿", "深蹲", "Squat", "深蹲 5x5，腿举 3x12"],
  ["leg-press", "腿", "腿举", "Leg Press", "腿举 4x12，箭步蹲 3x10"],
  ["lunge", "腿", "箭步蹲", "Lunge", "箭步蹲 4x10，腿弯举 3x12"],
  ["leg-curl", "腿", "腿弯举", "Leg Curl", "腿弯举 4x12，罗马尼亚硬拉 3x10"],
  ["hip-thrust", "臀", "臀推", "Hip Thrust", "臀推 4x10，保加利亚分腿蹲 3x10"],
  ["rdl", "臀", "罗马尼亚硬拉", "Romanian Deadlift", "罗马尼亚硬拉 4x8，臀桥 3x15"],
  ["glute-bridge", "臀", "臀桥", "Glute Bridge", "臀桥 4x15，蚌式开合 3x20"],
  ["biceps-curl", "手臂", "哑铃弯举", "Dumbbell Curl", "哑铃弯举 4x12，锤式弯举 3x12"],
  ["hammer-curl", "手臂", "锤式弯举", "Hammer Curl", "锤式弯举 4x10，绳索弯举 3x12"],
  ["triceps-pushdown", "手臂", "绳索下压", "Triceps Pushdown", "绳索下压 4x12，窄距俯卧撑 3 组"],
  ["plank", "核心", "平板支撑", "Plank", "平板支撑 4x45秒，死虫 3x12"],
  ["dead-bug", "核心", "死虫", "Dead Bug", "死虫 4x12，平板支撑 3 组"],
  ["crunch", "核心", "卷腹", "Crunch", "卷腹 4x15，反向卷腹 3x12"],
  ["mountain-climber", "核心", "登山跑", "Mountain Climber", "登山跑 4x30秒，平板支撑 3 组"],
  ["run", "有氧", "跑步", "Running", "慢跑 30 分钟，冲刺 6 组"],
  ["cycling", "有氧", "动感单车", "Cycling", "中等强度骑行 35 分钟"],
  ["rowing", "有氧", "划船机", "Rowing Machine", "划船机 5x500 米，组间休息 90 秒"],
  ["burpee", "自重", "波比跳", "Burpee", "波比跳 5x10，自重深蹲 4x15"],
  ["jump-rope", "有氧", "跳绳", "Jump Rope", "跳绳 10x1 分钟，组间休息 30 秒"],
  ["pull-apart", "肩", "弹力带拉伸", "Band Pull-apart", "弹力带拉伸 4x20，面拉 3x15"],
  ["db-fly", "胸", "哑铃飞鸟", "Dumbbell Fly", "哑铃飞鸟 4x12，俯卧撑 3 组"],
  ["pec-deck", "胸", "蝴蝶机夹胸", "Pec Deck", "蝴蝶机夹胸 4x12，绳索夹胸 3x12"],
  ["dips", "胸", "双杠臂屈伸", "Dips", "双杠臂屈伸 4 组，绳索下压 3x12"],
  ["inverted-row", "背", "反向划船", "Inverted Row", "反向划船 4 组，坐姿划船 3x12"],
  ["tbar-row", "背", "T杠划船", "T-bar Row", "T杠划船 4x10，高位下拉 3x12"],
  ["shrug", "背", "哑铃耸肩", "Dumbbell Shrug", "哑铃耸肩 4x12，面拉 3x15"],
  ["arnold-press", "肩", "阿诺德推举", "Arnold Press", "阿诺德推举 4x10，侧平举 4x12"],
  ["rear-delt-fly", "肩", "俯身飞鸟", "Rear Delt Fly", "俯身飞鸟 4x12，面拉 4x15"],
  ["front-raise", "肩", "前平举", "Front Raise", "前平举 3x12，推肩 4x10"],
  ["leg-extension", "腿", "腿屈伸", "Leg Extension", "腿屈伸 4x12，深蹲 4x8"],
  ["bulgarian-split-squat", "腿", "保加利亚分腿蹲", "Bulgarian Split Squat", "保加利亚分腿蹲 4x10，臀桥 3x15"],
  ["calf-raise", "腿", "提踵", "Calf Raise", "站姿提踵 5x15，坐姿提踵 4x15"],
  ["hip-abduction", "臀", "髋外展", "Hip Abduction", "髋外展 4x15，臀桥 3x15"],
  ["kickback", "臀", "绳索后踢腿", "Cable Kickback", "绳索后踢腿 4x12，臀推 4x10"],
  ["preacher-curl", "手臂", "牧师凳弯举", "Preacher Curl", "牧师凳弯举 4x10，锤式弯举 3x12"],
  ["skull-crusher", "手臂", "仰卧臂屈伸", "Skull Crusher", "仰卧臂屈伸 4x10，绳索下压 3x12"],
  ["close-grip-bench", "手臂", "窄距卧推", "Close-grip Bench Press", "窄距卧推 4x8，臂屈伸 3 组"],
  ["hanging-leg-raise", "核心", "悬垂举腿", "Hanging Leg Raise", "悬垂举腿 4x10，平板支撑 3 组"],
  ["russian-twist", "核心", "俄罗斯转体", "Russian Twist", "俄罗斯转体 4x20，死虫 3x12"],
  ["side-plank", "核心", "侧平板支撑", "Side Plank", "侧平板支撑 3x45秒，卷腹 3x15"],
  ["elliptical", "有氧", "椭圆机", "Elliptical", "椭圆机 35 分钟，中等强度"],
  ["stair-climber", "有氧", "爬楼机", "Stair Climber", "爬楼机 20 分钟，低速稳定"],
  ["battle-rope", "有氧", "战绳", "Battle Rope", "战绳 10x30秒，组间休息 45 秒"],
  ["kettlebell-swing", "自重", "壶铃摆动", "Kettlebell Swing", "壶铃摆动 5x15，深蹲 3x12"],
  ["box-jump", "自重", "跳箱", "Box Jump", "跳箱 5x8，波比跳 3x10"],
  ["bodyweight-squat", "自重", "自重深蹲", "Bodyweight Squat", "自重深蹲 5x20，箭步蹲 3x12"],
  ["wall-sit", "自重", "靠墙静蹲", "Wall Sit", "靠墙静蹲 4x60秒，提踵 4x15"]
];

const guidancePresets = {
  bench: {
    steps: ["肩胛后缩下沉，双脚踩稳地面，眼睛在杠铃正下方。", "杠铃下放到胸中下部，前臂尽量垂直地面。", "推起时保持胸部发力，手腕在杠铃正下方，不要耸肩。"],
    mistakes: ["肘部外展过大", "臀部离凳", "杠铃下放位置忽高忽低"]
  },
  inclinePress: {
    steps: ["凳面调到约 30-45 度，肩胛收紧贴住靠背。", "哑铃下放到上胸两侧，肘部略低于肩。", "向上推到哑铃接近但不相撞，保持上胸持续受力。"],
    mistakes: ["凳面角度过高练成推肩", "手腕后折", "下放太浅"]
  },
  pushup: {
    steps: ["双手略宽于肩，身体从头到脚成一直线。", "下降时肘部约 45 度向后，胸口靠近地面。", "推起时收紧腹部和臀部，避免腰部下塌。"],
    mistakes: ["塌腰", "只点头不下降胸口", "肘部完全横向打开"]
  },
  fly: {
    steps: ["肩胛稳定，肘部保持微屈，先把胸打开。", "沿弧线把手臂向身体中线靠拢，想象夹住胸肌。", "还原时慢慢打开，不要让肩膀被重量向后拉扯。"],
    mistakes: ["手臂弯曲太多变成推举", "重量过大导致肩前侧疼", "动作底部失控"]
  },
  dips: {
    steps: ["握稳双杠，肩胛下沉，身体略微前倾。", "慢慢下降到胸肩有拉伸感，肘部向后走。", "用胸和三头发力推起，不要在顶部耸肩。"],
    mistakes: ["下降过深导致肩不适", "身体晃动", "只用手腕硬撑"]
  },
  pullup: {
    steps: ["双手略宽于肩，先让肩胛下沉再开始拉。", "胸口向单杠靠近，想象用肘部向下拉。", "下降时控制身体，不要完全松掉肩膀。"],
    mistakes: ["只用手臂硬拉", "身体大幅摆动", "下放太快"]
  },
  pulldown: {
    steps: ["坐稳后先沉肩，胸口微微上挺。", "把横杆拉向上胸，肘部沿身体两侧向下。", "还原时让背阔肌被拉长，但不要耸肩。"],
    mistakes: ["身体后仰太多", "用手腕把杆拉下来", "拉到脖子后方"]
  },
  row: {
    steps: ["坐稳或俯身后保持脊柱中立，先收紧核心。", "拉动时肘部向身体后方走，肩胛向中间靠拢。", "还原时控制肩胛前伸，背部保持张力。"],
    mistakes: ["耸肩", "腰背来回甩", "只用二头发力"]
  },
  oneArmRow: {
    steps: ["支撑侧手脚稳定，躯干不要旋转。", "哑铃向髋部方向拉，肘部贴近身体。", "顶峰略停顿，再慢慢下放到背阔肌被拉长。"],
    mistakes: ["身体打开借力", "哑铃拉向肩膀", "下放时塌腰"]
  },
  deadlift: {
    steps: ["脚掌站在杠铃中线下方，髋部后坐，背部保持中立。", "先拉紧杠铃和身体，再用腿蹬地把杠带起。", "杠铃贴近小腿和大腿上升，顶端夹紧臀部。"],
    mistakes: ["弓背起拉", "杠铃离身体太远", "顶端过度后仰"]
  },
  shrug: {
    steps: ["双手持哑铃自然站立，核心收紧。", "肩膀垂直向上耸起，想象耳朵靠近肩峰。", "顶端短暂停顿后慢慢下放，不要画圈。"],
    mistakes: ["肩膀绕圈", "头向前伸", "用手臂弯举借力"]
  },
  shoulderPress: {
    steps: ["坐姿或站姿保持核心收紧，哑铃起始在耳朵两侧。", "向上推到手臂接近伸直，肘部保持在手腕下方。", "下放到肩部可控位置，不要让腰椎代偿。"],
    mistakes: ["过度后仰", "耸肩顶重量", "下放不对称"]
  },
  raise: {
    steps: ["身体站稳，手肘微屈，先降低斜方肌参与。", "手臂抬到肩高附近，动作路径稳定。", "下放时保持控制，让肩部持续受力。"],
    mistakes: ["甩动借力", "耸肩", "抬得过高导致肩夹挤"]
  },
  rearDelt: {
    steps: ["髋部后坐或面向绳索，胸背保持稳定。", "用后束带动手臂向外打开，肩胛自然后收。", "顶峰停顿一秒，再慢慢回到起点。"],
    mistakes: ["用斜方肌耸肩", "手臂弯曲过多", "重量太大导致身体晃动"]
  },
  squat: {
    steps: ["双脚与肩同宽，脚尖自然外展，核心先收紧。", "下蹲时膝盖跟随脚尖方向，髋部和膝盖同时弯曲。", "站起时脚掌均匀发力，保持胸腔打开。"],
    mistakes: ["膝盖内扣", "弓背塌腰", "重心过度前移"]
  },
  legPress: {
    steps: ["背部贴紧靠垫，双脚放在踏板中部略宽于肩。", "下放到膝盖接近 90 度或个人可控深度。", "蹬起时脚掌发力，膝盖跟随脚尖方向。"],
    mistakes: ["膝盖锁死", "下放时臀部离垫", "脚跟离开踏板"]
  },
  lunge: {
    steps: ["向前或向后迈步，身体保持直立。", "下降时前脚脚掌踩稳，前膝跟随脚尖。", "用前腿臀腿发力站回，保持左右节奏一致。"],
    mistakes: ["步幅太小导致膝盖压力大", "身体左右晃", "后脚蹬地过多"]
  },
  legCurl: {
    steps: ["调整轴心对准膝关节，身体贴稳器械。", "用腘绳肌把脚跟卷向臀部，顶峰停顿。", "慢慢还原，避免膝盖完全松掉。"],
    mistakes: ["臀部离垫", "速度太快", "脚尖乱晃导致发力分散"]
  },
  legExtension: {
    steps: ["膝关节对准器械轴心，背部贴住靠垫。", "用股四头肌伸膝到接近伸直，顶峰收紧。", "慢慢下放到可控角度，不要让重量片砸回。"],
    mistakes: ["借身体后仰甩起", "顶端暴力锁膝", "坐垫位置太远"]
  },
  calfRaise: {
    steps: ["前脚掌踩稳，脚跟自然下沉到小腿被拉伸。", "用小腿发力把脚跟抬到最高点。", "顶峰停顿后慢慢下降，保持脚踝路径稳定。"],
    mistakes: ["上下弹震", "幅度太短", "脚踝向内外歪"]
  },
  hipThrust: {
    steps: ["上背靠住凳沿，脚掌踩稳，杠铃放在髋部。", "收下巴、卷骨盆，用臀部把髋推到身体接近水平。", "顶峰夹紧臀部，再控制下放。"],
    mistakes: ["腰椎过度反弓", "脚离身体太远", "只追求重量不顶峰收缩"]
  },
  hipHinge: {
    steps: ["双脚站稳，膝盖微屈，先把髋向后推。", "杠铃或哑铃贴近腿部下降，背部保持中立。", "感到大腿后侧拉伸后，用臀腿把髋推回。"],
    mistakes: ["蹲得太多变深蹲", "弓背", "重量离身体太远"]
  },
  hipAbduction: {
    steps: ["骨盆坐稳，核心收紧，脚和膝盖位置固定。", "用臀中肌把膝盖向外打开，顶峰停顿。", "慢慢回到起点，不要让重量片完全砸回。"],
    mistakes: ["身体大幅前后摆", "借惯性弹开", "动作幅度过小"]
  },
  curl: {
    steps: ["上臂贴近身体，肩膀放松，手腕保持中立。", "用二头肌弯举到前臂接近竖直。", "下放时控制离心，不要让肘部向后漂。"],
    mistakes: ["身体后仰甩重量", "手腕乱折", "肘部前后移动太多"]
  },
  tricepsPushdown: {
    steps: ["身体微微前倾，上臂固定在身体两侧。", "用三头肌把绳索或直杆下压到手臂伸直。", "顶峰外旋或停顿，再控制还原到前臂上抬。"],
    mistakes: ["肘部向前后晃", "耸肩下压", "重量太大导致身体压下去"]
  },
  skullCrusher: {
    steps: ["仰卧后上臂略向后倾，肩膀稳定。", "弯曲肘部把重量下放到额头后方。", "保持上臂不乱动，用三头肌伸直手臂。"],
    mistakes: ["肘部大幅外张", "下放到脸上太危险", "肩部代偿摆动"]
  },
  plank: {
    steps: ["肘部在肩膀正下方，脚尖踩稳。", "收紧腹部和臀部，让身体成一条直线。", "保持自然呼吸，不要憋气或耸肩。"],
    mistakes: ["塌腰", "臀部抬太高", "脖子过度仰起"]
  },
  deadBug: {
    steps: ["仰卧屈髋屈膝，腰背轻贴地面。", "对侧手脚慢慢伸远，核心保持不拱腰。", "回到起点后换边，动作越慢越有效。"],
    mistakes: ["腰离开地面", "速度太快", "肩颈紧张"]
  },
  crunch: {
    steps: ["仰卧屈膝，下背自然贴地。", "用腹部卷起上背，肋骨向骨盆靠近。", "顶峰停顿后慢慢回落，不要用手拉头。"],
    mistakes: ["拉脖子", "坐起幅度过大", "借惯性弹起"]
  },
  hangingLegRaise: {
    steps: ["双手悬垂，肩胛保持稳定，身体减少摆动。", "骨盆后卷，把膝盖或腿向上抬。", "慢慢下放，保持腹部控制。"],
    mistakes: ["甩腿借力", "只屈髋不卷腹", "下放失控"]
  },
  twist: {
    steps: ["坐稳后身体微微后倾，核心收紧。", "带动胸腔左右旋转，手随身体走。", "每次转动都控制停顿，不要只甩手。"],
    mistakes: ["腰椎硬拧", "速度太快", "肩膀代替核心发力"]
  },
  sidePlank: {
    steps: ["肘部在肩膀下方，身体侧向成一直线。", "把髋抬起，腹斜肌和臀中肌同时发力。", "保持骨盆不前后翻，平稳呼吸。"],
    mistakes: ["髋部下掉", "肩膀顶不住", "身体向前后滚动"]
  },
  cardioSteady: {
    steps: ["先用 5 分钟低强度热身，逐渐进入目标心率。", "保持能持续说短句的节奏，动作放松稳定。", "结束前慢慢降速，给心率回落时间。"],
    mistakes: ["一开始冲太快", "忽略热身和冷身", "为了速度牺牲动作姿态"]
  },
  rowingMachine: {
    steps: ["先蹬腿，再打开髋部，最后手臂拉到肋骨下方。", "回程顺序相反：手臂、髋部、膝盖。", "保持背部中立，用腿部输出主要力量。"],
    mistakes: ["先拉手臂", "弓背滑行", "节奏混乱"]
  },
  jumpRope: {
    steps: ["手肘靠近身体，用手腕带动绳子。", "脚尖轻轻离地，落地保持膝盖微屈。", "先稳定节奏，再增加速度或花样。"],
    mistakes: ["跳得太高", "用肩膀大幅甩绳", "落地声音太重"]
  },
  burpee: {
    steps: ["下蹲撑地后双脚向后跳到平板位。", "完成俯卧撑或保持支撑后，双脚回到手旁。", "站起或跳起时收紧核心，保持节奏。"],
    mistakes: ["塌腰落地", "动作散乱追求数量", "膝盖内扣跳起"]
  },
  kettlebellSwing: {
    steps: ["壶铃在身前，髋部后坐让壶铃向后摆。", "用臀腿爆发伸髋，壶铃自然摆到胸前。", "手臂只是连接壶铃，不主动前平举。"],
    mistakes: ["蹲起代替髋铰链", "用肩膀抬壶铃", "腰背弯曲"]
  },
  boxJump: {
    steps: ["站在箱前，髋膝一起预摆。", "双脚同时发力跳上箱，落地时膝盖跟随脚尖。", "站稳后再走下，不要急着反跳。"],
    mistakes: ["箱子过高导致摔倒", "落地膝盖内扣", "疲劳后继续硬跳"]
  },
  wallSit: {
    steps: ["背部贴墙，脚向前走到膝盖约 90 度。", "膝盖对准脚尖，核心收紧。", "保持呼吸和大腿张力，不要用手撑腿。"],
    mistakes: ["膝盖超过脚尖太多", "背离开墙", "重心压到脚尖"]
  }
};

const exercisePresetMap = {
  bench: "bench",
  "incline-db-press": "inclinePress",
  pushup: "pushup",
  "cable-fly": "fly",
  "db-fly": "fly",
  "pec-deck": "fly",
  dips: "dips",
  pullup: "pullup",
  "lat-pulldown": "pulldown",
  "seated-row": "row",
  "one-arm-row": "oneArmRow",
  "inverted-row": "row",
  "tbar-row": "row",
  deadlift: "deadlift",
  shrug: "shrug",
  "shoulder-press": "shoulderPress",
  "arnold-press": "shoulderPress",
  "lateral-raise": "raise",
  "front-raise": "raise",
  "face-pull": "rearDelt",
  "rear-delt-fly": "rearDelt",
  "pull-apart": "rearDelt",
  squat: "squat",
  "bodyweight-squat": "squat",
  "leg-press": "legPress",
  lunge: "lunge",
  "bulgarian-split-squat": "lunge",
  "leg-curl": "legCurl",
  "leg-extension": "legExtension",
  "calf-raise": "calfRaise",
  "hip-thrust": "hipThrust",
  "glute-bridge": "hipThrust",
  rdl: "hipHinge",
  "hip-abduction": "hipAbduction",
  kickback: "hipAbduction",
  "biceps-curl": "curl",
  "hammer-curl": "curl",
  "preacher-curl": "curl",
  "triceps-pushdown": "tricepsPushdown",
  "skull-crusher": "skullCrusher",
  "close-grip-bench": "bench",
  plank: "plank",
  "dead-bug": "deadBug",
  crunch: "crunch",
  "mountain-climber": "plank",
  "hanging-leg-raise": "hangingLegRaise",
  "russian-twist": "twist",
  "side-plank": "sidePlank",
  run: "cardioSteady",
  cycling: "cardioSteady",
  elliptical: "cardioSteady",
  "stair-climber": "cardioSteady",
  rowing: "rowingMachine",
  "jump-rope": "jumpRope",
  burpee: "burpee",
  "battle-rope": "cardioSteady",
  "kettlebell-swing": "kettlebellSwing",
  "box-jump": "boxJump",
  "wall-sit": "wallSit"
};

function buildVideoLinks(title, en) {
  const query = encodeURIComponent(`${title} ${en} 正确动作 教学`);
  return {
    bilibili: `https://search.bilibili.com/all?keyword=${query}`,
    youtube: `https://www.youtube.com/results?search_query=${query}`
  };
}

const exerciseDatabase = exerciseSeed.map(([id, group, title, en, template]) => ({
  id,
  group,
  title,
  en,
  image: imageByGroup[group],
  template,
  steps: guidancePresets[exercisePresetMap[id]].steps,
  mistakes: guidancePresets[exercisePresetMap[id]].mistakes,
  video: buildVideoLinks(title, en)
}));

const foodDatabase = [
  ["米饭", 116, "主食"], ["面条", 137, "主食"], ["馒头", 223, "主食"], ["全麦面包", 246, "主食"],
  ["燕麦", 338, "主食"], ["红薯", 86, "主食"], ["玉米", 112, "主食"], ["土豆", 81, "主食"],
  ["鸡胸肉", 165, "肉蛋奶"], ["鸡腿肉", 181, "肉蛋奶"], ["牛肉", 250, "肉蛋奶"], ["猪里脊", 155, "肉蛋奶"],
  ["三文鱼", 208, "肉蛋奶"], ["虾仁", 99, "肉蛋奶"], ["鸡蛋", 144, "肉蛋奶"], ["牛奶", 54, "肉蛋奶"],
  ["无糖酸奶", 63, "肉蛋奶"], ["豆腐", 76, "肉蛋奶"], ["西兰花", 34, "蔬菜"], ["生菜", 15, "蔬菜"],
  ["番茄", 18, "蔬菜"], ["黄瓜", 16, "蔬菜"], ["胡萝卜", 41, "蔬菜"], ["菠菜", 23, "蔬菜"],
  ["香蕉", 93, "水果"], ["苹果", 53, "水果"], ["橙子", 47, "水果"], ["蓝莓", 57, "水果"],
  ["牛油果", 160, "水果"], ["花生酱", 588, "零食"], ["杏仁", 579, "零食"], ["黑巧克力", 546, "零食"],
  ["蛋白粉", 390, "健身"], ["肌酸", 0, "健身"], ["拿铁", 55, "饮品"], ["美式咖啡", 2, "饮品"],
  ["可乐", 43, "饮品"], ["奶茶", 70, "饮品"], ["包子", 227, "主食"], ["饺子", 253, "主食"],
  ["河粉", 150, "主食"], ["意面", 158, "主食"], ["炒饭", 188, "主食"], ["粥", 46, "主食"],
  ["鸡翅", 194, "肉蛋奶"], ["瘦猪肉", 143, "肉蛋奶"], ["羊肉", 203, "肉蛋奶"], ["金枪鱼", 132, "肉蛋奶"],
  ["鳕鱼", 82, "肉蛋奶"], ["火腿肠", 212, "肉蛋奶"], ["豆浆", 31, "饮品"], ["低脂牛奶", 43, "肉蛋奶"],
  ["奶酪", 328, "肉蛋奶"], ["花菜", 25, "蔬菜"], ["包菜", 24, "蔬菜"], ["青椒", 22, "蔬菜"],
  ["蘑菇", 22, "蔬菜"], ["南瓜", 23, "蔬菜"], ["葡萄", 45, "水果"], ["西瓜", 31, "水果"],
  ["草莓", 32, "水果"], ["芒果", 60, "水果"], ["猕猴桃", 61, "水果"], ["核桃", 646, "零食"],
  ["腰果", 553, "零食"], ["薯片", 536, "零食"], ["冰淇淋", 207, "零食"], ["蜂蜜", 304, "调味"],
  ["橄榄油", 884, "调味"], ["沙拉酱", 450, "调味"], ["番茄酱", 112, "调味"], ["啤酒", 43, "饮品"]
].map(([name, calories, category]) => ({ name, calories, category }));

const initialState = {
  money: [
    { type: "income", amount: 1200, category: "收入", note: "兼职收入", date: "今天" },
    { type: "expense", amount: 36, category: "餐饮", note: "午餐", date: "今天" },
    { type: "expense", amount: 99, category: "蛋白补剂", note: "蛋白粉", date: "昨天" }
  ],
  foods: [
    { name: "鸡胸肉", amount: 180, caloriesPer100: 165, meal: "午餐", calories: 297, date: "今天" },
    { name: "米饭", amount: 150, caloriesPer100: 116, meal: "午餐", calories: 174, date: "今天" }
  ],
  training: [
    { day: "周一", focus: "胸", plan: "杠铃卧推 4x8，哑铃推肩 3x10", done: true },
    { day: "周三", focus: "背", plan: "引体向上 4 组，划船 4x10", done: false },
    { day: "周五", focus: "腿", plan: "深蹲 5x5，罗马尼亚硬拉 3x8", done: false }
  ],
  checkins: [
    { date: "周一", weight: 73.2, energy: 6, workout: "完成", spending: 68 },
    { date: "周二", weight: 72.9, energy: 7, workout: "轻量", spending: 42 },
    { date: "周三", weight: 72.8, energy: 8, workout: "完成", spending: 55 },
    { date: "周四", weight: 72.7, energy: 6, workout: "休息", spending: 31 },
    { date: "周五", weight: 72.5, energy: 7, workout: "完成", spending: 74 }
  ],
  selectedExercise: "bench",
  exerciseSearch: "",
  exerciseFilter: "全部",
  exerciseView: "list",
  exerciseExpanded: false,
  review: null
};

let storageAvailable = true;
let storageNoticeShown = false;
let state = loadState();
document.documentElement.classList.add("js-ready");

function safeReadStorage(key) {
  try {
    if (!window.localStorage) return null;
    return window.localStorage.getItem(key);
  } catch (error) {
    storageAvailable = false;
    return null;
  }
}

function safeWriteStorage(key, value) {
  try {
    if (!storageAvailable || !window.localStorage) return false;
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    storageAvailable = false;
    showStorageNotice();
    return false;
  }
}

function normalizeState(parsed) {
  const defaults = clone(initialState);
  const next = Object.assign({}, defaults, parsed && typeof parsed === "object" ? parsed : {});
  ["money", "foods", "training", "checkins"].forEach((key) => {
    if (!Array.isArray(next[key])) next[key] = defaults[key];
  });
  if (!exerciseDatabase.some((exercise) => exercise.id === next.selectedExercise)) {
    next.selectedExercise = "bench";
  }
  const validFilters = ["全部"].concat(Array.from(new Set(exerciseDatabase.map((exercise) => exercise.group))));
  if (!next.exerciseFilter || validFilters.indexOf(next.exerciseFilter) === -1) {
    next.exerciseFilter = "全部";
  }
  next.exerciseSearch = "";
  next.exerciseFilter = "全部";
  next.exerciseView = "list";
  next.exerciseExpanded = false;
  return next;
}

function loadState() {
  const saved = safeReadStorage(storageKey);
  if (!saved) return clone(initialState);
  try {
    const parsed = JSON.parse(saved);
    return normalizeState(parsed);
  } catch {
    return clone(initialState);
  }
}

function saveState() {
  safeWriteStorage(storageKey, JSON.stringify(state));
}

function showStorageNotice() {
  if (storageNoticeShown) return;
  const workspaceHeading = document.querySelector("#workspace .section-heading");
  if (!workspaceHeading) return;
  storageNoticeShown = true;
  const notice = document.createElement("p");
  notice.className = "storage-warning";
  notice.textContent = "当前浏览器限制了本地存储，本次记录可以临时使用，但刷新后可能不会保存。";
  workspaceHeading.appendChild(notice);
}

function closestElement(target, selector) {
  let node = target && target.nodeType === 1 ? target : target && target.parentElement;
  while (node && node !== document) {
    if (node.matches && node.matches(selector)) return node;
    node = node.parentElement;
  }
  return null;
}

function on(selector, eventName, handler) {
  const element = document.querySelector(selector);
  if (element) element.addEventListener(eventName, handler);
}

function showAppError(error) {
  const workspace = document.querySelector("#workspace");
  if (!workspace) return;
  const notice = document.createElement("div");
  notice.className = "app-error";
  notice.textContent = "页面功能加载时遇到兼容问题，请刷新后重试。";
  workspace.insertBefore(notice, workspace.firstElementChild);
  console.error(error);
}

function formatCurrency(value) {
  return `¥${Math.round(value).toLocaleString("zh-CN")}`;
}

function todayLabel() {
  return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(new Date());
}

function calculateStats() {
  const income = state.money.filter((item) => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0);
  const expense = state.money.filter((item) => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);
  const completed = state.training.filter((item) => item.done).length;
  const total = state.training.length || 1;
  const trainingRate = Math.round((completed / total) * 100);
  const latestCheckin = state.checkins.length ? state.checkins[state.checkins.length - 1] : null;
  const latestEnergy = latestCheckin ? latestCheckin.energy : 5;
  const spendingScore = income === 0 ? 45 : Math.max(20, Math.round(((income - expense) / income) * 60 + 40));
  const disciplineScore = Math.max(0, Math.min(100, Math.round(trainingRate * 0.45 + spendingScore * 0.35 + latestEnergy * 2)));
  return { balance: income - expense, trainingRate, disciplineScore };
}

function renderStats() {
  const stats = calculateStats();
  document.querySelector("#balanceAmount").textContent = formatCurrency(stats.balance);
  document.querySelector("#trainingRate").textContent = `${stats.trainingRate}%`;
  document.querySelector("#disciplineScore").textContent = stats.disciplineScore;
}

function renderMoney() {
  const list = document.querySelector("#moneyList");
  list.innerHTML = "";
  state.money.slice().reverse().forEach((item) => {
    const row = document.createElement("article");
    row.className = "item";
    row.innerHTML = `
      <div>
        <strong>${item.category} · ${item.note || "未填写备注"}</strong>
        <small>${item.date} · ${item.type === "income" ? "收入 Income" : "支出 Expense"}</small>
      </div>
      <span class="amount ${item.type}">${item.type === "income" ? "+" : "-"}${formatCurrency(item.amount)}</span>
    `;
    list.appendChild(row);
  });
}

function findFood(name) {
  const normalized = name.trim().toLowerCase();
  return foodDatabase.find((food) => food.name.toLowerCase() === normalized)
    || foodDatabase.find((food) => food.name.toLowerCase().includes(normalized) || normalized.includes(food.name.toLowerCase()));
}

function renderFoodSuggestions() {
  const suggestions = document.querySelector("#foodSuggestions");
  suggestions.innerHTML = foodDatabase.map((food) => `<option value="${food.name}">${food.calories} kcal/100g · ${food.category}</option>`).join("");
}

function renderFood() {
  const list = document.querySelector("#foodList");
  const today = todayLabel();
  const todayFoods = state.foods.filter((item) => item.date === today || item.date === "今天");
  const total = todayFoods.reduce((sum, item) => sum + Number(item.calories), 0);
  document.querySelector("#todayCalories").textContent = `${Math.round(total)} kcal`;
  list.innerHTML = "";
  state.foods.slice().reverse().forEach((item) => {
    const row = document.createElement("article");
    row.className = "item";
    row.innerHTML = `
      <div>
        <strong>${item.name} · ${item.meal}</strong>
        <small>${item.amount}g · ${item.caloriesPer100} kcal/100g · ${item.date}</small>
      </div>
      <span class="amount income">${Math.round(item.calories)} kcal</span>
    `;
    list.appendChild(row);
  });
}

function renderTraining() {
  const list = document.querySelector("#trainingList");
  list.innerHTML = "";
  state.training.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "item";
    row.innerHTML = `
      <div>
        <strong>${item.day} · ${item.focus}</strong>
        <small>${item.plan}</small>
      </div>
      <button class="complete-button ${item.done ? "done" : ""}" data-index="${index}">
        ${item.done ? "已完成" : "标记完成"}
      </button>
    `;
    list.appendChild(row);
  });
  renderReminderText();
}

function filteredExercises() {
  const query = state.exerciseSearch.trim().toLowerCase();
  return exerciseDatabase.filter((exercise) => {
    const matchesGroup = state.exerciseFilter === "全部" || exercise.group === state.exerciseFilter;
    const haystack = `${exercise.title} ${exercise.en} ${exercise.group}`.toLowerCase();
    return matchesGroup && (!query || haystack.includes(query));
  });
}

function renderExerciseFilters() {
  const filter = document.querySelector("#exerciseFilter");
  const groups = ["全部"].concat(Array.from(new Set(exerciseDatabase.map((exercise) => exercise.group))));
  filter.innerHTML = groups.map((group) => `<option value="${group}">${group === "全部" ? "全部 All" : group}</option>`).join("");
  filter.value = state.exerciseFilter;
  document.querySelector("#exerciseSearch").value = state.exerciseSearch;
}

function renderExerciseLibrary() {
  const library = document.querySelector("#exerciseLibrary");
  const libraryBand = document.querySelector("#library");
  const results = filteredExercises();
  const isCompactMobileList = isMobileLibraryView()
    && state.exerciseView !== "detail"
    && !state.exerciseExpanded
    && !state.exerciseSearch.trim()
    && state.exerciseFilter === "全部";
  const visibleResults = isCompactMobileList ? results.slice(0, 12) : results;
  document.querySelector("#exerciseCount").textContent = `${results.length} 个动作`;
  library.innerHTML = "";
  if (libraryBand) {
    libraryBand.classList.toggle("mobile-detail-open", state.exerciseView === "detail");
  }

  if (!results.some((exercise) => exercise.id === state.selectedExercise) && results[0]) {
    state.selectedExercise = results[0].id;
  }

  if (results.length === 0) {
    library.innerHTML = `<p class="empty">没有找到这个动作，可以换个关键词试试。</p>`;
    renderExerciseDetail();
    return;
  }

  if (isCompactMobileList) {
    const compactHint = document.createElement("div");
    compactHint.className = "mobile-library-hint";
    compactHint.innerHTML = `
      <strong>常用动作先显示 12 个</strong>
      <span>可以搜索动作、按部位筛选，或展开完整动作库。</span>
      <button type="button" id="expandExerciseList">展开全部动作</button>
    `;
    library.appendChild(compactHint);
  }

  visibleResults.forEach((exercise) => {
    const card = document.createElement("article");
    card.className = `exercise-card ${state.selectedExercise === exercise.id ? "active" : ""}`;
    card.dataset.exercise = exercise.id;
    card.innerHTML = `
      <img src="${exercise.image}" alt="${exercise.title}动作教学图片" />
      <div>
        <h3>${exercise.title}</h3>
        <p>${exercise.en} · ${exercise.group}</p>
        <button type="button" data-action="open-detail">查看动作详情</button>
      </div>
    `;
    library.appendChild(card);
  });

  if (isCompactMobileList && results.length > visibleResults.length) {
    const moreButton = document.createElement("button");
    moreButton.className = "library-expand-button";
    moreButton.type = "button";
    moreButton.id = "expandExerciseListBottom";
    moreButton.textContent = `查看全部 ${results.length} 个动作`;
    library.appendChild(moreButton);
  }
  renderExerciseDetail();
}

function renderExerciseDetail() {
  const detail = document.querySelector("#exerciseDetail");
  const exercise = exerciseDatabase.find((item) => item.id === state.selectedExercise);
  if (!exercise) {
    detail.innerHTML = `<div class="exercise-detail-body"><p class="empty">请选择一个动作查看教学详情。</p></div>`;
    return;
  }
  detail.innerHTML = `
    <button class="detail-back" type="button" id="backToExerciseList">返回动作列表</button>
    <img src="${exercise.image}" alt="${exercise.title}动作详情图片" />
    <div class="exercise-detail-body">
      <h3>${exercise.title}</h3>
      <p class="detail-en">${exercise.en} · ${exercise.group}</p>
      <div class="detail-columns">
        <section>
          <h4>动作步骤 Steps</h4>
          <ol>${exercise.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
        </section>
        <section>
          <h4>常见错误 Mistakes</h4>
          <ul>${exercise.mistakes.map((mistake) => `<li>${mistake}</li>`).join("")}</ul>
        </section>
      </div>
      <div class="video-box">
        <h4>视频教程 Video Tutorial</h4>
        <p>点击后会打开该动作的教程搜索结果，优先选择真人完整示范、讲解清晰、评论区反馈正常的视频。</p>
        <div class="video-links">
          <a href="${exercise.video.bilibili}" target="_blank" rel="noopener">B站教程</a>
          <a href="${exercise.video.youtube}" target="_blank" rel="noopener">YouTube Tutorial</a>
        </div>
      </div>
      <div class="template-box">
        <h4>训练模板 Template</h4>
        <p>${exercise.template}</p>
        <button class="button primary full" type="button" id="useExerciseTemplate">填入本周计划</button>
      </div>
    </div>
  `;
}

function isMobileLibraryView() {
  return window.matchMedia && window.matchMedia("(max-width: 560px)").matches;
}

function openExerciseDetail(exerciseId) {
  state.selectedExercise = exerciseId;
  if (isMobileLibraryView()) state.exerciseView = "detail";
  saveState();
  renderExerciseLibrary();
  if (isMobileLibraryView()) {
    document.querySelector("#library").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function closeExerciseDetail() {
  state.exerciseView = "list";
  saveState();
  renderExerciseLibrary();
  document.querySelector("#library").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderTrend() {
  const canvas = document.querySelector("#trendCanvas");
  const items = state.checkins.slice(-7);
  canvas.innerHTML = "";
  const maxSpend = Math.max.apply(null, items.map((item) => Number(item.spending)).concat([1]));
  items.forEach((item) => {
    const spendingHeight = Math.max(8, Math.round((Number(item.spending) / maxSpend) * 170));
    const energyHeight = Math.max(8, Math.round((Number(item.energy) / 10) * 170));
    const day = document.createElement("div");
    day.className = "trend-day";
    day.innerHTML = `
      <div class="trend-bars" title="${item.date}: 状态 ${item.energy}/10，消费 ${formatCurrency(item.spending)}">
        <div class="trend-bar spending" style="height: ${spendingHeight}px"></div>
        <div class="trend-bar energy" style="height: ${energyHeight}px"></div>
      </div>
      <span>${item.date}</span>
    `;
    canvas.appendChild(day);
  });
}

function renderReview() {
  const output = document.querySelector("#reviewOutput");
  const stats = calculateStats();
  if (!state.review) {
    output.innerHTML = `<p class="empty">完成一次记录后，这里会显示你的周复盘摘要。</p>`;
    return;
  }
  output.innerHTML = `
    <h3>本周复盘 · Weekly Review</h3>
    <p>${state.review.text || "这周还没有填写详细复盘。"}</p>
    <ul>
      <li>状态评分：${state.review.energy}/10</li>
      <li>本月结余：${formatCurrency(stats.balance)}</li>
      <li>训练完成率：${stats.trainingRate}%</li>
      <li>下周重点：${state.review.nextFocus || "保持记录，完成计划"}</li>
    </ul>
  `;
}

function useSelectedExerciseTemplate() {
  const exercise = exerciseDatabase.find((item) => item.id === state.selectedExercise) || exerciseDatabase[0];
  const focusMap = {
    胸: "胸肩三头",
    肩: "胸肩三头",
    手臂: "胸肩三头",
    背: "背二头",
    腿: "腿臀",
    臀: "腿臀",
    核心: "核心",
    有氧: "有氧",
    自重: "全身"
  };
  document.querySelector("#trainingFocus").value = focusMap[exercise.group] || "全身";
  document.querySelector("#trainingPlan").value = exercise.template;
  document.querySelector("#workspace").scrollIntoView({ behavior: "smooth" });
}

function renderReminderText() {
  const next = state.training.find((item) => !item.done) || state.training[0];
  document.querySelector("#nextReminderText").textContent = next
    ? `下一次：${next.day} · ${next.focus} · ${next.plan}`
    : "还没有训练计划。";
}

function enableTrainingReminder() {
  const next = state.training.find((item) => !item.done) || state.training[0];
  if (!next) return;
  const message = `FitLedger 提醒：${next.day} 训练 ${next.focus}。${next.plan}`;

  if (!("Notification" in window) || !Notification.requestPermission) {
    alert(message);
    return;
  }

  const notify = () => {
    try {
      new Notification("FitLedger 训练提醒", { body: message });
    } catch (error) {
      alert(message);
    }
  };

  if (Notification.permission === "granted") {
    notify();
    return;
  }

  const permissionResult = Notification.requestPermission();
  if (!permissionResult || typeof permissionResult.then !== "function") {
    alert(message);
    return;
  }
  permissionResult.then((permission) => {
    if (permission === "granted") {
      notify();
    } else {
      alert(message);
    }
  }).catch(() => {
    alert(message);
  });
}

function setupRevealAnimation() {
  const targets = document.querySelectorAll(".reveal-section, .module, .panel, .audience-grid article, .story-copy, .story-steps");
  if (window.matchMedia && window.matchMedia("(max-width: 900px)").matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
    { threshold: 0.14 }
  );
  targets.forEach((target) => observer.observe(target));
}

function renderAll() {
  renderStats();
  renderMoney();
  renderFoodSuggestions();
  renderFood();
  renderTraining();
  renderExerciseFilters();
  renderExerciseLibrary();
  renderTrend();
  renderReview();
}

function bindEvents() {
  on("#expenseForm", "submit", (event) => {
    event.preventDefault();
    const amount = Number(document.querySelector("#entryAmount").value);
    if (!amount) return;
    state.money.push({
      type: document.querySelector("#entryType").value,
      amount,
      category: document.querySelector("#entryCategory").value,
      note: document.querySelector("#entryNote").value.trim(),
      date: todayLabel()
    });
    event.target.reset();
    saveState();
    renderAll();
  });

  on("#foodName", "input", (event) => {
    const food = findFood(event.target.value);
    const hint = document.querySelector("#foodHint");
    if (food) {
      document.querySelector("#foodCalories").value = food.calories;
      hint.textContent = `已匹配：${food.name} · ${food.calories} kcal/100g · ${food.category}。可按实际包装手动修改。`;
    } else {
      hint.textContent = "未匹配到食物，可自行填写每100g热量。";
    }
  });

  on("#foodForm", "submit", (event) => {
    event.preventDefault();
    const amount = Number(document.querySelector("#foodAmount").value);
    const caloriesPer100 = Number(document.querySelector("#foodCalories").value);
    const calories = (amount / 100) * caloriesPer100;
    state.foods.push({
      name: document.querySelector("#foodName").value.trim(),
      amount,
      caloriesPer100,
      meal: document.querySelector("#foodMeal").value,
      calories,
      date: todayLabel()
    });
    event.target.reset();
    document.querySelector("#foodHint").textContent = "输入食物名称后，会自动匹配常见每100g热量，可手动修改。";
    saveState();
    renderAll();
  });

  on("#trainingForm", "submit", (event) => {
    event.preventDefault();
    state.training.push({
      day: document.querySelector("#trainingDay").value,
      focus: document.querySelector("#trainingFocus").value,
      plan: document.querySelector("#trainingPlan").value.trim(),
      done: false
    });
    event.target.reset();
    saveState();
    renderAll();
  });

  on("#exerciseSearch", "input", (event) => {
    state.exerciseSearch = event.target.value;
    state.exerciseView = "list";
    state.exerciseExpanded = false;
    renderExerciseLibrary();
  });

  on("#exerciseFilter", "change", (event) => {
    state.exerciseFilter = event.target.value;
    state.exerciseView = "list";
    state.exerciseExpanded = event.target.value !== "全部";
    renderExerciseLibrary();
  });

  on("#exerciseLibrary", "click", (event) => {
    if (closestElement(event.target, "#expandExerciseList") || closestElement(event.target, "#expandExerciseListBottom")) {
      state.exerciseExpanded = true;
      saveState();
      renderExerciseLibrary();
      return;
    }
    const card = closestElement(event.target, ".exercise-card");
    if (!card) return;
    openExerciseDetail(card.dataset.exercise);
  });

  on("#exerciseDetail", "click", (event) => {
    if (closestElement(event.target, "#backToExerciseList")) {
      closeExerciseDetail();
      return;
    }
    if (closestElement(event.target, "#useExerciseTemplate")) useSelectedExerciseTemplate();
  });

  on("#trainingList", "click", (event) => {
    const button = closestElement(event.target, ".complete-button");
    if (!button) return;
    const index = Number(button.dataset.index);
    if (!state.training[index]) return;
    state.training[index].done = !state.training[index].done;
    saveState();
    renderAll();
  });

  on("#enableReminder", "click", enableTrainingReminder);

  on("#checkinForm", "submit", (event) => {
    event.preventDefault();
    state.checkins.push({
      date: todayLabel(),
      weight: Number(document.querySelector("#checkinWeight").value),
      energy: Number(document.querySelector("#checkinEnergy").value),
      workout: document.querySelector("#checkinWorkout").value,
      spending: Number(document.querySelector("#checkinSpending").value)
    });
    event.target.reset();
    saveState();
    renderAll();
  });

  on("#reviewForm", "submit", (event) => {
    event.preventDefault();
    state.review = {
      energy: document.querySelector("#reviewEnergy").value,
      text: document.querySelector("#reviewText").value.trim(),
      nextFocus: document.querySelector("#nextFocus").value.trim()
    };
    saveState();
    renderAll();
  });
}

try {
  bindEvents();
  renderAll();
  setupRevealAnimation();
  if (!storageAvailable) showStorageNotice();
} catch (error) {
  showAppError(error);
}
