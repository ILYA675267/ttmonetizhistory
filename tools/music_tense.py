"""Тихая нагнетающая музыка (триллер-эмбиент) — синтез целиком, без чужих треков.

python3 tools/music_tense.py <выход.wav> <длина_с> [удары a,b,c] [гул a-b;c-d] [пульс_старт пульс_пик]

Низкий гул (D), диссонансный пэд (D–F–A♭ + E♭ «трение»), сердцебиение, которое к концу становится чаще и громче,
тихое тиканье, ветер. Удары — короткий «бум» с нарастающим вдохом перед ним (на ключевых моментах истории).
Гул — нарастающий рокот лавины. Пик −12 дБ (тихо, под голос).
"""
import subprocess
import sys

import numpy as np

SR = 44100


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def band(x, lo=0.0, hi=None):
    """Полосовой фильтр через БПФ (мягкие края)."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    m = np.ones_like(f)
    if lo:
        m *= 1 / (1 + (lo / np.maximum(f, 1e-3)) ** 4)
    if hi:
        m *= 1 / (1 + (f / hi) ** 4)
    return np.fft.irfft(X * m, len(x))


def reverb(x, wet=0.4):
    out = x.copy()
    for d, g in [(0.037, .5), (0.061, .42), (0.089, .36), (0.127, .3), (0.181, .24), (0.263, .18), (0.379, .13), (0.55, .08)]:
        n = int(d * SR)
        out[n:] += x[:-n] * g * wet
    return out


def main():
    out, dur = sys.argv[1], float(sys.argv[2])
    hits = [float(v) for v in sys.argv[3].split(',')] if len(sys.argv) > 3 and sys.argv[3] != '-' else []
    rumble = [tuple(map(float, r.split('-'))) for r in sys.argv[4].split(';')] if len(sys.argv) > 4 and sys.argv[4] != '-' else []
    p0, p1 = (float(sys.argv[5]), float(sys.argv[6])) if len(sys.argv) > 6 else (6.0, dur - 8)
    rng = np.random.default_rng(7)
    n = int(dur * SR)
    t = np.arange(n) / SR
    tension = np.clip((t - p0) / (p1 - p0), 0, 1)                 # 0 → 1: нагнетание к развязке

    # низкий гул: D1 + D2, пила через фильтр, медленное «дыхание»
    ph = 2 * np.pi * midi(26) * t
    saw = sum(np.sin(k * ph) / k for k in range(1, 9))
    drone = band(saw, hi=180) * (0.6 + 0.25 * np.sin(2 * np.pi * 0.07 * t)) + 0.5 * np.sin(2 * np.pi * midi(38) * t)

    # диссонансный пэд: D3 F3 A♭3, раз в 8 с — «трение» E♭4; медленные волны громкости
    pad = np.zeros(n)
    for note, amp in [(50, 1), (53, .8), (56, .7), (62, .45)]:
        for det in (-0.004, 0.004):
            pad += amp * np.sin(2 * np.pi * midi(note) * (1 + det) * t)
    pad *= 0.12 * (0.55 + 0.45 * np.sin(2 * np.pi * t / 8 - 1.2) ** 2)
    rub = 0.08 * np.sin(2 * np.pi * midi(63) * t) * np.clip(np.sin(2 * np.pi * t / 8) , 0, 1) ** 3
    pad = band(pad + rub, hi=1800)

    # сердцебиение: «тук-тук», чаще и громче с нагнетанием
    heart = np.zeros(n)
    bt = 1.5
    while bt < dur - 1:
        k = tension[int(bt * SR)]
        for off, a in ((0.0, 1.0), (0.24, 0.65)):
            s = int((bt + off) * SR)
            m = np.arange(min(int(0.35 * SR), n - s)) / SR
            heart[s:s + len(m)] += a * np.sin(2 * np.pi * (48 + 30 * np.exp(-m * 30)) * m) * np.exp(-m * 14) * (0.35 + 0.65 * k)
        bt += 60 / (62 + 30 * k)

    # тиканье (часы/таймер воздуха) — тихо, с 6,6 с
    tick = np.zeros(n)
    click = band(rng.standard_normal(int(0.02 * SR)), lo=2500, hi=7000) * np.exp(-np.arange(int(0.02 * SR)) / SR * 300)
    for i, tt in enumerate(np.arange(6.6, dur - 1, 1.0)):
        s = int(tt * SR)
        tick[s:s + len(click)] += click * (0.5 if i % 2 else 0.35)

    wind = band(rng.standard_normal(n), lo=300, hi=1400) * 0.05 * (0.6 + 0.4 * np.sin(2 * np.pi * 0.05 * t + 1))

    # удары: нарастающий «вдох» шума 1,2 с + низкий бум
    fx = np.zeros(n)
    swell_src = band(rng.standard_normal(n), lo=200, hi=3000)
    for h in hits:
        a, s = int((h - 1.2) * SR), int(h * SR)
        if a > 0:
            fx[a:s] += swell_src[a:s] * np.linspace(0, 1, s - a) ** 3 * 0.35
        m = np.arange(min(int(2.5 * SR), n - s)) / SR
        fx[s:s + len(m)] += 1.4 * np.sin(2 * np.pi * (36 + 40 * np.exp(-m * 8)) * m) * np.exp(-m * 2.2)
    noise = band(rng.standard_normal(n), hi=90) * 4
    for r0, r1 in rumble:
        env = np.clip((t - r0) / (r1 - r0), 0, 1) ** 2 * np.clip((r1 + 0.6 - t) / 0.6, 0, 1)
        fx += noise * env

    mix = reverb(drone * 0.55 + pad * (0.8 + 0.6 * tension) + wind, 0.5) + heart * 0.9 + tick * 0.6 + reverb(fx, 0.3)
    mix *= np.clip(t / 1.0, 0, 1) * np.clip((dur - t) / 1.5, 0, 1)
    mix = mix / (np.abs(mix).max() + 1e-9) * 10 ** (-12 / 20)
    pcm = (np.stack([mix, mix], 1) * 32767).astype(np.int16)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', out],
                   input=pcm.tobytes(), check=True)


if __name__ == '__main__':
    main()
