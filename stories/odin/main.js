// «Один на Земле», часть 1. Время — по шкале голоса (work/odin/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе между фразами): ролик замирает (лёгкий наезд), 7,2 с баннер, потом история с того же места.
const B = 49.27, AD = 7.2, STORY = 100.0;
const DUR = STORY + AD;

const SUBS = [
  [0.2, 'ЕСЛИ ВЫ ПРОСНУЛИСЬ,'], [1.4, 'А НА ЗЕМЛЕ НЕ ОСТАЛОСЬ НИ ОДНОГО ЧЕЛОВЕКА,', { 'НИ': RED, 'ОДНОГО': RED }],
  [3.9, 'НЕ БЕГИТЕ ИСКАТЬ ЛЮДЕЙ.', { 'ЛЮДЕЙ.': GOLD }], [5.8, 'ПЕРВЫМ ВАС УБЬЁТ НЕ ОДИНОЧЕСТВО.', { 'УБЬЁТ': RED }],
  [8.4, 'У МИШИ ЕСТЬ ДВОЕ СУТОК,', { 'ДВОЕ': RED, 'СУТОК,': RED }], [10.3, 'ПОКА ЕЩЁ ГОРИТ СВЕТ.'],
  [12.3, 'УТРО.'], [13.0, 'ТЕЛЕФОН БЕЗ СЕТИ.', { 'СЕТИ.': RED }], [14.5, 'УЛИЦЫ ПУСТЫЕ.'],
  [15.8, 'МАШИНЫ СТОЯТ С ОТКРЫТЫМИ ДВЕРЯМИ.'], [18.0, 'ЧАЙ В КРУЖКАХ ЕЩЁ ТЁПЛЫЙ.', { 'ТЁПЛЫЙ.': RED }],
  [20.1, 'ШАГ ПЕРВЫЙ: ЭЛЕКТРИЧЕСТВО.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }],
  [22.4, 'БЕЗ ЛЮДЕЙ ЭЛЕКТРОСТАНЦИИ ОТКЛЮЧАТСЯ САМИ,', { 'ОТКЛЮЧАТСЯ': RED }], [25.3, 'МАКСИМУМ ЗА ПАРУ ДНЕЙ.', { 'ПАРУ': RED, 'ДНЕЙ.': RED }],
  [27.2, 'МИША ЗАРЯЖАЕТ ВСЁ, ЧТО ЕСТЬ,'], [28.8, 'И ЗАБИРАЕТ ГЕНЕРАТОР ИЗ СТРОИТЕЛЬНОГО МАГАЗИНА.', { 'ГЕНЕРАТОР': GREEN }],
  [31.8, 'ШАГ ВТОРОЙ: ВОДА.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }],
  [33.9, 'БЕЗ НАСОСОВ ВОДА ИЗ КРАНА ПРОПАДЁТ ЗА НЕСКОЛЬКО ДНЕЙ.', { 'ПРОПАДЁТ': RED }],
  [37.5, 'МИША НАБИРАЕТ ВАННУ И ВСЕ БУТЫЛКИ,', { 'ВАННУ': GREEN }], [40.2, 'А НА КРЫШЕ СТАВИТ БОЧКИ ДЛЯ ДОЖДЯ.', { 'ДОЖДЯ.': GREEN }],
  [43.0, 'ШАГ ТРЕТИЙ: ЕДА.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [45.0, 'СВЕЖИЕ ПРОДУКТЫ СГНИЮТ ЗА НЕДЕЛЮ,', { 'СГНИЮТ': RED }],
  [47.3, 'КОНСЕРВЫ ПРОЛЕЖАТ ГОДАМИ,', { 'ГОДАМИ,': GREEN }], [49.4, 'НО ЧЕРЕЗ ПАРУ НЕДЕЛЬ'],
  [50.5, 'ГОЛОДНЫЕ ДОМАШНИЕ СОБАКИ'], [52.1, 'НАЧНУТ СБИВАТЬСЯ В СТАИ.', { 'СТАИ.': RED }],
  [54.5, 'ПОЭТОМУ МИША ВЫБИРАЕТ ДОМ С ВЫСОКИМ ЗАБОРОМ.', { 'ЗАБОРОМ.': GREEN }],
  [58.0, 'ШАГ ЧЕТВЁРТЫЙ: РАНЫ.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }], [60.2, 'ТЕПЕРЬ ОПАСНЕЕ ВСЕГО ОБЫЧНАЯ ЦАРАПИНА.', { 'ЦАРАПИНА.': RED }],
  [63.1, 'БЕЗ ВРАЧЕЙ ЛЮБАЯ ИНФЕКЦИЯ МОЖЕТ СТАТЬ СМЕРТЕЛЬНОЙ.', { 'СМЕРТЕЛЬНОЙ.': RED }],
  [67.4, 'МИША СОБИРАЕТ ЛЕКАРСТВА ИЗ ВСЕХ АПТЕК РАЙОНА.', { 'ЛЕКАРСТВА': GREEN }],
  [71.6, 'ШАГ ПЯТЫЙ: СИГНАЛ.', { 'ШАГ': GOLD, 'ПЯТЫЙ:': GOLD }], [73.5, 'ЕСЛИ ВЫЖИЛ КТО-ТО ЕЩЁ,'],
  [75.2, 'ОН БУДЕТ СЛУШАТЬ РАДИО.', { 'РАДИО.': GOLD }], [76.9, 'КАЖДЫЙ ВЕЧЕР В ДЕВЯТЬ'], [78.4, 'МИША ВЫХОДИТ В ЭФИР.'],
  [79.9, 'СВЕТ ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [80.9, 'ВОДА ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [82.1, 'ВОРОТА ЗАПЕРТЫ.', { 'ЗАПЕРТЫ.': GREEN }],
  [83.6, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [85.4, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [87.5, 'ДЕНЬ СОРОКОВОЙ.', { 'СОРОКОВОЙ.': GOLD }], [88.8, 'В ВОРОТА СТУЧАТ.', { 'СТУЧАТ.': RED }],
  [90.3, 'В ТУ ЖЕ СЕКУНДУ ОЖИВАЕТ РАЦИЯ.', { 'РАЦИЯ.': GOLD }],
  [92.7, '«МИША, НЕ ОТКРЫВАЙ.»', { '«МИША,': GREEN, 'НЕ': GREEN, 'ОТКРЫВАЙ.»': GREEN }],
  [94.4, '«Я ВИЖУ ТВОЙ ДОМ.»', { '«Я': GREEN, 'ВИЖУ': GREEN, 'ТВОЙ': GREEN, 'ДОМ.»': GREEN }],
  [95.9, '«ПЕРЕД ВОРОТАМИ НИКОГО НЕТ.»', { 'НИКОГО': RED, 'НЕТ.»': RED }],
].map((s, i, a) => ({ a: s[0], b: i + 1 < a.length ? a[i + 1][0] : 98.2, text: s[1], keys: s[2] || {} }));

const MISHA = { jacket: '#6E7A3E', jacketD: '#58622F', pants: '#2E3440', pantsD: '#252A33', hair: '#3A2A20', hairShort: true, pack: '#4A3A2E' };
const vign = `<rect width="${W}" height="${H}" fill="url(#vign)"/>`;
const fill = (c, o = 1) => `<rect width="${W}" height="${H}" fill="${c}" opacity="${f1(o)}"/>`;
const asMisha = fn => withPal({ ...MISHA, glove: SKIN }, fn);
const blinkAt = (u, ...ts) => Math.max(0, ...ts.map(b => 1 - Math.abs(u - b) / 0.09));

const DEFS2 = `<linearGradient id="skyM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FA7B8"/><stop offset="1" stop-color="#D9D3C4"/></linearGradient>
  <linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1220"/><stop offset="1" stop-color="#22324A"/></linearGradient>
  <linearGradient id="room" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E3A36"/><stop offset="1" stop-color="#25221F"/></linearGradient>
  <linearGradient id="botShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></linearGradient>
  <radialGradient id="glowR" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${RED}" stop-opacity=".8"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${GREEN}" stop-opacity=".7"/><stop offset="1" stop-color="${GREEN}" stop-opacity="0"/></radialGradient>
  <radialGradient id="lamp" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F4C877" stop-opacity=".55"/><stop offset="1" stop-color="#F4C877" stop-opacity="0"/></radialGradient>`;

function arrow(x1, y1, x2, y2, c, k = 1, w = 10) {
  if (k <= 0) return '';
  const ex = lerp(x1, x2, eout(k)), ey = lerp(y1, y2, eout(k)), a = Math.atan2(ey - y1, ex - x1);
  const h = w * 2.6, p = s => `${f1(ex - Math.cos(a) * h + Math.cos(a + Math.PI / 2) * s)},${f1(ey - Math.sin(a) * h + Math.sin(a + Math.PI / 2) * s)}`;
  return `<line x1="${x1}" y1="${y1}" x2="${f1(ex - Math.cos(a) * h * 0.6)}" y2="${f1(ey - Math.sin(a) * h * 0.6)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>
    <polygon points="${f1(ex)},${f1(ey)} ${p(h * 0.6)} ${p(-h * 0.6)}" fill="${c}"/>`;
}

function closeFace(hx, hy, r, o = {}) {
  const sc = r / 215;
  return `<g transform="rotate(${f1(o.rot || 0)} ${hx} ${hy})">
    <g transform="translate(${hx} ${hy}) scale(${sc}) translate(${-hx} ${-hy})">
    <path d="M${hx - 330} ${hy + 520} Q${hx - 300} ${hy + 230} ${hx} ${hy + 240} Q${hx + 300} ${hy + 230} ${hx + 330} ${hy + 520}Z" fill="${LOOK.jacket}"/>
    <path d="M${hx - 140} ${hy + 250} L${hx} ${hy + 330} L${hx + 140} ${hy + 250}" fill="none" stroke="${LOOK.jacketD}" stroke-width="26" stroke-linecap="round"/></g>
    ${head(hx, hy, r, { look: o.look || 0, blink: o.blink || 0, mood: o.mood || 'scared' })}</g>`;
}

function checklist(rows, u, t0, y = 1180, title = 'ПРОТОКОЛ') {
  return card(540, y, 640, 120 + rows.length * 76, `<rect x="-320" y="0" width="640" height="56" rx="26" fill="${GOLD}"/><rect x="-320" y="30" width="640" height="26" fill="${GOLD}"/>
    <text y="40" text-anchor="middle" font-family="Mono" font-size="26" letter-spacing="8" fill="#1a1a1a">${title}</text>
    ${rows.map((r, i) => { const k = prog(u, t0[i], t0[i] + 0.25); return `<text x="-270" y="${120 + i * 76}" font-family="Inter" font-size="36" fill="#fff">${r}</text>
      <rect x="220" y="${88 + i * 76}" width="44" height="44" rx="10" fill="${k > 0.5 ? GREEN : 'none'}" stroke="${k > 0.5 ? GREEN : '#9FB7C6'}" stroke-width="4"/>
      <path d="M230 ${110 + i * 76} l10 10 l16 -20" fill="none" stroke="#0f1a12" stroke-width="6" stroke-linecap="round" opacity="${f1(k)}"/>`; }).join('')}`, prog(u, t0[0] - 0.3, t0[0]));
}

// ---------- город сверху ----------
function carTop(x, y, rot, c, doors = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-38" y="-80" width="76" height="160" rx="22" fill="${c}"/>
    <rect x="-30" y="-50" width="60" height="40" rx="10" fill="#2B3540"/><rect x="-30" y="20" width="60" height="34" rx="10" fill="#2B3540"/>
    ${doors ? `<rect x="36" y="-30" width="10" height="56" rx="4" fill="${c}" transform="rotate(${50 * doors} 38 -30)"/><rect x="-46" y="-30" width="10" height="56" rx="4" fill="${c}" transform="rotate(${-40 * doors} -38 -30)"/>` : ''}</g>`;
}
function cityTop(u) {
  let s = `<rect x="-1200" y="-1200" width="3500" height="4700" fill="#5D6168"/>`;
  for (const [x, y, w, h] of [[-400, -400, 600, 900], [680, -400, 820, 900], [-400, 1300, 600, 1000], [680, 1300, 820, 1000]]) {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8C8475"/><rect x="${x + 30}" y="${y + 30}" width="${w - 60}" height="${h - 60}" rx="16" fill="#A79D8B"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${x + 60 + (i % 3) * (w - 120) / 3}" y="${y + 60 + Math.floor(i / 3) * (h - 120) / 2}" width="${(w - 180) / 3}" height="${(h - 180) / 2}" rx="10" fill="#968C7A"/>`;
  }
  s += `<rect x="200" y="-400" width="480" height="2700" fill="#4A4E55"/><rect x="-400" y="500" width="1900" height="800" fill="#4A4E55"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="434" y="${-380 + i * 230}" width="12" height="110" fill="#E6E1D3" opacity=".6"/>`;
  for (let i = 0; i < 9; i++) s += `<rect x="${-380 + i * 230}" y="894" width="110" height="12" fill="#E6E1D3" opacity=".6"/>`;
  [[300, 300, 4, '#C9483B'], [580, 120, -6, '#3E7CB1'], [320, 1500, 2, '#E3C04A'], [560, 1700, 178, '#D9D9D9'], [-100, 800, 92, '#5E7D5A'], [900, 1000, -88, '#7A6A9E'], [1150, 760, 88, '#C9483B']]
    .forEach(([x, y, r, c], i) => { s += carTop(x, y, r, c, i % 3 === 1 ? 0 : 1); });
  for (let i = 0; i < 16; i++) s += `<circle cx="${f1(rnd(i) * 1900 - 400)}" cy="${f1(rnd(i + 7) * 2700 - 400)}" r="${f1(30 + rnd(i + 2) * 30)}" fill="#5E7D5A" opacity=".9"/>`;
  return s;
}

function sHook(t) {                          // 0–3.8: пустой город сверху, Миша один на перекрёстке
  const k = t / 3.8;
  const world = cityTop(t) + `<ellipse cx="440" cy="900" rx="40" ry="16" fill="#000" opacity=".25"/>
    <g transform="translate(440 880)">${asMisha(() => `<circle cy="-6" r="30" fill="${LOOK.jacket}"/><circle cy="-12" r="22" fill="${LOOK.hair}"/>`)}</g>`;
  return camera(world, { t, zoom: lerp(2.4, 1.0, ease(k)), cx: 440, cy: 890, rot: lerp(-12, 0, ease(k)), shake: 0.8 })
    + vign + tag(620, 760, 'МИША', { k: prog(t, 0.4, 0.8), size: 30, bg: GOLD, fg: '#1a1a1a', px: 460, py: 870 })
    + hud('08:12 · ГОРОД', 'ЛЮДЕЙ: 0', { color: RED, k: eout(prog(t, 0.1, 0.5)) }) + subs(t, SUBS, 1500);
}

// ---------- улица сбоку ----------
function street(u, { night = 0, lights = 1, x0 = 0 } = {}) {
  let s = `<rect x="-400" y="-400" width="2000" height="1700" fill="${night ? 'url(#skyN)' : 'url(#skyM)'}"/>`;
  const bld = [[-300, 420, 300], [20, 300, 260], [300, 520, 240], [560, 380, 300], [880, 460, 260], [1160, 340, 280]];
  bld.forEach(([x, y, w], i) => {
    s += `<rect x="${x - x0 * 0.3}" y="${y}" width="${w}" height="${1300 - y}" fill="${night ? '#1A2333' : ['#B2A58E', '#9E9483', '#C2B49A'][i % 3]}"/>`;
    for (let r = 0; r < 10; r++) for (let c = 0; c < 4; c++) {
      const wx = x - x0 * 0.3 + 26 + c * (w - 40) / 4, wy = y + 40 + r * 90;
      if (wy > 1180) continue;
      const on = night && rnd(i * 50 + r * 4 + c) < 0.55 * lights;
      s += `<rect x="${f1(wx)}" y="${wy}" width="${f1((w - 80) / 4)}" height="50" rx="6" fill="${on ? '#F4C877' : night ? '#0F1520' : '#6E7F8E'}" opacity="${night ? 1 : 0.8}"/>`;
    }
  });
  s += `<rect x="-400" y="1300" width="2000" height="120" fill="${night ? '#2A2F36' : '#8E8A82'}"/><rect x="-400" y="1420" width="2000" height="700" fill="${night ? '#1C2026' : '#55595F'}"/>`;
  return s;
}
function carSide(x, y, c, door = 0, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-170 0 L-170 -60 Q-160 -80 -120 -84 L-80 -130 Q-60 -150 -20 -150 L70 -150 Q110 -150 130 -110 L160 -84 Q180 -80 180 -50 L180 0Z" fill="${c}"/>
    <path d="M-60 -126 L-10 -126 L-10 -88 L-96 -88Z M10 -126 L80 -126 Q100 -126 112 -100 L118 -88 L10 -88Z" fill="#26323D"/>
    ${door ? `<path d="M10 -88 L-60 -150 L-60 -10 L10 -2Z" fill="${c}" opacity=".9"/><path d="M-6 -86 L-54 -128 L-54 -94Z" fill="#26323D"/>` : ''}
    <circle cx="-100" cy="0" r="36" fill="#1C1F24"/><circle cx="-100" cy="0" r="14" fill="#8A8F96"/><circle cx="110" cy="0" r="36" fill="#1C1F24"/><circle cx="110" cy="0" r="14" fill="#8A8F96"/></g>`;
}

function sAlone(t) {                         // 3.8–8.2: Миша один посреди улицы, длинная тень
  const u = t - 3.8;
  const world = street(u) + carSide(160, 1430, '#C9483B', 1) + carSide(900, 1440, '#3E7CB1', 1, 0.9)
    + `<ellipse cx="560" cy="1520" rx="260" ry="20" fill="#000" opacity=".25"/>`
    + asMisha(() => person({ x: 540, y: 1360, s: 1.1, legB: [8, 0], legF: [-8, 0], armB: [15, 5], armF: [-15, -5], look: Math.sin(u * 1.5), pack: true, mood: 'calm', blink: blinkAt(u, 2.3) }));
  const lone = card(540, 380, 560, 150, `<text y="64" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="5" fill="#9FB7C6">ПЕРВАЯ УГРОЗА</text>
    <text y="124" text-anchor="middle" font-family="Inter" font-size="46" fill="#fff" opacity=".5">ОДИНОЧЕСТВО</text>
    <line x1="-180" y1="108" x2="180" y2="108" stroke="${RED}" stroke-width="8" opacity="${f1(prog(u, 2.6, 2.9))}"/>`, prog(u, 1.9, 2.3));
  return camera(world, { t, zoom: lerp(1.0, 1.12, u / 4.4), cx: 540, cy: 1100, shake: 1 }) + vign + lone
    + hud('08:15 · ГОРОД', 'ЛЮДЕЙ: 0', { color: RED }) + subs(t, SUBS, 1680) + fill('#000', 1 - prog(u, 0, 0.2));
}

function timerCard(txt, k, y, label, frac) {
  return card(540, y, 560, 200, `
    <text x="0" y="48" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="5" fill="#9FB7C6">${label}</text>
    <text x="0" y="132" text-anchor="middle" font-family="Inter" font-size="80" fill="${RED}">${txt}</text>
    <rect x="-250" y="160" width="500" height="12" rx="6" fill="#fff" opacity=".1"/><rect x="-250" y="160" width="${f1(500 * frac)}" height="12" rx="6" fill="${RED}"/>`, k);
}

function sTimer(t) {                         // 8.2–12.1: крупно Миша, 48 часов до отключения
  const u = t - 8.2;
  const world = street(u + 20) + `<rect x="-400" y="-400" width="2000" height="2800" fill="#000" opacity=".35"/>`
    + asMisha(() => closeFace(540, 920, 215, { look: lerp(0.6, -0.3, ease(u / 1.5)), blink: blinkAt(u, 2.2), mood: 'calm' }));
  const sec = 48 * 3600 - u * 1.0;
  const hh = Math.floor(sec / 3600), mm = Math.floor(sec % 3600 / 60), ss = Math.floor(sec % 60);
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 4), cx: 540, cy: 960, shake: 1.5 }) + vign
    + tag(850, 1170, 'МИША, 31', { k: prog(u, 0.25, 0.6), size: 32, px: 720, py: 1050 })
    + timerCard(`${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, prog(u, 0.2, 0.6), 1440, 'ДО ОТКЛЮЧЕНИЯ СВЕТА', 1)
    + hud('08:20 · ГОРОД', 'ЛЮДЕЙ: 0', { color: RED }) + subs(t, SUBS, 450);
}

function sMorning(t) {                       // 12.1–20.0: телефон без сети → машины с открытыми дверями → тёплый чай
  const u = t - 12.1;
  if (u < 3.6) {
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#room)"/>
      <g transform="translate(540 960) rotate(${f1(-6 + Math.sin(u) * 1.5)})"><rect x="-230" y="-460" width="460" height="920" rx="60" fill="#14171B"/>
      <rect x="-205" y="-430" width="410" height="860" rx="44" fill="#22303E"/>
      <text y="-260" text-anchor="middle" font-family="Inter" font-size="120" fill="#fff">08:12</text>
      <text y="-200" text-anchor="middle" font-family="Mono" font-size="28" fill="#9FB7C6">СУББОТА</text>
      <rect x="-170" y="-120" width="340" height="110" rx="26" fill="#fff" opacity=".1"/>
      <text y="-52" text-anchor="middle" font-family="Inter" font-size="40" fill="${RED}">НЕТ СЕТИ</text>
      <text y="80" text-anchor="middle" font-family="Mono" font-size="24" fill="#9FB7C6">0 УВЕДОМЛЕНИЙ</text></g>`;
    return camera(world, { t, zoom: lerp(1.15, 1.0, ease(u / 2)), cx: 540, cy: 960, shake: 1.5 }) + vign
      + hud('08:12 · УТРО', 'ДЕНЬ 1') + subs(t, SUBS, 1700) + fill('#000', 1 - prog(u, 0, 0.2));
  }
  if (u < 5.9) {
    const v = u - 3.6;
    const world = street(v, { x0: v * 60 }) + carSide(250 - v * 40, 1440, '#5E7D5A', 1) + carSide(700 - v * 40, 1440, '#D9D9D9', 1) + carSide(1150 - v * 40, 1440, '#C9483B', 0);
    return camera(world, { t, zoom: 1.05, cx: 540 + v * 30, cy: 1100, shake: 1 }) + vign
      + tag(560, 1020, 'ДВЕРИ ОТКРЫТЫ', { k: prog(v, 0.4, 0.8), size: 28, bg: GOLD, fg: '#1a1a1a', px: 640, py: 1330 })
      + hud('08:30 · УЛИЦА', 'ДЕНЬ 1') + subs(t, SUBS, 640);
  }
  const v = u - 5.9;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#room)"/><rect x="-300" y="1150" width="1700" height="1200" fill="#5A4636"/>
    <rect x="-300" y="1150" width="1700" height="30" fill="#6E5644"/>`;
  for (const [x, c] of [[360, '#E8E2D6'], [720, '#C9483B']]) {
    world += `<rect x="${x - 90}" y="980" width="180" height="180" rx="30" fill="${c}"/><path d="M${x + 90} 1020 q 70 0 70 50 q 0 50 -70 50" fill="none" stroke="${c}" stroke-width="22"/>
      <ellipse cx="${x}" cy="990" rx="80" ry="18" fill="#6B3E1E"/>`;
    for (let j = 0; j < 4; j++) { const ph = (v * 0.6 + j / 4) % 1; world += `<path d="M${x - 20 + j * 12} ${960 - ph * 300} q 30 -40 0 -80 q -30 -40 0 -80" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="${f1(0.35 * (1 - ph))}"/>`; }
  }
  return camera(world, { t, zoom: lerp(1.0, 1.12, v / 2), cx: 540, cy: 1000, shake: 1 }) + vign
    + tag(540, 600, 'ЕЩЁ ТЁПЛЫЙ', { k: prog(v, 0.4, 0.8), size: 30, bg: RED, fg: '#fff', px: 540, py: 760 })
    + hud('08:40 · СОСЕДИ', 'ДЕНЬ 1') + subs(t, SUBS, 1600);
}

function sPower(t) {                         // 20.0–27.1: ночной город гаснет кварталами
  const u = t - 20.0;
  const lights = 1 - ease(prog(u, 3.0, 6.0));
  const world = street(u, { night: 1, lights });
  const plant = card(540, 1500, 640, 200, `<g transform="translate(-230 100)"><rect x="-50" y="-30" width="100" height="80" fill="#5B6876"/>
    <rect x="-40" y="-90" width="26" height="60" fill="#5B6876"/><rect x="10" y="-110" width="26" height="80" fill="#5B6876"/>
    <circle cx="23" cy="-130" r="${f1(16 * lights + 2)}" fill="#9FB7C6" opacity="${f1(lights * 0.6)}"/></g>
    <text x="-140" y="80" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ЭЛЕКТРОСТАНЦИЯ</text>
    <text x="-140" y="140" font-family="Inter" font-size="44" fill="${lights < 0.5 ? RED : GOLD}">${lights < 0.5 ? 'ОТКЛЮЧЕНА' : 'БЕЗ ЛЮДЕЙ'}</text>`, prog(u, 2.2, 2.6));
  return camera(world, { t, zoom: lerp(1.08, 1.0, u / 7), cx: 540, cy: 900, shake: 1 }) + vign + plant
    + hud(`ДЕНЬ ${u < 4.5 ? 1 : 2} · 22:00`, 'ШАГ 1 · ЭЛЕКТРИЧЕСТВО') + subs(t, SUBS, 390) + fill('#000', 1 - prog(u, 0, 0.2));
}

function battery(x, y, label, k) {
  return `<g transform="translate(${x} ${y})"><rect x="-70" y="-40" width="140" height="80" rx="16" fill="none" stroke="#fff" stroke-width="6"/>
    <rect x="70" y="-14" width="12" height="28" rx="4" fill="#fff"/><rect x="-60" y="-30" width="${f1(120 * k)}" height="60" rx="10" fill="${k > 0.95 ? GREEN : GOLD}"/>
    <text y="80" text-anchor="middle" font-family="Mono" font-size="24" fill="#9FB7C6">${label}</text></g>`;
}
function sGen(t) {                           // 27.1–31.7: заряжает всё, генератор из строймага
  const u = t - 27.1;
  const walk = prog(u, 1.4, 4.6);
  let world = street(u) + `<rect x="80" y="760" width="600" height="540" fill="#7E6E5A"/><rect x="80" y="700" width="600" height="80" fill="#C9483B"/>
    <text x="380" y="755" text-anchor="middle" font-family="Inter" font-size="40" fill="#fff">СТРОЙМАТЕРИАЛЫ</text>
    <rect x="300" y="960" width="160" height="340" fill="#1C232B"/>`;
  const gx = lerp(380, 820, walk);
  world += asMisha(() => person({ x: gx, y: 1360, s: 1.05, lean: -6, legB: [18 * Math.sin(u * 6) * (walk > 0 && walk < 1), 0], legF: [-18 * Math.sin(u * 6) * (walk > 0 && walk < 1), 0], armB: [-40, -70], armF: [-50, -80], look: 0.8, mood: 'calm',
    extra: `<g transform="translate(70 -60)"><rect x="-10" y="-40" width="130" height="90" rx="12" fill="${RED}"/><rect x="0" y="-26" width="60" height="40" rx="6" fill="#1C232B"/><circle cx="92" cy="6" r="14" fill="#1C232B"/></g>` }));
  const bats = card(540, 360, 760, 190, ['ТЕЛЕФОН', 'ПАУЭРБАНК', 'ФОНАРЬ'].map((n, i) => battery(-250 + i * 250, 70, n, prog(u, 0.2 + i * 0.25, 1.4 + i * 0.25))).join(''), prog(u, 0, 0.3));
  return camera(world, { t, zoom: 1.05, cx: lerp(500, 640, walk), cy: 1050, shake: 1 }) + vign + bats
    + tag(gx + 120, 1000, 'ГЕНЕРАТОР', { k: prog(u, 1.8, 2.2), size: 28, bg: GREEN, fg: '#0f1a12', px: gx + 90, py: 1270 })
    + hud('ДЕНЬ 1 · 11:00', 'ШАГ 1 · ЭЛЕКТРИЧЕСТВО') + subs(t, SUBS, 1700) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sWater(t) {                         // 31.7–42.9: разрез дома — насосы, ванна, бочки на крыше
  const u = t - 31.7;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#skyM)"/><rect x="-300" y="1560" width="1700" height="800" fill="#6E5A46"/>`;
  world += `<rect x="200" y="420" width="680" height="1140" fill="#C2B49A"/><rect x="230" y="450" width="620" height="1080" fill="#3A3633"/>`;
  for (let f = 0; f < 3; f++) world += `<rect x="230" y="${800 + f * 360}" width="620" height="20" fill="#C2B49A"/>`;
  const pumpOff = prog(u, 2.6, 3.0);
  world += `<rect x="260" y="1600" width="160" height="110" rx="16" fill="#5B6876"/><circle cx="340" cy="1655" r="34" fill="${pumpOff > 0.5 ? '#3A3F46' : '#9FB7C6'}"/>
    <path d="M420 1640 L560 1640 L560 1200" fill="none" stroke="#7FA6B8" stroke-width="14"/>`;
  const flow = 1 - prog(u, 3.0, 4.6);
  world += `<path d="M560 1200 L620 1200 L620 1230" fill="none" stroke="#9AA6B0" stroke-width="16"/>
    <rect x="612" y="1235" width="16" height="${f1(120 * flow)}" fill="#7FC4E6" opacity=".9"/>`;
  const tub = ease(prog(u, 5.8, 8.2));
  world += `<rect x="640" y="1380" width="190" height="130" rx="30" fill="#E8E2D6"/><rect x="652" y="${f1(1500 - 100 * tub)}" width="166" height="${f1(100 * tub)}" rx="20" fill="#7FC4E6"/>`;
  for (let i = 0; i < 5; i++) world += `<rect x="${260 + i * 50}" y="${1450}" width="34" height="70" rx="10" fill="#9FD4F0" opacity="${f1(prog(u, 6.4 + i * 0.2, 6.6 + i * 0.2))}"/>`;
  const rain = prog(u, 8.6, 9.2);
  for (const bx of [300, 520, 740]) world += `<rect x="${bx - 50}" y="320" width="100" height="100" rx="14" fill="#3E7CB1"/><rect x="${bx - 44}" y="${f1(410 - 80 * rain * prog(u, 9, 11))}" width="88" height="${f1(80 * rain * prog(u, 9, 11))}" fill="#7FC4E6"/>`;
  for (let i = 0; i < 50; i++) { const ph = (u * 1.5 + rnd(i)) % 1; world += `<line x1="${f1(rnd(i + 2) * 1080)}" y1="${f1(-100 + ph * 520)}" x2="${f1(rnd(i + 2) * 1080 - 8)}" y2="${f1(-60 + ph * 520)}" stroke="#9FD4F0" stroke-width="4" opacity="${f1(rain * 0.6)}"/>`; }
  const ov = tag(200, 1800, 'НАСОС', { k: prog(u, 2.2, 2.6), size: 26, bg: pumpOff > 0.5 ? RED : '#fff', fg: pumpOff > 0.5 ? '#fff' : '#1a1a1a', px: 340, py: 1660 })
    + tag(900, 1180, 'КРАН', { k: prog(u, 3.0, 3.4), size: 26, bg: RED, fg: '#fff', px: 630, py: 1240 })
    + tag(900, 1440, 'ВАННА', { k: prog(u, 5.9, 6.3), size: 26, bg: GREEN, fg: '#0f1a12', px: 830, py: 1440 })
    + tag(900, 240, 'ДОЖДЬ', { k: prog(u, 8.8, 9.2), size: 26, bg: GREEN, fg: '#0f1a12', px: 790, py: 340 });
  return camera(world + ov, { t, zoom: lerp(1.0, 0.92, ease(u / 11)), cx: 540, cy: lerp(1350, 1000, ease(prog(u, 5, 10))), shake: 0.8 }) + vign
    + hud('ДЕНЬ 2 · ДОМ', 'ШАГ 2 · ВОДА') + subs(t, SUBS, 160 + 1520) + fill('#000', 1 - prog(u, 0, 0.2));
}

function dog(x, y, s, flip, u, i) {
  const st = Math.sin(u * 3 + i) * 4;
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><ellipse cx="0" cy="-60" rx="80" ry="34" fill="#0B0E12"/>
    <circle cx="80" cy="-96" r="30" fill="#0B0E12"/><polygon points="66,-120 76,-150 90,-122" fill="#0B0E12"/><polygon points="92,-118 104,-146 112,-114" fill="#0B0E12"/>
    <rect x="96" y="-96" width="36" height="20" rx="10" fill="#0B0E12"/>
    ${[-55, -25, 35, 60].map((lx, j) => `<rect x="${lx}" y="-40" width="14" height="${f1(46 + (j % 2 ? st : -st))}" rx="6" fill="#0B0E12"/>`).join('')}
    <path d="M-78 -70 Q -120 -100 -110 -130" fill="none" stroke="#0B0E12" stroke-width="12" stroke-linecap="round"/>
    <circle cx="92" cy="-102" r="5" fill="#F2C230"/></g>`;
}
function sFood(t) {                          // 42.9–B: продукты гниют, консервы годами → ночью собаки сбиваются в стаю
  const u = t - 42.9;
  if (u < 6.4) {
    const rot = ease(prog(u, 2.0, 4.0));
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#2E3238"/>`;
    for (let r = 0; r < 4; r++) world += `<rect x="60" y="${420 + r * 300}" width="960" height="24" fill="#8A8F96"/>`;
    for (let i = 0; i < 8; i++) {
      const x = 120 + i * 112;
      world += `<circle cx="${x}" cy="390" r="40" fill="${['#C9483B', '#E3C04A', '#5E9E4A'][i % 3]}"/><circle cx="${x}" cy="390" r="40" fill="#5A4A2E" opacity="${f1(rot * 0.85)}"/>`;
      world += `<rect x="${x - 36}" y="610" width="72" height="104" rx="10" fill="#E8E2D6"/><rect x="${x - 36}" y="636" width="72" height="34" fill="#3E7CB1" opacity="${f1(1 - rot)}"/><rect x="${x - 36}" y="610" width="72" height="104" rx="10" fill="#6B5A3A" opacity="${f1(rot * 0.6)}"/>`;
      world += `<rect x="${x - 40}" y="900" width="80" height="110" rx="14" fill="#9AA6B0"/><rect x="${x - 40}" y="930" width="80" height="44" fill="${['#C9483B', '#3E7CB1', '#E3C04A'][i % 3]}"/>`;
      world += `<rect x="${x - 40}" y="1200" width="80" height="110" rx="14" fill="#9AA6B0"/><rect x="${x - 40}" y="1230" width="80" height="44" fill="${['#5E9E4A', '#C9483B', '#3E7CB1'][i % 3]}"/>`;
    }
    for (let i = 0; i < 12; i++) { const a = u * 3 + i; world += `<circle cx="${f1(540 + Math.cos(a) * (200 + i * 25))}" cy="${f1(500 + Math.sin(a * 1.3) * 120)}" r="5" fill="#111" opacity="${f1(rot)}"/>`; }
    const ov = tag(860, 280, 'СВЕЖЕЕ: 7 ДНЕЙ', { k: prog(u, 2.1, 2.5), size: 28, bg: RED, fg: '#fff', px: 700, py: 400 })
      + tag(860, 1460, 'КОНСЕРВЫ: ГОДЫ', { k: prog(u, 4.4, 4.8), size: 28, bg: GREEN, fg: '#0f1a12', px: 700, py: 1280 });
    return camera(world + ov, { t, zoom: lerp(1.0, 1.06, u / 6.4), cx: 540, cy: 900, shake: 0.8 }) + vign
      + hud(`ДЕНЬ ${u < 3 ? 3 : 10} · МАГАЗИН`, 'ШАГ 3 · ЕДА') + subs(t, SUBS, 1680) + fill('#000', 1 - prog(u, 0, 0.2));
  }
  const v = u - 6.4;
  let world = street(v, { night: 1, lights: 0 }) + `<rect x="-400" y="-400" width="2000" height="2800" fill="#000" opacity=".25"/>`;
  world += `<ellipse cx="540" cy="1470" rx="760" ry="230" fill="#5E7286" opacity=".55" filter="url(#blur18)"/><circle cx="880" cy="420" r="70" fill="#E6E1D3" opacity=".8"/>`;
  const n = Math.min(7, 1 + Math.floor(v * 1.8));
  for (let i = 0; i < n; i++) {
    const tx = 200 + i * 110 + (i % 2) * 40, ty = 1480 + (i % 3) * 40;
    const k = prog(v, i * 0.55, i * 0.55 + 0.8);
    world += `<g opacity="${f1(k)}">${dog(lerp(i % 2 ? 1300 : -200, tx, eout(k)), ty, 0.9 + (i % 3) * 0.12, i % 2, v, i)}</g>`;
  }
  world += `<ellipse cx="540" cy="1500" rx="520" ry="200" fill="url(#glowR)" opacity="${f1(prog(v, 3.0, 4.0) * 0.25)}"/>`;
  return camera(world, { t, zoom: lerp(1.0, 1.12, ease(v / 5.1)), cx: 540, cy: 1250, shake: 1 }) + vign
    + tag(540, 1060, 'СТАЯ', { k: prog(v, 3.0, 3.4), size: 34, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 14 · 23:00', 'ШАГ 3 · ЕДА') + subs(t, SUBS, 420) + fill('#000', 1 - prog(v, 0, 0.2));
}

function houseFence(u, { night = 0, shake = 0, gateLit = 0 } = {}) {
  let s = `<rect x="-300" y="-300" width="1700" height="1700" fill="${night ? 'url(#skyN)' : 'url(#skyM)'}"/><rect x="-300" y="1300" width="1700" height="1100" fill="${night ? '#1A2018' : '#5E7D5A'}"/>
    <rect x="280" y="760" width="520" height="460" fill="${night ? '#2A2622' : '#C2B49A'}"/><polygon points="240,780 540,560 840,780" fill="${night ? '#3A1E1C' : '#8C3B2A'}"/>
    <rect x="380" y="860" width="120" height="120" rx="10" fill="${night ? '#F4C877' : '#6E7F8E'}"/><rect x="580" y="860" width="120" height="120" rx="10" fill="${night ? '#F4C877' : '#6E7F8E'}"/>
    ${night ? `<ellipse cx="540" cy="920" rx="360" ry="200" fill="url(#lamp)"/>` : ''}`;
  const sx = shake * Math.sin(u * 50) * 6;
  s += `<rect x="-300" y="1080" width="1700" height="260" fill="${night ? '#14181C' : '#4A4440'}"/>`;
  for (let i = 0; i < 24; i++) s += `<rect x="${-290 + i * 72}" y="1080" width="60" height="260" fill="${night ? '#1C2126' : '#5A524C'}"/>`;
  s += `<g transform="translate(${f1(sx)} 0)"><rect x="440" y="1070" width="200" height="280" fill="${night ? '#262C33' : '#3A3F46'}" stroke="${gateLit ? GREEN : '#000'}" stroke-opacity="${gateLit ? 0.8 : 0.3}" stroke-width="6"/>
    <rect x="470" y="1190" width="40" height="18" rx="6" fill="#8A8F96"/></g>`;
  return s;
}

function sFence(t) {                         // B–57.9: дом с высоким забором
  const u = t - 54.41;
  const world = houseFence(u);
  return camera(world, { t, zoom: lerp(1.1, 1.0, ease(u / 3.5)), cx: 540, cy: 1000, shake: 0.8 }) + vign
    + tag(880, 1000, 'ЗАБОР 2,5 М', { k: prog(u, 0.8, 1.2), size: 28, bg: GREEN, fg: '#0f1a12', px: 900, py: 1100 })
    + hud('ДЕНЬ 3 · НОВЫЙ ДОМ', 'ШАГ 3 · ЕДА') + subs(t, SUBS, 1600);
}

function sWound(t) {                         // 57.9–71.5: царапина → инфекция; аптеки на карте
  const u = t - 57.9;
  if (u < 9.4) {
    const inf = ease(prog(u, 5.4, 8.0));
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#room)"/>
      <path d="M-200 1400 Q 300 1180 700 1100 L 1000 1060 Q 1120 1060 1120 1160 Q 1120 1260 1000 1260 L 700 1300 Q 300 1380 -200 1700Z" fill="${SKIN}"/>
      <path d="M-200 1400 Q 300 1180 700 1100 L 700 1300 Q 300 1380 -200 1700Z" fill="${MISHA.jacket}"/>
      <ellipse cx="880" cy="1170" rx="${f1(70 + inf * 140)}" ry="${f1(40 + inf * 70)}" fill="url(#glowR)" opacity="${f1(0.3 + inf * 0.6)}"/>
      <path d="M800 1150 L 960 1180" stroke="${RED}" stroke-width="10" stroke-linecap="round" opacity="${f1(prog(u, 2.3, 2.6))}"/>`;
    const ov = tag(880, 900, 'ЦАРАПИНА', { k: prog(u, 2.4, 2.8), size: 30, bg: RED, fg: '#fff', px: 880, py: 1140 })
      + card(540, 360, 620, 170, `<text y="62" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="5" fill="#9FB7C6">ВРАЧЕЙ ПОБЛИЗОСТИ</text>
        <text y="140" text-anchor="middle" font-family="Inter" font-size="64" fill="${RED}">0</text>`, prog(u, 5.2, 5.6));
    return camera(world + ov, { t, zoom: lerp(1.0, 1.15, ease(u / 9)), cx: lerp(540, 760, ease(u / 9)), cy: 1100, shake: 0.8 }) + vign
      + hud('ДЕНЬ 6 · 18:00', 'ШАГ 4 · РАНЫ') + subs(t, SUBS, 1640) + fill('#000', 1 - prog(u, 0, 0.2));
  }
  const v = u - 9.4;
  let world = cityTop(v) + `<rect x="-400" y="-400" width="1900" height="2700" fill="#000" opacity=".2"/>`;
  const ph = [[-80, 140], [900, 260], [-60, 1600], [980, 1700], [400, 1950]];
  ph.forEach(([x, y], i) => {
    const k = prog(v, 0.4 + i * 0.5, 0.7 + i * 0.5);
    world += `<g transform="translate(${x} ${y})"><circle r="56" fill="${k > 0.5 ? GREEN : '#fff'}"/><rect x="-12" y="-34" width="24" height="68" fill="${k > 0.5 ? '#fff' : RED}"/><rect x="-34" y="-12" width="68" height="24" fill="${k > 0.5 ? '#fff' : RED}"/></g>`;
  });
  const meds = card(540, 1480, 600, 160, `<text x="-260" y="64" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">АПТЕК ОБОЙДЕНО</text>
    <text x="-260" y="130" font-family="Inter" font-size="54" fill="${GREEN}">${Math.min(5, Math.floor(prog(v, 0.4, 3.0) * 5.99))} / 5</text>`, prog(v, 0.2, 0.5));
  return camera(world, { t, zoom: lerp(0.62, 0.55, v / 4.2), cx: 450, cy: 900, shake: 0.5 }) + vign + meds
    + hud('ДЕНЬ 7 · РАЙОН', 'ШАГ 4 · РАНЫ') + subs(t, SUBS, 390) + fill('#000', 1 - prog(v, 0, 0.2));
}

function radio(x, y, s, glow, u, wave = 0) {
  let w = '';
  for (let i = 0; i < 40; i++) { const h = wave * (10 + Math.abs(Math.sin(u * 14 + i * 0.7)) * 40 * (0.5 + 0.5 * Math.sin(i * 0.4 + u * 3))); w += `<rect x="${-160 + i * 8}" y="${f1(-h / 2)}" width="5" height="${f1(Math.max(2, h))}" rx="2" fill="${GREEN}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-26" y="-330" width="14" height="200" rx="6" fill="#1C232B"/>
    <rect x="-200" y="-150" width="400" height="300" rx="40" fill="#2A3138"/><rect x="-170" y="-120" width="340" height="120" rx="20" fill="#0C1A12"/>
    <rect x="-170" y="-120" width="340" height="120" rx="20" fill="${GREEN}" opacity="${f1(glow * 0.25)}"/>
    <g transform="translate(0 -60)">${w}</g>
    ${[...Array(6).keys()].map(i => `<line x1="${-150 + i * 30}" y1="40" x2="${-150 + i * 30}" y2="120" stroke="#1C232B" stroke-width="10" stroke-linecap="round"/>`).join('')}
    <circle cx="110" cy="70" r="40" fill="#1C232B"/><circle cx="110" cy="70" r="8" fill="${glow > 0.5 ? GREEN : '#555'}"/></g>`;
}

function sSignal(t) {                        // 71.5–79.8: рация, эфир каждый вечер в 21:00
  const u = t - 71.5;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#141210"/><ellipse cx="540" cy="900" rx="600" ry="500" fill="url(#lamp)"/>
    <rect x="-300" y="1180" width="1700" height="1200" fill="#3A2C22"/>`;
  for (let j = 0; j < 4; j++) { const ph = (u * 0.6 + j / 4) % 1; world += `<circle cx="514" cy="640" r="${f1(60 + ph * 600)}" fill="none" stroke="${GOLD}" stroke-width="6" opacity="${f1((1 - ph) * 0.5 * prog(u, 1.5, 2.0))}"/>`; }
  world += radio(540, 1040, 1.4, 1, u, prog(u, 6.8, 7.2) * 0.4);
  world += asMisha(() => `<g transform="translate(160 1250) scale(.95)">${person({ x: 0, y: -60, legB: [-80, 0], legF: [-75, 0], armB: [70, 90], armF: [80, 100], look: 1, mood: 'calm', blink: blinkAt(u, 3.1) })}</g>`);
  const clock = card(540, 300, 420, 150, `<text y="60" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="5" fill="#9FB7C6">ЭФИР КАЖДЫЙ ВЕЧЕР</text>
    <text y="128" text-anchor="middle" font-family="Inter" font-size="60" fill="${GOLD}">21:00</text>`, prog(u, 5.4, 5.8));
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 8.3), cx: 540, cy: 980, shake: 0.8 }) + vign + clock
    + hud('ДЕНЬ 8 · 21:00', 'ШАГ 5 · СИГНАЛ') + subs(t, SUBS, 1640) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sSafe(t) {                          // 79.8–87.4: ночь, свет в окнах, ворота заперты, протокол
  const u = t - 79.8;
  const world = houseFence(u, { night: 1, gateLit: prog(u, 2.3, 2.6) });
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 7.6), cx: 540, cy: 1000, shake: 0.6 }) + vign
    + checklist(['СВЕТ', 'ВОДА', 'ЛЕКАРСТВА', 'ВОРОТА'], u, [0.1, 1.1, 1.7, 2.3], 260)
    + hud('ДЕНЬ 20 · 21:30', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 1600) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sKnock(t) {                         // 87.4–92.5: день 40, стук в ворота, оживает рация
  const u = t - 87.4;
  const knock = (u > 1.5 && u < 2.4) ? 1 : 0;
  let world = houseFence(u, { night: 1, shake: knock });
  const tk = prog(u, 1.5, 1.7) * (1 - prog(u, 2.6, 2.9));
  world += `<text x="540" y="1000" text-anchor="middle" font-family="Inter" font-size="80" fill="#fff" opacity="${f1(tk)}" transform="rotate(-6 540 1000)">ТУК · ТУК · ТУК</text>`;
  const rk = prog(u, 3.6, 4.0);
  return camera(world, { t, zoom: lerp(1.0, 1.3, ease(prog(u, 0.5, 3))), cx: 540, cy: lerp(1000, 1180, ease(prog(u, 0.5, 3))), shake: 0.8 + knock * 8 }) + vign
    + `<g opacity="${f1(rk)}" transform="translate(0 ${f1((1 - rk) * 80)})">${radio(540, 1560, 0.8, Math.sin(u * 12) > 0 ? 1 : 0.3, u, 0.6)}</g>`
    + hud('ДЕНЬ 40 · 21:00', 'ВОРОТА', { color: RED }) + subs(t, SUBS, 420) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sRadio(t) {                         // 92.5–98.3: голос из рации → сверху: перед воротами никого
  const u = t - 92.5;
  if (u < 3.4) {
    const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0B0F0C"/><ellipse cx="540" cy="900" rx="560" ry="420" fill="url(#glowG)" opacity=".25"/>`
      + radio(540, 1050, 1.9, 1, u, 1);
    return camera(world, { t, zoom: lerp(1.0, 1.1, u / 3.4), cx: 540, cy: 980, shake: 1 }) + vign
      + hud('ДЕНЬ 40 · 21:00', 'ЭФИР', { color: GREEN }) + subs(t, SUBS, 420);
  }
  const v = u - 3.4;
  let world = `<rect x="-400" y="-400" width="1900" height="2700" fill="#11160F"/>
    <rect x="160" y="420" width="760" height="760" fill="#1E261B"/><rect x="300" y="540" width="480" height="380" fill="#2A2622"/><rect x="330" y="570" width="420" height="320" fill="#3A1E1C"/>
    <rect x="160" y="420" width="760" height="760" fill="none" stroke="#2C3238" stroke-width="30"/>
    <rect x="440" y="1165" width="200" height="30" fill="#4A5562"/>
    <rect x="-400" y="1240" width="1900" height="420" fill="#23272C"/>
    <ellipse cx="540" cy="760" rx="300" ry="240" fill="url(#lamp)" opacity=".6"/>`;
  world += `<rect x="440" y="1200" width="200" height="200" rx="20" fill="none" stroke="${RED}" stroke-width="6" stroke-dasharray="16 12" opacity="${f1(prog(v, 0.4, 0.8))}"/>`;
  world += `<rect x="${f1(440 + Math.sin(v * 50) * 4 * (v < 1.2 ? 1 : 0))}" y="1165" width="200" height="30" fill="${RED}" opacity="${f1(prog(v, 0.2, 0.4) * 0.6)}"/>`;
  return camera(world, { t, zoom: lerp(1.3, 1.0, ease(v / 2.5)), cx: 540, cy: 1000, shake: 0.6 }) + vign
    + tag(540, 1490, '0 ЧЕЛОВЕК', { k: prog(v, 0.6, 1.0), size: 34, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 40 · ВИД СВЕРХУ', 'ПЕРЕД ВОРОТАМИ', { color: RED }) + subs(t, SUBS, 390) + fill('#000', 1 - prog(v, 0, 0.15));
}

function sEnd(t) {
  const u = t - 98.3, k = eout(prog(u, 0.1, 0.5));
  return fill('#05080B') + `<g opacity="${f1(k)}" transform="translate(0 ${f1((1 - k) * 30)})">
    <text x="540" y="820" text-anchor="middle" font-family="Mono" font-size="34" letter-spacing="14" fill="${GOLD}">ЧАСТЬ 2</text>
    <text x="540" y="960" text-anchor="middle" font-family="Inter" font-size="120" fill="#fff">КТО</text>
    <text x="540" y="1090" text-anchor="middle" font-family="Inter" font-size="120" fill="${RED}">СТУЧИТ?</text>
    <text x="540" y="1190" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="6" fill="#9FB7C6" opacity=".7">ОДИН НА ЗЕМЛЕ · ПРОДОЛЖЕНИЕ СЛЕДУЕТ</text></g>`;
}

const SCENES = [[0, sHook], [3.8, sAlone], [8.2, sTimer], [12.1, sMorning], [20.0, sPower], [27.1, sGen], [31.7, sWater],
  [42.9, sFood], [54.41, sFence], [57.9, sWound], [71.5, sSignal], [79.8, sSafe], [87.4, sKnock], [92.5, sRadio], [98.3, sEnd]];

function story(t) {
  let i = SCENES.length - 1;
  while (SCENES[i][0] > t) i--;
  return SCENES[i][1](t);
}

function render(t) {
  if (t >= B && t < B + AD) {
    const k = (t - B) / AD, z = 1 + 0.03 * ease(k);
    return frame(`<g transform="translate(540 960) scale(${z.toFixed(4)}) translate(-540 -960)">${story(B - 1 / 30)}</g>${fill('#000', 0.35 * Math.min(1, k * 6, (1 - k) * 6))}`, DEFS2);
  }
  return frame(story(t < B ? t : t - AD), DEFS2);
}
