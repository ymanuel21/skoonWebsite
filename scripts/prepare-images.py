#!/usr/bin/env python3
"""Prepare optimised web images for the site from the company's own project photography.

Sources: pages 16-19 of the company profile document, pre-extracted by the project's
audit tooling into a working directory outside this repository.

DELIBERATE EXCLUSIONS:
  - the pre-composed project collages, because they name and logo client organisations
    and that use is not authorised for publication;
  - the vessel-mounted array photograph, which carries a third-party vessel name;
  - all personnel portraits (personal data, and the team roster is unconfirmed).

Output names are intentionally NEUTRAL ("array-open", "array-roof"). The site labels these
photographs with the three renewable-energy facts the source documents actually state,
rather than asserting a mounting type per photo, which the source cannot verify.
"""
from PIL import Image
import os

RAW = "/Users/document/skcon-carbon-lab/rebrand/assets_raw"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")
OUT = os.path.normpath(OUT)
os.makedirs(OUT, exist_ok=True)


def prep(src, dst, crop=None, width=1600, quality=82):
    im = Image.open(src).convert("RGB")
    if crop:
        im = im.crop(crop)
    if im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    path = os.path.join(OUT, dst)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  {dst:34s} {im.width}x{im.height}  {os.path.getsize(path)//1024} KB")


print("Preparing site imagery:")

# proj-002: large array in open terrain, 2021x1150. The lower band carries an embedded
# "GOING SOLAR" caption; crop above it so no embedded text is published.
prep(f"{RAW}/proj-002.png", "installation-array-open.jpg", crop=(0, 0, 2021, 660))

# proj-013: array mounted in rows above planted ground, 744x437 — clean, no text.
prep(f"{RAW}/proj-013.png", "installation-array-roof.jpg")

# proj-007: technicians working on a rooftop array, 861x873 — clean, no text.
prep(f"{RAW}/proj-007.png", "installation-works.jpg", crop=(0, 90, 861, 700))

print("Excluded: proj-017, proj-022 (client names), proj-011 (third-party vessel name)")
print("Done.")
