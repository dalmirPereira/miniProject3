import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute() {
	const { auth, userRole } = useAuth();
	if (!auth?.accessToken) {
		// User is not logged in
		return <Navigate to="/login" replace />;
	}

	if (userRole !== "admin") {
		// User is logged in, but not admin
		return <Navigate to="/unauthorized" replace />;
	}

	// User is logged in and is an admin
	return <Outlet />;
}
