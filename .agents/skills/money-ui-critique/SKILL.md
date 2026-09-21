---
name: money-ui-critique
description: A rubric for critiquing screens of a consumer money app (Home on Base) so that model or human reviewers judge against a real standard instead of taste words. Load when asked to review, rank or compare UI screenshots, Storybook stories or design directions. Produces a severity table compatible with upstream's review-findings format.
---

# Money UI critique

Run every check. Write down what you saw before you write down what you think. A finding without a specific element and a concrete fix is not a finding.

## 1. Three-second test

Look at the screen for three seconds, then look away and answer:
- What was the number? (The primary figure must be recalled exactly.)
- What was the one thing you could do? (Exactly one primary action.)
- What state was the money in? (Settled, pending, failed, unavailable, empty.)

If any answer is wrong or "not sure", that is a **major** finding against hierarchy.

## 2. Number legibility

- Primary balance ≥ 40px, tabular figures, tracking tightened, cents visually subordinate.
- Every amount column aligns on the decimal (tabular-nums). Mixed widths are a **minor**.
- Localized and long amounts (Rp 19.812.500,00, 12-digit values) fit without clipping. Clipping is a **blocker**.
- Signed amounts: `+` in gain colour only for money in, `−` (real minus, U+2212) for money out, plain for internal moves.

## 3. State coverage

The screen must exist, or be trivially derivable, in: funded, empty (verified zero), loading, partial (one source unavailable, others current), pending (unresolved movement), unknown (could not confirm), failed. For each: does the layout hold its geometry (skeletons match content), does the copy say what is true about the money, and is there a safe next step? A missing pending or unknown state on any money-moving surface is a **blocker**.

## 4. Move-money flow

- Destination is chosen explicitly, never preselected by rate.
- Amount step shows available balance and blocks over-spend with a reason, not a disabled button alone.
- Review lists amount, from, to, network, fee, and the balance after. The submit label repeats the amount.
- Pending says nothing has moved. Failed says no money moved and offers retry. Unknown says do not retry and routes to Activity.
- Focus lands on the result title. Back and Cancel are always reachable.

## 5. Colour and contrast

- Count the blue things. More than one primary action plus the active tab is a **major**.
- Semantic colours only on state (pills, deltas, media circles, result marks). Any decorative use is a **minor**.
- Dark mode: text on panel ≥ 4.5:1, muted ≥ 4.5:1 on canvas, hairlines visible but quiet. Check the blue button label in dark.
- Selection uses ink, not blue.

## 6. Spacing rhythm and density

- Gutter 20, section gap 24, panel inset 16, row min 56. Measure two; if either drifts by 4px or more it is a **minor** and usually reveals a wrapper problem.
- Nothing is a card that is not a list or a facts group.
- One banner maximum. No stacked notices, promos or tips on Home.

## 7. Copy

- Every control is a verb that says what happens. "Deposit $100.00", "Try again", "Go to Activity".
- Descriptions under ~24 characters on rows. Longer copy belongs in a sheet.
- No reassurance filler ("Your money is safe"), no eyebrows above already-clear headings, no legal copy on product screens.
- Errors: what went wrong, what happened to the money, what to do.

## 8. Touch and access

- 44pt minimum on every control; rows and CTAs 52+. Measure the smallest one.
- Focus-visible ring on every interactive element. Sheets trap focus and return it.
- Reduced motion removes spatial motion and keeps a short fade at most.
- Text at 130% still fits the tab bar, numpad, and CTA.

## 9. The generic-fintech smell test

Flag any of these as a **major** on a direction and a **minor** on a screen:
- Palette swap on the same DOM presented as art direction.
- System Arial or Georgia in a shipping screen.
- Gradient balance card, glassy tab bar, drop-shadowed cards on a white page.
- Three or more accent colours; blue used for state; green for "on".
- Marketing landing pages used as the visual reference for an app screen.
- Emoji, illustrations or celebratory confetti on financial results.

## Report format

Findings first, ranked. Then keep-list. Then verdict.

| Severity | Screen · element | What is wrong | Fix |
| --- | --- | --- | --- |
| blocker / major / minor | Home · positions row | Description truncates at 390 ("2 vaults · 4.04% weig…") | Shorten to "2 vaults · 4.04%" or cap the amount column at 16ch |

Severity follows upstream: blocker stops adoption, major must be fixed before review, minor is a follow-up or accepted with a reason. Taste-only notes with no user or coherence impact are non-blocking and go last, labelled as taste.
