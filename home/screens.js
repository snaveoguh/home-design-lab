import * as F from "./fixtures.js";
import { icon, btn, iconBtn, topbar, backBtn, row, rows, panel, sectionHead, facts, pill, delta, skeleton, banner, empty, steps, result, seg, tabbar, heroAmount, esc } from "./components.js";

const vaultById = (id) => F.VAULTS.find((v) => v.id === id);
const initial = (name) => name.slice(0, 1).toUpperCase();

/* ---------- Home (Money tab) ------------------------------------------ */

export function home(store) {
  const st = F.HOME_STATES[store.homeState] || F.HOME_STATES.funded;
  const region = st.region;
  const top = topbar({ lead: `<button type="button" class="h-wordmark" data-action="lab-menu" aria-label="Home. Double-tap opens the design lab menu"><span class="h-mark" aria-hidden="true"></span><span class="h-headline">Home</span></button>`, trail: iconBtn({ name: "user", label: "Account", action: "go", extra: { "data-to": "account" } }) });

  if (st.loading) {
    return {
      tab: "home",
      view: `<div class="h-view"><div class="h-band">${top}<div class="h-stack">
        <section class="h-hero" aria-busy="true" aria-label="Net position, loading">
          <span class="h-label">Net position</span>
          ${skeleton("11ch", "3.25rem")}
          <div class="h-hero-meta">${skeleton("14ch", "1rem")}</div>
        </section>
        <div class="h-peers">
          <div class="h-peer"><span class="h-label">Available to use</span>${skeleton("7ch", "1.5rem")}<div class="h-peer-meta">${skeleton("5ch", "0.75rem")}</div></div>
          <div class="h-peer"><span class="h-label">Saved</span>${skeleton("8ch", "1.5rem")}<div class="h-peer-meta">${skeleton("5ch", "0.75rem")}</div></div>
        </div>
        <div class="h-btn-row">${skeleton("100%", "3.25rem")}${skeleton("100%", "3.25rem")}</div>
        </div></div><div class="h-surface"><div class="h-stack">
        <section>${sectionHead("Positions")}${panel(rows([1, 2, 3].map(() => row({ title: "", desc: "", amount: "" })).map((r) => r.replace('<div class="h-row-title"></div>', `<div class="h-row-title">${skeleton("6ch")}</div>`).replace('<div class="h-row-amount h-num"><span></span></div>', `<div class="h-row-amount h-num">${skeleton("6ch")}</div>`)), { "data-media": "none" }))}</section>
        <section>${sectionHead("Activity")}${panel(rows([1, 2].map(() => row({ media: skeleton("2.5rem", "2.5rem", "circle"), title: "", desc: "", amount: "" })).map((r) => r.replace('<div class="h-row-title"></div>', `<div class="h-row-title">${skeleton("8ch")}</div>`).replace('<div class="h-row-amount h-num"><span></span></div>', `<div class="h-row-amount h-num">${skeleton("6ch")}</div>`))))}</section>
      </div></div></div>`,
    };
  }

  const partial = !st.vaults;
  const last = F.position(F.VAULTS, st.cash); /* last known figures, used only while savings are unavailable */
  const pos = partial ? { cash: st.cash, saved: null, weighted: null, funded: 0, debt: 0, net: last.net } : F.position(st.vaults, st.cash);
  const net = F.money(pos.net, region);
  const isEmpty = store.homeState === "empty";
  const partialBanner = partial ? banner({ icon: "alert", tone: "attention", title: "Savings balances unavailable", desc: `Cash is current. Saved shows the ${F.timeLabel(F.READ_AT_ISO)} UTC reading.`, action: "retry", actionLabel: "Retry" }) : "";
  const pendingBanner = st.pending && st.pending.status === "unknown" ? banner(
    { icon: "alert", tone: "attention", title: `We couldn't confirm ${F.money(st.pending.amount, region)} to savings`, desc: "Check Activity before moving anything again.", action: "tab", actionLabel: "Activity" }
  ).replace('data-action="tab"', 'data-action="tab" data-value="activity"') : "";
  const pendingLine = st.pending && st.pending.status === "pending"
    ? `${pill("Pending", "attention")}<span>${F.money(st.pending.amount, region)} to ${esc(vaultById(st.pending.vault).name)}</span><span class="h-dot"></span><span>Still in cash</span>`
    : null;

  const positions = panel(rows([
    row({ title: "Cash", desc: isEmpty ? "Add money to start" : "Available to use", amount: F.money(pos.cash, region), action: "go", data: { "data-to": "cash" } }),
    pos.saved === null
      ? row({ title: "Saved", desc: `As of ${F.timeLabel(F.READ_AT_ISO)} UTC · unavailable now`, amount: F.money(last.saved, region), amountTone: "muted", action: "go", data: { "data-to": "save" } })
      : row({ title: "Saved", desc: isEmpty ? "Earn up to 4.10% in USDC vaults" : `${pos.funded} vault${pos.funded === 1 ? "" : "s"} · ${F.pct(pos.weighted)} APY`, amount: F.money(pos.saved, region), action: "go", data: { "data-to": "save" } }),
    row({ title: "Debt", desc: "No debt", amount: F.money(0, region), amountTone: "muted", action: "handoff", data: { "data-entry": "Borrow" } }),
  ], { "data-media": "none" }));

  const activityRows = st.activity.slice(0, 3).map((a) => activityRow(a, region));
  const activity = st.activity.length
    ? panel(rows(activityRows))
    : panel(empty({ icon: "activity", title: "No activity yet", desc: "Deposits, sends and receipts will show here in order." }));

  const netMeta = partial
    ? `<span class="h-attention">Saved as of ${F.timeLabel(F.READ_AT_ISO)} UTC</span><span class="h-dot"></span><span>Cash is current</span>`
    : `<span>Cash + savings</span><span class="h-dot"></span><span>${pos.debt === 0 ? "No debt" : ""}</span>`;

  return {
    tab: "home",
    view: `<div class="h-view"><div class="h-band">${top}<div class="h-stack">
      <section class="h-hero" aria-labelledby="net-label">
        <span class="h-label" id="net-label">Net position</span>
        ${heroAmount(net)}
        <div class="h-hero-meta">${pendingLine || netMeta}</div>
      </section>
      <div class="h-peers">
        <div class="h-peer"><span class="h-label">Available to use</span><div class="h-peer-amount h-num"${net.length > 12 ? ' data-size="long"' : ""}>${F.money(pos.cash, region)}</div><div class="h-peer-meta">Ready now</div></div>
        <div class="h-peer"><span class="h-label">Saved</span><div class="h-peer-amount h-num"${net.length > 12 ? ' data-size="long"' : ""}${partial ? ' style="color:var(--h-muted)"' : ""}>${partial ? F.money(last.saved, region) : F.money(pos.saved, region)}</div><div class="h-peer-meta">${partial ? `<span class="h-attention">Unavailable now</span>` : pos.saved ? `${F.pct(pos.weighted)} APY` : "Not earning yet"}</div></div>
      </div>
      ${isEmpty
        ? btn({ label: "Add money", variant: "primary", size: "cta", block: true, action: "handoff", extra: { "data-entry": "Add money" } })
        : `<div class="h-btn-row">${btn({ label: "Move to savings", variant: "primary", size: "cta", action: "move", disabled: partial })}${btn({ label: "Add money", variant: "outline", size: "cta", action: "handoff", extra: { "data-entry": "Add money" } })}</div>`}
      ${partialBanner}${pendingBanner}
      </div></div><div class="h-surface"><div class="h-stack">
      <section>${sectionHead("Positions")}${positions}</section>
      <section>${sectionHead("Activity", st.activity.length ? btn({ label: "See all", variant: "quiet", size: "sm", action: "tab", extra: { "data-value": "activity" } }) : "")}${activity}</section>
    </div></div></div>`,
  };
}

function activityRow(a, region, opts = {}) {
  const v = a.vault ? vaultById(a.vault) : null;
  const k = a.kind === "received"
    ? { icon: "arrow-down-left", tone: "gain", title: "Received", desc: `From ${F.short(a.counterparty)}`, amount: F.signed(a.amount, region), amountTone: "gain" }
    : a.kind === "sent"
    ? { icon: "arrow-up-right", title: "Sent", desc: `To ${F.short(a.counterparty)}`, amount: F.signed(-a.amount, region) }
    : { icon: "vault", title: "Saved", desc: `Into ${v.name} · ${F.pct(v.apy)}`, amount: F.money(a.amount, region) };
  const status = a.status === "pending" ? { tone: "attention", label: "Pending" } : a.status === "unknown" ? { tone: "attention", label: "Unconfirmed" } : a.status === "failed" ? { tone: "loss", label: "Failed" } : null;
  return row({
    media: icon(k.icon, 20), mediaTone: status ? "attention" : k.tone,
    title: k.title, desc: status ? `${status.label} · ${k.desc}` : (opts.time ? `${F.timeLabel(a.at)} · ${k.desc}` : k.desc),
    amount: k.amount, amountTone: status ? "muted" : k.amountTone, amountSub: opts.time ? undefined : F.dayLabel(a.at),
    action: "entry", data: { "data-id": a.id }, chevron: false,
  });
}

/* ---------- Save -------------------------------------------------------- */

export function save(store) {
  const st = F.HOME_STATES[store.homeState] || F.HOME_STATES.funded;
  const region = st.region;
  const top = topbar({ title: "Saved", lead: backBtn(), trail: iconBtn({ name: "plus", label: "Add to savings", action: "move" }) });
  if (!st.vaults) {
    return { tab: null, view: `${top}<div class="h-view" data-tabbar="none"><div class="h-stack">
      ${panel(empty({ icon: "vault", title: "Savings are unavailable right now", desc: "Vault balances didn't load. Your cash is unaffected and nothing has moved.", cta: btn({ label: "Try again", variant: "outline", action: "retry" }) }))}
    </div></div>` };
  }
  const pos = F.position(st.vaults, st.cash);
  const vaults = st.vaults.map((v) => row({
    media: initial(v.name), mediaTone: v.balance ? "ink" : undefined, title: v.name,
    desc: v.balance ? `${F.pct(v.apy)} APY` : `${F.pct(v.apy)} · Empty`,
    amount: F.money(v.balance, region), amountTone: v.balance ? undefined : "muted",
    action: "vault", data: { "data-id": v.id },
  }));
  return {
    tab: null,
    view: `<div class="h-view" data-tabbar="none"><div class="h-band">${top}<div class="h-stack">
      <section class="h-hero">
        <span class="h-label">Saved</span>
        ${heroAmount(F.money(pos.saved, region))}
        <div class="h-hero-meta">${pos.saved ? `<span>${F.pct(pos.weighted)} weighted APY</span><span class="h-dot"></span><span>${pos.funded} of ${st.vaults.length} vaults</span>` : `<span>Not earning yet</span>`}</div>
      </section>
      <div class="h-btn-row">${btn({ label: "Add to savings", variant: "primary", size: "cta", action: "move" })}${btn({ label: "Withdraw", variant: "outline", size: "cta", action: "handoff", extra: { "data-entry": "Withdraw" }, disabled: !pos.saved })}</div>
      </div></div><div class="h-surface"><div class="h-stack">
      <section>${sectionHead("Vaults")}${panel(rows(vaults))}</section>
      <section>${sectionHead("How it's counted")}${panel(facts([
        ["Saved", F.money(pos.saved, region)],
        ["Weighted rate", F.pct(pos.weighted)],
        ["Vault data read", `${F.timeLabel(F.READ_AT_ISO)} UTC`],
        ["Network", "Base"],
      ]), { "data-inset": true, style: "padding-block:0" })}</section>
      <p class="h-caption" style="padding-inline:.25rem">Rates are reported by each vault and change. They are not a promise of return.</p>
    </div></div></div>`,
  };
}

/* ---------- Cash detail ------------------------------------------------ */

export function cash(store) {
  const st = F.HOME_STATES[store.homeState] || F.HOME_STATES.funded;
  const region = st.region;
  return {
    tab: null,
    view: `<div class="h-view" data-tabbar="none"><div class="h-band">${topbar({ title: "Cash", lead: backBtn() })}<div class="h-stack">
      <section class="h-hero"><span class="h-label">Available to use</span>${heroAmount(F.money(st.cash, region))}<div class="h-hero-meta"><span>USDC</span><span class="h-dot"></span><span>Base</span></div></section>
      <div class="h-btn-row">${btn({ label: "Add money", variant: "primary", size: "cta", action: "handoff", extra: { "data-entry": "Add money" } })}${btn({ label: "Send", variant: "outline", size: "cta", action: "handoff", extra: { "data-entry": "Send" } })}</div>
      </div></div><div class="h-surface"><div class="h-stack">
      <section>${sectionHead("Your address")}${panel(rows([row({ media: icon("wallet", 20), title: F.short(F.ACCOUNT), desc: "Receive USDC on Base", action: "copy", data: { "data-copy": F.ACCOUNT }, chevron: false })]).replace('<div class="h-row-trail"></div>', `<div class="h-row-trail"><span class="h-row-chevron">${icon("copy", 20)}</span></div>`))}</section>
      <section>${sectionHead("Recent", btn({ label: "See all", variant: "quiet", size: "sm", action: "tab", extra: { "data-value": "activity" } }))}${panel(rows(st.activity.filter((a) => a.kind !== "saved").slice(0, 3).map((a) => activityRow(a, region))))}</section>
    </div></div></div>`,
  };
}

/* ---------- Move money (takeover flow) --------------------------------- */

const STEPS = ["Amount", "Review", "Result"];

export function move(store, step) {
  const named = F.HOME_STATES[store.homeState] || F.HOME_STATES.funded;
  const st = named.loading || !named.vaults ? F.HOME_STATES.funded : named; /* money can only move from a known position */
  const region = st.region;
  const m = store.move;
  const vault = m.vault ? vaultById(m.vault) : null;
  const amount = Number(m.amount || 0);
  const cancel = btn({ label: "Cancel", variant: "quiet", size: "sm", action: "cancel" });

  if (step === "destination") {
    const list = F.VAULTS.map((v) => row({
      media: initial(v.name), mediaTone: m.vault === v.id ? "ink" : undefined, title: v.name,
      desc: `${F.pct(v.apy)} APY · ${v.balance ? `${F.money(v.balance, region)} saved` : "Empty"}`,
      action: "pick-vault", data: { "data-id": v.id, role: "radio", "aria-checked": m.vault === v.id }, chevron: false,
    }).replace('<div class="h-row-trail"></div>', `<div class="h-row-trail">${m.vault === v.id ? `<span style="color:var(--h-ink)">${icon("check", 22)}</span>` : ""}</div>`));
    return { tab: null, view: `${topbar({ title: "Save", trail: cancel })}<div class="h-view" data-tabbar="none"><div class="h-stack">
      <div><h2 class="h-title" id="move-title" tabindex="-1">Which vault?</h2><p class="h-secondary" style="margin-top:.5rem">Rates are what each vault reported at ${F.timeLabel(F.READ_AT_ISO)} UTC.</p></div>
      ${panel(rows([row({ title: "From available cash", amount: F.money(st.cash, region) })], { "data-media": "none" }))}
      <section>${sectionHead("To")}${panel(`<div class="h-rows" role="radiogroup" aria-label="Vault">${list.join("")}</div>`)}</section>
      ${btn({ label: "Continue", variant: "primary", size: "cta", block: true, action: "move-next", disabled: !m.vault })}
    </div></div>` };
  }

  if (step === "amount") {
    const over = amount > st.cash;
    const raw = m.amount || "";
    const display = raw ? F.money(amount, region, { minimumFractionDigits: raw.includes(".") ? Math.min(2, raw.split(".")[1].length) : 0, maximumFractionDigits: 2 }) + (raw.endsWith(".") ? "." : "") : F.money(0, region, { minimumFractionDigits: 0 });
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "⌫"];
    return { tab: null, view: `${topbar({ title: `To ${vault.name}`, lead: backBtn("move-back"), trail: cancel })}<div class="h-view" data-tabbar="none" style="display:flex;flex-direction:column">
      ${steps(STEPS, 0)}
      <div class="h-amount-entry" aria-live="polite">
        <div class="h-amount-display"${raw ? "" : " data-empty"}${over ? " data-invalid" : ""}${display.length > 12 ? ' data-size="long"' : ""} id="amount-display">${esc(display)}</div>
        <div class="h-amount-help"${over ? " data-invalid" : ""}>${over ? "That's more than your available cash" : `${F.money(st.cash, region)} available`}</div>
      </div>
      <div class="h-chips" style="justify-content:center">${[25, 50, 100].map((n) => `<button type="button" class="h-chip" data-action="quick" data-value="${n}"${amount === n ? ' aria-pressed="true"' : ""}>${F.money(n, region, { minimumFractionDigits: 0 })}</button>`).join("")}<button type="button" class="h-chip" data-action="quick" data-value="${st.cash}"${amount === st.cash ? ' aria-pressed="true"' : ""}>Max</button></div>
      <div class="h-spacer"></div>
      ${panel(facts([["Available after", over ? "—" : F.money(st.cash - amount, region)], ["Earns", `${F.pct(vault.apy)} APY <span class="h-caption">reported by ${esc(vault.name)}</span>`]]), { "data-inset": true, style: "padding-block:0;margin-bottom:.5rem" })}
      <div class="h-numpad" role="group" aria-label="Number pad">${keys.map((k) => `<button type="button" class="h-key" data-action="key" data-value="${k === "⌫" ? "del" : k}"${k === "⌫" ? ' data-role="delete" aria-label="Delete"' : ""}>${k === "⌫" ? icon("delete", 24) : k}</button>`).join("")}</div>
      ${btn({ label: "Review", variant: "primary", size: "cta", block: true, action: "move-next", disabled: !amount || over })}
    </div>` };
  }

  if (step === "review") {
    const pos = F.position(st.vaults, st.cash);
    return { tab: null, view: `${topbar({ title: "Review", lead: backBtn("move-back"), trail: cancel })}<div class="h-view" data-tabbar="none"><div class="h-stack">
      ${steps(STEPS, 1)}
      <div><h2 class="h-title" id="move-title" tabindex="-1">Deposit ${esc(F.money(amount, region))}</h2><p class="h-secondary" style="margin-top:.5rem">Nothing moves until you confirm.</p></div>
      ${panel(facts([
        ["Amount", F.money(amount, region), { "data-emphasis": true }],
        ["From", "Available cash"],
        ["To", `${esc(vault.name)} <span class="h-caption">${F.pct(vault.apy)} APY</span>`],
        ["Network", "Base"],
        ["Fee", "None"],
        ["Available after", F.money(st.cash - amount, region)],
        ["Net position after", `${F.money(pos.net, region)} <span class="h-caption">Unchanged</span>`],
      ]), { "data-inset": true, style: "padding-block:0" })}
      <div class="h-btn-stack">${btn({ label: `Deposit ${F.money(amount, region)}`, variant: "primary", size: "cta", block: true, action: "move-submit" })}${btn({ label: "Back", variant: "quiet", block: true, action: "move-back" })}</div>
    </div></div>` };
  }

  if (step === "pending") {
    return { tab: null, view: `${topbar({ title: "Deposit" })}<div class="h-view" data-tabbar="none"><div class="h-stack">
      ${steps(STEPS, 2)}
      ${result({ tone: "attention", icon: "clock", title: "Deposit submitted", desc: "Waiting for Base to confirm. Nothing has moved yet." })}
      ${panel(facts([["Amount", F.money(amount, region)], ["To", esc(vault.name)], ["Submitted", `${F.timeLabel(F.CLOCK_ISO)} UTC`]]), { "data-inset": true, style: "padding-block:0" })}
      ${btn({ label: "Back to home", variant: "outline", size: "cta", block: true, action: "cancel" })}
    </div></div>` };
  }

  /* result */
  const o = store.outcome;
  const pos = F.position(st.vaults, st.cash);
  const content = o === "confirmed"
    ? `${result({ tone: "gain", icon: "check", title: `Deposited ${F.money(amount, region)}`, desc: `Saved in ${vault.name}, earning ${F.pct(vault.apy)} from the next vault update.` })}
       ${panel(facts([["Available now", F.money(st.cash - amount, region)], ["Saved now", F.money(pos.saved + amount, region)], ["Net position", `${F.money(pos.net, region)} <span class="h-caption">Unchanged</span>`], ["Transaction", `<span class="h-mono">${F.short(F.CONFIRMED_HASH)}</span>`]]), { "data-inset": true, style: "padding-block:0" })}
       <div class="h-btn-stack">${btn({ label: "Done", variant: "primary", size: "cta", block: true, action: "cancel" })}${btn({ label: "Go to Activity", variant: "quiet", block: true, action: "tab", extra: { "data-value": "activity" } })}</div>`
    : o === "failed"
    ? `${result({ tone: "loss", icon: "x", title: "The deposit didn't go through", desc: "No money moved. Try again when you're ready." })}
       ${panel(facts([["Amount", F.money(amount, region)], ["To", esc(vault.name)], ["Available", `${F.money(st.cash, region)} <span class="h-caption">Unchanged</span>`]]), { "data-inset": true, style: "padding-block:0" })}
       <div class="h-btn-stack">${btn({ label: "Try again", variant: "primary", size: "cta", block: true, action: "move-retry" })}${btn({ label: "Cancel", variant: "quiet", block: true, action: "cancel" })}</div>`
    : `${result({ tone: "attention", icon: "alert", title: "We couldn't confirm this deposit", desc: "It may still go through. Check Activity before sending again, or you could move the money twice." })}
       ${panel(facts([["Amount", F.money(amount, region)], ["To", esc(vault.name)], ["Transaction", `<span class="h-mono">${F.short(F.CONFIRMED_HASH)}</span>`]]), { "data-inset": true, style: "padding-block:0" })}
       <div class="h-btn-stack">${btn({ label: "Go to Activity", variant: "primary", size: "cta", block: true, action: "tab", extra: { "data-value": "activity" } })}${btn({ label: "Back to home", variant: "quiet", block: true, action: "cancel" })}</div>`;
  return { tab: null, view: `${topbar({ title: "Deposit" })}<div class="h-view" data-tabbar="none"><div class="h-stack">${steps(STEPS, 2)}${content}</div></div>`, focus: "#result-title" };
}

/* ---------- Activity ---------------------------------------------------- */

export function activity(store) {
  const st = F.HOME_STATES[store.homeState] || F.HOME_STATES.funded;
  const region = st.region;
  const list = st.loading ? F.ACTIVITY : st.activity;
  const attention = list.filter((a) => a.status !== "settled");
  const settled = list.filter((a) => a.status === "settled");
  const byDay = settled.reduce((m, a) => { const d = F.dayLabel(a.at); (m[d] ||= []).push(a); return m; }, {});
  const filter = store.activityFilter || "all";
  const shown = filter === "all" ? byDay : Object.fromEntries(Object.entries(byDay).map(([d, as]) => [d, as.filter((a) => filter === "in" ? a.kind === "received" : filter === "out" ? a.kind === "sent" : a.kind === "saved")]).filter(([, as]) => as.length));

  return { tab: "activity", view: `<div class="h-view"><div class="h-stack">
    <div class="h-title-row"><h1 class="h-large-title">Activity</h1>${iconBtn({ name: "user", label: "Account", action: "go", extra: { "data-to": "account" } })}</div>
    ${seg([{ id: "all", label: "All" }, { id: "in", label: "In" }, { id: "out", label: "Out" }, { id: "saved", label: "Saved" }], filter, "filter")}
    ${attention.length ? `<section class="h-day"><div class="h-day-head"><span class="h-eyebrow">Needs attention</span></div>${panel(rows(attention.map((a) => activityRow(a, region, { time: true }))))}</section>` : ""}
    ${Object.keys(shown).length ? Object.entries(shown).map(([d, as]) => `<section class="h-day"><div class="h-day-head"><span class="h-eyebrow">${esc(d)}</span></div>${panel(rows(as.map((a) => activityRow(a, region, { time: true }))))}</section>`).join("")
      : panel(empty({ icon: "activity", title: "Nothing here", desc: filter === "all" ? "Deposits, sends and receipts will show here in order." : "No entries match this filter." }))}
  </div></div>` };
}

export function entrySheet(id, store) {
  const st = F.HOME_STATES[store.homeState] || F.HOME_STATES.funded;
  const a = (st.activity || F.ACTIVITY).find((e) => e.id === id) || F.ACTIVITY[0];
  const region = st.region;
  const v = a.vault ? vaultById(a.vault) : null;
  const title = a.kind === "received" ? "Received" : a.kind === "sent" ? "Sent" : `Saved into ${v.name}`;
  const status = { settled: ["Settled", "gain"], pending: ["Pending", "attention"], unknown: ["Unconfirmed", "attention"], failed: ["Failed", "loss"] }[a.status];
  const rowsList = [
    ["Amount", F.money(a.amount, region), { "data-emphasis": true }],
    a.kind === "saved" ? ["To", `${esc(v.name)} <span class="h-caption">${F.pct(v.apy)} APY</span>`] : a.kind === "sent" ? ["To", `<span class="h-mono">${F.short(a.counterparty)}</span>`] : ["From", `<span class="h-mono">${F.short(a.counterparty)}</span>`],
    ["Network", "Base"],
    ["When", F.dateTimeLabel(a.at)],
    ["Transaction", `<span class="h-mono">${F.short(a.hash)}</span>`],
  ];
  return {
    title, desc: `${pill(status[0], status[1])}`,
    body: `${facts(rowsList)}${a.status === "unknown" ? `<p class="h-secondary" style="margin-top:1rem">This may still confirm. Don't send it again until it settles or fails.</p>` : ""}`,
    foot: `${btn({ label: "View on Basescan", variant: "outline", block: true, icon: "external", action: "noop" })}${btn({ label: "Done", variant: "primary", size: "cta", block: true, action: "sheet-close" })}`,
  };
}

/* ---------- Explore ----------------------------------------------------- */

export function explore(store) {
  const items = [
    ["plus", "Add money", "Card, bank transfer or crypto"],
    ["arrow-up-right", "Send", "To any address on Base"],
    ["arrow-down-left", "Receive", "Show your address or QR"],
    ["layers", "Borrow", "Against your savings"],
    ["trending", "Invest", "Stocks and crypto"],
  ];
  const head = `<div class="h-title-row"><h1 class="h-large-title">Explore</h1>${iconBtn({ name: "user", label: "Account", action: "go", extra: { "data-to": "account" } })}</div>`;
  if (store?.treatment === "expressive" || store?.treatment === "base") {
    const card = ({ ic, title, desc, tone, span, figure, entry }) => `<button type="button" class="x-card"${tone ? ` data-tone="${tone}"` : ""}${span ? " data-span" : ""} data-action="handoff" data-entry="${esc(entry || title)}">
      <div class="x-card-body"><div class="x-card-icon">${icon(ic, 20)}</div>${figure ? `<div class="x-card-figure h-num" style="margin-top:auto;padding-top:1rem">${esc(figure)}</div>` : ""}</div>
      <div><div class="x-card-title">${esc(title)}</div><div class="x-card-desc">${esc(desc)}</div></div>
    </button>`;
    return { tab: "explore", view: `<div class="h-view"><div class="h-stack">
      ${head}
      <div class="x-cards">
        ${card({ ic: "vault", title: "Earn up to 4.10%", desc: "USDC vaults, withdraw any time", tone: "blue", span: true, figure: "4.10%", entry: "Save" })}
        ${card({ ic: "plus", title: "Add money", desc: "Card, bank or crypto" })}
        ${card({ ic: "arrow-up-right", title: "Send", desc: "Any address on Base" })}
        ${card({ ic: "layers", title: "Borrow", desc: "Against your savings", tone: "attention" })}
        ${card({ ic: "trending", title: "Invest", desc: "Stocks and crypto", tone: "gain" })}
        ${card({ ic: "arrow-down-left", title: "Receive", desc: "Your address and QR", tone: "ink", span: true, entry: "Receive" })}
      </div>
    </div></div>` };
  }
  return { tab: "explore", view: `<div class="h-view"><div class="h-stack">
    ${head}
    ${panel(rows(items.map(([ic, t, d]) => row({ media: icon(ic, 20), title: t, desc: d, action: "handoff", data: { "data-entry": t } }))))}
  </div></div>` };
}

/* ---------- Account ----------------------------------------------------- */

export function account(store) {
  const st = F.HOME_STATES[store.homeState] || F.HOME_STATES.funded;
  return { tab: null, view: `${topbar({ title: "Account", lead: backBtn() })}<div class="h-view" data-tabbar="none"><div class="h-stack">
    ${panel(rows([
      row({ media: icon("user", 20), title: F.short(F.ACCOUNT), desc: "Base account", action: "copy", data: { "data-copy": F.ACCOUNT }, chevron: false }).replace('<div class="h-row-trail"></div>', `<div class="h-row-trail"><span class="h-row-chevron">${icon("copy", 20)}</span></div>`),
    ]))}
    ${panel(rows([
      row({ media: icon("globe", 20), title: "Region and currency", desc: F.REGIONS[st.region].label, action: "handoff", data: { "data-entry": "Region" } }),
      row({ media: icon("shield", 20), title: "Security", desc: "Passkey, recovery, sessions", action: "handoff", data: { "data-entry": "Security" } }),
      row({ media: icon("bell", 20), title: "Notifications", desc: "Deposits, receipts, rate changes", action: "handoff", data: { "data-entry": "Notifications" } }),
      row({ media: icon("sun", 20), title: "Appearance", desc: { system: "Match device", light: "Light", dark: "Dark" }[store.theme] || "Match device", action: "appearance" }),
    ]))}
    ${panel(rows([
      row({ media: icon("file", 20), title: "Disclosures and terms", desc: "Eligibility, contracts, sources", action: "handoff", data: { "data-entry": "Disclosures" } }),
    ]))}
    ${btn({ label: "Sign out", variant: "quiet", block: true, icon: "logout", action: "noop" })}
    <p class="h-caption" style="text-align:center">Home 2.4.0 · Base</p>
  </div></div>` };
}

/* ---------- Handoff sheet (upstream convention) ------------------------ */

export function handoffSheet(entry) {
  const copy = {
    "Add money": "This opens Home's existing funding flow. Funding methods and live money movement are not part of this composition.",
    Send: "This opens Home's existing send flow. No transfer is created here.",
    Receive: "This shows Home's existing receive screen.",
    Withdraw: "This opens Home's existing withdrawal flow. No money moves here.",
    Save: "This opens the Saved screen and vault list.",
    Borrow: "This opens Home's existing Borrow experience. The fixture has no debt; no eligibility is implied.",
    Invest: "This opens Home's existing Invest discovery. No quote or order is created.",
    Region: "Region and currency settings are not part of this fixture.",
    Security: "Security settings are not part of this fixture.",
    Notifications: "Notification settings are not part of this fixture.",
    Disclosures: "Disclosures, eligibility and contract lists live here, not on product screens.",
  };
  return { title: entry, desc: `<span class="h-secondary">Not connected in this design lab</span>`, body: `<p class="h-body">${esc(copy[entry] || "Not part of this composition.")}</p>`, foot: btn({ label: "OK", variant: "primary", size: "cta", block: true, action: "sheet-close" }) };
}
