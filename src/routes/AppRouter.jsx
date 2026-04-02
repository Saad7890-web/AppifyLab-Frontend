import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import FeedPage from "@/features/feed/pages/FeedPage";
import { Navigate, Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/feed" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/feed" element={<FeedPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
