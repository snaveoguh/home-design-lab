# Blind critique, round two — the loop test

Question: does one render-and-critique pass close the gap between the skills build and the lab? Three entries, shuffled as X / Y / Z, judged by a fresh session with `critic-loop.md` (no rubric, no skills, mapping withheld).

## Decoded

| Label | Entry |
| --- | --- |
| X | Skills build after one loop (render → rubric critique → fix → re-render) |
| Z | Skills build, original one-shot |
| Y | The lab, as captured before its own post-critique fixes |

## Ranking (verbatim from the critic)

**1. X.** The three-second test passes in all three states: the number, "Add money", and (in pending) an amber pill that says the money is "Still in Cash" — the truest sentence about pending money in the set — all sit in the same geometry, with the pill replacing the sub-line at the same y so nothing below moves. Its faults are craft-level and small (a 72px icon among 80px icons, a truncated timestamp, "Verified" on the debt row) and none of them would survive a half-hour polish pass.

**2. Z.** Funded, Z is essentially X with full-size cents and an extra Cash/Saved two-up; it is calm, well-spaced and reads as a real money app. But its loading state is the weakest of the nine screens (skeleton bleeding off the right edge, tab bar missing) and its pending sentence "Not counted yet" is the one place in the set where copy risks telling the user something untrue about their money.

**3. Y.** Y has the most considered hero typography and the most explicit pending card ("Nothing has moved yet" is good), and "No debt" is the cleanest debt copy. It loses on state handling and product: the page changes shape in every state, the redundancy of Cash/Saved three times pushes Activity off the screen, and there is no way to add money from Home, which is a product decision I cannot judge as correct for a Home screen.

No ties. If X and Z were closer on pending copy I would separate them on the loading screen alone.

## Craft or product? (verbatim)

The gap between X and Z is craft: same product structure, same components, and Z would close most of it by fixing two loading-state bugs and rewording one line. The gap between those two and Y is product: Y decided Home should lead with "Move to savings" and "Send" rather than funding, decided to spend the fold on a stat block that duplicates the Positions card, and decided pending is a card that displaces the page rather than a status that annotates it. Those are defensible choices for a different brief, but under this one — a Home screen whose geometry must hold across funded/loading/pending — they cost Y the fold and the stability. I would put X in front of a client as-is, with the icon-size and truncation fixes flagged as known. Z I would show funded and pending only, with loading held back until the skeleton overflow and missing tab bar are fixed. Y I would not show as-is; it needs the product questions (funding path, what the stat block is for, whether pending is a banner or a status) answered before polish is worth doing.

## Correctness table (verbatim)

| Severity | Entry | Element | Finding |
|---|---|---|---|
| Major | Z | Loading: hero skeleton | The net-position skeleton bar runs from x=40 to the right edge of the viewport. It is wider than the content column and reads as a broken layout, not a placeholder. |
| Major | Z | Loading: tab bar | The tab bar is absent in the loading state; the Activity skeleton runs to the bottom of the frame. |
| Major | Z | Pending: hero sub-line copy | "$100.00 to Gauntlet · Not counted yet" is ambiguous about what is true. X's "Still in Cash" says the true thing. |
| Major | Y | Funded: primary actions | No "Add money" entry point anywhere on Home. |
| Major | Y | Loading: geometry | Layout does not hold; the stat block loses its third line and everything below the hero jumps on data arrival. Both action buttons are skeletonised, so there is no visible action during load. |
| Major | Y | Pending: geometry | The pending card is inserted between actions and Positions; Activity disappears below the fold. Funded, loading and pending are three different page shapes. |
| Major | Y | Funded: redundancy / fold | Cash and Saved are rendered three times above the fold. Only one Activity row is visible. |
| Minor | X | Activity "Received" row | Icon circle 72px among 80px siblings; title starts 6px early. |
| Minor | X | "Received" subtitle | "From 0x2222…2222 · 11…" truncates the timestamp. |
| Minor | X | Loading: Activity header | "See all" dropped in loading; heading shifts ≈5px. |
| Minor | X, Z | Positions: Debt row | "Verified" against a debt balance is unexplained copy. |
| Minor | Z | Funded: hero sub-line | Formula plus a UTC timestamp reads as a server log; uneven spacing before the interpunct. |
| Minor | Z | Pending: geometry | Pill line taller than the text line; stats, actions and Positions move 8–10px. |
| Minor | Z | Pending: Activity row | "Pending" three times in one row plus the hero. |
| Minor | Z | Funded: stat block vs Positions | Duplicate data within one viewport. |
| Minor | Y | "USDC on Base" | Rail-level detail on a consumer Home. |
| Minor | Y | "↗ 4.04% APY" in green | Green is reserved for money in. |
| Minor | Y | Secondary button | "Send" fill barely distinguishable from the canvas. |
| Minor | Y | Pending copy | "deposit" is the word for adding money from outside; this is an internal move. |
| Minor | X | Hero sub-line | "Cash $250.00 · Saved $1,000.00" repeats the Positions card, lighter than Y/Z's blocks. |

## What the lab did with its findings

Applied after this round: pending is now a pill in the hero line ("Still in cash") that never moves the page; the loading peers keep their third line; "USDC on Base" became "Ready now"; the secondary button sits white on the canvas; Add money, the green APY and the word "deposit" were already fixed after round one. Left as a product question for Jesse: whether Home leads with funding or with saving.
