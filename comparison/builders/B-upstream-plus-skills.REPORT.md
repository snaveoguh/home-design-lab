# Home funded screen — report (variant B)

File: `index.html` next to this report. Self-contained, inline CSS, one inline script that reads the URL hash and sets `data-state` on `<html>` (`#funded` default, `#loading`, `#pending`). Geist / Geist Mono via a Google Fonts `<link>`, system sans fallback stack.

## Hierarchy

- **Primary figure:** Net position `$1,250.00`, unboxed on the canvas (Mercury), 48 / 500 / −0.03em, cents at 400, tabular figures. Label "Net position" above; meta line below "Cash + saved − debt · Updated 12:04 UTC".
- **Explanation of the figure:** two peers directly under it, Cash `$250.00` and Saved `$1,000.00`, 24 / 500. Never three; debt lives in Positions.
- **Primary action:** one blue button, **Add money** (52px CTA). **Move to savings** sits beside it as an outline control — the route from cash into savings, with no second blue. Blue appears exactly twice on the screen: Add money and the active Money tab.
- **Positions:** a white panel of three navigable rows (chevrons): Cash `$250.00` "Available"; Saved `$1,000.00` "2 vaults" with the weighted rate `4.04% APY` as the caption under the amount (Wealthfront: balance and rate before management; the vault breakdown belongs on Save, not Home); Debt `$0.00` muted, "Nothing owed", caption "Verified".
- **Activity:** section head with a quiet "See all"; a panel of the five fixture events, newest first. Received is `+$250.00` in gain colour with a gain-tinted media circle; Sent is `−$40.00` (U+2212) in ink; the three Saves are plain internal moves. Addresses are Geist Mono. Descriptions are all ≤ 24 characters.
- **Account:** 44×44 icon button in the top bar trailing slot. The top bar has no title: the balance is the title (root-tab rule).
- **Navigation:** fixed tab bar with Money (active, `aria-current="page"`), Activity, Explore; 56px plus the safe-area inset.

Section rhythm: gutter 20, panel inset 16, section gap 24, row minimum 56, hairlines inset from the text edge (16 + 40 + 12).

## States covered

| State | What changes |
| --- | --- |
| `#funded` | Everything above. |
| `#loading` | Hero amount, meta, both peers, three position rows and five activity rows become skeletons of the same geometry (height matched to each line box). Headings, label, Account, tab bar and Add money stay. Move to savings is `aria-disabled` because its amount step depends on the balance. "See all" is hidden. `main` gets a visually hidden `role="status"` "Loading your balances". Pulse is off under reduced motion. |
| `#pending` | Balances unchanged (`$1,250.00`, `$250.00`, `$1,000.00`). Hero meta line becomes an amber "Pending" pill + "$100.00 to Gauntlet · Not counted yet". A new first activity row "Saving to Gauntlet" / "Pending · 12:03" with the clock media in attention tone, `$100.00` muted, and the amber pill under the amount — state as form (clock, pill, word) not only colour. No banner: nothing here needs an action from the person, and one banner per screen is reserved for that. |

Not built (out of scope for this brief, noted for the rubric): empty, partial-unavailable, unknown, failed.

## Interaction edges

- Every control ≥ 44px tall (icon button 44, "See all" 44 overhanging the heading, outline/secondary 48, CTA 52, rows 56, tabs 56).
- `:focus-visible` ring in ink, 2px; rows draw it inset so the panel's `overflow: hidden` cannot clip it.
- Press: buttons scale 0.985 + background over 120ms ease-out; rows show the well background. Only `transform`, `opacity` and colour are transitioned; no `transition: all`.
- `prefers-reduced-motion` / `data-motion="reduce"`: press durations go to 0, scale removed, skeleton pulse off, `scroll-behavior: auto`.
- Dark mode via the token media block and `[data-theme="dark"]`; no component reads a hex.
- Under 360px wide the two action buttons stack to one column so "Move to savings" never clips; sizes are rem for text scaling.
- No compliance, reassurance or legal copy anywhere on the screen.

## Self-review (money-ui-critique), findings fixed before finishing

| Severity | Screen · element | What was wrong | Fix |
| --- | --- | --- | --- |
| major | Home · action row | "Move to savings" at 17/600 plus a 20px icon did not fit half of 390 minus gutters | Dropped both button icons; stack the pair under 360px |
| minor | Home · Positions section gap | 32px between actions and Positions, rubric says 24 | 24 |
| minor | Home · Activity head | 44px-tall head pushed the heading rhythm | "See all" overhangs with computed negative margins |
| minor | Home · top bar | Visible "Home" wordmark competed with the balance-as-title rule | Removed; sr-only `h1` kept |
| minor | Home · Received row | Description was 25 characters | "0x2222…2222 · 11:52" |
| minor | Home · pending row | Pill repeated "Pending" to screen readers | Pill `aria-hidden`; description carries the word |

Residual, accepted with a reason: the clock reads "12:04 UTC" because the fixture fixes the clock in UTC; a production build would render the user's local zone.

## Checks performed

- Static read-through of markup and CSS against the foundation, components, platform-references and critique skills.
- Parser pass over the file: element pairs balance; exactly one `data-variant="primary"` button in the markup; no `<script src>`; no `transition: all`; no hex outside the token blocks.
- Hand arithmetic of skeleton heights against each line box, and of the action-button text room at 390 and 320.

## Checks not performed

- No browser render, screenshot, or `agent-browser` run: the screen was not viewed at 390×844, 320, 130% text, or in dark mode.
- No measured contrast ratios beyond the values the token file documents.
- No verification that Google Fonts serves Geist in the review environment (the fallback stack applies if it does not).
- No keyboard walk-through or screen-reader pass.
