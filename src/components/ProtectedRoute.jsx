import { storage } from "@/utils/storage";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = storage.getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
