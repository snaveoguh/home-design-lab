---
name: home-ui-components
description: Component contracts for the Home UI system (buttons, rows, facts, hero, peers, sheet, numpad, pills, tab bar and more). Load when composing or reviewing a screen so pieces are reused rather than reinvented, and when porting a piece to a shadcn variant. Each entry names the variants, the states that must exist, and when not to use it.
---

# Home UI components

Live source: `home/system.css` (styles) and `home/components.js` (render helpers). Open the Components screen in the design lab to see every state tappable. Class names are `h-<component>`; variants and states are data attributes, so each maps one-to-one onto a shadcn `variant` / `size` prop.

## Composition rules

1. **One primary per screen.** Exactly one `h-btn[data-variant="primary"]` visible at a time. Everything else is outline, secondary or quiet.
2. **Panels hold lists or facts.** A panel is a white surface on canvas with a hairline. It never holds a single sentence, a hero, or a button on its own.
3. **Rows are the unit of information.** Media, title, description, trailing amount, optional chevron. If it has an amount it is a row, not a card.
4. **Sheets hold one decision.** A sheet has a title, at most one paragraph or a facts list, and one to two actions. Multi-step work is a takeover screen, not a sheet.
5. **State is form, not only colour.** Pending gets the clock media plus the amber pill plus "Pending ·" in the description. Colour-blind readers get the same message.

## Catalogue

| Component | Variants | States that must exist | Notes |
| --- | --- | --- | --- |
| `h-btn` | primary, secondary (default), outline, quiet, destructive, inverse · sizes cta 52 / default 48 / sm 36 / inline 28 · `data-block` | rest, press (scale 0.985 + bg), focus-visible, disabled (opacity 0.4), loading (spinner, label hidden, no pointer) | Label is a verb. "Deposit $100.00", not "Confirm". |
| `h-iconbtn` | ghost (default), `data-surface="well"`, `data-tone="muted"` | rest, press, focus | 44×44 minimum. Always has `aria-label`. |
| `h-chip` | rest, `aria-pressed="true"` (ink) | press | Amount presets, filters. Never a status. |
| `h-seg` | 2 to 4 items, `aria-selected` | press | Filters that change what a list shows. Selected item is a white panel with a hairline ring. |
| `h-pill` | tone gain / loss / attention / neutral, `data-dot="none"` | – | Status only. Leading dot carries the colour so text stays legible. |
| `h-delta` | dir up / down / flat | – | Percent or rate change. Arrow icon plus number. Never blue. |
| `h-hero` + `h-hero-amount` | `data-size="long"` for > 12 chars | loading (skeleton), unavailable ("Unavailable" in the same slot) | Label above, meta line below with a dot separator. Cents drop to weight 400. |
| `h-peers` | two columns | loading, unavailable (em dash + "Unavailable") | The two numbers that explain the hero. Never three. |
| `h-row` | `button` when it navigates, `div` when static; media circle 40 (`data-size="sm"` 32), tones gain / loss / attention / ink, `data-shape="square"`; amount tones gain / muted; `amountSub` caption; `chevron` off for copy or switch rows | press (well bg), focus | Title truncates on one line; keep descriptions under ~24 characters at 390 wide. Trailing amount max 16ch. |
| `h-rows` | inside `h-panel` (hairline inset from text edge) or bare | – | Group by meaning, not by count. |
| `h-facts` | `data-emphasis` on the row that matters (17px value) | – | Review, receipt, "how it's counted". Values tabular, caption on a second line for sub-facts ("Unchanged", "4.10% APY"). |
| `h-banner` | tone attention / loss, optional quiet action | – | One per screen. Only for something unresolved that the person can act on. |
| `h-skeleton` | text, `data-shape="circle"` | – | Same geometry as the content it replaces. Pulse is off under reduced motion. |
| `h-empty` | icon, title, description, optional CTA | – | Explain what will appear here and how to make it appear. |
| `h-steps` | done / current / upcoming | – | Only on takeover flows with 3 or more steps. |
| `h-result` | tone gain / loss / attention with matching icon | – | Title takes focus on arrival. Description says what happened to the money in one sentence. |
| `h-tabbar` | 3 items, `aria-current="page"` | – | Icons 24, labels 11/600. Active is the one place blue repeats. Padding-bottom carries the safe-area inset. |
| `h-sheet` | grabber, head, body, foot | open / closed; reduced motion fades | Title takes focus, Escape and scrim close, focus returns to the opener. Tab is trapped. |
| `h-toast` | icon + text, ink on canvas | visible 2.2s | Confirms an action the person just took ("Address copied"). Never for errors. |
| `h-amount-entry` + `h-numpad` | `data-empty`, `data-invalid`, `data-size="long"` | invalid shows the reason in the help line | Bare keys, 56 tall, press shows the well. Delete is muted. |
| `h-input` | default, `data-variant="code"`, `aria-invalid` | focus (ink ring), invalid (loss border + `h-field-error`) | Well surface, no border at rest. |
| `h-switch` | `aria-checked` | – | On is ink, not green or blue. |
| `h-topbar` | inline title with lead / trail, or no title with `h-large-title` in the scroll area | – | Root tabs use large titles; pushed and flow screens use the inline title. |

## Porting a piece to shadcn

Take the `.h-<name>` block from `system.css`, move its `data-variant` branches into `cva()` variants in `components/ui/<name>.tsx`, and keep the hex-free token reads. Product code then only passes `variant`, `size` and layout classes, which is what upstream lint requires. Keep the `data-slot` attribute the shadcn CLI generates so upstream's `[data-slot="button"]` selectors keep working.

## When a new component is tempting

First try: a row with a different media, a facts list, or a sheet. Most "new component" asks are one of those three with different copy. A genuinely new piece needs a name, its variants, its required states and a place in this table before it ships.
