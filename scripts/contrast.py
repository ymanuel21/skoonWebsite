#!/usr/bin/env python3
"""Measure WCAG 2.1 contrast ratios for every colour pair the site actually renders.

Run from the site root:  python3 scripts/contrast.py
Run from the site root; the output is the authoritative contrast record.
"""

def srgb_to_lin(c: float) -> float:
    c = c / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def lum(hexstr: str) -> float:
    h = hexstr.lstrip('#')
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * srgb_to_lin(r) + 0.7152 * srgb_to_lin(g) + 0.0722 * srgb_to_lin(b)


def ratio(fg: str, bg: str) -> float:
    a, b = lum(fg), lum(bg)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def verdict(r: float, large: bool = False) -> str:
    need_aa = 3.0 if large else 4.5
    need_aaa = 4.5 if large else 7.0
    if r >= need_aaa:
        return 'AAA'
    if r >= need_aa:
        return 'AA'
    return 'FAIL'


# (label, foreground, background, is_large_text)
PAIRS = [
    # body + headings on light surfaces
    ('body text on white',              '#0F172A', '#FFFFFF', False),
    ('muted text on white',             '#475569', '#FFFFFF', False),
    ('subtle text on white',            '#64748B', '#FFFFFF', False),
    ('heading (emerald 900) on white',  '#064E3B', '#FFFFFF', True),
    ('link (emerald 700) on white',     '#047857', '#FFFFFF', False),
    ('blue link (sky 700) on white',    '#0369A1', '#FFFFFF', False),
    ('nav link on white',               '#334155', '#FFFFFF', False),
    # light surfaces
    ('body on surface-2',               '#0F172A', '#F8FAFC', False),
    ('muted on surface-2',              '#475569', '#F8FAFC', False),
    ('tag emerald-800 on emerald-50',   '#065F46', '#ECFDF5', False),
    ('sky-700 on sky-50',               '#0369A1', '#F0F9FF', False),
    # dark navy sections
    ('white on navy',                   '#FFFFFF', '#0F172A', True),
    ('body on navy',                    '#CBD5E1', '#0F172A', False),
    ('muted on navy',                   '#94A3B8', '#0F172A', False),
    ('eyebrow mint on navy',            '#6EE7B7', '#0F172A', False),
    # emerald band / dark
    ('white on emerald-900',            '#FFFFFF', '#064E3B', True),
    ('emerald-50 on emerald-900',       '#ECFDF5', '#064E3B', False),
    ('emerald-50 on emerald-900 (90%)', '#E6FCF3', '#064E3B', False),
    ('onDark button text on green',     '#032E22', '#10B981', False),
    # the proposal's exact brand values, as *text* (the reason for the derivatives)
    ('Vibrant Green #10B981 on white',  '#10B981', '#FFFFFF', False),
    ('Oceanic Blue #0284C7 on white',   '#0284C7', '#FFFFFF', False),
    # form states
    ('error text on white',             '#B42318', '#FFFFFF', False),
    ('warning text on sky-50',          '#0C4A6E', '#F0F9FF', False),
    ('success text on emerald-50',      '#032E22', '#ECFDF5', False),
]

print(f"{'pair':38s} {'fg':9s} {'bg':9s} {'ratio':>7s}  {'normal':>7s}  {'large':>7s}")
print('-' * 96)
fails = []
for label, fg, bg, large in PAIRS:
    r = ratio(fg, bg)
    v_norm = verdict(r, False)
    v_large = verdict(r, True)
    print(f'{label:38s} {fg:9s} {bg:9s} {r:6.2f}:1  {v_norm:>7s}  {v_large:>7s}')
    if v_norm == 'FAIL' and not large:
        fails.append((label, r))

print()
if fails:
    print('Pairs below WCAG AA for normal text (expected for raw brand colours / decorative use):')
    for label, r in fails:
        print(f'  - {label}: {r:.2f}:1')
else:
    print('All pairs meet WCAG AA for normal text.')

# The brand pair specifically: confirm the deviation is real and deliberate.
print()
print('Brand-derivative check (the reason globals.css darkens two colours):')
bgw = '#FFFFFF'
raw_green = ratio('#10B981', bgw)
raw_blue = ratio('#0284C7', bgw)
der_green = ratio('#047857', bgw)
der_blue = ratio('#0369A1', bgw)
print(f'  #10B981 on white = {raw_green:.2f}:1  -> {verdict(raw_green)}   (reserved for graphics)')
print(f'  #047857 on white = {der_green:.2f}:1  -> {verdict(der_green)}   (used for text)')
print(f'  #0284C7 on white = {raw_blue:.2f}:1  -> {verdict(raw_blue)}   (reserved for graphics)')
print(f'  #0369A1 on white = {der_blue:.2f}:1  -> {verdict(der_blue)}   (used for text)')
