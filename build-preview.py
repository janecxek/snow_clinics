#!/usr/bin/env python3
"""Builds a single self-contained HTML file from the site.

CSS, JavaScript and every SVG are inlined so the result opens straight from
disk — no server, no asset folder. Use it to send the mockup to someone.
Google Fonts still load from the network; without them the page falls back to a
system sans. Rasters are inlined as base64, so the file is larger than the
served page — it is a courier, not a deployment.

    python3 build-preview.py [output.html]
"""
import base64
import os
import re
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "snow-clinics-preview.html")


def read(*parts):
    with open(os.path.join(ROOT, *parts), encoding="utf-8") as f:
        return f.read()


MEDIA = {".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
         ".jpeg": "image/jpeg", ".webp": "image/webp"}


def data_uri(path):
    """SVG stays readable as a percent-encoded URI; rasters go to base64."""
    full = os.path.join(ROOT, *path)
    ext = os.path.splitext(full)[1].lower()
    if ext == ".svg":
        return "data:image/svg+xml," + urllib.parse.quote(read(*path).replace("\n", ""), safe="")
    with open(full, "rb") as f:
        return "data:" + MEDIA[ext] + ";base64," + base64.b64encode(f.read()).decode("ascii")


html = read("index.html")
css = read("assets", "css", "main.css")
i18n = read("assets", "js", "i18n.js")
main = read("assets", "js", "main.js")

# An inlined block ends at the first matching close tag, wherever it appears.
for label, body, tag in (("main.css", css, "</style"), ("i18n.js", i18n, "</script"),
                         ("main.js", main, "</script")):
    if tag in body.lower():
        raise SystemExit(f"{label} contains {tag}> and cannot be inlined as-is")

for name in sorted(os.listdir(os.path.join(ROOT, "assets", "img"))):
    if os.path.splitext(name)[1].lower() in MEDIA:
        html = html.replace("/assets/img/" + name, data_uri(("assets", "img", name)))

html = html.replace('<link rel="stylesheet" href="/assets/css/main.css">',
                    "<style>\n" + css + "\n</style>")
html = html.replace('<script src="/assets/js/i18n.js" defer></script>\n'
                    '<script src="/assets/js/main.js" defer></script>',
                    "<script>\n" + i18n + "\n</script>\n<script>\n" + main + "\n</script>")

# Nothing to resolve these against in a single file.
html = html.replace('<link rel="manifest" href="/site.webmanifest">\n', "")
html = re.sub(r'<link rel="preload" as="image"[^>]*>\n', "", html)

leftover = re.findall(r'(?:src|href)="/assets/[^"]+"', html)
if leftover:
    raise SystemExit("unresolved local references: " + ", ".join(sorted(set(leftover))))

with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

print(f"{OUT} — {len(html.encode()) // 1024} KB")
