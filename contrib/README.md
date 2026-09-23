# Contributions for jessepollak/home

Ready-to-apply work against `jessepollak/home` main at `1083148`, built from the follow-up list in PR #803 (`docs/design-explorations/design-system.md`).

## 0001 · Button `size="touch"` (P0 follow-up from #803)

`0001-feat-ui-button-size-touch.patch`

- Adds `size="touch"` (44px) to the Button cva. `lg` stays 36px.
- Moves the fifteen `size="lg"` + `className="h-11"` buttons to `size="touch"`. No visual change; Code Connect can now map 1:1.
- Moves the five 36px CTAs named in #803 to `size="touch"`: Continue (access form), Retry sign out and Try again (sign-in shell), Retry loading memes (invest category), copy address (add money).
- Leaves primary navigation (owns `min-h-11`) and the savings vault picker row (an `Item` rendered through `Button`, measured at 56px) on `lg`.
- Adds a `UI/Button › Sizes` story and a line in `docs/design-system.md`.

Checks run on the branch: `typecheck`, `oxlint`, `bun run gates`, `bun test` (2011 pass, 0 fail) and `build-storybook` all pass. The Sizes story renders sm 28, default 32, lg 36, touch 44 (`button-sizes-storybook.png`). Not run: `agent-browser` against the Home routes and the Playwright smoke suite, which need his fixture server.

Apply:

```sh
git checkout -b feat/button-touch-size origin/main
git am < contrib/0001-feat-ui-button-size-touch.patch
```

## Contrast audit of the Home tokens (not a patch; for Jesse to decide)

Measured from `apps/web/app/globals.css` on main. #803 records Dark as an unreviewed stub, and dark mode is not switched on in the app yet, so the dark rows are latent.

| Theme | Pair | Ratio | Needs | Note |
| --- | --- | --- | --- | --- |
| Light | `muted-foreground` on `muted` / `secondary` | 4.34:1 | 4.5 | Fails for small text on grey surfaces. `oklch(0.52 0 0)` gives 5.05 on muted and 5.51 on white. |
| Light | `muted-foreground` on `background` | 4.73:1 | 4.5 | Passes. |
| Light | `border` / `input` on `background` | 1.26:1 | 3.0 | Fine for decorative hairlines; fails where the border is the only boundary of an input. |
| Dark | `primary` #0052ff as text on `background` / `card` | 3.44 / 3.11:1 | 4.5 | Links, `text-primary` and badges. A dark-only text blue such as #5b8cff gives 5.66 on card; the button fill can stay #0052ff (white on it is 5.75). |
| Dark | `card` vs `background` | 1.10:1 | ~1.2 | Cards barely separate from the page. |
| Dark | `border` (10% white) on `card` | 2.69:1 | 3.0 | Same input-boundary caveat. |
| Dark | `muted-foreground` on `card` / `muted` | 6.91 / 5.83:1 | 4.5 | Passes. |
| Both | `market-gain` for money in | 5.95 / 8.50:1 | 4.5 | Passes. |
