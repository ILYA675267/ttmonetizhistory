// @common — «Утром не взошло солнце», часть 1. Время — по шкале голоса (work/solnce/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе): ролик замирает на «под землю», 7,2 с баннер, потом с того же места.
const B = 40.77, AD = 7.2, STORY = 81.9;
const DUR = STORY + AD;

const SUBS = makeSubs([
  [0.2, 'ЕСЛИ УТРОМ НЕ ВЗОШЛО СОЛНЦЕ,', { 'СОЛНЦЕ,': GOLD }], [2.2, 'НЕ ЖДИТЕ, ЧТО ОНО ПОЯВИТСЯ.'],
  [4.2, 'ЧЕРЕЗ НЕДЕЛЮ НА УЛИЦЕ БУДЕТ МИНУС 20,', { 'МИНУС': RED, '20,': RED }], [7.0, 'А ЧЕРЕЗ ГОД — МИНУС 70.', { 'МИНУС': RED, '70.': RED }],
  [9.4, 'У МАКСИМА ЕСТЬ 7 ДНЕЙ.', { '7': GOLD, 'ДНЕЙ.': GOLD }],
  [12.5, 'ВОСЕМЬ УТРА, А ЗА ОКНОМ НОЧЬ.', { 'НОЧЬ.': RED }], [14.9, 'ЗВЁЗДЫ ЕСТЬ,'], [15.9, 'А ЛУНЫ НЕТ:', { 'НЕТ:': RED }], [17.0, 'ЕЁ ОСВЕЩАЛО СОЛНЦЕ.'],
  [18.5, 'ШАГ ПЕРВЫЙ: ТЕПЛО.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }], [20.4, 'ЗЕМЛЯ ОСТЫВАЕТ, И КАЖДЫЙ ДЕНЬ ХОЛОДНЕЕ ПРЕДЫДУЩЕГО.', { 'ОСТЫВАЕТ,': RED }],
  [24.7, 'ШАГ ВТОРОЙ: ВОДА.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [26.5, 'ТРУБЫ ЗАМЁРЗНУТ ПЕРВЫМИ.', { 'ЗАМЁРЗНУТ': RED }],
  [28.3, 'МАКСИМ НАБИРАЕТ ВОДУ ВО ВСЕ ЁМКОСТИ И УКУТЫВАЕТ ЕЁ ОДЕЯЛАМИ.', { 'ОДЕЯЛАМИ.': GREEN }],
  [32.9, 'НА ТРЕТИЙ ДЕНЬ НА УЛИЦЕ МИНУС ДЕСЯТЬ,', { 'МИНУС': RED, 'ДЕСЯТЬ,': RED }], [36.0, 'И ПТИЦЫ ЗАМЕРЗАЮТ ПРЯМО НА ВЕТКАХ.'],
  [39.0, 'ШАГ ТРЕТИЙ: ПОД ЗЕМЛЮ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [40.9, 'ЗЕМЛЯ НА ГЛУБИНЕ ДЕРЖИТ ТЕПЛО ГОДАМИ.', { 'ТЕПЛО': GREEN }],
  [43.6, 'МАКСИМ С СЕМЬЁЙ ПЕРЕЕЗЖАЕТ В ПОДВАЛ.'], [46.0, 'ТАМ ВСЁ ЕЩЁ ПЛЮС ДЕСЯТЬ.', { 'ПЛЮС': GREEN, 'ДЕСЯТЬ.': GREEN }],
  [48.1, 'ШАГ ЧЕТВЁРТЫЙ: ЕДА.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }], [50.3, 'БЕЗ СВЕТА РАСТЕНИЯ ПОГИБНУТ ЗА ПАРУ НЕДЕЛЬ.', { 'ПОГИБНУТ': RED }],
  [53.4, 'КОНСЕРВЫ И КРУПЫ — ВСЁ, ЧТО ХРАНИТСЯ ГОДАМИ.', { 'ГОДАМИ.': GREEN }],
  [56.7, 'ШАГ ПЯТЫЙ: ОГОНЬ.', { 'ШАГ': GOLD, 'ПЯТЫЙ:': GOLD }], [58.8, 'ПЕЧКУ И ГЕНЕРАТОР ТОЛЬКО С ВЫХОДОМ НА УЛИЦУ,'], [62.1, 'ИНАЧЕ — УГАРНЫЙ ГАЗ.', { 'УГАРНЫЙ': RED, 'ГАЗ.': RED }],
  [64.4, 'ТЕПЛО ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [65.3, 'ВОДА ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [66.2, 'ЕДЫ НА ПОЛГОДА.', { 'ПОЛГОДА.': GREEN }],
  [67.8, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [69.5, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [71.4, 'ВОСЬМОЙ ДЕНЬ.', { 'ВОСЬМОЙ': GOLD }], [72.4, 'НЕБО НА ГОРИЗОНТЕ РОЗОВЕЕТ.'],
  [74.5, 'НАД ГОРОДОМ МЕДЛЕННО ВСТАЁТ СОЛНЦЕ.', { 'СОЛНЦЕ.': GOLD }], [77.1, 'ТОЛЬКО ВСТАЁТ ОНО НА ЗАПАДЕ.', { 'ЗАПАДЕ.': RED }],
], 79.2);

const MAXIM = { jacket: '#4A6E5A', jacketD: '#3A5848', pants: '#2B3340', pantsD: '#222936', hair: '#5A3A2A', hairShort: true };
const asMaxim = fn => withPal({ ...MAXIM, glove: SKIN }, fn);

function skyline(y0, c = '#0A0E16') {
  let s = '';
  for (let i = 0; i < 16; i++) { const w = 60 + rnd(i) * 80, h = 140 + rnd(i + 4) * 380, x = -200 + i * 95;
    s += `<rect x="${f1(x)}" y="${f1(y0 - h)}" width="${f1(w)}" height="${f1(h + 400)}" fill="${c}"/>`; }
  return s;
}
function stars(n = 70, op = 1) {
  let s = '';
  for (let i = 0; i < n; i++) s += `<circle cx="${f1(rnd(i) * 1300 - 100)}" cy="${f1(rnd(i + 3) * 1000 - 100)}" r="${f1(1.5 + rnd(i + 1) * 2.5)}" fill="#fff" opacity="${f1(op * (0.3 + 0.6 * rnd(i + 7)))}"/>`;
  return s;
}
function thermo(x, y, val, k, label) {
  return card(x, y, 380, 170, `<text y="56" text-anchor="middle" font-family="Mono" font-size="22" letter-spacing="4" fill="#9FB7C6">${label}</text>
    <text y="132" text-anchor="middle" font-family="Inter" font-size="64" fill="${val > 0 ? GREEN : RED}">${val > 0 ? '+' : ''}${val}°</text>`, k);
}

function sHook(t) {                          // 0–12.4: утро, а солнца нет; −20 через неделю, −70 через год; 7 дней
  const u = t;
  const hh = u < 6 ? '07:' + String(Math.floor(lerp(0, 59, u / 6))).padStart(2, '0') : '08:00';
  const world = `<rect x="-400" y="-400" width="2000" height="2800" fill="url(#skyN)"/>${stars(90)}${skyline(1400)}<rect x="-400" y="1400" width="2000" height="1000" fill="#05070B"/>`;
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 12.4), cx: 540, cy: 1000, shake: 0.4 }) + vign
    + bigCard(560, 'РАССВЕТ ДОЛЖЕН БЫЛ БЫТЬ В', '06:58', GOLD, prog(u, 0.3, 0.7) * (1 - prog(u, 3.9, 4.2)), 600)
    + thermo(300, 560, -20, prog(u, 4.2, 4.6), 'ЧЕРЕЗ НЕДЕЛЮ') + thermo(780, 560, -70, prog(u, 7.0, 7.4), 'ЧЕРЕЗ ГОД')
    + bigCard(1250, 'У МАКСИМА', '7 ДНЕЙ', GOLD, prog(u, 9.4, 9.8), 400)
    + hud(`${hh} · ГОРОД`, 'СОЛНЦЕ: НЕТ', { color: RED, k: eout(prog(u, 0.1, 0.5)) }) + subs(t, SUBS, 1760);
}

function sWindow(t) {                        // 12.4–18.4: 8 утра — ночь; звёзды есть, луны нет
  const u = t - 12.4;
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#2A2622"/>
    <rect x="160" y="300" width="760" height="1100" fill="#0A0F1A"/>${[...Array(60).keys()].map(i => `<circle cx="${f1(180 + rnd(i) * 720)}" cy="${f1(320 + rnd(i + 3) * 1060)}" r="${f1(1.5 + rnd(i + 1) * 2.5)}" fill="#fff" opacity="${f1(0.3 + 0.6 * rnd(i + 7))}"/>`).join('')}
    <circle cx="700" cy="560" r="90" fill="none" stroke="#9FB7C6" stroke-width="5" stroke-dasharray="14 12" opacity="${f1(prog(u, 3.5, 3.9))}"/>
    <rect x="530" y="300" width="20" height="1100" fill="#3A3028"/><rect x="160" y="840" width="760" height="20" fill="#3A3028"/>
    <rect x="140" y="280" width="800" height="1140" fill="none" stroke="#4A3C30" stroke-width="30"/>`;
  world += asMaxim(() => `<g transform="translate(300 1700) scale(1.1)">${person({ x: 0, y: -100, legB: [8, 0], legF: [-8, 0], armB: [20, 10], armF: [-20, -10], look: 0.6, mood: 'scared', pack: false })}</g>`);
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 6), cx: 540, cy: 950, shake: 0.5 }) + vign
    + tag(700, 720, 'ЛУНЫ НЕТ', { k: prog(u, 3.6, 4.0), size: 28, bg: RED, fg: '#fff' })
    + hud('08:00 · КВАРТИРА', 'ЗА ОКНОМ НОЧЬ', { color: RED }) + subs(t, SUBS, 1740) + fadeIn(u);
}

function sGlobe(t) {                         // 18.4–24.6: шаг 1 — Земля остывает (тепло уходит в космос)
  const u = t - 18.4;
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#03050A"/>${stars(120, 0.8)}
    <circle cx="540" cy="900" r="330" fill="#1E3A5A"/><path d="M380 700 q 60 -40 120 10 q 60 60 20 120 q -80 40 -150 -20Z M600 900 q 80 -20 120 40 q 0 80 -80 100 q -60 -40 -40 -140Z" fill="#2E4A3A"/>
    <circle cx="540" cy="900" r="330" fill="#fff" opacity="${f1(0.05 + prog(u, 2, 6) * 0.25)}"/>`;
  for (let i = 0; i < 12; i++) { const a = i / 12 * 360, ph = (u * 0.5 + rnd(i)) % 1, d = dir(a);
    world += `<path d="M${f1(540 + d[0] * (350 + ph * 260))} ${f1(900 + d[1] * (350 + ph * 260))} l ${f1(d[0] * 40 + d[1] * 14)} ${f1(d[1] * 40 - d[0] * 14)} l ${f1(d[0] * 40 - d[1] * 14)} ${f1(d[1] * 40 + d[0] * 14)}" fill="none" stroke="${RED}" stroke-width="7" opacity="${f1((1 - ph) * prog(u, 1.8, 2.4))}"/>`; }
  const tmp = Math.round(lerp(8, -14, prog(u, 2, 6)));
  return camera(world, { t, zoom: lerp(0.9, 1.0, ease(u / 6)), cx: 540, cy: 920, shake: 0.3 }) + vign
    + thermo(540, 1450, tmp, prog(u, 2.0, 2.4), 'СРЕДНЯЯ ТЕМПЕРАТУРА')
    + hud('ДЕНЬ 1 · КОСМОС', 'ШАГ 1 · ТЕПЛО') + subs(t, SUBS, 1760) + fadeIn(u);
}

function sWater(t) {                         // 24.6–32.8: трубы замёрзнут; вода в ёмкостях под одеялами
  const u = t - 24.6, ice = prog(u, 1.8, 3.6);
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#2E3A44"/><rect x="-400" y="1350" width="2000" height="1000" fill="#22282E"/>
    <rect x="-400" y="520" width="2000" height="70" fill="#9AA6B0"/><rect x="-400" y="520" width="2000" height="70" fill="#DDF0FA" opacity="${f1(ice * 0.8)}"/>`;
  for (let i = 0; i < 18; i++) world += `<path d="M${f1(rnd(i) * 1300 - 100)} 590 l 8 ${f1(30 + rnd(i + 3) * 60)} l 8 ${f1(-30 - rnd(i + 3) * 60)}" fill="#DDF0FA" opacity="${f1(ice)}"/>`;
  world += `<path d="M560 520 l -20 30 l 30 10 l -20 30" stroke="#1a1a1a" stroke-width="5" fill="none" opacity="${f1(prog(u, 3.0, 3.4))}"/>`;
  const wrap = prog(u, 5.6, 6.4);
  for (let i = 0; i < 4; i++) { const x = 220 + i * 210;
    world += `<rect x="${x - 70}" y="1110" width="140" height="240" rx="20" fill="#7FC4E6" opacity=".85"/><rect x="${x - 76}" y="${f1(1350 - 260 * wrap)}" width="152" height="${f1(260 * wrap)}" rx="24" fill="${['#8C5A44', '#5E7D5A', '#7A6A9E', '#A86E52'][i]}"/>`; }
  return camera(world, { t, zoom: lerp(1.0, 1.05, u / 8.2), cx: 540, cy: 960, shake: 0.4 }) + vign
    + tag(860, 380, 'ЛЁД В ТРУБЕ', { k: prog(u, 2.0, 2.4), size: 28, bg: RED, fg: '#fff', px: 600, py: 540 })
    + tag(540, 920, 'ВОДА ПОД ОДЕЯЛАМИ', { k: prog(u, 6.0, 6.4), size: 28, bg: GREEN, fg: '#0f1a12' })
    + hud('ДЕНЬ 2', 'ШАГ 2 · ВОДА') + subs(t, SUBS, 1740) + fadeIn(u);
}

function sBirds(t) {                         // 32.8–38.9: день 3, −10, птицы замерзают на ветках
  const u = t - 32.8;
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="url(#skyN)"/>${stars(60, 0.7)}<rect x="-400" y="1500" width="2000" height="900" fill="#C9D6DF"/>
    <path d="M540 1520 L 520 900 M530 1100 L 300 860 M524 980 L 760 760 M520 1200 L 820 1080 M528 900 L 420 700" stroke="#1E1A16" stroke-width="26" stroke-linecap="round"/>`;
  for (let i = 0; i < 40; i++) world += `<circle cx="${f1(280 + rnd(i) * 560)}" cy="${f1(700 + rnd(i + 3) * 500)}" r="4" fill="#DDF0FA" opacity=".8"/>`;
  for (const [x, y] of [[360, 870], [690, 790], [760, 1070], [450, 720]]) world += `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="-22" rx="30" ry="22" fill="#2A2E34"/><circle cx="24" cy="-40" r="14" fill="#2A2E34"/>
    <path d="M36 -40 l 14 4 l -14 4Z" fill="#C9A23A"/><ellipse cx="0" cy="-30" rx="30" ry="10" fill="#DDF0FA" opacity=".7"/></g>`;
  return camera(world, { t, zoom: lerp(1.0, 1.1, u / 6.1), cx: 540, cy: 950, shake: 0.3 }) + vign
    + thermo(540, 1620, -10, prog(u, 0.6, 1.0), 'НА УЛИЦЕ · ДЕНЬ 3')
    + hud('ДЕНЬ 3 · 12:00', 'ТЕМНО', { color: RED }) + subs(t, SUBS, 390) + fadeIn(u);
}

function sCellar(t) {                        // 38.9–48.0: шаг 3 — под землю; в подвале +10
  const u = t - 38.9, mv = ease(prog(u, 4.8, 6.6));
  let world = `<rect x="-400" y="-400" width="2000" height="1300" fill="url(#skyN)"/>${stars(40, 0.6)}
    <rect x="-400" y="900" width="2000" height="1500" fill="#4A3A2C"/><rect x="-400" y="1250" width="2000" height="1200" fill="#3A2C20"/><rect x="-400" y="1600" width="2000" height="900" fill="#2C2018"/>
    <rect x="300" y="560" width="480" height="340" fill="#6E5A46"/><polygon points="260,580 540,400 820,580" fill="#3A2420"/>
    <rect x="320" y="1100" width="440" height="300" fill="#1E1812"/><ellipse cx="540" cy="1250" rx="260" ry="160" fill="url(#lamp)" opacity="${f1(0.4 + 0.6 * mv)}"/>
    <rect x="740" y="900" width="40" height="200" fill="#1E1812"/>`;
  for (let i = 0; i < 3; i++) world += `<circle cx="${f1(lerp(440 + i * 70, 460 + i * 60, mv))}" cy="${f1(lerp(860, 1360, mv))}" r="${i === 2 ? 20 : 26}" fill="${['#4A6E5A', '#A86E52', '#E3C04A'][i]}" stroke="#fff" stroke-width="4"/>`;
  const ov = tag(170, 820, '−10°', { k: prog(u, 2.0, 2.4), size: 30, bg: RED, fg: '#fff' })
    + tag(170, 1300, '+10°', { k: prog(u, 2.4, 2.8), size: 30, bg: GREEN, fg: '#0f1a12' })
    + tag(900, 1300, 'ПОДВАЛ', { k: prog(u, 4.8, 5.2), size: 28, bg: GOLD, fg: '#1a1a1a', px: 760, py: 1250 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.08, u / 9.1), cx: 540, cy: 1050, shake: 0.3 }) + vign
    + hud('ДЕНЬ 4 · РАЗРЕЗ', 'ШАГ 3 · ПОД ЗЕМЛЮ') + subs(t, SUBS, 1760) + fadeIn(u);
}

function sFood(t) {                          // 48.0–56.6: растения погибнут, консервы и крупы
  const u = t - 48.0, dead = prog(u, 2.4, 5.0);
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#1E1812"/><ellipse cx="540" cy="700" rx="600" ry="500" fill="url(#lamp)" opacity=".5"/>
    <rect x="140" y="760" width="300" height="40" fill="#6B4E3A"/><path d="M290 760 Q 290 600 ${f1(lerp(240, 200, dead))} ${f1(lerp(480, 620, dead))} M290 700 Q 330 620 ${f1(lerp(400, 380, dead))} ${f1(lerp(560, 700, dead))}" fill="none" stroke="${dead > 0.5 ? '#6B5A3A' : '#3E7A4A'}" stroke-width="14" stroke-linecap="round"/>
    <rect x="200" y="800" width="180" height="140" rx="16" fill="#8C5A44"/>`;
  for (let r = 0; r < 3; r++) { world += `<rect x="560" y="${700 + r * 200}" width="420" height="20" fill="#8A8F96"/>`;
    for (let i = 0; i < 4; i++) world += `<rect x="${580 + i * 100}" y="${590 + r * 200}" width="80" height="110" rx="12" fill="#9AA6B0" opacity="${f1(prog(u, 5.4 + (r * 4 + i) * 0.08, 5.6 + (r * 4 + i) * 0.08))}"/><rect x="${580 + i * 100}" y="${620 + r * 200}" width="80" height="40" fill="${['#C9483B', '#3E7CB1', '#E3C04A', '#5E9E4A'][(r + i) % 4]}" opacity="${f1(prog(u, 5.4 + (r * 4 + i) * 0.08, 5.6 + (r * 4 + i) * 0.08))}"/>`; }
  return camera(world, { t, zoom: lerp(1.0, 1.05, u / 8.6), cx: 540, cy: 900, shake: 0.3 }) + vign
    + tag(290, 1060, 'РАСТЕНИЯ ГИБНУТ', { k: prog(u, 2.6, 3.0), size: 26, bg: RED, fg: '#fff' })
    + tag(770, 1360, 'ХРАНЯТСЯ ГОДАМИ', { k: prog(u, 5.6, 6.0), size: 26, bg: GREEN, fg: '#0f1a12' })
    + hud('ДЕНЬ 5 · ПОДВАЛ', 'ШАГ 4 · ЕДА') + subs(t, SUBS, 1700) + fadeIn(u);
}

function sFire(t) {                          // 56.6–64.3: печка и генератор — только с выходом на улицу
  const u = t - 56.6;
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#1E1812"/><rect x="-400" y="1300" width="2000" height="1000" fill="#2C2018"/>
    <rect x="-400" y="200" width="2000" height="80" fill="#3A2C20"/>
    <rect x="200" y="1000" width="260" height="300" rx="20" fill="#3A3F46"/><rect x="240" y="1080" width="180" height="120" rx="10" fill="#F2A030"/>
    <rect x="300" y="280" width="60" height="720" fill="#5B6876"/><path d="M330 280 L330 120" stroke="#5B6876" stroke-width="60"/>`;
  for (let j = 0; j < 4; j++) { const ph = (u * 0.5 + j / 4) % 1; world += `<circle cx="${f1(330 + ph * 60)}" cy="${f1(80 - ph * 200)}" r="${f1(20 + ph * 40)}" fill="#8A8F96" opacity="${f1(0.5 * (1 - ph))}"/>`; }
  world += `<g transform="translate(780 1200)"><rect x="-130" y="-90" width="260" height="180" rx="24" fill="${RED}"/><rect x="-100" y="-60" width="120" height="80" rx="10" fill="#1C232B"/></g>`;
  const xk = prog(u, 3.4, 3.8);
  world += `<g opacity="${f1(xk)}"><line x1="620" y1="1040" x2="940" y2="1360" stroke="${RED}" stroke-width="16" stroke-linecap="round"/><line x1="940" y1="1040" x2="620" y2="1360" stroke="${RED}" stroke-width="16" stroke-linecap="round"/></g>`;
  return camera(world, { t, zoom: lerp(1.0, 1.04, u / 7.7), cx: 540, cy: 900, shake: 0.3 }) + vign
    + tag(520, 520, 'ТРУБА НАРУЖУ', { k: prog(u, 2.2, 2.6), size: 26, bg: GREEN, fg: '#0f1a12', px: 360, py: 500 })
    + tag(780, 920, 'ГЕНЕРАТОР ВНУТРИ', { k: prog(u, 3.6, 4.0), size: 26, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 6 · ПОДВАЛ', 'ШАГ 5 · ОГОНЬ') + subs(t, SUBS, 1700) + fadeIn(u);
}

function sWait(t) {                          // 64.3–71.3: протокол в подвале
  const u = t - 64.3;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#1E1812"/><ellipse cx="540" cy="900" rx="520" ry="520" fill="url(#lamp)" opacity=".7"/>`
    + asMaxim(() => closeFace(540, 860, 175, { look: Math.sin(u) * 0.4, blink: blinkAt(u, 1.4, 4.4), mood: 'calm' }));
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 7), shake: 0.4 }) + vign
    + checklist(['ТЕПЛО', 'ВОДА', 'ЕДА НА ПОЛГОДА', 'ОГОНЬ БЕЗ ДЫМА'], u, [0.1, 1.0, 1.9, 3.5], 1160)
    + hud('ДЕНЬ 7', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 380) + fadeIn(u);
}

function sTwist(t) {                         // 71.3–79.3: день 8 — солнце встаёт на западе
  const u = t - 71.3, rise = ease(prog(u, 3.0, 7.6));
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="url(#skyN)"/>${stars(70, 1 - rise)}
    <ellipse cx="200" cy="1400" rx="${f1(700 + rise * 400)}" ry="${f1(300 + rise * 300)}" fill="#E8836A" opacity="${f1(prog(u, 1.0, 3.0) * 0.6)}"/>
    <circle cx="200" cy="${f1(lerp(1500, 860, rise))}" r="160" fill="#FFD27A" opacity="${f1(prog(u, 3.0, 3.6))}"/>
    <circle cx="200" cy="${f1(lerp(1500, 860, rise))}" r="320" fill="url(#glowW)" opacity="${f1(prog(u, 3.0, 3.6) * 0.8)}"/>
    ${skyline(1420)}<rect x="-400" y="1420" width="2000" height="1000" fill="#05070B"/>`;
  const comp = card(540, 1600, 760, 150, ['З', 'С', 'В', 'Ю'].map((c, i) => `<text x="${-270 + i * 180}" y="100" text-anchor="middle" font-family="Inter" font-size="60" fill="${c === 'З' ? RED : '#5B6876'}">${c}</text>`).join(''), prog(u, 5.6, 6.0));
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 8), cx: 500, cy: 1100, shake: 0.3 }) + vign + comp
    + tag(260, 900, 'ЗАПАД', { k: prog(u, 5.8, 6.2), size: 32, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 8 · 06:58', 'СОЛНЦЕ?', { color: GOLD }) + subs(t, SUBS, 390) + fadeIn(u);
}

const render = makeRender([[0, sHook], [12.4, sWindow], [18.4, sGlobe], [24.6, sWater], [32.8, sBirds], [38.9, sCellar], [48.0, sFood],
  [56.6, sFire], [64.3, sWait], [71.3, sTwist], [79.3, t => endScreen(t, 79.3, ['ЧТО ЭТО', 'ЗА СОЛНЦЕ?'], 'СОЛНЦЕ')]], B, AD, '');
