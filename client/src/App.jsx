import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import AppShell from "./components/AppShell";
import Landing from "./pages/Landing";
import { Login, Signup, Verify, AuthError } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NavigatePage from "./pages/Navigate";
import Report from "./pages/Report";
import MyReports from "./pages/MyReports";
import Settings from "./pages/Settings";

function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-[32px] font-bold">Page not found</h1>
      <p className="mt-2 text-slate-600">That road is not on the map. Head back to safety:</p>
      <Link to="/dashboard" className="mt-5 inline-flex min-h-[44px] items-center rounded-xl bg-brand-700 px-5 font-bold text-white">Back to dashboard</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell><Landing /></AppShell>} />
        <Route path="/login" element={<AppShell><Login /></AppShell>} />
        <Route path="/signup" element={<AppShell><Signup /></AppShell>} />
        <Route path="/verify" element={<AppShell><Verify /></AppShell>} />
        <Route path="/auth-error" element={<AppShell><AuthError /></AppShell>} />
        <Route path="/dashboard" element={<AppShell><Dashboard /></AppShell>} />
        <Route path="/navigate" element={<AppShell><NavigatePage /></AppShell>} />
        <Route path="/report" element={<AppShell><Report /></AppShell>} />
        <Route path="/my-reports" element={<AppShell><MyReports /></AppShell>} />
        <Route path="/settings" element={<AppShell><Settings /></AppShell>} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<AppShell><NotFound /></AppShell>} />
      </Routes>
    </BrowserRouter>
  );
}
