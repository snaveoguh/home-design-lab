# Blind critique — `money-ui-critique` rubric

Critic: a fresh model session given only `critic-rubric.md`, the rubric skill and the `blind/` images. Labels were shuffled; the mapping was withheld. Decoded ranking first, then the report verbatim.

## Decoded ranking

| Rank | Label | Entry |
| --- | --- | --- |
| 1 | T | Hand-designed lab (this repo) |
| 2 | R | Same brief, upstream inputs **plus** the four skills |
| 3 | P | Same brief, upstream inputs **only** |
| 4 | S | Jesse's real treatment B |
| 5 | Q | Jesse's real treatment C (his critic's winner) |

Caveat the rubric critic could not know: Q and S were never asked for loading or pending states (PR #675's brief was the funded composition only), so the "blocker" it assigns them for missing states is a difference in brief, not in craft. Read their placement on the other sections.

## Report (verbatim)

### Findings by entry (rubric sections 1–9)

#### P
| Severity | Element | What is wrong | Fix |
|---|---|---|---|
| major | Header · "Home" title / profile button | Title sits at x=0 and the profile circle is clipped by the right edge while the body uses a 16px gutter — a wrapper/negative-margin bug visible at the top of the screen | Put header inside the same 20px gutter container as the body |
| minor | Layout · gutter | Gutter is ~16px, not 20 (drift 4) | Set page gutter to 20 |
| minor | CTAs · Add money / Move to savings | ~48px tall; CTAs should be 52+ | Raise to 52 |
| minor | Balance · cents | $1,250.00 cents same size/weight as dollars; only the `$` is subordinated | Reduce cents to ~60% size / muted ink |
| minor | Positions · nested vault rows | Gauntlet/Steakhouse/Re7 sub-rows have no chevron so their amount column sits ~24px right of the parent rows — decimals do not align; Re7 "$0.00 · Not started" is noise on Home | Reserve chevron width on all rows (or drop sub-rows to the Saved detail); hide zero-balance, not-started vaults |
| minor | Loading · positions skeleton | Skeleton shows 2 vault sub-rows; content has 3 — geometry shifts on load | Match skeleton row count to content |
| minor | Loading · Add money | Primary stays active while balances are unknown | Disable or skeleton both CTAs until data lands |
| taste | Type | Body face reads as a system grotesk (Arial/Liberation-like) | Confirm shipping font |

Keep: three states supplied; "Available now" / "Verified · Nothing owed" state copy; pending card copy ("Submitted 12:03 · Confirming. Balances update when it clears") plus "$100.00 confirming" on the affected vault row; single blue primary; correct green `+` only on money in.

#### Q
| Severity | Element | What is wrong | Fix |
|---|---|---|---|
| blocker | States | No loading or pending state supplied (money-moving surface) | Supply both |
| major | Palette · Fund button, canvas | Primary is a dark plum, canvas is warm cream, zero Base blue anywhere — breaks the locked "Base blue single accent / off-white canvas" constraint | Rebuild on the locked tokens |
| major | 3-second · state | Nothing says whether balances are settled/verified/when updated ("Cash + savings · No debt" only) | Add availability/verification copy on Cash and Debt |
| minor | Balance · numerals | Serif display figures look proportional, not tabular; cents not subordinate | Tabular figures, subordinate cents |
| minor | Activity · amounts | "+250.00 USDC" and "−1,000.00 USDC" both in plain ink — no gain/loss colour; amounts are token-denominated, not $ | Green `+` for money in, red for out; show $ |
| minor | Actions · Buy / Sell / Borrow | Invest and Borrow rows with no balance or data; Buy/Sell outlined buttons compete with Fund at the same visual weight | Remove or collapse to a single row until the product exists |
| minor | CTAs | Fund ~46px, Buy/Sell ~44px | 52+ for CTAs |
| minor | Rhythm | Gutter ~25 (drift +5); heavy 2px rule under Available cash vs hairlines elsewhere | 20 gutter; one hairline weight |

Keep: calm one-column reading order; real minus (U+2212); ink selection on tab; restrained decoration.

#### R
| Severity | Element | What is wrong | Fix |
|---|---|---|---|
| major | Loading · whole screen | Net-position skeleton block runs off the right edge past the gutter, and the tab bar is missing entirely — layout does not hold geometry while loading | Constrain skeleton to the balance width; keep tab bar mounted |
| minor | Loading · Add money | Primary active while balances unknown (Move to savings correctly disabled) | Disable both |
| minor | Pending · activity row | "Pending" appears three times in one region (top pill, row subtitle, row pill) | Keep the top pill; row subtitle "12:03", drop the row pill |
| minor | Header | No screen title; only a floating profile icon | Add "Home" or intend the omission |
| minor | Balance · cents | Cents not subordinate | Subordinate cents |
| minor | Facts pair vs Positions | Cash/Saved facts pair repeats the Positions list verbatim | Drop one (the pair, or reduce Positions to Debt + link) |
| taste | Activity "Saved" rows | Plain amounts for internal moves — correct; note only that they lack any date grouping | — |

Keep: best rhythm of the five (gutter 20, CTAs 52, rows 60, tab 56); "Updated 12:04 UTC" + "Verified" give the clearest money-state; pending pill "$100.00 to Gauntlet · Not counted yet" says the truth about the number; amber used only for state; green media circle only on money in.

#### S
| Severity | Element | What is wrong | Fix |
|---|---|---|---|
| blocker | States | No loading or pending state supplied | Supply both |
| major | 3-second · state | No settled/verified/available copy; "No debt" only | Add availability/verification copy |
| minor | Panels · Available cash / Save cards | Grey-filled cards, not white panels with hairlines; the Save card is a single fact in a card (not a list or facts group) | White panel + hairline; merge Save into a facts group or a row |
| minor | Type · weight | Everything bold — label eyebrow, facts, headings — flattens hierarchy; "Net position" is a bolded eyebrow | One bold level (balance); labels regular/muted |
| minor | CTAs | Fund ~44px, Buy/Sell ~44px; activity rows ~52 | 52+ CTAs, 56 rows |
| minor | Rhythm | Cards at ~16 gutter, text at ~25 — 9px disagreement; 2px dark rule above tab bar | Single 20 gutter; hairline |
| minor | Activity · amounts | No gain/loss colour; token-denominated amounts | Green `+`, red `−`, $ |
| minor | Actions · Invest / Borrow | Rows with no data | Remove until real |

Keep: Base blue used exactly once; ink/grey pill for the active tab; balance ≥ 40px and unmistakable.

#### T
| Severity | Element | What is wrong | Fix |
|---|---|---|---|
| minor | Facts · "↗ 4.04% APY" | Green + up-arrow on a rate — semantic colour used decoratively (a rate is not a gain) | Ink/muted "4.04% APY" |
| minor | Facts pair vs Positions | "Available to use $250.00 / Saved $1,000.00" repeats the Positions rows verbatim | Drop one |
| minor | Pending · banner CTA | "View" is not a verb that says what happens | "Go to Activity" or "View deposit" |
| minor | 3-second · state | No verification/timestamp on the number; "Available to use" and "No debt" carry the state, so partial | Add "Verified" on Debt or an updated-at |
| taste | Section gap | Buttons → Positions heading ~28–32 vs 24 spec | Tighten |

Keep: only entry with subordinate cents; pending banner is rubric-exact ("$100.00 deposit is pending · Into Gauntlet. Nothing has moved yet."); loading state holds full geometry, keeps labels and tab bar, and skeletons both CTAs so nothing money-moving is tappable while unknown; gutter 20, CTAs 52, rows ~67; blue used once plus active tab.

### 1. Summary table

| Label | 3-second test (number / one action / state) | Blue elements | Smallest control (est.) | States supplied | Top defect | Top strength |
|---|---|---|---|---|---|---|
| P | $1,250.00 recalled / Add money / clear ("Available now", "Verified · Nothing owed") | 2 (Add money, active Money tab) | ~45 profile button; CTAs ~48 | funded, loading, pending | Header wrapper bug: title flush at x=0, profile button clipped | Complete state set with honest pending copy |
| Q | $1,250.00 recalled / Fund (Buy/Sell compete) / not stated | 0 (plum primary, cream canvas) | Buy/Sell ~44; Fund ~46 | funded only | Ignores the locked palette; no pending/loading (blocker) | Calm, well-ordered single column |
| R | $1,250.00 recalled / Add money / clearest ("Updated 12:04 UTC", "Verified") | 2 (Add money, active Money tab) | 52 CTAs; rows 60 (profile glyph hit area unknown) | funded, loading, pending | Loading state breaks: skeleton overflows canvas, tab bar disappears | Spacing rhythm and state copy on the number |
| S | $1,250.00 recalled / Fund / not stated | 1 (Fund; tab selection is ink) | Fund and Buy/Sell ~44 | funded only | No pending/loading (blocker); grey cards + all-bold flatten hierarchy | Single blue, ink tab selection |
| T | $1,250.00 recalled / Move to savings / mostly ("Available to use", "No debt"; no verified/updated) | 2 (Move to savings, active Money tab) | 52 CTAs; rows ~67 | funded, loading, pending | Green decorative APY; facts pair duplicates Positions | Rubric-exact pending banner and geometry-holding loading state; subordinate cents |

### 2. Ranked order

1. **T** — the only entry with no major finding: subordinate cents, a pending banner that says "nothing has moved yet", and a loading state that keeps geometry and disarms the CTAs; its defects are a green APY and a duplicated facts pair.
2. **R** — best rhythm and the clearest money-state copy on the number ("Updated 12:04 UTC", "Verified", "Not counted yet"), but the loading state visibly breaks (overflowing skeleton, missing tab bar), which is a supplied state a client would tap through.
3. **P** — structurally sound with all three states and good pending copy, but the header wrapper bug (title at the edge, clipped profile button), 16px gutter, 48px CTAs, misaligned nested-vault amounts and a "$0.00 · Not started" row all need fixing first.
4. **S** — stays on the Base-blue system and passes the three-second number test, but supplies no pending or loading state (blocker), uses grey cards and uniform bold weight that flatten hierarchy, and has 44px CTAs and inconsistent gutters.
5. **Q** — visually the most composed of the bottom two, but it discards the locked constraints outright (plum primary, cream canvas, zero Base blue, non-tabular serif figures), colours no gains or losses, and supplies no pending or loading state (blocker).

### 3. Client readiness

- **As-is:** T (mention the two minor fixes; nothing on it would embarrass anyone).
- **With fixes:** R (fix loading overflow + missing tab bar, disable Add money while loading, dedupe "Pending" in the row, decide on a title); P (fix the header wrapper bug and gutter, CTAs to 52, chevron-reserve on sub-rows, hide the not-started vault, match skeleton rows).
- **Not at all:** S and Q — both are missing pending and loading states on a money-moving surface (blocker), and Q additionally ignores the locked palette, so neither is reviewable as a Home direction until those are supplied.
