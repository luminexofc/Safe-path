import { useState } from "react";
import BeuiButton from "../components/beui/BeuiButton";
import BeuiBadge from "../components/beui/BeuiBadge";
import { BeuiCard, BeuiInput } from "../components/beui/beui";

export default function Settings() {
  const [push, setPush] = useState(true);
  const [radius, setRadius] = useState(5);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [savedTick, setSavedTick] = useState(0);

  const save = (e) => {
    e.preventDefault();
    setSavedTick((t) => t + 1);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="mt-1 text-[26px] font-bold tracking-tight sm:text-[30px]">Settings</h1>
        <p className="mt-1 text-[14px] text-slate-600">Profile, push alerts, and account deletion.</p>
      </div>

      <BeuiCard className="p-6">
        <h2 className="text-[16px] font-bold">Profile</h2>
        <form onSubmit={save}>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <BeuiInput label="Display name" placeholder="Your name" />
            <BeuiInput label="Email" placeholder="you@example.com" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <BeuiButton type="submit">Save changes</BeuiButton>
            {savedTick > 0 && (
              <BeuiBadge key={savedTick} tone="safe">Saved</BeuiBadge>
            )}
          </div>
        </form>
      </BeuiCard>

      <BeuiCard className="p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[16px] font-bold">Notifications</h2>
          <BeuiBadge tone={push ? "safe" : "neutral"}>{push ? "Push on" : "Push off"}</BeuiBadge>
        </div>
        <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
          <div><p className="text-[14.5px] font-bold">Push alerts</p><p className="text-[13px] text-slate-500">A notice before a newly verified waterlogged road.</p></div>
          <button role="switch" aria-checked={push} onClick={() => setPush(!push)} className={`relative h-8 w-14 shrink-0 cursor-pointer rounded-full transition-colors ${push ? "bg-teal-700" : "bg-slate-300"}`}>
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${push ? "left-7" : "left-1"}`} />
          </button>
        </div>
        <div className="mt-3">
          <span className="mb-1.5 block text-[14px] font-semibold">Alert radius: {radius} km</span>
          <input type="range" min={1} max={10} value={radius} onChange={(e) => setRadius(e.target.value)} className="w-full accent-teal-700" aria-label="Alert radius in kilometers" />
        </div>
      </BeuiCard>

      <BeuiCard className="!border-red-200 p-6">
        <h2 className="text-[16px] font-bold text-red-700">Danger zone: delete account</h2>
        <p className="mt-1 text-[14px] text-slate-600">Deletes your profile. Your reports stay on the map without your name.</p>
        {deleted ? (
          <div className="mt-3 rounded-2xl bg-slate-50 p-4" role="status">
            <p className="text-[14px] font-bold text-slate-800">Deletion is disabled in this prototype</p>
            <p className="mt-1 text-[13.5px] text-slate-600">Nothing was deleted. Account deletion ships with the API connection.</p>
            <button onClick={() => { setDeleted(false); setConfirmDelete(false); }} className="mt-2 cursor-pointer text-[13px] font-bold text-teal-800 underline">Back to settings</button>
          </div>
        ) : !confirmDelete ? (
          <div className="mt-3"><BeuiButton variant="danger" onClick={() => setConfirmDelete(true)}>Delete my account</BeuiButton></div>
        ) : (
          <div className="mt-3 rounded-2xl bg-red-50 p-4">
            <p className="text-[14px] font-bold text-red-800">Type DELETE to confirm</p>
            <div className="mt-2 flex gap-2"><BeuiInput placeholder="DELETE" /><BeuiButton variant="danger" onClick={() => setDeleted(true)}>Confirm</BeuiButton></div>
            <button onClick={() => setConfirmDelete(false)} className="mt-2 cursor-pointer text-[13px] font-bold underline">Cancel</button>
          </div>
        )}
      </BeuiCard>
    </div>
  );
}
