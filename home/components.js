/* Render helpers. Each returns an HTML string; screens compose them.
   Keep these thin — the design lives in system.css. */

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const attrs = (o = {}) => Object.entries(o)
  .filter(([, v]) => v !== undefined && v !== null && v !== false)
  .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`)).join("");

/* Icon set — 24 viewBox, 1.75 stroke, round joins. Hand-drawn, not a library. */
const PATHS = {
  "chevron-right": "M9 6l6 6-6 6",
  "chevron-left": "M15 6l-6 6 6 6",
  "arrow-up-right": "M7 17L17 7M8 7h9v9",
  "arrow-down-left": "M17 7L7 17M16 17H7V8",
  plus: "M12 5v14M5 12h14",
  x: "M6 6l12 12M18 6L6 18",
  check: "M5 12.5l4.5 4.5L19 7",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  alert: "M12 9v4M12 16.5h.01M10.3 4.3 2.6 17.5a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z",
  home: "M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z",
  activity: "M4 12h4l2-6 4 12 2-6h4",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM14.8 9.2l-1.6 4-4 1.6 1.6-4z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  wallet: "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M16.5 15h.01",
  vault: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM12 8.5V12l2 1",
  percent: "M19 5L5 19M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  copy: "M9 9h10v11H9zM5 15V4h11",
  external: "M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6",
  dollar: "M12 3v18M16.5 7.5c0-1.5-2-2.5-4.5-2.5S7.5 6 7.5 8s2 2.5 4.5 3 4.5 1.5 4.5 3-2 3-4.5 3-4.5-1-4.5-2.5",
  delete: "M20 6H9l-6 6 6 6h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM17 9l-5 5M12 9l5 5",
  shield: "M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z",
  bell: "M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 21h4",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  trending: "M3 17l6-6 4 4 8-8M15 7h6v6",
  sliders: "M4 8h9M17 8h3M4 16h3M11 16h9M15 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z",
  file: "M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6",
  logout: "M10 4H5v16h5M14 16l4-4-4-4M18 12H9",
  minus: "M5 12h14",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  arrows: "M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4",
};
export function icon(name, size = 20, extra = {}) {
  const d = PATHS[name] || PATHS.alert;
  return `<svg${attrs({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 1.75, "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", ...extra })}><path d="${d}"/></svg>`;
}

export function btn({ label, variant = "secondary", size, block, icon: ic, disabled, loading, action, type = "button", extra = {} }) {
  return `<button${attrs({ class: "h-btn", type, "data-variant": variant, "data-size": size, "data-block": block, disabled, "data-loading": loading, "data-action": action, ...extra })}>${ic ? icon(ic, 18) : ""}<span>${esc(label)}</span></button>`;
}
export function iconBtn({ name, label, action, tone, surface, extra = {} }) {
  return `<button${attrs({ class: "h-iconbtn", type: "button", "aria-label": label, "data-action": action, "data-tone": tone, "data-surface": surface, ...extra })}>${icon(name, 22)}</button>`;
}

export function topbar({ title, lead, trail, large }) {
  return `<header class="h-topbar" data-large="${large ? "true" : "false"}">
    <div class="h-topbar-lead">${lead || ""}</div>
    ${title && !large ? `<h1 class="h-topbar-title">${esc(title)}</h1>` : `<div></div>`}
    <div class="h-topbar-trail">${trail || ""}</div>
  </header>`;
}
export const backBtn = (action = "back") => iconBtn({ name: "chevron-left", label: "Back", action });

export function row({ media, mediaTone, mediaShape, title, desc, amount, amountSub, amountTone, chevron = true, action, data = {}, tag = "button", lines }) {
  const Tag = action ? "button" : tag === "button" ? "div" : tag;
  const trail = amount !== undefined
    ? `<div class="h-row-amount h-num"${attrs({ "data-tone": amountTone })}><span>${esc(amount)}</span>${amountSub ? `<small>${esc(amountSub)}</small>` : ""}</div>`
    : "";
  return `<${Tag}${attrs({ class: "h-row", type: Tag === "button" ? "button" : undefined, "data-action": action, "data-media": media === undefined ? "none" : undefined, ...data })}>
    ${media !== undefined ? `<div class="h-row-media"${attrs({ "data-tone": mediaTone, "data-shape": mediaShape })}>${media}</div>` : ""}
    <div class="h-row-body">
      <div class="h-row-title"${attrs({ "data-lines": lines })}>${esc(title)}</div>
      ${desc ? `<div class="h-row-desc">${esc(desc)}</div>` : ""}
    </div>
    <div class="h-row-trail">${trail}${chevron && action ? `<span class="h-row-chevron">${icon("chevron-right", 20)}</span>` : ""}</div>
  </${Tag}>`;
}
export const rows = (items, opts = {}) => `<div class="h-rows"${attrs(opts)}>${items.join("")}</div>`;
export const panel = (inner, opts = {}) => `<div class="h-panel"${attrs(opts)}>${inner}</div>`;

export function sectionHead(title, trail) {
  return `<div class="h-section-head"><h2 class="h-headline">${esc(title)}</h2>${trail || ""}</div>`;
}
export function facts(items) {
  return `<dl class="h-facts">${items.map(([k, v, o = {}]) => `<div class="h-fact"${attrs(o)}><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join("")}</dl>`;
}
export const pill = (label, tone, dot) => `<span class="h-pill"${attrs({ "data-tone": tone, "data-dot": dot })}>${esc(label)}</span>`;
export const delta = (label, dir) => `<span class="h-delta h-num" data-dir="${dir}">${dir === "up" ? icon("arrow-up-right", 14) : dir === "down" ? icon("arrow-down-left", 14) : ""}${esc(label)}</span>`;
export const skeleton = (w = "8ch", h = "1em", shape) => `<span class="h-skeleton"${attrs({ "data-shape": shape })} style="width:${w};height:${h}"></span>`;

export function banner({ icon: ic, tone, title, desc, action, actionLabel = "View" }) {
  return `<div class="h-panel h-banner"${attrs({ "data-tone": tone })}>
    <div class="h-row-media" data-size="sm"${attrs({ "data-tone": tone })}>${icon(ic, 18)}</div>
    <div class="h-banner-body"><div class="h-banner-title">${esc(title)}</div><div class="h-banner-desc">${esc(desc)}</div></div>
    ${action ? btn({ label: actionLabel, variant: "quiet", size: "sm", action }) : ""}
  </div>`;
}
export function empty({ icon: ic = "wallet", title, desc, cta }) {
  return `<div class="h-empty"><div class="h-empty-mark">${icon(ic, 24)}</div><h3 class="h-headline">${esc(title)}</h3><p class="h-secondary">${esc(desc)}</p>${cta || ""}</div>`;
}
export function steps(labels, current) {
  return `<ol class="h-steps" aria-label="Progress">${labels.map((l, i) => `<li class="h-step" data-state="${i < current ? "done" : i === current ? "current" : "upcoming"}"${i === current ? ' aria-current="step"' : ""}>${esc(l)}</li>`).join("")}</ol>`;
}
export function result({ tone, icon: ic, title, desc }) {
  return `<div class="h-result"><div class="h-result-mark" data-tone="${tone}">${icon(ic, 28)}</div><h1 class="h-title" id="result-title" tabindex="-1">${esc(title)}</h1><p class="h-body">${esc(desc)}</p></div>`;
}
export function seg(items, selected, action) {
  return `<div class="h-seg" role="tablist">${items.map((it) => `<button type="button" role="tab" aria-selected="${it.id === selected}" data-action="${action}" data-value="${esc(it.id)}">${esc(it.label)}</button>`).join("")}</div>`;
}
export function tabbar(current) {
  const tabs = [["home", "Money", "home"], ["activity", "Activity", "activity"], ["explore", "Explore", "compass"]];
  return `<nav class="h-tabbar" aria-label="Primary">${tabs.map(([id, label, ic]) => `<button type="button" class="h-tab" data-action="tab" data-value="${id}"${current === id ? ' aria-current="page"' : ""}>${icon(ic, 24)}<span>${label}</span></button>`).join("")}</nav>`;
}
export function heroAmount(text, { size } = {}) {
  const long = size === "long" || text.length > 12;
  const m = text.match(/^(.*?)([.,]\d{2})$/);
  const body = m ? `${esc(m[1])}<span class="h-cents">${esc(m[2])}</span>` : esc(text);
  return `<div class="h-hero-amount"${attrs({ "data-size": long ? "long" : undefined })}>${body}</div>`;
}
