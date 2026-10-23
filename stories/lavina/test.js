// Тест 10 с: «Если вас накрыла лавина — не пытайтесь копать вверх».
// Сцены: 1) склон, лавина догоняет Артёма → белая вспышка; 2) разрез под снегом, «ВВЕРХ?» во все стороны;
// 3) крупный план в снежном кармане, таймер воздуха.
const DUR = 10;
const SUBS = [
  { a: 0.25, b: 1.95, text: 'ЕСЛИ ВАС НАКРЫЛА ЛАВИНА', keys: { 'ЛАВИНА': RED } },
  { a: 1.95, b: 3.75, text: 'НЕ ПЫТАЙТЕСЬ КОПАТЬ ВВЕРХ', keys: { 'ВВЕРХ': GOLD } },
  { a: 4.15, b: 5.4, text: 'ПОД СНЕГОМ ВЫ ДАЖЕ', keys: {} },
  { a: 5.4, b: 6.85, text: 'НЕ ЗНАЕТЕ, ГДЕ ВЕРХ', keys: { 'ВЕРХ': GOLD } },
  { a: 7.05, b: 8.45, text: 'У АРТЁМА ЕСТЬ', keys: {} },
  { a: 8.45, b: 10, text: '15 МИНУТ', keys: { '15': RED, 'МИНУТ': RED } },
];
const T2 = 3.9, T3 = 6.9;

// ---------- сцена 1: склон ----------
const SLOPE = 23.5, ys = x => 860 + 0.435 * (x + 300);
const defs1 = `<linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4E6577"/><stop offset=".55" stop-color="#8A9DAA"/><stop offset="1" stop-color="#B7C3CB"/></linearGradient>
  <linearGradient id="snow1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCE4EA"/><stop offset="1" stop-color="#AFC0CC"/></linearGradient>
  <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2B4352"/><stop offset="1" stop-color="#121E26"/></linearGradient>
  <radialGradient id="pocket" cx="50%" cy="42%" r="60%"><stop offset="0" stop-color="#3E5C6E"/><stop offset="1" stop-color="#162630"/></radialGradient>`;

function mountains() {
  const far = [[-200, 900], [80, 520], [260, 700], [470, 430], [700, 720], [880, 560], [1100, 760], [1300, 900]];
  const near = [[-200, 980], [150, 700], [380, 900], [620, 760], [900, 960], [1300, 1000]];
  const poly = (pts, c) => `<polygon points="${pts.map(p => p.join(',')).join(' ')} 1300,2200 -200,2200" fill="${c}"/>`;
  let caps = '';
  for (let i = 1; i < far.length - 1; i += 2) {
    const [x, y] = far[i];
    caps += `<polygon points="${x},${y} ${x - 70},${y + 90} ${x - 30},${y + 70} ${x},${y + 100} ${x + 40},${y + 75} ${x + 80},${y + 95}" fill="#E4EAEE"/>`;
  }
  return poly(far, '#6C8292') + caps + poly(near, '#8297A5');
}

function pine(x, y, h, c = '#2C463F') {
  let s = `<rect x="${x - 6}" y="${y - 20}" width="12" height="26" fill="#3B2E28"/>`;
  for (let i = 0; i < 3; i++) {
    const w = h * (0.42 - i * 0.09), yy = y - 14 - i * h * 0.26;
    s += `<polygon points="${x - w},${yy} ${x + w},${yy} ${x},${yy - h * 0.42}" fill="${c}"/>`;
  }
  return s + `<polygon points="${x},${y - h * 0.95} ${x - h * 0.12},${y - h * 0.74} ${x + h * 0.12},${y - h * 0.74}" fill="#EEF2F4" opacity=".9"/>`;
}

function avalanche(t) {
  const xf = lerp(-320, 820, Math.pow(t / 3.8, 1.35));
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
  return { svg: bed + shade + white + spray, xf };
}

function scene1(t) {
  const k = t / T2;
  const av = avalanche(t);
  const rx = lerp(430, 650, k), sp = [rx, ys(rx)], up = dir(180 + 14);
  const hip = [sp[0] + up[0] * 128, sp[1] + up[1] * 128];
  const bob = Math.sin(t * 9) * 3, scared = t > 1.2;
  const board = `<rect x="-120" y="118" width="240" height="26" rx="13" fill="#1F2A33" transform="rotate(${SLOPE - 14} 0 130)"/>
    <rect x="-112" y="121" width="224" height="7" rx="3" fill="#E8483D" transform="rotate(${SLOPE - 14} 0 130)"/>`;
  const rider = person({ x: hip[0], y: hip[1] + bob, s: 1, rot: 14, lean: -8,
    legB: [52, -4], legF: [-38, 18], armB: [-70, -100], armF: [95, 70], look: -1, mood: scared ? 'scared' : 'calm', under: board });
  let trees = '';
  [[150, 0.9], [330, 1], [880, 1.1], [1010, 0.95], [-60, 0.85]].forEach(([x, sc], i) => { trees += pine(x, ys(x) + 30 + i * 6, 170 * sc); });
  const trail = `<path d="M${rx - 400} ${ys(rx - 400) + 6} L${rx - 80} ${ys(rx - 80) + 4}" stroke="#9FB1BE" stroke-width="10" stroke-linecap="round" opacity=".7"/>`;
  const world = `<rect x="-400" y="-400" width="1900" height="2400" fill="url(#sky1)"/>${mountains()}
    <polygon points="-400,${ys(-400)} 1500,${ys(1500)} 1500,2600 -400,2600" fill="url(#snow1)"/>
    <polygon points="-400,${ys(-400) + 220} 1500,${ys(1500) + 220} 1500,2600 -400,2600" fill="#9DB0BE" opacity=".35"/>
    ${trees}${trail}${rider}${av.svg}`;
  const cam = camera(world, { t, zoom: lerp(1.0, 1.2, ease(k)), cx: lerp(560, 640, k), cy: lerp(1010, 1090, k),
    rot: lerp(0, -2, k), shake: 2 + 18 * prog(t, 1.4, 3.6) });
  const white = prog(t, 3.25, 3.8);
  return cam + `<rect width="${W}" height="${H}" fill="url(#vign)"/>`
    + hud('14:32 · ВНЕ ТРАССЫ', 'СКЛОН 38°', { k: eout(prog(t, 0.1, 0.5)) })
    + subs(t, SUBS, 640) + `<rect width="${W}" height="${H}" fill="#F4F7F9" opacity="${white}"/>`;
}

// ---------- сцена 2: разрез под снегом ----------
function layers() {
  let s = '';
  const cols = ['#2F4A5A', '#2A4352', '#253C4A', '#203542', '#1B2E3A', '#172833'];
  cols.forEach((c, i) => {
    const y0 = 380 + i * 270;
    let d = `M-300 ${y0}`;
    for (let x = -300; x <= 1400; x += 60) d += ` L${x} ${f1(y0 + Math.sin(x / 140 + i * 1.7) * 22 + Math.sin(x / 47 + i) * 6)}`;
    s += `<path d="${d} L1400 2400 L-300 2400Z" fill="${c}"/>`;
  });
  for (let i = 0; i < 140; i++) s += `<circle cx="${f1(rnd(i) * 1500 - 200)}" cy="${f1(400 + rnd(i + 7) * 1900)}" r="${f1(2 + rnd(i + 3) * 5)}" fill="#9FB7C6" opacity="${f1(0.08 + rnd(i + 1) * 0.18)}"/>`;
  return s;
}

function ruler(depthY) {
  let s = `<line x1="70" y1="380" x2="70" y2="1700" stroke="#9FB7C6" stroke-opacity=".5" stroke-width="3"/>`;
  for (let m = 0; m <= 3; m++) {
    const y = 380 + m * 430;
    s += `<line x1="56" y1="${y}" x2="92" y2="${y}" stroke="#9FB7C6" stroke-opacity=".7" stroke-width="3"/>
      <text x="104" y="${y + 10}" font-family="Mono" font-size="26" fill="#9FB7C6" opacity=".8">${m} М</text>`;
    if (m < 3) for (let j = 1; j < 4; j++) s += `<line x1="62" y1="${y + j * 107}" x2="78" y2="${y + j * 107}" stroke="#9FB7C6" stroke-opacity=".4" stroke-width="2"/>`;
  }
  return s + `<polygon points="72,${depthY} 100,${depthY - 16} 100,${depthY + 16}" fill="${GOLD}"/>
    <text x="112" y="${depthY + 10}" font-family="Mono" font-size="28" fill="${GOLD}">1,5 М</text>`;
}

function scene2(t) {
  const u = t - T2;
  const px = 560, py = 1010;
  const body = person({ x: px, y: py, s: 1.5, rot: 148 + 10 * Math.sin(u * 0.9), lean: 25,
    legB: [60, -30], legF: [20, -60], armB: [150, 200], armF: [170, 215], look: Math.sin(u * 2.2) * 0.8, mood: 'scared', pack: true });
  const rays = [0, 1, 2, 3].map(i => `<polygon points="${200 + i * 230},0 ${300 + i * 230},0 ${380 + i * 230},1100 ${180 + i * 230},1100"
    fill="#BFD3DE" opacity="${f1(0.05 + 0.03 * Math.sin(u * 1.3 + i))}"/>`).join('');
  const world = `<rect x="-300" y="-300" width="1700" height="2600" fill="url(#deep)"/>
    <rect x="-300" y="-300" width="1700" height="680" fill="#5E7888"/>${layers()}${rays}
    <ellipse cx="${px}" cy="${py - 10}" rx="230" ry="200" fill="#3B5869" opacity=".55" filter="url(#blur18)"/>${body}`;
  const tags = [[290, 650, 0.5], [800, 720, 0.8], [830, 1320, 1.1], [280, 1290, 1.4]].map(([x, y, a], i) => {
    const k = prog(u, a, a + 0.35), wob = Math.sin(u * 3 + i) * 6;
    return tag(x + wob, y, 'ВВЕРХ?', { k, size: 34, px: lerp(x, px, 0.55), py: lerp(y, py, 0.55), bg: '#F4F7F9' });
  }).join('');
  const cam = camera(world + tags, { t, zoom: lerp(1.35, 1.03, ease(u / 1.7)), cx: px, cy: lerp(py, 1000, u / 3), rot: 3 * Math.sin(u * 0.8), shake: 2 });
  return cam + ruler(1000) + `<rect width="${W}" height="${H}" fill="url(#vign)"/>`
    + hud('14:32 · ПОД ЛАВИНОЙ', 'ГДЕ ВЕРХ?', { color: RED }) + subs(t, SUBS, 1560)
    + `<rect width="${W}" height="${H}" fill="#F4F7F9" opacity="${1 - prog(t, T2, T2 + 0.5)}"/>`;
}

// ---------- сцена 3: крупный план в снежном кармане ----------
function scene3(t) {
  const u = t - T3;
  const hx = 540, hy = 960, r = 215;
  let pocket = `<rect width="${W}" height="${H}" fill="#0E171D"/>
    <ellipse cx="${hx}" cy="${hy + 40}" rx="430" ry="470" fill="url(#pocket)"/>`;
  for (let i = 0; i < 90; i++) {
    const a = rnd(i) * Math.PI * 2, rr = 420 + rnd(i + 2) * 260;
    pocket += `<circle cx="${f1(hx + Math.cos(a) * rr)}" cy="${f1(hy + 40 + Math.sin(a) * rr * 1.08)}" r="${f1(70 + rnd(i + 5) * 110)}" fill="${i % 2 ? '#1A2C37' : '#20343F'}"/>`;
  }
  for (let i = 0; i < 60; i++) pocket += `<circle cx="${f1(rnd(i + 40) * W)}" cy="${f1(rnd(i + 80) * H)}" r="${f1(2 + rnd(i) * 4)}" fill="#BFD3DE" opacity="${f1(0.1 + rnd(i + 3) * 0.25)}"/>`;
  const look = u < 1.2 ? lerp(-0.6, 0.5, ease(u / 1.2)) : lerp(0.5, -0.2, ease((u - 1.6) / 0.8));
  const blink = Math.max(0, 1 - Math.abs(u - 1.85) / 0.09);
  const face = `<g transform="rotate(${f1(-10 + Math.sin(u * 1.4) * 1.5)} ${hx} ${hy})">
    <path d="M${hx - 330} ${hy + 520} Q${hx - 300} ${hy + 230} ${hx} ${hy + 240} Q${hx + 300} ${hy + 230} ${hx + 330} ${hy + 520}Z" fill="${LOOK.jacket}"/>
    <path d="M${hx - 140} ${hy + 250} L${hx} ${hy + 330} L${hx + 140} ${hy + 250}" fill="none" stroke="${LOOK.jacketD}" stroke-width="26" stroke-linecap="round"/>
    ${head(hx, hy, r, { look, blink, mood: 'scared', frost: 1 })}</g>`;
  let breath = '';
  for (let j = 0; j < 3; j++) {
    const ph = (u - j * 1.1) / 1.1;
    if (ph < 0 || ph > 1) continue;
    for (let i = 0; i < 5; i++) breath += `<circle cx="${f1(hx + 40 + ph * 160 + i * 18)}" cy="${f1(hy + 120 - ph * 220 - i * 12)}" r="${f1(14 + ph * 40 + i * 4)}"
      fill="#DDE7ED" opacity="${f1(0.22 * (1 - ph))}" filter="url(#blur6)"/>`;
  }
  let fore = '';
  for (let i = 0; i < 14; i++) fore += `<circle cx="${f1(i * 90 - 40)}" cy="${f1(1520 + rnd(i) * 120)}" r="${f1(150 + rnd(i + 9) * 90)}" fill="#152530"/>`;
  const world = pocket + face + breath + fore;
  const cam = camera(world, { t, zoom: lerp(1.02, 1.12, ease(u / 3.1)), cx: 540, cy: 960, shake: 2.5 });
  const sec = Math.max(0, 900 - Math.floor(u * 1.0) - (u > 0.4 ? 1 : 0));
  const mm = String(Math.floor(sec / 60)).padStart(2, '0'), ss = String(sec % 60).padStart(2, '0');
  const kc = prog(u, 0.35, 0.8), bar = 470 * (sec / 900) * (1 - u * 0.004);
  const timer = card(540, 1430, 520, 200, `
    <text x="0" y="48" text-anchor="middle" font-family="Mono" font-size="26" letter-spacing="6" fill="#9FB7C6">ВОЗДУХ</text>
    <text x="0" y="132" text-anchor="middle" font-family="Inter" font-size="84" fill="${RED}">${mm}:${ss}</text>
    <rect x="-235" y="160" width="470" height="12" rx="6" fill="#fff" opacity=".1"/>
    <rect x="-235" y="160" width="${f1(bar)}" height="12" rx="6" fill="${RED}"/>`, kc);
  const name = tag(860, 1180, 'АРТЁМ, 27', { k: prog(u, 0.25, 0.6), size: 32, px: 720, py: 1060 });
  return cam + `<rect width="${W}" height="${H}" fill="url(#vign)"/>` + name + timer
    + hud('14:33 · ГЛУБИНА 1,5 М', 'ПОД ЛАВИНОЙ', { color: RED }) + subs(t, SUBS, 470)
    + `<rect width="${W}" height="${H}" fill="#000" opacity="${f1(prog(t, 9.65, 10))}"/>`;
}

function render(t) {
  const flash = t >= T3 && t < T3 + 0.12 ? `<rect width="${W}" height="${H}" fill="#fff" opacity="${f1(0.35 * (1 - (t - T3) / 0.12))}"/>` : '';
  return frame((t < T2 ? scene1(t) : t < T3 ? scene2(t) : scene3(t)) + flash, defs1);
}
