// @common — «Метеорит: 90 минут до удара», часть 1. Время — по шкале голоса (work/meteorit/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе): ролик замирает на «08:59», 7,2 с баннер, потом с того же места.
const B = 42.57, AD = 7.2, STORY = 85.3;
const DUR = STORY + AD;

const SUBS = makeSubs([
  [0.2, 'ЕСЛИ ДО ПАДЕНИЯ МЕТЕОРИТА ОСТАЛОСЬ 90 МИНУТ,', { '90': RED, 'МИНУТ,': RED }], [3.3, 'НЕ САДИТЕСЬ В МАШИНУ.', { 'МАШИНУ.': RED }],
  [5.0, 'ЧЕРЕЗ 20 МИНУТ ВСЕ ДОРОГИ ВСТАНУТ.'], [7.9, 'ОЛЕГ УЗНАЁТ ОБ ЭТОМ ИЗ СООБЩЕНИЯ МЧС.', { 'МЧС.': GOLD }],
  [11.0, 'УДАР В 40 КИЛОМЕТРАХ ОТ ГОРОДА,', { '40': RED }], [13.1, 'РОВНО В 9 УТРА.', { '9': GOLD }],
  [14.7, 'ШАГ ПЕРВЫЙ: ПОНЯТЬ, ГДЕ ВЫ.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }], [17.1, 'ОПАСНЕЕ САМОГО КАМНЯ — УДАРНАЯ ВОЛНА.', { 'УДАРНАЯ': RED, 'ВОЛНА.': RED }],
  [20.2, 'ОНА ВЫБИВАЕТ СТЁКЛА НА ДЕСЯТКИ КИЛОМЕТРОВ.'],
  [23.5, 'ШАГ ВТОРОЙ: ОКНА.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [25.4, 'В ЧЕЛЯБИНСКЕ БОЛЬШЕ ТЫСЯЧИ ЧЕЛОВЕК ПОРАНИЛИСЬ СТЁКЛАМИ,', { 'СТЁКЛАМИ,': RED }],
  [28.9, 'ПОТОМУ ЧТО ПОДОШЛИ ПОСМОТРЕТЬ НА ВСПЫШКУ.'], [31.9, 'ОЛЕГ УВОДИТ СЕМЬЮ В ВАННУЮ.', { 'ВАННУЮ.': GREEN }],
  [35.0, 'ШАГ ТРЕТИЙ: ЗАПАСЫ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [37.0, 'ОЛЕГ НАБИРАЕТ ВОДУ,'], [38.4, 'ЗАРЯЖАЕТ ТЕЛЕФОНЫ И БЕРЁТ АПТЕЧКУ.'],
  [41.0, '08:59.', { '08:59.': RED }], [43.0, 'НЕБО ЗА ШТОРАМИ СТАНОВИТСЯ БЕЛЫМ.', { 'БЕЛЫМ.': RED }],
  [45.7, 'ШАГ ЧЕТВЁРТЫЙ: ПОЗА.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }], [47.6, 'ЛЕЧЬ НА ПОЛ.'], [48.6, 'ЗАКРЫТЬ ГОЛОВУ РУКАМИ.'],
  [50.0, 'РОТ ПРИОТКРЫТЬ,'], [51.1, 'ЧТОБЫ ВОЛНА НЕ УДАРИЛА ПО УШАМ.'], [53.2, 'УДАР.', { 'УДАР.': RED }], [54.0, 'ДОМ ВЗДРАГИВАЕТ.'],
  [55.4, 'ПО ВСЕМУ КВАРТАЛУ ВЫЛЕТАЮТ СТЁКЛА.', { 'СТЁКЛА.': RED }],
  [58.5, 'ШАГ ПЯТЫЙ: НЕ ВЫХОДИТЬ.', { 'ШАГ': GOLD, 'ПЯТЫЙ:': GOLD }], [60.7, 'ЕЩЁ ДОЛГО С КРЫШ И БАЛКОНОВ СЫПЛЮТСЯ ОСКОЛКИ.', { 'ОСКОЛКИ.': RED }],
  [64.4, 'СОСЕДИ, КОТОРЫЕ СНИМАЛИ В ОКНА, КРИЧАТ НА ЛЕСТНИЦЕ.'], [68.0, 'А У ОЛЕГА ВСЕ ЖИВЫ.', { 'ЖИВЫ.': GREEN }],
  [70.2, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [72.7, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [74.7, 'ТЕЛЕФОН СНОВА ВИБРИРУЕТ.'], [76.5, 'НОВОЕ СООБЩЕНИЕ МЧС.', { 'МЧС.': GOLD }],
  [78.2, '«ЭТО БЫЛ НЕ ОН.»', { '«ЭТО': RED, 'БЫЛ': RED, 'НЕ': RED, 'ОН.»': RED }],
  [79.6, '«ГЛАВНЫЙ ОБЛОМОК УПАДЁТ ЧЕРЕЗ 90 МИНУТ.»', { '90': RED, 'МИНУТ.»': RED }],
], 83.1);

const OLEG = { jacket: '#7A4E3A', jacketD: '#60402F', pants: '#2B3340', pantsD: '#222936', hair: '#2A1E18', hairShort: true };
const WIFE = { jacket: '#5E7D5A', jacketD: '#4A6447', pants: '#2B3340', pantsD: '#222936', hair: '#6B4A2E', hairShort: false };
const asOleg = fn => withPal({ ...OLEG, glove: SKIN }, fn);
const asWife = fn => withPal({ ...WIFE, glove: SKIN }, fn);

function alertScreen(u, title, lines, k = 1) {
  return `<text x="215" y="110" text-anchor="middle" font-family="Inter" font-size="80" fill="#fff">07:30</text>
    <g opacity="${f1(k)}"><rect x="24" y="170" width="382" height="${120 + lines.length * 46}" rx="26" fill="${RED}"/>
    <text x="215" y="226" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="3" fill="#fff">⚠ ${title}</text>
    ${lines.map((l, i) => `<text x="215" y="${280 + i * 46}" text-anchor="middle" font-family="Inter" font-size="34" fill="#fff">${l}</text>`).join('')}</g>`;
}
const timerTxt = s => { s = Math.max(0, s); return `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor(s % 3600 / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`; };

function sHook(t) {                          // 0–4.9: экстренное сообщение, 90 минут; 4.9–7.8: пробка сверху
  const u = t;
  if (u < 4.9) {
    const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0D141C"/>`
      + phone(540, 800, 0.9, -4 + Math.sin(u * 30) * (u < 0.6 ? 2 : 0), alertScreen(u, 'МЧС · ЭКСТРЕННО', ['ПАДЕНИЕ МЕТЕОРИТА', 'УДАР В 09:00', 'НЕ ПОДХОДИТЕ К ОКНАМ'], prog(u, 0.1, 0.4)));
    return camera(world, { t, zoom: lerp(1.15, 1.0, ease(u / 3)), shake: 1.5 }) + vign
      + bigCard(1640, 'ДО УДАРА', timerTxt(5400 - u), RED, prog(u, 0.6, 1.0), 520)
      + hud('07:30 · ГОРОД', 'МЕТЕОРИТ', { color: RED, k: eout(prog(u, 0.1, 0.5)) }) + subs(t, SUBS, 1360);
  }
  const v = u - 4.9;
  let world = `<rect x="-400" y="-400" width="1900" height="2700" fill="#4A4E55"/>`;
  for (const x of [-200, 1060]) world += `<rect x="${x - 200}" y="-400" width="400" height="2700" fill="#8C8475"/>`;
  for (let lane = 0; lane < 4; lane++) for (let i = 0; i < 12; i++) world += carTop(260 + lane * 180, -200 + i * 210 + (lane % 2) * 60, 0, PAXC[(lane * 3 + i) % 5]);
  for (let i = 0; i < 4; i++) world += `<rect x="${348 + i * 180}" y="-400" width="8" height="2700" fill="#E6E1D3" opacity=".4"/>`;
  return camera(world, { t, zoom: lerp(1.25, 1.0, ease(v / 2.9)), cx: 540, cy: 960, shake: 0.6 }) + vign
    + tag(540, 520, 'ПРОБКА · 20 МИН', { k: prog(v, 0.3, 0.7), size: 32, bg: RED, fg: '#fff' })
    + hud('07:50 · ВЫЕЗД ИЗ ГОРОДА', 'ВСЕ ДОРОГИ', { color: RED }) + subs(t, SUBS, 1650) + fadeIn(v, 0.15);
}
const PAXC = ['#C9483B', '#3E7CB1', '#E3C04A', '#5E7D5A', '#D9D9D9'];

function sAlert(t) {                         // 7.8–14.6: Олег читает сообщение МЧС
  const u = t - 7.8;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#room)"/><ellipse cx="540" cy="820" rx="420" ry="420" fill="#7FB6E6" opacity=".12"/>`
    + asOleg(() => closeFace(540, 860, 200, { look: lerp(0.4, -0.2, ease(u / 3)), blink: blinkAt(u, 2.4, 5.6), mood: 'scared' }));
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 6.8), shake: 1.2 }) + vign
    + bigCard(1440, 'МЧС · ТОЧКА УДАРА', '40 КМ · 09:00', RED, prog(u, 3.2, 3.6), 640)
    + tag(850, 1150, 'ОЛЕГ, 38', { k: prog(u, 0.3, 0.7), size: 30, px: 720, py: 1040 })
    + timerCard(1690, prog(u, 0.1, 0.4), 5400 - 290 - u)
    + hud('07:35 · ДОМ', 'ДО УДАРА') + subs(t, SUBS, 420) + fadeIn(u);
}
function timerCard(y, k, s) { return card(540, y, 460, 130, `<text y="86" text-anchor="middle" font-family="Inter" font-size="64" fill="${RED}">${timerTxt(s)}</text>`, k); }

function sMap(t) {                           // 14.6–23.4: шаг 1 — где вы; ударная волна, кольца
  const u = t - 14.6;
  let world = `<rect x="-400" y="-400" width="1900" height="2700" fill="#C9C1A8"/>`;
  for (let i = 0; i < 40; i++) world += `<circle cx="${f1(rnd(i) * 1500 - 200)}" cy="${f1(rnd(i + 3) * 2300 - 200)}" r="${f1(40 + rnd(i + 1) * 60)}" fill="#A9B28A" opacity=".6"/>`;
  world += `<path d="M-300 900 Q 300 760 700 980 T 1500 900" stroke="#9FC3D6" stroke-width="40" fill="none"/>
    <ellipse cx="320" cy="1320" rx="190" ry="150" fill="#8C8475"/>${[...Array(18).keys()].map(i => `<rect x="${f1(220 + rnd(i) * 200)}" y="${f1(1220 + rnd(i + 4) * 200)}" width="22" height="22" fill="#6E665A"/>`).join('')}
    <g transform="translate(760 560)"><line x1="-40" y1="-40" x2="40" y2="40" stroke="${RED}" stroke-width="14"/><line x1="40" y1="-40" x2="-40" y2="40" stroke="${RED}" stroke-width="14"/></g>`;
  const ring = prog(u, 2.4, 8.4);
  for (let j = 0; j < 4; j++) { const r = 120 + (ring * 4 + j) % 4 * 260; world += `<circle cx="760" cy="560" r="${f1(r)}" fill="none" stroke="${RED}" stroke-width="8" opacity="${f1(prog(u, 2.4, 2.8) * (1 - r / 1200))}"/>`; }
  world += `<line x1="760" y1="560" x2="320" y2="1320" stroke="#1a1a1a" stroke-width="5" stroke-dasharray="16 12"/>`;
  const ov = tag(760, 380, 'УДАР · 09:00', { k: prog(u, 0.2, 0.6), size: 30, bg: RED, fg: '#fff' })
    + tag(320, 1560, 'ГОРОД', { k: prog(u, 0.6, 1.0), size: 30, bg: '#1b2630', fg: '#fff' })
    + tag(620, 980, '40 КМ', { k: prog(u, 1.0, 1.4), size: 30, bg: GOLD, fg: '#1a1a1a' })
    + tag(860, 1300, 'УДАРНАЯ ВОЛНА', { k: prog(u, 2.6, 3.0), size: 28, bg: RED, fg: '#fff', px: 700, py: 1100 });
  return camera(world + ov, { t, zoom: lerp(0.9, 1.0, ease(u / 8.8)), cx: 540, cy: 950, shake: 0.6 }) + vign
    + hud('07:40 · КАРТА', 'ШАГ 1 · ГДЕ ВЫ') + subs(t, SUBS, 1720) + fadeIn(u);
}

function sWindows(t) {                       // 23.4–31.8: соседи у окон снимают; Челябинск
  const u = t - 23.4;
  const world = street(u, { faces: 0.35 }) + `<rect x="-400" y="-400" width="2000" height="2800" fill="#FFF6D8" opacity="${f1(0.15 + 0.1 * Math.sin(u * 2))}"/>`;
  return camera(world, { t, zoom: lerp(1.05, 1.15, u / 8.4), cx: 540, cy: 860, shake: 0.6 }) + vign
    + bigCard(1180, 'ЧЕЛЯБИНСК · 2013', '> 1000 РАНЕНЫХ', RED, prog(u, 2.0, 2.4), 640)
    + tag(540, 520, 'СМОТРЯТ В ОКНА', { k: prog(u, 5.5, 5.9), size: 28, bg: RED, fg: '#fff' })
    + hud('ЧЕЛЯБИНСК · 15.02.2013', 'ШАГ 2 · ОКНА') + subs(t, SUBS, 1700) + fadeIn(u);
}

function sPlan(t) {                          // 31.8–34.9: план квартиры — в ванную без окон
  const u = t - 31.8;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#1A1E22"/>
    <rect x="140" y="420" width="800" height="1080" fill="#E6DFCC"/>`;
  for (const [x, y, w, h] of [[140, 420, 480, 520], [620, 420, 320, 520], [140, 940, 480, 560], [620, 940, 320, 300], [620, 1240, 320, 260]])
    world += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#4A4440" stroke-width="14"/>`;
  for (const [x, y, w, h] of [[200, 412, 300, 16], [680, 412, 200, 16], [132, 1040, 16, 300], [932, 1290, 16, 160]]) world += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#7FB6E6"/>`;
  world += `<rect x="634" y="954" width="292" height="272" fill="${GREEN}" opacity="${f1(0.25 + 0.2 * Math.sin(u * 5))}"/>`;
  const k = ease(prog(u, 0.4, 2.6));
  [[300, 600, '#7A4E3A'], [420, 640, '#5E7D5A'], [360, 700, '#E3C04A']].forEach(([x, y, c], i) => { world += `<circle cx="${f1(lerp(x, 740 + i * 40, k))}" cy="${f1(lerp(y, 1080 + i * 30, k))}" r="${i === 2 ? 22 : 30}" fill="${c}" stroke="#fff" stroke-width="5"/>`; });
  const ov = tag(780, 880, 'ВАННАЯ · БЕЗ ОКОН', { k: prog(u, 0.6, 1.0), size: 26, bg: GREEN, fg: '#0f1a12' }) + tag(350, 340, 'ОКНА', { k: prog(u, 0.2, 0.6), size: 26, bg: '#7FB6E6', fg: '#0f1a26', px: 350, py: 420 });
  return camera(world + ov, { t, zoom: 1.0, cx: 540, cy: 960, shake: 0.5 }) + vign
    + hud('08:20 · КВАРТИРА', 'ШАГ 2 · ОКНА') + subs(t, SUBS, 1700) + fadeIn(u);
}

function sBath(t) {                          // 34.9–45.6: ванная, вода, телефоны, аптечка, 08:59, небо белеет
  const u = t - 34.9, white = prog(u, 8.1, 9.5);
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#3C4A52"/>`;
  for (let r = 0; r < 14; r++) for (let c = 0; c < 9; c++) world += `<rect x="${c * 130 - 40}" y="${r * 130 - 60}" width="124" height="124" fill="#46565F"/>`;
  world += `<rect x="-300" y="1250" width="1700" height="900" fill="#2B3338"/>
    <rect x="120" y="1000" width="560" height="280" rx="60" fill="#E8E2D6"/><rect x="146" y="${f1(1250 - 200 * ease(prog(u, 2.0, 4.0)))}" width="508" height="${f1(200 * ease(prog(u, 2.0, 4.0)))}" rx="40" fill="#7FC4E6"/>
    <rect x="740" y="1080" width="200" height="140" rx="20" fill="#fff"/><rect x="820" y="1110" width="40" height="80" fill="${RED}"/><rect x="800" y="1130" width="80" height="40" fill="${RED}"/>`;
  for (let i = 0; i < 2; i++) world += `<g transform="translate(${760 + i * 110} 960)"><rect x="-34" y="-60" width="68" height="120" rx="12" fill="#1C232B"/><rect x="-26" y="-40" width="${f1(52 * Math.min(1, prog(u, 3.6, 6.0) + 0.2))}" height="20" rx="4" fill="${GREEN}"/></g>`;
  world += `<rect x="40" y="140" width="10" height="${f1(860 * (1 - white * 0))}" fill="#1C232B"/>
    <rect x="300" y="200" width="480" height="560" rx="20" fill="#1C232B"/><rect x="330" y="230" width="420" height="500" rx="10" fill="#FFF6D8" opacity="${f1(0.05 + 0.9 * white)}"/>
    <ellipse cx="540" cy="480" rx="${f1(300 + white * 400)}" ry="${f1(300 + white * 500)}" fill="url(#glowW)" opacity="${f1(white)}"/>`;
  const ov = tag(400, 900, 'ВОДА', { k: prog(u, 2.2, 2.6), size: 28, bg: GREEN, fg: '#0f1a12', px: 400, py: 1080 })
    + tag(820, 820, 'ТЕЛЕФОНЫ', { k: prog(u, 3.7, 4.1), size: 26, bg: GREEN, fg: '#0f1a12', px: 815, py: 920 })
    + tag(840, 1350, 'АПТЕЧКА', { k: prog(u, 5.0, 5.4), size: 26, bg: GREEN, fg: '#0f1a12', px: 840, py: 1220 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.08, u / 10.7), cx: 540, cy: 960, shake: 0.8 + white * 3 }) + vign
    + bigCard(1330, 'ВРЕМЯ', u < 6.1 ? '08:57' : '08:59', RED, prog(u, 5.9, 6.2), 380)
    + hud('ВАННАЯ', 'ШАГ 3 · ЗАПАСЫ') + subs(t, SUBS, 1760) + fadeIn(u);
}

function sImpact(t) {                        // 45.6–58.4: поза на полу → удар → стёкла по кварталу
  const u = t - 45.6, hit = prog(u, 7.6, 7.8), out = u > 9.8;
  if (!out) {
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#2B3338"/>`;
    const pose = ease(prog(u, 1.9, 3.4));
    world += asOleg(() => person({ x: 560, y: 1100, s: 1.5, rot: lerp(0, -88, pose), lean: 0, legB: [lerp(8, 30, pose), 0], legF: [lerp(-8, 10, pose), 0],
      armB: [lerp(20, 165, ease(prog(u, 3.0, 3.8))), lerp(10, 215, ease(prog(u, 3.0, 3.8)))], armF: [lerp(-20, 160, ease(prog(u, 3.0, 3.8))), lerp(-10, 220, ease(prog(u, 3.0, 3.8)))],
      look: 0, mood: 'scared', pack: false, blink: u > 7.6 ? 1 : 0 }));
    const ov = tag(820, 600, 'РУКИ НА ГОЛОВУ', { k: prog(u, 3.2, 3.6), size: 26, bg: GOLD, fg: '#1a1a1a', px: 500, py: 920 })
      + tag(250, 500, 'РОТ ПРИОТКРЫТ', { k: prog(u, 4.5, 4.9), size: 26, bg: GOLD, fg: '#1a1a1a', px: 420, py: 960 });
    return camera(world + ov, { t, zoom: lerp(1.0, 1.15, ease(u / 7.6)), cx: 540, cy: 1000, shake: 0.8 + hit * 30 * (1 - prog(u, 7.8, 9.0)) }) + vign
      + hud('09:00', 'ШАГ 4 · ПОЗА') + subs(t, SUBS, 1650) + fill('#FFFBEA', hit * (1 - prog(u, 7.8, 8.6))) + fadeIn(u);
  }
  const v = u - 9.8;
  let world = street(v, { faces: 0 });
  for (let i = 0; i < 90; i++) { const ph = clamp((v - rnd(i) * 0.6) / 1.6); if (ph <= 0) continue;
    const x0 = rnd(i + 2) * 1300 - 100, y0 = 400 + rnd(i + 5) * 780;
    world += `<polygon points="${f1(x0 + ph * 160 * (rnd(i + 7) - 0.5))},${f1(y0 + ph * ph * 900)} ${f1(x0 + 14 + ph * 160 * (rnd(i + 7) - 0.5))},${f1(y0 + 6 + ph * ph * 900)} ${f1(x0 + 4 + ph * 160 * (rnd(i + 7) - 0.5))},${f1(y0 + 20 + ph * ph * 900)}" fill="#DDF0FA" opacity="${f1(1 - ph * 0.5)}"/>`; }
  return camera(world, { t, zoom: 1.05, cx: 540, cy: 900, shake: 6 * (1 - prog(v, 0, 2)) }) + vign
    + tag(540, 1560, 'ВЫЛЕТАЮТ СТЁКЛА', { k: prog(v, 0.4, 0.8), size: 30, bg: RED, fg: '#fff' })
    + hud('09:00:04', 'УДАРНАЯ ВОЛНА', { color: RED }) + subs(t, SUBS, 300 + 80);
}

function sAfter(t) {                         // 58.4–74.6: шаг 5 — не выходить: осколки, соседи; все живы; протокол
  const u = t - 58.4;
  let world = street(u, { faces: 0 });
  for (let i = 0; i < 30; i++) { const ph = (u * 0.5 + rnd(i)) % 1; world += `<polygon points="${f1(rnd(i + 2) * 1080)},${f1(500 + ph * 900)} ${f1(rnd(i + 2) * 1080 + 12)},${f1(506 + ph * 900)} ${f1(rnd(i + 2) * 1080 + 4)},${f1(520 + ph * 900)}" fill="#DDF0FA" opacity=".8"/>`; }
  for (let i = 0; i < 40; i++) world += `<polygon points="${f1(rnd(i + 9) * 1300 - 100)},${f1(1440 + rnd(i) * 300)} ${f1(rnd(i + 9) * 1300 - 80)},${f1(1450 + rnd(i) * 300)} ${f1(rnd(i + 9) * 1300 - 92)},${f1(1464 + rnd(i) * 300)}" fill="#BFD3DE"/>`;
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 16), cx: 540, cy: 950, shake: 0.6 }) + vign
    + tag(540, 420, 'НЕ ВЫХОДИТЬ', { k: prog(u, 0.3, 0.7), size: 32, bg: RED, fg: '#fff' })
    + (u > 9.4 ? checklist(['ОТ ОКОН', 'ВАННАЯ', 'ВОДА И АПТЕЧКА', 'НЕ ВЫХОДИТЬ'], u, [9.6, 10.2, 10.8, 11.4], 640) : '')
    + hud('09:10 · ПОСЛЕ УДАРА', 'ШАГ 5 · НЕ ВЫХОДИТЬ') + subs(t, SUBS, 1700) + fadeIn(u);
}

function sTwist(t) {                         // 74.6–83.2: телефон снова — «Это был не он»
  const u = t - 74.6;
  const scr = `<text x="215" y="110" text-anchor="middle" font-family="Inter" font-size="80" fill="#fff">09:30</text>
    ${bubble(24, 180, 382, ['⚠ МЧС · ЭКСТРЕННО'], prog(u, 1.8, 2.1), RED, '#fff', 28)}
    ${bubble(24, 280, 382, ['Это был не он.'], prog(u, 3.6, 3.9), '#2B3A4A', '#fff', 34)}
    ${bubble(24, 400, 382, ['Главный обломок', 'упадёт через', '90 минут.'], prog(u, 5.0, 5.3), '#3A1414', '#fff', 34)}`;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#05070A"/>` + phone(540, 860, 1.0, -3 + Math.sin(u * 40) * (u < 1.2 ? 1.5 : 0), scr, 1.4);
  return camera(world, { t, zoom: lerp(1.0, 1.12, ease(u / 8.6)), cx: 540, cy: 900, shake: 0.8 }) + vign
    + bigCard(1700, 'ДО ВТОРОГО УДАРА', timerTxt(5400 - Math.max(0, u - 5) * 1), RED, prog(u, 5.6, 6.0), 560)
    + hud('09:30', 'МЧС', { color: RED }) + subs(t, SUBS, 1460) + fadeIn(u, 0.15);
}

const render = makeRender([[0, sHook], [7.8, sAlert], [14.6, sMap], [23.4, sWindows], [31.8, sPlan], [34.9, sBath], [45.6, sImpact],
  [58.4, sAfter], [74.6, sTwist], [83.2, t => endScreen(t, 83.2, ['ГДЕ УПАДЁТ', 'ГЛАВНЫЙ?'], 'МЕТЕОРИТ')]], B, AD, '');
