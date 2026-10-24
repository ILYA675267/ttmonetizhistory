// @common — «Необитаемый остров», часть 1. Время — по шкале голоса (work/ostrov/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе): ролик замирает на жилете с яхты, 7,2 с баннер, потом с того же места.
const B = 41.82, AD = 7.2, STORY = 82.0;
const DUR = STORY + AD;

const SUBS = makeSubs([
  [0.2, 'ЕСЛИ ВЫ ОКАЗАЛИСЬ НА НЕОБИТАЕМОМ ОСТРОВЕ,'], [2.7, 'НЕ ИЩИТЕ ЕДУ.', { 'ЕДУ.': RED }],
  [4.0, 'БЕЗ ЕДЫ ЧЕЛОВЕК ЖИВЁТ НЕДЕЛЯМИ,'], [6.4, 'А БЕЗ ВОДЫ — ОКОЛО ТРЁХ ДНЕЙ.', { 'ТРЁХ': RED, 'ДНЕЙ.': RED }],
  [8.8, 'У ВИКИ ОСТАЛОСЬ ПОЛ-ЛИТРА.', { 'ПОЛ-ЛИТРА.': GOLD }],
  [11.5, 'ЯХТА РАЗБИЛАСЬ О РИФ НОЧЬЮ.', { 'РИФ': RED }], [13.9, 'УТРОМ ВИКА ОДНА НА БЕРЕГУ.'], [16.1, 'ПЕСОК, ПАЛЬМЫ И ОБЛОМКИ.'],
  [18.8, 'ШАГ ПЕРВЫЙ: ВОДА.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }], [20.8, 'МОРСКУЮ ПИТЬ НЕЛЬЗЯ:', { 'НЕЛЬЗЯ:': RED }],
  [22.8, 'СОЛЬ ВЫСУШИТ ТЕЛО БЫСТРЕЕ ЖАЖДЫ.'],
  [25.8, 'ВИКА НАДЕВАЕТ ПАКЕТ НА ВЕТКУ С ЛИСТЬЯМИ.', { 'ПАКЕТ': GREEN }], [28.4, 'СОЛНЦЕ ВЫПАРИВАЕТ ИЗ ЛИСТЬЕВ ВОДУ,'],
  [30.6, 'И К ВЕЧЕРУ В ПАКЕТЕ СТАКАН ПРЕСНОЙ ВОДЫ.', { 'ПРЕСНОЙ': GREEN, 'ВОДЫ.': GREEN }],
  [33.9, 'НА ТРЕТИЙ ДЕНЬ К БЕРЕГУ ПРИБИВАЕТ СПАСАТЕЛЬНЫЙ ЖИЛЕТ С ЕЁ ЯХТЫ.', { 'ЖИЛЕТ': GOLD }],
  [38.7, 'ТОЛЬКО ВИКА ПЛЫЛА НА НЕЙ ОДНА.', { 'ОДНА.': RED }],
  [42.2, 'ШАГ ВТОРОЙ: ТЕНЬ.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [44.0, 'ДНЁМ ОНА ЛЕЖИТ В УКРЫТИИ И МЕНЬШЕ ПОТЕЕТ.'],
  [47.0, 'ШАГ ТРЕТИЙ: ОГОНЬ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [48.9, 'СТЕКЛО ОТ ОЧКОВ,'], [50.1, 'СУХОЙ МОХ И ЧЕРЕЗ 10 МИНУТ ДЫМ.', { 'ДЫМ.': GREEN }],
  [53.2, 'ШАГ ЧЕТВЁРТЫЙ: СИГНАЛ.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }], [55.2, 'ОГРОМНЫЕ БУКВЫ SOS ИЗ КАМНЕЙ НА ПЕСКЕ.', { 'SOS': GOLD }],
  [58.2, 'ИХ ВИДНО С САМОЛЁТА.'], [59.7, 'И ТРИ КОСТРА ТРЕУГОЛЬНИКОМ.', { 'ТРИ': GOLD }], [61.8, 'ТАК ВО ВСЁМ МИРЕ ПОКАЗЫВАЮТ БЕДУ.'],
  [65.0, 'ВОДА ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [66.1, 'ОГОНЬ ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [67.1, 'СИГНАЛ ВЫЛОЖЕН.', { 'ВЫЛОЖЕН.': GREEN }],
  [68.6, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [70.5, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [72.4, 'УТРОМ ВИКА ВЫХОДИТ НА БЕРЕГ.'], [74.5, 'РЯДОМ С ЕЁ SOS КТО-ТО ВЫЛОЖИЛ КАМНЯМИ ЕЩЁ ОДНО СЛОВО.', { 'КТО-ТО': RED }],
  [78.6, '«Я ТОЖЕ.»', { '«Я': RED, 'ТОЖЕ.»': RED }],
], 79.8);

const VIKA = { jacket: '#D9846A', jacketD: '#B86A52', pants: '#3E5E7A', pantsD: '#304A60', hair: '#B07A3A', hairShort: false };
const asVika = fn => withPal({ ...VIKA, glove: SKIN }, fn);
const SAND = '#E8D6A8', SAND_D = '#D6C08C';

function palm(x, y, h, sway = 0) {
  let s = `<path d="M${x} ${y} Q ${x + 30} ${y - h * 0.5} ${x + 10 + sway} ${y - h}" fill="none" stroke="#7A5A3A" stroke-width="22" stroke-linecap="round"/>`;
  for (let i = 0; i < 6; i++) { const a = -150 + i * 50 + sway * 0.5, d = dir(a + 180);
    s += `<path d="M${x + 10 + sway} ${y - h} q ${f1(d[0] * 80)} ${f1(d[1] * 80 - 30)} ${f1(d[0] * 160)} ${f1(d[1] * 160 + 40)}" fill="none" stroke="#3E7A4A" stroke-width="26" stroke-linecap="round"/>`; }
  return s;
}
function islandTop(u, { stones = 0, fires = 0, second = 0 } = {}) {
  let s = `<rect x="-600" y="-600" width="2300" height="3200" fill="url(#sea)"/>${seaWaves(-500, u, '#7FB8CC', 40, 80)}
    <ellipse cx="540" cy="960" rx="520" ry="700" fill="#5FB3C2" opacity=".6"/>
    <ellipse cx="540" cy="960" rx="440" ry="600" fill="${SAND}"/><ellipse cx="560" cy="800" rx="300" ry="360" fill="#4E8A52"/>`;
  for (let i = 0; i < 26; i++) s += `<circle cx="${f1(400 + rnd(i) * 300)}" cy="${f1(520 + rnd(i + 3) * 520)}" r="${f1(30 + rnd(i + 1) * 30)}" fill="#3E7A4A"/>`;
  if (stones > 0) s += `<text x="540" y="1370" text-anchor="middle" font-family="Inter" font-size="210" letter-spacing="24" fill="none" stroke="#5E636A" stroke-width="18" stroke-linecap="round" stroke-dasharray="0.1 22" opacity="${f1(stones)}">SOS</text>`;
  if (second > 0) s += `<text x="540" y="1530" text-anchor="middle" font-family="Inter" font-size="130" letter-spacing="14" fill="none" stroke="#2A2E34" stroke-width="15" stroke-linecap="round" stroke-dasharray="0.1 17" opacity="${f1(second)}">Я ТОЖЕ</text>`;
  if (fires > 0) for (const [x, y] of [[200, 1300], [880, 1300], [540, 1180]]) {
    s += `<circle cx="${x}" cy="${y}" r="26" fill="#F2A030" opacity="${f1(fires)}"/>`;
    for (let j = 0; j < 4; j++) { const ph = (u * 0.5 + j / 4) % 1; s += `<circle cx="${f1(x + ph * 60)}" cy="${f1(y - ph * 160)}" r="${f1(20 + ph * 40)}" fill="#B9C1C8" opacity="${f1(fires * 0.4 * (1 - ph))}"/>`; }
  }
  return s;
}

function sHook(t) {                          // 0–11.3: остров сверху; недели без еды, 3 дня без воды; пол-литра
  const u = t;
  const world = islandTop(u) + `<circle cx="560" cy="1450" r="16" fill="${VIKA.jacket}"/><circle cx="560" cy="1442" r="11" fill="${VIKA.hair}"/>`;
  const food = card(300, 1420, 400, 170, `<text y="58" text-anchor="middle" font-family="Mono" font-size="22" letter-spacing="4" fill="#9FB7C6">БЕЗ ЕДЫ</text>
    <text y="132" text-anchor="middle" font-family="Inter" font-size="56" fill="${GREEN}">НЕДЕЛИ</text>`, prog(u, 4.0, 4.4));
  const water = card(780, 1420, 400, 170, `<text y="58" text-anchor="middle" font-family="Mono" font-size="22" letter-spacing="4" fill="#9FB7C6">БЕЗ ВОДЫ</text>
    <text y="132" text-anchor="middle" font-family="Inter" font-size="56" fill="${RED}">3 ДНЯ</text>`, prog(u, 6.4, 6.8));
  return camera(world, { t, zoom: lerp(2.2, 0.9, ease(u / 4)), cx: lerp(560, 540, ease(u / 4)), cy: lerp(1450, 1000, ease(u / 4)), shake: 0.5 }) + vign
    + food + water + bigCard(1660, 'У ВИКИ ВОДЫ', '0,5 Л', GOLD, prog(u, 8.8, 9.2), 440)
    + tag(560, 1180, 'ВИКА', { k: prog(u, 0.6, 1.0) * (1 - prog(u, 3.6, 4.0)), size: 30, bg: GOLD, fg: '#1a1a1a', px: 560, py: 1420 })
    + hud('ДЕНЬ 1 · ОСТРОВ', 'ЛЮДЕЙ: 1', { color: GOLD, k: eout(prog(u, 0.1, 0.5)) }) + subs(t, SUBS, 360);
}

function yacht(x, y, s, rot, name = 'ЧАЙКА') {
  return `<g transform="translate(${x} ${y}) rotate(${f1(rot)}) scale(${s})"><path d="M-260 0 L260 0 L200 90 L-210 90Z" fill="#EEF2F5"/>
    <rect x="-260" y="40" width="460" height="14" fill="#3E7CB1"/><text x="-40" y="76" font-family="Mono" font-size="26" fill="#3E7CB1">${name}</text>
    <line x1="0" y1="0" x2="0" y2="-420" stroke="#C9D2DA" stroke-width="12"/><path d="M8 -400 L8 -30 L220 -30Z" fill="#E8E2D6"/></g>`;
}
function sWreck(t) {                         // 11.3–18.7: ночной шторм, риф → утро, обломки
  const u = t - 11.3;
  if (u < 2.6) {
    const hit = prog(u, 1.2, 1.35);
    let world = `<rect x="-300" y="-300" width="1700" height="1500" fill="#0B1220"/><rect x="-300" y="1150" width="1700" height="1300" fill="#0E2632"/>${seaWaves(1150, u * 3, '#3E6E80', 16, 60)}`;
    for (let i = 0; i < 60; i++) { const ph = (u * 2 + rnd(i)) % 1; world += `<line x1="${f1(rnd(i + 2) * 1300 - 100)}" y1="${f1(ph * 1900 - 200)}" x2="${f1(rnd(i + 2) * 1300 - 130)}" y2="${f1(ph * 1900 - 140)}" stroke="#9FB7C6" stroke-width="3" opacity=".5"/>`; }
    world += `<path d="M600 1250 l60 -60 l50 40 l70 -70 l80 90 L900 1300Z" fill="#2A3238"/>` + yacht(lerp(380, 560, prog(u, 0, 1.3)), 1150 + Math.sin(u * 4) * 20, 1.0, Math.sin(u * 3) * 8 + hit * 20);
    return camera(world, { t, zoom: 1.05, cx: 540, cy: 1000, shake: 3 + hit * 25 * (1 - prog(u, 1.35, 2)) }) + vign
      + tag(760, 900, 'РИФ', { k: prog(u, 0.6, 1.0), size: 30, bg: RED, fg: '#fff', px: 740, py: 1200 })
      + hud('02:40 · ШТОРМ', 'ЯХТА «ЧАЙКА»', { color: RED }) + subs(t, SUBS, 360) + fill('#fff', 0.6 * prog(u, 1.2, 1.3) * (1 - prog(u, 1.3, 1.7)));
  }
  const v = u - 2.6;
  let world = `<rect x="-300" y="-300" width="1700" height="1300" fill="#9FD0E0"/><rect x="-300" y="900" width="1700" height="300" fill="#2C8AA0"/>${seaWaves(900, v, '#BFE6F2', 4, 60)}
    <rect x="-300" y="1180" width="1700" height="1200" fill="${SAND}"/>${palm(140, 1250, 520, Math.sin(v) * 10)}${palm(930, 1220, 460, Math.sin(v + 1) * 10)}`;
  for (const [x, y, w, r] of [[260, 1500, 180, 20], [760, 1560, 140, -30], [880, 1420, 90, 50]]) world += `<rect x="${x - w / 2}" y="${y - 14}" width="${w}" height="28" rx="8" fill="#EEF2F5" transform="rotate(${r} ${x} ${y})"/>`;
  world += asVika(() => person({ x: 540, y: 1430, s: 1.1, legB: [-80, 0], legF: [-70, 0], armB: [20, 10], armF: [-20, -10], look: Math.sin(v * 1.2) * 0.8, mood: 'scared', pack: false, blink: blinkAt(v, 2.1) }));
  return camera(world, { t, zoom: lerp(1.1, 1.0, v / 4.8), cx: 540, cy: 1200, shake: 0.6 }) + vign
    + tag(260, 1700, 'ОБЛОМКИ', { k: prog(v, 2.6, 3.0), size: 26, bg: '#fff', fg: '#1a1a1a', px: 260, py: 1520 })
    + hud('07:00 · БЕРЕГ', 'ДЕНЬ 1') + subs(t, SUBS, 360) + fill('#000', 1 - prog(v, 0, 0.3));
}

function sSalt(t) {                          // 18.7–25.7: шаг 1 — морскую нельзя
  const u = t - 18.7;
  let world = `<rect x="-300" y="-300" width="1700" height="1100" fill="#9FD0E0"/><rect x="-300" y="800" width="1700" height="1600" fill="#2C8AA0"/>${seaWaves(800, u, '#BFE6F2', 14, 80)}
    <g transform="translate(540 1080)"><path d="M-150 -260 L150 -260 L120 260 L-120 260Z" fill="#fff" opacity=".35"/><path d="M-138 -80 L138 -80 L120 260 L-120 260Z" fill="#2C8AA0" opacity=".85"/></g>`;
  for (let i = 0; i < 26; i++) world += `<rect x="${f1(440 + rnd(i) * 200)}" y="${f1(1060 + rnd(i + 3) * 260 - prog(u, 2.5, 4) * 30)}" width="10" height="10" fill="#fff" opacity="${f1(prog(u, 2.2, 2.8))}" transform="rotate(45 ${f1(445 + rnd(i) * 200)} ${f1(1065 + rnd(i + 3) * 260)})"/>`;
  const x = prog(u, 2.2, 2.6);
  world += `<g opacity="${f1(x)}"><line x1="320" y1="760" x2="760" y2="1400" stroke="${RED}" stroke-width="22" stroke-linecap="round"/><line x1="760" y1="760" x2="320" y2="1400" stroke="${RED}" stroke-width="22" stroke-linecap="round"/></g>`;
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 7), cx: 540, cy: 1000, shake: 0.6 }) + vign
    + tag(540, 640, 'СОЛЬ', { k: prog(u, 2.6, 3.0), size: 34, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 1 · 10:00', 'ШАГ 1 · ВОДА') + subs(t, SUBS, 1650) + fadeIn(u);
}

function sBag(t) {                           // 25.7–33.8: пакет на ветке, испарение → стакан пресной воды
  const u = t - 25.7, fillW = prog(u, 4.6, 7.4);
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#9FD0E0"/><circle cx="880" cy="300" r="110" fill="#FFE9A8"/><circle cx="880" cy="300" r="220" fill="#FFE9A8" opacity=".25"/>
    <path d="M-100 700 Q 400 640 700 760" stroke="#7A5A3A" stroke-width="40" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < 9; i++) world += `<ellipse cx="${360 + (i % 3) * 70}" cy="${820 + Math.floor(i / 3) * 90}" rx="60" ry="26" fill="#3E7A4A" transform="rotate(${-30 + i * 12} ${360 + (i % 3) * 70} ${820 + Math.floor(i / 3) * 90})"/>`;
  world += `<path d="M220 740 Q 200 1100 400 1180 Q 600 1100 580 740Z" fill="#fff" opacity=".28" stroke="#fff" stroke-width="5"/>`;
  for (let i = 0; i < 14; i++) { const ph = (u * 0.6 + rnd(i)) % 1; world += `<ellipse cx="${f1(280 + rnd(i + 2) * 240)}" cy="${f1(800 + ph * 340)}" rx="6" ry="9" fill="#BFE6F2" opacity="${f1(prog(u, 2.6, 3.0) * (1 - ph * 0.5))}"/>`; }
  world += `<ellipse cx="400" cy="1150" rx="${f1(70 * fillW + 10)}" ry="${f1(26 * fillW + 4)}" fill="#7FC4E6" opacity=".9"/>
    <g transform="translate(780 1300)"><path d="M-90 -160 L90 -160 L70 160 L-70 160Z" fill="#fff" opacity=".35"/><path d="M${f1(-70 - 20 * fillW)} ${f1(160 - 300 * fillW)} L${f1(70 + 20 * fillW)} ${f1(160 - 300 * fillW)} L70 160 L-70 160Z" fill="#7FC4E6"/></g>`;
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 8), cx: 540, cy: 1000, shake: 0.5 }) + vign
    + tag(150, 600, 'ПАКЕТ', { k: prog(u, 0.6, 1.0), size: 28, bg: GREEN, fg: '#0f1a12', px: 260, py: 800 })
    + tag(780, 1560, 'ПРЕСНАЯ ВОДА', { k: prog(u, 5.4, 5.8), size: 28, bg: GREEN, fg: '#0f1a12', px: 780, py: 1420 })
    + hud('ДЕНЬ 2 · 18:00', 'ШАГ 1 · ВОДА') + subs(t, SUBS, 1720) + fadeIn(u);
}

function sJacket(t) {                        // 33.8–42.1: к берегу прибивает жилет с её яхты → Вика одна была
  const u = t - 33.8;
  if (u < 4.7) {
    const k = ease(prog(u, 0.4, 3.4)), wave = Math.sin(u * 2) * 30;
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="${SAND}"/><path d="M-300 ${f1(500 + wave)} Q 300 ${f1(620 + wave)} 1400 ${f1(520 + wave)} L1400 -300 L-300 -300Z" fill="#2C8AA0"/>
      <path d="M-300 ${f1(500 + wave)} Q 300 ${f1(620 + wave)} 1400 ${f1(520 + wave)}" fill="none" stroke="#fff" stroke-width="16" opacity=".7"/>`;
    world += `<g transform="translate(540 ${f1(lerp(300, 980, k))}) rotate(${f1(-20 + Math.sin(u * 2) * 8)})"><path d="M-180 -200 Q -220 0 -160 220 L-40 220 L-40 -120 Q 0 -150 40 -120 L40 220 L160 220 Q 220 0 180 -200 Q 0 -260 -180 -200Z" fill="#F2722A"/>
      <rect x="-170" y="-40" width="340" height="30" fill="#E8E2D6" opacity=".9"/><rect x="-170" y="80" width="340" height="30" fill="#E8E2D6" opacity=".9"/>
      <text x="0" y="40" text-anchor="middle" font-family="Mono" font-size="34" fill="#1a1a1a">ЧАЙКА</text></g>`;
    return camera(world, { t, zoom: lerp(1.0, 1.12, ease(u / 4.7)), cx: 540, cy: 960, shake: 0.6 }) + vign
      + tag(540, 1360, 'С ЕЁ ЯХТЫ', { k: prog(u, 3.4, 3.8), size: 30, bg: GOLD, fg: '#1a1a1a' })
      + hud('ДЕНЬ 3 · 08:00', 'БЕРЕГ') + subs(t, SUBS, 1680) + fadeIn(u);
  }
  const v = u - 4.7;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#9FD0E0"/><rect x="-300" y="1300" width="1700" height="1000" fill="${SAND}"/>`
    + asVika(() => closeFace(540, 900, 215, { look: lerp(0.5, -0.4, ease(v / 2)), blink: blinkAt(v, 2.6), mood: 'scared' }));
  return camera(world, { t, zoom: lerp(1.0, 1.12, ease(v / 3.6)), cx: 540, cy: 900, shake: 1 }) + vign
    + bigCard(1560, 'НА ЯХТЕ ПЛЫЛИ', '1 ЧЕЛОВЕК', RED, prog(v, 0.4, 0.8), 520)
    + hud('ДЕНЬ 3 · 08:01', 'ВИКА, 26', { color: RED }) + subs(t, SUBS, 420) + fadeIn(v, 0.12);
}

function sFire(t) {                          // 42.1–53.1: шаг 2 — тень (укрытие); шаг 3 — огонь линзой
  const u = t - 42.1;
  if (u < 4.9) {
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#FFE9A8"/><rect x="-300" y="1200" width="1700" height="1200" fill="${SAND}"/>
      <polygon points="120,1300 540,760 960,1300" fill="#3E7A4A"/><polygon points="200,1300 540,860 880,1300" fill="#2F5E3A"/><rect x="-300" y="1290" width="1700" height="30" fill="${SAND_D}"/>`;
    world += asVika(() => person({ x: 520, y: 1270, s: 1.0, rot: -90, legB: [10, 0], legF: [-10, 0], armB: [150, 170], armF: [40, 20], look: 0, mood: 'calm', pack: false, blink: 0.9 }));
    for (let i = 0; i < 20; i++) world += `<line x1="${f1(rnd(i) * 1080)}" y1="${f1(200 + rnd(i + 2) * 500)}" x2="${f1(rnd(i) * 1080 + 20)}" y2="${f1(260 + rnd(i + 2) * 500)}" stroke="#F2A030" stroke-width="4" opacity=".4"/>`;
    return camera(world, { t, zoom: lerp(1.0, 1.06, u / 4.9), cx: 540, cy: 1050, shake: 0.5 }) + vign
      + tag(540, 640, 'ТЕНЬ · МЕНЬШЕ ПОТА', { k: prog(u, 2.0, 2.4), size: 28, bg: GREEN, fg: '#0f1a12' })
      + hud('ДЕНЬ 3 · 13:00 · +38°', 'ШАГ 2 · ТЕНЬ') + subs(t, SUBS, 1650) + fadeIn(u);
  }
  const v = u - 4.9, smoke = prog(v, 3.8, 4.6);
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="${SAND}"/><circle cx="540" cy="-200" r="260" fill="#FFE9A8"/>
    <polygon points="440,0 640,0 560,1200 520,1200" fill="#FFF6D8" opacity=".35"/>
    <ellipse cx="540" cy="620" rx="200" ry="70" fill="#9FD0E0" opacity=".7" stroke="#2A2F36" stroke-width="10"/>
    <ellipse cx="540" cy="1260" rx="200" ry="70" fill="#8A7A4A"/>
    <circle cx="540" cy="1240" r="${f1(10 + 10 * Math.sin(v * 20))}" fill="#fff" opacity="${f1(prog(v, 0.5, 1.0))}"/>`;
  for (let j = 0; j < 6; j++) { const ph = (v * 0.5 + j / 6) % 1; world += `<circle cx="${f1(540 + Math.sin(ph * 6 + j) * 40)}" cy="${f1(1220 - ph * 700)}" r="${f1(30 + ph * 90)}" fill="#B9C1C8" opacity="${f1(smoke * 0.5 * (1 - ph))}"/>`; }
  return camera(world, { t, zoom: lerp(1.0, 1.08, v / 6.1), cx: 540, cy: 1000, shake: 0.5 }) + vign
    + tag(820, 540, 'СТЕКЛО ОЧКОВ', { k: prog(v, 0, 0.4), size: 26, bg: '#fff', fg: '#1a1a1a', px: 700, py: 620 })
    + tag(820, 1420, 'СУХОЙ МОХ', { k: prog(v, 1.2, 1.6), size: 26, bg: GOLD, fg: '#1a1a1a', px: 680, py: 1270 })
    + tag(260, 800, 'ДЫМ', { k: smoke, size: 30, bg: GREEN, fg: '#0f1a12' })
    + hud('ДЕНЬ 3 · 15:00', 'ШАГ 3 · ОГОНЬ') + subs(t, SUBS, 1720) + fadeIn(v, 0.15);
}

function sSos(t) {                           // 53.1–64.9: SOS из камней + три костра треугольником; самолёт
  const u = t - 53.1;
  let world = islandTop(u, { stones: prog(u, 2.0, 3.4), fires: prog(u, 6.6, 7.2) });
  const px = lerp(-300, 1400, prog(u, 4.8, 9.0));
  world += `<g transform="translate(${f1(px)} 520) rotate(90)" opacity=".35"><path d="M0 -80 L14 -20 L90 10 L14 10 L10 60 L30 76 L-30 76 L-10 60 L-14 10 L-90 10 L-14 -20Z" fill="#0B1A22"/></g>`;
  return camera(world, { t, zoom: lerp(1.15, 0.95, ease(u / 6)), cx: 540, cy: 1250, shake: 0.4 }) + vign
    + tag(540, 1700, 'ВИДНО С САМОЛЁТА', { k: prog(u, 5.1, 5.5), size: 28, bg: GOLD, fg: '#1a1a1a' })
    + tag(860, 1080, '3 КОСТРА', { k: prog(u, 6.8, 7.2), size: 28, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 4 · ВИД СВЕРХУ', 'ШАГ 4 · СИГНАЛ') + subs(t, SUBS, 380) + fadeIn(u);
}

function sWait(t) {                          // 64.9–72.3: вечер у костра, протокол
  const u = t - 64.9;
  let world = `<rect x="-300" y="-300" width="1700" height="1500" fill="#2A2440"/><rect x="-300" y="1150" width="1700" height="1200" fill="#6E5A46"/>
    <ellipse cx="660" cy="1300" rx="420" ry="200" fill="url(#lamp)"/>`;
  for (let j = 0; j < 5; j++) { const ph = (u * 1.2 + j / 5) % 1; world += `<path d="M${f1(660 + Math.sin(ph * 9 + j) * 20)} ${f1(1290 - ph * 120)} q 20 -40 0 -80" fill="none" stroke="#F2A030" stroke-width="18" stroke-linecap="round" opacity="${f1(1 - ph)}"/>`; }
  world += asVika(() => person({ x: 400, y: 1300, s: 1.05, legB: [-80, 0], legF: [-70, 0], armB: [40, 20], armF: [60, 40], look: 1, mood: 'calm', pack: false, blink: blinkAt(u, 3.2) }));
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 7.4), cx: 540, cy: 1100, shake: 0.4 }) + vign
    + checklist(['ВОДА', 'ТЕНЬ', 'ОГОНЬ', 'СИГНАЛ SOS'], u, [0.1, 0.6, 1.2, 2.2], 300)
    + hud('ДЕНЬ 4 · 21:00', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 1700) + fadeIn(u);
}

function sTwist(t) {                         // 72.3–79.9: утро — рядом с SOS выложено «Я ТОЖЕ»
  const u = t - 72.3;
  const world = islandTop(u, { stones: 1, fires: 0.3, second: prog(u, 2.8, 4.2) });
  return camera(world, { t, zoom: lerp(1.2, 1.45, ease(u / 7)), cx: 540, cy: lerp(1330, 1460, ease(prog(u, 2.2, 5))), shake: 0.4 }) + vign
    + tag(540, 1720, 'КТО-ТО ЕЩЁ', { k: prog(u, 6.3, 6.7), size: 30, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 5 · 06:00', 'ЛЮДЕЙ: 1?', { color: RED }) + subs(t, SUBS, 380) + fadeIn(u);
}

const render = makeRender([[0, sHook], [11.3, sWreck], [18.7, sSalt], [25.7, sBag], [33.8, sJacket], [42.1, sFire], [53.1, sSos],
  [64.9, sWait], [72.3, sTwist], [79.9, t => endScreen(t, 79.9, ['КТО ЕЩЁ', 'НА ОСТРОВЕ?'], 'ОСТРОВ')]], B, AD, '');
