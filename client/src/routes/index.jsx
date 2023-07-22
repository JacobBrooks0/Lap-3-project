import React from "react";
import { useAuth } from "../contexts";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ redirectTo }) {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}
