import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Camera, Settings as SettingsIcon, BellRing, LocateFixed } from "lucide-react";
import BeuiButton from "../components/beui/BeuiButton";
import BeuiBadge from "../components/beui/BeuiBadge";
import { BeuiCard, SafetyIsland, useToasts, ToastViewport, Skeleton } from "../components/beui/beui";
import MapView from "../components/MapView";
import { REPORTS } from "../data/mockData";
import { useGeolocation, COUNTRY_CENTER } from "../services/geo";

const ACTIONS = [
  { to: "/navigate", t: "Navigate", d: "Address search plus real route", icon: Navigation },
  { to: "/report", t: "Report flooding", d: "GPS pin plus photo for the queue", icon: Camera },
  { to: "/settings", t: "Settings", d: "Alerts, account and deletion", icon: SettingsIcon },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { items, push, dismiss } = useToasts();
  const geo = useGeolocation(true);
  const [fitSignal, setFitSignal] = useState(0);
  const [welcomed, setWelcomed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // State-driven notice: reflects the real location state, nothing invented.
  useEffect(() => {
    if (!loading && !welcomed && geo.status !== "locating" && geo.status !== "idle") {
      setWelcomed(true);
      push({
        tone: geo.status === "ok" ? "safe" : "caution",
        text: geo.status === "ok"
          ? "Location locked. Showing a 5 km watch around you."
          : "Location unavailable. Showing Bangladesh; enable location to zoom in.",
      });
      setFitSignal((s) => s + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, geo.status]);

  const located = geo.status === "ok" && geo.pos;
  const center = located ? [geo.pos.lat, geo.pos.lng] : COUNTRY_CENTER;
  const zoom = located ? 12 : 7;

  const markers = [
    ...REPORTS.map((r) => ({ id: r.id, pos: r.coords, tone: r.tone })),
    ...(located ? [{ id: "me", pos: [geo.pos.lat, geo.pos.lng], tone: "user" }] : []),
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <SafetyIsland
            tone={located ? "safe" : "caution"}
            title={located ? "Location locked" : "Showing Bangladesh"}
            sub="Nationwide coverage across 8 divisions"
          />
          <h1 className="mt-3 text-[26px] font-bold tracking-tight sm:text-[30px]">Good evening</h1>
          <p className="text-[14px] text-slate-600">Your position plus community reports across the country, in one place.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <BeuiButton to="/navigate">Find a safe route</BeuiButton>
          <BeuiButton to="/report" variant="ghost">Report flooding</BeuiButton>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_.9fr]">
        <BeuiCard className="overflow-hidden">
          {loading ? (
            <div className="p-4"><Skeleton className="h-[420px] w-full !rounded-2xl" /><div className="mt-3 grid grid-cols-3 gap-3"><Skeleton className="h-12" /><Skeleton className="h-12" /><Skeleton className="h-12" /></div></div>
          ) : (
            <div className="relative h-[420px] sm:h-[480px]">
              <MapView
                center={center}
                zoom={zoom}
                markers={markers}
                radius={located ? { at: [geo.pos.lat, geo.pos.lng], meters: 5000 } : null}
                fitSignal={fitSignal}
                chip={located ? "Your location · 5 km watch" : "Bangladesh · enable location to zoom in"}
              />
              {!located && (
                <button
                  onClick={() => { geo.locate(); setFitSignal((s) => s + 1); }}
                  className="absolute bottom-4 left-1/2 z-[500] inline-flex min-h-[46px] -translate-x-1/2 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl bg-slate-950 px-5 text-[14px] font-bold text-white hover:bg-slate-900"
                >
                  <LocateFixed className="h-4 w-4" aria-hidden="true" />
                  {geo.status === "locating" ? "Locating…" : "Use my location"}
                </button>
              )}
            </div>
          )}
          {geo.error && !located && <p className="border-t border-slate-100 px-4 pt-2 text-[13px] text-slate-500">{geo.error}</p>}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-4 py-3">
            <div className="flex flex-wrap gap-2" aria-label="Map legend">
              <BeuiBadge tone="safe">Safe</BeuiBadge>
              <BeuiBadge tone="danger">Avoid</BeuiBadge>
              <BeuiBadge tone="caution">Caution</BeuiBadge>
            </div>
            <Link to="/navigate" className="inline-flex min-h-[40px] items-center text-[13.5px] font-bold text-teal-800 hover:underline">Open full navigation</Link>
          </div>
        </BeuiCard>

        <div className="space-y-4">
          <BeuiCard className="p-5">
            <h2 className="text-[18px] font-bold">What do you want to do?</h2>
            <div className="mt-3 grid gap-2.5">
              {ACTIONS.map((a) => (
                <Link key={a.to} to={a.to} className="group flex items-center gap-3 rounded-xl border border-slate-200 p-3.5 transition-colors hover:border-teal-700 hover:bg-teal-50/50">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition-colors group-hover:bg-teal-700">
                    <a.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span><span className="block text-[15px] font-bold">{a.t}</span><span className="block text-[13px] text-slate-500">{a.d}</span></span>
                </Link>
              ))}
            </div>
          </BeuiCard>

          <BeuiCard className="p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-[15px] font-bold"><BellRing className="h-4 w-4 text-teal-700" aria-hidden="true" /> Alerts</h3>
              <BeuiBadge tone="safe">On</BeuiBadge>
            </div>
            <p className="text-[13.5px] leading-relaxed text-slate-600">
              Verified reports near you arrive as push alerts. Nothing to review here yet:
              new reports from the queue appear on the map once the verification team approves them.
            </p>
            <Link to="/settings" className="mt-3 inline-flex min-h-[44px] items-center rounded-xl border border-slate-200 px-4 text-[14px] font-semibold hover:bg-slate-50">
              Manage alerts
            </Link>
          </BeuiCard>
        </div>
      </div>

      <BeuiCard className="p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div><h2 className="text-[18px] font-bold">Reports across Bangladesh</h2></div>
          <span className="flex items-center gap-2">
            <BeuiBadge tone="neutral">Sample data</BeuiBadge>
            <Link to="/my-reports" className="text-[13.5px] font-bold text-teal-800 hover:underline">View all reports</Link>
          </span>
        </div>
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 !rounded-2xl" />)}</div>
        ) : (
          <ul className="divide-y divide-slate-100 border-y border-slate-100">
            {REPORTS.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3">
                <span className="font-mono text-[12px] text-slate-500">{r.id}</span>
                <span className="min-w-[180px] flex-1 text-[14.5px] font-bold">{r.place}</span>
                <span className="text-[13px] text-slate-500">{r.depth} · {r.time}</span>
                <BeuiBadge tone={r.tone}>{r.status}</BeuiBadge>
              </li>
            ))}
          </ul>
        )}
      </BeuiCard>
      <ToastViewport items={items} onDismiss={dismiss} />
    </div>
  );
}
