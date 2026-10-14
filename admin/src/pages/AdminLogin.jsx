import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const MAIN_SITE = import.meta.env.VITE_MAIN_SITE_URL || "http://localhost:5173";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Enter your operator email.");
      return;
    }
    // UI prototype: real console exchanges credentials for a role=operator
    // JWT at POST ${API} /v1/auth/login (see README + .env.example).
    sessionStorage.setItem("sp_console", "operator");
    nav("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#eef2f5] px-4 py-12 dark:bg-slate-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="bg-slate-950 px-6 py-5 text-white dark:border-b dark:border-white/10">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-teal-300">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Restricted · Verification console
          </p>
          <h1 className="mt-1 text-[22px] font-bold tracking-tight">Safeway Console</h1>
          <p className="mt-1 text-[13px] text-slate-400">
            Separate operator site for Bangladesh-wide report verification. Connected to the same API as the main app.
          </p>
        </div>
        <form className="space-y-4 p-6" onSubmit={submit}>
          <label className="block">
            <span className="mb-1.5 block text-[13.5px] font-semibold text-slate-800 dark:text-slate-100">Operator email</span>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@example.org" autoComplete="username"
              className="min-h-[48px] w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-slate-900 outline-none placeholder:text-slate-500 focus:border-teal-600 dark:border-white/15 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-teal-400"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[13.5px] font-semibold text-slate-800 dark:text-slate-100">Password</span>
            <input
              type="password" required placeholder="••••••••" autoComplete="current-password"
              className="min-h-[48px] w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-slate-900 outline-none placeholder:text-slate-500 focus:border-teal-600 dark:border-white/15 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-teal-400"
            />
          </label>
          {error && <p className="text-[13px] font-semibold text-red-600 dark:text-red-400">{error}</p>}
          <button type="submit" className="min-h-[48px] w-full cursor-pointer rounded-xl bg-slate-900 text-[15px] font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            Log in to console
          </button>
          <p className="text-center text-[13px] text-slate-500 dark:text-slate-400">
            Public user? <a className="font-bold text-teal-800 underline dark:text-teal-300" href={MAIN_SITE}>Open the Safeway app</a>
          </p>
        </form>
      </div>
    </div>
  );
}
