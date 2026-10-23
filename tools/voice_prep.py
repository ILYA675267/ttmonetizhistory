"""Голос к ролику: части озвучки (1.mp3 … N.mp3) → обрезка тишины → укорачивание длинных пауз → время слов → склейка.

python3 tools/voice_prep.py <папка_истории> <часть1.mp3> <часть2.mp3> ... [--gap 0.32] [--maxpause 0.4] [--speed 1.0]

Паузы режутся только по ГРОМКОСТИ: после конца звука остаётся ≥ 0,27 с (окончания слов не срезаются).
--speed — ускорение речи без изменения высоты голоса (ffmpeg atempo), чтобы уложиться в длину ролика.
Создаёт в папке: voice.wav (громкость −14 LUFS), words.json [{w, s, e, part}], parts.json [{part, s, e}].
"""
import json
import os
import subprocess
import sys

import numpy as np

SR = 44100
HOP = 441          # 10 мс


def load(p, sr=SR):
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", p, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def levels(x):
    n = len(x) // HOP
    return 20 * np.log10(np.sqrt(np.mean(x[:n * HOP].reshape(n, HOP) ** 2, 1)) + 1e-9)


def tighten(x, maxpause, thr=-45.0):
    db = levels(x)
    loud = db > thr
    idx = np.where(loud)[0]
    x = x[max(0, idx[0] * HOP - int(0.03 * SR)):min(len(x), (idx[-1] + 1) * HOP + int(0.2 * SR))]
    loud = levels(x) > thr
    keep = np.ones(len(x), bool)
    i, n = 0, len(loud)
    while i < n:
        if loud[i]:
            i += 1
            continue
        j = i
        while j < n and not loud[j]:
            j += 1
        s, e = i / 100, j / 100
        if i > 0 and j < n and e - s > maxpause:
            a = s + 0.27
            b = e - max(0.08, maxpause - 0.27)
            if b - a > 0.02:
                keep[int(a * SR):int(b * SR)] = False
        i = j
    y = x[keep]
    f = int(0.01 * SR)
    y[:f] *= np.linspace(0, 1, f)
    y[-f:] *= np.linspace(1, 0, f)
    return y


def words_of(model, y):
    a = subprocess.run(["ffmpeg", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                        "-ar", "16000", "-f", "f32le", "-"], input=y.tobytes(), capture_output=True, check=True).stdout
    segs, _ = model.transcribe(np.frombuffer(a, np.float32), language="ru", word_timestamps=True)
    return [{"w": w.word.strip(), "s": w.start, "e": w.end} for s in segs for w in s.words]


def main():
    args = sys.argv[1:]
    opt = {"--gap": 0.32, "--maxpause": 0.4, "--speed": 1.0}
    for k in list(opt):
        if k in args:
            i = args.index(k)
            opt[k] = float(args[i + 1])
            del args[i:i + 2]
    folder, parts = args[0], args[1:]
    from faster_whisper import WhisperModel
    model = WhisperModel("small", device="cpu", compute_type="int8")
    out, words, spans, t = [np.zeros(int(0.2 * SR), np.float32)], [], [], 0.2
    for pi, p in enumerate(parts, 1):
        y = tighten(load(p), opt["--maxpause"])
        if opt["--speed"] != 1.0:
            y = np.frombuffer(subprocess.run(["ffmpeg", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                                              "-af", f"atempo={opt['--speed']}", "-f", "f32le", "-"],
                                             input=y.tobytes(), capture_output=True, check=True).stdout, np.float32).copy()
        ws = words_of(model, y)
        print(f"часть {pi}: {len(load(p)) / SR:.1f} → {len(y) / SR:.1f} с |", " ".join(w["w"] for w in ws))
        for w in ws:
            words.append({"w": w["w"], "s": round(w["s"] + t, 3), "e": round(w["e"] + t, 3), "part": pi})
        spans.append({"part": pi, "s": round(t, 3), "e": round(t + len(y) / SR, 3)})
        out.append(y)
        t += len(y) / SR
        out.append(np.zeros(int(opt["--gap"] * SR), np.float32))
        t += opt["--gap"]
    out.append(np.zeros(int(0.5 * SR), np.float32))
    y = np.concatenate(out)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                    "-af", "loudnorm=I=-14:TP=-1.2:LRA=9", "-ar", str(SR), os.path.join(folder, "voice.wav")],
                   input=y.tobytes(), check=True)
    json.dump(words, open(os.path.join(folder, "words.json"), "w"), ensure_ascii=False, indent=0)
    json.dump(spans, open(os.path.join(folder, "parts.json"), "w"), indent=1)
    print(f"итого {len(y) / SR:.1f} с")


if __name__ == "__main__":
    main()
