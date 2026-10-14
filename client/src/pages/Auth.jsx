import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeuiButton from "../components/beui/BeuiButton";
import BeuiBadge from "../components/beui/BeuiBadge";
import { BeuiCard, BeuiInput } from "../components/beui/beui";

function AuthFrame({ title, sub, children, footer }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-[1fr_1.1fr]">
        <div className="relative hidden flex-col justify-between overflow-hidden rounded-2xl bg-slate-950 p-8 text-white md:flex">
          <div className="relative">
            <p className="text-[18px] font-bold tracking-tight">Safeway</p>
            <h2 className="mt-2 text-[28px] font-bold leading-tight tracking-tight">One map. Every safe road. No guesswork.</h2>
            <ul className="mt-4 space-y-2 text-[14px] text-slate-300">
              <li>Roads colored by review status</li>
              <li>Flooding reports with GPS and photo</li>
              <li>Push alerts near verified water</li>
            </ul>
          </div>
          <div className="relative flex gap-2">
            <BeuiBadge tone="safe">Green: clear</BeuiBadge>
            <BeuiBadge tone="caution">Yellow: caution</BeuiBadge>
            <BeuiBadge tone="danger">Red: avoid</BeuiBadge>
          </div>
        </div>
        <BeuiCard className="p-7 sm:p-8">
          <h1 className="text-[24px] font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-[14px] text-slate-600 dark:text-slate-400">{sub}</p>
          <div className="mt-5">{children}</div>
          {footer && <div className="mt-5 border-t border-slate-100 pt-4 text-[14px] text-slate-600 dark:border-white/10 dark:text-slate-400">{footer}</div>}
        </BeuiCard>
      </div>
    </div>
  );
}

export function Login() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <AuthFrame title="Welcome back" sub="Log in to see your safety map and saved routes." footer={<>New here? <Link to="/signup" className="font-bold text-teal-800 underline dark:text-teal-300">Create account</Link></>}>
      <div className="grid gap-3">
        <BeuiButton variant="ghost" loading={loading} onClick={() => { setLoading(true); setTimeout(() => nav("/dashboard"), 700); }} className="w-full">
          {!loading && <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-1 2.7-2.9 3.8l4.4 3.4c2.7-2.5 3.5-6 3.5-9.4Z" /><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-4.4-3.4c-1 .7-2.7 1.2-3.5 1.2-2.7 0-5-1.8-5.8-4.3l-4.6 3.6C3.6 21.9 7.5 24 12 24Z" /><path fill="#FBBC05" d="M6.2 14.6c-.2-.7-.3-1.6-.3-2.6s.1-1.9.3-2.6L1.6 5.8C.6 7.7 0 9.8 0 12s.6 4.3 1.6 6.2l4.6-3.6Z" /><path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.9-3.8C17.9 1.1 15.2 0 12 0 7.5 0 3.6 2.1 1.6 5.8l4.6 3.6c.8-2.5 3.1-4.7 5.8-4.7Z" /></svg>}
          {loading ? "Checking…" : "Continue with Google"}
        </BeuiButton>
        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"><span className="h-px flex-1 bg-slate-200 dark:bg-white/10" /> or with email <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" /></div>
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => nav("/dashboard"), 700); }}>
          <BeuiInput label="Email" type="email" required placeholder="you@example.com" autoComplete="email" />
          <BeuiInput label="Password" type="password" required placeholder="Your password" autoComplete="current-password" />
          <BeuiButton type="submit" loading={loading} className="w-full">{loading ? "Verifying…" : "Log in"}</BeuiButton>
        </form>
      </div>
    </AuthFrame>
  );
}

export function Signup() {
  const nav = useNavigate();
  return (
    <AuthFrame title="Create account" sub="One verification link, then your map." footer={<>Have an account? <Link to="/login" className="font-bold text-teal-800 underline dark:text-teal-300">Log in</Link></>}>
      <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); nav("/verify"); }}>
        <div className="grid gap-4 sm:grid-cols-2">
          <BeuiInput label="Full name" required placeholder="Your full name" autoComplete="name" />
          <BeuiInput label="Phone" placeholder="+880 1XXX-XXXXXX" autoComplete="tel" />
        </div>
        <BeuiInput label="Email" hint="One verification link. No spam." type="email" required placeholder="you@example.com" />
        <BeuiInput label="Password" hint="Minimum 8 characters." type="password" required minLength={8} placeholder="Create a strong password" />
        <BeuiButton type="submit" className="w-full">Create account</BeuiButton>
      </form>
    </AuthFrame>
  );
}

export function Verify() {
  return (
    <AuthFrame title="Check your inbox" sub="A verification link is on its way. Click it, then come back and your map is waiting." footer={<>Wrong address? <Link to="/signup" className="font-bold text-teal-800 underline dark:text-teal-300">Start over</Link></>}>
      <div className="rounded-2xl border border-teal-600/20 bg-teal-50 p-4 text-[14px] text-teal-900 dark:border-teal-400/20 dark:bg-white/5 dark:text-teal-200">
        <p className="font-bold">Skipping the inbox in this prototype</p>
        <p className="mt-1">Email sending connects with the API. Continue to explore the app now:</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <BeuiButton to="/dashboard" className="flex-1">Open dashboard</BeuiButton>
        <BeuiButton to="/login" variant="ghost">Back to login</BeuiButton>
      </div>
    </AuthFrame>
  );
}

function useCooldown(seconds = 60) {
  const [left, setLeft] = useState(0);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return [left, () => setLeft(seconds)];
}

export function AuthError() {
  const [left, restart] = useCooldown(60);
  return (
    <AuthFrame title="Too many attempts" sub="Sign-in is paused to stop abuse. Try again when the timer ends." footer={<Link to="/login" className="font-bold text-teal-800 underline dark:text-teal-300">Back to login</Link>}>
      <div className="rounded-2xl border border-red-300 bg-red-50 p-5 dark:border-red-500/30 dark:bg-red-500/10">
        <BeuiBadge tone="danger">Rate limit exceeded</BeuiBadge>
        <p className="mt-2 text-[14px] font-semibold text-red-800 dark:text-red-300" role="status">
          {left > 0 ? `Retry available in ${left} seconds.` : "Press Retry now below to try again."}
        </p>
      </div>
      <div className="mt-4">
        <BeuiButton variant="ghost" className="w-full" disabled={left > 0} onClick={restart}>
          {left > 0 ? `Wait ${left}s` : "Retry now"}
        </BeuiButton>
      </div>
    </AuthFrame>
  );
}
