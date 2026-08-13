# Figma Design System — Build Plan (Phase 0 complete)

Status: **paused before Phase 1** — waiting on Figma pro upgrade for the personal
profile. No Figma file created yet, nothing written. Resume by asking Claude to
"resume the Figma design system build" (loads the figma-generate-library skill,
re-runs discovery against this doc, and starts at file creation + Phase 1).

Source of truth: this repo (`src/styles/tokens.css` + `src/components/*`). Code wins
on every value; regenerate Figma from code, never the reverse.

## Architecture (agreed recommendation)

- **Colors** collection, modes `Light` / `Dark` — contains BOTH layers:
  - Primitives with per-mode values, mirroring Radix CSS: `sage/1..12`, `teal/1..12`
    (distinct light/dark hexes), `black/a1..a12` (same value both modes), `white`.
    Scopes: `[]` (hidden). Code syntax: `var(--sage-1)` etc.
  - Semantics aliasing primitives in the same collection (one mode switch flips all):
    `ui/bg→sage/1`, `ui/surface→sage/2`, `ui/surface-hover→sage/3`,
    `ui/surface-active→sage/4`, `ui/border→sage/7`, `ui/border-hover→sage/8`,
    `ui/text→sage/12`, `ui/text-muted→sage/11`, `ui/control-track→sage/6`,
    `ui/accent→teal/9`, `ui/accent-hover→teal/10`, `ui/accent-contrast→white`,
    `ui/focus-ring→teal/8`, `ui/overlay→black/a8`.
    Scopes per role (FRAME_FILL/SHAPE_FILL, TEXT_FILL, STROKE_COLOR). Code syntax
    `var(--ui-*)` — exact CSS names from tokens.css.
- **Spacing** collection (1 mode): xs=4, sm=8, md=12, lg=16, xl=24. Scope: GAP (+padding).
- **Radius** collection (1 mode): sm=4, md=6, lg=8, full=9999. Scope: CORNER_RADIUS.
- **Effect style** `shadow/overlay`: 0 10px 38px -10px black-a7 + 0 10px 20px -15px
  black-a4 (from `--ui-shadow`).
- **Text styles** (Inter as stand-in — code intentionally inherits host font):
  Label/Small 14 Medium, Label/Medium 15 Medium, Label/Large 16 Medium,
  Body/Medium 15 Regular, Heading/Small 18 SemiBold.

## Component sets (variant matrices, from code props)

| Component | Axes / properties | Count |
|---|---|---|
| Button | Variant(primary/secondary/ghost) × Size(sm/md/lg) × State(default/hover/disabled); focus shown as documented example; TEXT `Label` | 27 |
| Switch | Checked(true/false) × Disabled(true/false) | 4 |
| Input | Size(sm/md/lg) × State(default/hover/focus/disabled); TEXT `Value` | 12 |
| Select (trigger) | State(default/open/disabled) × Value(placeholder/filled) | 6 |
| Select Item | State(default/highlighted/selected/disabled) | 4 |
| Select Menu | assembly of Item instances | 1 |
| Modal | single component; TEXT Title/Description, BOOLEAN Show Description / Show Footer; nested Button instances | 1 |

Component CSS values (paddings, font sizes) live in each `src/components/*/*.vue`
style block; bind to variables wherever a token exists, exact values allowed for
fixed geometry (e.g. switch thumb 18px, select item padding 6/10).

## Build order (per figma-generate-library skill)

1. Create file (drafts of upgraded pro team) → Phase 1 foundations (collections,
   variables + scopes + code syntax, styles) → Phase 2 pages/docs → Phase 3
   components one at a time (Button → Switch → Input → Select → Modal) with
   screenshot validation each → Phase 4 Code Connect + audits.
2. Run `get_libraries` + `search_design_system` after file creation and before each
   component (expect "build new" — custom Radix token model).

## Exact primitive values

sage light: 1 #fbfdfc 2 #f7f9f8 3 #eef1f0 4 #e6e9e8 5 #dfe2e0 6 #d7dad9 7 #cbcfcd
8 #b8bcba 9 #868e8b 10 #7c8481 11 #5f6563 12 #1a211e
sage dark: 1 #101211 2 #171918 3 #202221 4 #272a29 5 #2e3130 6 #373b39 7 #444947
8 #5b625f 9 #63706b 10 #717d79 11 #adb5b2 12 #eceeed
teal light: 1 #fafefd 2 #f3fbf9 3 #e0f8f3 4 #ccf3ea 5 #b8eae0 6 #a1ded2 7 #83cdc1
8 #53b9ab 9 #12a594 10 #0d9b8a 11 #008573 12 #0d3d38
teal dark: 1 #0d1514 2 #111c1b 3 #0d2d2a 4 #023b37 5 #084843 6 #145750 7 #1c6961
8 #207e73 9 #12a594 10 #0eb39e 11 #0bd8b6 12 #adf0dd
black alpha (both modes): a1 .05, a2 .10, a3 .15, a4 .20, a5 .30, a6 .40, a7 .50,
a8 .60, a9 .70, a10 .80, a11 .90, a12 .95 (rgba(0,0,0,x))
