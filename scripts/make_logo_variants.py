"""Generate transparent light/dark logo variants from the baked blue logo."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "logo-rse.png"
OUT_LIGHT = ROOT / "public" / "images" / "logo-rse-light.png"
OUT_DARK = ROOT / "public" / "images" / "logo-rse-dark.png"

# Slate-blue background from the original Wix logo export.
BG = (64, 92, 115)
DARK = (26, 26, 26)  # #1a1a1a charcoal


def coverage_from_blue(r: int, g: int, b: int) -> float:
    channels = []
    for value, bg in zip((r, g, b), BG):
        denom = 255 - bg
        if denom <= 0:
            continue
        channels.append((value - bg) / denom)
    if not channels:
        return 0.0
    return max(0.0, min(1.0, sum(channels) / len(channels)))


def make_variant(src: Image.Image, fg: tuple[int, int, int]) -> Image.Image:
    rgba = src.convert("RGBA")
    out = Image.new("RGBA", rgba.size, (0, 0, 0, 0))
    src_px = rgba.load()
    out_px = out.load()

    for y in range(rgba.height):
        for x in range(rgba.width):
            r, g, b, _a = src_px[x, y]
            alpha = int(round(coverage_from_blue(r, g, b) * 255))
            if alpha <= 0:
                continue
            out_px[x, y] = (fg[0], fg[1], fg[2], alpha)

    return out


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Missing source logo: {SRC}")

    src = Image.open(SRC)
    light = make_variant(src, (255, 255, 255))
    dark = make_variant(src, DARK)

    OUT_LIGHT.parent.mkdir(parents=True, exist_ok=True)
    light.save(OUT_LIGHT)
    dark.save(OUT_DARK)

    print(f"Saved {OUT_LIGHT.name} ({light.size[0]}x{light.size[1]})")
    print(f"Saved {OUT_DARK.name} ({dark.size[0]}x{dark.size[1]})")


if __name__ == "__main__":
    main()
