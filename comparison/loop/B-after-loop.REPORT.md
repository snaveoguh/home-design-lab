# B2 fix pass — Home (funded / loading / pending)

Revised page: `index.html` (draft kept as `index.original.html`). Every critique row is listed below with what changed.

## Hierarchy (unchanged from the draft)

- Primary figure: "Net position" $1,250.00, 48px / 500 / tabular, cents subordinate (see minor 7).
- Primary action: one blue "Add money" (52px CTA); "Move to savings" is outline. Blue appears twice on the screen: the CTA and the active Money tab.
- States: `#funded` (default), `#loading`, `#pending`, selected by URL hash via the inline script setting `data-state` on the root.

## Critique rows

| # | Severity | Row | Outcome |
| --- | --- | --- | --- |
| 1 | blocker | Loading · balance skeleton overflows 51px, no tab bar | **Fixed.** Root cause was `width: 13ch` at 48px (Geist `ch` is wide) on a block skeleton. Skeleton is now `width: 220px; max-width: 100%; height: calc(3rem * 1.08)` (exactly the balance line box), `margin: 0`, radius 8. All skeletons are now sized in px/rem with `max-width: 100%`, never `ch`. `overflow-x: clip` added on `html`, `body` and `.h-screen` as a guard so no state can scroll sideways. |
| 2 | major | Loading · tab bar absent | **Fixed.** Tab bar is no longer `position: fixed` + `translateX(-50%)`; it is the last child of the flex column with `position: sticky; bottom: 0; margin-top: auto`, so it exists in the flow of every state and cannot be pushed out by an overflowing sibling. Same DOM, same 56px + safe-area height, active = Money. `.h-main` bottom padding reduced to 32px since the bar now occupies its own space. |
| 3 | major | Funded + Pending · Cash / Saved facts pair duplicates Positions | **Fixed.** The `h-peers` pair is removed. The glance-level split moved into the hero subline ("Cash $250.00 · Saved $1,000.00") and the formula text is gone. The button row now sits 24px under the subline (hero padding-bottom 24). Positions still carries Cash / Saved / Debt as tappable rows. |
| 4 | major | Pending · hero status line says what is excluded, not where the money is | **Fixed.** Line is now "Pending · $100.00 to Gauntlet · Still in Cash" (pill kept, amount kept). |
| 5 | minor | All states · subline slot geometry drifts | **Fixed.** `.h-hero-meta` has `min-height: 1.75rem` (28px) with flex centering in every state; `.h-hero-amount` has `min-height` equal to the balance line box in every state and the loading skeleton fills exactly that height. The pill (20px) sits inside the 28px slot, so pending no longer adds 4px. With the peers pair removed, the Positions panel top moves up from the critic's 386 but should land on the same y in all three states. |
| 6 | minor | Funded · Activity panel top hairline 2px | **Fixed.** Cause confirmed: the hidden pending `li` still satisfies `li + li`, so the Received row drew its own separator on top of the panel border. Added `:root:not([data-state="pending"]) .h-rows > li.st-pending + li > .h-row::before { display: none; }`. |
| 7 | minor | Pending · "Pending" three times on one item | **Fixed.** Pill removed from the row's amount column. Row keeps the amber clock media, muted "$100.00" and "Pending · 12:03". Amber now appears exactly twice in pending (hero pill, media circle). |
| 8 | minor | Primary figure · cents not subordinate | **Fixed.** ".00" is `font-size: 0.5em; font-weight: 400; color: var(--h-muted); line-height: 1`, hung from the top of the figure (`inline-flex; align-items: flex-start` with a 0.22em top offset computed from Geist's cap height). Tabular figures kept. The cap-line alignment is computed, not rendered; see checks not performed. |
| 9 | minor | Subline separators: en dash, asymmetric middot | **Fixed.** The formula text (and its dash) is gone. The middot is now its own flex item (`.h-sep`) with the container's 8px gap on both sides, so spacing is symmetric. The only minus on the screen is the real U+2212 in "−$40.00". |
| 10 | minor | Pending · freshness stamp toggled by state | **Fixed by dropping it in both states.** Reason: the fixture clock is 12:04 and the stamp read 12:04, so it carried no information in funded; a freshness stamp belongs to the partial / unknown states, where it would take the same subline slot. State no longer decides whether it shows. |
| 11 | minor | "Received" description is a bare hash | **Fixed.** "From 0x2222…2222 · 11:52"; "Sent" row made consistent as "To 0x3333…3333 · Sep 3". |
| 12 | minor | Smallest controls may be under 44 | **Fixed / confirmed.** Account button: explicit `width/height/min-width/min-height: 44px`, `padding: 0`. "See all": `min-height: 44px` and `min-width: 44px` from the button's own box (its negative margins only overhang the heading, they do not shrink the hit box). Tab bar keeps `padding-bottom: env(safe-area-inset-bottom)`; the render environment reports 0 for that inset, so nothing visible changes there. |
| 13 | taste | Loading · "Move to savings" disabled | **Kept.** You cannot move what is not yet known; "Add money" needs no balance so it stays live. |

## Keep-list honoured

Hero + CTA hierarchy, Positions panel (verified-zero Debt row with muted amount), Activity signing (+ green for money in, plain ink for internal moves, real minus for money out, amber only on the pending item, chevrons and "See all" in ink). Blue count is still two.

## Checks not performed

- No render or screenshot was taken (builder role). The 220px skeleton width, the cents cap-line offset (0.22em) and the pixel geometry across states are computed from the token values, not measured. The mechanical overflow check must be re-run by the render step.
- Dark mode and 130% text size were not rendered; components read only tokens and rem sizes, as before.
- The Google Fonts link is unchanged; if Geist fails to load, the system fallback changes glyph widths but not the fixed-height slots.
