---
name: platform-references
description: Distilled reference for what Apple (HIG, iOS 26) and Google (Material 3 Expressive) currently do that applies to a mobile-web money app, plus the product patterns worth borrowing from Mercury, Cash App, Wealthfront and Monzo. Load when making a layout, motion, navigation or component decision and you want it grounded in platform convention rather than invented. Also says what we deliberately do not take.
---

# Platform references for Home

These are the conventions Home borrows, each with the reason and the boundary. When upstream `docs/ui-direction.md` disagrees, upstream wins.

## Apple Human Interface Guidelines (iOS 26)

Borrowed:
- **44pt minimum hit target**, 8pt minimum spacing between targets. Home uses 44 / 48 / 52 / 56.
- **Large title on root screens** that reads as the destination name; pushed screens use an inline centred title with a leading Back. Home: Activity and Explore get large titles, Home's balance is its own title.
- **Grouped inset lists**: rows on a white group with hairlines inset from the text edge, chevron on navigable rows only. This is the `h-panel > h-rows` pattern.
- **Sheets**: a grabber, a large top radius, the title takes focus, swipe or scrim dismisses. Detents are one decision high.
- **Semantic colour**: system green / red for gain / loss meaning, never for decoration. Tints at low opacity behind icons.
- **Dynamic Type**: sizes in rem, layouts that survive 130%.
- **Tab bar**: three to five items, icon over label, active item tinted, sits above the home indicator (safe-area inset).
- **Motion**: short, interruptible, eases out, reduced-motion respected.

Not taken:
- **Liquid Glass** (translucent, refractive bars and controls). Upstream bans glass and gradients, and a money app that is read constantly benefits from opaque surfaces. We keep the *behaviour* Liquid Glass introduced (bars that get out of the content's way, concentric corner radii between a control and its container) without the material.
- SF Symbols. Home draws its own 24-box icons at 1.75 stroke to match Geist.

## Material 3 Expressive (Google, 2025)

Borrowed:
- **State layers**: a press is a tinted overlay of the content colour on the surface, roughly 10%. Home's `--h-well` press and the row press are this idea in tokens.
- **Emphasised easing** for the few larger moves (sheet enter) and standard easing for everything else. Home's `--h-ease` is a single ease-out; durations stay under upstream's caps.
- **Shape as hierarchy**: full-round for chips and pills, 8 for controls, 12 for containers, 20 for sheets. Radii get larger as the surface gets larger.
- **Expressive type pairing done with one family**: hierarchy through size and weight rather than a display face.
- **Button groups and segmented controls** for filters that change what a list shows.
- **48dp comfortable target** as the default for secondary controls.

Not taken:
- Tonal surfaces (five elevation tints of the primary colour) and the springy, overshooting motion. Both fight the quiet financial canvas and upstream's motion limits.
- The FAB. Home's primary action lives in the content, next to the number it acts on.

## Product references

| App | What to borrow | What to leave |
| --- | --- | --- |
| Mercury | Unboxed balance on a quiet canvas, hairline separators, typography-led hierarchy, calm dark mode | Sidebar, account-card grid, wordmark, its palette |
| Cash App | Confidence of the primary figure, two-button action row under it, bare numpad with a large amount, preset chips | Brand green, promotional tiles, playful motion |
| Wealthfront | Savings balance and rate before management details, "how it's counted" transparency | Marketing tone |
| Monzo | Activity grouped by day with a small day header and count, pending shown inline in the list | Pastel category colours, feed-like density |
| Copilot | Pending money visible without pretending it settled | Net-worth-first framing |

Use real app screens (Mobbin, App Store screenshots, a device) as the reference, never a marketing landing page. Note the exact spacing and type sizes you measured, not the impression.

## How to use this skill

1. Name the decision (for example "how should a pending deposit appear on Home?").
2. Find the platform convention above that governs it (state is form + colour; one banner; pending shown inline in Activity).
3. Apply it through Home's tokens and components, not by importing the platform's material.
4. Record the choice in the design lab README under "Decisions" so the next screen inherits it.
