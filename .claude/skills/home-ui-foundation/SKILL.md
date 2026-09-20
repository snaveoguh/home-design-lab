---
name: home-ui-foundation
description: The visual foundation for Home, a consumer money app on Base. Load before styling any user-visible surface. Gives the token set (colour, type, space, shape, motion, hit targets), the rules for using it, and how it ports to Tailwind v4 / shadcn. Extends jessepollak/home Direction 1 without changing its locked values.
---

# Home UI foundation

Source of truth: `home/tokens.css`. Read it, do not restate it from memory.
Upstream Direction 1 values (ink `#0a0b0d`, muted `#5b6270`, canvas `#f7f8fa`, hairline `#e6e8ec`, blue `#0052ff`, radius 8 / 12) are kept byte-for-byte. Everything else here is added.

## What the system is

A calm financial instrument. The number is the hero, the canvas is quiet, hierarchy comes from size and weight, not from colour or chrome. Mercury's unboxed balance and hairlines, Cash App's confidence in the primary figure, Apple's spacing and hit targets. Never a trading terminal, never a promotional wall.

## Colour rules

- **Ground and ink only.** Canvas behind, white panels on top, 1px hairlines between. No gradients, no glass, no drop shadows on panels. The only elevation in the system is the sheet over its scrim.
- **Blue is the one primary action** on a screen, plus the active tab. If two things are blue, one of them is wrong. Secondary actions are outline or well surfaces in ink.
- **Selection is ink, not blue.** Selected chips, segmented items and chosen rows use `--h-ink` on `--h-canvas`. This keeps blue meaning "do the thing".
- **Semantic colour is separate from the accent.** `--h-gain` (green) for up and confirmed, `--h-loss` (red) for down and failed, `--h-attention` (amber) for pending, unconfirmed, unavailable. Each has a `-tint` for media circles and pills. Never use them decoratively and never use blue for state.
- **Greys are cool-biased** toward the accent (`--h-ink-soft`, `--h-quiet`, `--h-well`). Do not introduce a neutral grey or a warm grey.
- **Dark mode is designed, not inverted.** Blue lifts to `#2f6bff`, semantic colours lift for contrast, panels are `#14161a` on `#0b0c0f`. Every component reads only tokens, so nothing needs a dark override.

## Type

Geist for everything, Geist Mono for addresses and hashes only. System sans fallback stack. One family, hierarchy by size and weight.

| Role | Size / weight / tracking | Use |
| --- | --- | --- |
| Balance | 48 / 500 / −0.03em, cents at 400 | One per screen, the primary figure |
| Balance long | 34 / 500 / −0.02em | Amounts over 12 characters or localized |
| Large title | 28 / 600 / −0.02em | Root tab screens only (Activity, Explore) |
| Title | 20 / 600 / −0.015em | Flow questions ("Where should this go?"), sheet titles |
| Headline | 17 / 600 / −0.01em | Section heads, top bar title, CTA label |
| Body | 16 / 400 | Copy, row titles (at 500) |
| Secondary | 14 / 400 muted | Descriptions, helper text |
| Caption | 12 / 400 quiet | Timestamps, meta under amounts |
| Eyebrow | 11 / 600 / +0.06em caps | Day headings, gallery labels. Sparingly. |

- All money and any column of digits gets `tabular-nums lining-nums` (`.h-num`).
- Sizes are `rem` so text-size settings scale them. Test at 130%.
- Row amounts are 17 / 500. Peer amounts under the balance are 24 / 500.

## Space, shape, targets

- 4pt scale: 4, 8, 12, 16, 20, 24, 32, 40, 48. Screen gutter 20. Panel inset 16. Section gap 24.
- Radius: controls 8, panels 12, sheet 20 (top corners), chips and pills full.
- Hit targets: 44 minimum (icon buttons), 48 comfortable (secondary buttons, inputs), 52 primary CTA, 56 minimum list row. Tab bar 56 plus the safe-area inset.
- Hairlines between rows are inset from the text edge, not the panel edge, so the media column reads as a column.

## Motion

Upstream limits are law: press 120ms, chip 120ms, tab 160ms, fade 140ms, sheet 220ms. Ease-out only (`--h-ease`). Animate `transform` and `opacity`. Balances, amounts and positions never animate. Under `prefers-reduced-motion` or `data-motion="reduce"` every duration is 0 and the sheet fades instead of sliding.

## Porting to Tailwind v4 / shadcn

1. Paste the `:root`, dark media and `[data-theme="dark"]` blocks into `globals.css` and map them in `@theme`: `--color-canvas: var(--h-canvas)` and so on. Product code then uses `bg-canvas`, `text-muted`, `border-hairline`.
2. Map `--h-blue` to shadcn `--primary`, `--h-hairline` to `--border`, `--h-well` to `--muted` / `--secondary`, `--h-ink` to `--foreground` and `--ring`.
3. Upstream lint bans hex in product code: only tokens ever appear at a use site. Reusable presentation goes into `components/ui` variants, which is exactly how `system.css` is organised (one class, data-attribute variants).

## Do not

- Add a second accent, an illustration style, or an icon library. Icons are 24-box, 1.75 stroke, round joins, drawn to match the type weight.
- Put legal, eligibility or "not an endorsement" copy on a product screen. It lives under Account → Disclosures.
- Stack notices. One banner per screen at most.
- Use a heading where a label will do, or an eyebrow where a heading will do.
