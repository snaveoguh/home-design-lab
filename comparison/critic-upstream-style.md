# Blind critique — upstream-style brief ("coherence and visual character")

Critic: a fresh model session given only `critic-jesse.md` and the `blind/` images. Labels were shuffled; the mapping was withheld. Reproduced verbatim below, then decoded.

## Decoded ranking

| Rank | Label | Entry |
| --- | --- | --- |
| 1 | T | Hand-designed lab (this repo) |
| 2 | R | Same brief, upstream inputs **plus** the four skills |
| 3 | Q | Jesse's real treatment C (his critic's winner) |
| 4 | P | Same brief, upstream inputs **only** |
| 5 | S | Jesse's real treatment B |

## Report (verbatim)

### Ranked list

1. **T** — The only candidate that reads as one deliberate system: unboxed net position with the cents dropped to a lighter tone, two hairline rules instead of cards for the Available/Saved summary, savings rate shown in green beside the balance (Wealthfront order: balance and rate before any management), then a single quiet Positions card. Loading and pending states are drawn in the same language (skeleton buttons, an amber-bordered pending card with "Nothing has moved yet" and a View affordance). Its one real product gap is that the funded Home has no add-money action.

2. **R** — Confident and Cash-App-like: the largest balance, a Cash/Saved two-column under it, two full-width actions, then Positions and Activity in matching cards. The icon circles on every row add visual noise the typography does not need, and the "Updated 12:04 UTC" line is engineering-speak, but the hierarchy is clear and the pending treatment (a Pending pill replacing the formula line, "Not counted yet") is the most honest of the five. Loses to T on canvas quietness and on loading-state bugs.

3. **Q** — The strongest visual character by a distance: serif numerals, warm cream canvas, plum ink, a single heavy rule under the cash block and hairlines below — this is the Mercury brief taken seriously. It is character without a finished component system, though: the Fund button is a hard square while nothing else is, the Buy/Sell outlined boxes look like a wireframe, and Invest/Borrow rows and a two-tab bar are outside the funded-Home scope. Activity is denominated in USDC while balances are in dollars.

4. **P** — Coherent but generic and dense. It exposes vault management on Home (Gauntlet/Steakhouse/Re7 sub-rows, a "Not started" $0 vault) which inverts the Wealthfront rule of balance-and-rate before management, and the whole page is boxes inside boxes. Its pending state is actually the most informative ("$100.00 confirming" on the Gauntlet row), and the "$250.00 available · $1,000.00 saved" summary line is a good idea, but the header ignores the gutter and the screen feels like a template rather than a product.

5. **S** — Same content as Q, re-skinned in system blue and grey. Two grey-fill cards, then bare Invest/Borrow rows, then a rule, then a list; a 2px black rule over the tab bar and a grey pill on the active tab; outlined black Buy/Sell buttons beside a blue Fund button. Three different container idioms on one screen — the least coherent of the set, with none of Q's character to compensate.

### Correctness findings (severity · entry · finding)

| Severity | Entry | Finding |
|---|---|---|
| major | P | Header ignores the 16px gutter: "Home" sits at x=0 and the avatar button is clipped by the right edge (P.png, P-loading, P-pending). |
| major | R | Loading state: the net-position skeleton overflows the right edge of the viewport, and the tab bar is absent (R-loading.png). |
| major | Q, S | Activity is in USDC ("+250.00 USDC") while every balance is in $; the $1,000 move into savings is listed as "Sent USDC −1,000.00", which reads as money leaving the account. |
| major | T | No add-money / fund action on the funded Home (only Move to savings and Send); the pending banner calls a savings move a "deposit". |
| minor | P | "Re7 · 3.62% APY · Not started · $0.00" zero-balance vault appears in Positions on Home; "Verified" on the Debt row is jargon. |
| minor | R | Double space before "· Updated 12:04 UTC"; pending activity row says "Pending" three times (subtitle, pill, and title); first Activity row shows a small step where the tinted row meets the card's top corner. |
| minor | T | Saved row reads "2 vaults · 4.04%" without "APY"; Send button border is nearly invisible on the grey canvas. |
| minor | Q | Fund button is square-cornered while nothing else establishes a square-corner system; Buy/Sell outlined boxes read as unfinished. |
| minor | S | 2px black top rule on the tab bar and grey pill behind the active tab; Buy/Sell outlined black buttons do not match the blue Fund button. |
| minor | Q, S | Tab bar has only Home/Activity; Invest and Borrow rows are outside the funded-Home brief. |

### Recommendation

Adopt **T** as the base. It is the only candidate that lands the brief on both axes at once: a quiet canvas, a typography-led hierarchy that puts net position, available cash and the savings rate ahead of any management UI, restrained rules instead of nested cards, and loading/pending states drawn in the same language as the funded state. Its gaps are product decisions (add an Add money action; rename "deposit"; put APY back on the Saved row), not design incoherence. If the owner wants more visible character than T offers, Q shows what that could look like — serif numerals and a warm canvas — and those choices could be ported onto T's structure; but Q as delivered is a mood rather than a system, and R, while confident and well-stated, spends its screen on icon circles and cards that T proves are unnecessary.
