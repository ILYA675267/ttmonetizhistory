// @common — «Свет пропал во всей стране на неделю», часть 1. Время — по шкале голоса (work/svet/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе): ролик замирает на фонарике, 7,2 с баннер, потом с того же места.
const B = 38.58, AD = 7.2, STORY = 77.8;
const DUR = STORY + AD;

const SUBS = makeSubs([
  [0.2, 'ЕСЛИ ВО ВСЕЙ СТРАНЕ НА НЕДЕЛЮ ПРОПАЛ СВЕТ,', { 'НЕДЕЛЮ': RED }], [2.9, 'ПЕРВЫМ ДЕЛОМ НАБЕРИТЕ ВОДУ.', { 'ВОДУ.': GREEN }],
  [5.1, 'В МНОГОЭТАЖКЕ НАСОСЫ ВСТАНУТ ЧЕРЕЗ ПАРУ ЧАСОВ.', { 'ВСТАНУТ': RED }], [8.3, 'АНТОН ЖИВЁТ НА 16-М ЭТАЖЕ.', { '16-М': GOLD }],
  [11.2, 'ВЕЧЕР. ЛИФТ ВСТАЛ, В ПОДЪЕЗДЕ ТЕМНО.'], [14.6, 'ШАГ ПЕРВЫЙ: ВОДА.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }],
  [16.6, 'АНТОН НАБИРАЕТ ВАННУ И ВСЕ КАСТРЮЛИ.', { 'ВАННУ': GREEN }], [19.5, 'ЧЕРЕЗ ТРИ ЧАСА ИЗ КРАНА ИДЁТ ТОЛЬКО ВОЗДУХ.', { 'ВОЗДУХ.': RED }],
  [23.3, 'ШАГ ВТОРОЙ: ХОЛОДИЛЬНИК.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [25.2, 'НЕ ОТКРЫВАТЬ.', { 'НЕ': RED, 'ОТКРЫВАТЬ.': RED }],
  [26.5, 'ПОЛНАЯ МОРОЗИЛКА ДЕРЖИТ ХОЛОД ОКОЛО ДВУХ СУТОК.', { 'ДВУХ': GREEN, 'СУТОК.': GREEN }],
  [30.3, 'ШАГ ТРЕТИЙ: СВЕТ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [32.4, 'СВЕЧИ — ЭТО ПОЖАР,', { 'ПОЖАР,': RED }],
  [34.3, 'А ПОЖАРНЫЕ СЕЙЧАС МОГУТ НЕ ПРИЕХАТЬ.'], [37.3, 'ТОЛЬКО ФОНАРИКИ.', { 'ФОНАРИКИ.': GREEN }],
  [38.9, 'ШАГ ЧЕТВЁРТЫЙ: ТЕПЛО.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }], [40.8, 'ГАЗОВУЮ ПЛИТУ И МАНГАЛ В КВАРТИРЕ НЕ ЗАЖИГАТЬ — УГАРНЫЙ ГАЗ.', { 'УГАРНЫЙ': RED, 'ГАЗ.': RED }],
  [45.4, 'ВСЯ СЕМЬЯ В ОДНОЙ КОМНАТЕ,'], [47.1, 'А ПОСЕРЕДИНЕ — ПАЛАТКА ИЗ ОДЕЯЛ.', { 'ПАЛАТКА': GREEN }],
  [49.8, 'ШАГ ПЯТЫЙ: СВЯЗЬ.', { 'ШАГ': GOLD, 'ПЯТЫЙ:': GOLD }], [51.7, 'ТЕЛЕФОН В РЕЖИМ ПОЛЁТА,'], [53.3, 'ЗАРЯЖАТЬ ОТ МАШИНЫ.'],
  [54.8, 'НОВОСТИ — ПО РАДИО НА БАТАРЕЙКАХ.', { 'РАДИО': GOLD }],
  [57.6, 'ВОДА ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [58.6, 'ТЕПЛО ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [59.7, 'ТЕЛЕФОН ЗАРЯЖЕН.', { 'ЗАРЯЖЕН.': GREEN }],
  [60.8, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [62.5, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [64.2, 'СЕДЬМОЙ ДЕНЬ.', { 'СЕДЬМОЙ': GOLD }], [65.4, 'ВЕСЬ ГОРОД ЧЁРНЫЙ.'],
  [67.3, 'И ВДРУГ В ДОМЕ НАПРОТИВ ЗАГОРАЕТСЯ ОДНО ОКНО.', { 'ОДНО': GOLD, 'ОКНО.': GOLD }],
  [71.3, 'В КВАРТИРЕ, ГДЕ НИКТО НЕ ЖИВЁТ УЖЕ ТРИ ГОДА.', { 'НИКТО': RED }],
], 75.1);

const ANTON = { jacket: '#5E6E8C', jacketD: '#4A5872', pants: '#2B3340', pantsD: '#222936', hair: '#3A2A20', hairShort: true };
const asAnton = fn => withPal({ ...ANTON, glove: SKIN }, fn);

function beam(x, y, a, len, k = 1) {         // луч фонарика
  const d = dir(a), p = dir(a + 90);
  return `<polygon points="${x},${y} ${f1(x + d[0] * len + p[0] * len * 0.35)},${f1(y + d[1] * len + p[1] * len * 0.35)} ${f1(x + d[0] * len - p[0] * len * 0.35)},${f1(y + d[1] * len - p[1] * len * 0.35)}" fill="#FFF6D8" opacity="${f1(0.22 * k)}"/>`;
}

function sHook(t) {                          // 0–5: город гаснет; 5–10.9: разрез дома, насос, 16-й этаж
  const u = t;
  if (u < 5.0) {
    const world = street(u, { night: 1, lights: 1 - ease(prog(u, 0.6, 3.0)) });
    return camera(world, { t, zoom: lerp(1.0, 1.08, u / 5), cx: 540, cy: 900, shake: 0.6 }) + vign
      + hud('19:00 · ВСЯ СТРАНА', 'СВЕТ: 0%', { color: RED, k: eout(prog(u, 0.1, 0.5)) }) + subs(t, SUBS, 1640);
  }
  const v = u - 5.0;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#skyN)"/><rect x="-300" y="1640" width="1700" height="600" fill="#2A2420"/>
    <rect x="300" y="120" width="480" height="1520" fill="#1E2632"/>`;
  for (let f = 0; f < 17; f++) { const y = 1600 - f * 86; world += `<rect x="300" y="${y}" width="480" height="6" fill="#2E3846"/><text x="290" y="${y - 30}" text-anchor="end" font-family="Mono" font-size="22" fill="#5B6876">${f + 1}</text>`;
    for (let c = 0; c < 4; c++) world += `<rect x="${330 + c * 112}" y="${y - 66}" width="80" height="50" rx="6" fill="${f === 15 ? '#F4C877' : '#0F1520'}" opacity="${f === 15 ? 0.8 : 1}"/>`; }
  world += `<rect x="360" y="1660" width="160" height="110" rx="16" fill="#5B6876"/><circle cx="440" cy="1715" r="34" fill="#3A3F46"/>
    <path d="M520 1700 L 740 1700 L 740 200" fill="none" stroke="#7FA6B8" stroke-width="10" stroke-dasharray="${f1(1500 * (1 - prog(v, 1.0, 2.6)))} 2000"/>`;
  const ov = tag(860, 1620, 'НАСОС', { k: prog(v, 0.6, 1.0), size: 26, bg: RED, fg: '#fff', px: 520, py: 1715 })
    + tag(860, 180, 'АНТОН · 16 ЭТАЖ', { k: prog(v, 3.3, 3.7), size: 26, bg: GOLD, fg: '#1a1a1a', px: 780, py: 244 });
  return camera(world + ov, { t, zoom: lerp(1.0, 0.95, v / 6), cx: 560, cy: 960, shake: 0.5 }) + vign
    + hud('19:10 · МНОГОЭТАЖКА', 'ВОДА ИЗ НАСОСА', { color: RED }) + subs(t, SUBS, 1760) + fadeIn(v, 0.15);
}

function sWater(t) {                         // 10.9–23.2: лифт встал, темно → ванна и кастрюли → из крана воздух
  const u = t - 10.9;
  if (u < 3.6) {
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0B0E12"/><rect x="340" y="500" width="400" height="900" fill="#2A2F36"/>
      <rect x="350" y="510" width="185" height="880" fill="#3A4048"/><rect x="545" y="510" width="185" height="880" fill="#3A4048"/>
      <rect x="760" y="760" width="40" height="80" rx="8" fill="#1C232B"/><circle cx="780" cy="790" r="10" fill="#3A3F46"/>`;
    world += beam(540, 1700, 180, 1300, 1) + `<rect x="340" y="420" width="400" height="60" rx="10" fill="#1C232B"/><text x="540" y="462" text-anchor="middle" font-family="Mono" font-size="30" fill="${RED}">— — —</text>`;
    return camera(world, { t, zoom: lerp(1.0, 1.06, u / 3.6), shake: 1 }) + vign
      + tag(540, 1500, 'ЛИФТ НЕ РАБОТАЕТ', { k: prog(u, 0.6, 1.0), size: 28, bg: RED, fg: '#fff' })
      + hud('19:20 · ПОДЪЕЗД', 'ТЕМНО') + subs(t, SUBS, 360) + fadeIn(u);
  }
  const v = u - 3.6, fl = ease(prog(v, 2.0, 4.6)), air = prog(v, 4.9, 5.4);
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#3C4A52"/>`;
  for (let r = 0; r < 14; r++) for (let c = 0; c < 9; c++) world += `<rect x="${c * 130 - 40}" y="${r * 130 - 60}" width="124" height="124" fill="#46565F"/>`;
  world += `<rect x="-300" y="1250" width="1700" height="900" fill="#2B3338"/><rect x="100" y="1000" width="600" height="280" rx="60" fill="#E8E2D6"/>
    <rect x="126" y="${f1(1250 - 200 * fl)}" width="548" height="${f1(200 * fl)}" rx="40" fill="#7FC4E6"/>
    <path d="M300 860 L300 760 L420 760" fill="none" stroke="#9AA6B0" stroke-width="24"/>
    <rect x="292" y="870" width="16" height="${f1(130 * (1 - air))}" fill="#7FC4E6" opacity=".9"/>`;
  for (let i = 0; i < 3; i++) world += `<g transform="translate(${800 + (i % 2) * 120} ${1200 - Math.floor(i / 2) * 170})"><rect x="-70" y="-60" width="140" height="110" rx="14" fill="#8A95A0"/><rect x="-62" y="${f1(40 - 80 * fl)}" width="124" height="${f1(80 * fl)}" fill="#7FC4E6"/></g>`;
  if (air > 0) for (let j = 0; j < 4; j++) { const ph = (v * 1.2 + j / 4) % 1; world += `<circle cx="${f1(300 + Math.sin(j + ph * 6) * 14)}" cy="${f1(880 + ph * 80)}" r="${f1(8 + ph * 12)}" fill="none" stroke="#DDE7ED" stroke-width="3" opacity="${f1(air * (1 - ph))}"/>`; }
  return camera(world, { t, zoom: lerp(1.0, 1.06, v / 8.7), cx: 520, cy: 1000, shake: 0.6 }) + vign
    + tag(400, 860, 'ВАННА', { k: prog(v, 2.2, 2.6), size: 26, bg: GREEN, fg: '#0f1a12', px: 400, py: 1060 })
    + tag(640, 640, 'ТОЛЬКО ВОЗДУХ', { k: air, size: 28, bg: RED, fg: '#fff', px: 320, py: 880 })
    + bigCard(1620, 'ЧЕРЕЗ', '3 ЧАСА', GOLD, prog(v, 4.8, 5.2), 340)
    + hud('22:30 · ВАННАЯ', 'ШАГ 1 · ВОДА') + subs(t, SUBS, 360) + fadeIn(v);
}

function sFridge(t) {                        // 23.2–30.2: холодильник не открывать, морозилка ~2 суток
  const u = t - 23.2;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#2A2622"/><rect x="-300" y="1500" width="1700" height="800" fill="#3A3028"/>
    <rect x="300" y="300" width="480" height="1220" rx="40" fill="#D9DDE0"/><rect x="300" y="700" width="480" height="10" fill="#9AA6B0"/>
    <rect x="720" y="420" width="20" height="200" rx="8" fill="#9AA6B0"/><rect x="720" y="800" width="20" height="300" rx="8" fill="#9AA6B0"/>`;
  const tape = prog(u, 1.8, 2.2);
  world += `<g opacity="${f1(tape)}"><rect x="240" y="860" width="600" height="80" fill="${GOLD}" transform="rotate(-12 540 900)"/>
    <text x="540" y="915" text-anchor="middle" font-family="Inter" font-size="44" fill="#1a1a1a" transform="rotate(-12 540 900)">НЕ ОТКРЫВАТЬ</text></g>`;
  for (let i = 0; i < 6; i++) world += `<circle cx="${f1(360 + rnd(i) * 360)}" cy="${f1(360 + rnd(i + 2) * 300)}" r="${f1(6 + rnd(i + 1) * 6)}" fill="#BFE6F2" opacity=".7"/>`;
  return camera(world, { t, zoom: lerp(1.05, 1.0, ease(u / 3)), cx: 540, cy: 900, shake: 0.5 }) + vign
    + bigCard(1640, 'ПОЛНАЯ МОРОЗИЛКА ДЕРЖИТ', '≈ 48 ЧАСОВ', GREEN, prog(u, 3.3, 3.7), 600)
    + hud('ДЕНЬ 1 · КУХНЯ', 'ШАГ 2 · ХОЛОДИЛЬНИК') + subs(t, SUBS, 390) + fadeIn(u);
}

function sLight(t) {                         // 30.2–38.6: свеча = пожар ✕ → фонарик ✓
  const u = t - 30.2, fl = prog(u, 6.6, 7.0);
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0E0C0B"/><rect x="-300" y="1300" width="1700" height="1000" fill="#2A2220"/>`;
  world += `<g opacity="${f1(1 - fl * 0.85)}"><rect x="340" y="980" width="70" height="320" rx="10" fill="#EDE6D6"/>
    <path d="M375 980 q -26 -60 0 -120 q 26 60 0 120" fill="#F2A030"/><ellipse cx="375" cy="900" rx="200" ry="200" fill="url(#lamp)"/>
    <path d="M300 1120 q 40 -80 80 0 q 40 -100 90 -20 q 30 -60 60 40" fill="#E8483D" opacity="${f1(prog(u, 2.2, 2.8) * 0.8)}"/></g>`;
  const xk = prog(u, 3.6, 4.0);
  world += `<g opacity="${f1(xk * (1 - fl * 0.6))}"><line x1="260" y1="820" x2="500" y2="1320" stroke="${RED}" stroke-width="18" stroke-linecap="round"/><line x1="500" y1="820" x2="260" y2="1320" stroke="${RED}" stroke-width="18" stroke-linecap="round"/></g>`;
  world += `<g transform="translate(720 1180) rotate(-25)" opacity="${f1(0.3 + 0.7 * fl)}"><rect x="-40" y="-160" width="80" height="260" rx="20" fill="#2A3138"/><rect x="-56" y="-200" width="112" height="60" rx="16" fill="#3A4048"/></g>
    ${beam(690, 1000, 160, 1100, fl)}`;
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 8.4), cx: 540, cy: 1000, shake: 0.6 }) + vign
    + tag(380, 620, 'ПОЖАР', { k: prog(u, 2.4, 2.8) * (1 - fl), size: 30, bg: RED, fg: '#fff' })
    + tag(760, 640, 'ФОНАРИК', { k: fl, size: 30, bg: GREEN, fg: '#0f1a12', px: 720, py: 980 })
    + hud('ДЕНЬ 1 · 23:00', 'ШАГ 3 · СВЕТ') + subs(t, SUBS, 1700) + fadeIn(u);
}

function sWarm(t) {                          // 38.6–49.7: плита и мангал ✕ (угарный газ) → палатка из одеял
  const u = t - 38.6;
  if (u < 6.4) {
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#2A2622"/><rect x="-300" y="1400" width="1700" height="900" fill="#3A3028"/>
      <rect x="160" y="1000" width="380" height="400" rx="16" fill="#D9DDE0"/>${[0, 1, 2, 3].map(i => `<circle cx="${250 + (i % 2) * 200}" cy="${1060 + Math.floor(i / 2) * 120 - 60}" r="44" fill="#3A3F46"/>`).join('')}
      <g transform="translate(780 1280)"><path d="M-130 -60 L130 -60 L100 40 L-100 40Z" fill="#3A3F46"/><line x1="-80" y1="40" x2="-110" y2="130" stroke="#3A3F46" stroke-width="12"/><line x1="80" y1="40" x2="110" y2="130" stroke="#3A3F46" stroke-width="12"/></g>`;
    for (let j = 0; j < 8; j++) { const ph = (u * 0.4 + j / 8) % 1; world += `<circle cx="${f1(540 + Math.sin(j * 2 + ph * 4) * 260)}" cy="${f1(1000 - ph * 700)}" r="${f1(60 + ph * 90)}" fill="#8A8F96" opacity="${f1(0.35 * (1 - ph) * prog(u, 3.0, 3.6))}"/>`; }
    const xk = prog(u, 1.8, 2.2);
    world += `<g opacity="${f1(xk)}"><line x1="140" y1="900" x2="940" y2="1500" stroke="${RED}" stroke-width="20" stroke-linecap="round"/><line x1="940" y1="900" x2="140" y2="1500" stroke="${RED}" stroke-width="20" stroke-linecap="round"/></g>`;
    return camera(world, { t, zoom: lerp(1.0, 1.05, u / 6.4), cx: 540, cy: 1050, shake: 0.6 }) + vign
      + tag(540, 560, 'УГАРНЫЙ ГАЗ', { k: prog(u, 3.4, 3.8), size: 32, bg: RED, fg: '#fff' })
      + hud('ДЕНЬ 2 · +8° В КВАРТИРЕ', 'ШАГ 4 · ТЕПЛО') + subs(t, SUBS, 1700) + fadeIn(u);
  }
  const v = u - 6.4;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#1E1A18"/><rect x="-300" y="1380" width="1700" height="900" fill="#3A2C22"/>
    <polygon points="140,1400 540,760 940,1400" fill="#8C5A44"/><polygon points="240,1400 540,900 840,1400" fill="#A86E52"/>
    <polygon points="440,1400 540,1160 640,1400" fill="#1A1410"/>
    <ellipse cx="540" cy="1300" rx="300" ry="160" fill="url(#lamp)" opacity=".8"/>`;
  [[470, 1330], [540, 1310], [610, 1335]].forEach(([x, y], i) => { world += `<circle cx="${x}" cy="${y}" r="${i === 1 ? 26 : 22}" fill="${['#3A2A20', '#6B4A2E', '#B8893E'][i]}"/>`; });
  return camera(world, { t, zoom: lerp(1.08, 1.0, ease(v / 3)), cx: 540, cy: 1100, shake: 0.5 }) + vign
    + tag(540, 640, 'ПАЛАТКА ИЗ ОДЕЯЛ', { k: prog(v, 0.9, 1.3), size: 30, bg: GREEN, fg: '#0f1a12' })
    + hud('ДЕНЬ 2 · ОДНА КОМНАТА', 'ШАГ 4 · ТЕПЛО') + subs(t, SUBS, 1700) + fadeIn(v, 0.15);
}

function sComms(t) {                         // 49.7–57.4: режим полёта, зарядка от машины, радио
  const u = t - 49.7;
  const scr = `<text x="215" y="140" text-anchor="middle" font-family="Inter" font-size="80" fill="#fff">12:00</text>
    <g transform="translate(215 330) rotate(-45)"><path d="M0 -90 L14 -20 L80 10 L14 10 L10 60 L28 76 L-28 76 L-10 60 L-14 10 L-80 10 L-14 -20Z" fill="${GOLD}"/></g>
    <text x="215" y="500" text-anchor="middle" font-family="Mono" font-size="26" fill="${GOLD}">РЕЖИМ ПОЛЁТА</text>
    <rect x="115" y="560" width="200" height="70" rx="14" fill="none" stroke="#fff" stroke-width="5"/><rect x="125" y="570" width="${f1(180 * Math.min(1, 0.3 + prog(u, 3.6, 5.5) * 0.7))}" height="50" rx="8" fill="${GREEN}"/>`;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#141A20"/>` + phone(380, 900, 0.75, -6, scr);
  world += `<path d="M560 1050 Q 700 1200 820 1100" fill="none" stroke="#1C232B" stroke-width="14" opacity="${f1(prog(u, 3.4, 3.8))}"/>
    <g opacity="${f1(prog(u, 3.4, 3.8))}"><rect x="760" y="1000" width="240" height="140" rx="30" fill="#3E4652"/><circle cx="820" cy="1150" r="30" fill="#121418"/><circle cx="950" cy="1150" r="30" fill="#121418"/></g>`;
  world += `<g opacity="${f1(prog(u, 5.0, 5.4))}">${radio(760, 1560, 0.7, 1, u, 0.6)}</g>`;
  return camera(world, { t, zoom: lerp(1.0, 0.95, u / 7.7), cx: 560, cy: 1100, shake: 0.5 }) + vign
    + tag(880, 880, 'ОТ МАШИНЫ', { k: prog(u, 3.6, 4.0), size: 26, bg: GREEN, fg: '#0f1a12' })
    + hud('ДЕНЬ 3', 'ШАГ 5 · СВЯЗЬ') + subs(t, SUBS, 390) + fadeIn(u);
}

function sWait(t) {                          // 57.4–64.1: протокол
  const u = t - 57.4;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#141210"/><ellipse cx="540" cy="900" rx="520" ry="520" fill="url(#lamp)" opacity=".6"/>`
    + asAnton(() => closeFace(540, 860, 175, { look: Math.sin(u) * 0.4, blink: blinkAt(u, 1.4, 4.4), mood: 'calm' }));
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 6.7), shake: 0.6 }) + vign
    + checklist(['ВОДА', 'ХОЛОДИЛЬНИК ЗАКРЫТ', 'ФОНАРИКИ', 'ТЕПЛО И СВЯЗЬ'], u, [0.1, 1.0, 1.6, 2.2], 1160)
    + hud('ДЕНЬ 5', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 380) + fadeIn(u);
}

function sTwist(t) {                         // 64.1–75.2: день 7, город чёрный, в пустой квартире напротив загорается окно
  const u = t - 64.1, on = prog(u, 3.6, 4.0);
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#05070C"/>`;
  for (let i = 0; i < 40; i++) world += `<circle cx="${f1(rnd(i) * 1080)}" cy="${f1(rnd(i + 3) * 500)}" r="${f1(1.5 + rnd(i + 1) * 2)}" fill="#fff" opacity="${f1(0.4 + 0.3 * rnd(i + 7))}"/>`;
  world += `<rect x="220" y="360" width="640" height="1600" fill="#11161E"/>`;
  for (let r = 0; r < 14; r++) for (let c = 0; c < 5; c++) {
    const lit = r === 7 && c === 2;
    world += `<rect x="${250 + c * 120}" y="${420 + r * 100}" width="80" height="60" rx="6" fill="${lit ? '#F4C877' : '#0A0D12'}" opacity="${lit ? f1(on) : 1}"/>`;
  }
  world += `<ellipse cx="530" cy="1150" rx="${f1(160 * on)}" ry="${f1(120 * on)}" fill="url(#lamp)"/>`;
  return camera(world, { t, zoom: lerp(1.0, 1.5, ease(prog(u, 4.0, 10))), cx: 530, cy: lerp(1000, 1150, ease(prog(u, 4.0, 10))), shake: 0.5 }) + vign
    + tag(540, 1640, 'ПУСТАЯ 3 ГОДА', { k: prog(u, 7.3, 7.7), size: 30, bg: RED, fg: '#fff' })
    + hud('ДЕНЬ 7 · 23:00', 'СВЕТ: 0%', { color: RED }) + subs(t, SUBS, 380) + fadeIn(u);
}

const render = makeRender([[0, sHook], [10.9, sWater], [23.2, sFridge], [30.2, sLight], [38.6, sWarm], [49.7, sComms],
  [57.4, sWait], [64.1, sTwist], [75.2, t => endScreen(t, 75.2, ['КТО ВКЛЮЧИЛ', 'СВЕТ?'], 'СВЕТ')]], B, AD, '');
