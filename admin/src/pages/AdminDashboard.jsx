import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut, Check, X, Inbox } from "lucide-react";
import { cn } from "../lib/cn";
import ThemeToggle from "../components/ThemeToggle";

const MAIN_SITE = import.meta.env.VITE_MAIN_SITE_URL || "http://localhost:5173";
const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

// Sample queue so operators can try the review flow before the API connects.
// Labeled as sample in the UI; replaced by GET /v1/reports?status=pending.
const SEED = [
  { id: "R-1043", place: "Sample report: Dhaka Division", meta: "GPS plus photo, knee-deep water", status: "Pending" },
  { id: "R-1039", place: "Sample report: Zindabazar, Sylhet", meta: "Two photos, ankle-deep water", status: "Pending" },
  { id: "R-1041", place: "Sample report: GEC Circle, Chattogram", meta: "GPS plus photo", status: "Pending" },
  { id: "R-1036", place: "Sample report: KDA Avenue, Khulna", meta: "GPS plus photo, waist-deep water", status: "Pending" },
  { id: "R-1031", place: "Sample report: reused stock photo", meta: "System flag: image hash already seen", status: "Flagged as Abuse" },
];

const toneBadge = (s) =>
  s === "Verified"
    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
    : s === "Discarded" || s === "Flagged as Abuse"
      ? "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
      : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [items, setItems] = useState(SEED);
  const pending = items.filter((i) => i.status === "Pending").length;

  const decide = (id, status) =>
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  const logout = () => {
    sessionStorage.removeItem("sp_console");
    nav("/login");
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-teal-300 dark:bg-white/10">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[16px] font-bold leading-tight">SafePath Console</p>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">Verification for Bangladesh</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a href={MAIN_SITE} className="hidden min-h-[44px] items-center rounded-xl border border-slate-200 px-4 text-[14px] font-semibold hover:bg-slate-50 sm:inline-flex dark:border-white/15 dark:hover:bg-white/5">
              View main app
            </a>
            <ThemeToggle />
            <button onClick={logout} className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-4 text-[14px] font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
              <LogOut className="h-4 w-4" aria-hidden="true" /> Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6 sm:px-6">
        <div>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight">Review queue ({pending} pending)</h1>
          <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-400">Decisions update the public map and send push alerts. API: <span className="font-mono text-[12px]">{API}</span></p>
        </div>

        <dl className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3 dark:border-white/10 dark:bg-slate-900">
          {[
            ["Reports today", "Connects to the API"],
            ["Median verify time", "Connects to the API"],
            ["Backup status", "Connects to the API"],
          ].map(([t, s]) => (
            <div key={t} className="border-l-2 border-slate-200 pl-3 dark:border-white/10">
              <dt className="text-[12px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{t}</dt>
              <dd className="mt-0.5 text-[24px] font-bold text-slate-300 dark:text-slate-600" aria-label={`${t}: no data yet`}>–</dd>
              <dd className="text-[13px] text-slate-500 dark:text-slate-400">{s}</dd>
            </div>
          ))}
        </dl>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[18px] font-bold">Reports from all divisions</h2>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[12px] font-bold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">Sample data</span>
          </div>
          <div className="mt-3 space-y-3">
            {items.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-4 dark:border-white/10">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[11px] font-bold text-slate-500 dark:bg-white/5 dark:text-slate-400">PHOTO</div>
                <div className="min-w-[200px] flex-1">
                  <p className="text-[15px] font-bold">{r.place} <span className="font-mono text-[12px] font-normal text-slate-500 dark:text-slate-400">{r.id}</span></p>
                  <p className="text-[13px] text-slate-500 dark:text-slate-400">{r.meta}</p>
                </div>
                <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-bold", toneBadge(r.status))}>{r.status}</span>
                {r.status === "Pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => decide(r.id, "Verified")} className="pressable inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-700 px-4 text-[14px] font-bold text-white hover:bg-emerald-800">
                      <Check className="h-4 w-4" aria-hidden="true" /> Verify
                    </button>
                    <button onClick={() => decide(r.id, "Discarded")} className="pressable inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-xl border border-red-200 px-4 text-[14px] font-bold text-red-700 hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10">
                      <X className="h-4 w-4" aria-hidden="true" /> Discard
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-900">
          <h3 className="flex items-center gap-2 text-[15px] font-bold"><Inbox className="h-4 w-4 text-slate-400 dark:text-slate-500" aria-hidden="true" /> Operations log</h3>
          <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-400">No log stream yet. Connect <span className="font-mono text-[12px]">VITE_API_URL</span> and recent verify, backup, and push events appear here.</p>
        </div>
      </main>
    </div>
  );
}
