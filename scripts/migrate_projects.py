"""Migrate all projects from old Wix site to new site constants."""

from __future__ import annotations

import json
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"
RAW_DIR = ROOT / "public" / "images" / "projects" / "_raw"
OUT_DIR = ROOT / "public" / "images" / "projects"
CONSTANTS = ROOT / "src" / "lib" / "constants.ts"

TARGET_W, TARGET_H = 1200, 900
JPEG_QUALITY = 82
BASE = "https://www.rseassociates.com"
USER_AGENT = "Mozilla/5.0"

CATEGORY_PAGES = [
    ("colleges-and-universities", "Higher Education"),
    ("schools-k-12", "K-12 Schools"),
    ("public-and-civic", "Public & Civic"),
    ("restoration-and-renovation", "Restoration & Renovation"),
    ("residential", "Residential"),
    ("libraries", "Libraries"),
    ("museums-and-performing-arts", "Museum & Performing Arts"),
    ("landscapes-and-parks", "Landscapes & Parks"),
    ("mass-timber", "Mass Timber"),
    ("commercial-and-mixed-use-1", "Commercial & Mixed Use"),
    ("copy-of-athletic-facilities", "Student Residence Halls"),
    ("copy-of-museums-and-performing-arts", "Athletic Facilities"),
]

SKIP_SLUGS = {
    "home",
    "project-list",
    "about",
    "awards",
    "registrations",
    "contact",
    "careers",
    "search",
    "template",
    "fullscreen-page",
    "blank",
    "blank-1",
    "blank-1-1",
    "blank-2",
    "blank-3",
    "blank-4",
    "blank-5",
    "blank-6",
    "blank-7",
    "blank-8",
    "blank-9",
    "colleges-and-universities",
    "schools-k-12",
    "public-and-civic",
    "restoration-and-renovation",
    "residential",
    "libraries",
    "museums-and-performing-arts",
    "landscapes-and-parks",
    "mass-timber",
    "commercial-and-mixed-use-1",
    "copy-of-athletic-facilities",
    "copy-of-museums-and-performing-arts",
}

LOGO_IDS = {
    "30c410_2cd384d8fe224c22bd56bf2b2217fc03",
    "30c410_33d079170eea4ffa889341b2598875a4",
}

TITLE_ALIASES: dict[str, str] = {
    "essex north shore agricultural technical school": "essex technical high school",
    "fall river courthouse": "fall river justice center",
    "walden park visitor center": "walden pond visitor center",
    "walden interior": "walden mass timber interior",
    "roxbury branch of the boston public library": "boston public library roxbury branch",
    "boston public library roxbury branch": "boston public library roxbury branch",
    "webster library": "gladys e kelly public library",
    "gladys e kelly public library": "gladys e kelly public library",
    "lower basin barracks": "massachusetts state police lower basin barracks",
    "brooklyn bridge park": "brooklyn waterfront pavilion",
    "img 3159 enhanced": "mass timber structure",
    "umass amherst champions center": "umass basketball champions center",
    "umass dartmouth balsam": "umass dartmouth balsam",
}


def fetch_html(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=90) as resp:
        return resp.read().decode("utf-8", "ignore")


def normalize_title(title: str) -> str:
    s = title.lower().strip()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def build_site_indexes(html: str) -> tuple[dict[str, str], dict[str, str], set[str]]:
    title_to_slug: dict[str, str] = {}
    page_id_to_slug: dict[str, str] = {}
    all_slugs: set[str] = set()

    for m in re.finditer(
        r'"([a-z0-9]+)"\s*:\s*\{\s*"pageId"\s*:\s*"([^"]+)"\s*,\s*"title"\s*:\s*"([^"]+)"\s*,\s*"pageUriSEO"\s*:\s*"([^"]+)"',
        html,
    ):
        page_id = m.group(2)
        title = m.group(3)
        slug = m.group(4)
        title_to_slug[title] = slug
        page_id_to_slug[page_id] = slug
        all_slugs.add(slug)

    return title_to_slug, page_id_to_slug, all_slugs


def resolve_slug(
    title: str,
    link_data: dict,
    title_to_slug: dict[str, str],
    page_id_to_slug: dict[str, str],
    all_slugs: set[str],
) -> str | None:
    inner_route = link_data.get("innerRoute")
    if inner_route:
        return inner_route

    page_name = link_data.get("pageName")
    if page_name and page_name in title_to_slug:
        return title_to_slug[page_name]

    page_id = link_data.get("pageId", "").lstrip("#")
    if page_id and page_id in page_id_to_slug:
        slug = page_id_to_slug[page_id]
        if slug not in SKIP_SLUGS:
            return slug

    if title in title_to_slug:
        slug = title_to_slug[title]
        if slug not in SKIP_SLUGS:
            return slug

    guess = slugify(title)
    if guess in all_slugs and guess not in SKIP_SLUGS:
        return guess

    # Partial title match
    norm = normalize_title(title)
    for t, s in title_to_slug.items():
        if s in SKIP_SLUGS:
            continue
        tn = normalize_title(t)
        if norm == tn or norm in tn or tn in norm:
            return s

    return guess if guess and guess not in SKIP_SLUGS else None


def extract_gallery_items(html: str) -> list[dict]:
    items: list[dict] = []
    seen: set[str] = set()

    # Primary: metaData blocks with link + media
    pattern = re.compile(
        r'"metaData"\s*:\s*\{'
        r'(?P<meta>[\s\S]*?)'
        r'\}(?:,"mediaUrl"|,"directLink")',
        re.I,
    )

    for match in pattern.finditer(html):
        meta = match.group("meta")
        title_m = re.search(r'"title"\s*:\s*"([^"]+)"', meta)
        if not title_m:
            continue
        title = title_m.group(1).strip()
        if not title or title.lower().endswith("(title)"):
            continue

        link_m = re.search(r'"link"\s*:\s*(\{[\s\S]*?\})(?:,"alt"|,"sourceName")', meta)
        link_data: dict = {}
        if link_m:
            link_json = link_m.group(1)
            for key in ("innerRoute", "pageName", "pageId"):
                km = re.search(rf'"{key}"\s*:\s*"([^"]+)"', link_json)
                if km:
                    link_data[key] = km.group(1)

        # media id from nearby context
        context_end = min(len(html), match.end() + 200)
        context = html[match.start() : context_end]
        media_m = re.search(r'"mediaUrl"\s*:\s*"(30c410_[^"]+)"', context)
        if not media_m:
            media_m = re.search(r'"name"\s*:\s*"(30c410_[^"]+)"', meta)
        media_id = media_m.group(1).split("~")[0] if media_m else ""

        key = title.lower()
        if key in seen:
            continue
        seen.add(key)
        items.append({"title": title, "link_data": link_data, "media_id": media_id})

    # Secondary: title/mediaUrl pairs
    for m in re.finditer(
        r'"title"\s*:\s*"([^"]+)"[\s\S]{0,700}?"mediaUrl"\s*:\s*"(30c410_[^"]+)"',
        html,
    ):
        title = m.group(1).strip()
        if title.lower() in seen:
            continue
        seen.add(title.lower())
        media_id = m.group(2).split("~")[0]
        items.append({"title": title, "link_data": {}, "media_id": media_id})

    return items


def parse_detail_page(html: str, slug: str) -> dict:
    title = ""
    location = ""
    architect = ""
    description = ""
    completed = ""

    h6_texts = [
        re.sub(r"<[^>]+>", "", t).strip()
        for t in re.findall(r"<h6[^>]*>([\s\S]*?)</h6>", html, re.I)
    ]
    h6_texts = [t for t in h6_texts if t]

    if h6_texts:
        title = h6_texts[0]
    if len(h6_texts) > 1:
        location = h6_texts[1]
    if len(h6_texts) > 2 and "architect" in h6_texts[2].lower():
        architect = re.sub(r"^architect:\s*", "", h6_texts[2], flags=re.I).strip()

    for block in re.findall(r"<p[^>]*>([\s\S]*?)</p>", html, re.I):
        text = re.sub(r"<[^>]+>", "", block)
        text = re.sub(r"\s+", " ", text).strip()
        if len(text) > 40 and "copyright" not in text.lower() and "proud mbe" not in text.lower():
            description = text
            break

    completed_match = re.search(r"-\s*Completed\s+(\d{4})\s*-", description, re.I)
    if completed_match:
        completed = completed_match.group(1)
        description = re.sub(r"-\s*Completed\s+\d{4}\s*-", "", description, flags=re.I).strip()

    image_ids = []
    seen: set[str] = set()
    for mid in re.findall(r"30c410_[a-f0-9]{32}", html, re.I):
        if mid not in seen and "logo" not in mid.lower():
            seen.add(mid)
            image_ids.append(mid)

    if not title:
        title = slug.replace("-", " ").title()

    return {
        "title": title,
        "location": location or "Massachusetts",
        "architect": architect,
        "description": description,
        "completed": completed,
        "image_ids": image_ids,
    }


def high_res_url(media_id: str, ext: str = "jpg") -> str:
    base = media_id.split("~")[0]
    return (
        f"https://static.wixstatic.com/media/{base}~mv2.{ext}"
        f"/v1/fill/w_2000,h_1500,al_c,q_90/{base}~mv2.{ext}"
    )


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


def download_image(url: str, dest: Path) -> bool:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(req, timeout=120) as resp:
            dest.write_bytes(resp.read())
        return True
    except (urllib.error.URLError, OSError) as exc:
        print(f"    download failed: {exc}")
        return False


def process_image(raw_path: Path, out_path: Path) -> float | None:
    try:
        with Image.open(raw_path) as img:
            img = img.convert("RGB")
            img = crop_resize(img)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            img.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
        return out_path.stat().st_size / 1024
    except OSError as exc:
        print(f"    process failed: {exc}")
        return None


def load_existing_titles() -> set[str]:
    text = CONSTANTS.read_text(encoding="utf-8")
    block = text.split("export const ALL_PROJECTS")[1].split("export const AWARDS")[0]
    titles = re.findall(r'title:\s*"([^"]+)"', block)
    normalized = {normalize_title(t) for t in titles}
    for alias in TITLE_ALIASES.values():
        normalized.add(alias)
    return normalized


def canonical_title(title: str) -> str:
    norm = normalize_title(title)
    return TITLE_ALIASES.get(norm, norm)


def is_existing(title: str, existing: set[str]) -> bool:
    return canonical_title(title) in existing


def build_description(project: dict, category: str) -> str:
    if project.get("description"):
        desc = project["description"]
        if project.get("architect") and "architect" not in desc.lower():
            desc = f"{desc} Architect: {project['architect']}."
        if project.get("completed") and str(project["completed"]) not in desc:
            desc = f"{desc} Completed {project['completed']}."
        return desc.strip()

    parts = [f"Structural engineering for {project['title']}."]
    if project.get("architect"):
        parts.append(f"Architect: {project['architect']}.")
    if project.get("completed"):
        parts.append(f"Completed {project['completed']}.")
    else:
        parts.append(f"{category} project by RSE Associates.")
    return " ".join(parts)


def escape_ts(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def format_project_entry(project: dict) -> str:
    lines = [
        "  {",
        f'    title: "{escape_ts(project["title"])}",',
        f'    location: "{escape_ts(project["location"])}",',
        f'    category: "{escape_ts(project["category"])}",',
        f'    description:\n      "{escape_ts(project["description"])}",',
        f'    imageAlt: "{escape_ts(project["imageAlt"])}",',
    ]
    if project.get("imageSrc"):
        lines.append(f'    imageSrc: "{escape_ts(project["imageSrc"])}",')
    lines.append("  },")
    return "\n".join(lines)


def main():
    existing_titles = load_existing_titles()
    print(f"Existing projects on new site: {len(existing_titles)}")

    index_html = fetch_html(f"{BASE}/project-list")
    title_to_slug, page_id_to_slug, all_slugs = build_site_indexes(index_html)
    (SCRIPTS / "site-page-index.json").write_text(
        json.dumps(title_to_slug, indent=2), encoding="utf-8"
    )

    slug_registry: dict[str, dict] = {}

    for category_slug, category_name in CATEGORY_PAGES:
        url = f"{BASE}/{category_slug}"
        print(f"\nCrawling {category_name} ({url})")
        try:
            html = fetch_html(url)
        except urllib.error.URLError as exc:
            print(f"  skip ({exc})")
            continue

        gallery_items = extract_gallery_items(html)
        print(f"  gallery items: {len(gallery_items)}")

        for item in gallery_items:
            title = item["title"]
            slug = resolve_slug(
                title, item["link_data"], title_to_slug, page_id_to_slug, all_slugs
            )
            if not slug or slug in SKIP_SLUGS:
                print(f"  skip unresolved: {title!r}")
                continue

            if slug not in slug_registry:
                slug_registry[slug] = {
                    "slug": slug,
                    "gallery_title": title,
                    "category": category_name,
                    "media_id": item.get("media_id", ""),
                    "has_detail_page": slug in all_slugs,
                }
        time.sleep(0.2)

    print(f"\nUnique projects discovered: {len(slug_registry)}")

    scraped: list[dict] = []
    skipped_existing = 0

    for i, (slug, meta) in enumerate(sorted(slug_registry.items()), 1):
        gallery_title = meta["gallery_title"]
        if is_existing(gallery_title, existing_titles):
            print(f"[{i}] SKIP existing: {gallery_title}")
            skipped_existing += 1
            continue

        project = {
            "slug": slug,
            "title": gallery_title,
            "location": "Massachusetts",
            "architect": "",
            "description": "",
            "completed": "",
            "category": meta["category"],
            "image_ids": [meta["media_id"]] if meta.get("media_id") else [],
        }

        if meta.get("has_detail_page"):
            detail_url = f"{BASE}/{slug}"
            try:
                detail_html = fetch_html(detail_url)
                detail = parse_detail_page(detail_html, slug)
                if is_existing(detail["title"], existing_titles):
                    print(f"[{i}] SKIP existing (detail): {detail['title']}")
                    skipped_existing += 1
                    continue
                gallery_media = project["image_ids"][0] if project.get("image_ids") else ""
                project.update({k: v for k, v in detail.items() if k != "image_ids"})
                detail_ids = [img for img in detail.get("image_ids", []) if img not in LOGO_IDS]
                merged_ids = ([gallery_media] if gallery_media else []) + detail_ids
                seen_ids: set[str] = set()
                project["image_ids"] = [
                    mid for mid in merged_ids if mid and mid not in seen_ids and not seen_ids.add(mid)
                ]
            except urllib.error.URLError as exc:
                print(f"[{i}] detail fetch failed for {slug}: {exc}")

        if is_existing(project["title"], existing_titles):
            print(f"[{i}] SKIP existing: {project['title']}")
            skipped_existing += 1
            continue

        project["description"] = build_description(project, project["category"])
        project["imageAlt"] = f"{project['title']} — {project['category'].lower()} project"
        project["slug_key"] = slugify(project["title"])
        scraped.append(project)
        print(f"[{i}] NEW: {project['title']} ({project['category']})")
        time.sleep(0.15)

    print(f"\nNew projects to add: {len(scraped)} (skipped {skipped_existing} existing)")

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    for project in scraped:
        image_src = None
        candidates = project.get("image_ids", [])
        for media_id in candidates:
            if not media_id:
                continue
            slug_key = project["slug_key"]
            raw_path = RAW_DIR / f"{slug_key}_{media_id}.jpg"
            out_path = OUT_DIR / f"{slug_key}.jpg"

            for ext in ("jpg", "jpeg", "png", "webp"):
                url = high_res_url(media_id, ext)
                if download_image(url, raw_path):
                    kb = process_image(raw_path, out_path)
                    if kb:
                        image_src = f"/images/projects/{slug_key}.jpg"
                        project["image_kb"] = round(kb, 1)
                        print(f"  image OK: {project['title']} ({kb:.0f} KB)")
                        break
            if image_src:
                break

        project["imageSrc"] = image_src
        if not image_src:
            print(f"  no image: {project['title']} (SVG fallback)")

    manifest_path = SCRIPTS / "migrated-projects.json"
    manifest_path.write_text(json.dumps(scraped, indent=2), encoding="utf-8")
    print(f"\nWrote {manifest_path}")

    if not scraped:
        print("Nothing new to append.")
        return

    constants_text = CONSTANTS.read_text(encoding="utf-8")
    marker = "] as const;\n\nexport const AWARDS"
    if marker not in constants_text:
        raise SystemExit("Could not find ALL_PROJECTS end marker in constants.ts")

    new_entries = "\n".join(format_project_entry(p) for p in scraped)
    updated = constants_text.replace(
        marker,
        f"{new_entries}\n] as const;\n\nexport const AWARDS",
        1,
    )
    CONSTANTS.write_text(updated, encoding="utf-8")
    print(f"Appended {len(scraped)} projects to constants.ts")

    status = [
        {
            "project_final": p["title"],
            "category": p["category"],
            "real_photo_found": "Yes" if p.get("imageSrc") else "No",
            "original_source": f"https://www.rseassociates.com/{p['slug']}",
            "naming_confidence": "Confirmed",
            "action": "Added from old site migration",
            "imageSrc": p.get("imageSrc") or "—",
            "size_kb": p.get("image_kb", "—"),
        }
        for p in scraped
    ]
    status_path = SCRIPTS / "migration-status.json"
    status_path.write_text(json.dumps(status, indent=2), encoding="utf-8")
    print(f"Wrote {status_path}")


if __name__ == "__main__":
    main()
