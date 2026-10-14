import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LocateFixed, TriangleAlert } from "lucide-react";
import BeuiButton from "../components/beui/BeuiButton";
import BeuiBadge from "../components/beui/BeuiBadge";
import { BeuiCard, BeuiInput } from "../components/beui/beui";
import { BeuiTabs, BeuiTabsList, BeuiTab } from "../components/beui/BeuiTabs";
import MapView from "../components/MapView";
import { geocode, fetchRoutes, useGeolocation, emptyPointMessage } from "../services/geo";

function useDebounced(value, ms = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export default function Navigate() {
  const [from, setFrom] = useState("Your current location");
  const [to, setTo] = useState("");
  const [fromCoord, setFromCoord] = useState(null);
  const [toCoord, setToCoord] = useState(null);
  const [suggestFor, setSuggestFor] = useState(null); // 'from' | 'to' | null
  const [suggestions, setSuggestions] = useState([]);
  const [suggesting, setSuggesting] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [routes, setRoutes] = useState([]); // live OSRM routes
  const [selected, setSelected] = useState("live-0");
  const [fitSignal, setFitSignal] = useState(0);
  const [tab, setTab] = useState("fastest");
  const reduce = useReducedMotion();
  const geo = useGeolocation(false);
  const boxRef = useRef(null);

  const debouncedTo = useDebounced(suggestFor === "to" ? to : "");
  const debouncedFrom = useDebounced(suggestFor === "from" ? from : "");

  // Close suggestions on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setSuggestFor(null);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Live address suggestions (Bangladesh-biased, OpenStreetMap)
  useEffect(() => {
    const q = suggestFor === "to" ? debouncedTo : suggestFor === "from" ? debouncedFrom : "";
    if (!suggestFor || !q.trim() || q === "Your current location") {
      setSuggestions([]);
      return;
    }
    let alive = true;
    setSuggesting(true);
    geocode(q)
      .then((r) => { if (alive) setSuggestions(r); })
      .catch(() => { if (alive) setSuggestions([]); })
      .finally(() => { if (alive) setSuggesting(false); });
    return () => { alive = false; };
  }, [debouncedTo, debouncedFrom, suggestFor]);

  // Adopt browser position as the origin when it arrives
  useEffect(() => {
    if (geo.pos && !fromCoord) {
      setFromCoord(geo.pos);
      setFrom("Your current location");
    }
  }, [geo.pos, fromCoord]);

  const pickSuggestion = (which, s) => {
    if (which === "to") {
      setTo(s.label);
      setToCoord({ lat: s.lat, lng: s.lng });
    } else {
      setFrom(s.label);
      setFromCoord({ lat: s.lat, lng: s.lng });
    }
    setSuggestFor(null);
    setSuggestions([]);
  };

  const useMyLocation = () => {
    geo.locate();
    setFrom("Your current location");
    setFromCoord(null); // resolved from geo.pos by the effect above
  };

  const resolvePoint = async (text, coord, field) => {
    if (coord) return coord;
    const t = text.trim();
    if (!t || (field === "starting point" && t === "Your current location")) {
      if (field === "starting point" && geo.pos) return geo.pos;
      throw new Error(emptyPointMessage(field));
    }
    const r = await geocode(t, 1);
    if (!r.length) throw new Error(`Could not find "${t}". Try a nearby landmark.`);
    return { lat: r[0].lat, lng: r[0].lng };
  };

  const check = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const f = await resolvePoint(from, fromCoord, "starting point");
      const t = await resolvePoint(to, toCoord, "destination");
      setFromCoord(f);
      setToCoord(t);
      const live = await fetchRoutes(f, t);
      setRoutes(live);
      setSelected(live[0].id);
      setFitSignal((s) => s + 1);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
      setRoutes([]);
    } finally {
      setChecking(false);
    }
  };

  const ordered = [...routes].sort((a, b) =>
    tab === "shortest" ? a.distanceKm - b.distanceKm : a.timeMin - b.timeMin
  );
  const active = ordered.find((r) => r.id === selected) || ordered[0] || null;

  const lines = ordered.map((r) => ({
    id: r.id,
    positions: r.coords,
    color: r.id === active?.id ? "#0f766e" : "#94a3b8",
    weight: r.id === active?.id ? 7 : 5,
  }));
  const markers = [];
  if (fromCoord || geo.pos) {
    const p = fromCoord || geo.pos;
    markers.push({ id: "origin", pos: [p.lat, p.lng], tone: "user" });
  }
  if (toCoord) markers.push({ id: "dest", pos: [toCoord.lat, toCoord.lng], tone: "info" });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight sm:text-[30px]">Find a safe route</h1>
          <p className="mt-1 text-[14px] text-slate-600">Address search with road geometry drawn per search. Safety colors arrive with the API connection.</p>
        </div>
        <BeuiTabs value={tab} onValueChange={setTab}>
          <BeuiTabsList>
            <BeuiTab value="fastest">Fastest</BeuiTab>
            <BeuiTab value="shortest">Shortest</BeuiTab>
          </BeuiTabsList>
        </BeuiTabs>
      </div>

      <BeuiCard className="p-5">
        <form onSubmit={check} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]" ref={boxRef}>
          <div className="relative">
            <BeuiInput
              label="From" value={from}
              onChange={(e) => { setFrom(e.target.value); setFromCoord(null); setSuggestFor("from"); }}
              onFocus={() => setSuggestFor("from")}
              placeholder="Your address or current location"
            />
            <div className="mt-1.5">
              <button type="button" onClick={useMyLocation} className="inline-flex min-h-[36px] cursor-pointer items-center gap-1.5 rounded-xl px-2 text-[13px] font-bold text-teal-800 hover:bg-teal-50">
                <LocateFixed className="h-4 w-4" />
                {geo.status === "locating" ? "Locating…" : "Use my location"}
              </button>
            </div>
            {suggestFor === "from" && (suggestions.length > 0 || suggesting) && (
              <SuggestionList items={suggestions} loading={suggesting} onPick={(s) => pickSuggestion("from", s)} />
            )}
          </div>
          <div className="relative">
            <BeuiInput
              label="Destination" value={to}
              onChange={(e) => { setTo(e.target.value); setToCoord(null); setSuggestFor("to"); }}
              onFocus={() => setSuggestFor("to")}
              placeholder="Anywhere in Bangladesh"
            />
            {suggestFor === "to" && (suggestions.length > 0 || suggesting) && (
              <SuggestionList items={suggestions} loading={suggesting} onPick={(s) => pickSuggestion("to", s)} />
            )}
          </div>
          <div className="flex items-end"><BeuiButton type="submit" loading={checking} className="w-full md:w-auto">{checking ? "Finding route…" : "Find route"}</BeuiButton></div>
        </form>
        {geo.error && !fromCoord && (
          <p className="mt-2 text-[13px] text-slate-500">{geo.error}</p>
        )}
        {error && (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4" role="alert">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <p className="text-[14px] font-semibold text-red-800">{error}</p>
          </div>
        )}
        {checking && (
          <motion.div initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-2xl bg-slate-950 p-4 text-white" role="status">
            <div className="flex items-center gap-3 text-[14px] font-semibold">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-teal-300 border-t-transparent" />
              Geocoding addresses & fetching the road network…
            </div>
          </motion.div>
        )}
      </BeuiCard>

      {active && !checking && (
        <div className="grid gap-4 xl:grid-cols-[1.45fr_.95fr]">
          <BeuiCard className="overflow-hidden">
            <div className="h-[420px] sm:h-[520px]">
              <MapView
                markers={markers}
                lines={lines}
                fitSignal={fitSignal}
                chip={to ? `Route to ${to.slice(0, 42)}` : "Your route"}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 p-4">
              <BeuiBadge tone="caution">Safety check pending</BeuiBadge>
              <span className="text-[13px] text-slate-500">Road geometry is fetched per search. Waterlogging scoring lights up once <span className="font-mono">POST /v1/map/route</span> is connected.</span>
            </div>
          </BeuiCard>

          <div className="space-y-3">
            <p className="text-[13px] font-semibold text-slate-500">{ordered.length} route{ordered.length > 1 ? "s" : ""} found on the road network</p>
            {ordered.map((r) => {
              const isSel = r.id === active.id;
              return (
                <motion.button key={r.id} onClick={() => setSelected(r.id)} aria-pressed={isSel}
                  whileTap={reduce ? undefined : { scale: 0.985 }}
                  className={`w-full cursor-pointer rounded-2xl border-2 p-4 text-left transition-colors ${isSel ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white hover:border-slate-400"}`}>
                  <div className="flex items-center justify-between gap-2">
                    <BeuiBadge tone={isSel ? "info" : "neutral"}>{isSel ? "Selected" : "Alternative"}</BeuiBadge>
                    <span className="text-[13px] font-bold text-slate-700">{r.timeMin} min · {r.distanceKm.toFixed(1)} km</span>
                  </div>
                  <p className="mt-2 text-[16px] font-bold tracking-tight">
                    {r.id === ordered[0].id ? "Recommended route" : "Alternate route"}
                  </p>
                  <p className="text-[13.5px] text-slate-600">Driving geometry for the addresses above. Safety check pending API connection. Tap to preview.</p>
                </motion.button>
              );
            })}
            <BeuiCard className="bg-slate-950 !border-slate-800 p-4 text-white">
              <p className="text-[13.5px] font-bold text-teal-300">How safety scoring will attach</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-300">Each segment gets a safety multiplier (clear, unverified, reported, waterlogged) and the cheapest safe path wins. The green, yellow, and red overlay draws on this exact geometry once connected.</p>
            </BeuiCard>
          </div>
        </div>
      )}

      {!active && !checking && !error && (
        <BeuiCard className="p-6 text-center">
          <p className="text-[15px] font-bold">Type a destination to see its route on the map</p>
          <p className="mx-auto mt-1 max-w-[52ch] text-[14px] text-slate-500">Addresses are geocoded across Bangladesh. Your origin can be your current GPS position.</p>
        </BeuiCard>
      )}
    </div>
  );
}

function SuggestionList({ items, loading, onPick }) {
  return (
    <div className="absolute inset-x-0 top-full z-[700] mt-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-pop" role="listbox" aria-label="Address suggestions">
      {loading && items.length === 0 && <p className="px-4 py-3 text-[13.5px] text-slate-500">Searching addresses…</p>}
      {items.map((s, i) => (
        <button key={`${s.lat}-${s.lng}-${i}`} type="button" role="option" aria-selected="false"
          onClick={() => onPick(s)}
          className="block w-full cursor-pointer px-4 py-2.5 text-left text-[13.5px] hover:bg-slate-50">
          <span className="font-semibold text-slate-800">{s.label}</span>
        </button>
      ))}
    </div>
  );
}
