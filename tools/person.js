// Персонаж в плоском стиле референсов: круглая голова, глаза-точки, без контуров, толстые скруглённые руки и ноги.
// Углы в градусах: 0 — вниз, 90 — вправо, 180 — вверх (в системе тела, до поворота rot).
const SKIN = '#EBC6A0', SKIN_D = '#D9AE86';
const LOOK = { jacket: '#E3732F', jacketD: '#C45B20', pants: '#33465A', pantsD: '#283849', glove: '#252A30',
  boot: '#2A2F36', hat: '#2E6E73', hatD: '#24585C', pom: '#ECE6DA', pack: '#8C3B2A', hair: null };   // hair — волосы вместо шапки

function limb(p, a1, l1, a2, l2, color, wid) {
  const [d1x, d1y] = dir(a1), [d2x, d2y] = dir(a2);
  const k = [p[0] + d1x * l1, p[1] + d1y * l1], e = [k[0] + d2x * l2, k[1] + d2y * l2];
  return { svg: `<path d="M${f1(p[0])} ${f1(p[1])}L${f1(k[0])} ${f1(k[1])}L${f1(e[0])} ${f1(e[1])}" fill="none" stroke="${color}"
    stroke-width="${wid}" stroke-linecap="round" stroke-linejoin="round"/>`, end: e };
}

// Голова отдельно — её же рисуем крупным планом. look: −1…1 (куда смотрит), blink: 0…1, mood: 'calm' | 'scared'.
function head(cx, cy, r, { look = 0, blink = 0, mood = 'calm', frost = 0, goggles = true } = {}) {
  const ex = look * r * 0.22, ey = r * 0.2, er = r * 0.085;
  const eh = Math.max(0.08, 1 - blink);
  const brow = mood === 'scared' ? 14 : 4;
  const hair = LOOK.hair;
  let s = `<g transform="translate(${f1(cx)} ${f1(cy)})">${hair ? `<rect x="${-r * 1.12}" y="${-r * 1.02}" width="${r * 2.24}" height="${r * 1.9}" rx="${r * 0.9}" fill="${hair}"/>` : ''}
    <rect x="${-r * 0.28}" y="${r * 0.7}" width="${r * 0.56}" height="${r * 0.5}" rx="${r * 0.1}" fill="${SKIN_D}"/>
    <circle r="${r}" fill="${SKIN}"/>
    <path d="M${r * 0.35} ${-r * 0.94} A${r} ${r} 0 0 1 ${r * 0.35} ${r * 0.94} A${r * 1.25} ${r * 1.25} 0 0 0 ${r * 0.35} ${-r * 0.94}Z" fill="#000" opacity=".06"/>
    <circle cx="${ex - r * 0.34}" cy="${ey + r * 0.2}" r="${r * 0.13}" fill="#E39B86" opacity=".35"/>
    <circle cx="${ex + r * 0.34}" cy="${ey + r * 0.2}" r="${r * 0.13}" fill="#E39B86" opacity=".35"/>
    <ellipse cx="${ex - r * 0.3}" cy="${ey}" rx="${er}" ry="${er * 1.15 * eh}" fill="#22252A"/>
    <ellipse cx="${ex + r * 0.3}" cy="${ey}" rx="${er}" ry="${er * 1.15 * eh}" fill="#22252A"/>
    <g stroke="#3A2E26" stroke-width="${r * 0.05}" stroke-linecap="round" opacity=".8">
      <line x1="${ex - r * 0.42}" y1="${ey - r * 0.2}" x2="${ex - r * 0.2}" y2="${ey - r * 0.2 - r * brow / 100}"/>
      <line x1="${ex + r * 0.42}" y1="${ey - r * 0.2}" x2="${ex + r * 0.2}" y2="${ey - r * 0.2 - r * brow / 100}"/></g>`;
  s += mood === 'scared'
    ? `<ellipse cx="${ex * 0.8}" cy="${r * 0.56}" rx="${r * 0.08}" ry="${r * 0.1}" fill="#5A3A30"/>`
    : `<line x1="${ex * 0.8 - r * 0.1}" y1="${r * 0.56}" x2="${ex * 0.8 + r * 0.1}" y2="${r * 0.56}" stroke="#5A3A30" stroke-width="${r * 0.05}" stroke-linecap="round"/>`;
  if (hair) s += `<path d="M${-r * 1.02} ${-r * 0.05} A${r * 1.03} ${r * 1.03} 0 0 1 ${r * 1.02} ${-r * 0.05} Q${r * 0.5} ${-r * 0.55} ${-r * 0.1} ${-r * 0.42} Q${-r * 0.6} ${-r * 0.35} ${-r * 1.02} ${-r * 0.05}Z" fill="${hair}"/>
    <path d="M${-r * 0.3} ${-r * 0.95} Q${r * 0.3} ${-r * 0.85} ${r * 0.7} ${-r * 0.6}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="${r * 0.08}" stroke-linecap="round"/>`;
  // шапка: купол + отворот + помпон
  else s += `<path d="M${-r * 1.04} ${-r * 0.12} A${r * 1.04} ${r * 1.04} 0 0 1 ${r * 1.04} ${-r * 0.12}Z" fill="${LOOK.hat}"/>
    <path d="M${r * 0.2} ${-r * 1.0} A${r * 1.04} ${r * 1.04} 0 0 1 ${r * 1.04} ${-r * 0.12} L${r * 0.6} ${-r * 0.12}Z" fill="#000" opacity=".08"/>
    <rect x="${-r * 1.1}" y="${-r * 0.34}" width="${r * 2.2}" height="${r * 0.3}" rx="${r * 0.15}" fill="${LOOK.hatD}"/>
    <circle cy="${-r * 1.12}" r="${r * 0.24}" fill="${LOOK.pom}"/>`;
  if (goggles && !hair) s += `<rect x="${-r * 1.08}" y="${-r * 0.62}" width="${r * 2.16}" height="${r * 0.12}" fill="#1E2227"/>
    <rect x="${-r * 0.62}" y="${-r * 0.78}" width="${r * 1.24}" height="${r * 0.42}" rx="${r * 0.2}" fill="#1E2227"/>
    <rect x="${-r * 0.55}" y="${-r * 0.72}" width="${r * 1.1}" height="${r * 0.3}" rx="${r * 0.15}" fill="#F0A13A"/>
    <rect x="${-r * 0.42}" y="${-r * 0.68}" width="${r * 0.3}" height="${r * 0.08}" rx="${r * 0.04}" fill="#fff" opacity=".6"/>`;
  if (frost > 0) for (let i = 0; i < 26; i++) {
    const a = rnd(i) * Math.PI, rr = r * (0.75 + rnd(i + 50) * 0.3);
    s += `<circle cx="${f1(Math.cos(a) * rr * -1)}" cy="${f1(-Math.sin(a) * rr - r * 0.12)}" r="${f1(r * (0.02 + rnd(i + 9) * 0.03))}" fill="#fff" opacity="${(0.8 * frost).toFixed(2)}"/>`;
  }
  return s + '</g>';
}

// Человек целиком. Поза: lean (наклон корпуса), armB/armF/legB/legF = [угол1, угол2] (задние/передние конечности).
function person({ x, y, s = 1, rot = 0, lean = 0, armB = [20, 10], armF = [-20, -10], legB = [10, 0], legF = [-10, 0],
  look = 0, blink = 0, mood = 'calm', pack = true, extra = '', under = '' }) {
  const hip = [0, 0], up = dir(180 + lean);
  const neck = [up[0] * 118, up[1] * 118], sh = [lerp(neck[0], 0, 0.12), lerp(neck[1], 0, 0.12)];
  const hd = dir(180 + lean * 1.2), hc = [neck[0] + hd[0] * 62, neck[1] + hd[1] * 62];
  const lb = limb(hip, legB[0], 74, legB[1], 72, LOOK.pantsD, 40), lf = limb(hip, legF[0], 74, legF[1], 72, LOOK.pants, 40);
  const ab = limb(sh, armB[0], 60, armB[1], 56, LOOK.jacketD, 32), af = limb(sh, armF[0], 60, armF[1], 56, LOOK.jacket, 32);
  const boot = (e, c) => `<ellipse cx="${f1(e[0] + 8)}" cy="${f1(e[1] + 4)}" rx="28" ry="16" fill="${c}"/>`;
  const hand = e => `<circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="17" fill="${LOOK.glove}"/>`;
  const pk = pack ? `<rect x="-78" y="${f1(neck[1] * 0.85)}" width="56" height="96" rx="20" fill="${LOOK.pack}" transform="rotate(${lean} 0 0)"/>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})">
    ${under}${pk}${ab.svg}${hand(ab.end)}${lb.svg}${boot(lb.end, LOOK.boot)}
    <path d="M0 0L${f1(sh[0])} ${f1(sh[1])}" stroke="${LOOK.jacket}" stroke-width="74" stroke-linecap="round"/>
    <path d="M${f1(sh[0] * 0.5 + 20)} ${f1(sh[1] * 0.5)}L${f1(sh[0] + 22)} ${f1(sh[1] + 8)}" stroke="${LOOK.jacketD}" stroke-width="18" stroke-linecap="round" opacity=".7"/>
    <rect x="-40" y="-14" width="80" height="20" rx="10" fill="${LOOK.pantsD}" transform="rotate(${lean} 0 0)"/>
    ${lf.svg}${boot(lf.end, LOOK.boot)}${extra}
    ${head(hc[0], hc[1], 50, { look, blink, mood })}
    ${af.svg}${hand(af.end)}</g>`;
}
