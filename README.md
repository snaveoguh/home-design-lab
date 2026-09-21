# Home design lab

A mobile-first UI system and set of screens for **Home**, Jesse Pollak's consumer money app on Base, built as a response to [jessepollak/home PR #675](https://github.com/jessepollak/home/pull/675). It was built by an agent, directed from a phone, on top of his locked Direction 1 tokens with one screenshot-and-critique pass and uses his exact fixture numbers, so it compares like for like with his Storybook explorations.

Open it on a phone. That is the review surface.

## Run it

Static files, no build.

```sh
cd home && python3 -m http.server 4173
# then open http://127.0.0.1:4173/
```

On a laptop you get a 390 wide frame with a sidebar of screens, states and controls (theme, reduced motion, text size, move outcome, frame width). On a phone the app is full-bleed with no chrome; tap the **Home** wordmark, or open `#/lab`, for the menu of screens, states and controls.

Deep links: `#/home?state=funded|pending|unknown|partial|empty|loading|large`, `#/save`, `#/cash`, `#/move/destination`, `#/activity`, `#/explore`, `#/account`, `#/components`, `#/tokens`.

## What is in here

| Path | What |
| --- | --- |
| `home/tokens.css` | The foundation: colour (light and dark), type ramp, space, shape, hit targets, motion. Upstream values kept byte-for-byte. |
| `home/system.css` | The component library. One class per component, variants as data attributes, so each maps to a shadcn variant. |
| `home/components.js` | Thin render helpers and the hand-drawn icon set. |
| `home/screens.js` | Home (7 states), Saved, Cash, Save flow (vault → amount → review → pending → result ×3 outcomes), Activity with detail sheet, Explore, Account. |
| `home/gallery.js` | The Components and Tokens screens: every piece in every state, tappable. |
| `home/lab.js`, `home/lab.css` | Review chrome only. Router, sheet, toast, sidebar. Not part of the system. |
| `shots/` | 390×844 captures of every screen, light and dark, from the current head. |
| `reference/upstream/` | Jesse's exploration doc, tokens, fixtures and A/B/C CSS, copied unchanged under MIT for reference. See `NOTICE.md`. |
| `.claude/skills/` | The reusable skills (below). |

## The skills

These are the part that transfers. Each is a `SKILL.md` an agent loads before touching UI.

- **home-ui-foundation** — the tokens, the rules for using them, how they port to Tailwind v4 / shadcn.
- **home-ui-components** — component contracts: variants, required states, when not to use, how to port a piece to a `cva()` variant.
- **money-ui-critique** — a rubric so a model critic judges against a standard (three-second test, state coverage, move-money checks, generic-fintech smell test) and reports in upstream's severity table.
- **platform-references** — what we borrow from Apple HIG / iOS 26 and Material 3 Expressive, what we deliberately do not (Liquid Glass, tonal surfaces), and the product patterns from Mercury, Cash App, Wealthfront, Monzo.

## Two treatments

The Screens menu has a **Treatment** switch. Base is the default; `?treatment=quiet` (or `expressive`, plus `?theme=dark|light`) before the `#` in the URL forces a look for a shared link.

- **Base** is the one bold, ownable move: Home opens on full-bleed Base blue with the balance in white, and the content rides up over it on a sheet. One continuous surface instead of stacked cards, eyebrow section labels, a compact blue header that fades in on scroll, an iOS-style push with parallax, rows that rise in with a 30ms stagger, a floating dock. Three upstream rules loosened and named in `home/base.css`: blue as canvas, one shadow on the sheet edge, motion above the cap.
- **Quiet** is Direction 1 to the letter: no gradients, glass, shadows, motion over 180ms, or moving balances. It is the version his rules produce.
- **Expressive** is a theme-and-motion layer over the same tokens and components (`home/expressive.css`). It deliberately loosens three upstream rules, each named in the file where it happens: a soft glow behind the hero, layered depth on panels and a translucent floating tab dock, and motion above the cap for screen transitions (View Transitions API with the balance carried as a shared element), a spring on the sheet, a one-time balance roll on arrival, and a result mark that draws itself. Explore becomes product cards. Reduced motion removes every part of it.

Same components underneath, so he can take either, or the quiet structure with two of the loud rules.

## Decisions

Recorded so the next screen inherits them.

- **Money Map IA** (Money · Activity · Explore), the direction Jesse's own exploration recommends. Account lives in the top bar.
- **Geist + Geist Mono.** Base Sans is not licensable; Geist has real tabular figures and sits closest to Base's neo-grotesk. Upstream's direction is literally named "Vercel Editorial".
- **Blue is one primary button plus the active tab.** Selection is ink. State is green / red / amber and always paired with an icon or a word.
- **Hero → peers → actions → positions → activity.** Net position is the number; available and saved explain it; the two actions sit under the numbers they act on.
- **Pending annotates, it does not displace.** A pill in the hero line ("Still in cash"), an amber row at the top of Activity, a clock in the media circle. The page keeps the same shape in funded, loading and pending. An unknown outcome still gets a banner because it needs an action.
- **A word never sits in the number slot.** When savings are unavailable, Home keeps the last known figures in muted ink with an "as of 12:03 UTC" marker and the same amber banner idiom pending uses. Loading skeletons keep the page's geometry, including the buttons and the activity block.
- **Primary on Home is "Move to savings", secondary is "Add money".** Send lives in Cash and Explore. An earlier pass swapped Send in; both blind critics flagged the missing funding action, so it came back. Open product question for Jesse: whether Send deserves a tab of its own, as Cash App and Monzo do.
- **A rate is not a gain.** APY reads in muted ink with no arrow; green and the up arrow are reserved for money that came in or a value that rose.
- **Positions rows carry no icon wells.** The numbers carry the row, Mercury style. Activity rows keep media because the direction of money is the point, and they drop the chevron because the whole row opens the receipt.
- **Light quiet grey is #66707f (4.7:1)**, not the #8b93a1 the first pass used, after the critique caught 2.9:1 on zero balances. Dark panels lifted to #1a1d23 with #2f343c hairlines so surfaces stay distinct.
- **Unknown outcome never offers retry.** It routes to Activity, matching upstream's money invariant.
- **No glass, no gradients, no tonal surfaces.** Borrowed the behaviours of iOS 26 and M3 Expressive (bars out of the way, concentric radii, state layers, shape as hierarchy), not the materials.

## Review record

A fresh-eyes critique (model, `money-ui-critique` rubric) ran on the first captured pass. Acted on: contrast of quiet grey, dark-mode surface separation, partial and empty and loading state handling, primary CTA naming and Send placement, the self-contradicting destination copy, a live "available after" fact on the amount step, activity row truncation and entry counts, the large-title account icon placement, hero spacing, and the "Nothing…" copy tic. Left for a human pass: whether Send becomes a tab, a signature mark for vaults, and whether the result screen should lead with the receipt instead of the check.

## Deploy

Netlify: New site → this repo → `netlify.toml` publishes `home/` with no build step. Any static host works the same way.

## Workflow comparison

`comparison/` holds a blind test: the same Home brief run with the upstream inputs alone, with the upstream inputs plus the four skills here, and the lab, judged blind against the real B and C renders from PR #675 by two critics. Then a loop test: the skills build put through one render-critique-fix pass ranked first. See `comparison/RESULTS.md`.

## Workflow options to test with Jesse

Same brief, three routes, compare output quality and round-trip friction:

1. **Paper MCP** (he has already chosen it): design in Paper, Claude reads the HTML/CSS via MCP and ports into his Storybook. Zero translation layer. Depends on his laptop tunnel.
2. **Figma MCP remote**: design in Figma, Code Connect maps to his `components/ui`, variables become tokens. Best if Figma is where the designer is fastest; adds a handoff step his pipeline was built to avoid.
3. **Code-first with these skills**: no canvas. Claude composes in Storybook with `home-ui-foundation` and `home-ui-components` loaded and `money-ui-critique` as the reviewer. This lab is the proof that route can produce something worth adopting.

Framer is not on the list: no first-party MCP and it is a marketing-site tool.
