import { useState } from "react";
import { Link } from "react-router-dom";
import BeuiButton from "../components/beui/BeuiButton";
import BeuiBadge from "../components/beui/BeuiBadge";
import { BeuiCard } from "../components/beui/beui";
import { BeuiTabs, BeuiTabsList, BeuiTab } from "../components/beui/BeuiTabs";
import { REPORTS, QUEUE } from "../data/mockData";

export default function MyReports() {
  const [filter, setFilter] = useState("queue");
  const queue = QUEUE.filter((q) =>
    filter === "all" ? true : filter === "queue" ? q.tone === "caution" : q.tone === "safe"
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mt-1 text-[26px] font-bold tracking-tight sm:text-[30px]">Your reports</h1>
          <p className="mt-1 text-[14px] text-slate-600">Submit, queue for review, then see the map update. Rows below are sample data until the API connects.</p>
        </div>
        <BeuiButton to="/report">Report flooding</BeuiButton>
      </div>

      <BeuiCard className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[18px] font-bold">Verification queue</h2>
          <span className="flex items-center gap-2">
            <BeuiBadge tone="neutral">Sample data</BeuiBadge>
            <BeuiTabs value={filter} onValueChange={setFilter}>
              <BeuiTabsList>
                <BeuiTab value="queue">In queue</BeuiTab>
                <BeuiTab value="verified">Verified</BeuiTab>
                <BeuiTab value="all">All</BeuiTab>
              </BeuiTabsList>
            </BeuiTabs>
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          {queue.map((q) => (
            <div key={q.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-4">
              <span className="font-mono text-[13px] text-slate-500">{q.id}</span>
              <div className="min-w-[180px] flex-1"><p className="text-[14.5px] font-bold">{q.place}</p><p className="text-[13px] text-slate-500">{q.reporter}</p></div>
              <BeuiBadge tone={q.tone}>{q.status}</BeuiBadge>
            </div>
          ))}
          {queue.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
              <p className="text-[15px] font-bold text-slate-800">No verified reports yet</p>
              <p className="mx-auto mt-1 max-w-[46ch] text-[14px] text-slate-600">Reports land here once the verification team approves them. File one to start the queue.</p>
              <div className="mt-4 flex justify-center"><BeuiButton to="/report">Report flooding</BeuiButton></div>
            </div>
          )}
        </div>
      </BeuiCard>

      <BeuiCard className="p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <h2 className="text-[18px] font-bold">Past submissions</h2>
            <BeuiBadge tone="neutral">Sample data</BeuiBadge>
          </span>
          <Link to="/navigate" className="text-[13.5px] font-bold text-teal-800 hover:underline">Plan a route</Link>
        </div>
        <div className="overflow-x-auto nice-scroll">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead><tr className="border-b border-slate-200 text-[12px] uppercase tracking-wider text-slate-500"><th className="py-2 pr-4 font-bold">ID</th><th className="py-2 pr-4 font-bold">Place</th><th className="py-2 pr-4 font-bold">Depth</th><th className="py-2 font-bold">Outcome</th></tr></thead>
            <tbody>
              {REPORTS.map((r) => (
                <tr key={r.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-mono text-[13px] text-slate-500">{r.id}</td>
                  <td className="py-3 pr-4 font-semibold">{r.place}</td>
                  <td className="py-3 pr-4 text-slate-600">{r.depth}</td>
                  <td className="py-3"><BeuiBadge tone={r.tone}>{r.status}</BeuiBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BeuiCard>
    </div>
  );
}
