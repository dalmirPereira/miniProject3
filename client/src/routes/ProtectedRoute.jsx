import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute() {
	const { auth } = useAuth();
	return auth?.accessToken ? <Outlet /> : <Navigate to="/login" replace />;
}
