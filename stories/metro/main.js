// @common — «Заперт ночью в метро», часть 1. Время — по шкале голоса (work/metro/words.json).
// Баннер — посередине истории (в паузе, ближайшей к STORY/2): ролик замирает у колонны экстренной связи, 7,2 с баннер.
const B = 36.3, AD = 7.2, STORY = 76.4;
const DUR = STORY + AD;

const SUBS = makeSubs([
  [0.2, 'ЕСЛИ ВАС ЗАПЕРЛИ НОЧЬЮ В МЕТРО,'], [2.4, 'НЕ ИДИТЕ ПО ТОННЕЛЮ.', { 'ТОННЕЛЮ.': RED }],
  [4.0, 'ПОД НОГАМИ КОНТАКТНЫЙ РЕЛЬС,'], [6.2, 'В НЁМ 825 ВОЛЬТ.', { '825': RED, 'ВОЛЬТ.': RED }],
  [9.0, 'ТЁМА ПРОСНУЛСЯ В ПУСТОМ ВАГОНЕ В ЧАС НОЧИ.', { 'ЧАС': GOLD, 'НОЧИ.': GOLD }],
  [12.6, 'ПОЕЗД СТОИТ НА КОНЕЧНОЙ.'], [14.4, 'ДВЕРИ ОТКРЫТЫ,'], [15.6, 'СТАНЦИЯ ПУСТАЯ,'], [16.8, 'ЭСКАЛАТОР ВЫКЛЮЧЕН.'],
  [18.2, 'ШАГ ПЕРВЫЙ: ОСТАТЬСЯ НА ПЛАТФОРМЕ.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }], [20.9, 'ПО ТОННЕЛЯМ НОЧЬЮ ХОДЯТ РАБОЧИЕ ПОЕЗДА.', { 'РАБОЧИЕ': RED, 'ПОЕЗДА.': RED }],
  [24.6, 'ШАГ ВТОРОЙ: КАМЕРЫ.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [26.4, 'НА СТАНЦИИ ИХ ДЕСЯТКИ,'], [28.2, 'И ДИСПЕТЧЕР ВИДИТ ПЛАТФОРМУ.'],
  [30.1, 'ТЁМА ВСТАЁТ ПОД КАМЕРУ И МАШЕТ РУКАМИ.'], [32.8, 'ОТВЕТА НЕТ.', { 'НЕТ.': RED }],
  [34.2, 'ШАГ ТРЕТИЙ: СВЯЗЬ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [36.4, 'НА КАЖДОЙ СТАНЦИИ ЕСТЬ КОЛОННА ЭКСТРЕННОЙ СВЯЗИ.', { 'ЭКСТРЕННОЙ': GREEN }],
  [40.3, 'ТЁМА НАЖИМАЕТ КНОПКУ.'], [42.0, 'В ДИНАМИКЕ ТОЛЬКО ШИПЕНИЕ.', { 'ШИПЕНИЕ.': RED }],
  [45.0, 'ШАГ ЧЕТВЁРТЫЙ: СИЛЫ.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }], [47.0, 'НОЧЬЮ В МЕТРО ОКОЛО 15 ГРАДУСОВ.', { '15': GREEN }],
  [50.1, 'НЕ БЕГАТЬ.'], [51.2, 'СИДЕТЬ НА СКАМЕЙКЕ И ЖДАТЬ.'], [53.6, 'В 5:30 СТАНЦИЮ ОТКРОЮТ.', { '5:30': GREEN }],
  [56.7, 'КАМЕРЫ ЕГО ВИДЯТ,', { 'ВИДЯТ,': GREEN }], [57.9, 'КНОПКА НАЖАТА,', { 'НАЖАТА,': GREEN }], [59.1, 'ДО УТРА 4 ЧАСА.'],
  [61.1, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [63.0, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [65.0, 'ТРИ ЧАСА НОЧИ.', { 'ТРИ': GOLD }], [66.2, 'ИЗ ТОННЕЛЯ ВЫЕЗЖАЕТ ПОЕЗД И ОСТАНАВЛИВАЕТСЯ НАПРОТИВ ТЁМЫ.', { 'ПОЕЗД': RED }],
  [70.0, 'ДВЕРИ ОТКРЫВАЮТСЯ.'], [71.5, 'В КАБИНЕ МАШИНИСТА НИКОГО НЕТ.', { 'НИКОГО': RED, 'НЕТ.': RED }],
], 73.7);

const TEMA = { jacket: '#8C3B4A', jacketD: '#702E3B', pants: '#2B3340', pantsD: '#222936', hair: '#2B2B2B', hairShort: true };
const asTema = fn => withPal({ ...TEMA, glove: SKIN }, fn);

// платформа: стена с плиткой, путь, контактный рельс, платформа спереди; поезд в пути (x — смещение)
function station(u, { trainX = null, doors = 0, tunnel = 0, lamps = 0.4, cab = false } = {}) {
  let s = `<rect x="-400" y="-400" width="2000" height="2800" fill="#0E1116"/>
    <rect x="-400" y="300" width="2000" height="820" fill="#B8A88A"/>`;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 18; c++) s += `<rect x="${-400 + c * 115}" y="${300 + r * 102}" width="112" height="99" fill="${(r + c) % 2 ? '#B0A082' : '#BCAD90'}"/>`;
  s += `<rect x="-400" y="640" width="2000" height="60" fill="#5A4636"/><rect x="200" y="760" width="680" height="110" rx="12" fill="#1C2733"/>
    <text x="540" y="835" text-anchor="middle" font-family="Inter" font-size="54" fill="#fff">КОНЕЧНАЯ</text>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${-260 + i * 300}" y="260" width="160" height="22" rx="8" fill="${i % 2 ? '#2A2F36' : '#FFF6D8'}" opacity="${i % 2 ? 1 : lamps}"/>`;
  s += `<path d="M960 1120 L960 760 Q960 600 1120 600 L1400 600 L1400 1120Z" fill="#05070A"/>`;
  if (tunnel > 0) s += `<circle cx="1050" cy="1000" r="${f1(14 + tunnel * 26)}" fill="#FFF2C4"/><circle cx="1170" cy="1000" r="${f1(14 + tunnel * 26)}" fill="#FFF2C4"/>
    <ellipse cx="1110" cy="1000" rx="${f1(120 + tunnel * 300)}" ry="${f1(80 + tunnel * 180)}" fill="url(#glowW)" opacity="${f1(tunnel)}"/>`;
  s += `<rect x="-400" y="1120" width="2000" height="200" fill="#1A1D22"/><rect x="-400" y="1150" width="2000" height="34" fill="#E3C04A"/>
    <rect x="-400" y="1240" width="2000" height="10" fill="#6E747C"/><rect x="-400" y="1290" width="2000" height="10" fill="#6E747C"/>`;
  if (trainX !== null) {
    s += `<g transform="translate(${f1(trainX)} 0)"><rect x="-1400" y="620" width="1500" height="560" rx="40" fill="#3E6E9C"/>
      <rect x="-1400" y="1040" width="1500" height="40" fill="#2E5A80"/>`;
    for (let i = 0; i < 4; i++) {
      const dx = -1300 + i * 340;
      s += `<rect x="${dx}" y="700" width="160" height="180" rx="16" fill="#1C2733"/>`;
      const o = doors * 60;
      s += `<rect x="${dx + 190 - o}" y="690" width="60" height="420" rx="8" fill="#5A86B0"/><rect x="${dx + 250 + o}" y="690" width="60" height="420" rx="8" fill="#5A86B0"/>
        <rect x="${dx + 250 - o}" y="690" width="${2 * o}" height="420" fill="#2A3440" opacity="${doors ? 1 : 0}"/>`;
    }
    s += `<path d="M100 640 Q 200 640 220 760 L220 1180 L100 1180Z" fill="#3E6E9C"/><rect x="120" y="700" width="80" height="200" rx="14" fill="${cab ? '#0A0D12' : '#1C2733'}"/>
      <circle cx="190" cy="1080" r="20" fill="#FFF2C4"/></g>`;
  }
  s += `<rect x="-400" y="1320" width="2000" height="1000" fill="#7E7A72"/><rect x="-400" y="1320" width="2000" height="26" fill="#E3C04A"/>
    <rect x="-400" y="1346" width="2000" height="14" fill="#1a1a1a" opacity=".3"/>`;
  return s;
}

function sHook(t) {                          // 0–8.9: тоннель, контактный рельс 825 В
  const u = t;
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#030406"/>`;
  for (let i = 0; i < 12; i++) { const k = i / 12, w = lerp(1200, 60, k), y = lerp(1900, 960, k);
    world += `<path d="M${f1(540 - w)} ${f1(y)} Q 540 ${f1(y - w * 1.7)} ${f1(540 + w)} ${f1(y)}" fill="none" stroke="#1A1E24" stroke-width="${f1(lerp(40, 4, k))}"/>`; }
  world += `<path d="M300 1920 L520 960 M780 1920 L560 960" stroke="#6E747C" stroke-width="10"/>
    <path d="M60 1920 L500 960" stroke="#E3C04A" stroke-width="${f1(26)}"/><path d="M60 1920 L500 960" stroke="#FFB020" stroke-width="10" opacity="${f1(0.5 + 0.5 * Math.sin(u * 8))}"/>`;
  for (let i = 0; i < 8; i++) world += `<rect x="${f1(lerp(250, 515, i / 8))}" y="${f1(lerp(1880, 980, i / 8))}" width="${f1(lerp(580, 50, i / 8))}" height="${f1(lerp(24, 3, i / 8))}" fill="#2A2420"/>`;
  return camera(world, { t, zoom: lerp(1.0, 1.15, u / 8.9), cx: 540, cy: 1250, shake: 0.6 }) + vign
    + tag(260, 1250, '825 В', { k: prog(u, 6.2, 6.6), size: 40, bg: RED, fg: '#fff', px: 260, py: 1500 })
    + hud('01:00 · ТОННЕЛЬ', 'МЕТРО ЗАКРЫТО', { color: RED, k: eout(prog(u, 0.1, 0.5)) }) + subs(t, SUBS, 420);
}

function sWake(t) {                          // 8.9–12.5: проснулся в пустом вагоне
  const u = t - 8.9;
  let world = `<rect x="-400" y="-400" width="2000" height="2800" fill="#3A4652"/><rect x="-400" y="1300" width="2000" height="1000" fill="#2A3138"/>
    <rect x="-400" y="300" width="2000" height="380" fill="#1C2733"/>`;
  for (let i = 0; i < 4; i++) world += `<rect x="${-300 + i * 380}" y="350" width="300" height="280" rx="20" fill="#0A0D12"/>`;
  world += `<rect x="-400" y="1060" width="2000" height="70" rx="20" fill="#3E6E9C"/><rect x="-400" y="900" width="2000" height="170" rx="20" fill="#4E7EAC"/>`;
  for (let i = 0; i < 6; i++) world += `<line x1="${-200 + i * 260}" y1="220" x2="${-200 + i * 260}" y2="1300" stroke="#C9D2DA" stroke-width="10"/>`;
  world += asTema(() => person({ x: 520, y: 1050, s: 1.2, legB: [-80, 0], legF: [-75, 0], armB: [20, 10], armF: [-20, -10], look: lerp(0, 0.8, ease(prog(u, 1.2, 2.2))), mood: u > 1.4 ? 'scared' : 'calm', blink: 1 - prog(u, 0.4, 1.0), pack: true }));
  return camera(world, { t, zoom: lerp(1.15, 1.0, ease(u / 3.6)), cx: 540, cy: 900, shake: 0.6 }) + vign
    + bigCard(1560, 'ВРЕМЯ', '01:00', GOLD, prog(u, 0.6, 1.0), 340)
    + tag(780, 760, 'ТЁМА, 19', { k: prog(u, 1.4, 1.8), size: 28, px: 600, py: 860 })
    + hud('ВАГОН', 'ПУСТО') + subs(t, SUBS, 300 + 90) + fadeIn(u);
}

function sPlatform(t) {                      // 12.5–24.5: поезд стоит, двери открыты, станция пустая → шаг 1, рабочие поезда в тоннеле
  const u = t - 12.5;
  let world = station(u, { trainX: 680, doors: prog(u, 1.6, 2.2), tunnel: prog(u, 8.4, 11.5) });
  world += asTema(() => person({ x: lerp(560, 420, ease(prog(u, 5.6, 7.2))), y: 1520, s: 1.0, legB: [8, 0], legF: [-8, 0], armB: [15, 5], armF: [-15, -5], look: u > 8.4 ? 1 : Math.sin(u) * 0.8, mood: 'scared', pack: true }));
  const esc = card(820, 300, 360, 140, `<path d="M-140 100 L-60 100 L40 30 L120 30" fill="none" stroke="#9AA6B0" stroke-width="10"/><text x="0" y="62" text-anchor="middle" font-family="Mono" font-size="22" fill="${RED}">ЭСКАЛАТОР ✕</text>`, prog(u, 4.3, 4.7));
  return camera(world, { t, zoom: lerp(1.05, 0.95, ease(u / 12)), cx: lerp(540, 640, ease(prog(u, 8, 11))), cy: 1000, shake: 0.6 }) + vign + esc
    + tag(820, 560, 'РАБОЧИЙ ПОЕЗД', { k: prog(u, 8.6, 9.0), size: 28, bg: RED, fg: '#fff' })
    + tag(420, 1300, 'ОСТАТЬСЯ ЗДЕСЬ', { k: prog(u, 5.9, 6.3), size: 26, bg: GREEN, fg: '#0f1a12' })
    + hud('01:05 · КОНЕЧНАЯ', u < 5.7 ? 'ЛЮДЕЙ: 0' : 'ШАГ 1 · ПЛАТФОРМА', { color: u < 5.7 ? RED : GOLD }) + subs(t, SUBS, 1770) + fadeIn(u);
}

function sCamera(t) {                        // 24.5–34.1: камеры, машет — ответа нет
  const u = t - 24.5, wave = Math.sin(u * 7);
  let world = station(u, { lamps: 0.35 });
  const camDome = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-60" width="20" height="60" fill="#3A3F46"/><path d="M-70 0 A70 70 0 0 0 70 0Z" fill="#1C232B"/>
    <circle cy="22" r="18" fill="#0A0D12"/><circle cx="40" cy="12" r="7" fill="${RED}" opacity="${f1(0.5 + 0.5 * Math.sin(u * 4))}"/></g>`;
  world += camDome(540, 350, 1.4) + camDome(120, 330, 0.8) + camDome(960, 330, 0.8);
  world += asTema(() => person({ x: 540, y: 1520, s: 1.1, legB: [8, 0], legF: [-8, 0], armB: [lerp(20, 165 + wave * 15, prog(u, 5.6, 6.0)), 175 + wave * 15], armF: [lerp(-20, 160 - wave * 15, prog(u, 5.6, 6.0)), 170 - wave * 15], look: 0, mood: 'scared', pack: true }));
  return camera(world, { t, zoom: lerp(1.0, 1.1, u / 9.6), cx: 540, cy: 900, shake: 0.6 }) + vign
    + tag(800, 560, 'КАМЕРА', { k: prog(u, 0.4, 0.8), size: 28, bg: GOLD, fg: '#1a1a1a', px: 600, py: 400 })
    + tag(540, 820, 'ОТВЕТА НЕТ', { k: prog(u, 8.3, 8.7), size: 32, bg: RED, fg: '#fff' })
    + hud('01:20 · ПЛАТФОРМА', 'ШАГ 2 · КАМЕРЫ') + subs(t, SUBS, 1740) + fadeIn(u);
}

function sIntercom(t) {                      // 34.1–44.9: колонна экстренной связи — нажал, в динамике шипение
  const u = t - 34.1, press = prog(u, 6.2, 6.6), hiss = prog(u, 7.9, 8.3);
  let world = station(u, { lamps: 0.35 });
  world += `<rect x="560" y="700" width="200" height="840" rx="30" fill="#2E5A80"/><rect x="580" y="740" width="160" height="70" rx="10" fill="#fff"/>
    <text x="660" y="788" text-anchor="middle" font-family="Inter" font-size="30" fill="#2E5A80">SOS</text>
    <text x="660" y="860" text-anchor="middle" font-family="Mono" font-size="18" fill="#fff">ЭКСТРЕННАЯ</text><text x="660" y="884" text-anchor="middle" font-family="Mono" font-size="18" fill="#fff">СВЯЗЬ</text>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="600" y="${930 + i * 22}" width="120" height="10" rx="5" fill="#1C2733"/>`).join('')}
    <circle cx="660" cy="1120" r="44" fill="${press > 0.5 ? '#9E2B24' : RED}"/><circle cx="660" cy="1120" r="${f1(60 + press * 30)}" fill="none" stroke="${RED}" stroke-width="6" opacity="${f1(press * (1 - prog(u, 6.6, 7.4)))}"/>`;
  if (hiss > 0) for (let i = 0; i < 30; i++) world += `<line x1="${f1(780 + rnd(i) * 200)}" y1="${f1(920 + rnd(i + 3) * 120)}" x2="${f1(790 + rnd(i) * 200 + Math.sin(u * 30 + i) * 10)}" y2="${f1(920 + rnd(i + 3) * 120)}" stroke="#9AA6B0" stroke-width="3" opacity="${f1(hiss * (0.3 + 0.7 * rnd(i + Math.floor(u * 20))))}"/>`;
  world += asTema(() => person({ x: 400, y: 1520, s: 1.1, legB: [8, 0], legF: [-8, 0], armB: [15, 5], armF: [lerp(-15, 120, ease(prog(u, 5.8, 6.3))), lerp(-5, 110, ease(prog(u, 5.8, 6.3)))], look: 1, mood: 'scared', pack: true }));
  return camera(world, { t, zoom: lerp(1.0, 1.12, u / 10.8), cx: 560, cy: 1000, shake: 0.6 }) + vign
    + tag(880, 600, 'КОЛОННА СВЯЗИ', { k: prog(u, 2.4, 2.8), size: 26, bg: GREEN, fg: '#0f1a12' })
    + tag(880, 1300, 'ШИПЕНИЕ', { k: hiss, size: 28, bg: RED, fg: '#fff' })
    + hud('01:30 · ПЛАТФОРМА', 'ШАГ 3 · СВЯЗЬ') + subs(t, SUBS, 1740) + fadeIn(u);
}

function sBench(t) {                         // 44.9–56.6: силы — +15°, сидеть, откроют в 5:30
  const u = t - 44.9;
  let world = station(u, { lamps: 0.3 }) + `<rect x="260" y="1440" width="560" height="40" rx="14" fill="#6B4E3A"/><rect x="300" y="1480" width="24" height="80" fill="#3A3F46"/><rect x="756" y="1480" width="24" height="80" fill="#3A3F46"/>`;
  world += asTema(() => person({ x: 540, y: 1440, s: 1.05, legB: [-80, 0], legF: [-75, 0], armB: [30, 20], armF: [-30, -20], look: Math.sin(u * 0.7) * 0.5, mood: 'calm', pack: true, blink: blinkAt(u, 3.4, 8.8) }));
  const temp = card(300, 1700, 400, 170, `<text y="56" text-anchor="middle" font-family="Mono" font-size="22" letter-spacing="4" fill="#9FB7C6">НА СТАНЦИИ</text>
    <text y="132" text-anchor="middle" font-family="Inter" font-size="60" fill="${GREEN}">+15°</text>`, prog(u, 2.1, 2.5));
  const clock = card(780, 1700, 400, 170, `<text y="56" text-anchor="middle" font-family="Mono" font-size="22" letter-spacing="4" fill="#9FB7C6">ОТКРОЮТ</text>
    <text y="132" text-anchor="middle" font-family="Inter" font-size="60" fill="${GREEN}">05:30</text>`, prog(u, 8.7, 9.1));
  return camera(world, { t, zoom: lerp(1.0, 1.05, u / 11.7), cx: 540, cy: 1000, shake: 0.5 }) + vign + temp + clock
    + hud('02:00 · СКАМЕЙКА', 'ШАГ 4 · СИЛЫ') + subs(t, SUBS, 300 + 90) + fadeIn(u);
}

function sWait(t) {                          // 56.6–64.9: протокол
  const u = t - 56.6;
  const world = station(u, { lamps: 0.3 }) + `<rect x="-400" y="-400" width="2000" height="2800" fill="#000" opacity=".45"/>`;
  return camera(world, { t, zoom: 1.0, cx: 540, cy: 1000, shake: 0.4 }) + vign
    + checklist(['ОСТАЛСЯ НА ПЛАТФОРМЕ', 'КАМЕРЫ ВИДЯТ', 'КНОПКА НАЖАТА', 'ЖДАТЬ ДО 05:30'], u, [0.1, 0.4, 1.4, 2.6], 900)
    + hud('02:10', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 1700) + fadeIn(u);
}

function sTwist(t) {                         // 64.9–73.8: из тоннеля поезд, двери открываются, в кабине никого
  const u = t - 64.9;
  const arrive = ease(prog(u, 1.6, 4.8));
  const world = station(u, { trainX: lerp(2900, 680, arrive), doors: prog(u, 5.2, 5.8), tunnel: 1 - prog(u, 1.4, 2.2), lamps: 0.3, cab: true })
    + asTema(() => person({ x: 300, y: 1540, s: 0.9, legB: [8, 0], legF: [-8, 0], armB: [15, 5], armF: [-15, -5], look: 1, mood: 'scared', pack: true }));
  return camera(world, { t, zoom: lerp(1.0, 1.6, ease(prog(u, 6.0, 8.6))), cx: lerp(560, 840, ease(prog(u, 6.0, 8.6))), cy: lerp(1000, 820, ease(prog(u, 6.0, 8.6))), shake: 0.6 + (1 - arrive) * prog(u, 1.6, 2) * 6 }) + vign
    + tag(540, 1420, 'В КАБИНЕ НИКОГО', { k: prog(u, 6.8, 7.2), size: 32, bg: RED, fg: '#fff' })
    + hud('03:00', 'ПОЕЗД', { color: RED }) + subs(t, SUBS, 300 + 90) + fadeIn(u);
}

const render = makeRender([[0, sHook], [8.9, sWake], [12.5, sPlatform], [24.5, sCamera], [34.1, sIntercom], [44.9, sBench],
  [56.6, sWait], [64.9, sTwist], [73.8, t => endScreen(t, 73.8, ['КТО ВЕДЁТ', 'ПОЕЗД?'], 'МЕТРО')]], B, AD, '');
