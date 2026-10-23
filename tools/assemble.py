"""Сборка ролика: кадры + голос + музыка + баннер (вариант А — стоп-кадр).

python3 tools/assemble.py <папка_кадров> <voice.wav> <music.wav> <секунда_баннера> <выход.mp4> [баннер.mp4] [ширина=1040] [громкость_музыки=0.35]

Кадры уже содержат стоп-кадр (сцена рендерит паузу сама). Здесь: баннер по центру с секунды B (зелёный фон убирается,
длина и скорость баннера — как в файле, звук баннера из файла, +6 дБ как раньше), голос и музыка на паузе молчат,
после баннера продолжаются с того же места. Итог — сразу совместимая версия для телефона.
"""
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AD = os.path.join(ROOT, "assets", "ads", "natria_vpn.mp4")
AD_GAIN = 2.0
MUSIC_VOL = 0.35


def duration(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p],
                                capture_output=True, text=True, check=True).stdout)


def main():
    frames, voice, music, b, out = sys.argv[1:6]
    ad = sys.argv[6] if len(sys.argv) > 6 else AD
    width = int(sys.argv[7]) if len(sys.argv) > 7 else 1040
    mvol = float(sys.argv[8]) if len(sys.argv) > 8 else MUSIC_VOL
    b = float(b)
    ad_len = duration(ad)
    au = "aformat=sample_rates=48000:channel_layouts=stereo"
    story = duration(music)                            # музыка = длина истории без баннера
    graph = (
        f"[1:a]{au},apad=whole_dur={story}[v];[2:a]{au},volume={mvol}[m];[v][m]amix=inputs=2:normalize=0:duration=first,asplit[s1][s2];"
        f"[s1]atrim=0:{b},asetpts=PTS-STARTPTS,afade=t=out:st={b - 0.08}:d=0.08[a1];"
        f"[s2]atrim=start={b},asetpts=PTS-STARTPTS,afade=t=in:d=0.08[a3];"
        f"[3:a]{au},volume={AD_GAIN}[a2];[a1][a2][a3]concat=n=3:v=0:a=1,alimiter=limit=0.9:level=disabled[a];"
        f"[3:v]chromakey=0x00FF00:0.25:0.05,despill=green,scale={width}:-1,setpts=PTS-STARTPTS+{b}/TB[ad];"
        f"[0:v][ad]overlay=(W-w)/2:(H-h)/2:eof_action=pass,format=yuv420p[vv]")
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-framerate", "30", "-i", os.path.join(frames, "f%04d.jpg"),
                    "-i", voice, "-i", music, "-i", ad, "-filter_complex", graph, "-map", "[vv]", "-map", "[a]",
                    "-c:v", "libx264", "-profile:v", "main", "-level:v", "4.1", "-preset", "slow", "-crf", "21", "-bf", "0",
                    "-g", "60", "-r", "30", "-c:a", "aac", "-b:a", "160k", "-ar", "48000", "-ac", "2",
                    "-movflags", "+faststart", out], check=True)
    print(f"готово: {out}, {duration(out):.2f} с (баннер {ad_len:.2f} с с {b} с)")


if __name__ == "__main__":
    main()
