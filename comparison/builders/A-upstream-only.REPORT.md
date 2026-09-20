# Home — Money screen (funded / loading / pending)

File: `index.html` next to this report. Select a state with the URL hash: `#funded` (default), `#loading`, `#pending`. A tiny inline script in `<head>` sets `data-state` on `<html>` before first paint and re-applies on `hashchange`; unknown hashes (`#save`, `#activity`, …) leave the current state alone so in-screen links do not reset it. A second script at the end of `<body>` mirrors the state to `aria-busy` on `<main>`.

## Hierarchy

- **Primary figure:** Net position `$1,250.00`, unboxed on the canvas (Mercury), 44px/600 tabular-nums, near-ink. The currency mark is the only region-accent whisper (muted weight/colour). Directly beneath, its explanation in one line: `$250.00 available · $1,000.00 saved` (ink amounts, muted words).
- **Primary action:** `Add money`, the single Base-blue filled control on the screen. `Move to savings` sits beside it as an outline control (the route from cash into savings). Account (top right) is an outline circle; tab bar shows the active tab in Base blue and nothing else uses blue.
- **Positions panel** (white, hairlines, 12px radius): Cash `$250.00` · Saved `$1,000.00` with `Weighted 4.04% APY` (Wealthfront: balance and rate before management), then the three vault rows indented — Gauntlet `$750.00` 4.10%, Steakhouse `$250.00` 3.85%, Re7 `$0.00` 3.62% "Not started" — then Debt `$0.00` "Verified · Nothing owed". Cash, Saved and Debt rows carry a chevron and link onward; vault rows link to the vault.
- **Recent activity panel** with `See all` to Activity: Received `+$250.00` (green, the only colour signal — inflow), three Saved rows (neutral ink; internal moves do not change net position), Sent `−$40.00` (ink). Addresses are monospace; money is tabular sans.
- **Navigation:** fixed bottom tab bar Money (current) / Activity / Explore, 64px + safe area; Account reached from the top bar.
- Type is the system sans stack; no Google Fonts loaded, no gradients, glass, shadows or compliance copy. Green is used only for the inflow amount; APY rates stay ink/muted because they are rates, not changes.

## States covered

- `#funded` — everything above.
- `#loading` — label "Net position" stays; figure and explanation become static skeleton bars on canvas tone; `Add money` stays enabled (needs no balance); `Move to savings` is a real `disabled` button (needs the cash figure); positions keep their known labels (Cash / Saved / Debt) with skeleton amounts and two skeleton vault rows; activity shows three skeleton rows. `role="status"` text "Loading your balances." and `aria-busy="true"` on main; skeleton blocks are `aria-hidden`.
- `#pending` — balances unchanged (net `$1,250.00`, Gauntlet `$750.00`). A white pending strip under the actions (`role="status"`): rotating ring + "Saving $100.00 into Gauntlet — Submitted 12:03 · Confirming. Balances update when it clears." The Gauntlet vault row gains "· $100.00 confirming"; a pending row ("Saving into Gauntlet · Pending · Submitted 12:03 · $100.00 · Confirming", muted clock media) sits at the top of Recent activity above the 11:52 receipt.

## Interaction edges

- Every control is ≥44px (buttons 48px, rows 56px, tab cells 64px, account 44px, `See all` 44px). `:focus-visible` is a 2px Base-blue outline; row links use an inset outline so it is not clipped by the panel.
- Motion: CTA press `scale(0.985)` 120ms + colour; tab colour 160ms; row press background 120ms. No `transition: all`. `prefers-reduced-motion: reduce` removes the transform and transitions and stops the pending ring (it stays as a static partial ring). Balances never animate.
- Long content: row titles and subtitles ellipsise; amounts `white-space: nowrap`; `.row-main` has `min-width: 0`. At ≤340px the hero drops to 38px and buttons tighten.

## Checks performed

- Tag balance parsed with Python's `html.parser`: no unclosed or mismatched tags.
- Grep: no external `http` references, no "lorem".
- Contrast computed by hand from sRGB luminance: muted `#5b6270` on white ≈ 6.1:1, on canvas ≈ 5.8:1; white on Base blue ≈ 5.7:1; green `#0f7a43` on white ≈ 5.3:1.

## Checks not performed

- No browser render, screenshot, or `agent-browser` run (excluded by the run instructions), so layout at 390 and 320, tab-bar overlap with the last row, focus-ring appearance and skeleton widths are unverified visually.
- No screen-reader pass; `role="status"` announcements and `aria-busy` behaviour are unverified.
- No automated accessibility or HTML validator run beyond the tag-balance parse.
- The pending ring is a continuous 900ms rotation (state indication) rather than a bounded transition; whether that reads as "comparably short" under Direction 1 is a judgment call I did not test with a fresh reviewer.
