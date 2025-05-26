import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ children, allowedRoles }) {
	const { isAuthenticated, userRole } = useAuth();

	if (!isAuthenticated || !allowedRoles.includes(userRole)) {
		return <Navigate to="/login" replace />;
	}

	return children;
}
