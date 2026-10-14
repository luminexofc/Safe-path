import { Link } from "react-router-dom";
import { MapPin, ShieldCheck, Navigation, BellRing, Camera } from "lucide-react";
import BeuiButton from "../components/beui/BeuiButton";
import BeuiBadge from "../components/beui/BeuiBadge";
import { BeuiCard, SafetyIsland } from "../components/beui/beui";
import MapView from "../components/MapView";
import { ROUTE_OPTIONS, AVOIDED_SEGMENT, COVERAGE_DIVISIONS } from "../data/mockData";

const STEPS = [
  { icon: Navigation, n: "1", t: "Search a destination", d: "Type any address in Bangladesh. The road network draws on the map, with distance and drive time.", to: "/navigate", cta: "Find a route", featured: true },
  { icon: Camera, n: "2", t: "Report flooding", d: "Drop a GPS pin, add a photo and the water depth. It joins the verification queue.", to: "/report", cta: "Report flooding" },
  { icon: ShieldCheck, n: "3", t: "Ride on verified colors", d: "Reviewed roads turn green, yellow, or red on everyone's map, with a push alert.", to: "/my-reports", cta: "Track verification" },
];

function SafetyRule({ className = "" }) {
  return (
    <div className={`flex h-1.5 w-40 overflow-hidden rounded-full ${className}`} aria-hidden="true">
      <span className="flex-1 bg-emerald-500" />
      <span className="flex-1 bg-amber-500" />
      <span className="flex-1 bg-red-500" />
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="text-[18px] font-bold tracking-tight" aria-label="SafePath home">SafePath</Link>
          <nav className="flex items-center gap-2" aria-label="Primary">
            <Link to="/dashboard" className="hidden min-h-[44px] items-center rounded-xl px-4 text-[14px] font-semibold text-slate-300 hover:bg-white/10 hover:text-white sm:inline-flex">Safety map</Link>
            <Link to="/login" className="inline-flex min-h-[44px] items-center rounded-xl border border-white/15 px-4 text-[14px] font-semibold hover:bg-white/10">Log in</Link>
            <Link to="/dashboard" className="inline-flex min-h-[44px] items-center rounded-xl bg-teal-400 px-4 text-[14px] font-bold text-slate-950 hover:bg-teal-300">Open the safety map</Link>
          </nav>
        </div>
      </header>

      <section className="hero-mesh relative overflow-hidden">
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:pt-16">
          <div className="flex flex-col justify-center">
            <SafetyIsland tone="safe" title="Safety colors, verified by people" sub="Coverage across Bangladesh" />
            <h1 className="mt-5 text-[38px] font-bold leading-[1.04] tracking-tight sm:text-[60px]">
              Know which road is actually dry before you leave.
            </h1>
            <SafetyRule className="mt-5" />
            <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-slate-300">
              SafePath scores every road segment (clear, unverified, reported, waterlogged)
              and reroutes you around flooded streets on a color-coded map.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BeuiButton to="/dashboard" variant="primary" className="!bg-teal-400 !text-slate-950 hover:!bg-teal-300">Open the safety map</BeuiButton>
              <BeuiButton to="/navigate" variant="outlineLight">Find a safe route</BeuiButton>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5">
              {[
                ["Coverage", "8 divisions of Bangladesh"],
                ["Reports", "GPS pin plus photo"],
                ["Alerts", "Push on verification"],
              ].map(([term, def]) => (
                <div key={term}>
                  <dt className="text-[12px] font-bold uppercase tracking-widest text-slate-400">{term}</dt>
                  <dd className="mt-0.5 text-[15px] font-semibold text-white">{def}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <span className="text-[13px] font-bold text-slate-700">Safety map preview</span>
              <BeuiBadge tone="neutral">Sample</BeuiBadge>
            </div>
            <div className="h-[380px] sm:h-[440px]">
              <MapView
                lines={[
                  { id: "safe-a", positions: ROUTE_OPTIONS[0].path, color: "#15803d", weight: 7 },
                  { id: "alt-b", positions: ROUTE_OPTIONS[1].path, color: "#ca8a04", weight: 6 },
                  { id: "avoided", positions: AVOIDED_SEGMENT, color: "#dc2626", weight: 6, dashed: true },
                ]}
                height="100%"
                chip="Sample preview. Your area draws from your location in the app."
              />
            </div>
            <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3">
              <BeuiBadge tone="safe">Green: verified clear</BeuiBadge>
              <BeuiBadge tone="danger">Red: avoid</BeuiBadge>
              <BeuiBadge tone="caution">Yellow: caution</BeuiBadge>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef2f5] text-slate-900">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-[28px] font-bold tracking-tight sm:text-[36px]">Three moves. Nothing hidden.</h2>
          <p className="mt-1 max-w-[70ch] text-[15px] text-slate-600">Every action lives in the sidebar, the bottom tab bar, and the ⌘K palette. No hunting through menus.</p>
          <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Coverage across Bangladesh">
            <span className="text-[12.5px] font-bold uppercase tracking-widest text-slate-500">Covering</span>
            {COVERAGE_DIVISIONS.map((d) => (
              <span key={d} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[13px] font-semibold text-slate-700">{d}</span>
            ))}
          </div>

          <ol className="mt-6 space-y-3">
            {STEPS.map((s) => (
              <li key={s.n}>
                <BeuiCard className={s.featured ? "p-6 sm:p-7" : "p-5 sm:px-6"}>
                  <Link to={s.to} className="flex items-start gap-4">
                    <span className="text-[28px] font-bold leading-none text-slate-300" aria-hidden="true">{s.n}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-[18px] font-bold tracking-tight">
                        <s.icon className="h-5 w-5 text-teal-700" aria-hidden="true" /> {s.t}
                      </span>
                      <span className="mt-1 block max-w-[72ch] text-[14px] leading-relaxed text-slate-600">{s.d}</span>
                      {s.featured && (
                        <span className="mt-3 flex flex-wrap gap-2">
                          <BeuiBadge tone="safe">Green: verified clear</BeuiBadge>
                          <BeuiBadge tone="caution">Yellow: unverified or reported</BeuiBadge>
                          <BeuiBadge tone="danger">Red: verified waterlogged</BeuiBadge>
                        </span>
                      )}
                    </span>
                    <span className="hidden shrink-0 items-center rounded-xl bg-slate-900 px-4 py-2.5 text-[14px] font-semibold text-white sm:inline-flex">{s.cta}</span>
                  </Link>
                </BeuiCard>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr]">
            <BeuiCard className="overflow-hidden">
              <div className="bg-slate-950 px-6 py-5 text-white">
                <p className="text-[12px] font-bold uppercase tracking-widest text-teal-300">How the colors are decided</p>
                <p className="mt-1 text-[14px] text-slate-200">Each road segment gets a safety multiplier, then the cheapest safe path wins.</p>
              </div>
              <ul className="divide-y divide-slate-100">
                {[
                  ["#15803d", "Green means go", "Verified clear roads, full weight."],
                  ["#ca8a04", "Yellow means slow down", "Unverified or reported stretches cost extra."],
                  ["#dc2626", "Red means reroute", "Verified waterlogging is excluded from routing."],
                ].map(([c, t, d]) => (
                  <li key={t} className="flex items-start gap-3 p-5">
                    <span className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full" style={{ background: c }} aria-hidden="true" />
                    <span><span className="block text-[15px] font-bold">{t}</span>
                    <span className="block text-[13.5px] text-slate-600">{d}</span></span>
                  </li>
                ))}
              </ul>
            </BeuiCard>
            <BeuiCard className="flex flex-col justify-between bg-slate-950 !border-slate-800 p-7 text-white">
              <div>
                <BellRing className="h-8 w-8 text-teal-300" aria-hidden="true" />
                <h3 className="mt-3 text-[24px] font-bold tracking-tight">Get pushed before you enter a flooded road.</h3>
                <p className="mt-2 text-[14.5px] text-slate-300">Turn on alerts for your area. Verified reports arrive as push notifications once the API is connected.</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <BeuiButton to="/signup" variant="primary" className="!bg-teal-400 !text-slate-950 hover:!bg-teal-300">Create free account</BeuiButton>
                <BeuiButton to="/login" variant="outlineLight">Log in</BeuiButton>
              </div>
            </BeuiCard>
          </div>

          <footer className="flex flex-col gap-2 pb-4 pt-10 text-[13px] text-slate-500 sm:flex-row sm:justify-between">
            <p className="flex items-center gap-2 text-slate-700"><MapPin className="h-4 w-4" aria-hidden="true" /> SafePath · Safety routing for Bangladesh</p>
            <p className="flex gap-4"><Link className="hover:underline" to="/my-reports">My reports</Link><Link className="hover:underline" to="/settings">Settings</Link></p>
          </footer>
        </div>
      </section>
    </div>
  );
}
