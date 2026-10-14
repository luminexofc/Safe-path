import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function Guard({ children }) {
  const nav = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("sp_console")) nav("/login", { replace: true });
  }, [nav]);
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Guard><AdminDashboard /></Guard>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
