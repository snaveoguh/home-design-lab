# Workflow comparison — results

**Question.** Does giving Jesse's factory our four skills change what it produces, and how does either compare with the lab screen, built by an agent under the full skill set, and with his real PR #675 output?

**Method.** One brief (`brief.md`): Home, funded state, plus loading and pending, at 390×844, in the upstream fixture numbers, under Direction 1. Two fresh model sessions built it, same model and effort, differing only in inputs:

| Arm | Inputs | Output |
| --- | --- | --- |
| Upstream only | `docs/ui-direction.md`, `.agents/skills/design-engineering/SKILL.md` | `builders/A-upstream-only.html` |
| Upstream + skills | the same, plus `home-ui-foundation`, `home-ui-components`, `platform-references`, `money-ui-critique` and `home/tokens.css` (no other lab files) | `builders/B-upstream-plus-skills.html` |
| The lab | this repo's `home/`: agent-built under the full skill set with one screenshot-and-critique pass, review chrome hidden | `entries/C-*.png` |
| Jesse's B and C | cropped from the PR #675 comparison board he posted, so his real renders with his deploy's fonts | `entries/jesse-B.png`, `entries/jesse-C.png` |

Entries were shuffled under labels P–T (`blind/`, mapping withheld) and judged by two more fresh sessions: one with our rubric (`critic-rubric.md`), one with the brief Jesse gave his own critic, "coherence and visual character" (`critic-jesse.md`).

**Result.**

| Rank | Rubric critic | Upstream-style critic |
| --- | --- | --- |
| 1 | The lab | The lab |
| 2 | Upstream + skills | Upstream + skills |
| 3 | Upstream only | Jesse's C |
| 4 | Jesse's B | Upstream only |
| 5 | Jesse's C | Jesse's B |

Both critics, independently and blind, put the skills arm above the no-skills arm and above both of Jesse's real treatments. Both put the lab first. The rubric critic's blocker on Jesse's entries is for missing loading and pending states that his brief never asked for, so read his placement on the other sections; the upstream-style critic had no such rule and still ranked the skills arm above his C.

**What the skills changed, visibly.** The no-skills build shipped a header outside the gutter with a clipped account button and 6px of horizontal overflow in every state, nested vault management on Home, 48px CTAs and an all-purpose grotesk. The skills build loaded Geist, set cents at regular weight, put two peers under the balance, used a positions panel and an honest pending pill, and hit 20 / 52 / 56 / 56 rhythm on its own. It still broke its loading state (skeleton overflow, missing tab bar) because it never rendered itself, which is what upstream's agent-browser step exists to catch.

**What the screenshot-and-critique pass still adds.** No major findings against the lab from either critic. Its minors are real and fixed in this repo after the run: the APY delta was green for a rate that is not a gain; the pending banner said "deposit" for a savings move and its button said "View"; the Saved row lost "APY"; and the funded Home had no Add money action after an earlier critique pushed it into Cash.

**Limits.** One run per arm, one model family, no human rater. The rubric was written by the same author as the lab, which is why the second critic uses Jesse's own brief instead. Jesse's entries carry a slightly different activity fixture from the builders. Treat this as a strong signal, not a measurement.

Reports: `critic-rubric-report.md`, `critic-upstream-style.md`. Builder self-reports: `builders/*.REPORT.md`. Mechanical checks (overflow, sub-44px controls): `entries/*-checks.txt`.
