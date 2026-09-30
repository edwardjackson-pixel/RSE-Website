"""Download all Wix project images to _raw for inspection."""

import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = ROOT / "scripts" / "old-site-images.json"
RAW_DIR = ROOT / "public" / "images" / "projects" / "_raw"
LOGO_ID = "30c410_2cd384d8fe224c22bd56bf2b2217fc03"


def download(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        dest.write_bytes(resp.read())


def main():
    items = json.loads(MANIFEST.read_text(encoding="utf-8"))
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    for item in items:
        if item["id"] == LOGO_ID:
            continue
        dest = RAW_DIR / f"{item['index']:02d}_{item['id']}.jpg"
        print("Downloading", dest.name)
        download(item["url"], dest)
    print("Done:", len(list(RAW_DIR.glob("*.jpg"))), "files")


if __name__ == "__main__":
    main()
