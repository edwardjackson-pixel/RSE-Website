from pathlib import Path

path = Path("src/lib/constants.ts")
text = path.read_text(encoding="utf-8")
text = text.replace("â€”", "—")
path.write_text(text, encoding="utf-8")
print("fixed mojibake")
