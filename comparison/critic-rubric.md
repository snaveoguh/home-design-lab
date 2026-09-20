# Blind comparison — rubric critic

You are reviewing five candidate designs of the same screen: Home, funded state, for a consumer money app on Base, all rendered at 390×844 CSS px (images are 2x). The five carry the labels P, Q, R, S, T. You do not know who made them and must not guess. Judge only what is in the images.

Files: /tmp/claude-0/-home-user-huge/30b88757-548d-50d5-af7a-4e7eea46cdc2/scratchpad/ab/blind/P.png … T.png. Some entries also have loading and pending states at P-loading.png / P-pending.png etc.; if a file is missing, that entry did not supply the state. Read every image with the Read tool before writing.

Shared facts every entry was given: net position $1,250.00; available cash $250.00; saved $1,000.00 at 4.04% weighted across vaults; no debt; recent activity list; a pending $100.00 deposit in the pending state.

Locked constraints (do not penalise them): near-ink text, off-white canvas, white panels with hairlines, Base blue is the single primary accent, no gradients/glass/shadows, green up / red down, no compliance copy.

Apply the rubric at /home/user/huge/.claude/skills/money-ui-critique/SKILL.md section by section. Then output:

1. A table with one row per entry: label · three-second test result (number recalled? one action? state clear?) · count of blue elements · smallest control height you can estimate · states supplied · top defect · top strength.
2. A ranked order 1–5 with one sentence of reasoning each. Ties are not allowed.
3. Which entries you would put in front of a client as-is, with fixes, or not at all.

Do not modify any files.
