// Общие куски для новых историй (подключается, если в файле истории есть метка @common):
// стоп-кадр под баннер, финальный экран, плашки, чек-лист, крупный план, улица, город сверху, рация, телефон.
const vign = `<rect width="${W}" height="${H}" fill="url(#vign)"/>`;
const fill = (c, o = 1) => `<rect width="${W}" height="${H}" fill="${c}" opacity="${f1(o)}"/>`;
const blinkAt = (u, ...ts) => Math.max(0, ...ts.map(b => 1 - Math.abs(u - b) / 0.09));
const fadeIn = (u, d = 0.2) => fill('#000', 1 - prog(u, 0, d));

const DEFS_COMMON = `<linearGradient id="skyM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FA7B8"/><stop offset="1" stop-color="#D9D3C4"/></linearGradient>
  <linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1220"/><stop offset="1" stop-color="#22324A"/></linearGradient>
  <linearGradient id="room" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E3A36"/><stop offset="1" stop-color="#25221F"/></linearGradient>
  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C6E86"/><stop offset="1" stop-color="#123A4C"/></linearGradient>
  <linearGradient id="botShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></linearGradient>
  <radialGradient id="glowR" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${RED}" stop-opacity=".8"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${GREEN}" stop-opacity=".7"/><stop offset="1" stop-color="${GREEN}" stop-opacity="0"/></radialGradient>
  <radialGradient id="glowW" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFFBEA" stop-opacity="1"/><stop offset=".45" stop-color="#FFF2C4" stop-opacity=".55"/><stop offset="1" stop-color="#FFF2C4" stop-opacity="0"/></radialGradient>
  <filter id="onlyR"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter>
  <filter id="onlyGB"><feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter>
  <radialGradient id="lamp" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#F4C877" stop-opacity=".55"/><stop offset="1" stop-color="#F4C877" stop-opacity="0"/></radialGradient>`;

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

function bigCard(y, label, value, color, k, w = 600) {
  return card(540, y, w, 190, `<text y="60" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="5" fill="#9FB7C6">${label}</text>
    <text y="146" text-anchor="middle" font-family="Inter" font-size="72" fill="${color}">${value}</text>`, k);
}

// телефон крупно: экран рисует fn(w, h) в координатах экрана (0,0 — верхний левый угол)
function phone(x, y, s, rot, screen, light = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${f1(rot)}) scale(${s})"><rect x="-240" y="-470" width="480" height="940" rx="64" fill="#101317"/>
    <g transform="translate(-215 -440)"><rect width="430" height="880" rx="46" fill="#1C2733"/>${screen}</g>
    <rect x="-60" y="-454" width="120" height="22" rx="11" fill="#000"/>
    <ellipse cx="0" cy="0" rx="520" ry="700" fill="url(#lamp)" opacity="${f1(0.15 * light)}"/></g>`;
}
function bubble(x, y, w, lines, k, c = '#2B3A4A', fg = '#fff', size = 34) {
  if (k <= 0) return '';
  const h = 40 + lines.length * size * 1.3;
  return `<g transform="translate(${x} ${y + (1 - eout(k)) * 30})" opacity="${f1(clamp(k * 2))}"><rect width="${w}" height="${f1(h)}" rx="28" fill="${c}"/>
    ${lines.map((l, i) => `<text x="28" y="${f1(20 + size + i * size * 1.3)}" font-family="Inter" font-size="${size}" fill="${fg}">${l}</text>`).join('')}</g>`;
}

// улица сбоку (дома, окна, тротуар); night — ночь, lights — доля горящих окон
function street(u, { night = 0, lights = 1, x0 = 0, faces = 0 } = {}) {
  let s = `<rect x="-400" y="-400" width="2000" height="1700" fill="${night ? 'url(#skyN)' : 'url(#skyM)'}"/>`;
  [[-300, 420, 300], [20, 300, 260], [300, 520, 240], [560, 380, 300], [880, 460, 260], [1160, 340, 280]].forEach(([x, y, w], i) => {
    s += `<rect x="${x - x0 * 0.3}" y="${y}" width="${w}" height="${1300 - y}" fill="${night ? '#1A2333' : ['#B2A58E', '#9E9483', '#C2B49A'][i % 3]}"/>`;
    for (let r = 0; r < 10; r++) for (let c = 0; c < 4; c++) {
      const wx = x - x0 * 0.3 + 26 + c * (w - 40) / 4, wy = y + 40 + r * 90;
      if (wy > 1180) continue;
      const on = night && rnd(i * 50 + r * 4 + c) < 0.55 * lights;
      s += `<rect x="${f1(wx)}" y="${wy}" width="${f1((w - 80) / 4)}" height="50" rx="6" fill="${on ? '#F4C877' : night ? '#0F1520' : '#6E7F8E'}" opacity="${night ? 1 : 0.8}"/>`;
      if (faces && rnd(i * 70 + r * 3 + c) < faces) s += `<circle cx="${f1(wx + (w - 80) / 8)}" cy="${wy + 30}" r="12" fill="#2A2420"/><rect x="${f1(wx + (w - 80) / 8 + 10)}" y="${wy + 14}" width="10" height="16" rx="2" fill="#E8F0FF"/>`;
    }
  });
  s += `<rect x="-400" y="1300" width="2000" height="120" fill="${night ? '#2A2F36' : '#8E8A82'}"/><rect x="-400" y="1420" width="2000" height="700" fill="${night ? '#1C2026' : '#55595F'}"/>`;
  return s;
}

function carTop(x, y, rot, c) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-38" y="-80" width="76" height="160" rx="22" fill="${c}"/>
    <rect x="-30" y="-50" width="60" height="40" rx="10" fill="#2B3540"/><rect x="-30" y="20" width="60" height="34" rx="10" fill="#2B3540"/>
    <rect x="-34" y="70" width="18" height="8" rx="3" fill="${RED}"/><rect x="16" y="70" width="18" height="8" rx="3" fill="${RED}"/></g>`;
}

function radio(x, y, s, glow, u, wave = 0) {
  let w = '';
  for (let i = 0; i < 40; i++) { const h = wave * (10 + Math.abs(Math.sin(u * 14 + i * 0.7)) * 40 * (0.5 + 0.5 * Math.sin(i * 0.4 + u * 3))); w += `<rect x="${-160 + i * 8}" y="${f1(-h / 2)}" width="5" height="${f1(Math.max(2, h))}" rx="2" fill="${GREEN}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-26" y="-330" width="14" height="200" rx="6" fill="#1C232B"/>
    <rect x="-200" y="-150" width="400" height="300" rx="40" fill="#2A3138"/><rect x="-170" y="-120" width="340" height="120" rx="20" fill="#0C1A12"/>
    <rect x="-170" y="-120" width="340" height="120" rx="20" fill="${GREEN}" opacity="${f1(glow * 0.25)}"/>
    <g transform="translate(0 -60)">${w}</g>
    ${[...Array(6).keys()].map(i => `<line x1="${-150 + i * 30}" y1="40" x2="${-150 + i * 30}" y2="120" stroke="#1C232B" stroke-width="10" stroke-linecap="round"/>`).join('')}
    <circle cx="110" cy="70" r="40" fill="#1C232B"/><circle cx="110" cy="70" r="8" fill="${glow > 0.5 ? GREEN : '#555'}"/></g>`;
}

function seaWaves(y0, u, c = '#7FB8CC', n = 18, step = 70) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const y = y0 + 40 + i * step, x = ((rnd(i) * 1400 + u * (20 + i * 3)) % 1400) - 200;
    s += `<path d="M${f1(x)} ${y} q 30 -14 60 0 q 30 14 60 0" fill="none" stroke="${c}" stroke-width="5" opacity="${f1(0.25 + rnd(i + 3) * 0.3)}" stroke-linecap="round"/>`;
  }
  return s;
}

function endScreen(t, t0, word, footer) {
  const k = eout(prog(t - t0, 0.1, 0.5));
  return fill('#05080B') + `<g opacity="${f1(k)}" transform="translate(0 ${f1((1 - k) * 30)})">
    <text x="540" y="820" text-anchor="middle" font-family="Mono" font-size="34" letter-spacing="14" fill="${GOLD}">ЧАСТЬ 2</text>
    ${word.map((w, i) => `<text x="540" y="${960 + i * 130}" text-anchor="middle" font-family="Inter" font-size="${w.length > 9 ? 96 : 120}" fill="${i === word.length - 1 ? RED : '#fff'}">${w}</text>`).join('')}
    <text x="540" y="${1060 + word.length * 130 - 100}" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="6" fill="#9FB7C6" opacity=".7">${footer} · ПРОДОЛЖЕНИЕ СЛЕДУЕТ</text></g>`;
}

// SUBS из списка [секунда, текст, {слово: цвет}]
function makeSubs(list, end) {
  return list.map((s, i, a) => ({ a: s[0], b: i + 1 < a.length ? a[i + 1][0] : end, text: s[1], keys: s[2] || {} }));
}

// render() для истории: SCENES = [[начало, функция], …]; стоп-кадр на B, длина баннера AD
function makeRender(SCENES, B, AD, defs) {
  const story = t => { let i = SCENES.length - 1; while (SCENES[i][0] > t) i--; return SCENES[i][1](t); };
  return t => {
    if (t >= B && t < B + AD) {
      const k = (t - B) / AD, z = 1 + 0.03 * ease(k);
      return frame(`<g transform="translate(540 960) scale(${z.toFixed(4)}) translate(-540 -960)">${story(B - 1 / 30)}</g>${fill('#000', 0.35 * Math.min(1, k * 6, (1 - k) * 6))}`, DEFS_COMMON + defs);
    }
    return frame(story(t < B ? t : t - AD), DEFS_COMMON + defs);
  };
}

// ---- приёмы из понравившегося ролика (пользователь просил учитывать) ----
const NEON = '#FF3D8B';
// верхняя панель из трёх показателей (ВРЕМЯ · <ресурс> · РИСК с полоской) — держится весь ролик
function statBar(time, label, value, risk, { k = 1, riskLabel = 'РИСК' } = {}) {
  const rc = risk > 0.66 ? RED : risk > 0.33 ? GOLD : '#9FB7C6';
  return `<g opacity="${f1(k)}"><rect x="40" y="80" width="1000" height="120" rx="20" fill="#0C1117" fill-opacity=".85" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
    <text x="80" y="122" font-family="Mono" font-size="20" letter-spacing="4" fill="#5B6876">ВРЕМЯ</text><text x="80" y="172" font-family="Mono" font-size="40" fill="#fff">${time}</text>
    <text x="380" y="122" font-family="Mono" font-size="20" letter-spacing="4" fill="#5B6876">${label}</text><text x="380" y="172" font-family="Mono" font-size="40" fill="${GOLD}">${value}</text>
    <text x="660" y="122" font-family="Mono" font-size="20" letter-spacing="4" fill="#5B6876">${riskLabel}</text><text x="660" y="172" font-family="Mono" font-size="40" fill="${rc}">${Math.round(risk * 100)}%</text>
    <rect x="790" y="152" width="210" height="12" rx="6" fill="#fff" opacity=".1"/><rect x="790" y="152" width="${f1(210 * clamp(risk))}" height="12" rx="6" fill="${rc}"/></g>`;
}
// красный штамп с поворотом («НЕЛЬЗЯ», «ЗАБЛОКИРОВАНА»): влетает с увеличения
function stamp(x, y, text, k, { rot = -6, color = RED, size = 54 } = {}) {
  if (k <= 0) return '';
  const sc = lerp(1.8, 1, eout(k)), w = text.length * size * 0.68 + 60;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${f1(sc)})" opacity="${f1(clamp(k * 3))}">
    <rect x="${-w / 2}" y="${-size * 0.85}" width="${w}" height="${size * 1.5}" rx="10" fill="${color}"/><rect x="${-w / 2 + 8}" y="${-size * 0.85 + 8}" width="${w - 16}" height="${size * 1.5 - 16}" rx="6" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>
    <text y="${size * 0.32}" text-anchor="middle" font-family="Inter" font-size="${size}" fill="#fff" letter-spacing="2">${text}</text></g>`;
}
// неоновый «глитч» вокруг персонажа/объекта: красная и голубая копии со сдвигом
function glitch(svg, amt = 9, u = 0) {
  const j = amt * (1 + 0.6 * Math.sin(u * 23) * (Math.sin(u * 3.1) > 0.85 ? 3 : 0.2));
  return `<g filter="url(#onlyR)" opacity=".75" transform="translate(${f1(-j)} 0)">${svg}</g><g filter="url(#onlyGB)" opacity=".75" transform="translate(${f1(j)} 0)">${svg}</g>${svg}`;
}
// «мысль №N»: заголовок над вариантом, который сейчас разбираем
function thought(n, text, k) { return `<text x="540" y="290" text-anchor="middle" font-family="Mono" font-size="24" letter-spacing="6" fill="#8A8F96" opacity="${f1(k)}">МЫСЛЬ #${n} · ${text}</text>`; }
// финал-выбор: цветные кнопки + «решаете вы — в комментариях» + ЧАСТЬ 2
function choiceEnd(t, t0, options) {
  const u = t - t0, cols = [GREEN, GOLD, '#3E7CB1', NEON];
  return fill('#05080B', 0.85) + options.map((o, i) => { const k = prog(u, 0.2 + i * 0.35, 0.5 + i * 0.35), y = 640 + i * 150;
    return `<g opacity="${f1(k)}" transform="translate(540 ${f1(y + (1 - eout(k)) * 40)})"><rect x="-260" y="-56" width="520" height="112" rx="56" fill="${cols[i % 4]}"/>
      <text y="18" text-anchor="middle" font-family="Inter" font-size="48" fill="#fff">${o}</text></g>`; }).join('')
    + `<text x="540" y="${700 + options.length * 150}" text-anchor="middle" font-family="Inter" font-size="34" fill="#C9D2DA" opacity="${f1(prog(u, 1.4, 1.8))}">решаете вы — в комментариях</text>
    <text x="540" y="${800 + options.length * 150}" text-anchor="middle" font-family="Inter" font-size="72" fill="${NEON}" opacity="${f1(prog(u, 1.9, 2.3))}">ЧАСТЬ 2</text>`;
}
