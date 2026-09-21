# For agents picking this up

This repo is a design lab for Home (jessepollak/home): tokens, a component library, live screens in three treatments, four reusable skills, and a blind workflow comparison. Everything is static; nothing needs installing.

## Read first, in this order

1. `README.md`: what is here and the decisions behind it.
2. `.agents/skills/home-ui-foundation/SKILL.md`: the tokens and the rules.
3. `.agents/skills/home-ui-components/SKILL.md`: the component contracts.
4. `.agents/skills/money-ui-critique/SKILL.md`: the rubric for reviewing screens.
5. `.agents/skills/platform-references/SKILL.md`: platform and product conventions.
6. `comparison/RESULTS.md`: how the skills were tested and what the critics said.

## To use the skills in jessepollak/home

Copy `.agents/skills/*` into that repo's `.agents/skills/`. They are self-contained. Two need nothing else: `money-ui-critique` (give it to the anonymous critic instead of "coherence and visual character") and `platform-references`. The other two reference `home/tokens.css`; paste its `:root`, dark media and `[data-theme="dark"]` blocks into `apps/web/app/globals.css` and map them in `@theme`, as the foundation skill describes. Product code then reads tokens only, which is what upstream lint requires.

## To port a screen or component into Storybook

The live screens are `home/screens.js` and the styles are `home/system.css` plus one treatment file (`home/glass.css`, `home/base.css`). Every component is one class with data-attribute variants, so each maps to a `cva()` variant in `components/ui`. Keep the fixture numbers in `home/fixtures.js`; they mirror `apps/web/client/explorations/home-reimagined/fixtures.ts` so a story compares like for like with the existing exploration.

## To see it

Live: https://snaveoguh.github.io/home-design-lab/ (Glass by default; `?treatment=quiet` is Direction 1 verbatim, `?treatment=base`; add `?theme=dark`). Tap the Home wordmark for the screens, states and controls menu. Screenshots of every screen in `shots/`.

## Do not

Do not treat the treatments as approved direction. Quiet is the only one that obeys every upstream rule; Base and Glass each loosen three, named in comments in their files. Jesse decides. Do not import anything from `reference/upstream/`; it is his code, copied for comparison under MIT.
