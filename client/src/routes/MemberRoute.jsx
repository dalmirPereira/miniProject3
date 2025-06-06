import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MemberRoute() {
	const { auth, userRole } = useAuth();

	if (!auth?.accessToken) {
		return <Navigate to="/login" replace />;
	}

	if (userRole !== "member") {
		return <Navigate to="/unauthorized" replace />;
	}

	return <Outlet />;
}
