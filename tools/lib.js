// Общие приёмы монтажа: камера, субтитры, верхняя строка (HUD), плашки-метки, карточки.
const W = 1080, H = 1920, FPS = 30;
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const ease = k => { k = clamp(k); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const eout = k => 1 - Math.pow(1 - clamp(k), 3);
const back = k => { k = clamp(k); const c = 1.9; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };
const rnd = i => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const noise = (t, s = 0) => Math.sin(t * 1.7 + s) * 0.5 + Math.sin(t * 3.1 + s * 2.3) * 0.3 + Math.sin(t * 5.3 + s * 4.1) * 0.2;
const dir = a => [Math.sin(a * Math.PI / 180), Math.cos(a * Math.PI / 180)];   // 0° — вниз, 90° — вправо, 180° — вверх
const f1 = v => v.toFixed(1);

// Камера: медленный наезд/панорама + «ручная» тряска. cx, cy — точка мира в центре кадра.
function camera(body, { zoom = 1, cx = W / 2, cy = H / 2, rot = 0, shake = 0, t = 0 }) {
  const sx = noise(t * 6, 1) * shake, sy = noise(t * 6, 7) * shake;
  return `<g transform="translate(${f1(W / 2 + sx)} ${f1(H / 2 + sy)}) rotate(${rot.toFixed(2)}) scale(${zoom.toFixed(4)}) translate(${f1(-cx)} ${f1(-cy)})">${body}</g>`;
}

// Субтитры фразой (как в ролике про ферму): белый капс, ключевые слова цветом, появление с лёгким «поп».
const RED = '#E8483D', GOLD = '#F4B740', GREEN = '#4FC27A';
function subs(t, list, y = 1230) {
  const s = list.find(c => t >= c.a && t < c.b);
  if (!s) return '';
  const k = eout(prog(t, s.a, s.a + 0.14));
  const words = s.text.split(' '), lines = [[]];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if (cur.length && (cur.join(' ') + ' ' + w).length > (s.max || 20)) lines.push([w]); else cur.push(w);
  }
  y = Math.min(y, 1850 - (lines.length - 1) * 92);        // длинная фраза не уходит за низ экрана
  const keys = s.keys || {};
  const out = lines.map((ln, i) => `<text x="540" y="${y + i * 92}" text-anchor="middle">${ln.map(w => {
    const c = keys[w.replace(/[.,!?…:]/g, '')];
    return c ? `<tspan fill="${c}">${w}</tspan>` : w;
  }).join(' ')}</text>`).join('');
  const glow = `<ellipse cx="540" cy="${y - 28 + (lines.length - 1) * 46}" rx="440" ry="${60 + lines.length * 44}" fill="#000" opacity=".28" filter="url(#blur18)"/>`;
  return `<g transform="translate(540 ${y}) scale(${lerp(0.9, 1, k)}) translate(-540 ${-y})" opacity="${k}">${glow}<g
    font-family="Oswald" font-size="84" fill="#fff" letter-spacing="1" filter="url(#tshadow)"
    style="paint-order:stroke" stroke="rgba(0,0,0,.45)" stroke-width="9" stroke-linejoin="round">${out}</g></g>`;
}

// Верхняя строка: время · место (моно), под ней цветная плашка шага.
function hud(top, pill, { color = GOLD, k = 1 } = {}) {
  let s = `<ellipse cx="540" cy="180" rx="380" ry="70" fill="#000" opacity="${0.25 * k}" filter="url(#blur18)"/>`;
  s += `<text x="540" y="150" text-anchor="middle" font-family="Mono" font-size="30" letter-spacing="5"
    fill="#fff" opacity="${0.8 * k}">${top}</text>`;
  if (pill) s += tag(540, 205, pill, { bg: color, fg: '#1a1a1a', k, size: 30 });
  return s;
}

// Плашка-метка (пилюля) с необязательной стрелкой-выноской к точке (px, py).
function tag(x, y, text, { bg = '#fff', fg = '#16202a', k = 1, size = 28, px, py, line = '#fff' } = {}) {
  if (k <= 0) return '';
  const w = text.length * size * 0.66 + size * 1.4, h = size * 1.75;
  const sc = back(k);
  let lead = '';
  if (px !== undefined) {
    const ex = lerp(x, px, eout(k)), ey = lerp(y, py, eout(k));
    lead = `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(ex)}" y2="${f1(ey)}" stroke="${line}" stroke-width="3" stroke-dasharray="7 7" opacity=".85"/>
      <circle cx="${f1(ex)}" cy="${f1(ey)}" r="8" fill="${line}"/>`;
  }
  return `${lead}<g transform="translate(${f1(x)} ${f1(y)}) scale(${sc.toFixed(3)})" opacity="${clamp(k * 3)}">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${bg}" filter="url(#soft)"/>
    <text y="${size * 0.36}" text-anchor="middle" font-family="Inter" font-size="${size}" fill="${fg}" letter-spacing="1">${text}</text></g>`;
}

// Тёмная стеклянная карточка (как «ТЕЛО 36,5°»): подпись сверху, крупное значение, строка снизу.
function card(x, y, w, h, inner, k = 1) {
  if (k <= 0) return '';
  const dy = (1 - eout(k)) * 60;
  return `<g transform="translate(${x} ${y + dy})" opacity="${clamp(k * 2)}">
    <rect x="${-w / 2}" y="0" width="${w}" height="${h}" rx="26" fill="#0c1319" fill-opacity=".78" stroke="#ffffff" stroke-opacity=".10" stroke-width="2"/>
    ${inner}</g>`;
}

// Общие фильтры и градиенты для всех сцен.
const DEFS = `<filter id="tshadow" x="-20%" y="-50%" width="140%" height="200%"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#000" flood-opacity=".55"/></filter>
  <filter id="soft" x="-30%" y="-60%" width="160%" height="220%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity=".3"/></filter>
  <filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="blur18" x="-50%" y="-80%" width="200%" height="260%"><feGaussianBlur stdDeviation="18"/></filter>
  <radialGradient id="vign" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".65"/></radialGradient>`;

function frame(body, extraDefs = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${DEFS}${extraDefs}</defs>${body}</svg>`;
}

// Временно подменить цвета персонажа (другой герой — другая куртка/шапка).
function withPal(pal, fn) { const old = { ...LOOK }; Object.assign(LOOK, pal); const s = fn(); Object.assign(LOOK, old); return s; }

// Субтитры «караоке» (как в понравившемся пользователю ролике): обычный регистр, слова загораются по ходу фразы —
// сказанные белые, ещё не сказанные серые, ключевые — цветом. pill — белая плашка под текстом (для светлых сцен).
function subsK(t, list, y = 1250, { pill = false } = {}) {
  const s = list.find(c => t >= c.a && t < c.b);
  if (!s) return '';
  const words = s.text.split(' '), keys = s.keys || {};
  const k0 = eout(prog(t, s.a, s.a + 0.12)), span = Math.max(0.3, (s.b - s.a) * 0.75);
  const lines = [[]];
  for (const w of words) { const cur = lines[lines.length - 1]; if (cur.length && (cur.join(' ') + ' ' + w).length > (s.max || 24)) lines.push([w]); else cur.push(w); }
  y = Math.min(y, 1850 - (lines.length - 1) * 74);
  let i = 0;
  const body = lines.map((ln, li) => `<text x="540" y="${y + li * 74}" text-anchor="middle">${ln.map(w => {
    const on = t >= s.a + span * (i++ / words.length), c = keys[w.replace(/[.,!?…:«»]/g, '')];
    return `<tspan fill="${on ? (c || (pill ? '#14181D' : '#fff')) : (pill ? '#8A8F96' : '#8C9199')}">${w}</tspan>`;
  }).join(' ')}</text>`).join('');
  const wmax = Math.max(...lines.map(l => l.join(' ').length)) * 31 + 60;
  const bg = pill ? `<rect x="${f1(540 - wmax / 2)}" y="${y - 62}" width="${f1(wmax)}" height="${lines.length * 74 + 22}" rx="22" fill="#fff" opacity=".96"/>`
    : `<ellipse cx="540" cy="${y - 20 + (lines.length - 1) * 37}" rx="440" ry="${60 + lines.length * 36}" fill="#000" opacity=".3" filter="url(#blur18)"/>`;
  return `<g opacity="${f1(k0)}">${bg}<g font-family="Inter" font-size="58" ${pill ? '' : 'filter="url(#tshadow)"'}>${body}</g></g>`;
}
