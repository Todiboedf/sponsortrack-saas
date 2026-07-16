# QA gate results — wow redesign (July 16, 2026)

Local production build (`next build` + `next start`), Playwright chromium.

## Automated checks

| Check | Result |
|---|---|
| `next build` (typecheck included) | ✅ green |
| Horizontal overflow, 8 pages × 1440×900 + 390×844 | ✅ none (also fixes a pre-existing home mobile overflow) |
| Console errors / page errors, all pages both widths | ✅ zero |
| `prefers-reduced-motion`: headline instant, ticker static, in-view sections visible | ✅ |
| Keyboard tab-through (skip link → nav → CTAs), visible focus on all 10 stops | ✅ |

## Contrast (AA, computed against tokens)

- volt `#D8FF3E` on navy `#0A1628` ≈ 15:1 ✅ · navy text on volt ≈ 13:1 ✅
- cream `#F4EFE6` on navy ≈ 14:1 ✅ · dim (65%) ≈ 8:1 ✅ · faint (45%, captions) ≈ 4.6:1 ✅
- amber `#E8A33D` on navy ≈ 7.6:1 ✅ · slate `#8B98A9` on navy ≈ 5.8:1 ✅
- light-tone status chips on paper (`#3F5800` etc.) ≥ 7:1 ✅

## Performance

- GSAP + ScrollTrigger removed from the bundle (−~28kb gzip); no new dependencies added.
- No scroll-linked main-thread work: the only scroll listener is the navbar's
  passive threshold flag. The 400vh pinned scene is gone.
- All animations are transform/opacity (ticker marquee, hud-lock, Reveal);
  infinite blur-orb animations removed.
- Hero: headline is server-rendered text, no animation gate; video ships
  `preload="metadata"` + poster.

## Anti-generic checklist

1. ✅ Zero serif + gold-italic headings (Playfair Display removed entirely).
2. ✅ Zero identical 3-column icon-card grids (numbered rows, asymmetric bento, editorial lists).
3. ✅ No section exceeds one viewport of emptiness (section rhythm py-16/py-20).
4. ✅ One nameable signature: the detection overlay (brackets + mono confidence tags + chyrons + ticker).
5. ✅ Every section carries a real data artifact (detection video, ticker of study metrics, real report page, real annotated CV frame, real study numbers, pipeline output line).
6. ✅ Zero fake logos / testimonials / stock illustration; Osasuna labelled "public study · not a client" throughout.
7. ✅ Hero headline readable immediately (no JS gate; fonts `display: swap`).
8. ✅ Squint test: volt signals + cream headings carry hierarchy at thumbnail size.

Screenshots: `docs/redesign/before/` vs `docs/redesign/after/` (same pages, same widths).
