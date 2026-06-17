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

const exerciseDatabase = exerciseSeed.map(([id, group, title, en, template]) => ({
  id,
  group,
  title,
  en,
  image: imageByGroup[group],
  template,
  steps: [
    "先调整站姿或器械位置，保持核心收紧。",
    "用目标肌群发力完成动作，避免借力和失控。",
    "还原阶段放慢速度，保持关节稳定和呼吸节奏。"
  ],
  mistakes: ["动作太快导致失控", "只追求重量忽略姿势", "关节方向和发力方向不一致"]
}));

const featuredDetails = {
  pullup: {
    steps: ["双手略宽于肩，先让肩胛下沉。", "胸口向单杠靠近，想象用肘部向下拉。", "下降时控制身体，不要完全松掉肩膀。"],
    mistakes: ["只用手臂硬拉", "身体大幅摆动", "下放太快"]
  },
  squat: {
    steps: ["双脚与肩同宽，脚尖自然外展。", "下蹲时膝盖跟随脚尖方向，核心收紧。", "站起时脚掌均匀发力，避免膝盖内扣。"],
    mistakes: ["膝盖内扣", "弓背塌腰", "重心过度前移"]
  },
  bench: {
    steps: ["肩胛后缩下沉，双脚踩稳地面。", "杠铃下降到胸中下部，手腕保持中立。", "推起时保持胸部发力，不要耸肩。"],
    mistakes: ["肘部外展过大", "臀部离凳", "下放速度失控"]
  },
  plank: {
    steps: ["肘部在肩膀正下方，脚尖踩稳。", "收紧腹部和臀部，让身体成一条直线。", "保持自然呼吸，不要憋气。"],
    mistakes: ["塌腰", "臀部抬太高", "脖子过度仰起"]
  }
};

exerciseDatabase.forEach((exercise) => {
  if (featuredDetails[exercise.id]) Object.assign(exercise, featuredDetails[exercise.id]);
});

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
  review: null
};

let state = loadState();

function loadState() {
  const saved = window.localStorage.getItem(storageKey);
  if (!saved) return clone(initialState);
  try {
    return { ...clone(initialState), ...JSON.parse(saved) };
  } catch {
    return clone(initialState);
  }
}

function saveState() {
  window.localStorage.setItem(storageKey, JSON.stringify(state));
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
  const latestEnergy = state.checkins.at(-1)?.energy || 5;
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
  const groups = ["全部", ...new Set(exerciseDatabase.map((exercise) => exercise.group))];
  filter.innerHTML = groups.map((group) => `<option value="${group}">${group === "全部" ? "全部 All" : group}</option>`).join("");
  filter.value = state.exerciseFilter;
  document.querySelector("#exerciseSearch").value = state.exerciseSearch;
}

function renderExerciseLibrary() {
  const library = document.querySelector("#exerciseLibrary");
  const results = filteredExercises();
  document.querySelector("#exerciseCount").textContent = `${results.length} 个动作`;
  library.innerHTML = "";

  if (!results.some((exercise) => exercise.id === state.selectedExercise) && results[0]) {
    state.selectedExercise = results[0].id;
  }

  if (results.length === 0) {
    library.innerHTML = `<p class="empty">没有找到这个动作，可以换个关键词试试。</p>`;
    renderExerciseDetail();
    return;
  }

  results.forEach((exercise) => {
    const card = document.createElement("article");
    card.className = `exercise-card ${state.selectedExercise === exercise.id ? "active" : ""}`;
    card.dataset.exercise = exercise.id;
    card.innerHTML = `
      <img src="${exercise.image}" alt="${exercise.title}动作教学图片" />
      <div>
        <h3>${exercise.title}</h3>
        <p>${exercise.en} · ${exercise.group}</p>
        <button type="button" data-action="use-template">加入本周计划</button>
      </div>
    `;
    library.appendChild(card);
  });
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
      <div class="template-box">
        <h4>训练模板 Template</h4>
        <p>${exercise.template}</p>
        <button class="button primary full" type="button" id="useExerciseTemplate">填入本周计划</button>
      </div>
    </div>
  `;
}

function renderTrend() {
  const canvas = document.querySelector("#trendCanvas");
  const items = state.checkins.slice(-7);
  canvas.innerHTML = "";
  const maxSpend = Math.max(...items.map((item) => Number(item.spending)), 1);
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

  if (!("Notification" in window)) {
    alert(message);
    return;
  }

  if (Notification.permission === "granted") {
    new Notification("FitLedger 训练提醒", { body: message });
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      new Notification("FitLedger 训练提醒", { body: message });
    } else {
      alert(message);
    }
  });
}

function setupRevealAnimation() {
  const targets = document.querySelectorAll(".reveal-section, .module, .panel, .audience-grid article, .story-copy, .story-steps");
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

document.querySelector("#expenseForm").addEventListener("submit", (event) => {
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

document.querySelector("#foodName").addEventListener("input", (event) => {
  const food = findFood(event.target.value);
  const hint = document.querySelector("#foodHint");
  if (food) {
    document.querySelector("#foodCalories").value = food.calories;
    hint.textContent = `已匹配：${food.name} · ${food.calories} kcal/100g · ${food.category}。可按实际包装手动修改。`;
  } else {
    hint.textContent = "未匹配到食物，可自行填写每100g热量。";
  }
});

document.querySelector("#foodForm").addEventListener("submit", (event) => {
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

document.querySelector("#trainingForm").addEventListener("submit", (event) => {
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

document.querySelector("#exerciseSearch").addEventListener("input", (event) => {
  state.exerciseSearch = event.target.value;
  renderExerciseLibrary();
});

document.querySelector("#exerciseFilter").addEventListener("change", (event) => {
  state.exerciseFilter = event.target.value;
  renderExerciseLibrary();
});

document.querySelector("#exerciseLibrary").addEventListener("click", (event) => {
  const card = event.target.closest(".exercise-card");
  if (!card) return;
  state.selectedExercise = card.dataset.exercise;
  saveState();
  renderExerciseLibrary();
  if (event.target.closest("button")) useSelectedExerciseTemplate();
});

document.querySelector("#exerciseDetail").addEventListener("click", (event) => {
  if (event.target.closest("#useExerciseTemplate")) useSelectedExerciseTemplate();
});

document.querySelector("#trainingList").addEventListener("click", (event) => {
  const button = event.target.closest(".complete-button");
  if (!button) return;
  const index = Number(button.dataset.index);
  state.training[index].done = !state.training[index].done;
  saveState();
  renderAll();
});

document.querySelector("#enableReminder").addEventListener("click", enableTrainingReminder);

document.querySelector("#checkinForm").addEventListener("submit", (event) => {
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

document.querySelector("#reviewForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.review = {
    energy: document.querySelector("#reviewEnergy").value,
    text: document.querySelector("#reviewText").value.trim(),
    nextFocus: document.querySelector("#nextFocus").value.trim()
  };
  saveState();
  renderAll();
});

renderAll();
setupRevealAnimation();
