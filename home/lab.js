import * as F from "./fixtures.js";
import * as S from "./screens.js";
import * as G from "./gallery.js";
import { tabbar, btn, esc, icon } from "./components.js";

/* ---------- State ------------------------------------------------------- */

const PREF_KEY = "home-lab-prefs";
const readPrefs = () => { try { return JSON.parse(localStorage.getItem(PREF_KEY) || "{}"); } catch { return {}; } };
const writePrefs = (p) => { try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch { /* per-viewer only */ } };

const prefs = readPrefs();
export const store = {
  homeState: "funded",
  theme: prefs.theme || "system",
  motion: prefs.motion || "normal",
  text: prefs.text || "100",
  width: prefs.width || "390",
  outcome: prefs.outcome || "confirmed",
  move: { vault: null, amount: "" },
  activityFilter: "all",
  gallerySeg: "all", gallerySwitch: false, galleryAmount: "",
  lastFocus: null,
};
function persist() { writePrefs({ theme: store.theme, motion: store.motion, text: store.text, width: store.width, outcome: store.outcome }); }

/* ---------- Routing ----------------------------------------------------- */

const ROUTES = {
  home: (s) => S.home(s), save: (s) => S.save(s), cash: (s) => S.cash(s),
  activity: (s) => S.activity(s), explore: () => S.explore(), account: (s) => S.account(s),
  components: (s) => G.components(s), tokens: () => G.tokens(),
  "move/destination": (s) => S.move(s, "destination"), "move/amount": (s) => S.move(s, "amount"),
  "move/review": (s) => S.move(s, "review"), "move/pending": (s) => S.move(s, "pending"), "move/result": (s) => S.move(s, "result"),
};
const history = [];
function parse() {
  const raw = (location.hash || "#/home").slice(2);
  const [path, q] = raw.split("?");
  const params = new URLSearchParams(q || "");
  return { path: path || "home", params };
}
export function go(path, params = {}, { replace = false } = {}) {
  const q = new URLSearchParams(params).toString();
  const h = `#/${path}${q ? `?${q}` : ""}`;
  if (replace) location.replace(h); else location.hash = h;
}
export function back() {
  history.pop();
  const prev = history.pop();
  const cur = parse().path;
  const fallback = cur.startsWith("move/") || ["save", "cash", "account"].includes(cur) ? "home" : "home";
  go(prev || fallback, prev ? {} : { state: store.homeState });
}

/* ---------- Render ------------------------------------------------------ */

const app = document.getElementById("app");
const screenEl = document.getElementById("screen");
const tabEl = document.getElementById("tabbar");
let current = null;

function render() {
  const { path, params } = parse();
  if (params.get("state") && F.HOME_STATES[params.get("state")]) store.homeState = params.get("state");
  const fn = ROUTES[path] || ROUTES.home;
  const out = fn(store);
  const scroll = current === path ? screenEl.querySelector(".h-view")?.scrollTop : 0;
  screenEl.innerHTML = out.view;
  tabEl.innerHTML = out.tab ? tabbar(out.tab) : "";
  tabEl.hidden = !out.tab;
  if (scroll) screenEl.querySelector(".h-view").scrollTop = scroll;
  if (current !== path) {
    history.push(path);
    if (history.length > 40) history.shift();
    const focusTarget = out.focus && screenEl.querySelector(out.focus);
    if (focusTarget) focusTarget.focus({ preventScroll: true });
  }
  current = path;
  document.title = `Home lab · ${path.replace("/", " › ")}`;
  const name = document.getElementById("lab-bar-name");
  if (name) {
    const screen = path.replace("move/", "Save · ").replace(/^([a-z])/, (m) => m.toUpperCase());
    const stateLabel = F.HOME_STATES[store.homeState].label;
    name.textContent = path === "home" || store.homeState !== "funded" ? `${screen} · ${stateLabel}` : screen;
  }
  for (const el of screenEl.querySelectorAll("[data-token]")) {
    el.textContent = getComputedStyle(document.documentElement).getPropertyValue(el.dataset.token).trim();
  }
  renderSide();
}
window.addEventListener("hashchange", render);

/* ---------- Sheet ------------------------------------------------------- */

const sheetRoot = document.getElementById("sheet-root");
let sheetReturnFocus = null;
export function openSheet({ title, desc, body, foot, label }) {
  sheetReturnFocus = document.activeElement;
  sheetRoot.innerHTML = `<div class="h-scrim" data-action="sheet-close"></div>
    <div class="h-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"${label ? ` aria-label="${esc(label)}"` : ""}>
      <div class="h-grabber" aria-hidden="true"></div>
      <div class="h-sheet-head"><h2 class="h-title" id="sheet-title" tabindex="-1">${esc(title)}</h2>${desc ? `<div>${desc}</div>` : ""}</div>
      <div class="h-sheet-body">${body || ""}</div>
      ${foot ? `<div class="h-sheet-foot">${foot}</div>` : ""}
    </div>`;
  requestAnimationFrame(() => {
    sheetRoot.dataset.open = "true";
    sheetRoot.querySelector("#sheet-title").focus({ preventScroll: true });
  });
}
export function closeSheet() {
  if (!sheetRoot.dataset.open) return;
  delete sheetRoot.dataset.open;
  const ms = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--h-d-sheet")) || 0;
  setTimeout(() => { sheetRoot.innerHTML = ""; }, ms + 20);
  if (sheetReturnFocus && sheetReturnFocus.isConnected) sheetReturnFocus.focus({ preventScroll: true });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sheetRoot.dataset.open) { e.preventDefault(); closeSheet(); return; }
  if (e.key === "Tab" && sheetRoot.dataset.open) {
    const f = [...sheetRoot.querySelectorAll("button, [href], input, [tabindex]:not([tabindex='-1'])")].filter((el) => !el.disabled);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------- Toast ------------------------------------------------------- */

const toastRoot = document.getElementById("toast-root");
let toastTimer;
export function toast(message, ic = "check") {
  toastRoot.innerHTML = `<div class="h-toast" role="status">${icon(ic, 16)}<span>${esc(message)}</span></div>`;
  requestAnimationFrame(() => { toastRoot.firstElementChild.dataset.visible = "true"; });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { const t = toastRoot.firstElementChild; if (t) { delete t.dataset.visible; setTimeout(() => { toastRoot.innerHTML = ""; }, 200); } }, 2200);
}

/* ---------- Actions ----------------------------------------------------- */

const actions = {
  go: (el) => go(el.dataset.to),
  back: () => back(),
  tab: (el) => { closeSheet(); go(el.dataset.value, el.dataset.value === "home" ? { state: store.homeState } : {}); },
  handoff: (el) => openSheet(S.handoffSheet(el.dataset.entry)),
  entry: (el) => openSheet(S.entrySheet(el.dataset.id, store)),
  vault: (el) => { store.move = { vault: el.dataset.id, amount: "" }; go("move/amount"); },
  copy: (el) => { try { navigator.clipboard?.writeText(el.dataset.copy); } catch {} toast("Address copied"); },
  retry: () => { store.homeState = "funded"; render(); toast("Savings loaded"); },
  appearance: () => { store.theme = { system: "light", light: "dark", dark: "system" }[store.theme]; applyPrefs(); render(); },
  noop: () => toast("Not wired in this lab", "alert"),
  "sheet-close": () => closeSheet(),
  filter: (el) => { store.activityFilter = el.dataset.value; render(); },

  move: () => { store.move = { vault: null, amount: "" }; go("move/destination"); },
  cancel: () => { store.move = { vault: null, amount: "" }; go("home", { state: store.homeState }); },
  "pick-vault": (el) => { store.move.vault = el.dataset.id; render(); },
  "move-next": () => { const p = parse().path; go(p === "move/destination" ? "move/amount" : "move/review"); },
  "move-back": () => { const p = parse().path; go(p === "move/amount" ? "move/destination" : "move/amount"); },
  "move-retry": () => go("move/review"),
  "move-submit": () => {
    go("move/pending");
    setTimeout(() => { if (parse().path === "move/pending") go("move/result", {}, { replace: true }); }, 1400);
  },
  quick: (el) => { store.move.amount = String(el.dataset.value); render(); },
  key: (el) => {
    const k = el.dataset.value; let a = store.move.amount;
    if (k === "del") a = a.slice(0, -1);
    else if (k === ".") { if (!a.includes(".")) a = (a || "0") + "."; }
    else if (a.includes(".") && a.split(".")[1].length >= 2) return;
    else if (a.length >= 9) return;
    else a = a === "0" ? k : a + k;
    store.move.amount = a; render();
  },

  "gallery-seg": (el) => { store.gallerySeg = el.dataset.value; render(); },
  "gallery-switch": () => { store.gallerySwitch = !store.gallerySwitch; render(); },
  "gallery-key": (el) => {
    const k = el.dataset.value; let a = store.galleryAmount;
    if (k === "del") a = a.slice(0, -1); else if (k === ".") { if (!a.includes(".")) a = (a || "0") + "."; } else if (a.length < 9) a = a === "0" ? k : a + k;
    store.galleryAmount = a; render();
  },
  "gallery-sheet": () => openSheet({ title: "A sheet", desc: `<span class="h-secondary">Grabber, focus trap, Escape, scrim tap</span>`, body: `<p class="h-body">Sheets carry one decision. The title takes focus, Escape and the scrim close it, and focus returns to the control that opened it.</p>`, foot: `${btn({ label: "Primary action", variant: "primary", size: "cta", block: true, action: "sheet-close" })}${btn({ label: "Cancel", variant: "quiet", block: true, action: "sheet-close" })}` }),
  "gallery-toast": () => toast("Saved"),

  /* lab chrome */
  "lab-go": (el) => { closeSheet(); go(el.dataset.to, el.dataset.state ? { state: el.dataset.state } : {}); },
  "lab-set": (el) => { store[el.dataset.key] = el.dataset.value; persist(); applyPrefs(); closeSheet(); render(); },
  "lab-menu": () => openSheet({ title: "Design lab", desc: `<span class="h-secondary">Screens, states and controls</span>`, body: sideInner(true), label: "Design lab" }),
};
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el || el.disabled) return;
  const fn = actions[el.dataset.action];
  if (fn) { e.preventDefault(); fn(el); }
});

/* ---------- Lab chrome -------------------------------------------------- */

function applyPrefs() {
  const root = document.documentElement;
  if (store.theme === "system") root.removeAttribute("data-theme"); else root.dataset.theme = store.theme;
  if (store.motion === "reduce") root.dataset.motion = "reduce"; else root.removeAttribute("data-motion");
  root.style.fontSize = `${store.text}%`;
  root.style.setProperty("--lab-w", `${store.width}px`);
}

const SCREENS = [
  ["Home", "home", Object.entries(F.HOME_STATES).map(([k, v]) => [v.label, k])],
  ["Saved", "save"], ["Cash", "cash"],
  ["Save flow", "move/destination", [["Destination", null], ["Amount", "move/amount"], ["Review", "move/review"], ["Pending", "move/pending"], ["Result", "move/result"]]],
  ["Activity", "activity"], ["Explore", "explore"], ["Account", "account"],
];
const LIB = [["Components", "components"], ["Tokens", "tokens"]];
const CONTROLS = [
  ["theme", "Theme", [["system", "System"], ["light", "Light"], ["dark", "Dark"]]],
  ["motion", "Motion", [["normal", "Normal"], ["reduce", "Reduce"]]],
  ["text", "Text size", [["100", "100%"], ["115", "115%"], ["130", "130%"]]],
  ["outcome", "Move outcome", [["confirmed", "Confirmed"], ["failed", "Failed"], ["unknown", "Unknown"]]],
  ["width", "Frame width", [["320", "320"], ["360", "360"], ["390", "390"], ["430", "430"]]],
];

function navBtn(label, to, state, sub) {
  const { path } = parse();
  const cur = path === to && (!state || store.homeState === state);
  return `<button type="button" data-action="lab-go" data-to="${to}"${state ? ` data-state="${state}"` : ""}${cur ? ' aria-current="true"' : ""}><span>${esc(label)}</span>${sub ? `<small>${esc(sub)}</small>` : ""}</button>`;
}
function sideInner(compact = false) {
  const screens = SCREENS.map(([label, to, subs]) => {
    if (!subs) return navBtn(label, to);
    if (to === "home") return subs.map(([sl, sk]) => navBtn(`${label}`, to, sk, sl)).join("");
    return subs.map(([sl, sp]) => { const need = sp && sp !== "move/destination"; return `<button type="button" data-action="lab-go" data-to="${sp || to}" ${parse().path === (sp || to) ? 'aria-current="true"' : ""}><span>${esc(label)}</span><small>${esc(sl)}</small></button>`; }).join("");
  }).join("");
  const controls = CONTROLS.filter(([k]) => !(compact && k === "width")).map(([key, label, opts]) => `<div class="lab-control"><span class="h-label">${label}</span><div class="h-seg">${opts.map(([v, l]) => `<button type="button" data-action="lab-set" data-key="${key}" data-value="${v}" aria-selected="${store[key] === v}">${l}</button>`).join("")}</div></div>`).join("");
  return `<div class="lab-group"><span class="h-eyebrow">Screens</span><div class="lab-nav">${screens}</div></div>
    <div class="lab-group"><span class="h-eyebrow">Library</span><div class="lab-nav">${LIB.map(([l, t]) => navBtn(l, t)).join("")}</div></div>
    <div class="lab-group"><span class="h-eyebrow">Controls</span>${controls}</div>`;
}
function renderSide() {
  const side = document.getElementById("side");
  if (!side) return;
  side.innerHTML = `<div class="lab-brand"><strong>Home design lab</strong><span class="h-secondary">Mobile-first UI system for a consumer money app on Base. Fixture data only.</span></div>${sideInner()}<div class="lab-foot h-caption">Agent-built on top of Direction 1. Numbers mirror the upstream fixture.</div>`;
}

/* ---------- Boot -------------------------------------------------------- */

const boot = () => { applyPrefs(); render(); };
if (window.claude?.hot?.ready) window.claude.hot.ready(boot); else boot();
