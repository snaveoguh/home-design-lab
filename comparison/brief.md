# Brief — Home funded screen

You are the design engineer on a factory run for Home, a consumer money app on Base (USDC cash, savings vaults, borrow, invest). Produce ONE mobile screen: Home in its funded state, plus the same screen in a loading state and in a pending-deposit state.

## Deliverable

A single self-contained HTML file at the output path you were given. Requirements:
- Renders at 390×844 CSS px (design for that; it may be viewed narrower at 320).
- No frameworks, no external scripts. Google Fonts via `<link>` is allowed. Inline CSS.
- Three states selected by the URL hash: `#funded` (default), `#loading`, `#pending`. Implement with a tiny inline script that sets `data-state` on the root, or by toggling `hidden`. All three must be complete, not placeholders.
- Real content only. No lorem, no placeholder boxes standing in for content (skeletons are fine in the loading state).
- Semantic HTML, visible focus states, controls at least 44px tall.

## Facts (fixture, fixed)

- Clock: 2026-09-19 12:04 UTC. Region US, amounts in USD-formatted USDC.
- Available cash: $250.00. Saved: $1,000.00 across vaults Gauntlet $750.00 at 4.10% APY and Steakhouse $250.00 at 3.85% APY; Re7 is empty at 3.62%. Weighted savings rate 4.04%. Debt: $0.00, verified. Net position: $1,250.00.
- Recent activity (newest first): Received $250.00 from 0x2222…2222 today 11:52; Saved $500.00 into Gauntlet Sep 12; Saved $250.00 into Steakhouse Sep 12; Saved $250.00 into Gauntlet Sep 5; Sent $40.00 to 0x3333…3333 Sep 3.
- Pending state: a $100.00 deposit into Gauntlet was submitted at 12:03 and is not yet confirmed. Balances are unchanged until it confirms.

## Information the screen must carry

Net position as the primary figure; available cash and saved as its explanation; the way to move cash into savings and to add money; the positions (cash, saved, debt); recent activity; a route to Account. Navigation between Money, Activity and Explore.

## Direction (locked, do not argue with it)

Read `/home/user/jessepollak/home/docs/ui-direction.md` and follow Direction 1 exactly: its tokens, its rule that Base blue is the single primary action accent, no gradients or glass or drop shadows, green up / red down, motion limits, no compliance copy on product screens. Read `/home/user/jessepollak/home/.agents/skills/design-engineering/SKILL.md` and apply its working sequence.

Reference apps named by the owner: Mercury (unboxed balance, quiet canvas, hairlines), Cash App (confidence in the primary figure), Wealthfront (savings balance and rate before management).

## Report

When done, write `REPORT.md` next to the HTML with: the hierarchy you chose (primary figure, primary action), the states covered, and any check you did not perform. Do not claim checks you did not run.
