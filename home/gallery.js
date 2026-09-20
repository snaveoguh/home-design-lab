import * as F from "./fixtures.js";
import { icon, btn, iconBtn, topbar, backBtn, row, rows, panel, sectionHead, facts, pill, delta, skeleton, banner, empty, steps, result, seg, heroAmount, esc } from "./components.js";

const block = (name, note, inner) => `<section class="g-block"><div class="g-block-head"><span class="h-eyebrow">${esc(name)}</span>${note ? `<span class="h-caption">${esc(note)}</span>` : ""}</div>${inner}</section>`;
const swatch = (token, label) => `<div class="g-swatch"><div class="g-swatch-chip" style="background:var(${token})"></div><div class="g-swatch-meta"><span class="h-secondary" style="color:var(--h-ink)">${esc(label)}</span><span class="h-caption h-mono" data-token="${token}"></span></div></div>`;

export function components(store) {
  return { tab: null, view: `${topbar({ title: "Components", lead: backBtn() })}<div class="h-view" data-tabbar="none"><div class="h-stack" data-gap="loose">
    <p class="h-secondary">Every piece is a class plus data attributes, so each maps to a shadcn variant. Tap things; they respond.</p>

    ${block("Buttons", "52 / 48 / 36 / 28 tall", `<div class="h-btn-stack">
      <div class="h-btn-row">${btn({ label: "Primary", variant: "primary", size: "cta" })}${btn({ label: "Outline", variant: "outline", size: "cta" })}</div>
      <div class="h-btn-row">${btn({ label: "Secondary" })}${btn({ label: "Quiet", variant: "quiet" })}${btn({ label: "Inverse", variant: "inverse" })}</div>
      <div class="h-btn-row">${btn({ label: "Remove", variant: "destructive" })}${btn({ label: "Loading", variant: "primary", loading: true })}${btn({ label: "Disabled", variant: "primary", disabled: true })}</div>
      <div class="h-chips">${btn({ label: "Small", size: "sm" })}${btn({ label: "With icon", size: "sm", icon: "plus", variant: "outline" })}${btn({ label: "Inline", size: "inline", variant: "quiet" })}</div>
    </div>`)}

    ${block("Icon buttons", "44pt targets", `<div class="h-chips">${iconBtn({ name: "user", label: "Account" })}${iconBtn({ name: "plus", label: "Add", surface: "well" })}${iconBtn({ name: "x", label: "Close", tone: "muted" })}${iconBtn({ name: "copy", label: "Copy", surface: "well" })}</div>`)}

    ${block("Chips and segmented", "ink selection, never blue", `<div class="h-stack" data-gap="tight">
      <div class="h-chips"><button type="button" class="h-chip">$25</button><button type="button" class="h-chip" aria-pressed="true">$50</button><button type="button" class="h-chip">$100</button><button type="button" class="h-chip">Max</button></div>
      ${seg([{ id: "all", label: "All" }, { id: "in", label: "In" }, { id: "out", label: "Out" }, { id: "saved", label: "Saved" }], store.gallerySeg || "all", "gallery-seg")}
    </div>`)}

    ${block("Status and change", "semantic colour is separate from the accent", `<div class="h-chips" style="align-items:center">${pill("Settled", "gain")}${pill("Pending", "attention")}${pill("Failed", "loss")}${pill("Draft")}${delta("4.04% APY", "up")}${delta("0.8%", "down")}${delta("0.00%", "flat")}</div>`)}

    ${block("Balance hero", "cents drop to regular weight", `<div class="h-hero" style="padding-block:0"><span class="h-label">Net position</span>${heroAmount(F.money(1250))}<div class="h-hero-meta"><span>Cash + savings</span><span class="h-dot"></span><span>No debt</span></div></div>
      <div class="h-hero" style="padding-block:1rem 0"><span class="h-label">Long or localized</span>${heroAmount(F.money(1250, "ID"))}</div>`)}

    ${block("Peers", "the two figures that explain the balance", `<div class="h-peers"><div class="h-peer"><span class="h-label">Available to use</span><div class="h-peer-amount h-num">${F.money(250)}</div><div class="h-peer-meta">USDC on Base</div></div><div class="h-peer"><span class="h-label">Saved</span><div class="h-peer-amount h-num">${F.money(1000)}</div><div class="h-peer-meta">${delta("4.04% APY", "up")}</div></div></div>`)}

    ${block("Rows", "56 min, hairline inset from the text edge", panel(rows([
      row({ media: icon("wallet", 20), title: "Cash", desc: "Available to use", amount: F.money(250), action: "noop" }),
      row({ media: "G", mediaTone: "ink", title: "Gauntlet", desc: "4.10% · USDC vault", amount: F.money(750), action: "noop" }),
      row({ media: icon("arrow-down-left", 20), mediaTone: "gain", title: "Received", desc: "From 0x2222…2222", amount: "+$250.00", amountTone: "gain", amountSub: "Today", action: "noop" }),
      row({ media: icon("clock", 20), mediaTone: "attention", title: "Saved into Gauntlet", desc: "Pending · 4.10% vault", amount: F.money(100), amountTone: "muted", action: "noop" }),
      row({ media: icon("layers", 20), title: "A very long row title that should truncate cleanly on one line", desc: "And a description that also runs long enough to truncate", amount: F.money(12345678.9), action: "noop" }),
      row({ media: icon("bell", 20), title: "Switch row", desc: "Trailing control instead of chevron", chevron: false }).replace('<div class="h-row-trail"></div>', `<div class="h-row-trail"><button type="button" class="h-switch" role="switch" aria-checked="${store.gallerySwitch ? "true" : "false"}" data-action="gallery-switch" aria-label="Notifications"></button></div>`),
    ])))}

    ${block("Facts", "label / value, values tabular", panel(facts([["Amount", F.money(100), { "data-emphasis": true }], ["To", `Gauntlet <span class="h-caption">4.10% APY</span>`], ["Network", "Base"], ["Fee", "None"], ["Net position after", `${F.money(1250)} <span class="h-caption">Unchanged</span>`]]), { "data-inset": true, style: "padding-block:0" }))}

    ${block("Banner", "one notice, never a stack", `<div class="h-stack" data-gap="tight">${banner({ icon: "clock", tone: "attention", title: "$100.00 deposit is pending", desc: "Into Gauntlet. Nothing has moved yet.", action: "noop" })}${banner({ icon: "alert", tone: "loss", title: "A send didn't go through", desc: "No money moved. Nothing retries on its own.", action: "noop", actionLabel: "Retry" })}</div>`)}

    ${block("Skeleton", "pulse off under reduced motion", panel(rows([
      row({ media: skeleton("2.5rem", "2.5rem", "circle"), title: "", desc: "", amount: "" }).replace('<div class="h-row-title"></div>', `<div class="h-row-title">${skeleton("7ch")}</div>`).replace('<div class="h-row-desc"></div>', "").replace('<div class="h-row-amount h-num"><span></span></div>', `<div class="h-row-amount h-num">${skeleton("5ch")}</div>`),
      row({ media: skeleton("2.5rem", "2.5rem", "circle"), title: "", desc: "", amount: "" }).replace('<div class="h-row-title"></div>', `<div class="h-row-title">${skeleton("10ch")}</div>`).replace('<div class="h-row-amount h-num"><span></span></div>', `<div class="h-row-amount h-num">${skeleton("6ch")}</div>`),
    ])))}

    ${block("Empty state", "", panel(empty({ icon: "vault", title: "Not saving yet", desc: "Move cash into a vault to start earning. You pick the vault.", cta: btn({ label: "Add to savings", variant: "primary" }) })))}

    ${block("Step rail", "", `<div class="h-stack" data-gap="tight">${steps(["Amount", "Review", "Result"], 0)}${steps(["Amount", "Review", "Result"], 1)}${steps(["Amount", "Review", "Result"], 2)}</div>`)}

    ${block("Result marks", "", `<div class="g-three">${result({ tone: "gain", icon: "check", title: "Deposited", desc: "Confirmed" })}${result({ tone: "loss", icon: "x", title: "Failed", desc: "No money moved" })}${result({ tone: "attention", icon: "alert", title: "Unconfirmed", desc: "Check Activity" })}</div>`)}

    ${block("Amount entry", "tap the keys", `<div class="h-amount-entry" style="padding-top:0"><div class="h-amount-display${store.galleryAmount ? "" : "" }"${store.galleryAmount ? "" : " data-empty"} id="g-amount">${esc(store.galleryAmount ? F.money(Number(store.galleryAmount), "US", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : "$0")}</div><div class="h-amount-help">$250.00 available</div></div>
      <div class="h-numpad">${["1","2","3","4","5","6","7","8","9",".","0","del"].map((k) => `<button type="button" class="h-key" data-action="gallery-key" data-value="${k}"${k === "del" ? ' data-role="delete" aria-label="Delete"' : ""}>${k === "del" ? icon("delete", 24) : k}</button>`).join("")}</div>`)}

    ${block("Inputs", "well surface, ink focus ring", `<div class="h-stack" data-gap="tight">
      <div class="h-field"><label class="h-label" for="g-in-1">Label</label><input class="h-input" id="g-in-1" placeholder="Placeholder"></div>
      <div class="h-field"><label class="h-label" for="g-in-2">Verification code</label><input class="h-input" id="g-in-2" data-variant="code" inputmode="numeric" value="482 019"></div>
      <div class="h-field"><label class="h-label" for="g-in-3">Address</label><input class="h-input" id="g-in-3" aria-invalid="true" value="0x12"><span class="h-field-error">That's not a full address on Base.</span></div>
    </div>`)}

    ${block("Sheet and toast", "", `<div class="h-btn-row">${btn({ label: "Open sheet", variant: "outline", action: "gallery-sheet" })}${btn({ label: "Show toast", variant: "outline", action: "gallery-toast" })}</div>`)}

    ${block("Tab bar", "active tab is the one place blue repeats", `<div class="g-tabbar-demo"><nav class="h-tabbar" style="position:static" aria-label="Demo">${["home|Money|home","activity|Activity|activity","explore|Explore|compass"].map((s, i) => { const [id, l, ic] = s.split("|"); return `<button type="button" class="h-tab"${i === 0 ? ' aria-current="page"' : ""}>${icon(ic, 24)}<span>${l}</span></button>`; }).join("")}</nav></div>`)}
  </div></div>` };
}

export function tokens() {
  const colors = [
    ["--h-canvas", "canvas"], ["--h-panel", "panel"], ["--h-well", "well"], ["--h-hairline", "hairline"],
    ["--h-ink", "ink"], ["--h-ink-soft", "ink soft"], ["--h-muted", "muted"], ["--h-quiet", "quiet"],
    ["--h-blue", "blue · accent"], ["--h-gain", "gain"], ["--h-loss", "loss"], ["--h-attention", "attention"],
  ];
  const type = [
    ["Balance", "h-hero-amount", "$1,250.00", "48 / 500 / −0.03em"],
    ["Large title", "h-large-title", "Activity", "28 / 600 / −0.02em"],
    ["Title", "h-title", "Where should this go?", "20 / 600"],
    ["Headline", "h-headline", "Positions", "17 / 600"],
    ["Body", "h-body", "Waiting for Base to confirm. Nothing has moved yet.", "16 / 400"],
    ["Secondary", "h-secondary", "You choose the vault. Nothing is picked for you.", "14 / 400 / muted"],
    ["Caption", "h-caption", "Vault data read 12:03 UTC", "12 / 400 / quiet"],
    ["Eyebrow", "h-eyebrow", "Needs attention", "11 / 600 / +0.06em / caps"],
    ["Mono", "h-mono", "0x1111…1111", "Geist Mono, addresses only"],
  ];
  const space = [1, 2, 3, 4, 5, 6, 8, 10, 12];
  return { tab: null, view: `${topbar({ title: "Tokens", lead: backBtn() })}<div class="h-view" data-tabbar="none"><div class="h-stack" data-gap="loose">
    <p class="h-secondary">Upstream Direction 1 values are kept byte-for-byte. Everything else is added. Hex shown is the resolved value in the current theme.</p>
    ${block("Colour", "semantic names only", `<div class="g-swatches">${colors.map(([t, l]) => swatch(t, l)).join("")}</div>`)}
    ${block("Type", "Geist · rem so it scales with text size", `<div class="g-type">${type.map(([n, c, s, m]) => `<div class="g-type-row"><div class="${c} h-num" style="padding:0;margin:0">${esc(s)}</div><div class="h-caption">${esc(n)} · ${esc(m)}</div></div>`).join("")}</div>`)}
    ${block("Space", "4pt scale · gutter 20", `<div class="g-space">${space.map((n) => `<div class="g-space-row"><span class="h-caption h-num" style="width:5ch">${n * 4}</span><div class="g-space-bar" style="width:var(--h-s-${n})"></div></div>`).join("")}</div>`)}
    ${block("Shape", "", `<div class="g-shapes"><div class="g-shape" style="border-radius:var(--h-r-control)"><span class="h-caption">control 8</span></div><div class="g-shape" style="border-radius:var(--h-r-panel)"><span class="h-caption">panel 12</span></div><div class="g-shape" style="border-radius:var(--h-r-sheet) var(--h-r-sheet) 0 0"><span class="h-caption">sheet 20</span></div><div class="g-shape" style="border-radius:var(--h-r-pill)"><span class="h-caption">pill</span></div></div>`)}
    ${block("Hit targets", "HIG 44 minimum", `<div class="g-hits"><div class="g-hit" style="width:var(--h-hit);height:var(--h-hit)"><span class="h-caption">44</span></div><div class="g-hit" style="width:var(--h-hit-lg);height:var(--h-hit-lg)"><span class="h-caption">48</span></div><div class="g-hit" style="width:var(--h-hit-cta);height:var(--h-hit-cta)"><span class="h-caption">52</span></div><div class="g-hit" style="width:var(--h-row);height:var(--h-row)"><span class="h-caption">56</span></div></div>`)}
    ${block("Motion", "upstream limits kept", panel(facts([["Press", "120ms"], ["Chip", "120ms"], ["Tab", "160ms"], ["Fade", "140ms"], ["Sheet", "220ms · opacity only under reduced motion"], ["Balances", "Never animate"]]), { "data-inset": true, style: "padding-block:0" }))}
  </div></div>` };
}
