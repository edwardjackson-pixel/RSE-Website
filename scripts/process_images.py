"""Download, process, and build project manifest from Wix images."""

import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"
RAW_DIR = ROOT / "public" / "images" / "projects" / "_raw"
OUT_DIR = ROOT / "public" / "images" / "projects"
PROJECTS_OUT = SCRIPTS / "projects-manifest.json"
STATUS_OUT = SCRIPTS / "image-status.json"

TARGET_W = 1200
TARGET_H = 900
JPEG_QUALITY = 82

# All 12 real projects identified from old site photos
KNOWN_PROJECTS = [
    {
        "image_id": "30c410_61289729ac0f43c894a713ddb87d6ea0",
        "title": "Essex Technical High School",
        "location": "Hathorne, MA",
        "category": "K-12 Schools",
        "description": "A career technical high school campus with modern vocational and academic facilities.",
        "imageAlt": "Essex Technical High School — contemporary K-12 campus with wood and glass facade",
        "naming_confidence": "Confirmed",
        "featured": True,
    },
    {
        "image_id": "30c410_5a6eadf5eb284ee6a81815a057dcd495",
        "title": "The Winsor School",
        "location": "Boston, MA",
        "category": "K-12 Schools",
        "description": "Structural engineering for a distinguished independent school building with traditional masonry and contemporary detailing.",
        "imageAlt": "The Winsor School — independent school building with curved corner facade",
        "naming_confidence": "Confirmed",
        "featured": False,
    },
    {
        "image_id": "30c410_d464f3babe184a5aa80c019062c6b201",
        "title": "Fall River Justice Center",
        "location": "Fall River, MA",
        "category": "Public & Civic",
        "description": "A modern courthouse with a dramatic curved glass facade and stone-clad wings serving the Fall River community.",
        "imageAlt": "Fall River Justice Center — civic courthouse with curved glass facade",
        "naming_confidence": "Confirmed",
        "featured": True,
    },
    {
        "image_id": "30c410_29cf4471f4be4308b53fa534119e6f60",
        "title": "Walden Pond Visitor Center",
        "location": "Concord, MA",
        "category": "Landscapes & Parks",
        "description": "A visitor center at Walden Pond with wood cladding, glass walls, and a boardwalk approach through the surrounding landscape.",
        "imageAlt": "Walden Pond Visitor Center — wood and glass visitor center with boardwalk",
        "naming_confidence": "Confirmed",
        "featured": True,
    },
    {
        "image_id": "30c410_7eb58ae3869c482eace82f85a5599537",
        "title": "UMass Dartmouth Balsam",
        "location": "Dartmouth, MA",
        "category": "Higher Education",
        "description": "A residential and academic building at UMass Dartmouth with modular facade panels and a central glass connector.",
        "imageAlt": "UMass Dartmouth Balsam — higher education building with orange and teal facade",
        "naming_confidence": "Confirmed",
        "featured": True,
    },
    {
        "image_id": "30c410_0e82b66a702e4f909a1b93848e27178b",
        "title": "UMass Basketball Champions Center",
        "location": "Amherst, MA",
        "category": "Athletic Facilities",
        "description": "The John Francis Kennedy Champions Center for UMass Basketball — a dedicated training and athletics facility.",
        "imageAlt": "UMass Basketball Champions Center — athletics facility with glass facade",
        "naming_confidence": "Confirmed",
        "featured": True,
    },
    {
        "image_id": "30c410_4dafda5106434d3688b603808f1822f5",
        "title": "Pan Peninsula",
        "location": "London, UK",
        "category": "Residential",
        "description": "Structural engineering for twin residential towers at Pan Peninsula, a landmark waterfront development in London.",
        "imageAlt": "Pan Peninsula — twin residential towers reflected in water at dusk",
        "naming_confidence": "Confirmed",
        "featured": False,
    },
    {
        "image_id": "30c410_ecb7309bc4bf4499a3f92df6a196c8ce",
        "title": "Multi-Unit Residential Building",
        "location": "Boston, MA",
        "category": "Residential",
        "description": "A four-story multi-unit residential building with contemporary panel cladding and wood accent bays.",
        "imageAlt": "Multi-unit residential building — contemporary apartment building exterior",
        "naming_confidence": "Category-based",
        "featured": False,
    },
    {
        "image_id": "30c410_2b5793db50c04685b4d0f8386b4a5e55",
        "title": "Gladys E. Kelly Public Library",
        "location": "Webster, MA",
        "category": "Libraries",
        "description": "A welcoming civic library with an open reading room, wood ceiling baffles, and floor-to-ceiling windows.",
        "imageAlt": "Gladys E. Kelly Public Library — library interior with reading room and bookshelves",
        "naming_confidence": "Inferred",
        "featured": False,
    },
    {
        "image_id": "30c410_7b58fdc164654fd8bb2bd4d29ab01677",
        "title": "Performing Arts Center",
        "location": "Massachusetts",
        "category": "Museum & Performing Arts",
        "description": "A performing arts facility with a sweeping curved glass facade reflected in an adjacent pond.",
        "imageAlt": "Performing arts center — curved glass facade with pond reflection",
        "naming_confidence": "Category-based",
        "featured": False,
    },
    {
        "image_id": "30c410_8ce5873f38584b3d914d3dcc36396c5f",
        "title": "Brooklyn Waterfront Pavilion",
        "location": "Brooklyn, NY",
        "category": "Landscapes & Parks",
        "description": "A public pavilion with vertical wood-slat cladding set within a landscaped waterfront park.",
        "imageAlt": "Brooklyn waterfront pavilion — wood-slat public building with city skyline",
        "naming_confidence": "Inferred",
        "featured": False,
    },
    {
        "image_id": "30c410_9596adb6ac194c709c9b0fcf108750f3",
        "title": "Historic Campus Expansion",
        "location": "Massachusetts",
        "category": "Restoration & Renovation",
        "description": "Adaptive reuse and expansion of a historic brick campus building with a contemporary glass and metal addition.",
        "imageAlt": "Historic campus expansion — brick building with modern addition on hillside",
        "naming_confidence": "Inferred",
        "featured": False,
    },
]

OLD_SITE_REPLACEMENTS = [
    {"old": "Lowell Justice Center", "new": "Fall River Justice Center", "real_photo": "No", "action": "Removed AI placeholder — replaced with Fall River Justice Center (real photo from old site)"},
    {"old": "Fitchburg City Hall Renovations", "new": "Historic Campus Expansion", "real_photo": "No", "action": "Removed AI placeholder — replaced with Historic Campus Expansion (real photo from old site)"},
    {"old": "UMass Isenberg School of Management", "new": "UMass Dartmouth Balsam", "real_photo": "No", "action": "Removed AI placeholder — replaced with UMass Dartmouth Balsam (real photo from old site)"},
    {"old": "Boston Public Library, Roxbury Branch", "new": "Gladys E. Kelly Public Library", "real_photo": "No", "action": "Removed AI placeholder — replaced with library project using real interior photo (inferred)"},
    {"old": "Franklin Regional Transit Center", "new": "Walden Pond Visitor Center", "real_photo": "No", "action": "Removed AI placeholder — replaced with Walden Pond Visitor Center (real photo from old site)"},
    {"old": "Wentworth Institute of Technology", "new": "UMass Basketball Champions Center", "real_photo": "No", "action": "Removed AI placeholder — replaced with UMass Basketball Champions Center (real photo from old site)"},
    {"old": "Gladys E. Kelly Public Library", "new": "Gladys E. Kelly Public Library", "real_photo": "Yes", "action": "Real image applied (library interior photo from old site)"},
    {"old": "Massachusetts State Police Lower Basin Barracks", "new": "Historic Campus Expansion", "real_photo": "No", "action": "Removed AI placeholder — no matching photo on old site; portfolio uses other real projects"},
    {"old": "Greenfield Community College Center", "new": "UMass Dartmouth Balsam", "real_photo": "No", "action": "Removed AI placeholder — replaced with UMass Dartmouth Balsam (real photo from old site)"},
    {"old": "Harbor Point Residential Tower", "new": "Pan Peninsula", "real_photo": "No", "action": "Removed AI-invented project — replaced with Pan Peninsula (real photo from old site)"},
    {"old": "Mass Timber Office Building", "new": "—", "real_photo": "No", "action": "Removed AI-invented project — no matching real photo on old site"},
    {"old": "University Athletic Center", "new": "UMass Basketball Champions Center", "real_photo": "No", "action": "Removed AI-invented project — replaced with UMass Basketball Champions Center (real photo from old site)"},
    {"old": "Downtown Mixed-Use Development", "new": "Multi-Unit Residential Building", "real_photo": "No", "action": "Removed AI-invented project — replaced with Multi-Unit Residential Building (real photo from old site)"},
    {"old": "Waterfront Park Pavilion", "new": "Brooklyn Waterfront Pavilion", "real_photo": "No", "action": "Removed AI-invented project — replaced with Brooklyn Waterfront Pavilion (real photo from old site)"},
]


def slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


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


def main():
    processed = []
    for project in KNOWN_PROJECTS:
        image_id = project["image_id"]
        raw_glob = list(RAW_DIR.glob(f"*_{image_id}.jpg"))
        if not raw_glob:
            raise SystemExit(f"Missing raw file for {image_id}")
        raw_path = raw_glob[0]

        slug = slugify(project["title"])
        out_path = OUT_DIR / f"{slug}.jpg"

        with Image.open(raw_path) as img:
            img = img.convert("RGB")
            img = crop_resize(img)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            img.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True)

        size_kb = out_path.stat().st_size / 1024
        processed.append(
            {
                **project,
                "slug": slug,
                "imageSrc": f"/images/projects/{slug}.jpg",
                "output_kb": round(size_kb, 1),
            }
        )
        print(f"{project['title']} -> {out_path.name} ({size_kb:.0f} KB)")

    status = []
    for p in processed:
        status.append(
            {
                "project_final": p["title"],
                "category": p["category"],
                "real_photo_found": "Yes",
                "original_source": "Real photo from rseassociates.com",
                "naming_confidence": p["naming_confidence"],
                "action": "Real image applied",
                "imageSrc": p["imageSrc"],
                "size_kb": p["output_kb"],
            }
        )

    for r in OLD_SITE_REPLACEMENTS:
        status.append(
            {
                "project_final": r["new"],
                "category": "—",
                "real_photo_found": r["real_photo"],
                "original_source": f"AI-generated placeholder: {r['old']}",
                "naming_confidence": "N/A",
                "action": r["action"],
                "imageSrc": "—",
                "size_kb": "—",
            }
        )

    PROJECTS_OUT.write_text(
        json.dumps({"all": processed, "featured": [p for p in processed if p["featured"]]}, indent=2),
        encoding="utf-8",
    )
    STATUS_OUT.write_text(json.dumps(status, indent=2), encoding="utf-8")
    print(f"\nProcessed {len(processed)} images")


if __name__ == "__main__":
    main()
