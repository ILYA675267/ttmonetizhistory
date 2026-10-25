// @common — проба приёмов из понравившегося ролика (кадры для показа пользователю)
const DUR = 4;
const SUBS = makeSubs([[0, 'Тебе по ошибке прислали пять биткоинов.', { 'пять': GOLD, 'биткоинов.': GOLD }]], 4);
const render = t => frame(`<rect width="1080" height="1920" fill="#14111C"/>
  ${[...Array(9).keys()].map(i => `<rect x="640" y="${380 + i * 34}" width="440" height="16" fill="${NEON}" opacity=".55"/>`).join('')}
  <rect x="-100" y="1500" width="1300" height="500" fill="#1E1A28"/>
  ${glitch(withPal({ jacket: '#3E4A3A', jacketD: '#2E382C', hair: '#1A1A1A', hairShort: true, glove: SKIN }, () => person({ x: 540, y: 1360, s: 2.0, legB: [8, 0], legF: [-8, 0], armB: [40, 120], armF: [-40, -120], look: 0, mood: 'scared', pack: false })), 6, t)}
  ${statBar('02:47', 'БАЛАНС', '5 BTC', 0.15)}
  ${stamp(540, 760, 'НЕЛЬЗЯ', prog(t, 1.0, 1.3))}
  ${subsK(t, SUBS, 1700)}`, '');
