// «Лавина», часть 1. Время сцен — по шкале голоса (work/lavina/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе между фразами): ролик замирает (лёгкий наезд, без голоса), 7,2 с идёт баннер, потом история с того же места.
const B = 56.11, AD = 7.2, STORY = 111.5;
const DUR = STORY + AD;

const SUBS = [
  [0.2, 'ЕСЛИ ВАС НАКРЫЛА ЛАВИНА', { 'ЛАВИНА': RED }], [2.0, 'НЕ ПЫТАЙТЕСЬ КОПАТЬ ВВЕРХ', { 'ВВЕРХ': GOLD }],
  [3.9, 'ПОД СНЕГОМ ВЫ ДАЖЕ НЕ ЗНАЕТЕ,'], [5.6, 'ГДЕ ВЕРХ', { 'ВЕРХ': GOLD }],
  [6.7, 'У АРТЁМА ЕСТЬ 15 МИНУТ', { '15': RED, 'МИНУТ': RED }],
  [9.3, 'АРТЁМ УШЁЛ ЗА ТРАССУ,'], [10.9, 'ЗА СВЕЖИМ СНЕГОМ.'],
  [12.5, 'ЕГО ДРУГ МАКС'], [13.3, 'ОСТАЛСЯ ВНИЗУ, У ПОДЪЁМНИКА.'],
  [15.9, 'НА СЕРЕДИНЕ СКЛОНА'], [16.9, 'СНЕГ ПОД ДОСКОЙ ТРЕСКАЕТСЯ,', { 'ТРЕСКАЕТСЯ,': RED }],
  [19.0, 'И ВЕСЬ СКЛОН'], [19.7, 'СРЫВАЕТСЯ ВНИЗ.', { 'СРЫВАЕТСЯ': RED, 'ВНИЗ.': RED }],
  [21.2, 'ШАГ ПЕРВЫЙ:', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }], [22.3, 'ПОКА ЛАВИНА ДВИЖЕТСЯ,'],
  [24.0, 'НЕ ЗАМИРАТЬ.', { 'ЗАМИРАТЬ.': RED }], [25.2, 'ГРЕСТИ РУКАМИ,'], [26.3, 'КАК ПЛОВЕЦ,'],
  [27.2, 'И ПРОБИВАТЬСЯ К КРАЮ ПОТОКА.', { 'КРАЮ': GREEN, 'ПОТОКА.': GREEN }],
  [29.4, 'ЗА СЕКУНДУ ДО ОСТАНОВКИ'], [31.1, 'ОДНУ РУКУ ВВЕРХ,', { 'ВВЕРХ,': GOLD }],
  [32.8, 'ДРУГОЙ ЗАКРЫТЬ ЛИЦО.', { 'ЛИЦО.': GOLD }],
  [35.0, 'ЛАВИНА ОСТАНАВЛИВАЕТСЯ,'], [36.3, 'И СНЕГ ЗА СЕКУНДЫ'],
  [37.9, 'СХВАТЫВАЕТСЯ, КАК БЕТОН.', { 'БЕТОН.': RED }],
  [40.0, 'АРТЁМ МОЖЕТ ПОШЕВЕЛИТЬ'], [41.4, 'ТОЛЬКО ПАЛЬЦАМИ.', { 'ПАЛЬЦАМИ.': GOLD }],
  [42.8, 'ПЕРЕД ЛИЦОМ ОСТАЛСЯ'], [44.4, 'МАЛЕНЬКИЙ КАРМАН ВОЗДУХА.', { 'КАРМАН': GREEN, 'ВОЗДУХА.': GREEN }],
  [47.1, 'ШАГ ВТОРОЙ:', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [48.2, 'НАЙТИ, ГДЕ ВЕРХ.'],
  [49.8, 'АРТЁМ НАБИРАЕТ СЛЮНУ'], [51.1, 'И ДАЁТ ЕЙ ВЫТЕЧЬ ИЗО РТА.'],
  [53.5, 'ОНА ТЕЧЁТ НЕ К ПОДБОРОДКУ,'], [55.3, 'А КО ЛБУ.', { 'ЛБУ.': GOLD }],
  [56.3, 'ОН ВИСИТ ВНИЗ ГОЛОВОЙ.', { 'ВНИЗ': RED, 'ГОЛОВОЙ.': RED }],
  [58.8, 'ШАГ ТРЕТИЙ: ВОЗДУХ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }],
  [60.7, 'ПОД СНЕГОМ УБИВАЕТ НЕ ХОЛОД,'], [62.8, 'А СОБСТВЕННОЕ ДЫХАНИЕ.', { 'ДЫХАНИЕ.': RED }],
  [64.6, 'ТЁПЛЫЙ ВЫДОХ ОСЕДАЕТ НА СНЕГ'], [66.5, 'ЛЕДЯНОЙ КОРКОЙ,', { 'ЛЕДЯНОЙ': GOLD, 'КОРКОЙ,': GOLD }],
  [67.4, 'И ВОЗДУХ ПЕРЕСТАЁТ ПРОХОДИТЬ.', { 'ПЕРЕСТАЁТ': RED, 'ПРОХОДИТЬ.': RED }],
  [69.9, 'ПОЭТОМУ ДЫШАТЬ МЕДЛЕННО', { 'МЕДЛЕННО': GREEN }], [71.4, 'И НЕ КРИЧАТЬ.', { 'КРИЧАТЬ.': RED }],
  [73.0, 'ГОЛОСА СВЕРХУ ПОД СНЕГОМ'], [74.5, 'СЛЫШНО ХОРОШО,', { 'ХОРОШО,': GREEN }],
  [75.9, 'А ВАС НАВЕРХУ'], [76.7, 'ПОЧТИ НЕ СЛЫШНО.', { 'НЕ': RED, 'СЛЫШНО.': RED }],
  [77.9, 'КРИЧАТЬ СТОИТ,'], [79.0, 'ТОЛЬКО КОГДА ШАГИ СОВСЕМ РЯДОМ.', { 'РЯДОМ.': GOLD }],
  [81.2, 'ШАГ ЧЕТВЁРТЫЙ: СИГНАЛ.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }],
  [83.4, 'НА ГРУДИ У АРТЁМА'], [84.6, 'ЛАВИННЫЙ ДАТЧИК.', { 'ДАТЧИК.': GOLD }],
  [86.6, 'МАКС ВИДЕЛ,'], [87.2, 'КАК СОШЛА ЛАВИНА'], [88.3, 'И УЖЕ БЕЖИТ К СКЛОНУ'], [90.1, 'НА ЕГО ПИСК.'],
  [91.5, 'НО БЕЖАТЬ ЕМУ'], [92.2, 'МИНУТ 20.', { 'МИНУТ': RED, '20.': RED }],
  [93.5, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [95.3, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [97.3, '12-Я МИНУТА.', { '12-Я': RED }], [98.9, 'ПРЯМО НАД ГОЛОВОЙ'], [99.8, 'КТО-ТО КОПАЕТ.', { 'КОПАЕТ.': RED }],
  [101.3, 'ТОЛЬКО МАКС ЕЩЁ'], [102.3, 'В ДВУХ КИЛОМЕТРАХ ВНИЗУ.'],
  [104.4, 'А НА ЭТОТ СКЛОН,'], [105.4, 'КРОМЕ НИХ ДВОИХ,'], [106.7, 'СЕГОДНЯ НЕ ПОДНИМАЛСЯ НИКТО.', { 'НИКТО.': RED }],
].map((s, i, a) => ({ a: s[0], b: i + 1 < a.length ? a[i + 1][0] : 109.4, text: s[1], keys: s[2] || {} }));

const MAX = { jacket: '#3E7CB1', jacketD: '#2E5F8A', hat: '#B23A3A', hatD: '#8C2C2C' };
const vign = `<rect width="${W}" height="${H}" fill="url(#vign)"/>`;
const fill = (c, o = 1) => `<rect width="${W}" height="${H}" fill="${c}" opacity="${f1(o)}"/>`;

const DEFS2 = `<linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4E6577"/><stop offset=".55" stop-color="#8A9DAA"/><stop offset="1" stop-color="#B7C3CB"/></linearGradient>
  <linearGradient id="skyD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2A3A"/><stop offset=".6" stop-color="#3D5266"/><stop offset="1" stop-color="#6E8294"/></linearGradient>
  <linearGradient id="snow1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D3DDE4"/><stop offset="1" stop-color="#9FB2C0"/></linearGradient>
  <linearGradient id="snowD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8095A6"/><stop offset="1" stop-color="#4A5E6E"/></linearGradient>
  <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B4352"/><stop offset="1" stop-color="#121E26"/></linearGradient>
  <radialGradient id="pocket" cx="50%" cy="42%" r="60%"><stop offset="0" stop-color="#3E5C6E"/><stop offset="1" stop-color="#162630"/></radialGradient>
  <radialGradient id="air" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${GREEN}" stop-opacity=".35"/><stop offset="1" stop-color="${GREEN}" stop-opacity="0"/></radialGradient>
  <linearGradient id="botShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></linearGradient>
  <radialGradient id="glowR" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${RED}" stop-opacity=".8"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient>`;

// ================= общие куски =================
const ys = x => 860 + 0.435 * (x + 300), SLOPE = 23.5;

function mountains(c1 = '#6C8292', c2 = '#8297A5', cap = '#E4EAEE') {
  const far = [[-200, 900], [80, 520], [260, 700], [470, 430], [700, 720], [880, 560], [1100, 760], [1300, 900]];
  const near = [[-200, 980], [150, 700], [380, 900], [620, 760], [900, 960], [1300, 1000]];
  const poly = (pts, c) => `<polygon points="${pts.map(p => p.join(',')).join(' ')} 1300,2400 -200,2400" fill="${c}"/>`;
  let caps = '';
  for (let i = 1; i < far.length - 1; i += 2) {
    const [x, y] = far[i];
    caps += `<polygon points="${x},${y} ${x - 70},${y + 90} ${x - 30},${y + 70} ${x},${y + 100} ${x + 40},${y + 75} ${x + 80},${y + 95}" fill="${cap}"/>`;
  }
  return poly(far, c1) + caps + poly(near, c2);
}

function pine(x, y, h, c = '#2C463F') {
  let s = `<rect x="${x - 6}" y="${y - 20}" width="12" height="26" fill="#3B2E28"/>`;
  for (let i = 0; i < 3; i++) {
    const w = h * (0.42 - i * 0.09), yy = y - 14 - i * h * 0.26;
    s += `<polygon points="${x - w},${yy} ${x + w},${yy} ${x},${yy - h * 0.42}" fill="${c}"/>`;
  }
  return s + `<polygon points="${x},${y - h * 0.95} ${x - h * 0.12},${y - h * 0.74} ${x + h * 0.12},${y - h * 0.74}" fill="#EEF2F4" opacity=".9"/>`;
}

function board(rot) {
  return `<rect x="-120" y="118" width="240" height="26" rx="13" fill="#1F2A33" transform="rotate(${rot} 0 130)"/>
    <rect x="-112" y="121" width="224" height="7" rx="3" fill="${RED}" transform="rotate(${rot} 0 130)"/>`;
}

function rider(rx, t, { mood = 'calm', look = -1 } = {}) {
  const sp = [rx, ys(rx)], up = dir(180 + 14);
  const hip = [sp[0] + up[0] * 128, sp[1] + up[1] * 128];
  return person({ x: hip[0], y: hip[1] + Math.sin(t * 9) * 3, rot: 14, lean: -8,
    legB: [52, -4], legF: [-38, 18], armB: [-70, -100], armF: [95, 70], look, mood, under: board(SLOPE - 14) });
}

function snowLayers(top = 380) {
  let s = '';
  ['#2F4A5A', '#2A4352', '#253C4A', '#203542', '#1B2E3A', '#172833'].forEach((c, i) => {
    const y0 = top + i * 270;
    let d = `M-300 ${y0}`;
    for (let x = -300; x <= 1400; x += 60) d += ` L${x} ${f1(y0 + Math.sin(x / 140 + i * 1.7) * 22 + Math.sin(x / 47 + i) * 6)}`;
    s += `<path d="${d} L1400 2600 L-300 2600Z" fill="${c}"/>`;
  });
  for (let i = 0; i < 140; i++) s += `<circle cx="${f1(rnd(i) * 1500 - 200)}" cy="${f1(top + 20 + rnd(i + 7) * 1900)}" r="${f1(2 + rnd(i + 3) * 5)}" fill="#9FB7C6" opacity="${f1(0.08 + rnd(i + 1) * 0.18)}"/>`;
  return s;
}

function ruler(depthY, label = '1,5 М', top = 380) {
  let s = `<line x1="70" y1="${top}" x2="70" y2="1700" stroke="#9FB7C6" stroke-opacity=".5" stroke-width="3"/>`;
  for (let m = 0; m <= 3; m++) {
    const y = top + m * 430;
    if (y > 1720) break;
    s += `<line x1="56" y1="${y}" x2="92" y2="${y}" stroke="#9FB7C6" stroke-opacity=".7" stroke-width="3"/>
      <text x="104" y="${y + 10}" font-family="Mono" font-size="26" fill="#9FB7C6" opacity=".8">${m} М</text>`;
  }
  return s + `<polygon points="72,${depthY} 100,${depthY - 16} 100,${depthY + 16}" fill="${GOLD}"/>
    <text x="112" y="${depthY + 10}" font-family="Mono" font-size="28" fill="${GOLD}">${label}</text>`;
}

function pocketBg(hx = 540, hy = 960) {
  let s = `<rect x="-200" y="-200" width="1480" height="2320" fill="#0E171D"/>
    <ellipse cx="${hx}" cy="${hy + 40}" rx="430" ry="470" fill="url(#pocket)"/>`;
  for (let i = 0; i < 90; i++) {
    const a = rnd(i) * Math.PI * 2, rr = 420 + rnd(i + 2) * 260;
    s += `<circle cx="${f1(hx + Math.cos(a) * rr)}" cy="${f1(hy + 40 + Math.sin(a) * rr * 1.08)}" r="${f1(70 + rnd(i + 5) * 110)}" fill="${i % 2 ? '#1A2C37' : '#20343F'}"/>`;
  }
  for (let i = 0; i < 60; i++) s += `<circle cx="${f1(rnd(i + 40) * W)}" cy="${f1(rnd(i + 80) * H)}" r="${f1(2 + rnd(i) * 4)}" fill="#BFD3DE" opacity="${f1(0.1 + rnd(i + 3) * 0.25)}"/>`;
  return s;
}

// крупный план: куртка + голова (r — радиус головы)
function closeFace(hx, hy, r, o = {}) {
  const sc = r / 215;
  return `<g transform="rotate(${f1(o.rot || 0)} ${hx} ${hy})">
    <g transform="translate(${hx} ${hy}) scale(${sc}) translate(${-hx} ${-hy})">
    <path d="M${hx - 330} ${hy + 520} Q${hx - 300} ${hy + 230} ${hx} ${hy + 240} Q${hx + 300} ${hy + 230} ${hx + 330} ${hy + 520}Z" fill="${LOOK.jacket}"/>
    <path d="M${hx - 140} ${hy + 250} L${hx} ${hy + 330} L${hx + 140} ${hy + 250}" fill="none" stroke="${LOOK.jacketD}" stroke-width="26" stroke-linecap="round"/></g>
    ${head(hx, hy, r, { look: o.look || 0, blink: o.blink || 0, mood: o.mood || 'scared', frost: o.frost ?? 1 })}${o.extra || ''}</g>`;
}

function breath(u, x, y, dx = 160, dy = -220, period = 1.1) {
  let s = '';
  for (let j = 0; j < 4; j++) {
    const ph = ((u - j * period) / period);
    if (ph < 0 || ph > 1) continue;
    for (let i = 0; i < 5; i++) s += `<circle cx="${f1(x + ph * dx + i * 18)}" cy="${f1(y + ph * dy - i * 12)}" r="${f1(14 + ph * 40 + i * 4)}"
      fill="#DDE7ED" opacity="${f1(0.22 * (1 - ph))}" filter="url(#blur6)"/>`;
  }
  return s;
}

const blinkAt = (u, ...ts) => Math.max(0, ...ts.map(b => 1 - Math.abs(u - b) / 0.09));
function timerCard(sec, k, y = 1430, label = 'ВОЗДУХ') {
  const mm = String(Math.floor(sec / 60)).padStart(2, '0'), ss = String(Math.floor(sec % 60)).padStart(2, '0');
  return card(540, y, 520, 200, `
    <text x="0" y="48" text-anchor="middle" font-family="Mono" font-size="26" letter-spacing="6" fill="#9FB7C6">${label}</text>
    <text x="0" y="132" text-anchor="middle" font-family="Inter" font-size="84" fill="${RED}">${mm}:${ss}</text>
    <rect x="-235" y="160" width="470" height="12" rx="6" fill="#fff" opacity=".1"/>
    <rect x="-235" y="160" width="${f1(470 * sec / 900)}" height="12" rx="6" fill="${RED}"/>`, k);
}
// секунды воздуха: 15 минут от 6,7 с ролика, «реальное» время идёт быстрее в сценах ожидания
const airLeft = t => Math.max(0, 900 - (t - 6.7));

function arrow(x1, y1, x2, y2, c, k = 1, w = 10) {
  if (k <= 0) return '';
  const ex = lerp(x1, x2, eout(k)), ey = lerp(y1, y2, eout(k)), a = Math.atan2(ey - y1, ex - x1);
  const h = w * 2.6, p = (d, s) => `${f1(ex - Math.cos(a) * h + Math.cos(a + Math.PI / 2) * s)},${f1(ey - Math.sin(a) * h + Math.sin(a + Math.PI / 2) * s)}`;
  return `<line x1="${x1}" y1="${y1}" x2="${f1(ex - Math.cos(a) * h * 0.6)}" y2="${f1(ey - Math.sin(a) * h * 0.6)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>
    <polygon points="${f1(ex)},${f1(ey)} ${p(0, h * 0.6)} ${p(0, -h * 0.6)}" fill="${c}"/>`;
}

// ================= сцены =================
function sHook(t) {                       // 0–3.8: лавина догоняет
  const k = t / 3.8, xf = lerp(-320, 820, Math.pow(k, 1.35));
  let shade = '', white = '', spray = '';
  for (let i = 0; i < 70; i++) {
    const d = rnd(i) * 1000, x = xf - d * 0.9 - 30, r = (60 + rnd(i + 4) * 120) * (0.6 + d / 900) * (1 + 0.07 * Math.sin(t * 3 + i));
    const y = ys(x) - 40 - rnd(i + 3) * (200 + d * 0.55);
    shade += `<circle cx="${f1(x + 20)}" cy="${f1(y + 26)}" r="${f1(r)}" fill="#A9BBC8"/>`;
    white += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${i % 3 ? '#F2F5F7' : '#E1E8ED'}"/>`;
  }
  for (let i = 0; i < 40; i++) {
    const ph = (t * 0.9 + rnd(i + 20)) % 1, x = xf + ph * 260 - 60, y = ys(x) - 30 - rnd(i + 30) * 260 * ph;
    spray += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4 + rnd(i) * 9)}" fill="#F4F7F9" opacity="${f1(1 - ph)}"/>`;
  }
  const bed = `<polygon points="-400,${ys(-400) - 60} ${xf},${ys(xf) - 20} ${xf},${ys(xf) + 40} -400,${ys(-400) + 40}" fill="#EEF2F5"/>`;
  const rx = lerp(430, 650, k);
  let trees = '';
  [[150, 0.9], [330, 1], [880, 1.1], [1010, 0.95], [-60, 0.85]].forEach(([x, sc], i) => { trees += pine(x, ys(x) + 30 + i * 6, 170 * sc); });
  const world = `<rect x="-400" y="-400" width="1900" height="2800" fill="url(#sky1)"/>${mountains()}
    <polygon points="-400,${ys(-400)} 1500,${ys(1500)} 1500,2600 -400,2600" fill="url(#snow1)"/>${trees}
    <path d="M${rx - 400} ${ys(rx - 400) + 6} L${rx - 80} ${ys(rx - 80) + 4}" stroke="#9FB1BE" stroke-width="10" stroke-linecap="round" opacity=".7"/>
    ${rider(rx, t, { mood: t > 1.2 ? 'scared' : 'calm' })}${bed}${shade}${white}${spray}`;
  return camera(world, { t, zoom: lerp(1.0, 1.2, ease(k)), cx: lerp(560, 640, k), cy: lerp(1010, 1090, k), rot: lerp(0, -2, k), shake: 2 + 18 * prog(t, 1.4, 3.6) })
    + vign + hud('14:32 · ВНЕ ТРАССЫ', 'СКЛОН 38°', { k: eout(prog(t, 0.1, 0.5)) }) + subs(t, SUBS, 640) + fill('#F4F7F9', prog(t, 3.25, 3.8));
}

function sWhere(t) {                      // 3.8–6.6: разрез, «ВВЕРХ?» во все стороны
  const u = t - 3.8, px = 560, py = 1010;
  const body = person({ x: px, y: py, s: 1.5, rot: 148 + 10 * Math.sin(u * 0.9), lean: 25,
    legB: [60, -30], legF: [20, -60], armB: [150, 200], armF: [170, 215], look: Math.sin(u * 2.2) * 0.8, mood: 'scared' });
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#deep)"/><rect x="-300" y="-300" width="1700" height="680" fill="#5E7888"/>
    ${snowLayers()}<ellipse cx="${px}" cy="${py - 10}" rx="260" ry="230" fill="#3B5869" opacity=".55" filter="url(#blur18)"/>${body}`;
  const tags = [[290, 650, 0.4], [800, 720, 0.7], [830, 1320, 1.0], [280, 1290, 1.3]].map(([x, y, a], i) =>
    tag(x + Math.sin(u * 3 + i) * 6, y, 'ВВЕРХ?', { k: prog(u, a, a + 0.35), size: 34, px: lerp(x, px, 0.55), py: lerp(y, py, 0.55), bg: '#F4F7F9' })).join('');
  return camera(world + tags, { t, zoom: lerp(1.35, 1.03, ease(u / 1.7)), cx: px, cy: lerp(py, 1000, u / 3), rot: 3 * Math.sin(u * 0.8), shake: 2 })
    + ruler(1000) + vign + hud('14:32 · ПОД ЛАВИНОЙ', 'ГДЕ ВЕРХ?', { color: RED }) + subs(t, SUBS, 1580) + fill('#F4F7F9', 1 - prog(u, 0, 0.5));
}

function sTimer(t) {                      // 6.6–9.2: крупный план, 15 минут
  const u = t - 6.6;
  const look = lerp(-0.6, 0.5, ease(u / 1.2));
  const world = pocketBg() + closeFace(540, 960, 215, { look, blink: blinkAt(u, 1.9), rot: -10 + Math.sin(u * 1.4) * 1.5 })
    + breath(u, 580, 1080);
  return camera(world, { t, zoom: lerp(1.02, 1.1, ease(u / 2.6)), shake: 2.5 }) + vign
    + tag(860, 1180, 'АРТЁМ, 27', { k: prog(u, 0.25, 0.6), size: 32, px: 720, py: 1060 })
    + timerCard(airLeft(t), prog(u, 0.2, 0.6)) + hud('14:32 · ГЛУБИНА 1,5 М', 'ПОД ЛАВИНОЙ', { color: RED }) + subs(t, SUBS, 470)
    + fill('#fff', 0.35 * (1 - prog(u, 0, 0.12)));
}

function sSetup(t) {                      // 9.2–15.85: гора сверху вниз — Артём за ограждением, Макс у подъёмника
  const u = t - 9.2;
  const slopeY = x => 700 + Math.abs(x - 560) * 0.9;            // гора-«треугольник»
  let world = `<rect x="-300" y="-600" width="1700" height="4200" fill="url(#skyD)"/>${mountains('#3A4D5E', '#4E6274', '#9FB2C0')}
    <polygon points="-300,${slopeY(-300)} 560,700 1400,${slopeY(1400)} 1400,3800 -300,3800" fill="url(#snowD)"/>`;
  // трасса: светлая полоса с флажками, подъёмник — опоры и трос
  world += `<path d="M560 720 C 420 1100, 700 1500, 380 1900 S 300 2400, 260 2700" stroke="#B6C5D0" stroke-width="120" fill="none" opacity=".55" stroke-linecap="round"/>`;
  for (let i = 0; i < 9; i++) {
    const y = 820 + i * 220, x = 560 + Math.sin(i * 1.3) * 150 - i * 28;
    world += `<rect x="${f1(x + 80)}" y="${y - 40}" width="6" height="44" fill="#E3732F"/><rect x="${f1(x - 86)}" y="${y - 40}" width="6" height="44" fill="#E3732F"/>`;
  }
  world += `<line x1="200" y1="2640" x2="520" y2="900" stroke="#1E2A33" stroke-width="4"/>`;
  for (let i = 0; i < 6; i++) { const y = 2600 - i * 300, x = 200 + (2640 - y) * (320 / 1740); world += `<rect x="${f1(x - 6)}" y="${y}" width="12" height="90" fill="#1E2A33"/>`; }
  for (let i = 0; i < 5; i++) {
    const ph = (u * 0.06 + i / 5) % 1, x = lerp(200, 520, ph), y = lerp(2640, 900, ph);
    world += `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(y + 40)}" stroke="#1E2A33" stroke-width="4"/><rect x="${f1(x - 22)}" y="${f1(y + 40)}" width="44" height="26" rx="8" fill="#C9483B"/>`;
  }
  world += `<rect x="90" y="2620" width="260" height="140" rx="14" fill="#2B3A46"/><polygon points="70,2630 220,2550 370,2630" fill="#C9483B"/>
    <rect x="130" y="2660" width="70" height="60" rx="8" fill="#F4B740" opacity=".8"/>`;
  // ограждение «вне трассы»
  world += `<line x1="660" y1="900" x2="900" y2="1060" stroke="#F4B740" stroke-width="6" stroke-dasharray="20 12"/>
    <rect x="905" y="1030" width="150" height="70" rx="10" fill="${RED}" transform="rotate(33 980 1065)"/>
    <text x="980" y="1077" text-anchor="middle" font-family="Inter" font-size="28" fill="#fff" transform="rotate(33 980 1065)">СТОП</text>`;
  for (let i = 0; i < 60; i++) world += `<circle cx="${f1(800 + rnd(i) * 500)}" cy="${f1(1000 + rnd(i + 3) * 800)}" r="${f1(2 + rnd(i + 5) * 4)}" fill="#fff" opacity="${f1(0.3 + 0.3 * Math.sin(u * 3 + i))}"/>`;
  const ax = lerp(720, 860, prog(u, 0, 3)), ay = slopeY(ax) - 10 + 90;
  world += `<path d="M640 ${slopeY(640) + 95} Q 700 ${slopeY(700) + 100} ${f1(ax)} ${f1(ay + 40)}" stroke="#5E7282" stroke-width="7" fill="none" opacity=".7"/>`;
  world += `<g transform="translate(${f1(ax)} ${f1(ay)}) scale(.5)">${person({ x: 0, y: 0, rot: 20, lean: -6, legB: [40, 0], legF: [-30, 10], armB: [-60, -80], armF: [80, 60], look: 0.8, under: board(10) })}</g>`;
  world += `<g transform="translate(400 2690) scale(.45)">${withPal(MAX, () => person({ x: 0, y: -150, legB: [8, 0], legF: [-8, 0], armB: [20, 10], armF: [-150, -170], look: -0.6, pack: false }))}</g>`;
  const toMax = ease(prog(u, 3.0, 4.3));
  const cam = camera(world + tag(ax + 170, ay - 170, 'АРТЁМ', { k: prog(u, 0.3, 0.7), size: 30, px: ax + 20, py: ay - 40 })
    + tag(620, 900, 'ВНЕ ТРАССЫ', { k: prog(u, 0.9, 1.3), size: 26, bg: RED, fg: '#fff', px: 760, py: 960 })
    + tag(560, 2440, 'МАКС', { k: prog(u, 3.6, 4.0), size: 30, px: 410, py: 2560 })
    + tag(240, 2470, 'ПОДЪЁМНИК', { k: prog(u, 4.3, 4.7), size: 24, px: 220, py: 2600 }),
    { t, zoom: lerp(1.25, 1.05, toMax), cx: lerp(760, 360, toMax), cy: lerp(1140, 2440, toMax), shake: 1.5 });
  return cam + vign + hud('14:20 · ЗА 12 МИНУТ ДО ЛАВИНЫ', 'АРТЁМ И МАКС', { color: '#fff' }) + subs(t, SUBS, 1180) + fill('#000', 1 - prog(u, 0, 0.25));
}

function sCrack(t) {                      // 15.85–21.15: трещина, плита срывается
  const u = t - 15.85;
  const crackY = x => ys(x) - 250 + Math.sin(x / 37) * 18 + (rnd(Math.floor(x / 40)) - 0.5) * 30;
  const pts = [];
  for (let x = -400; x <= 1500; x += 40) pts.push([x, crackY(x)]);
  const kc = prog(u, 1.0, 2.2), slide = Math.pow(prog(u, 3.1, 5.3), 1.6) * 700;
  const dx = Math.cos(SLOPE * Math.PI / 180) * slide, dy = Math.sin(SLOPE * Math.PI / 180) * slide;
  const crackLen = Math.floor(pts.length * kc);
  const slab = `<polygon points="${pts.map(p => p.join(',')).join(' ')} 1500,2700 -400,2700" fill="url(#snow1)"/>`;
  let blocks = '';
  for (let i = 0; i < 9; i++) {
    const x0 = -300 + i * 220;
    blocks += `<line x1="${x0}" y1="${f1(crackY(x0))}" x2="${x0 + 120}" y2="${f1(ys(x0 + 120) + 140)}" stroke="#8CA0AF" stroke-width="5" opacity="${f1(prog(u, 3.0, 3.4))}"/>`;
  }
  const r = lerp(470, 560, prog(u, 0, 3));
  let dust = '';
  for (let i = 0; i < 50; i++) {
    const ph = (u * 0.7 + rnd(i)) % 1, x = rnd(i + 9) * 1500 - 200 + dx * 0.8, y = crackY(x - dx * 0.8) + dy * 0.8 - ph * 260;
    dust += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(20 + rnd(i + 2) * 50)}" fill="#EEF2F5" opacity="${f1(prog(u, 3.2, 3.8) * (1 - ph) * 0.8)}"/>`;
  }
  let trees = '';
  [[150, 0.9], [880, 1.1], [1010, 0.95]].forEach(([x, sc], i) => { trees += pine(x, ys(x) + 30 + i * 6, 170 * sc); });
  const crack = `<polyline points="${pts.slice(0, crackLen).map(p => p.join(',')).join(' ')}" fill="none" stroke="#1F2D38" stroke-width="${f1(6 + prog(u, 2.6, 3.2) * 14)}" stroke-linejoin="round"/>
    <polyline points="${pts.slice(0, crackLen).map(p => p.join(',')).join(' ')}" fill="none" stroke="${RED}" stroke-width="4" opacity="${f1(0.8 * (1 - prog(u, 2.6, 3.2)))}"/>`;
  const world = `<rect x="-400" y="-400" width="1900" height="2800" fill="url(#sky1)"/>${mountains()}
    <polygon points="-400,${ys(-400)} 1500,${ys(1500)} 1500,2600 -400,2600" fill="url(#snow1)"/>
    <polygon points="${pts.map(p => p.join(',')).join(' ')} 1500,2700 -400,2700" fill="#6F8494"/>
    <g transform="translate(${f1(dx)} ${f1(dy)})">${slab}${blocks}${trees}${rider(r, t, { mood: u > 1.2 ? 'scared' : 'calm', look: u > 1.2 ? -0.4 : 1 })}</g>${crack}${dust}`;
  const tg = tag(250, 1080, 'ТРЕЩИНА', { k: prog(u, 1.3, 1.7) * (1 - prog(u, 3.0, 3.3)), size: 30, bg: RED, fg: '#fff', px: 380, py: crackY(380) });
  return camera(world + tg, { t, zoom: lerp(1.0, 1.12, ease(u / 5.3)), cx: lerp(560, 600, u / 5.3) + dx * 0.4, cy: 1020 + dy * 0.4,
    shake: 1.5 + prog(u, 1.0, 1.3) * 5 * (1 - prog(u, 1.6, 2.2)) + prog(u, 3.0, 3.6) * 20 })
    + vign + hud('14:32 · СЕРЕДИНА СКЛОНА', 'СКЛОН 38°') + subs(t, SUBS, 560);
}

function topPerson(x, y, s, rot, u, swim) {       // вид сверху: тело, голова в шапке, руки гребут
  const a = Math.sin(u * 5) * 50 * swim;
  const arm = (side, ang) => { const [ex, ey] = [side * 70 * Math.cos(ang * Math.PI / 180), -70 * Math.sin(ang * Math.PI / 180)];
    return `<line x1="${side * 34}" y1="-20" x2="${f1(side * 34 + ex)}" y2="${f1(-20 + ey)}" stroke="${LOOK.jacket}" stroke-width="28" stroke-linecap="round"/>
      <circle cx="${f1(side * 34 + ex)}" cy="${f1(-20 + ey)}" r="14" fill="${LOOK.glove}"/>`; };
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})">
    <line x1="-18" y1="40" x2="${f1(-26 - Math.sin(u * 6) * 8)}" y2="120" stroke="${LOOK.pants}" stroke-width="30" stroke-linecap="round"/>
    <line x1="18" y1="40" x2="${f1(26 + Math.sin(u * 6) * 8)}" y2="120" stroke="${LOOK.pants}" stroke-width="30" stroke-linecap="round"/>
    ${arm(-1, 20 + a)}${arm(1, 20 - a)}
    <rect x="-46" y="-40" width="92" height="96" rx="40" fill="${LOOK.jacket}"/><rect x="-30" y="-24" width="60" height="64" rx="18" fill="${LOOK.pack}"/>
    <circle cy="-62" r="36" fill="${LOOK.hat}"/><circle cy="-62" r="12" fill="${LOOK.pom}"/></g>`;
}

function sSwim(t) {                       // 21.15–29.35: шаг 1 — вид сверху, поток, гребёт к краю
  const u = t - 21.15;
  const L = 170, R = 840;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#8FA3B2"/>`;
  for (let i = 0; i < 70; i++) {
    const x = rnd(i) * 1500 - 200; if (x > L - 40 && x < R + 40) continue;
    world += `<circle cx="${f1(x)}" cy="${f1(rnd(i + 5) * 2400 - 200)}" r="${f1(26 + rnd(i + 2) * 30)}" fill="#2C463F"/><circle cx="${f1(x)}" cy="${f1(rnd(i + 5) * 2400 - 200)}" r="${f1(8 + rnd(i + 2) * 8)}" fill="#E4EAEE" opacity=".7"/>`;
  }
  world += `<rect x="${L}" y="-300" width="${R - L}" height="2600" fill="#D9E2E8"/>`;
  for (let i = 0; i < 110; i++) {
    const sp = 900 + rnd(i + 3) * 700, y = ((rnd(i) * 2600 + u * sp) % 2600) - 300, x = L + 30 + rnd(i + 1) * (R - L - 60);
    world += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(18 + rnd(i + 7) * 40)}" ry="${f1(50 + rnd(i + 4) * 80)}" fill="${i % 3 ? '#F4F7F9' : '#AFC0CC'}" opacity=".85"/>`;
  }
  world += `<rect x="${L - 14}" y="-300" width="28" height="2600" fill="#B8C7D2"/><rect x="${R - 14}" y="-300" width="28" height="2600" fill="#B8C7D2"/>`;
  const drift = ease(prog(u, 6.0, 8.2));
  const px = lerp(500, 760, drift) + Math.sin(u * 2.3) * 30, py = 980 + Math.sin(u * 1.7) * 40;
  const swim = prog(u, 4.0, 4.4);
  world += topPerson(px, py, 1.3, swim ? lerp(-8, 30, drift) + Math.sin(u * 2) * 8 : 160 * Math.sin(u * 1.6), u, swim);
  const ov = arrow(px + 60, py - 200, R + 120, py - 260, GREEN, prog(u, 6.1, 6.7), 12)
    + tag(R - 40, py - 360, 'КРАЙ ПОТОКА', { k: prog(u, 6.3, 6.7), size: 28, bg: GREEN, fg: '#0f1a12' })
    + tag(330, 520, '≈ 100 КМ/Ч', { k: prog(u, 1.2, 1.6), size: 30, bg: '#1b2630', fg: '#fff' });
  return camera(world + ov, { t, zoom: lerp(1.15, 1.0, ease(u / 3)), cx: 540 + drift * 80, cy: 960, shake: 6 * (1 - drift * 0.6) })
    + vign + hud('14:32 · ВИД СВЕРХУ', 'ШАГ 1 · ПОКА ЛАВИНА ДВИЖЕТСЯ') + subs(t, SUBS, 1560) + fill('#F4F7F9', 1 - prog(u, 0, 0.3));
}

function inFlow(u, speed, top = 0) {      // снег вокруг — частицы, которые замедляются
  let s = `<rect x="-300" y="-300" width="1700" height="2600" fill="#4C6577"/>`;
  for (let i = 0; i < 120; i++) {
    const y0 = rnd(i) * 2600, x0 = rnd(i + 1) * 1700 - 300, d = (y0 + top) % 2600;
    s += `<circle cx="${f1((x0 + top * 0.4) % 1700 - 300)}" cy="${f1(d - 300)}" r="${f1(30 + rnd(i + 3) * 70)}" fill="${['#7E95A6', '#9AB0BF', '#617B8D'][i % 3]}" opacity=".9"/>`;
  }
  return s;
}

function sCover(t) {                      // 29.35–35.0: рука вверх, ладонь у лица
  const u = t - 29.35;
  const spd = lerp(1, 0.15, prog(u, 0, 5.5)), top = 900 * u - 380 * u * u / 5.5;
  const pose = prog(u, 1.7, 2.2), pose2 = prog(u, 3.4, 3.9);
  const p = person({ x: 540, y: 1080, s: 1.7, rot: 8 + Math.sin(u * 2) * 6 * spd, lean: 4,
    legB: [30, 10], legF: [-20, -5], armB: [lerp(60, 205, pose), lerp(40, 195, pose)], armF: [lerp(-60, 135, pose2), lerp(-30, 235, pose2)],
    look: 0.3, mood: 'scared', blink: blinkAt(u, 0.8) });
  const world = inFlow(u, spd, top) + p;
  const ov = tag(820, 430, 'РУКА ВВЕРХ', { k: prog(u, 2.1, 2.5), size: 30, bg: GOLD, fg: '#1a1a1a', px: 600, py: 560 })
    + tag(220, 760, 'ЛАДОНЬ У ЛИЦА', { k: prog(u, 3.8, 4.2), size: 30, bg: GOLD, fg: '#1a1a1a', px: 500, py: 760 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.08, u / 5.6), cx: 540, cy: 900, shake: 8 * spd })
    + vign + hud('14:32 · ЗА СЕКУНДУ ДО ОСТАНОВКИ', 'ШАГ 1 · ПОКА ЛАВИНА ДВИЖЕТСЯ') + subs(t, SUBS, 1600);
}

function sConcrete(t) {                   // 35.0–42.75: снег схватывается как бетон, шевелятся только пальцы
  const u = t - 35.0;
  const set = ease(prog(u, 1.3, 3.3)), top = 900 * 5.5 - 380 * 5.5 + 60 * (1 - set) * u;
  let world = inFlow(u, 0, top) + `<rect x="-300" y="-300" width="1700" height="2600" fill="#53697A" opacity="${f1(set * 0.92)}"/>`;
  for (let i = 0; i < 160; i++) world += `<circle cx="${f1(rnd(i + 11) * 1500 - 200)}" cy="${f1(rnd(i + 13) * 2400 - 200)}" r="${f1(2 + rnd(i) * 4)}" fill="#BFD3DE" opacity="${f1(set * (0.1 + rnd(i + 3) * 0.3))}"/>`;
  const wig = prog(u, 5.0, 7.7) * Math.sin(u * 14) * 6;
  const up = dir(184), sh = [up[0] * 118 * 0.88, up[1] * 118 * 0.88];
  const hd = [sh[0] + dir(205)[0] * 60 + dir(195)[0] * 56, sh[1] + dir(205)[1] * 60 + dir(195)[1] * 56], fd = dir(195);
  const fingers = `<g transform="translate(540 1080) rotate(8) scale(1.7)">${[-0.6, 0, 0.6].map((o, i) => {
    const a = 195 + o * 40 + (i === 1 ? wig : -wig) * 2, d = dir(a);
    return `<line x1="${f1(hd[0] + fd[0] * 10)}" y1="${f1(hd[1] + fd[1] * 10)}" x2="${f1(hd[0] + d[0] * 30)}" y2="${f1(hd[1] + d[1] * 30)}" stroke="${LOOK.glove}" stroke-width="9" stroke-linecap="round"/>`; }).join('')}</g>`;
  world += `<ellipse cx="545" cy="770" rx="190" ry="170" fill="url(#air)"/>`;
  world += person({ x: 540, y: 1080, s: 1.7, rot: 8, lean: 4, legB: [30, 10], legF: [-20, -5], armB: [205, 195], armF: [135, 235],
    look: Math.sin(u * 1.3) * 0.5, mood: 'scared', blink: blinkAt(u, 2.5, 6.3) }) + fingers;
  const dens = card(540, 1360, 600, 150, `
    <text x="-270" y="50" font-family="Mono" font-size="26" letter-spacing="4" fill="#9FB7C6">СНЕГ</text>
    <text x="270" y="50" text-anchor="end" font-family="Inter" font-size="34" fill="${set > 0.9 ? RED : '#fff'}">${set > 0.9 ? 'КАК БЕТОН' : 'РЫХЛЫЙ'}</text>
    <rect x="-270" y="85" width="540" height="18" rx="9" fill="#fff" opacity=".1"/>
    <rect x="-270" y="85" width="${f1(540 * lerp(0.18, 1, set))}" height="18" rx="9" fill="${set > 0.9 ? RED : GOLD}"/>`, prog(u, 0.4, 0.9) * (1 - prog(u, 4.8, 5.1)));
  const ov = tag(820, 360, 'ТОЛЬКО ПАЛЬЦЫ', { k: prog(u, 5.2, 5.6), size: 30, bg: GOLD, fg: '#1a1a1a', px: 600, py: 470 });
  return camera(world + ov, { t, zoom: lerp(1.08, 1.0, ease(u / 2)) + prog(u, 5.0, 7.7) * 0.25, cx: 540, cy: lerp(900, 640, ease(prog(u, 5.0, 6.0))), shake: 3 * (1 - set) + 1 })
    + dens + vign + hud('14:33 · ЛАВИНА ОСТАНОВИЛАСЬ', 'ГЛУБИНА 1,5 М', { color: RED }) + subs(t, SUBS, 1620);
}

function sPocket(t) {                     // 42.75–47.0: карман воздуха у лица
  const u = t - 42.75;
  const glove = `<g transform="translate(300 1230) rotate(-30)"><rect x="-60" y="-40" width="230" height="90" rx="44" fill="${LOOK.jacket}"/><circle cx="190" cy="4" r="56" fill="${LOOK.glove}"/></g>`;
  const world = pocketBg() + `<ellipse cx="560" cy="1080" rx="360" ry="250" fill="url(#air)" opacity="${f1(prog(u, 1.6, 2.2))}"/>`
    + closeFace(540, 960, 215, { look: Math.sin(u) * 0.4, blink: blinkAt(u, 2.7), rot: -6 }) + glove + breath(u, 590, 1090, 140, -60, 1.3);
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 4.2), shake: 2 }) + vign
    + tag(850, 1330, 'КАРМАН ВОЗДУХА', { k: prog(u, 1.7, 2.1), size: 30, bg: GREEN, fg: '#0f1a12', px: 700, py: 1180 })
    + timerCard(airLeft(t), 1, 1500) + hud('14:33 · ГЛУБИНА 1,5 М', 'ПОД ЛАВИНОЙ', { color: RED }) + subs(t, SUBS, 470);
}

function sSpit(t) {                       // 47.0–58.65: слюна течёт ко лбу → камера переворачивается
  const u = t - 47.0, hx = 540, hy = 900, r = 190;
  const flip = ease(prog(u, 9.2, 10.1));            // 56.2–57.1: открываем, что он вниз головой
  const mouthY = hy - r * 0.56, browY = hy + r * 0.7;
  const kd = ease(prog(u, 6.5, 8.8));
  const dy = lerp(mouthY, browY, kd);
  const drop = u > 4.1 ? `<path d="M${hx} ${f1(mouthY)} L${hx + 6} ${f1(dy)}" stroke="#CFE6F2" stroke-width="10" stroke-linecap="round" opacity=".55"/>
    <path d="M${hx + 6} ${f1(dy + 20)} C ${hx - 12} ${f1(dy)} ${hx - 6} ${f1(dy - 18)} ${hx + 6} ${f1(dy - 30)} C ${hx + 18} ${f1(dy - 18)} ${hx + 24} ${f1(dy)} ${hx + 6} ${f1(dy + 20)}Z" fill="#DDF0FA" opacity="${f1(prog(u, 4.1, 4.5))}"/>` : '';
  const face = closeFace(hx, hy, r, { look: lerp(0, 0.3, kd), blink: blinkAt(u, 2.1, 5.9), rot: 180, mood: 'scared' });
  const world = pocketBg(hx, hy) + face + drop;
  const camRot = lerp(180, 0, flip);
  const ov = flip > 0.98 ? arrow(860, 700, 860, 300, GREEN, prog(u, 10.1, 10.5), 12) + tag(860, 250, 'ВВЕРХ', { k: prog(u, 10.3, 10.6), size: 32, bg: GREEN, fg: '#0f1a12' })
    + arrow(220, 860, 220, 1230, '#DDF0FA', prog(u, 10.1, 10.5), 10) + tag(220, 1290, 'СЛЮНА ВНИЗ', { k: prog(u, 10.3, 10.6), size: 26 }) : '';
  return camera(world, { t, zoom: lerp(1.05, 1.0, flip) + prog(u, 0, 9) * 0.05, cx: hx, cy: hy, rot: camRot, shake: 1.5 }) + vign + ov
    + hud('14:34 · ГЛУБИНА 1,5 М', 'ШАГ 2 · ГДЕ ВЕРХ') + subs(t, SUBS, 1620);
}

function sAir(t) {                        // 58.65–72.95: шаг 3 — не холод, а дыхание; ледяная корка; дышать медленно
  const u = t - 58.65;
  if (u < 5.9) {                          // холод vs дыхание
    const world = pocketBg() + closeFace(540, 860, 180, { look: 0, blink: blinkAt(u, 1.4, 4.6), rot: -4, mood: 'calm' }) + breath(u, 580, 960, 120, -160, 1.4);
    const kx = prog(u, 3.4, 3.8);
    const cold = card(300, 1260, 400, 250, `<g opacity="${f1(1 - kx * 0.6)}">
      ${[0, 60, 120].map(a => `<line x1="${f1(-40 * Math.cos(a * Math.PI / 180))}" y1="${f1(80 - 40 * Math.sin(a * Math.PI / 180))}" x2="${f1(40 * Math.cos(a * Math.PI / 180))}" y2="${f1(80 + 40 * Math.sin(a * Math.PI / 180))}" stroke="#BFD3DE" stroke-width="8" stroke-linecap="round"/>`).join('')}
      <text y="195" text-anchor="middle" font-family="Inter" font-size="40" fill="#fff">ХОЛОД</text></g>
      <line x1="-150" y1="40" x2="150" y2="220" stroke="${RED}" stroke-width="10" stroke-linecap="round" opacity="${f1(kx)}"/>`, prog(u, 2.0, 2.4));
    const kb = prog(u, 4.1, 4.5);
    const br = card(780, 1260, 400, 250, `<ellipse cx="0" cy="110" rx="160" ry="110" fill="url(#glowR)" opacity="${f1(kb * 0.6)}"/>
      ${[0, 1, 2].map(i => `<circle cx="${-40 + i * 40}" cy="${80 - i * 10}" r="${22 + i * 8}" fill="#DDE7ED" opacity=".8"/>`).join('')}
      <text y="195" text-anchor="middle" font-family="Inter" font-size="40" fill="${RED}">ДЫХАНИЕ</text>`, kb);
    return camera(world, { t, zoom: lerp(1.0, 1.06, u / 6), shake: 1.5 }) + vign + cold + br
      + hud('14:35 · ГЛУБИНА 1,5 М', 'ШАГ 3 · ВОЗДУХ') + subs(t, SUBS, 470) + fill('#000', 1 - prog(u, 0, 0.25));
  }
  if (u < 11.2) {                         // ледяная корка: выдох → корка → поры закрываются
    const v = u - 5.9;
    const wallX = 620, crust = ease(prog(v, 1.6, 3.6)) * 46;
    let world = `<rect x="-200" y="-200" width="1480" height="2320" fill="#14222B"/>
      <rect x="${wallX}" y="-200" width="800" height="2320" fill="#3A5466"/>`;
    for (let i = 0; i < 160; i++) world += `<circle cx="${f1(wallX + 20 + rnd(i) * 480)}" cy="${f1(rnd(i + 4) * 1920)}" r="${f1(4 + rnd(i + 2) * 9)}" fill="#203645"/>`;
    for (let i = 0; i < 9; i++) {
      const y = 560 + i * 90, ph = (v * 0.8 + rnd(i)) % 1, blocked = prog(v, 2.6, 3.4);
      world += `<g opacity="${f1(1 - blocked)}">${arrow(1000 - ph * 300, y, 900 - ph * 300, y, '#9FD4F0', 1, 6)}</g>`;
    }
    world += `<rect x="${f1(wallX - crust * 0.2)}" y="380" width="${f1(crust)}" height="1100" rx="20" fill="#BFE6F7" opacity=".85"/>
      <rect x="${f1(wallX + 6)}" y="400" width="${f1(crust * 0.25)}" height="1060" rx="6" fill="#fff" opacity=".7"/>`;
    for (let j = 0; j < 4; j++) {
      const ph = (v - j * 0.9) / 0.9;
      if (ph < 0 || ph > 1) continue;
      for (let i = 0; i < 4; i++) world += `<circle cx="${f1(200 + ph * 380 + i * 14)}" cy="${f1(960 + (i - 1.5) * 40 + Math.sin(ph * 6 + i) * 20)}" r="${f1(30 + ph * 30)}" fill="#E9A07A" opacity="${f1(0.35 * (1 - ph))}" filter="url(#blur6)"/>`;
    }
    world += `<g transform="translate(40 960) rotate(90)">${head(0, 0, 200, { look: 0, mood: 'calm', frost: 1, goggles: true })}</g>`;
    const ov = tag(330, 720, 'ТЁПЛЫЙ ВЫДОХ', { k: prog(v, 0.2, 0.6), size: 28, bg: '#E9A07A', fg: '#1a1a1a', px: 420, py: 900 })
      + tag(830, 330, 'ЛЕДЯНАЯ КОРКА', { k: prog(v, 0.7, 1.1), size: 30, bg: GOLD, fg: '#1a1a1a', px: 640, py: 470 })
      + tag(830, 1440, 'ВОЗДУХ НЕ ПРОХОДИТ', { k: prog(v, 1.6, 2.0), size: 28, bg: RED, fg: '#fff', px: 800, py: 1400 });
    return camera(world + ov, { t, zoom: lerp(1.04, 1.0, v / 5.3), shake: 1 }) + vign + hud('14:35 · ПЕРЕД ЛИЦОМ', 'ШАГ 3 · ВОЗДУХ') + subs(t, SUBS, 1640);
  }
  const v = u - 11.2;                     // дышать медленно, не кричать
  const world = pocketBg() + closeFace(540, 860, 180, { look: -0.2, blink: blinkAt(v, 0.7, 2.6), rot: -4, mood: 'calm' }) + breath(v, 580, 960, 120, -160, 1.6);
  let wave = '';
  for (let x = -230; x <= 230; x += 6) wave += `${x},${f1(80 + Math.sin((x + v * 120) / 40) * 26)} `;
  const slow = card(300, 1260, 420, 230, `<polyline points="${wave}" fill="none" stroke="${GREEN}" stroke-width="7" stroke-linejoin="round"/>
    <text y="190" text-anchor="middle" font-family="Inter" font-size="36" fill="${GREEN}">МЕДЛЕННО</text>`, prog(v, 0.1, 0.5));
  const kc = prog(v, 1.6, 2.0);
  const shout = card(780, 1260, 400, 230, `<text y="110" text-anchor="middle" font-family="Inter" font-size="64" fill="#fff" opacity=".85">А-А-А!</text>
    <text y="190" text-anchor="middle" font-family="Inter" font-size="36" fill="${RED}">КРИК</text>
    <line x1="-150" y1="30" x2="150" y2="210" stroke="${RED}" stroke-width="10" stroke-linecap="round" opacity="${f1(prog(v, 1.9, 2.2))}"/>`, kc);
  return camera(world, { t, zoom: lerp(1.0, 1.05, v / 3), shake: 1.5 }) + vign + slow + shout
    + hud('14:36 · ГЛУБИНА 1,5 М', 'ШАГ 3 · ВОЗДУХ') + subs(t, SUBS, 470) + fill('#000', 1 - prog(v, 0, 0.2));
}

function sSound(t) {                      // 72.95–81.1: звук сверху проходит, снизу — нет
  const u = t - 72.95, surf = 520, px = 540, py = 1250;
  let world = `<rect x="-300" y="-300" width="1700" height="900" fill="#2B3E4F"/>${snowLayers(surf)}`;
  const walk = ease(prog(u, 6.1, 7.6));
  const people = [[lerp(180, 430, walk), 0], [lerp(300, 610, walk), 1]].map(([x, i]) =>
    `<g transform="translate(${f1(x)} ${surf - 4}) scale(.55)" opacity=".9"><g transform="translate(0 -145)">${withPal({ jacket: '#1C2833', jacketD: '#16202A', pants: '#1C2833', pantsD: '#16202A', hat: '#1C2833', hatD: '#16202A', pom: '#1C2833', glove: '#16202A', boot: '#16202A' },
      () => person({ x: 0, y: 0, legB: [10 + Math.sin(u * 5 + i) * 15 * walk, 0], legF: [-10 - Math.sin(u * 5 + i) * 15 * walk, 0], armB: [15, 5], armF: [-15, -5], pack: false }))}</g></g>`).join('');
  world += people;
  // волны: сверху вниз (доходят), снизу вверх (гаснут)
  for (let j = 0; j < 3; j++) {
    const ph = ((u - 0.3) * 0.6 + j / 3) % 1, k = prog(u, 0.3, 0.6) * (1 - prog(u, 2.9, 3.2));
    if (k > 0) world += `<path d="M${f1(px - 120 - ph * 200)} ${f1(surf + 60 + ph * 600)} Q ${px} ${f1(surf + 120 + ph * 640)} ${f1(px + 120 + ph * 200)} ${f1(surf + 60 + ph * 600)}" fill="none" stroke="${GREEN}" stroke-width="7" opacity="${f1(k * (1 - ph * 0.5))}"/>`;
  }
  const near = prog(u, 7.0, 7.4);
  for (let j = 0; j < 3; j++) {
    const ph = ((u - 2.9) * 0.7 + j / 3) % 1, k = prog(u, 2.9, 3.2);
    const reach = lerp(0.35, 1.0, near), fade = 1 - ph / reach;
    if (k > 0 && ph < reach) world += `<path d="M${f1(px - 100 - ph * 160)} ${f1(py - 80 - ph * 640)} Q ${px} ${f1(py - 140 - ph * 680)} ${f1(px + 100 + ph * 160)} ${f1(py - 80 - ph * 640)}" fill="none" stroke="${near > 0.5 ? GREEN : RED}" stroke-width="7" opacity="${f1(k * fade)}"/>`;
  }
  world += `<ellipse cx="${px}" cy="${py}" rx="220" ry="200" fill="#3B5869" opacity=".5" filter="url(#blur18)"/>`
    + person({ x: px, y: py, s: 1.05, rot: 180, lean: 10, legB: [20, 0], legF: [-20, 0], armB: [205, 195], armF: [135, 235], mood: 'scared', look: Math.sin(u) * 0.6 });
  const ov = tag(860, 330, 'ГОЛОСА', { k: prog(u, 0.3, 0.7), size: 28, px: 600, py: 470 })
    + tag(860, 820, 'ПОЧТИ НЕ СЛЫШНО', { k: prog(u, 3.6, 4.0) * (1 - near), size: 28, bg: RED, fg: '#fff', px: 640, py: 900 })
    + tag(860, 820, 'ШАГИ РЯДОМ', { k: near, size: 28, bg: GOLD, fg: '#1a1a1a', px: 640, py: 900 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.04, u / 8), cx: 540, cy: 960, shake: 1 }) + ruler(py, '1,5 М', surf) + vign
    + hud('14:37 · ЗВУК ПОД СНЕГОМ', 'ШАГ 3 · ВОЗДУХ') + subs(t, SUBS, 1700) + fill('#000', 1 - prog(u, 0, 0.25));
}

function sBeacon(t) {                     // 81.1–86.5: лавинный датчик на груди
  const u = t - 81.1;
  let world = `<rect x="-200" y="-200" width="1480" height="2320" fill="#14222B"/>
    <path d="M-100 2100 L-100 700 Q 540 430 1180 700 L1180 2100Z" fill="${LOOK.jacket}"/>
    <path d="M540 520 L540 2100" stroke="${LOOK.jacketD}" stroke-width="14"/>
    <path d="M200 620 L420 1200 M880 620 L660 1200" stroke="#2A2F36" stroke-width="40" stroke-linecap="round"/>`;
  const led = Math.sin(u * 7) > 0.3 ? 1 : 0.25;
  for (let j = 0; j < 4; j++) {
    const ph = (u * 0.8 + j / 4) % 1;
    world += `<circle cx="540" cy="1200" r="${f1(200 + ph * 700)}" fill="none" stroke="${GOLD}" stroke-width="6" opacity="${f1((1 - ph) * 0.6 * prog(u, 0.5, 1.0))}"/>`;
  }
  world += `<g transform="translate(540 1200) rotate(${f1(Math.sin(u * 1.2) * 2)})">
    <rect x="-200" y="-260" width="400" height="520" rx="70" fill="#2A3138"/><rect x="-170" y="-230" width="340" height="300" rx="30" fill="#10171C"/>
    <rect x="-150" y="-210" width="300" height="260" rx="20" fill="#E8F0A8" opacity=".9"/>
    <text x="0" y="-110" text-anchor="middle" font-family="Mono" font-size="40" fill="#1a1a1a">ПЕРЕДАЧА</text>
    <text x="0" y="-20" text-anchor="middle" font-family="Mono" font-size="64" fill="#1a1a1a">457</text>
    <text x="0" y="30" text-anchor="middle" font-family="Mono" font-size="26" fill="#1a1a1a">кГц</text>
    <circle cx="0" cy="160" r="38" fill="${RED}" opacity="${led}"/><circle cx="0" cy="160" r="70" fill="url(#glowR)" opacity="${f1(led * 0.8)}"/></g>`;
  return camera(world, { t, zoom: lerp(1.15, 1.0, ease(u / 2.5)), cx: 540, cy: 1150, shake: 1.5 }) + `<rect y="1380" width="${W}" height="540" fill="url(#botShade)"/>` + vign
    + tag(540, 520, 'ЛАВИННЫЙ ДАТЧИК', { k: prog(u, 3.5, 3.9), size: 32, bg: GOLD, fg: '#1a1a1a' })
    + hud('14:38 · ГЛУБИНА 1,5 М', 'ШАГ 4 · СИГНАЛ') + subs(t, SUBS, 1720) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sMap(t) {                        // 86.5–93.45: карта — Макс бежит снизу, 2 км
  const u = t - 86.5;
  let world = `<rect x="-200" y="-200" width="1480" height="2320" fill="#DCE3E8"/>`;
  for (let i = 0; i < 14; i++) {
    let d = '';
    for (let a = 0; a <= 360; a += 10) {
      const rr = 80 + i * 70 + Math.sin(a * Math.PI / 45 + i) * 18;
      d += `${a ? 'L' : 'M'}${f1(600 + Math.cos(a * Math.PI / 180) * rr)} ${f1(560 + Math.sin(a * Math.PI / 180) * rr * 1.25)} `;
    }
    world += `<path d="${d}Z" fill="none" stroke="#9AAAB6" stroke-width="3" opacity=".7"/>`;
  }
  for (let i = 0; i < 50; i++) world += `<circle cx="${f1(rnd(i) * 1080)}" cy="${f1(1400 + rnd(i + 3) * 600)}" r="${f1(16 + rnd(i + 1) * 16)}" fill="#557A63" opacity=".8"/>`;
  world += `<path d="M680 520 C 760 600, 800 680, 720 820 S 600 900, 640 980" fill="#F4F7F9" stroke="#C9D5DD" stroke-width="6"/>
    <ellipse cx="700" cy="760" rx="150" ry="260" fill="${RED}" opacity=".12"/>`;
  for (let j = 0; j < 3; j++) { const ph = (u * 0.7 + j / 3) % 1; world += `<circle cx="690" cy="900" r="${f1(20 + ph * 110)}" fill="none" stroke="${GOLD}" stroke-width="5" opacity="${f1(1 - ph)}"/>`; }
  world += `<circle cx="690" cy="900" r="16" fill="${GOLD}"/>`;
  const path = [[240, 1820], [320, 1600], [300, 1400], [420, 1250], [520, 1080], [640, 960]];
  world += `<polyline points="${path.map(p => p.join(',')).join(' ')}" fill="none" stroke="#3E7CB1" stroke-width="6" stroke-dasharray="16 14" opacity=".9"/>`;
  const run = prog(u, 1.8, 7.0) * 0.28, seg = run * (path.length - 1), si = Math.min(path.length - 2, Math.floor(seg)), sk = seg - si;
  const mx = lerp(path[si][0], path[si + 1][0], sk), my = lerp(path[si][1], path[si + 1][1], sk);
  world += `<rect x="170" y="1800" width="140" height="80" rx="12" fill="#2B3A46"/><circle cx="${f1(mx)}" cy="${f1(my)}" r="22" fill="#3E7CB1" stroke="#fff" stroke-width="6"/>`;
  const ov = tag(860, 760, 'АРТЁМ', { k: prog(u, 0.2, 0.6), size: 28, bg: GOLD, fg: '#1a1a1a', px: 700, py: 890 })
    + tag(mx + 170, my + 40, 'МАКС', { k: prog(u, 0.9, 1.3), size: 28, bg: '#3E7CB1', fg: '#fff', px: mx + 20, py: my })
    + tag(260, 1330, '2 КМ', { k: prog(u, 3.2, 3.6), size: 34, bg: '#1b2630', fg: '#fff' });
  const kc = prog(u, 5.0, 5.4);
  const cmp = card(540, 1430, 820, 220, `
    <text x="-200" y="60" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">МАКСУ БЕЖАТЬ</text>
    <text x="-200" y="160" text-anchor="middle" font-family="Inter" font-size="76" fill="#7FB6E6">~20 МИН</text>
    <text x="200" y="60" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ВОЗДУХА</text>
    <text x="200" y="160" text-anchor="middle" font-family="Inter" font-size="76" fill="${RED}">15 МИН</text>
    <line x1="0" y1="40" x2="0" y2="180" stroke="#fff" stroke-opacity=".15" stroke-width="3"/>`, kc);
  return camera(world + ov, { t, zoom: lerp(1.25, 1.0, ease(u / 3)), cx: lerp(690, 540, ease(u / 3)), cy: lerp(900, 1100, ease(u / 3)), shake: 0.8 })
    + vign + cmp + hud('14:38 · КАРТА СКЛОНА', 'МАКС БЕЖИТ НА СИГНАЛ', { color: '#7FB6E6' }) + subs(t, SUBS, 470) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sCheck(t) {                      // 93.45–97.2: всё по правилам, ждать
  const u = t - 93.45;
  const world = pocketBg() + closeFace(540, 860, 170, { look: lerp(0.3, -0.3, ease(u / 3.5)), blink: blinkAt(u, 1.2, 3.1), rot: -4, mood: 'calm', frost: 1 })
    + breath(u, 575, 950, 110, -150, 1.7);
  const rows = ['КАРМАН ВОЗДУХА', 'НАЙТИ ВЕРХ', 'ДЫШАТЬ МЕДЛЕННО', 'ДАТЧИК ВКЛЮЧЁН'];
  const list = card(540, 1180, 640, 420, `<rect x="-320" y="0" width="640" height="56" rx="26" fill="${GOLD}"/><rect x="-320" y="30" width="640" height="26" fill="${GOLD}"/>
    <text y="40" text-anchor="middle" font-family="Mono" font-size="26" letter-spacing="8" fill="#1a1a1a">ПРОТОКОЛ</text>
    ${rows.map((r, i) => { const k = prog(u, 0.3 + i * 0.35, 0.55 + i * 0.35); return `<text x="-270" y="${120 + i * 76}" font-family="Inter" font-size="36" fill="#fff">${i + 1}  ${r}</text>
      <rect x="220" y="${88 + i * 76}" width="44" height="44" rx="10" fill="${k > 0.5 ? GREEN : 'none'}" stroke="${k > 0.5 ? GREEN : '#9FB7C6'}" stroke-width="4"/>
      <path d="M230 ${110 + i * 76} l10 10 l16 -20" fill="none" stroke="#0f1a12" stroke-width="6" stroke-linecap="round" opacity="${f1(k)}"/>`; }).join('')}`, prog(u, 0, 0.3));
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 4), shake: 1 }) + vign + list
    + hud('14:40 · ГЛУБИНА 1,5 М', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 1720) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sDig(t) {                        // 97.2–104.35: 12-я минута, сверху кто-то копает
  const u = t - 97.2, surf = 470, px = 560, py = 1180;
  const dig = prog(u, 2.3, 2.6);
  let world = `<rect x="-300" y="-300" width="1700" height="900" fill="#141E28"/>${snowLayers(surf)}`;
  const hole = dig * (60 + u * 25);
  world += `<path d="M${px - 130} ${surf} Q ${px} ${f1(surf + hole)} ${px + 130} ${surf}Z" fill="#141E28"/>`;
  for (let i = 0; i < 26; i++) {
    const ph = ((u * 1.3 + rnd(i)) % 1);
    world += `<circle cx="${f1(px - 120 + rnd(i + 3) * 240)}" cy="${f1(surf + hole * 0.5 + ph * 500)}" r="${f1(4 + rnd(i) * 7)}" fill="#9FB7C6" opacity="${f1(dig * (1 - ph) * 0.8)}"/>`;
  }
  const sw = Math.sin(u * 6) * 18 * dig;
  world += `<g transform="translate(${px + 30} ${f1(surf - 40 + Math.max(0, sw))}) rotate(${f1(20 + sw)})" opacity="${f1(dig)}">
    <rect x="-8" y="-260" width="16" height="230" rx="6" fill="#0A0F14"/><path d="M-50 -40 L50 -40 L40 50 Q0 80 -40 50Z" fill="#0A0F14"/></g>`;
  for (let j = 0; j < 3; j++) { const ph = (u * 1.2 + j / 3) % 1; world += `<path d="M${f1(px - 80 - ph * 140)} ${f1(surf + 60 + ph * 500)} Q ${px} ${f1(surf + 110 + ph * 540)} ${f1(px + 80 + ph * 140)} ${f1(surf + 60 + ph * 500)}" fill="none" stroke="${RED}" stroke-width="6" opacity="${f1(dig * (1 - ph) * 0.8)}"/>`; }
  world += `<ellipse cx="${px}" cy="${py}" rx="220" ry="200" fill="#3B5869" opacity=".5" filter="url(#blur18)"/>`
    + person({ x: px, y: py, s: 1.05, rot: 180, lean: 10, legB: [20, 0], legF: [-20, 0], armB: [205, 195], armF: [135, 235], mood: 'scared', look: lerp(0, -0.8, dig) });
  const ov = tag(830, 300, 'КТО-ТО КОПАЕТ', { k: prog(u, 2.6, 3.0), size: 30, bg: RED, fg: '#fff', px: px + 60, py: surf + 10 });
  const mapc = card(820, 1260, 360, 300, `<text x="0" y="46" text-anchor="middle" font-family="Mono" font-size="22" letter-spacing="4" fill="#9FB7C6">МАКС</text>
    <line x1="0" y1="80" x2="0" y2="250" stroke="#7FB6E6" stroke-width="5" stroke-dasharray="10 10"/>
    <circle cx="0" cy="80" r="14" fill="${GOLD}"/><circle cx="0" cy="${f1(250 - Math.sin(u * 4) * 3)}" r="16" fill="#3E7CB1" stroke="#fff" stroke-width="5"/>
    <text x="26" y="180" font-family="Inter" font-size="40" fill="#fff">2 КМ</text>`, prog(u, 4.1, 4.5));
  return camera(world + ov, { t, zoom: lerp(1.0, 1.06, u / 7), cx: 540, cy: 960, shake: 1 + dig * 2 }) + ruler(py, '1,5 М', surf) + vign + mapc
    + timerCard(180 - u * 0.5, prog(u, 0.1, 0.5), 1520, 'ОСТАЛОСЬ ВОЗДУХА')
    + hud('14:44 · МИНУТА 12', 'ГЛУБИНА 1,5 М', { color: RED }) + subs(t, SUBS, 1180) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sStranger(t) {                   // 104.35–109.6: на поверхности — тёмная фигура копает
  const u = t - 104.35;
  const horizon = 1050;
  let world = `<rect x="-300" y="-300" width="1700" height="1500" fill="url(#skyD)"/>${mountains('#26364A', '#30425A', '#6E8294')}
    <rect x="-300" y="${horizon}" width="1700" height="1300" fill="#5A6E80"/>`;
  for (let i = 0; i < 40; i++) world += `<circle cx="${f1(rnd(i) * 1080)}" cy="${f1(rnd(i + 2) * 600)}" r="${f1(1.5 + rnd(i + 1) * 2)}" fill="#fff" opacity="${f1(0.4 + 0.3 * Math.sin(u * 2 + i))}"/>`;
  for (let i = 0; i < 8; i++) world += `<ellipse cx="${f1(560 + Math.sin(i * 0.9) * 26 - i * 6)}" cy="${f1(1150 + i * 70)}" rx="${f1(14 + i * 2)}" ry="${f1(8 + i)}" fill="#3E5062"/>`;
  const sw = Math.sin(u * 4.5);
  world += `<g transform="translate(560 1130) scale(.9)">
    <ellipse cx="0" cy="40" rx="200" ry="40" fill="#46596B"/>
    <path d="M-60 -20 Q -80 -160 -20 -230 Q 40 -260 70 -180 Q 90 -100 60 -20Z" fill="#06090D"/>
    <circle cx="10" cy="-260" r="52" fill="#06090D"/>
    <line x1="30" y1="-150" x2="${f1(120 + sw * 30)}" y2="${f1(-40 + sw * 30)}" stroke="#06090D" stroke-width="26" stroke-linecap="round"/>
    <line x1="${f1(40 + sw * 30)}" y1="${f1(-200 + sw * 20)}" x2="${f1(150 + sw * 40)}" y2="${f1(30 + sw * 20)}" stroke="#06090D" stroke-width="10"/></g>`;
  for (let i = 0; i < 18; i++) {
    const ph = (u * 1.4 + rnd(i)) % 1;
    world += `<circle cx="${f1(700 + ph * 200 + rnd(i) * 40)}" cy="${f1(1150 - Math.sin(ph * Math.PI) * 160)}" r="${f1(5 + rnd(i + 1) * 8)}" fill="#B9C9D6" opacity="${f1((1 - ph) * 0.8)}"/>`;
  }
  return camera(world, { t, zoom: lerp(1.0, 1.22, ease(u / 5.2)), cx: 560, cy: lerp(1000, 1050, u / 5), shake: 1.2 }) + vign
    + hud('14:44 · СКЛОН ЗАКРЫТ', 'КРОМЕ НИХ — НИКОГО', { color: RED }) + subs(t, SUBS, 1560) + fill('#000', 1 - prog(u, 0, 0.3));
}

function sEnd(t) {                        // 109.6–111.5: ЧАСТЬ 2
  const u = t - 109.6, k = eout(prog(u, 0.1, 0.5));
  return fill('#05080B') + `<g opacity="${f1(k)}" transform="translate(0 ${f1((1 - k) * 30)})">
    <text x="540" y="820" text-anchor="middle" font-family="Mono" font-size="34" letter-spacing="14" fill="${GOLD}">ЧАСТЬ 2</text>
    <text x="540" y="960" text-anchor="middle" font-family="Inter" font-size="120" fill="#fff">КТО</text>
    <text x="540" y="1090" text-anchor="middle" font-family="Inter" font-size="120" fill="${RED}">КОПАЕТ?</text>
    <text x="540" y="1190" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="6" fill="#9FB7C6" opacity=".7">ЛАВИНА · ПРОДОЛЖЕНИЕ СЛЕДУЕТ</text></g>`;
}

const SCENES = [[0, sHook], [3.8, sWhere], [6.6, sTimer], [9.2, sSetup], [15.85, sCrack], [21.15, sSwim], [29.35, sCover],
  [35.0, sConcrete], [42.75, sPocket], [47.0, sSpit], [58.65, sAir], [72.95, sSound], [81.1, sBeacon], [86.5, sMap],
  [93.45, sCheck], [97.2, sDig], [104.35, sStranger], [109.6, sEnd]];

function story(t) {
  let i = SCENES.length - 1;
  while (SCENES[i][0] > t) i--;
  return SCENES[i][1](t);
}

function render(t) {
  if (t >= B && t < B + AD) {             // стоп-кадр под баннером: лёгкий наезд и затемнение
    const k = (t - B) / AD, z = 1 + 0.03 * ease(k);
    return frame(`<g transform="translate(540 960) scale(${z.toFixed(4)}) translate(-540 -960)">${story(B - 1 / 30)}</g>${fill('#000', 0.35 * Math.min(1, k * 6, (1 - k) * 6))}`, DEFS2);
  }
  return frame(story(t < B ? t : t - AD), DEFS2);
}
