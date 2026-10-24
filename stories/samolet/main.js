// «Самолёт на воде», часть 1. Время — по шкале голоса (work/samolet/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе между фразами): ролик замирает (лёгкий наезд), 7,2 с баннер, потом история с того же места.
const B = 43.68, AD = 7.2, STORY = 87.0;
const DUR = STORY + AD;

const SUBS = [
  [0.2, 'ЕСЛИ САМОЛЁТ САДИТСЯ НА ВОДУ,'], [2.1, 'НЕ НАДУВАЙТЕ ЖИЛЕТ В САЛОНЕ.', { 'ЖИЛЕТ': RED }],
  [4.2, 'ТАК ВЫ САМИ ЗАПРЁТЕ СЕБЯ ВНУТРИ.', { 'ВНУТРИ.': RED }],
  [6.6, 'У АНИ ЕСТЬ 90 СЕКУНД.', { '90': RED, 'СЕКУНД.': RED }],
  [9.4, 'РЕЙС НАД ЧЁРНЫМ МОРЕМ.'], [11.6, 'ОБА ДВИГАТЕЛЯ ОТКАЗАЛИ.', { 'ОТКАЗАЛИ.': RED }],
  [13.4, 'ПИЛОТ ОБЪЯВЛЯЕТ:'], [14.7, 'САДИМСЯ НА ВОДУ.', { 'ВОДУ.': RED }],
  [16.4, 'ШАГ ПЕРВЫЙ: УДАР.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }], [18.2, 'НАКЛОНИТЬСЯ ВПЕРЁД,'],
  [19.5, 'ГОЛОВУ К СПИНКЕ ПЕРЕДНЕГО КРЕСЛА,', { 'ГОЛОВУ': GOLD }], [21.4, 'РУКИ НА ЗАТЫЛОК.', { 'РУКИ': GOLD }],
  [23.0, 'ЕЩЁ ДО УДАРА АНЯ СЧИТАЕТ РЯДЫ:'], [25.9, 'ДО ВЫХОДА 7 КРЕСЕЛ.', { '7': GOLD, 'ВЫХОДА': GREEN }],
  [28.2, 'ШАГ ВТОРОЙ: ВЫХОД.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [30.0, 'ПОСЛЕ УДАРА В САЛОНЕ ТЕМНО И ДЫМНО.', { 'ДЫМНО.': RED }],
  [32.7, 'АНЯ ИДЁТ НА ОЩУПЬ'], [34.0, 'И СЧИТАЕТ СПИНКИ КРЕСЕЛ:'],
  [35.7, 'ПЯТЬ,', { 'ПЯТЬ,': GOLD }], [36.2, 'ШЕСТЬ,', { 'ШЕСТЬ,': GOLD }], [36.9, 'СЕМЬ.', { 'СЕМЬ.': GOLD }], [37.7, 'ДВЕРЬ.', { 'ДВЕРЬ.': GREEN }],
  [38.4, 'ШАГ ТРЕТИЙ: ЖИЛЕТ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [40.4, 'ЛЮДИ ВПЕРЕДИ НАДУВАЮТ ЖИЛЕТЫ'],
  [42.4, 'ПРЯМО В ПРОХОДЕ.', { 'ПРОХОДЕ.': RED }], [43.8, 'КОГДА ВОДА ХЛЫНЕТ В САЛОН,'],
  [45.8, 'ИХ ПРИЖМЁТ К ПОТОЛКУ.', { 'ПРИЖМЁТ': RED, 'ПОТОЛКУ.': RED }],
  [47.8, 'АНЯ ДЁРГАЕТ ШНУР ТОЛЬКО НА КРЫЛЕ.', { 'КРЫЛЕ.': GREEN }],
  [50.2, 'ШАГ ЧЕТВЁРТЫЙ: ХОЛОДНАЯ ВОДА.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }],
  [52.7, 'ПЕРВУЮ МИНУТУ ТЕЛО'], [53.6, 'САМО ХВАТАЕТ ВОЗДУХ.', { 'ХВАТАЕТ': RED }],
  [55.8, 'ГЛАВНОЕ — ДЕРЖАТЬ ГОЛОВУ НАД ВОДОЙ', { 'ГОЛОВУ': GREEN }], [58.2, 'И НЕ ПАНИКОВАТЬ.'],
  [59.7, 'ЧЕРЕЗ МИНУТУ ДЫХАНИЕ УСПОКОИТСЯ.', { 'УСПОКОИТСЯ.': GREEN }],
  [62.7, 'АНЯ ЗАБИРАЕТСЯ НА НАДУВНОЙ ТРАП.'], [64.9, 'ОН ПРЕВРАЩАЕТСЯ В ПЛОТ.', { 'ПЛОТ.': GOLD }],
  [66.6, 'РЯДОМ ЕЩЁ 9 ЧЕЛОВЕК.', { '9': GOLD }], [68.7, 'ВЕРТОЛЁТ УЖЕ ВЫЛЕТЕЛ.'],
  [70.3, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [72.2, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [74.3, 'СТЮАРДЕССА ПЕРЕСЧИТЫВАЕТ ЛЮДЕЙ В ПЛОТУ.'], [77.3, 'ДЕСЯТЬ.', { 'ДЕСЯТЬ.': RED }],
  [78.3, 'ТОЛЬКО ИЗ ХВОСТА САМОЛЁТА'], [79.8, 'ВЫХОДИЛИ ДЕВЯТЬ.', { 'ДЕВЯТЬ.': RED }],
  [81.3, 'И МУЖЧИНА НАПРОТИВ АНИ'], [82.9, 'СОВЕРШЕННО СУХОЙ.', { 'СУХОЙ.': RED }],
].map((s, i, a) => ({ a: s[0], b: i + 1 < a.length ? a[i + 1][0] : 84.9, text: s[1], keys: s[2] || {} }));

const ANYA = { jacket: '#5B7BA6', jacketD: '#46648C', pants: '#2E3440', pantsD: '#252A33', glove: '#EBC6A0', hair: '#4A2E22' };
const PAX = [{ jacket: '#8A5A44', jacketD: '#6E4636', hair: '#2B2B2B' }, { jacket: '#5E7D5A', jacketD: '#4A6447', hair: '#B8893E' },
  { jacket: '#7A6A9E', jacketD: '#5F5280', hair: '#1E1E1E' }, { jacket: '#A04848', jacketD: '#803838', hair: '#6B4A2E' }];
const VEST = '#F2C230', VEST_D = '#D9A51C';
const vign = `<rect width="${W}" height="${H}" fill="url(#vign)"/>`;
const fill = (c, o = 1) => `<rect width="${W}" height="${H}" fill="${c}" opacity="${f1(o)}"/>`;
const asAnya = fn => withPal({ ...ANYA, glove: SKIN }, fn);
const asPax = (i, fn) => withPal({ ...PAX[i % PAX.length], glove: SKIN, pants: '#2E3440', pantsD: '#252A33' }, fn);
const blinkAt = (u, ...ts) => Math.max(0, ...ts.map(b => 1 - Math.abs(u - b) / 0.09));

const DEFS2 = `<linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D2B3E"/><stop offset=".55" stop-color="#4F5F78"/><stop offset="1" stop-color="#C98A5E"/></linearGradient>
  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C4A5C"/><stop offset="1" stop-color="#0E1C26"/></linearGradient>
  <linearGradient id="cabin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A4450"/><stop offset="1" stop-color="#1C232B"/></linearGradient>
  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3D7C93" stop-opacity=".85"/><stop offset="1" stop-color="#173544" stop-opacity=".95"/></linearGradient>
  <radialGradient id="glowR" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${RED}" stop-opacity=".8"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${GREEN}" stop-opacity=".7"/><stop offset="1" stop-color="${GREEN}" stop-opacity="0"/></radialGradient>
  <radialGradient id="pocket" cx="50%" cy="42%" r="60%"><stop offset="0" stop-color="#3E5C6E"/><stop offset="1" stop-color="#162630"/></radialGradient>
  <clipPath id="hull"><circle cx="540" cy="900" r="430"/></clipPath>`;

function arrow(x1, y1, x2, y2, c, k = 1, w = 10) {
  if (k <= 0) return '';
  const ex = lerp(x1, x2, eout(k)), ey = lerp(y1, y2, eout(k)), a = Math.atan2(ey - y1, ex - x1);
  const h = w * 2.6, p = s => `${f1(ex - Math.cos(a) * h + Math.cos(a + Math.PI / 2) * s)},${f1(ey - Math.sin(a) * h + Math.sin(a + Math.PI / 2) * s)}`;
  return `<line x1="${x1}" y1="${y1}" x2="${f1(ex - Math.cos(a) * h * 0.6)}" y2="${f1(ey - Math.sin(a) * h * 0.6)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>
    <polygon points="${f1(ex)},${f1(ey)} ${p(h * 0.6)} ${p(-h * 0.6)}" fill="${c}"/>`;
}

// ---------- общие куски ----------
function seaWaves(y0, u, c = '#5E8295', n = 18) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const y = y0 + 40 + i * 70, x = ((rnd(i) * 1400 + u * (20 + i * 3)) % 1400) - 200;
    s += `<path d="M${f1(x)} ${y} q 30 -14 60 0 q 30 14 60 0" fill="none" stroke="${c}" stroke-width="5" opacity="${f1(0.25 + rnd(i + 3) * 0.3)}" stroke-linecap="round"/>`;
  }
  return s;
}

function plane(x, y, s, rot, { smoke = 0, u = 0, sink = 0 } = {}) {
  let p = `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})">`;
  if (smoke > 0) for (let i = 0; i < 16; i++) {
    const ph = (u * 0.8 + i / 16) % 1;
    for (const ex of [-40, 90]) p += `<circle cx="${f1(ex - 140 - ph * 600)}" cy="${f1(70 - ph * 60 + Math.sin(i + ph * 5) * 20)}" r="${f1(20 + ph * 70)}" fill="#2A2F36" opacity="${f1(smoke * 0.55 * (1 - ph))}"/>`;
  }
  p += `<path d="M-330 -20 L-420 -170 L-360 -170 L-250 -40Z" fill="#C9D2DA"/><path d="M-330 -20 L-400 -150 L-370 -150" fill="none" stroke="${RED}" stroke-width="10"/>
    <rect x="-380" y="-50" width="760" height="110" rx="55" fill="#EEF2F5"/><path d="M330 -50 Q 420 -40 430 5 Q 420 55 330 60Z" fill="#EEF2F5"/>
    <path d="M360 -30 Q 400 -26 410 -5 L 370 -5Z" fill="#26323D"/>
    <rect x="-380" y="25" width="800" height="12" fill="#3E7CB1" opacity=".8"/>`;
  for (let i = 0; i < 14; i++) p += `<rect x="${-300 + i * 44}" y="-22" width="22" height="26" rx="10" fill="#26323D"/>`;
  p += `<path d="M-60 20 L-170 140 L-110 140 L60 30Z" fill="#B9C4CD"/>
    <rect x="-150" y="60" width="110" height="46" rx="23" fill="#9AA6B0"/><rect x="-10" y="60" width="0" height="0"/>`;
  if (smoke > 0) p += `<circle cx="-150" cy="83" r="${f1(16 + Math.sin(u * 20) * 4)}" fill="${RED}" opacity="${f1(smoke * 0.8)}"/>`;
  return p + '</g>';
}

function closeFace(hx, hy, r, o = {}) {
  const sc = r / 215;
  return `<g transform="rotate(${f1(o.rot || 0)} ${hx} ${hy})">
    <g transform="translate(${hx} ${hy}) scale(${sc}) translate(${-hx} ${-hy})">
    <path d="M${hx - 330} ${hy + 520} Q${hx - 300} ${hy + 230} ${hx} ${hy + 240} Q${hx + 300} ${hy + 230} ${hx + 330} ${hy + 520}Z" fill="${LOOK.jacket}"/>
    ${o.vest ? `<path d="M${hx - 250} ${hy + 520} Q${hx - 260} ${hy + 280} ${hx - 90} ${hy + 250} L${hx - 60} ${hy + 520}Z M${hx + 250} ${hy + 520} Q${hx + 260} ${hy + 280} ${hx + 90} ${hy + 250} L${hx + 60} ${hy + 520}Z" fill="${VEST}"/>` : ''}
    <path d="M${hx - 140} ${hy + 250} L${hx} ${hy + 330} L${hx + 140} ${hy + 250}" fill="none" stroke="${LOOK.jacketD}" stroke-width="26" stroke-linecap="round"/></g>
    ${head(hx, hy, r, { look: o.look || 0, blink: o.blink || 0, mood: o.mood || 'scared' })}${o.extra || ''}</g>`;
}

function timerCard(sec, k, y = 1430, label = 'ДО ЗАТОПЛЕНИЯ', total = 90) {
  const mm = String(Math.floor(sec / 60)).padStart(2, '0'), ss = String(Math.floor(sec % 60)).padStart(2, '0');
  return card(540, y, 520, 200, `
    <text x="0" y="48" text-anchor="middle" font-family="Mono" font-size="26" letter-spacing="6" fill="#9FB7C6">${label}</text>
    <text x="0" y="132" text-anchor="middle" font-family="Inter" font-size="84" fill="${RED}">${mm}:${ss}</text>
    <rect x="-235" y="160" width="470" height="12" rx="6" fill="#fff" opacity=".1"/>
    <rect x="-235" y="160" width="${f1(470 * sec / total)}" height="12" rx="6" fill="${RED}"/>`, k);
}

// поперечный разрез фюзеляжа: кресла, проход, вода; люди в проходе (float 0…1 — прижаты к потолку)
function hullCut(u, water, float, { anya = false } = {}) {
  let s = `<circle cx="540" cy="900" r="452" fill="#C9D2DA"/><circle cx="540" cy="900" r="430" fill="url(#cabin)"/><g clip-path="url(#hull)">
    <rect x="100" y="560" width="880" height="70" fill="#4A5562"/><rect x="140" y="580" width="250" height="40" rx="10" fill="#5B6876"/><rect x="690" y="580" width="250" height="40" rx="10" fill="#5B6876"/>
    <rect x="100" y="1110" width="880" height="300" fill="#151B21"/>`;
  for (const sx of [180, 290, 690, 800]) s += `<rect x="${sx}" y="880" width="96" height="230" rx="18" fill="#3C5A86"/><rect x="${sx - 6}" y="1020" width="108" height="40" rx="12" fill="#324C72"/>`;
  const ppl = [[470, 0], [580, 1], [520, 2]];
  ppl.forEach(([px, i], j) => {
    const fy = lerp(0, -330, ease(clamp(float * 1.2 - j * 0.1))), fr = float * (j % 2 ? 25 : -20);
    const vest = `<path d="M-36 -116 Q -60 -60 -30 -30 L 30 -30 Q 60 -60 36 -116 Q 0 -96 -36 -116Z" fill="${VEST}"/>`;
    s += `<g transform="translate(${px} ${1080 + fy}) rotate(${f1(fr + Math.sin(u * 2 + j) * 4 * float)}) scale(.75)">${asPax(i, () => person({ x: 0, y: 0, legB: [8, 0], legF: [-8, 0],
      armB: [lerp(30, 150, float), lerp(20, 170, float)], armF: [lerp(-30, -150, float), lerp(-20, -170, float)], mood: float > 0.3 ? 'scared' : 'calm', pack: false, extra: vest, look: Math.sin(u + j) * 0.5 }))}</g>`;
  });
  if (anya) s += `<g transform="translate(870 1080) scale(.75)">${asAnya(() => person({ x: 0, y: 0, legB: [8, 0], legF: [-8, 0], armB: [20, 10], armF: [-40, -30], mood: 'scared', pack: false, look: -0.8,
    extra: `<rect x="-34" y="-110" width="68" height="18" rx="9" fill="${VEST_D}"/>` }))}</g>`;
  if (water > 0) {
    const wy = lerp(1410, 520, water);
    let d = `M80 ${f1(wy)}`;
    for (let x = 80; x <= 1000; x += 40) d += ` L${x} ${f1(wy + Math.sin(x / 50 + u * 4) * 10)}`;
    s += `<path d="${d} L1000 1500 L80 1500Z" fill="url(#water)"/>`;
    for (let i = 0; i < 20; i++) { const ph = (u * 0.8 + rnd(i)) % 1; s += `<circle cx="${f1(140 + rnd(i + 2) * 800)}" cy="${f1(lerp(1400, wy + 20, ph))}" r="${f1(4 + rnd(i) * 7)}" fill="#BFE6F7" opacity="${f1(0.5 * (1 - ph))}"/>`; }
  }
  return s + '</g>';
}

// ---------- сцены ----------
function sHook(t) {                          // 0–3.9: самолёт снижается к морю на закате
  const k = t / 3.9;
  const world = `<rect x="-300" y="-300" width="1700" height="1500" fill="url(#skyDusk)"/>
    <rect x="-300" y="1150" width="1700" height="1200" fill="url(#sea)"/>${seaWaves(1150, t)}
    <ellipse cx="760" cy="1140" rx="260" ry="20" fill="#E8A066" opacity=".35"/>
    ${plane(lerp(380, 640, k), lerp(700, 930, k), 0.9, 12, { smoke: 1, u: t })}`;
  return camera(world, { t, zoom: lerp(1.0, 1.15, ease(k)), cx: lerp(520, 600, k), cy: lerp(880, 980, k), shake: 2 + 5 * k })
    + vign + hud('ВЫСОТА 300 М · СКОРОСТЬ 250 КМ/Ч', 'ЧЁРНОЕ МОРЕ', { k: eout(prog(t, 0.1, 0.5)) }) + subs(t, SUBS, 1560);
}

function sPinned(t) {                        // 3.9–6.4: разрез — люди в жилетах прижаты к потолку
  const u = t - 3.9;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0E1820"/>` + hullCut(u, 0.75, 1);
  return camera(world, { t, zoom: lerp(1.1, 1.0, ease(u / 2.5)), cx: 540, cy: 920, shake: 1.5 }) + vign
    + tag(860, 360, 'ЖИЛЕТ ВВЕРХ', { k: prog(u, 0.3, 0.7), size: 30, bg: RED, fg: '#fff', px: 560, py: 620 })
    + hud('ЕСЛИ НАДУТЬ В САЛОНЕ', 'ОШИБКА', { color: RED }) + subs(t, SUBS, 1560) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sAnya(t) {                          // 6.4–9.2: крупно Аня, 90 секунд
  const u = t - 6.4;
  const world = `<rect x="-200" y="-200" width="1480" height="2320" fill="url(#cabin)"/>`
    + [0, 1, 2, 3].map(i => `<rect x="${-60 + i * 330}" y="300" width="160" height="200" rx="70" fill="#C98A5E" opacity=".25"/>`).join('')
    + asAnya(() => closeFace(540, 900, 215, { look: lerp(-0.5, 0.4, ease(u / 1.2)), blink: blinkAt(u, 1.8), rot: Math.sin(u * 8) * 1.2 }));
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 2.8), shake: 4 }) + vign
    + tag(850, 1150, 'АНЯ, 29', { k: prog(u, 0.25, 0.6), size: 32, px: 720, py: 1030 })
    + timerCard(Math.max(0, 90 - u * 0.9), prog(u, 0.2, 0.6)) + hud('РЕЙС НАД МОРЕМ', 'ДВИГАТЕЛИ ОТКАЗАЛИ', { color: RED }) + subs(t, SUBS, 470);
}

function sEngines(t) {                       // 9.2–16.2: самолёт над морем, оба двигателя, объявление пилота
  const u = t - 9.2;
  const world = `<rect x="-300" y="-300" width="1700" height="1700" fill="url(#skyDusk)"/>
    <rect x="-300" y="1320" width="1700" height="1200" fill="url(#sea)"/>${seaWaves(1320, u)}
    ${plane(540 + Math.sin(u * 0.6) * 20, 820 + u * 8, 0.95, 6 + Math.sin(u * 0.9) * 2, { smoke: prog(u, 2.2, 2.8), u })}`;
  const ov = tag(220, 560, 'ДВИГАТЕЛЬ 1', { k: prog(u, 2.4, 2.8), size: 26, bg: RED, fg: '#fff', px: 380, py: 930 })
    + tag(860, 600, 'ДВИГАТЕЛЬ 2', { k: prog(u, 2.7, 3.1), size: 26, bg: RED, fg: '#fff', px: 600, py: 930 });
  const pa = card(540, 1420, 700, 190, `<circle cx="-270" cy="95" r="42" fill="${RED}" opacity="${f1(0.6 + 0.4 * Math.sin(u * 8))}"/>
    <path d="M-290 80 L-275 80 L-255 62 L-255 128 L-275 110 L-290 110Z" fill="#fff"/>
    <text x="-200" y="78" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ПИЛОТ</text>
    <text x="-200" y="138" font-family="Inter" font-size="46" fill="#fff">САДИМСЯ НА ВОДУ</text>`, prog(u, 4.2, 4.6));
  return camera(world + ov, { t, zoom: lerp(1.15, 1.0, ease(u / 3)), cx: 540, cy: 920, shake: 2 + prog(u, 2.2, 2.6) * 5 }) + vign + pa
    + hud('ВЫСОТА 3000 М', 'ЧЁРНОЕ МОРЕ') + subs(t, SUBS, 300 + 0 * u) + fill('#000', 1 - prog(u, 0, 0.2));
}

function seatSide(x, y, s = 1, c = '#3C5A86') {   // кресло сбоку (смотрит вправо)
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-260" width="60" height="270" rx="26" fill="${c}"/>
    <rect x="-80" y="-20" width="170" height="44" rx="18" fill="${c}"/><rect x="-60" y="24" width="20" height="80" fill="#1C232B"/><rect x="50" y="24" width="20" height="80" fill="#1C232B"/></g>`;
}

function sBrace(t) {                         // 16.2–23.0: шаг 1 — поза для удара
  const u = t - 16.2, k = ease(prog(u, 1.6, 3.0));
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#cabin)"/><rect x="-300" y="1240" width="1700" height="800" fill="#151B21"/>`;
  for (let i = 0; i < 5; i++) world += `<rect x="${-120 + i * 280}" y="420" width="120" height="150" rx="56" fill="#C98A5E" opacity=".22"/>`;
  world += seatSide(330, 1150, 1.4) + seatSide(820, 1150, 1.4);
  world += asAnya(() => person({ x: 360, y: 1110, s: 1.25, lean: lerp(-5, -62, k), legB: [-80, 0], legF: [-75, 5],
    armB: [lerp(-30, 105, k), lerp(-20, 200, k)], armF: [lerp(-60, 115, k), lerp(-40, 210, k)], look: 0.6, mood: 'scared', pack: false, blink: blinkAt(u, 0.8) }));
  world += `<rect x="290" y="1090" width="150" height="16" rx="8" fill="#E8B83A"/>`;
  const ov = tag(860, 560, 'ГОЛОВА К КРЕСЛУ', { k: prog(u, 3.3, 3.7), size: 28, bg: GOLD, fg: '#1a1a1a', px: 680, py: 900 })
    + tag(250, 520, 'РУКИ НА ЗАТЫЛОК', { k: prog(u, 5.2, 5.6), size: 28, bg: GOLD, fg: '#1a1a1a', px: 520, py: 860 })
    + tag(240, 1420, 'РЕМЕНЬ', { k: prog(u, 0.5, 0.9), size: 26, px: 360, py: 1100 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.1, ease(u / 6.8)), cx: 540, cy: 960, shake: 3 + Math.sin(u * 3) * 1 }) + vign
    + hud('ВЫСОТА 150 М', 'ШАГ 1 · УДАР') + subs(t, SUBS, 1620) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sRows(t) {                          // 23.0–28.0: схема салона сверху, 7 кресел до выхода
  const u = t - 23.0;
  const rows = 12, row0 = 300, dy = 110, seatRow = 9, exitRow = 2;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#141B22"/>
    <rect x="250" y="160" width="580" height="1560" rx="290" fill="#C9D2DA"/><rect x="270" y="190" width="540" height="1500" rx="270" fill="#2B333C"/>`;
  for (let r = 0; r < rows; r++) for (const c of [0, 1, 2, 4, 5, 6]) {
    const x = 300 + c * 70, y = row0 + r * dy;
    const me = r === seatRow && c === 4;
    world += `<rect x="${x}" y="${y}" width="56" height="70" rx="14" fill="${me ? '#5B7BA6' : '#465566'}" stroke="${me ? GOLD : 'none'}" stroke-width="6"/>`;
  }
  for (let i = 1; i <= 7; i++) {
    const r = seatRow - i, k = prog(u, 2.9 + i * 0.18, 3.1 + i * 0.18);
    world += `<g opacity="${f1(k)}"><circle cx="540" cy="${row0 + r * dy + 35}" r="28" fill="${GOLD}"/>
      <text x="540" y="${row0 + r * dy + 47}" text-anchor="middle" font-family="Inter" font-size="34" fill="#1a1a1a">${i}</text></g>`;
  }
  const ke = prog(u, 4.3, 4.6);
  world += `<rect x="200" y="${row0 + exitRow * dy - 40}" width="70" height="120" rx="14" fill="${GREEN}" opacity="${f1(0.3 + 0.7 * ke)}"/>
    <ellipse cx="235" cy="${row0 + exitRow * dy + 20}" rx="140" ry="160" fill="url(#glowG)" opacity="${f1(ke)}"/>`;
  const ov = tag(860, row0 + seatRow * dy + 35, 'АНЯ', { k: prog(u, 0.4, 0.8), size: 30, bg: GOLD, fg: '#1a1a1a', px: 640, py: row0 + seatRow * dy + 35 })
    + tag(860, row0 + exitRow * dy + 20, 'ВЫХОД', { k: ke, size: 30, bg: GREEN, fg: '#0f1a12', px: 270, py: row0 + exitRow * dy + 20 });
  return camera(world + ov, { t, zoom: lerp(1.15, 1.0, ease(u / 2.5)), cx: 540, cy: lerp(1300, 900, ease(u / 4)), shake: 1 }) + vign
    + hud('ПЛАН САЛОНА', 'ШАГ 1 · УДАР') + subs(t, SUBS, 1700) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sExit(t) {                          // 28.0–38.2: удар, темнота, дым, считает спинки
  const u = t - 28.0;
  const walk = prog(u, 4.6, 9.6), ax = lerp(150, 830, walk);
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#151C23"/><rect x="-300" y="1250" width="1700" height="800" fill="#0D1217"/>`;
  for (let i = 0; i < 24; i++) world += `<circle cx="${-200 + i * 70}" cy="1245" r="7" fill="${i % 2 ? '#F2C230' : '#F2A030'}" opacity="${f1(0.6 + 0.4 * Math.sin(u * 3 + i))}"/>`;
  const seats = [240, 420, 600, 780];
  seats.forEach((sx, i) => { world += seatSide(sx, 1160, 1.2, '#2E425E'); });
  world += `<rect x="950" y="640" width="200" height="600" rx="40" fill="#2B333C"/>
    <rect x="975" y="680" width="150" height="520" rx="30" fill="${GREEN}" opacity="${f1(prog(u, 9.5, 9.9) * 0.6)}"/>
    <rect x="955" y="570" width="190" height="56" rx="12" fill="${GREEN}"/><text x="1050" y="610" text-anchor="middle" font-family="Inter" font-size="32" fill="#0f1a12">ВЫХОД</text>`;
  const touch = seats.findIndex(sx => Math.abs(ax - sx) < 60);
  world += asAnya(() => person({ x: ax, y: 1120, s: 1.1, lean: -12, legB: [20 * Math.sin(u * 6), 0], legF: [-20 * Math.sin(u * 6), 0],
    armB: [100, 140], armF: [touch >= 0 ? 130 : 80, touch >= 0 ? 110 : 60], look: 1, mood: 'scared', pack: false,
    extra: `<rect x="-34" y="-110" width="68" height="18" rx="9" fill="${VEST_D}"/>` }));
  for (let i = 0; i < 26; i++) {
    const ph = (u * 0.15 + rnd(i)) % 1;
    world += `<circle cx="${f1(rnd(i + 4) * 1300 - 100 + ph * 120)}" cy="${f1(300 + rnd(i + 8) * 700 - ph * 80)}" r="${f1(90 + rnd(i) * 140)}" fill="#3A4048" opacity="${f1(0.35 * prog(u, 0.5, 2))}"/>`;
  }
  ['5', '6', '7'].forEach((n, i) => { const k = prog(u, 7.7 + i * 0.6, 7.95 + i * 0.6);
    world += tag(seats[i + 1], 820, n, { k, size: 44, bg: GOLD, fg: '#1a1a1a' }); });
  const flash = 1 - prog(u, 0, 0.35);
  return camera(world, { t, zoom: lerp(1.1, 1.0, ease(u / 3)), cx: lerp(500, 640, walk), cy: 960, shake: 30 * flash + 2 }) + vign
    + hud('ПОСЛЕ УДАРА · 00:10', 'ШАГ 2 · ВЫХОД') + subs(t, SUBS, 1620) + fill('#fff', flash * 0.9);
}

function sVest(t) {                          // 38.2–B: жилеты в проходе → вода → прижало к потолку
  const u = t - 38.2;
  const water = ease(prog(u, 5.6, 8.2)) * 0.78, float = ease(prog(u, 7.0, 8.6));
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0E1820"/>` + hullCut(u, water, float, { anya: true });
  const ov = tag(240, 380, 'НАДУВАЮТ В САЛОНЕ', { k: prog(u, 2.2, 2.6), size: 26, bg: RED, fg: '#fff', px: 470, py: 940 })
    + tag(860, 1470, 'АНЯ — НЕ НАДУВАЕТ', { k: prog(u, 3.4, 3.8), size: 26, bg: GREEN, fg: '#0f1a12', px: 870, py: 1000 })
    + tag(540, 330, 'ПРИЖМЁТ К ПОТОЛКУ', { k: prog(u, 7.8, 8.2), size: 30, bg: RED, fg: '#fff', px: 540, py: 520 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.06, u / 9.5), cx: 540, cy: 920, shake: 1.5 + water * 3 }) + vign
    + hud('ПОСЛЕ УДАРА · 00:25', 'ШАГ 3 · ЖИЛЕТ') + subs(t, SUBS, 1640) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sWing(t) {                          // B–50.1: на крыле дёргает шнур
  const u = t - 47.66, k = ease(prog(u, 0.5, 1.4));
  let world = `<rect x="-300" y="-300" width="1700" height="1400" fill="url(#skyDusk)"/>
    <rect x="-300" y="1080" width="1700" height="1400" fill="url(#sea)"/>${seaWaves(1080, u)}
    <path d="M-200 1130 L 1300 1010 L 1300 1080 L -200 1190Z" fill="#B9C4CD"/><path d="M-200 1190 L1300 1080 L1300 1100 L-200 1215Z" fill="#7F8C97"/>`;
  const vest = `<path d="M${f1(-36 - 30 * k)} -120 Q ${f1(-60 - 40 * k)} -60 -30 -30 L 30 -30 Q ${f1(60 + 40 * k)} -60 ${f1(36 + 30 * k)} -120 Q 0 ${f1(-96 - 20 * k)} ${f1(-36 - 30 * k)} -120Z" fill="${VEST}"/>`;
  world += asAnya(() => person({ x: 520, y: 1000, s: 1.3, lean: 3, legB: [12, 0], legF: [-12, 0], armB: [30, lerp(60, 10, k)], armF: [-20, lerp(-60, 0, k)], look: 0.4, mood: 'scared', pack: false, extra: vest }));
  world += `<line x1="${f1(470)}" y1="${f1(880)}" x2="${f1(450)}" y2="${f1(lerp(900, 960, k))}" stroke="#E8483D" stroke-width="5"/>`;
  return camera(world, { t, zoom: lerp(1.1, 1.0, u / 2.5), cx: 540, cy: 900, shake: 2 }) + vign
    + tag(820, 600, 'ТОЛЬКО СНАРУЖИ', { k: prog(u, 0.9, 1.3), size: 30, bg: GREEN, fg: '#0f1a12', px: 600, py: 820 })
    + hud('НА КРЫЛЕ · 00:40', 'ШАГ 3 · ЖИЛЕТ') + subs(t, SUBS, 1620);
}

function sCold(t) {                          // 50.1–62.6: шаг 4 — холодная вода, дыхание
  const u = t - 50.1, wl = 1080 + Math.sin(u * 1.8) * 14;
  let world = `<rect x="-300" y="-300" width="1700" height="1500" fill="url(#skyDusk)"/>`
    + asAnya(() => closeFace(540, 860, 200, { look: Math.sin(u * 1.3) * 0.5, blink: blinkAt(u, 4.1, 8.6), mood: u > 9.4 ? 'calm' : 'scared', vest: true, rot: Math.sin(u * 1.8) * 3 }));
  world += `<path d="M-300 ${f1(wl)} ${[...Array(18).keys()].map(i => `Q ${-260 + i * 100} ${f1(wl - 18)} ${-210 + i * 100} ${f1(wl)}`).join(' ')} L1500 2400 L-300 2400Z" fill="#1F4152" opacity=".93"/>`
    + seaWaves(wl, u, '#7FA6B8', 14);
  const calm = prog(u, 9.6, 11.5);
  let line = '';
  for (let x = -250; x <= 250; x += 5) {
    const fr = lerp(0.18, 0.05, calm), am = lerp(32, 14, calm);
    line += `${x},${f1(70 + Math.sin((x + u * 160) * fr) * am * (0.8 + 0.2 * Math.sin(x * 0.7)))} `;
  }
  const br = card(540, 1400, 600, 210, `<text x="-260" y="44" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ДЫХАНИЕ</text>
    <text x="260" y="44" text-anchor="end" font-family="Inter" font-size="30" fill="${calm > 0.5 ? GREEN : RED}">${calm > 0.5 ? 'СПОКОЙНОЕ' : 'ЧАСТОЕ'}</text>
    <g transform="translate(0 50)"><polyline points="${line}" fill="none" stroke="${calm > 0.5 ? GREEN : RED}" stroke-width="6" stroke-linejoin="round"/></g>`, prog(u, 2.6, 3.0));
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 12.5), cx: 540, cy: 960, shake: 2 }) + vign + br
    + timerCard(Math.min(60, Math.max(0, (u - 2.6) * 6.5)), prog(u, 5.5, 5.9) * (1 - prog(u, 9.4, 9.6)), 1650, 'В ВОДЕ', 60)
    + hud('ВОДА · 00:50', 'ШАГ 4 · ХОЛОДНАЯ ВОДА') + subs(t, SUBS, 360) + fill('#000', 1 - prog(u, 0, 0.2));
}

// вид сверху на плот: 10 голов по кругу
const SEATS = [...Array(10).keys()].map(i => { const a = i / 10 * Math.PI * 2 - Math.PI / 2; return [540 + Math.cos(a) * 250, 900 + Math.sin(a) * 250]; });
function raftTop(u, { count = 0, odd = 0 } = {}) {
  let s = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#sea)"/>${seaWaves(-200, u, '#4F7486', 34)}
    <g transform="rotate(${f1(Math.sin(u * 0.5) * 4)} 540 900)">
    <circle cx="540" cy="900" r="400" fill="#E36A2E"/><circle cx="540" cy="900" r="330" fill="#C9541E"/><circle cx="540" cy="900" r="310" fill="#2C3A45"/>`;
  SEATS.forEach(([x, y], i) => {
    const pal = i === 0 ? ANYA : PAX[i % PAX.length];
    const dry = i === 6;
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="62" fill="${dry ? '#1A1D22' : VEST}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="40" fill="${pal.hair}"/>`;
    if (count > i) s += tag(x, y - 90, String(i + 1), { k: 1, size: 34, bg: i === 9 ? RED : '#fff', fg: i === 9 ? '#fff' : '#1a1a1a' });
    if (dry && odd > 0) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(80 + Math.sin(u * 6) * 6)}" fill="none" stroke="${RED}" stroke-width="7" opacity="${f1(odd)}"/>`;
  });
  return s + '</g>';
}

function sRaft(t) {                          // 62.6–74.2: трап-плот, 9 человек рядом, вертолёт, ждать
  const u = t - 62.6;
  const world = raftTop(u);
  const ov = tag(SEATS[0][0] + 230, SEATS[0][1] - 60, 'АНЯ', { k: prog(u, 0.4, 0.8), size: 30, bg: GOLD, fg: '#1a1a1a', px: SEATS[0][0] + 40, py: SEATS[0][1] })
    + tag(540, 900, '+9', { k: prog(u, 4.0, 4.4) * (1 - prog(u, 7.4, 7.7)), size: 60, bg: GOLD, fg: '#1a1a1a' });
  const heli = card(540, 1470, 640, 150, `<g transform="translate(-230 75)"><rect x="-40" y="-18" width="80" height="36" rx="18" fill="#fff"/><rect x="30" y="-6" width="60" height="10" fill="#fff"/>
    <line x1="${f1(-70 + Math.sin(u * 30) * 10)}" y1="-28" x2="${f1(70 - Math.sin(u * 30) * 10)}" y2="-28" stroke="#fff" stroke-width="6"/></g>
    <text x="-150" y="65" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ВЕРТОЛЁТ</text>
    <text x="-150" y="115" font-family="Inter" font-size="40" fill="${GREEN}">УЖЕ В ПУТИ</text>`, prog(u, 6.1, 6.5));
  const ok = card(540, 1140, 600, 260, ['ПОЗА ДЛЯ УДАРА', 'РЯДЫ ДО ВЫХОДА', 'ЖИЛЕТ СНАРУЖИ'].map((r, i) => { const k = prog(u, 7.8 + i * 0.3, 8.0 + i * 0.3);
    return `<text x="-250" y="${70 + i * 70}" font-family="Inter" font-size="34" fill="#fff">${r}</text>
      <rect x="200" y="${38 + i * 70}" width="44" height="44" rx="10" fill="${k > 0.5 ? GREEN : 'none'}" stroke="${k > 0.5 ? GREEN : '#9FB7C6'}" stroke-width="4"/>
      <path d="M210 ${60 + i * 70} l10 10 l16 -20" fill="none" stroke="#0f1a12" stroke-width="6" stroke-linecap="round" opacity="${f1(k)}"/>`; }).join(''), prog(u, 7.6, 8.0));
  return camera(world + ov, { t, zoom: lerp(1.2, 1.0, ease(u / 3)), cx: 540, cy: 900, shake: 1 }) + vign + heli + ok
    + hud('В ПЛОТУ · 03:10', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 300) + fill('#000', 1 - prog(u, 0, 0.25));
}

function sCount(t) {                         // 74.2–80.9: пересчёт — десять, а выходили девять
  const u = t - 74.2;
  const count = Math.floor(lerp(0, 10.99, prog(u, 0.6, 3.1)));
  const world = raftTop(u + 11.6, { count, odd: prog(u, 5.6, 6.0) });
  const lst = card(540, 1440, 640, 200, `<text x="-280" y="60" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ИЗ ХВОСТА ВЫШЛИ</text>
    <text x="-280" y="150" font-family="Inter" font-size="80" fill="#fff">9</text>
    <text x="40" y="60" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">В ПЛОТУ</text>
    <text x="40" y="150" font-family="Inter" font-size="80" fill="${RED}">10</text>`, prog(u, 4.1, 4.5));
  return camera(world, { t, zoom: lerp(1.0, 1.12, ease(u / 6.7)), cx: 540, cy: 900, shake: 1 }) + vign + lst
    + hud('В ПЛОТУ · 05:00', 'ПЕРЕСЧЁТ', { color: RED }) + subs(t, SUBS, 300);
}

function sDry(t) {                           // 80.9–85.0: напротив — совершенно сухой мужчина
  const u = t - 80.9;
  let world = `<rect x="-300" y="-300" width="1700" height="1500" fill="url(#skyDusk)"/><rect x="-300" y="1120" width="1700" height="1300" fill="url(#sea)"/>${seaWaves(1120, u)}
    <rect x="-100" y="1080" width="1280" height="130" rx="65" fill="#E36A2E"/>`;
  const vest = `<path d="M-36 -116 Q -70 -60 -30 -30 L 30 -30 Q 70 -60 36 -116 Q 0 -100 -36 -116Z" fill="${VEST}"/>`;
  world += asAnya(() => person({ x: 270, y: 1060, s: 1.2, lean: 6, legB: [-80, 0], legF: [-70, 0], armB: [30, 20], armF: [-30, -20], look: 1, mood: 'scared', pack: false, extra: vest, blink: blinkAt(u, 2.5) }));
  for (let i = 0; i < 6; i++) { const ph = (u * 1.4 + rnd(i)) % 1; world += `<ellipse cx="${f1(230 + rnd(i + 2) * 80)}" cy="${f1(820 + ph * 260)}" rx="5" ry="9" fill="#9FD4F0" opacity="${f1(1 - ph)}"/>`; }
  world += withPal({ jacket: '#1A1D22', jacketD: '#121418', pants: '#1A1D22', pantsD: '#121418', glove: SKIN, hair: '#111' },
    () => person({ x: 810, y: 1060, s: 1.2, lean: -4, legB: [80, 0], legF: [70, 0], armB: [-20, -10], armF: [20, 10], look: -1, mood: 'calm', pack: false }));
  const k = prog(u, 1.8, 2.3);
  world += `<ellipse cx="810" cy="900" rx="220" ry="320" fill="url(#glowR)" opacity="${f1(k * 0.3)}"/>`;
  const ov = tag(270, 600, 'МОКРАЯ', { k: prog(u, 0.3, 0.7), size: 28, bg: '#7FB6E6', fg: '#0f1a26', px: 270, py: 760 })
    + tag(810, 600, 'СУХОЙ', { k, size: 34, bg: RED, fg: '#fff', px: 810, py: 760 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.25, ease(u / 4.1)), cx: lerp(540, 760, ease(prog(u, 1.6, 4))), cy: lerp(900, 880, u / 4), shake: 1.2 })
    + vign + hud('В ПЛОТУ · 05:20', 'КТО ЭТО?', { color: RED }) + subs(t, SUBS, 300) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sEnd(t) {
  const u = t - 85.0, k = eout(prog(u, 0.1, 0.5));
  return fill('#05080B') + `<g opacity="${f1(k)}" transform="translate(0 ${f1((1 - k) * 30)})">
    <text x="540" y="820" text-anchor="middle" font-family="Mono" font-size="34" letter-spacing="14" fill="${GOLD}">ЧАСТЬ 2</text>
    <text x="540" y="960" text-anchor="middle" font-family="Inter" font-size="120" fill="#fff">КТО</text>
    <text x="540" y="1090" text-anchor="middle" font-family="Inter" font-size="120" fill="${RED}">ДЕСЯТЫЙ?</text>
    <text x="540" y="1190" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="6" fill="#9FB7C6" opacity=".7">САМОЛЁТ · ПРОДОЛЖЕНИЕ СЛЕДУЕТ</text></g>`;
}

const SCENES = [[0, sHook], [3.9, sPinned], [6.4, sAnya], [9.2, sEngines], [16.2, sBrace], [23.0, sRows], [28.0, sExit],
  [38.2, sVest], [47.66, sWing], [50.1, sCold], [62.6, sRaft], [74.2, sCount], [80.9, sDry], [85.0, sEnd]];

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
