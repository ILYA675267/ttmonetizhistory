"""Тихая спокойная музыка под историю — синтезируется целиком (без чужих треков и жалоб).

python3 tools/music.py <выход.wav> <длительность_с> [muffle_с] [rumble_с0,rumble_с1] [seed]

Мягкий пэд Dm – B♭ – F – C (по 2,5 с), низкий гул, редкие «колокольчики», реверберация.
muffle — с этой секунды звук глухой (как под снегом / под водой). rumble — гул лавины на отрезке.
"""
import math
import subprocess
import sys

import numpy as np

SR = 44100


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def lowpass(x, cutoff):
    a = math.exp(-2 * math.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):          # простая однополюсная фильтрация (короткие ролики — быстро)
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y


def reverb(x, wet=0.35):
    out = x.copy()
    for d, g in [(0.031, .5), (0.053, .42), (0.079, .36), (0.113, .3), (0.167, .24), (0.241, .18), (0.353, .12)]:
        n = int(d * SR)
        out[n:] += x[:-n] * g * wet
    return out


def main():
    out, dur = sys.argv[1], float(sys.argv[2])
    muffle = float(sys.argv[3]) if len(sys.argv) > 3 and sys.argv[3] != '-' else None
    rumble = tuple(map(float, sys.argv[4].split(','))) if len(sys.argv) > 4 and sys.argv[4] != '-' else None
    rng = np.random.default_rng(int(sys.argv[5]) if len(sys.argv) > 5 else 3)
    n = int(dur * SR)
    t = np.arange(n) / SR
    chords = [[50, 57, 62, 65, 69], [46, 53, 58, 62, 65], [41, 48, 53, 57, 60], [48, 55, 60, 64, 67]]
    step = 2.5
    pad = np.zeros(n)
    for ci in range(int(dur / step) + 2):
        a0 = ci * step - 0.6
        env = np.clip((t - a0) / 1.2, 0, 1) * np.clip((a0 + step + 1.4 - t) / 1.2, 0, 1)
        env = env ** 1.5
        for note in chords[ci % 4]:
            f = midi(note)
            for det in (-0.003, 0.003):
                pad += env * (np.sin(2 * np.pi * f * (1 + det) * t) + 0.25 * np.sin(4 * np.pi * f * (1 + det) * t)) / 10
    drone = 0.35 * np.sin(2 * np.pi * midi(38) * t) * (0.8 + 0.2 * np.sin(2 * np.pi * 0.15 * t))
    bells = np.zeros(n)
    notes = [74, 77, 81, 79, 72, 76]
    for i, bt in enumerate(np.arange(1.25, dur, 1.25 * 2)):
        f = midi(notes[i % len(notes)])
        s = int(bt * SR)
        k = np.arange(n - s) / SR
        bells[s:] += 0.22 * np.exp(-k * 1.6) * (np.sin(2 * np.pi * f * k) + 0.3 * np.sin(2 * np.pi * 2.01 * f * k))
    mix = reverb(pad + drone + bells, 0.5)
    if rumble:
        r0, r1 = rumble
        noise = lowpass(rng.standard_normal(n), 90) * 6
        env = np.clip((t - r0) / (r1 - r0), 0, 1) ** 2 * (t < r1 + 0.05)
        mix += noise * env * 1.2
    if muffle is not None:
        dull = lowpass(mix, 380)
        k = np.clip((t - muffle) / 0.25, 0, 1)
        mix = mix * (1 - k) + dull * k * 1.6
    fade = np.clip(t / 1.0, 0, 1) * np.clip((dur - t) / 1.2, 0, 1)
    mix *= fade
    mix = mix / (np.abs(mix).max() + 1e-9) * 10 ** (-12 / 20)    # тихо: пик −12 дБ
    pcm = (np.stack([mix, mix], 1) * 32767).astype(np.int16)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '2', '-i', '-', out],
                   input=pcm.tobytes(), check=True)


if __name__ == '__main__':
    main()
