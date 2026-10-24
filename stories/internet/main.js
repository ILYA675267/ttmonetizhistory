// @common — «Мир без интернета», часть 1. Время — по шкале голоса (work/internet/words.json).
// Баннер — строго посередине истории (B ≈ STORY/2, в паузе): ролик замирает, 7,2 с баннер, потом с того же места.
const B = 42.7, AD = 7.2, STORY = 87.5;
const DUR = STORY + AD;

const SUBS = makeSubs([
  [0.2, 'ЕСЛИ ЗАВТРА ВО ВСЁМ МИРЕ ПРОПАДЁТ ИНТЕРНЕТ,', { 'ИНТЕРНЕТ,': RED }], [2.9, 'ПЕРВЫМ ДЕЛОМ СНИМИТЕ НАЛИЧНЫЕ.', { 'НАЛИЧНЫЕ.': GREEN }],
  [5.3, 'ЧЕРЕЗ ПАРУ ЧАСОВ БАНКОМАТЫ ВСТАНУТ.', { 'ВСТАНУТ.': RED }], [7.7, 'У ГЛЕБА В КОШЕЛЬКЕ 300 РУБЛЕЙ.', { '300': GOLD }],
  [10.3, 'УТРО.'], [11.1, 'ТЕЛЕФОН ЛОВИТ СЕТЬ,'], [12.5, 'НО НИЧЕГО НЕ ГРУЗИТСЯ.', { 'НИЧЕГО': RED }],
  [14.1, 'КАРТЫ НЕ ПРОХОДЯТ.', { 'НЕ': RED, 'ПРОХОДЯТ.': RED }],
  [15.8, 'ШАГ ПЕРВЫЙ: ДЕНЬГИ.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }],
  [17.8, 'ГЛЕБ УСПЕВАЕТ СНЯТЬ НАЛИЧНЫЕ В ПОСЛЕДНЕМ РАБОТАЮЩЕМ БАНКОМАТЕ.', { 'НАЛИЧНЫЕ': GREEN }],
  [22.5, 'ШАГ ВТОРОЙ: ЕДА.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [24.3, 'МАГАЗИНЫ ЗАКАЗЫВАЮТ ТОВАР ЧЕРЕЗ ИНТЕРНЕТ.'],
  [26.7, 'БЕЗ СЕТИ ПОЛКИ ОПУСТЕЮТ ЗА ТРИ ДНЯ.', { 'ОПУСТЕЮТ': RED }], [29.4, 'ГЛЕБ БЕРЁТ КРУПУ, КОНСЕРВЫ И ВОДУ.', { 'ВОДУ.': GREEN }],
  [32.6, 'ШАГ ТРЕТИЙ: СВЯЗЬ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }], [34.5, 'ЗВОНКИ ПОКА ПРОХОДЯТ,'], [36.1, 'НО ВЫШКИ ПЕРЕГРУЖЕНЫ.', { 'ПЕРЕГРУЖЕНЫ.': RED }],
  [37.5, 'НА ТРЕТИЙ ДЕНЬ ПРОПАДАЕТ И МОБИЛЬНАЯ СВЯЗЬ.', { 'ПРОПАДАЕТ': RED }],
  [40.7, 'ШАГ ЧЕТВЁРТЫЙ: НОВОСТИ.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }],
  [42.9, 'СТАРЫЙ РАДИОПРИЁМНИК — ТЕПЕРЬ ЕДИНСТВЕННЫЙ ИСТОЧНИК ПРАВДЫ.', { 'РАДИОПРИЁМНИК': GOLD }],
  [47.1, 'ПО РАДИО ГОВОРЯТ ОДНО:'], [48.7, 'ПРИЧИНА НЕИЗВЕСТНА.', { 'НЕИЗВЕСТНА.': RED }], [50.2, 'СОХРАНЯЙТЕ СПОКОЙСТВИЕ.'],
  [52.1, 'ШАГ ПЯТЫЙ: ВСТРЕЧА.', { 'ШАГ': GOLD, 'ПЯТЫЙ:': GOLD }], [54.2, 'ЕСЛИ СВЯЗИ НЕТ,'],
  [55.4, 'ВСЯ СЕМЬЯ КАЖДЫЙ ДЕНЬ В ПОЛДЕНЬ У ДОМА РОДИТЕЛЕЙ.', { 'ПОЛДЕНЬ': GOLD }], [59.0, 'ГЛЕБ ВЕШАЕТ НА ДВЕРЬ ЗАПИСКУ, ГДЕ ЕГО ИСКАТЬ.'],
  [62.5, 'ДЕНЬГИ ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [63.6, 'ЕДА ЕСТЬ,', { 'ЕСТЬ,': GREEN }], [64.6, 'МЕСТО ВСТРЕЧИ ЕСТЬ.', { 'ЕСТЬ.': GREEN }],
  [66.4, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [68.0, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [70.2, 'ДЕНЬ ТРИДЦАТЫЙ.', { 'ТРИДЦАТЫЙ.': GOLD }], [71.5, 'ИНТЕРНЕТ ВОЗВРАЩАЕТСЯ.', { 'ВОЗВРАЩАЕТСЯ.': GREEN }],
  [73.4, 'МИЛЛИАРДЫ ТЕЛЕФОНОВ ЗАГОРАЮТСЯ ОДНОВРЕМЕННО.'], [76.5, 'И НА КАЖДОМ ОДНО И ТО ЖЕ СООБЩЕНИЕ ОТ НЕИЗВЕСТНОГО НОМЕРА.', { 'НЕИЗВЕСТНОГО': RED }],
  [80.9, '«ВЫ СПРАВИЛИСЬ.»', { '«ВЫ': RED, 'СПРАВИЛИСЬ.»': RED }], [82.9, '«НАЧИНАЕМ ВТОРОЙ ЭТАП.»', { '«НАЧИНАЕМ': RED, 'ВТОРОЙ': RED, 'ЭТАП.»': RED }],
], 85.3);

const GLEB = { jacket: '#3F6E8C', jacketD: '#30566E', pants: '#2B3340', pantsD: '#222936', hair: '#2A1E18', hairShort: true, pack: '#4A3A2E' };
const asGleb = fn => withPal({ ...GLEB, glove: SKIN }, fn);

function noNet(w = 430) {                    // экран «нет интернета»
  return `<text x="215" y="150" text-anchor="middle" font-family="Inter" font-size="96" fill="#fff">08:00</text>
    <g transform="translate(215 380)"><path d="M-110 -20 A160 160 0 0 1 110 -20" fill="none" stroke="#5B6876" stroke-width="22" stroke-linecap="round"/>
    <path d="M-66 24 A100 100 0 0 1 66 24" fill="none" stroke="#5B6876" stroke-width="22" stroke-linecap="round"/><circle cy="70" r="18" fill="#5B6876"/>
    <line x1="-120" y1="-90" x2="120" y2="110" stroke="${RED}" stroke-width="18" stroke-linecap="round"/></g>
    <text x="215" y="580" text-anchor="middle" font-family="Inter" font-size="36" fill="${RED}">НЕТ ИНТЕРНЕТА</text>
    <text x="215" y="630" text-anchor="middle" font-family="Mono" font-size="22" fill="#9FB7C6">ОШИБКА СЕТИ · 0 КБ/С</text>`;
}

function sHook(t) {                          // 0–5.2: телефон — нет интернета нигде
  const u = t;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0D141C"/>`;
  for (let i = 0; i < 26; i++) { const x = rnd(i) * 1080, y = rnd(i + 5) * 1920, k = prog(u, 0.4 + rnd(i + 2) * 2.6, 0.7 + rnd(i + 2) * 2.6);
    world += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(6 + rnd(i) * 6)}" fill="${k > 0.5 ? '#3A4652' : '#7FB6E6'}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="40" fill="#7FB6E6" opacity="${f1(0.15 * (1 - k))}"/>`; }
  world += phone(540, 960, 1.15, -5 + Math.sin(u) * 1.5, noNet());
  return camera(world, { t, zoom: lerp(1.12, 1.0, ease(u / 3)), shake: 1.5 }) + vign
    + hud('08:00 · ВЕСЬ МИР', 'ИНТЕРНЕТ: 0%', { color: RED, k: eout(prog(u, 0.1, 0.5)) }) + subs(t, SUBS, 1720);
}

function atm(x, y, s, broken, u) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-200" y="-420" width="400" height="840" rx="30" fill="#5B6876"/>
    <rect x="-150" y="-360" width="300" height="220" rx="16" fill="${broken ? '#2A1414' : '#1C3A2A'}"/>
    <text y="-230" text-anchor="middle" font-family="Inter" font-size="34" fill="${broken ? RED : GREEN}">${broken ? 'НЕ РАБОТАЕТ' : 'ВЫДАЧА'}</text>
    <rect x="-130" y="-100" width="260" height="20" rx="10" fill="#1C232B"/>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${-100 + c * 70}" y="${-40 + r * 60}" width="56" height="44" rx="8" fill="#8A95A0"/>`).join('')).join('')}
    <rect x="-140" y="190" width="280" height="24" rx="12" fill="#1C232B"/>
    ${!broken ? `<rect x="-90" y="${f1(200 - prog(u, 0, 1) * 120)}" width="180" height="${f1(prog(u, 0, 1) * 120)}" fill="#7FBF7A"/>` : ''}</g>`;
}

function sAtm(t) {                           // 5.2–10.2: банкомат встал, 300 рублей
  const u = t - 5.2;
  const world = street(u) + atm(540, 980, 1.2, prog(u, 0.6, 0.9) > 0.5, u);
  return camera(world, { t, zoom: lerp(1.0, 1.08, u / 5), cx: 540, cy: 1000, shake: 1 }) + vign
    + bigCard(1600, 'В КОШЕЛЬКЕ У ГЛЕБА', '300 РУБЛЕЙ', GOLD, prog(u, 2.5, 2.9))
    + hud('ЧЕРЕЗ 2 ЧАСА', 'БАНКОМАТЫ', { color: RED }) + subs(t, SUBS, 360) + fadeIn(u);
}

function terminal(x, y, s, ok) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-180" width="220" height="360" rx="30" fill="#22272E"/>
    <rect x="-90" y="-150" width="180" height="110" rx="12" fill="${ok ? '#1C3A2A' : '#3A1414'}"/>
    <text y="-80" text-anchor="middle" font-family="Inter" font-size="34" fill="${ok ? GREEN : RED}">${ok ? 'ОДОБРЕНО' : 'ОТКАЗ'}</text>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${-70 + c * 50}" y="${-10 + r * 50}" width="40" height="36" rx="6" fill="#5B6876"/>`).join('')).join('')}</g>`;
}

function sMorning(t) {                       // 10.2–22.4: утро, телефон не грузит, карты не проходят → шаг 1, наличные
  const u = t - 10.2;
  if (u < 5.5) {
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#room)"/>`;
    const spin = `<g transform="translate(215 380) rotate(${f1(u * 300)})"><path d="M0 -60 A60 60 0 1 1 -52 30" fill="none" stroke="#7FB6E6" stroke-width="14" stroke-linecap="round"/></g>
      <text x="215" y="520" text-anchor="middle" font-family="Inter" font-size="32" fill="#9FB7C6">ЗАГРУЗКА…</text>
      <g transform="translate(330 40)">${[0, 1, 2, 3].map(i => `<rect x="${i * 18}" y="${30 - i * 9}" width="12" height="${10 + i * 9}" rx="3" fill="#fff"/>`).join('')}</g>`;
    world += phone(lerp(540, 380, ease(prog(u, 3.6, 4.4))), 900, 0.9, -4, spin) + `<g opacity="${f1(prog(u, 3.6, 4.0))}">${terminal(800, 1000, 1.3, false)}</g>`;
    return camera(world, { t, zoom: 1.0, cx: 540, cy: 960, shake: 1.2 }) + vign
      + hud('08:10 · ДОМ', 'ДЕНЬ 1') + subs(t, SUBS, 1680) + fadeIn(u);
  }
  const v = u - 5.5;
  let world = street(v);
  for (let i = 0; i < 5; i++) world += asPax(i, () => person({ x: 760 + i * 120, y: 1370, s: 0.85, legB: [8, 0], legF: [-8, 0], armB: [15, 5], armF: [-15, -5], look: -1, mood: 'calm', pack: false }));
  world += atm(380, 1060, 0.75, false, prog(v, 2.4, 4.4)) + asGleb(() => person({ x: 580, y: 1370, s: 0.95, legB: [8, 0], legF: [-8, 0], armB: [20, 10], armF: [-90, -100], look: -1, mood: 'calm', pack: false }));
  return camera(world, { t, zoom: lerp(1.05, 1.0, v / 6), cx: 560, cy: 1050, shake: 1 }) + vign
    + tag(380, 640, 'ПОСЛЕДНИЙ РАБОТАЮЩИЙ', { k: prog(v, 2.2, 2.6), size: 26, bg: GREEN, fg: '#0f1a12', px: 380, py: 780 })
    + tag(900, 1000, 'ОЧЕРЕДЬ', { k: prog(v, 0.6, 1.0), size: 26, bg: '#fff', fg: '#1a1a1a', px: 900, py: 1200 })
    + hud('09:30 · УЛИЦА', 'ШАГ 1 · ДЕНЬГИ') + subs(t, SUBS, 1700) + fadeIn(v);
}
const PAXC = ['#8A5A44', '#5E7D5A', '#7A6A9E', '#A04848', '#B8893E'];
function asPax(i, fn) { return withPal({ jacket: PAXC[i % 5], jacketD: PAXC[i % 5], hair: ['#2B2B2B', '#6B4A2E', '#B8893E', '#1E1E1E'][i % 4], hairShort: i % 2 === 0, glove: SKIN }, fn); }

function sFood(t) {                          // 22.4–32.5: полки пустеют за три дня; Глеб берёт крупу, консервы, воду
  const u = t - 22.4;
  const day = u < 4.3 ? 1 : u < 6.2 ? 2 : 3, empty = prog(u, 3.0, 6.8);
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#2E3238"/>`;
  for (let r = 0; r < 4; r++) world += `<rect x="60" y="${560 + r * 300}" width="960" height="24" fill="#8A8F96"/>`;
  for (let r = 0; r < 4; r++) for (let i = 0; i < 8; i++) {
    if (rnd(r * 8 + i) < empty) continue;
    const x = 120 + i * 112, y = 560 + r * 300;
    world += `<rect x="${x - 40}" y="${y - 120}" width="80" height="116" rx="12" fill="${['#C9483B', '#3E7CB1', '#E3C04A', '#5E9E4A'][(r + i) % 4]}"/><rect x="${x - 40}" y="${y - 90}" width="80" height="30" fill="#fff" opacity=".6"/>`;
  }
  const basket = card(540, 1700, 760, 200, ['КРУПА', 'КОНСЕРВЫ', 'ВОДА'].map((n, i) => { const k = prog(u, 7.1 + i * 0.5, 7.4 + i * 0.5);
    return `<g transform="translate(${-250 + i * 250} 110)" opacity="${f1(0.3 + 0.7 * k)}"><rect x="-60" y="-70" width="120" height="100" rx="18" fill="${k > 0.5 ? GREEN : '#5B6876'}"/>
      <text y="70" text-anchor="middle" font-family="Mono" font-size="24" fill="#fff">${n}</text></g>`; }).join(''), prog(u, 6.9, 7.2));
  return camera(world, { t, zoom: lerp(1.0, 1.05, u / 10), cx: 540, cy: 960, shake: 0.8 }) + vign + basket
    + bigCard(330, 'МАГАЗИН · ДЕНЬ', String(day), day === 3 ? RED : GOLD, prog(u, 1.8, 2.2), 380)
    + hud('МАГАЗИН', 'ШАГ 2 · ЕДА') + subs(t, SUBS, 1500) + fadeIn(u);
}

function tower(x, y, s, over, u) {
  let w = '';
  for (let j = 0; j < 3; j++) { const ph = (u * 0.9 + j / 3) % 1; w += `<circle cx="0" cy="-520" r="${f1(60 + ph * 260)}" fill="none" stroke="${over ? RED : GREEN}" stroke-width="7" opacity="${f1((1 - ph) * 0.6)}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">${w}<path d="M-120 0 L-20 -520 L20 -520 L120 0" fill="none" stroke="#9AA6B0" stroke-width="16"/>
    <path d="M-90 -120 L80 -260 M90 -120 L-80 -260 M-60 -280 L50 -400 M60 -280 L-50 -400" stroke="#9AA6B0" stroke-width="8"/>
    <rect x="-40" y="-560" width="80" height="60" rx="10" fill="#5B6876"/></g>`;
}
function sSignal(t) {                        // 32.5–40.6: звонки проходят, вышки перегружены → на 3-й день связи нет
  const u = t - 32.5, dead = prog(u, 5.0, 5.4);
  let world = street(u, { night: 1, lights: 0.7 }) + tower(540, 1300, 1.3, u > 3.6, u);
  const bars = Math.round(lerp(4, 0, prog(u, 2.0, 5.2)));
  const scr = `<text x="215" y="140" text-anchor="middle" font-family="Mono" font-size="28" fill="#9FB7C6">СЕТЬ</text>
    <g transform="translate(135 200)">${[0, 1, 2, 3].map(i => `<rect x="${i * 44}" y="${120 - i * 36}" width="30" height="${40 + i * 36}" rx="6" fill="${i < bars ? '#fff' : '#3A4652'}"/>`).join('')}</g>
    <text x="215" y="440" text-anchor="middle" font-family="Inter" font-size="40" fill="${dead > 0.5 ? RED : '#fff'}">${dead > 0.5 ? 'НЕТ СЕТИ' : 'ВЫЗОВ…'}</text>`;
  world += `<g opacity="${f1(prog(u, 1.0, 1.4))}">${phone(820, 1450, 0.55, 6, scr)}</g>`;
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 8), cx: 540, cy: 1000, shake: 1 }) + vign
    + tag(540, 420, 'ПЕРЕГРУЗКА', { k: prog(u, 3.7, 4.1) * (1 - dead), size: 30, bg: RED, fg: '#fff', px: 540, py: 600 })
    + tag(540, 420, 'ДЕНЬ 3 · СВЯЗИ НЕТ', { k: dead, size: 30, bg: RED, fg: '#fff' })
    + hud(`ДЕНЬ ${u < 5 ? 1 : 3} · 21:00`, 'ШАГ 3 · СВЯЗЬ') + subs(t, SUBS, 300 + 80) + fadeIn(u);
}

function sNews(t) {                          // 40.6–52.0: радио — причина неизвестна
  const u = t - 40.6;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#141210"/><ellipse cx="540" cy="900" rx="600" ry="500" fill="url(#lamp)"/>
    <rect x="-300" y="1180" width="1700" height="1200" fill="#3A2C22"/>`;
  world += radio(540, 1040, 1.5, 1, u, prog(u, 6.4, 6.8)) + asGleb(() => `<g transform="translate(150 1250) scale(.95)">${person({ x: 0, y: -60, legB: [-80, 0], legF: [-75, 0], armB: [70, 90], armF: [80, 100], look: 1, mood: 'scared', blink: blinkAt(u, 3.1, 8.2) })}</g>`);
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 11), cx: 540, cy: 980, shake: 0.8 }) + vign
    + bigCard(380, 'ПО РАДИО', 'ПРИЧИНА НЕИЗВЕСТНА', RED, prog(u, 8.0, 8.4), 760)
    + hud('ДЕНЬ 4 · 20:00', 'ШАГ 4 · НОВОСТИ') + subs(t, SUBS, 1650) + fadeIn(u);
}

function sMeet(t) {                          // 52.0–62.4: место встречи — полдень у родителей; записка на двери
  const u = t - 52.0;
  if (u < 6.9) {
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#E9E1CF"/>`;
    for (let i = 0; i < 14; i++) world += `<line x1="${-100 + i * 100}" y1="0" x2="${-100 + i * 100}" y2="1920" stroke="#D5CBB4" stroke-width="3"/><line x1="0" y1="${i * 150}" x2="1080" y2="${i * 150}" stroke="#D5CBB4" stroke-width="3"/>`;
    world += `<path d="M-100 1100 Q 400 1000 1200 1240" stroke="#9FC3D6" stroke-width="80" fill="none"/>
      <path d="M300 1500 L 300 1200 L 700 1200 L 700 700" fill="none" stroke="${RED}" stroke-width="12" stroke-dasharray="${f1(1400 * prog(u, 1.2, 3.5))} 2000" stroke-linecap="round"/>
      <g transform="translate(300 1540)"><rect x="-60" y="-60" width="120" height="100" fill="#3F6E8C"/><polygon points="-80,-60 0,-120 80,-60" fill="#2A1E18"/></g>
      <g transform="translate(700 660)"><rect x="-70" y="-60" width="140" height="110" fill="#8C3B2A"/><polygon points="-90,-60 0,-130 90,-60" fill="#5A2418"/></g>`;
    const ov = tag(300, 1700, 'ДОМ ГЛЕБА', { k: prog(u, 0.4, 0.8), size: 26, bg: '#3F6E8C', fg: '#fff' })
      + tag(700, 480, 'РОДИТЕЛИ · 12:00', { k: prog(u, 3.3, 3.7), size: 28, bg: GOLD, fg: '#1a1a1a' });
    return camera(world + ov, { t, zoom: lerp(1.1, 1.0, ease(u / 3)), cx: 520, cy: 1100, shake: 0.6 }) + vign
      + hud('ПЛАН', 'ШАГ 5 · ВСТРЕЧА') + subs(t, SUBS, 300 + 80) + fadeIn(u);
  }
  const v = u - 6.9;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#4A3A2E"/><rect x="290" y="300" width="500" height="1400" rx="16" fill="#6B4E3A"/>
    <circle cx="720" cy="1000" r="24" fill="#C9A23A"/>
    <g transform="translate(540 760) rotate(${f1(-4 + Math.sin(v * 2) * 1.5)})" opacity="${f1(prog(v, 0.2, 0.6))}"><rect x="-200" y="-150" width="400" height="300" fill="#F4EEDD"/>
    <text y="-50" text-anchor="middle" font-family="Mono" font-size="32" fill="#2A2A2A">Я У РОДИТЕЛЕЙ.</text>
    <text y="10" text-anchor="middle" font-family="Mono" font-size="32" fill="#2A2A2A">КАЖДЫЙ ДЕНЬ</text>
    <text y="70" text-anchor="middle" font-family="Mono" font-size="40" fill="${RED}">12:00</text>
    <text x="150" y="130" text-anchor="end" font-family="Mono" font-size="26" fill="#2A2A2A">— ГЛЕБ</text></g>`;
  return camera(world, { t, zoom: lerp(1.0, 1.1, v / 3.5), cx: 540, cy: 900, shake: 0.6 }) + vign
    + hud('ДЕНЬ 4 · ДВЕРЬ', 'ШАГ 5 · ВСТРЕЧА') + subs(t, SUBS, 1600) + fadeIn(v);
}

function sWait(t) {                          // 62.4–70.1: протокол, ждать
  const u = t - 62.4;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#1A1E22"/>` + asGleb(() => closeFace(540, 860, 175, { look: Math.sin(u) * 0.4, blink: blinkAt(u, 1.4, 4.9), mood: 'calm' }));
  return camera(world, { t, zoom: lerp(1.0, 1.06, u / 7.7), shake: 0.8 }) + vign
    + checklist(['НАЛИЧНЫЕ', 'ЕДА И ВОДА', 'РАДИО', 'МЕСТО ВСТРЕЧИ'], u, [0.1, 1.2, 1.9, 2.3], 1160)
    + hud('ДЕНЬ 10', 'ЖДАТЬ', { color: GREEN }) + subs(t, SUBS, 360) + fadeIn(u);
}

function sReturn(t) {                        // 70.1–85.3: день 30 — интернет вернулся, на каждом телефоне одно сообщение
  const u = t - 70.1;
  if (u < 6.2) {
    let world = street(u, { night: 1, lights: 0.3 });
    for (let i = 0; i < 120; i++) { const k = prog(u, 2.8 + rnd(i) * 1.5, 3.0 + rnd(i) * 1.5);
      world += `<rect x="${f1(rnd(i + 3) * 1300 - 100)}" y="${f1(380 + rnd(i + 8) * 800)}" width="14" height="22" rx="3" fill="#BFE0FF" opacity="${f1(k)}"/><circle cx="${f1(rnd(i + 3) * 1300 - 93)}" cy="${f1(391 + rnd(i + 8) * 800)}" r="30" fill="#BFE0FF" opacity="${f1(k * 0.18)}"/>`; }
    return camera(world, { t, zoom: lerp(1.0, 1.1, u / 6), cx: 540, cy: 900, shake: 0.6 }) + vign
      + tag(540, 1560, 'СЕТЬ ВЕРНУЛАСЬ', { k: prog(u, 1.4, 1.8), size: 30, bg: GREEN, fg: '#0f1a12' })
      + hud('ДЕНЬ 30 · 03:00', 'ИНТЕРНЕТ: 100%', { color: GREEN }) + subs(t, SUBS, 300 + 80) + fadeIn(u);
  }
  const v = u - 6.2;
  const scr = `<text x="215" y="110" text-anchor="middle" font-family="Inter" font-size="80" fill="#fff">03:00</text>
    <text x="215" y="170" text-anchor="middle" font-family="Mono" font-size="22" fill="#9FB7C6">1 НОВОЕ СООБЩЕНИЕ</text>
    ${bubble(30, 240, 370, ['НЕИЗВЕСТНЫЙ НОМЕР'], prog(v, 0.2, 0.5), '#3A1414', RED, 26)}
    ${bubble(30, 340, 370, ['Вы справились.'], prog(v, 4.6, 4.9), '#2B3A4A', '#fff', 36)}
    ${bubble(30, 470, 370, ['Начинаем', 'второй этап.'], prog(v, 6.6, 6.9), '#2B3A4A', '#fff', 36)}`;
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#05070A"/>` + phone(540, 960, 1.2, -3 + Math.sin(v * 1.5), scr, 1.4);
  return camera(world, { t, zoom: lerp(1.0, 1.12, ease(v / 9)), cx: 540, cy: 900, shake: 0.8 }) + vign
    + hud('ДЕНЬ 30 · 03:00', 'НЕИЗВЕСТНЫЙ НОМЕР', { color: RED }) + subs(t, SUBS, 1720) + fadeIn(v, 0.12);
}

const render = makeRender([[0, sHook], [5.2, sAtm], [10.2, sMorning], [22.4, sFood], [32.5, sSignal], [40.6, sNews], [52.0, sMeet],
  [62.4, sWait], [70.1, sReturn], [85.4, t => endScreen(t, 85.4, ['КТО', 'НАПИСАЛ?'], 'МИР БЕЗ ИНТЕРНЕТА')]], B, AD, '');
