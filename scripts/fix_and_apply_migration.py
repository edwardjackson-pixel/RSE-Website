"""Clean migrated project data and regenerate constants.ts."""

from __future__ import annotations

import html
import json
import re
import urllib.error
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"
CONSTANTS = ROOT / "src" / "lib" / "constants.ts"
MANIFEST = SCRIPTS / "migrated-projects.json"
RAW_DIR = ROOT / "public" / "images" / "projects" / "_raw"
OUT_DIR = ROOT / "public" / "images" / "projects"

TARGET_W, TARGET_H = 1200, 900
JPEG_QUALITY = 82
LOGO_IDS = {
    "30c410_2cd384d8fe224c22bd56bf2b2217fc03",
    "30c410_33d079170eea4ffa889341b2598875a4",
}

TITLE_ALIASES: dict[str, str] = {
    "alice k wolf center ndash cambridge housing authority headquarters": "alice k wolf center cambridge housing authority headquarters",
    "alice k wolf center cambridge housing authority headquarters": "alice k wolf center cambridge housing authority headquarters",
    "middlesex community college richard and nancy donahue academic arts center lowell ma architect leers weinzapfel associates": "middlesex community college academic arts center",
    "middlesex community college academic arts center": "middlesex community college academic arts center",
    "middlesex community college academic arts building": "middlesex community college academic arts center",
    "springfield technical community college student learning commons": "springfield technical community college ira k rubezhal student learning commons",
    "springfield technical community college ira k rubezhal student learning commons springfield ma architect annum architects": "springfield technical community college ira k rubezhal student learning commons",
    "umass dartmouth dorms and dining hall": "university of massachusetts dartmouth dorms and dining hall",
    "university of massachusetts dartmouth dorms and dining hall": "university of massachusetts dartmouth dorms and dining hall",
    "university of massachusetts amherst champions center": "university of massachusetts amherst champions center",
    "university of massachusetts amherst isenberg school of management amherst ma architect goody clancy": "university of massachusetts amherst isenberg school of management",
    "university of massachusetts boston integrated sciences complex boston ma architect goody clancy": "university of massachusetts boston integrated sciences complex",
}


def normalize_title(title: str) -> str:
    s = html.unescape(title).lower().strip()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def canonical_key(title: str) -> str:
    norm = normalize_title(title)
    return TITLE_ALIASES.get(norm, norm)


def slugify(title: str) -> str:
    s = html.unescape(title).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def clean_text(value: str) -> str:
    text = html.unescape(value or "")
    text = text.replace("\r\n", " ").replace("\r", " ").replace("\n", " ")
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def parse_title_fields(project: dict) -> dict:
    raw_title = clean_text(project.get("title", ""))
    # Recover location/architect if they were folded into a previously multiline title
    location = clean_text(project.get("location", ""))
    architect = clean_text(project.get("architect", ""))

    title = raw_title
    if " architect:" in raw_title.lower():
        parts = re.split(r"\s+architect:\s*", raw_title, maxsplit=1, flags=re.I)
        title = parts[0].strip()
        if len(parts) > 1:
            architect = parts[1].strip()

    if "," in title and title.count(",") >= 1 and not location:
        # "Project Name City, ST" -> split at last comma chunk if short
        match = re.match(r"^(.+?)\s+([A-Za-z .]+,\s*[A-Z]{2})$", title)
        if match:
            title = match.group(1).strip()
            location = match.group(2).strip()

    description = clean_text(project.get("description", ""))
    description = description.replace("..", ".")

    category = project["category"]
    image_alt = f"{title} — {category.lower()} project"

    return {
        "title": title,
        "location": location or "Massachusetts",
        "category": category,
        "description": description,
        "imageAlt": image_alt,
        "slug_key": slugify(title),
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
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = resp.read()
        if len(data) < 5000:
            return False
        dest.write_bytes(data)
        return True
    except (urllib.error.URLError, OSError):
        return False


def process_image(raw_path: Path, out_path: Path) -> float | None:
    try:
        with Image.open(raw_path) as img:
            img = img.convert("RGB")
            img = crop_resize(img)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            img.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
        kb = out_path.stat().st_size / 1024
        return kb if kb > 50 else None
    except OSError:
        return None


def pick_media_ids(project: dict) -> list[str]:
    ids = []
    for mid in project.get("image_ids", []):
        base = mid.split("~")[0]
        if base and base not in LOGO_IDS and base not in ids:
            ids.append(base)
    return ids


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


def dedupe_projects(projects: list[dict]) -> list[dict]:
    best: dict[str, dict] = {}
    for project in projects:
        cleaned = parse_title_fields(project)
        key = canonical_key(cleaned["title"])
        candidate = {**project, **cleaned}
        if key not in best:
            best[key] = candidate
            continue
        current = best[key]
        current_score = (
            (1 if current.get("imageSrc") else 0)
            + min(len(current.get("description", "")), 500) / 500
        )
        candidate_score = (
            (1 if candidate.get("imageSrc") else 0)
            + min(len(candidate.get("description", "")), 500) / 500
        )
        if candidate_score > current_score:
            best[key] = candidate
    return sorted(best.values(), key=lambda p: (p["category"], p["title"]))


def load_existing_all_projects_block() -> str:
    text = CONSTANTS.read_text(encoding="utf-8")
    start = text.index("export const ALL_PROJECTS = [")
    end = text.index("] as const;\n\nexport const AWARDS")
    return text[start:end]


def main():
    projects = json.loads(MANIFEST.read_text(encoding="utf-8"))
    print(f"Loaded {len(projects)} raw migrated projects")

    deduped = dedupe_projects(projects)
    print(f"After dedupe: {len(deduped)} projects")

    RAW_DIR.mkdir(parents=True, exist_ok=True)
    for project in deduped:
        image_src = None
        slug_key = project["slug_key"]
        out_path = OUT_DIR / f"{slug_key}.jpg"

        for media_id in pick_media_ids(project):
            raw_path = RAW_DIR / f"{slug_key}_{media_id}.jpg"
            for ext in ("jpg", "jpeg", "png", "webp"):
                if download_image(high_res_url(media_id, ext), raw_path):
                    kb = process_image(raw_path, out_path)
                    if kb:
                        image_src = f"/images/projects/{slug_key}.jpg"
                        project["image_kb"] = round(kb, 1)
                        break
            if image_src:
                break

        if not image_src and out_path.exists() and out_path.stat().st_size > 50000:
            image_src = f"/images/projects/{slug_key}.jpg"
        project["imageSrc"] = image_src

    cleaned_path = SCRIPTS / "migrated-projects-clean.json"
    cleaned_path.write_text(json.dumps(deduped, indent=2), encoding="utf-8")

    # Restore original 17-project base from git HEAD
    import subprocess

    base_block = subprocess.check_output(
        ["git", "show", "HEAD:src/lib/constants.ts"],
        text=True,
        cwd=ROOT,
    )
    base_start = base_block.index("export const ALL_PROJECTS = [")
    base_end = base_block.index("] as const;\n\nexport const AWARDS")
    original_all_projects = base_block[base_start:base_end]

    new_entries = "\n".join(format_project_entry(p) for p in deduped)
    rebuilt = f"{original_all_projects}\n{new_entries}\n] as const;"

    constants_text = CONSTANTS.read_text(encoding="utf-8")
    start = constants_text.index("export const ALL_PROJECTS = [")
    end = constants_text.index("] as const;\n\nexport const AWARDS") + len("] as const;")
    updated = constants_text[:start] + rebuilt + constants_text[end:]
    CONSTANTS.write_text(updated, encoding="utf-8")

    with_photo = sum(1 for p in deduped if p.get("imageSrc"))
    print(f"Wrote constants.ts with {len(deduped)} new projects ({with_photo} with photos)")


if __name__ == "__main__":
    main()
