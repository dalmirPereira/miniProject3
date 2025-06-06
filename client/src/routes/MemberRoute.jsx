import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MemberRoute() {
	const { auth, userRole } = useAuth();
	return auth?.accessToken && userRole === "member" ? (
		<Outlet />
	) : (
		<Navigate to="/unauthorized" replace />
	);
}
