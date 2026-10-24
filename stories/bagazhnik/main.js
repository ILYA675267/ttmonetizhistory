// «Заперт в багажнике», часть 1. Время — по шкале голоса (work/bagazhnik/words.json).
// Баннер: на секунде B ролик замирает (лёгкий наезд), 7,2 с баннер, потом история с того же места.
const B = 39.30, AD = 7.2, STORY = 97.0;
const DUR = STORY + AD;

const SUBS = [
  [0.2, 'ЕСЛИ ВАС ЗАКРЫЛИ В БАГАЖНИКЕ,'], [2.1, 'НЕ КРИЧИТЕ И НЕ БЕЙТЕ В КРЫШКУ.', { 'КРИЧИТЕ': RED, 'БЕЙТЕ': RED }],
  [4.6, 'ВАС ВСЁ РАВНО НЕ УСЛЫШАТ.', { 'НЕ': RED, 'УСЛЫШАТ.': RED }],
  [6.6, 'У РОМЫ ЕСТЬ ОДИН ШАНС,', { 'ОДИН': GOLD, 'ШАНС,': GOLD }], [8.2, 'И ОН СВЕТИТСЯ В ТЕМНОТЕ.', { 'СВЕТИТСЯ': GREEN }],
  [10.8, 'РОМА ПРИХОДИТ В СЕБЯ В ТЕМНОТЕ.'], [13.1, 'МАШИНА ЕДЕТ,'], [14.4, 'ПАХНЕТ БЕНЗИНОМ,', { 'БЕНЗИНОМ,': RED }],
  [15.7, 'РУКИ СВОБОДНЫ.', { 'СВОБОДНЫ.': GREEN }],
  [17.1, 'ШАГ ПЕРВЫЙ: ДЫХАНИЕ.', { 'ШАГ': GOLD, 'ПЕРВЫЙ:': GOLD }], [19.2, 'БАГАЖНИК НЕ ГЕРМЕТИЧНЫЙ,'],
  [21.2, 'ВОЗДУХА ХВАТИТ НАДОЛГО,', { 'НАДОЛГО,': GREEN }], [23.3, 'ПАНИКА ТРАТИТ СИЛЫ БЫСТРЕЕ,', { 'ПАНИКА': RED }],
  [25.3, 'ЧЕМ КОНЧАЕТСЯ ВОЗДУХ.'],
  [27.4, 'ШАГ ВТОРОЙ: РЫЧАГ.', { 'ШАГ': GOLD, 'ВТОРОЙ:': GOLD }], [29.4, 'В БОЛЬШИНСТВЕ СОВРЕМЕННЫХ МАШИН'],
  [31.1, 'В БАГАЖНИКЕ ЕСТЬ РУЧКА,', { 'РУЧКА,': GREEN }], [32.6, 'КОТОРАЯ СВЕТИТСЯ В ТЕМНОТЕ.', { 'СВЕТИТСЯ': GREEN }],
  [34.5, 'РОМА ОЩУПЫВАЕТ КРЫШКУ.'], [36.2, 'РУЧКИ НЕТ.', { 'НЕТ.': RED }], [37.5, 'ЕЁ КТО-ТО СРЕЗАЛ.', { 'СРЕЗАЛ.': RED }],
  [39.4, 'ШАГ ТРЕТИЙ: СИДЕНЬЯ.', { 'ШАГ': GOLD, 'ТРЕТИЙ:': GOLD }],
  [41.6, 'СПИНКИ ЗАДНИХ СИДЕНИЙ ЧАСТО СКЛАДЫВАЮТСЯ ВНУТРЬ САЛОНА.', { 'СКЛАДЫВАЮТСЯ': GREEN }],
  [45.3, 'РОМА УПИРАЕТСЯ НОГАМИ'], [46.8, 'И ДАВИТ ИЗО ВСЕХ СИЛ.'], [48.7, 'СПИНКА НЕ ПОДДАЁТСЯ.', { 'НЕ': RED, 'ПОДДАЁТСЯ.': RED }],
  [51.3, 'ШАГ ЧЕТВЁРТЫЙ: ФОНАРИ.', { 'ШАГ': GOLD, 'ЧЕТВЁРТЫЙ:': GOLD }], [53.3, 'ИЗНУТРИ К ЗАДНИМ ФАРАМ ВЕДУТ ПРОВОДА.'],
  [56.1, 'РОМА ВЫДЁРГИВАЕТ ИХ,'], [57.7, 'ВЫБИВАЕТ ФОНАРЬ НОГОЙ'], [59.0, 'И ВЫСОВЫВАЕТ РУКУ В ДЫРУ.'],
  [61.2, 'МАШИНЫ СЗАДИ ВИДЯТ ЛАДОНЬ ВМЕСТО СТОП-СИГНАЛА.', { 'ЛАДОНЬ': GOLD }],
  [65.0, 'ШАГ ПЯТЫЙ: ЗАПОМИНАТЬ.', { 'ШАГ': GOLD, 'ПЯТЫЙ:': GOLD }], [67.0, 'РОМА СЧИТАЕТ ПОВОРОТЫ И СЕКУНДЫ МЕЖДУ НИМИ.'],
  [70.1, 'ДВА НАПРАВО.', { 'ДВА': GOLD }], [71.2, 'МОСТ. ГРУНТОВКА.', { 'МОСТ.': GOLD, 'ГРУНТОВКА.': GOLD }],
  [72.8, 'СЗАДИ СИГНАЛЯТ.'], [74.1, 'КТО-ТО УЖЕ ЗВОНИТ В ПОЛИЦИЮ.', { 'ПОЛИЦИЮ.': GREEN }],
  [76.3, 'ВСЁ СДЕЛАНО ПО ПРАВИЛАМ.', { 'ПРАВИЛАМ.': GREEN }], [78.0, 'ОСТАЛОСЬ ТОЛЬКО ЖДАТЬ.'],
  [80.0, 'МАШИНА ОСТАНАВЛИВАЕТСЯ.'], [81.9, 'ШАГИ,'], [82.6, 'ЩЕЛЧОК ЗАМКА,', { 'ЩЕЛЧОК': RED }],
  [84.0, 'КРЫШКА ПОДНИМАЕТСЯ,'], [85.5, 'В ЛИЦО БЬЁТ ФОНАРИК.'],
  [87.3, 'ТОЛЬКО ВОДИТЕЛЬ ВСЁ ЕЩЁ СИДИТ ЗА РУЛЁМ,', { 'ЗА': GOLD, 'РУЛЁМ,': GOLD }], [89.6, 'И МОТОР РАБОТАЕТ.'],
  [92.1, 'БАГАЖНИК ОТКРЫЛ КТО-ТО ДРУГОЙ.', { 'ДРУГОЙ.': RED }],
].map((s, i, a) => ({ a: s[0], b: i + 1 < a.length ? a[i + 1][0] : 94.9, text: s[1], keys: s[2] || {} }));

const ROMA = { jacket: '#5A5F66', jacketD: '#474B51', pants: '#2B3340', pantsD: '#222936', hair: '#2A1E18', hairShort: true, glove: '#EBC6A0' };
const vign = `<rect width="${W}" height="${H}" fill="url(#vign)"/>`;
const fill = (c, o = 1) => `<rect width="${W}" height="${H}" fill="${c}" opacity="${f1(o)}"/>`;
const asRoma = fn => withPal({ ...ROMA, glove: SKIN }, fn);
const blinkAt = (u, ...ts) => Math.max(0, ...ts.map(b => 1 - Math.abs(u - b) / 0.09));
const GLOW = '#7CFFB0';

const DEFS2 = `<linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070B14"/><stop offset="1" stop-color="#1B2638"/></linearGradient>
  <radialGradient id="glowR" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${RED}" stop-opacity=".85"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${GLOW}" stop-opacity=".8"/><stop offset="1" stop-color="${GLOW}" stop-opacity="0"/></radialGradient>
  <radialGradient id="beam" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFFBEA" stop-opacity="1"/><stop offset=".4" stop-color="#FFF2C4" stop-opacity=".6"/><stop offset="1" stop-color="#FFF2C4" stop-opacity="0"/></radialGradient>
  <linearGradient id="head" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF6D8" stop-opacity=".0"/><stop offset="1" stop-color="#FFF6D8" stop-opacity=".45"/></linearGradient>`;

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

// ---------- машина сбоку (нос вправо) ----------
function car(x, y, s, o = {}) {
  const lid = o.lid || 0;                              // 0…1 — крышка багажника поднята
  let c = `<g transform="translate(${x} ${y}) scale(${s})">`;
  if (o.smoke) for (let i = 0; i < 8; i++) { const ph = (o.u * 0.6 + i / 8) % 1; c += `<circle cx="${f1(-470 - ph * 200)}" cy="${f1(-40 - ph * 80)}" r="${f1(16 + ph * 50)}" fill="#8A8F96" opacity="${f1(0.35 * (1 - ph))}"/>`; }
  c += `<path d="M-460 -40 L-460 -150 Q-450 -180 -400 -185 L-250 -190 L-150 -300 Q-130 -320 -90 -320 L150 -320 Q190 -320 220 -290 L320 -195 L430 -180 Q470 -170 470 -120 L470 -40Z" fill="${o.color || '#2B2F36'}"/>
    <path d="M-130 -296 L0 -296 L0 -200 L-220 -200Z M20 -296 L140 -296 Q170 -296 190 -276 L270 -200 L20 -200Z" fill="${o.driver ? '#1A2430' : '#14191F'}"/>`;
  if (o.driver) c += `<g transform="translate(120 -200)"><circle cx="0" cy="-50" r="34" fill="#0A0D11"/><rect x="-30" y="-20" width="60" height="30" rx="10" fill="#0A0D11"/></g>
    <rect x="160" y="-230" width="70" height="20" rx="6" fill="#7FB6E6" opacity=".5"/>`;
  c += `<g transform="rotate(${f1(-lid * 70)} -400 -185)"><path d="M-460 -150 Q-450 -180 -400 -185 L-250 -190 L-250 -175 L-460 -165Z" fill="${o.color || '#2B2F36'}"/></g>`;
  if (lid > 0) c += `<path d="M-455 -160 L-250 -178 L-250 -60 L-455 -60Z" fill="#0A0D11" opacity="${f1(lid)}"/>`;
  c += `<rect x="-470" y="-140" width="22" height="50" rx="6" fill="${o.tailOut ? '#2A1010' : RED}"/>`;
  if (o.tailOut && o.hand) c += `<g transform="translate(-478 -115) rotate(${f1(Math.sin(o.u * 6) * 18)})"><rect x="-70" y="-14" width="70" height="28" rx="14" fill="${SKIN}"/><circle cx="-74" cy="0" r="22" fill="${SKIN}"/></g>`;
  if (!o.tailOut) c += `<ellipse cx="-480" cy="-115" rx="60" ry="40" fill="url(#glowR)" opacity=".6"/>`;
  c += `<rect x="440" y="-150" width="30" height="34" rx="8" fill="#FFF2C4"/>
    <circle cx="-280" cy="-40" r="66" fill="#121418"/><circle cx="-280" cy="-40" r="26" fill="#6E747C"/><circle cx="300" cy="-40" r="66" fill="#121418"/><circle cx="300" cy="-40" r="26" fill="#6E747C"/>`;
  if (o.cut) c += `<rect x="-452" y="-178" width="196" height="132" rx="20" fill="#0D1014" stroke="${GOLD}" stroke-width="5" stroke-dasharray="14 10"/>`
    + asRoma(() => person({ x: -350, y: -80, s: 0.32, rot: -90, legB: [60, -40], legF: [40, -60], armB: [90, 60], armF: [70, 40], mood: 'scared', pack: false }));
  return c + '</g>';
}

function road(u, speed = 1, night = 1) {
  let s = `<rect x="-400" y="-400" width="2000" height="1800" fill="url(#skyN)"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${f1(rnd(i) * 1080)}" cy="${f1(rnd(i + 3) * 700)}" r="${f1(1.5 + rnd(i + 1) * 2)}" fill="#fff" opacity="${f1(0.3 + 0.3 * rnd(i + 9))}"/>`;
  for (let i = 0; i < 9; i++) { const x = ((rnd(i) * 1600 - u * 300 * speed * (0.5 + rnd(i + 2))) % 1600 + 1600) % 1600 - 300; s += `<polygon points="${f1(x)},1180 ${f1(x + 60)},900 ${f1(x + 120)},1180" fill="#0D1420"/>`; }
  s += `<rect x="-400" y="1180" width="2000" height="1200" fill="#15181D"/><rect x="-400" y="1180" width="2000" height="16" fill="#2A2E35"/>`;
  for (let i = 0; i < 12; i++) { const x = ((i * 220 - u * 900 * speed) % 2640 + 2640) % 2640 - 400; s += `<rect x="${f1(x)}" y="1420" width="120" height="14" fill="#C9C4B4" opacity=".55"/>`; }
  return s;
}

function sHook(t) {                          // 0–6.5: ночная трасса, звук из багажника гаснет
  const u = t;
  let world = road(u) + car(560, 1400 + Math.sin(u * 9) * 3, 1.0, { u, cut: u > 0.4 });
  world += `<path d="M-200 1300 L 1080 1240 L 1080 1340 L -200 1340Z" fill="url(#head)" opacity=".0"/>`;
  for (let j = 0; j < 3; j++) { const ph = (u * 0.9 + j / 3) % 1, k = prog(u, 4.4, 4.8);
    world += `<path d="M${f1(150 - ph * 140)} ${f1(1180 - ph * 80)} Q ${f1(110 - ph * 160)} 1260 ${f1(150 - ph * 140)} ${f1(1340 + ph * 80)}" fill="none" stroke="${RED}" stroke-width="7" opacity="${f1(k * (1 - ph) * (ph < 0.45 ? 1 : 0.2))}"/>`; }
  return camera(world, { t, zoom: lerp(1.25, 1.0, ease(u / 4)), cx: lerp(250, 540, ease(u / 4)), cy: 1250, shake: 2 })
    + vign + tag(240, 900, 'РОМА ВНУТРИ', { k: prog(u, 0.8, 1.2), size: 28, bg: GOLD, fg: '#1a1a1a', px: 260, py: 1240 })
    + tag(250, 1640, 'ШУМ ДОРОГИ', { k: prog(u, 4.6, 5.0), size: 26, bg: RED, fg: '#fff' })
    + hud('02:14 · ТРАССА', '120 КМ/Ч', { color: RED, k: eout(prog(u, 0.1, 0.5)) }) + subs(t, SUBS, 560);
}

function sHandle(t) {                        // 6.5–10.7: в темноте светится ручка
  const u = t - 6.5, k = prog(u, 1.4, 2.4);
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#030406"/>
    <ellipse cx="540" cy="960" rx="${f1(200 + 160 * k)}" ry="${f1(200 + 160 * k)}" fill="url(#glowG)" opacity="${f1(0.15 + 0.5 * k + Math.sin(u * 3) * 0.05)}"/>
    <g transform="translate(540 960) rotate(-8)"><rect x="-140" y="-36" width="280" height="72" rx="36" fill="${GLOW}" opacity="${f1(0.25 + 0.75 * k)}"/>
    <rect x="-30" y="30" width="60" height="120" rx="20" fill="${GLOW}" opacity="${f1(0.25 + 0.75 * k)}"/>
    <path d="M-60 -10 L60 -10 M-20 -10 L0 -26 L20 -10" stroke="#0A2A18" stroke-width="10" fill="none" stroke-linecap="round" opacity="${f1(k)}"/></g>`;
  return camera(world, { t, zoom: lerp(1.0, 1.15, u / 4.2), shake: 1 }) + vign
    + tag(540, 1260, 'АВАРИЙНАЯ РУЧКА', { k: prog(u, 2.2, 2.6), size: 30, bg: GREEN, fg: '#0f1a12' })
    + hud('02:14 · ВНУТРИ', 'ОДИН ШАНС', { color: GOLD }) + subs(t, SUBS, 470);
}

// ---------- внутренность багажника в разрезе ----------
function trunk(u, o = {}) {
  const bump = o.still ? 0 : Math.sin(u * 7) * 5 + (Math.sin(u * 1.3) > 0.97 ? 14 : 0);
  let s = `<rect x="-300" y="-300" width="1700" height="2600" fill="#07090C"/>
    <g transform="translate(0 ${f1(bump)})">
    <path d="M90 620 Q 100 520 220 500 L 900 480 Q 990 480 990 560 L 990 1380 L 90 1380Z" fill="#12161B"/>
    <path d="M90 620 Q 100 520 220 500 L 900 480 Q 990 480 990 560" fill="none" stroke="#2A3038" stroke-width="16"/>
    <rect x="90" y="1380" width="900" height="40" fill="#20252C"/><rect x="960" y="560" width="30" height="820" fill="#1A1F25"/>`;
  if (o.light) s += `<path d="M90 ${f1(560 - o.light * 220)} L 990 ${f1(500 - o.light * 260)} L 990 560 L 90 620Z" fill="#FFF2C4" opacity="${f1(o.light * 0.25)}"/>`;
  s += asRoma(() => person({ x: 560, y: 1230, s: 1.2, rot: -90, lean: -10, legB: [60, -40], legF: [40, -60], armB: [o.armUp ? 160 : 90, o.armUp ? 170 : 60],
    armF: [o.armUp ? 150 : 70, o.armUp ? 175 : 40], look: o.look ?? 0.3, mood: o.mood || 'scared', blink: o.blink ?? 0, pack: false }));
  return s + (o.extra || '') + '</g>';
}

function sWake(t) {                          // 10.7–17.0: приходит в себя, машина едет, бензин, руки свободны
  const u = t - 10.7, eyes = prog(u, 0.2, 0.9);
  let world = trunk(u, { blink: 1 - eyes, look: Math.sin(u * 2) * 0.6 });
  for (let i = 0; i < 5; i++) { const ph = (u * 0.4 + i / 5) % 1; world += `<path d="M${f1(860 - ph * 80)} ${f1(1300 - ph * 500)} q 20 -30 0 -60 q -20 -30 0 -60" fill="none" stroke="#9AA66A" stroke-width="7" opacity="${f1(0.35 * (1 - ph) * prog(u, 3.6, 4.0))}"/>`; }
  const ov = tag(860, 700, 'БЕНЗИН', { k: prog(u, 3.7, 4.1), size: 28, bg: RED, fg: '#fff', px: 860, py: 1000 })
    + tag(250, 760, 'РУКИ СВОБОДНЫ', { k: prog(u, 5.0, 5.4), size: 28, bg: GREEN, fg: '#0f1a12', px: 480, py: 1130 });
  return camera(world + ov, { t, zoom: lerp(1.25, 1.0, ease(u / 3)), cx: 540, cy: 1000, shake: 2.5 }) + vign
    + hud('02:16 · БАГАЖНИК', 'ТЕМНО', { color: RED }) + subs(t, SUBS, 1620) + fill('#000', 1 - prog(u, 0, 0.5));
}

function sBreath(t) {                        // 17.0–27.3: шаг 1 — воздух проходит через щели, паника
  const u = t - 17.0;
  let world = trunk(u, { mood: u > 6 ? 'calm' : 'scared', blink: blinkAt(u, 3.4, 8.2) });
  const kk = prog(u, 2.2, 2.6);
  for (const [x, y, a] of [[95, 700, 0], [95, 1100, 0], [600, 470, 90], [985, 900, 180]]) {
    for (let j = 0; j < 2; j++) { const ph = (u * 0.8 + j / 2) % 1, d = dir(a === 0 ? 90 : a === 90 ? 0 : 270);
      world += `<g opacity="${f1(kk * (1 - ph))}">${arrow(x + d[0] * (ph * 90 - 40), y + d[1] * (ph * 90 - 40), x + d[0] * (ph * 90 + 30), y + d[1] * (ph * 90 + 30), GREEN, 1, 7)}</g>`; }
  }
  const calm = prog(u, 7.8, 9.8);
  let line = '';
  for (let x = -250; x <= 250; x += 5) line += `${x},${f1(70 + Math.sin((x + u * 160) * lerp(0.18, 0.05, calm)) * lerp(30, 14, calm))} `;
  const br = card(540, 1500, 600, 200, `<text x="-260" y="44" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ДЫХАНИЕ</text>
    <text x="260" y="44" text-anchor="end" font-family="Inter" font-size="30" fill="${calm > 0.5 ? GREEN : RED}">${calm > 0.5 ? 'МЕДЛЕННОЕ' : 'ПАНИКА'}</text>
    <g transform="translate(0 46)"><polyline points="${line}" fill="none" stroke="${calm > 0.5 ? GREEN : RED}" stroke-width="6" stroke-linejoin="round"/></g>`, prog(u, 6.1, 6.5));
  const ov = tag(330, 1320, 'ЩЕЛИ — ВОЗДУХ', { k: prog(u, 2.3, 2.7), size: 28, bg: GREEN, fg: '#0f1a12', px: 130, py: 1100 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.04, u / 10), cx: 540, cy: 1000, shake: 2 }) + vign + br
    + hud('02:18 · БАГАЖНИК', 'ШАГ 1 · ДЫХАНИЕ') + subs(t, SUBS, 390) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sLever(t) {                         // 27.3–B: где должна быть ручка → срезано
  const u = t - 27.3;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0B0E12"/>
    <path d="M-100 380 Q 540 300 1180 380 L1180 1400 Q 540 1320 -100 1400Z" fill="#1A1F25"/>
    <path d="M-100 380 Q 540 300 1180 380" stroke="#2A3038" stroke-width="20" fill="none"/>
    <rect x="380" y="820" width="320" height="220" rx="30" fill="#14181D" stroke="#2A3038" stroke-width="8"/>`;
  const ghost = prog(u, 3.0, 3.4) * (1 - prog(u, 8.6, 9.0));
  world += `<g opacity="${f1(ghost)}" transform="translate(540 930)"><rect x="-130" y="-34" width="260" height="68" rx="34" fill="none" stroke="${GLOW}" stroke-width="6" stroke-dasharray="14 10"/>
    <rect x="-28" y="30" width="56" height="110" rx="20" fill="none" stroke="${GLOW}" stroke-width="6" stroke-dasharray="14 10"/></g>`;
  const cut = prog(u, 8.9, 9.3);
  world += `<g opacity="${f1(cut)}"><rect x="510" y="900" width="60" height="40" rx="8" fill="#3A3F46"/>
    <path d="M520 940 l-10 40 M540 940 l6 46 M560 940 l12 38" stroke="${RED}" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="540" cy="930" rx="200" ry="160" fill="url(#glowR)" opacity="${f1(0.4 * cut)}"/></g>`;
  const hx = 540 + Math.sin(u * 1.8) * 300 * (1 - prog(u, 8.4, 9.0)), hy = 1130 + Math.cos(u * 1.3) * 120 * (1 - prog(u, 8.4, 9.0));
  world += prog(u, 7.0, 7.3) > 0 ? `<g transform="translate(${f1(hx)} ${f1(hy)}) rotate(-20)" opacity="${f1(prog(u, 7.0, 7.3))}"><rect x="-40" y="0" width="80" height="400" rx="40" fill="${ROMA.jacket}"/>
    <ellipse cx="0" cy="-10" rx="56" ry="64" fill="${SKIN}"/>${[-30, -10, 10, 30].map(o => `<rect x="${o - 9}" y="-110" width="18" height="70" rx="9" fill="${SKIN}"/>`).join('')}</g>` : '';
  const ov = tag(540, 700, 'ЗДЕСЬ ДОЛЖНА БЫТЬ РУЧКА', { k: ghost, size: 26, bg: GREEN, fg: '#0f1a12' })
    + tag(540, 700, 'СРЕЗАНО', { k: cut, size: 40, bg: RED, fg: '#fff' });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.18, ease(u / 12)), cx: 540, cy: 930, shake: 2 }) + vign
    + hud('02:20 · КРЫШКА БАГАЖНИКА', 'ШАГ 2 · РЫЧАГ') + subs(t, SUBS, 1620) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sSeats(t) {                         // B–51.2: давит ногами в спинку — не поддаётся
  const u = t - B, push = Math.max(0, Math.sin(u * 3)) * prog(u, 6.0, 6.4);
  let world = trunk(u, { look: -0.8, mood: 'scared', extra: `<g transform="translate(${f1(push * 8 * prog(u, 6, 9.4))} 0)"><rect x="960" y="540" width="70" height="860" rx="20" fill="#3C4654"/></g>` });
  world += `<rect x="1030" y="500" width="300" height="900" fill="#20262E"/>`;
  const ov = arrow(760, 1250, 940, 1250, GOLD, prog(u, 6.0, 6.4), 12)
    + tag(780, 380, 'СПИНКА СИДЕНЬЯ', { k: prog(u, 2.2, 2.6), size: 28, bg: GREEN, fg: '#0f1a12', px: 990, py: 620 })
    + tag(780, 380, 'ЗАБЛОКИРОВАНА', { k: prog(u, 9.4, 9.8), size: 30, bg: RED, fg: '#fff', px: 990, py: 620 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.1, u / 12), cx: lerp(540, 680, ease(u / 6)), cy: 1000, shake: 2 + push * 6 }) + vign
    + hud('02:23 · БАГАЖНИК', 'ШАГ 3 · СИДЕНЬЯ') + subs(t, SUBS, 1640);
}

function sLights(t) {                        // 51.2–64.9: провода → выбить фонарь → рука наружу
  const u = t - 51.2;
  if (u < 7.8) {
    const pulled = prog(u, 4.9, 5.4), kicked = prog(u, 6.5, 6.9);
    let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#0B0E12"/>
      <rect x="240" y="520" width="600" height="760" rx="80" fill="#1A1F25"/>
      <g transform="translate(540 900) translate(${f1(-kicked * 30)} ${f1(kicked * 20)}) rotate(${f1(-kicked * 25)})" opacity="${f1(1 - kicked * 0.9)}">
      <rect x="-200" y="-280" width="400" height="560" rx="60" fill="#3A1414"/><rect x="-170" y="-250" width="340" height="500" rx="46" fill="#5A1A1A"/></g>`;
    if (kicked > 0) world += `<rect x="340" y="620" width="400" height="560" rx="60" fill="#1B2638"/><ellipse cx="540" cy="900" rx="260" ry="320" fill="#C9C4B4" opacity="${f1(kicked * 0.15)}"/>`;
    for (const [i, c] of [[0, '#E8483D'], [1, '#F4B740'], [2, '#7FB6E6']]) {
      const sx = 420 + i * 120, ex = lerp(sx, sx - 200 + i * 60, pulled), ey = lerp(1180, 1460, pulled);
      world += `<path d="M${sx} 1080 Q ${sx} 1180 ${f1(ex)} ${f1(ey)}" fill="none" stroke="${c}" stroke-width="16" stroke-linecap="round"/>`;
    }
    if (pulled > 0 && pulled < 1) for (let i = 0; i < 10; i++) world += `<line x1="540" y1="1100" x2="${f1(540 + Math.cos(i) * 80)}" y2="${f1(1100 + Math.sin(i) * 80)}" stroke="${GOLD}" stroke-width="5"/>`;
    const boot = `<g transform="translate(${f1(lerp(1200, 760, prog(u, 6.2, 6.6)))} 1000)"><rect x="0" y="-60" width="400" height="120" rx="60" fill="${ROMA.pants}"/><ellipse cx="0" cy="0" rx="90" ry="70" fill="#2A2F36"/></g>`;
    const ov = tag(860, 1430, 'ПРОВОДА', { k: prog(u, 2.2, 2.6), size: 28, bg: GOLD, fg: '#1a1a1a', px: 600, py: 1130 })
      + tag(540, 400, 'ЗАДНИЙ ФОНАРЬ', { k: prog(u, 0.6, 1.0), size: 28, bg: RED, fg: '#fff', px: 540, py: 600 });
    return camera(world + (u > 6.0 ? boot : '') + ov, { t, zoom: lerp(1.0, 1.08, u / 7.8), cx: 540, cy: 950, shake: 2 + prog(u, 6.5, 6.8) * (1 - prog(u, 6.9, 7.3)) * 25 }) + vign
      + hud('02:25 · ИЗНУТРИ', 'ШАГ 4 · ФОНАРИ') + subs(t, SUBS, 1680) + fill('#000', 1 - prog(u, 0, 0.2));
  }
  const v = u - 7.8;
  let world = road(v, 0.6) + car(820, 1400 + Math.sin(v * 9) * 3, 1.0, { u: v, tailOut: 1, hand: 1 });
  world += `<path d="M-400 1260 L 300 1320 L 300 1420 L -400 1460Z" fill="#FFF6D8" opacity=".18"/>
    <g transform="translate(-150 1420)"><rect x="-260" y="-220" width="300" height="190" rx="40" fill="#3E4652"/><rect x="20" y="-140" width="26" height="30" rx="6" fill="#FFF2C4"/>
    <circle cx="-180" cy="-20" r="50" fill="#121418"/><circle cx="-10" cy="-20" r="50" fill="#121418"/></g>`;
  return camera(world, { t, zoom: lerp(1.1, 1.0, ease(v / 3)), cx: lerp(400, 300, v / 6), cy: 1250, shake: 1.5 }) + vign
    + tag(300, 980, 'ЛАДОНЬ', { k: prog(v, 0.6, 1.0), size: 30, bg: GOLD, fg: '#1a1a1a', px: 310, py: 1270 })
    + hud('02:26 · ТРАССА', 'ШАГ 4 · ФОНАРИ') + subs(t, SUBS, 560) + fill('#000', 1 - prog(v, 0, 0.15));
}

function sRoute(t) {                         // 64.9–79.9: считает повороты → маршрут на карте → сигналят, звонят в полицию
  const u = t - 64.9;
  let world = `<rect x="-300" y="-300" width="1700" height="2600" fill="#141A20"/>`;
  for (let i = 0; i < 16; i++) world += `<line x1="${-200 + i * 100}" y1="-200" x2="${-200 + i * 100}" y2="2200" stroke="#1C242C" stroke-width="3"/><line x1="-200" y1="${-200 + i * 160}" x2="1400" y2="${-200 + i * 160}" stroke="#1C242C" stroke-width="3"/>`;
  world += `<path d="M-300 1100 Q 300 1050 1400 1180" stroke="#2C4A5C" stroke-width="120" fill="none"/>`;
  const pts = [[540, 1800], [540, 1500], [820, 1500], [820, 1300], [820, 980], [540, 700], [400, 420]];
  const L = prog(u, 1.8, 7.2) * (pts.length - 1), n = Math.floor(L), f = L - n;
  const shown = pts.slice(0, n + 1).concat(n < pts.length - 1 ? [[lerp(pts[n][0], pts[n + 1][0], f), lerp(pts[n][1], pts[n + 1][1], f)]] : []);
  world += `<polyline points="${shown.map(p => p.map(f1).join(',')).join(' ')}" fill="none" stroke="${GOLD}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>`;
  const head = shown[shown.length - 1];
  world += `<circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="22" fill="${RED}"/><circle cx="${f1(head[0])}" cy="${f1(head[1])}" r="${f1(30 + Math.sin(u * 6) * 6)}" fill="none" stroke="${RED}" stroke-width="5"/>`;
  world += `<path d="M820 1060 L 820 1180" stroke="#9AA6B0" stroke-width="40"/><path d="M540 700 L 400 420" stroke="#6E5A46" stroke-width="26" stroke-dasharray="20 14" opacity="${f1(prog(u, 6.0, 6.6))}"/>`;
  const labels = [['НАПРАВО 1', 680, 1560, 2.6], ['НАПРАВО 2', 960, 1420, 4.0], ['МОСТ', 980, 1120, 5.6], ['ГРУНТОВКА', 280, 560, 6.6]];
  const ov = labels.map(([s, x, y, a]) => tag(x, y, s, { k: prog(u, a, a + 0.3), size: 26, bg: GOLD, fg: '#1a1a1a' })).join('');
  const sec = Math.floor(prog(u, 1.8, 11) * 340);
  const counter = card(540, 300, 520, 150, `<text y="56" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="5" fill="#9FB7C6">СЧИТАЕТ СЕКУНДЫ</text>
    <text y="122" text-anchor="middle" font-family="Inter" font-size="56" fill="#fff">${sec}</text>`, prog(u, 2.0, 2.4) * (1 - prog(u, 7.6, 7.9)));
  const call = card(540, 300, 560, 160, `<rect x="-230" y="40" width="60" height="96" rx="12" fill="none" stroke="#fff" stroke-width="5"/>
    <text x="-140" y="80" font-family="Mono" font-size="24" letter-spacing="4" fill="#9FB7C6">ВОДИТЕЛЬ СЗАДИ</text>
    <text x="-140" y="132" font-family="Inter" font-size="46" fill="${GREEN}">ЗВОНИТ 112</text>`, prog(u, 9.2, 9.6) * (1 - prog(u, 11.2, 11.5)));
  return camera(world + ov, { t, zoom: lerp(1.0, 0.95, u / 15), cx: 620, cy: lerp(1450, 1000, ease(prog(u, 1.8, 7.2))), shake: 0.8 }) + vign + counter + call
    + (u > 11.3 ? checklist(['ДЫШАТЬ РОВНО', 'СИГНАЛ НАРУЖУ', 'ЗАПОМНИТЬ ПУТЬ'], u, [11.6, 12.0, 12.4], 1300) : '')
    + hud('02:31 · МАРШРУТ', 'ШАГ 5 · ЗАПОМИНАТЬ') + subs(t, SUBS, 1700) + fill('#000', 1 - prog(u, 0, 0.2));
}

function sStop(t) {                          // 79.9–87.2: остановились, шаги, щелчок, крышка, фонарик
  const u = t - 79.9;
  const light = ease(prog(u, 4.1, 5.4));
  let world = trunk(u, { still: u > 0.8, light, look: lerp(0, -0.4, light), mood: 'scared', blink: blinkAt(u, 1.2) });
  const tk = prog(u, 2.7, 2.8) * (1 - prog(u, 3.6, 3.9));
  world += `<text x="540" y="560" text-anchor="middle" font-family="Inter" font-size="70" fill="#fff" opacity="${f1(tk)}">ЩЁЛК</text>`;
  const beam = prog(u, 5.6, 6.0);
  return camera(world, { t, zoom: lerp(1.0, 1.2, ease(prog(u, 0, 5.6))), cx: 540, cy: lerp(1000, 1150, light), shake: 1 + prog(u, 0, 0.5) * (1 - prog(u, 0.5, 0.9)) * 12 }) + vign
    + `<circle cx="520" cy="900" r="${f1(260 + beam * 900)}" fill="url(#beam)" opacity="${f1(beam)}"/>`
    + hud('02:40 · ОСТАНОВКА', 'ГРУНТОВКА', { color: RED }) + subs(t, SUBS, 1640);
}

function sOther(t) {                         // 87.2–95.0: водитель за рулём, мотор работает, у багажника — другой
  const u = t - 87.2;
  let world = `<rect x="-400" y="-400" width="2000" height="1800" fill="url(#skyN)"/>`;
  for (let i = 0; i < 14; i++) world += `<rect x="${-300 + i * 120}" y="${500 + rnd(i) * 200}" width="${40 + rnd(i + 2) * 40}" height="900" fill="#0A0F18"/><circle cx="${-280 + i * 120}" cy="${520 + rnd(i) * 200}" r="${90 + rnd(i + 4) * 50}" fill="#0C1320"/>`;
  world += `<rect x="-400" y="1180" width="2000" height="1200" fill="#1C1A16"/>`;
  world += car(640, 1380, 1.0, { u, lid: 1, driver: 1, smoke: 1 });
  world += `<g transform="translate(110 1340)"><path d="M-50 -10 Q -70 -170 -10 -240 Q 50 -260 70 -170 Q 90 -90 60 -10Z" fill="#05070A"/><circle cx="10" cy="-280" r="50" fill="#05070A"/>
    <line x1="40" y1="-180" x2="120" y2="-190" stroke="#05070A" stroke-width="24" stroke-linecap="round"/></g>
    <path d="M230 1150 L 560 1060 L 560 1300 Z" fill="#FFF6D8" opacity="${f1(0.25 + Math.sin(u * 2) * 0.05)}"/>`;
  const ov = tag(760, 830, 'ВОДИТЕЛЬ ЗА РУЛЁМ', { k: prog(u, 0.3, 0.7), size: 26, bg: GOLD, fg: '#1a1a1a', px: 760, py: 1120 })
    + tag(640, 1560, 'МОТОР РАБОТАЕТ', { k: prog(u, 2.4, 2.8), size: 26, bg: '#fff', fg: '#1a1a1a', px: 230, py: 1350 })
    + tag(130, 860, '?', { k: prog(u, 4.9, 5.2), size: 50, bg: RED, fg: '#fff', px: 120, py: 1050 });
  return camera(world + ov, { t, zoom: lerp(1.0, 1.15, ease(prog(u, 4.5, 7.8))), cx: lerp(560, 300, ease(prog(u, 4.5, 7.8))), cy: 1150, shake: 1 }) + vign
    + hud('02:41 · ЛЕС', 'КТО ЭТО?', { color: RED }) + subs(t, SUBS, 470) + fill('#000', 1 - prog(u, 0, 0.15));
}

function sEnd(t) {
  const u = t - 95.0, k = eout(prog(u, 0.1, 0.5));
  return fill('#05080B') + `<g opacity="${f1(k)}" transform="translate(0 ${f1((1 - k) * 30)})">
    <text x="540" y="820" text-anchor="middle" font-family="Mono" font-size="34" letter-spacing="14" fill="${GOLD}">ЧАСТЬ 2</text>
    <text x="540" y="960" text-anchor="middle" font-family="Inter" font-size="120" fill="#fff">КТО</text>
    <text x="540" y="1090" text-anchor="middle" font-family="Inter" font-size="120" fill="${RED}">ОТКРЫЛ?</text>
    <text x="540" y="1190" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="6" fill="#9FB7C6" opacity=".7">БАГАЖНИК · ПРОДОЛЖЕНИЕ СЛЕДУЕТ</text></g>`;
}

const SCENES = [[0, sHook], [6.5, sHandle], [10.7, sWake], [17.0, sBreath], [27.3, sLever], [B, sSeats], [51.2, sLights],
  [64.9, sRoute], [79.9, sStop], [87.2, sOther], [95.0, sEnd]];

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
