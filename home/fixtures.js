/* Fixed facts for every screen. Mirrors jessepollak/home
   apps/web/client/explorations/home-reimagined/fixtures.ts so the lab and
   the upstream Storybook stories show the same numbers:
   cash 250 · Gauntlet 750 @ 4.10% · Steakhouse 250 @ 3.85% · Re7 empty
   saved 1,000 · weighted 4.04% · net 1,250 · verified zero debt.
   The shared move saves 100 into Gauntlet → cash 150, Gauntlet 850, saved 1,100. */

export const CLOCK_ISO = "2026-09-19T12:04:00.000Z";
export const READ_AT_ISO = "2026-09-19T12:03:00.000Z";

const short = (addr) => `${addr.slice(0, 6)}…${addr.slice(-4)}`;
export const ACCOUNT = "0x1111111111111111111111111111111111111111";
export const COUNTERPARTY = "0x2222222222222222222222222222222222222222";
export const OUTGOING = "0x3333333333333333333333333333333333333333";
export const TRANSFER_HASH = `0x${"ab".repeat(32)}`;
export const CONFIRMED_HASH = `0x${"cd".repeat(32)}`;
export { short };

export const REGIONS = {
  US: { locale: "en-US", currency: "USD", label: "United States · USD" },
  ID: { locale: "id-ID", currency: "IDR", label: "Indonesia · IDR", rate: 15850 },
};

export function money(amount, region = "US", opts = {}) {
  const r = REGIONS[region];
  const value = region === "US" ? amount : amount * r.rate;
  const f = new Intl.NumberFormat(r.locale, {
    style: "currency", currency: r.currency,
    minimumFractionDigits: 2, maximumFractionDigits: 2, ...opts,
  });
  return f.format(value);
}
export function signed(amount, region) {
  const s = money(Math.abs(amount), region);
  return amount < 0 ? `−${s}` : amount > 0 ? `+${s}` : s;
}
export function pct(n) { return `${n.toFixed(2)}%`; }

export const VAULTS = [
  { id: "gauntlet",   name: "Gauntlet",   apy: 4.10, balance: 750, curator: "Gauntlet",   address: "0x4aaa000000000000000000000000000000000001" },
  { id: "steakhouse", name: "Steakhouse", apy: 3.85, balance: 250, curator: "Steakhouse", address: "0x4bbb000000000000000000000000000000000002" },
  { id: "re7",        name: "Re7",        apy: 3.62, balance: 0,   curator: "Re7 Labs",   address: "0x4ccc000000000000000000000000000000000003" },
];

export function position(vaults = VAULTS, cash = 250) {
  const saved = vaults.reduce((s, v) => s + v.balance, 0);
  const weighted = saved ? vaults.reduce((s, v) => s + v.apy * v.balance, 0) / saved : 0;
  const funded = vaults.filter((v) => v.balance > 0).length;
  return { cash, saved, weighted, funded, debt: 0, net: cash + saved };
}

export const ACTIVITY = [
  { id: "a1", kind: "received", amount: 250, counterparty: COUNTERPARTY, at: "2026-09-19T11:52:00Z", status: "settled", hash: TRANSFER_HASH },
  { id: "a2", kind: "saved",    amount: 500, vault: "gauntlet",   at: "2026-09-12T09:14:00Z", status: "settled", hash: CONFIRMED_HASH },
  { id: "a3", kind: "saved",    amount: 250, vault: "steakhouse", at: "2026-09-12T09:02:00Z", status: "settled", hash: CONFIRMED_HASH },
  { id: "a4", kind: "saved",    amount: 250, vault: "gauntlet",   at: "2026-09-05T16:40:00Z", status: "settled", hash: CONFIRMED_HASH },
  { id: "a5", kind: "sent",     amount: 40,  counterparty: OUTGOING, at: "2026-09-03T18:21:00Z", status: "settled", hash: TRANSFER_HASH },
];

export const PENDING_DEPOSIT = {
  id: "p1", kind: "saved", amount: 100, vault: "gauntlet",
  at: "2026-09-19T12:03:00Z", status: "pending", hash: CONFIRMED_HASH,
};
export const UNKNOWN_DEPOSIT = { ...PENDING_DEPOSIT, id: "u1", status: "unknown" };

/* Named screen states the lab can switch between. */
export const HOME_STATES = {
  funded:  { label: "Funded",           region: "US", cash: 250, vaults: VAULTS, activity: ACTIVITY },
  pending: { label: "Pending deposit",  region: "US", cash: 250, vaults: VAULTS, activity: [PENDING_DEPOSIT, ...ACTIVITY], pending: PENDING_DEPOSIT },
  unknown: { label: "Unknown outcome",  region: "US", cash: 250, vaults: VAULTS, activity: [UNKNOWN_DEPOSIT, ...ACTIVITY], pending: UNKNOWN_DEPOSIT },
  partial: { label: "Savings unavailable", region: "US", cash: 250, vaults: null, activity: ACTIVITY },
  empty:   { label: "Verified, empty",  region: "US", cash: 0, vaults: VAULTS.map((v) => ({ ...v, balance: 0 })), activity: [] },
  loading: { label: "Loading",          region: "US", loading: true },
  large:   { label: "Large / localized", region: "ID", cash: 250, vaults: VAULTS, activity: ACTIVITY },
};

export function dayLabel(iso, now = CLOCK_ISO) {
  const d = new Date(iso), n = new Date(now);
  const same = (a, b) => a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
  if (same(d, n)) return "Today";
  const y = new Date(n); y.setUTCDate(y.getUTCDate() - 1);
  if (same(d, y)) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
}
export function timeLabel(iso) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}
export function dateTimeLabel(iso) {
  return `${new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}, ${timeLabel(iso)} UTC`;
}
