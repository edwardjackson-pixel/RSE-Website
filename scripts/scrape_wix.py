"""Scrape project images from the old RSE Wix site."""

import json
import re
import urllib.request
from pathlib import Path

URL = "https://www.rseassociates.com/project-list"
OUT = Path(__file__).resolve().parent / "old-site-images.json"

CATEGORIES = [
    "Higher Education",
    "Schools K-12",
    "Public and Civic",
    "Restoration and Renovation",
    "Residential",
    "Libraries",
    "Museum and Performing Arts",
    "Landscapes and Parks",
    "Mass Timber",
    "Commercial and Mixed Use",
    "Student Residence Halls",
    "Athletic Facilities",
]

# Map old Wix category names to new site category names
CATEGORY_MAP = {
    "Higher Education": "Higher Education",
    "Schools K-12": "K-12 Schools",
    "Public and Civic": "Public & Civic",
    "Restoration and Renovation": "Restoration & Renovation",
    "Residential": "Residential",
    "Libraries": "Libraries",
    "Museum and Performing Arts": "Museum & Performing Arts",
    "Landscapes and Parks": "Landscapes & Parks",
    "Mass Timber": "Mass Timber",
    "Commercial and Mixed Use": "Commercial & Mixed Use",
    "Student Residence Halls": "Student Residence Halls",
    "Athletic Facilities": "Athletic Facilities",
}


def fetch_html() -> str:
    req = urllib.request.Request(
        URL,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"},
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read().decode("utf-8", "ignore")


def extract_media_ids(html: str) -> list[str]:
    """Extract unique Wix media IDs from page HTML/JSON."""
    patterns = [
        r"30c410_[a-f0-9]{32}~mv2\.(?:jpg|jpeg|png|webp)",
        r'"uri"\s*:\s*"(30c410_[^"]+)"',
        r'"fileName"\s*:\s*"(30c410_[^"]+)"',
    ]
    ids: set[str] = set()
    for pat in patterns:
        for match in re.findall(pat, html, re.IGNORECASE):
            base = match.split("~")[0] if "~" in match else match
            if "Logo" not in base and "logo" not in base.lower():
                ids.add(base)
    return sorted(ids)


def high_res_url(media_id: str) -> str:
    """Build a high-resolution Wix static URL."""
    ext = "jpg"
    if media_id.endswith((".png", ".jpg", ".jpeg", ".webp")):
        parts = media_id.rsplit(".", 1)
        media_id, ext = parts[0], parts[1]
    return (
        f"https://static.wixstatic.com/media/{media_id}~mv2.{ext}"
        f"/v1/fill/w_1600,h_1200,al_c,q_90/{media_id}~mv2.{ext}"
    )


def extract_gallery_items(html: str) -> list[dict]:
    """Try to extract gallery items with titles/tags from embedded JSON."""
    items: list[dict] = []

    # Wix often embeds gallery data in script tags
    for block in re.findall(r"<script[^>]*>([\s\S]*?)</script>", html):
        if "gallery" not in block.lower() and "wixstatic" not in block:
            continue
        # Look for title/description near media ids
        for m in re.finditer(
            r'"title"\s*:\s*"([^"]*)"[\s\S]{0,500}?"uri"\s*:\s*"([^"]+)"',
            block,
        ):
            title, uri = m.group(1), m.group(2)
            if "30c410" in uri:
                items.append({"title": title, "uri": uri})

        for m in re.finditer(
            r'"uri"\s*:\s*"([^"]+)"[\s\S]{0,500}?"title"\s*:\s*"([^"]*)"',
            block,
        ):
            uri, title = m.group(1), m.group(2)
            if "30c410" in uri:
                items.append({"title": title, "uri": uri})

    return items


def main():
    print("Fetching", URL)
    html = fetch_html()
    print(f"HTML length: {len(html)}")

    media_ids = extract_media_ids(html)
    print(f"Found {len(media_ids)} unique media IDs")

    gallery_items = extract_gallery_items(html)
    print(f"Found {len(gallery_items)} gallery items with titles")

    # Build manifest - one entry per unique image
    manifest = []
    seen_ids: set[str] = set()

    for i, media_id in enumerate(media_ids):
        if media_id in seen_ids:
            continue
        seen_ids.add(media_id)

        # Try to find a title from gallery items
        title = ""
        for item in gallery_items:
            if media_id in item.get("uri", ""):
                title = item.get("title", "")
                break

        manifest.append(
            {
                "id": media_id,
                "index": i + 1,
                "url": high_res_url(media_id),
                "title": title,
                "category": "",  # assigned manually below if possible
                "naming_confidence": "Confirmed" if title else "Category-based",
            }
        )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Wrote {len(manifest)} items to {OUT}")

    for item in manifest[:5]:
        print(f"  - {item['id'][:40]}... title={item['title']!r}")


if __name__ == "__main__":
    main()
