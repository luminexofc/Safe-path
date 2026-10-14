import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Home, Route as RouteIcon, TriangleAlert, ListChecks, Settings as SettingsIcon, Search, Bell, PanelLeftClose, Command, User } from "lucide-react";
import { cn } from "../lib/cn";
import { SPRING_LAYOUT } from "../lib/ease";
import BeuiBadge from "./beui/BeuiBadge";
import ThemeToggle from "./ThemeToggle";
import { CommandPalette } from "./beui/beui";
import { LEGEND } from "../data/mockData";

const NAV = [
  { to: "/dashboard", label: "Home Map", short: "Home", icon: Home },
  { to: "/navigate", label: "Find Route", short: "Routes", icon: RouteIcon },
  { to: "/report", label: "Report", short: "Report", icon: TriangleAlert },
  { to: "/my-reports", label: "My Reports", short: "Mine", icon: ListChecks },
  { to: "/profile", label: "Profile", short: "Profile", icon: User, mobile: false },
  { to: "/settings", label: "Settings", short: "Settings", icon: SettingsIcon },
];

const MOBILE_NAV = NAV.filter((n) => n.mobile !== false);

function LegendBar() {
  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label="Route safety legend">
      {LEGEND.map((l) => (
        <span key={l.label} title={l.desc}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
          {l.label}
        </span>
      ))}
    </div>
  );
}

function Logo() {
  return (
    <Link to="/dashboard" className="cursor-pointer text-[18px] font-bold tracking-tight text-slate-900 dark:text-white" aria-label="Safeway home">
      Safeway
    </Link>
  );
}

export default function AppShell({ children }) {
  const loc = useLocation();
  const [palette, setPalette] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((v) => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isLanding = loc.pathname === "/";
  const isAuth = ["/login", "/signup", "/verify", "/auth-error"].includes(loc.pathname);

  if (isLanding) return <>{children}</>;

  if (isAuth) {
    return (
      <div className="min-h-screen bg-[#eef2f5] dark:bg-slate-950">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
            <Logo />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link to="/dashboard" className="inline-flex min-h-[44px] cursor-pointer items-center rounded-xl bg-slate-900 px-4 text-[14px] font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">Open the safety map</Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      {/* Top bar */}
      <header className="sticky top-0 z-[600] border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900">
        <div className="mx-auto flex h-[68px] w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6">
          <Logo />
          <button onClick={() => setPalette(true)}
            className="ml-2 hidden max-w-md flex-1 cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-[14px] text-slate-500 transition-colors hover:border-teal-500 hover:bg-white md:flex dark:border-white/15 dark:bg-white/5 dark:text-slate-400 dark:hover:border-teal-400 dark:hover:bg-white/10">
            <Search className="h-4 w-4" />
            <span className="flex-1 truncate">Where to? Try a city, road, or landmark…</span>
            <kbd className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"><Command className="h-3 w-3" />K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden 2xl:block"><LegendBar /></div>
            <button onClick={() => setPalette(true)} className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 md:hidden dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
            <Link to="/my-reports" className="relative inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/10" aria-label="Alerts">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-600 dark:border-slate-900" />
            </Link>
            <Link to="/profile" className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-slate-900 py-1.5 pl-1.5 pr-3 text-[14px] font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200" aria-label="Profile">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white"><User className="h-4 w-4" /></span>
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-slate-100 bg-white px-4 py-2 dark:border-white/10 dark:bg-slate-900 2xl:hidden">
          <div className="mx-auto max-w-[1400px]"><LegendBar /></div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] gap-5 px-4 py-5 sm:px-6">
        {/* Sidebar in the beui animated-sidebar language: morphing width, layoutId active pill */}
        <aside className={cn("sticky top-36 hidden h-fit shrink-0 lg:block transition-[width] duration-200 ease-out", collapsed ? "w-[76px]" : "w-60")} aria-label="App navigation">
          <motion.nav layout={!reduce} className="rounded-2xl border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-slate-900">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="relative block">
                {({ isActive }) => (
                  <span className={cn("relative flex min-h-[50px] cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3.5 text-[14.5px] font-semibold",
                    isActive ? "text-white dark:text-slate-950" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white")}>
                    {isActive && (
                      <motion.span layoutId="nav-active-pill" transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                        className="absolute inset-0 rounded-xl bg-slate-900 dark:bg-white" />
                    )}
                    <n.icon className="relative z-10 h-5 w-5 shrink-0" />
                    {!collapsed && <span className="relative z-10 truncate">{n.label}</span>}
                    {!collapsed && n.to === "/my-reports" && (
                      <span className="relative z-10 ml-auto"><BeuiBadge tone="caution">2</BeuiBadge></span>
                    )}
                  </span>
                )}
              </NavLink>
            ))}
            <div className="mx-2 my-2 border-t border-slate-100 dark:border-white/10" />
            <button onClick={() => setCollapsed((v) => !v)} className="mt-1 flex min-h-[40px] w-full cursor-pointer items-center gap-2 rounded-xl px-3.5 text-[12.5px] font-bold text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5" aria-label="Collapse sidebar">
              <PanelLeftClose className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />{!collapsed && "Collapse"}
            </button>
          </motion.nav>
          {!collapsed && (
            <div className="mt-3 rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-[12px] font-bold uppercase tracking-widest text-teal-300">Safety scoring</p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-200">Clear ×1 is green. Unverified ×1.5 and reported ×5 are yellow. Waterlogged ×∞ is red, and the route moves around it.</p>
              <Link to="/navigate" className="mt-2 inline-block text-[13px] font-bold text-white underline">Find a safe route</Link>
            </div>
          )}
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {/* Mobile bottom nav with active pill */}
      <nav className="fixed inset-x-3 bottom-3 z-[600] lg:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-xl grid-cols-5 gap-1 rounded-2xl border border-white/10 bg-slate-950 p-1.5">
          {MOBILE_NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className="relative">
              {({ isActive }) => (
                <span className={cn("relative flex min-h-[60px] cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl text-[10px] font-bold leading-tight",
                  isActive ? "text-white" : "text-slate-400")}>
                  {isActive && (
                    <motion.span layoutId="mobile-nav-pill" transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                      className="absolute inset-0 rounded-xl bg-white/12" />
                  )}
                  <n.icon className="relative z-10 h-5 w-5" />
                  <span className="relative z-10">{n.short}</span>
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </div>
  );
}
