# Upstream reference — jessepollak/home

Files in this folder are copied unchanged from
https://github.com/jessepollak/home at PR #675 head
(`2f6ee7638cd67a702ccc2041577860001ac94fb1`, branch `agent/662`),
MIT License, Copyright (c) 2026 Jesse Pollak.

They are here as **read-only reference** for the design lab:

| File | Why it is here |
| --- | --- |
| `2026-09-home-reimagined.md` | The exploration write-up: product frame, reference ledger, four IA directions, A/B/C art-direction critique. |
| `ui-direction.md` | Direction 1 tokens (locked 2026-09-08) that the lab's `tokens.css` extends rather than replaces. |
| `design-system.md` | shadcn / Base UI rules, Storybook conventions, lint policy anything we hand back has to survive. |
| `fixtures.ts`, `money-state.ts` | The fixed synthetic facts (cash 250, saved 1,000, net 1,250, vault rates). The lab reuses the same numbers so screens compare like for like. |
| `art-direction.module.css`, `reference-home.*` | The A/B/C treatments and the Astra baseline the lab is responding to. |
| `design-engineering.SKILL.md` | His current craft skill (adapted from Emil Kowalski's). Ours add the visual specifics it lacks. |

Nothing in this folder is imported by the lab at runtime.
