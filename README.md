# KarigarBook — explainer site

A standalone marketing / explainer website for **KarigarBook** — a piece-rate
payout ledger for tailoring, embroidery and handicraft units.

> **Piece-rate pay, done right.** Rs 499/mo.

This is **not** the product app. It is a single-page explainer designed to make
the idea instantly clear to two readers: a non-technical Indian SMB (unit) owner,
and an investor skimming for 30 seconds.

## The product, in one line

Piece-rate units run payout on memory and scraps of paper, and rejections cause
disputes. KarigarBook logs production per karigar per work type and computes a
clean payout:

```
payout (period) = Σ (qty − rejected_qty) × piece_rate  −  advances
```

## Sections

1. Hero — name, tagline, the pain in one sentence, mock CTA, and a live-tallying payout slip
2. The problem — WhatsApp + diary + memory, and why they break down
3. The insight — the wedge, stated sharply
4. How it works — 4 steps, bundle to payout
5. Features — piece-rate ledger, auto payout maths, per-karigar output, rejection rate, payout sheets, owner's dashboard
6. Product preview — a CSS "screenshot" of the owner's dashboard with real Indian names, areas and rupee values
7. Pricing — Rs 499/mo with the ROI line
8. Who it's for + a 3-question FAQ
9. Footer — "A KARYA studio build", contact

## Design

- Palette built around the accent **`#6D28D9`** (violet): deep near-black ink,
  off-white paper background, a pale-violet muted tint, and a sparing gold-thread accent.
- **System fonts only** — hierarchy comes from weight, size and tracking; rupee
  figures and stitch counts are set in a monospace stack for a ledger feel.
- Signature motif: the **running-stitch seam** (dashed lines borrowed from the
  tailoring world) used as dividers and card frames, plus a realistic payout slip.
- Fully self-contained: all CSS in `styles.css`, all icons/marks are inline SVG.
  No CDNs, no external fonts, images or scripts.
- Responsive down to mobile with no horizontal page scroll; wide elements
  (the dashboard mock) scroll within their own container.

## Files

| File          | Purpose                                                        |
|---------------|----------------------------------------------------------------|
| `index.html`  | All page markup                                                |
| `styles.css`  | All styles                                                     |
| `app.js`      | Sticky nav, smooth scroll, the animated payout tally, mock CTA |
| `favicon.svg` | Stitched-ledger favicon                                        |

## Run locally

No build step. Open the file directly:

```bash
open index.html
```

Or serve it:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy

It is a static site — copy the folder to any static host (Netlify, Cloudflare
Pages, GitHub Pages, S3) unchanged.

---

Illustrative figures only. A **KARYA studio** build · sreeni.nintendo@gmail.com
