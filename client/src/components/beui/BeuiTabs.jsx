// beui-adapted Tabs: pill/segment with spring layoutId indicator.
// Design language from @beui/tabs (layoutId glide, TABS_GLIDE, reduced-motion safe).
import { createContext, useContext, useId, useState, useCallback } from "react";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { cn } from "../../lib/cn";
import { TABS_GLIDE } from "../../lib/ease";

const Ctx = createContext(null);
const useTabs = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("BeuiTabs.* must be inside <BeuiTabs>");
  return c;
};

export function BeuiTabs({ defaultValue, value, onValueChange, children, className = "" }) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const layoutId = useId();
  const reduce = useReducedMotion();
  const controlled = value !== undefined;
  const current = controlled ? value : internal;
  const setValue = useCallback((v) => { if (!controlled) setInternal(v); onValueChange?.(v); }, [controlled, onValueChange]);
  return (
    <MotionConfig transition={reduce ? { duration: 0 } : TABS_GLIDE}>
      <Ctx.Provider value={{ value: current, setValue, layoutId }}>
        <motion.div layoutRoot className={className}>{children}</motion.div>
      </Ctx.Provider>
    </MotionConfig>
  );
}

export function BeuiTabsList({ children, className = "" }) {
  return (
    <div role="tablist" className={cn("inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100/80 p-1", className)}>
      {children}
    </div>
  );
}

export function BeuiTab({ value, children, className = "" }) {
  const { value: cur, setValue, layoutId } = useTabs();
  const active = cur === value;
  const reduce = useReducedMotion();
  return (
    <button role="tab" aria-selected={active} onClick={() => setValue(value)}
      className={cn("relative min-h-[40px] cursor-pointer rounded-full px-4 text-[14px] font-semibold outline-none transition-colors",
        active ? "text-slate-900" : "text-slate-500 hover:text-slate-800", className)}>
      {active && (
        <motion.span layoutId={layoutId} transition={reduce ? { duration: 0 } : TABS_GLIDE}
          className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(15,23,42,.12)]" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
