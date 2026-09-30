"""Download and process additional project images from old site."""

import json
import re
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public/images/projects"
RAW_DIR = OUT_DIR / "_raw"
TARGET_W, TARGET_H = 1200, 900
JPEG_QUALITY = 82

DOWNLOADS = [
    {
        "slug": "lower-basin-barracks",
        "url": "https://static.wixstatic.com/media/30c410_53349fcc410044f3ba62fb7ea7704e3b~mv2.jpg/v1/fill/w_2000,h_1500,al_c,q_90/30c410_53349fcc410044f3ba62fb7ea7704e3b~mv2.jpg",
        "title": "Massachusetts State Police Lower Basin Barracks",
        "location": "Boston, MA",
        "category": "Public & Civic",
        "description": "Structural engineering for the modernization and expansion of the State Police housed in the historic 1908 Lower Basin Gatehouse. The renovation respects the historic nature of the original building while providing new community and state police space.",
        "imageAlt": "Lower Basin Barracks — historic gatehouse with modern police facility addition at dusk",
        "naming_confidence": "Confirmed",
        "featured": False,
    },
]

MASS_TIMBER_URLS = [
    "https://www.rseassociates.com/mass-timber",
]


def fetch_html(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8", "ignore")


def extract_wix_ids(html: str) -> list[str]:
    ids = set()
    for match in re.findall(r"30c410_[a-f0-9]{32}~mv2\.(?:jpg|jpeg|png|webp)", html, re.I):
        base = match.split("~")[0]
        if "logo" not in base.lower():
            ids.add(base)
    return sorted(ids)


def high_res_url(media_id: str, ext: str = "jpg") -> str:
    return (
        f"https://static.wixstatic.com/media/{media_id}~mv2.{ext}"
        f"/v1/fill/w_2000,h_1500,al_c,q_90/{media_id}~mv2.{ext}"
    )


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        dest.write_bytes(resp.read())


def crop_resize(img: Image.Image) -> Image.Image:
    w, h = img.size
    target_ratio = TARGET_W / TARGET_H
    current_ratio = w / h
    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    return img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)


def process_to_jpg(raw_path: Path, out_path: Path) -> float:
    with Image.open(raw_path) as img:
        img = img.convert("RGB")
        img = crop_resize(img)
        img.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
    return out_path.stat().st_size / 1024


def main():
    mass_timber_projects = [
        {
            "id": "30c410_f130f2784c174955a4b50e5556d4236a",
            "slug": "walden-mass-timber-interior",
            "title": "Walden Mass Timber Interior",
            "location": "Massachusetts",
            "category": "Mass Timber",
            "description": "Mass timber structural engineering showcasing wood's natural beauty as a strong, low-carbon alternative to concrete and steel.",
            "imageAlt": "Walden mass timber interior — exposed wood structure",
            "naming_confidence": "Confirmed",
            "featured": False,
        },
        {
            "id": "30c410_93851f5254bd4b2a96de2b9636bae6a4",
            "slug": "mass-timber-structure",
            "title": "Mass Timber Structure",
            "location": "Massachusetts",
            "category": "Mass Timber",
            "description": "Structural engineering for a mass timber building demonstrating durable, low-carbon construction.",
            "imageAlt": "Mass timber structure — engineered wood framing",
            "naming_confidence": "Category-based",
            "featured": False,
        },
        {
            "id": "30c410_577802b1e9b6421b81f50ff3b1fd3a2f",
            "slug": "moore-square-park",
            "title": "Moore Square Park",
            "location": "Raleigh, NC",
            "category": "Mass Timber",
            "description": "Mass timber structural engineering for Moore Square Park — wood construction in a civic landscape setting.",
            "imageAlt": "Moore Square Park — mass timber civic structure",
            "naming_confidence": "Confirmed",
            "featured": False,
        },
    ]

    all_new = DOWNLOADS.copy()
    for p in mass_timber_projects:
        all_new.append({**p, "url": high_res_url(p["id"])})

    results = []
    for item in all_new:
        slug = item["slug"]
        raw_path = RAW_DIR / f"{slug}.jpg"
        out_path = OUT_DIR / f"{slug}.jpg"
        print(f"Downloading {slug}...")
        download(item["url"], raw_path)
        kb = process_to_jpg(raw_path, out_path)
        results.append({**{k: v for k, v in item.items() if k != "url"}, "imageSrc": f"/images/projects/{slug}.jpg", "size_kb": round(kb, 1)})
        print(f"  -> {out_path.name} ({kb:.0f} KB)")

    out_json = ROOT / "scripts" / "additional-projects.json"
    out_json.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print("Wrote", out_json)


if __name__ == "__main__":
    main()
