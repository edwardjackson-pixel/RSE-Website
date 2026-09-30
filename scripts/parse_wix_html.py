"""Parse Wix HTML for gallery category mappings."""

import json
import re
import urllib.request
from pathlib import Path

URL = "https://www.rseassociates.com/project-list"
OUT = Path(__file__).resolve().parent / "wix-html-snippet.txt"

req = urllib.request.Request(URL, headers={"User-Agent": "Mozilla/5.0"})
html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")

# Search for patterns around categories and media
keywords = ["Higher Education", "gallery", "items", "tags", "categories", "pro-gallery"]
snippets = []
for kw in keywords:
    idx = 0
    while True:
        idx = html.find(kw, idx)
        if idx == -1:
            break
        snippets.append(html[max(0, idx - 200) : idx + 400])
        idx += len(kw)
        if len(snippets) > 30:
            break

OUT.write_text("\n---\n".join(snippets[:30]), encoding="utf-8")
print("wrote", OUT, "snippets", len(snippets))

# Try to find JSON arrays with media + tags
for pat in [
    r'"items"\s*:\s*\[([\s\S]{0,50000}?)\]',
    r'"galleryItems"\s*:\s*\[([\s\S]{0,50000}?)\]',
]:
    m = re.search(pat, html)
    if m:
        print("found pattern", pat[:30], "len", len(m.group(1)))
        Path(__file__).parent.joinpath("wix-gallery-raw.json").write_text(
            m.group(1)[:20000], encoding="utf-8"
        )
