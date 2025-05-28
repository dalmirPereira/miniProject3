import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MemberRoute({ children }) {
	const { isAuthenticated, userRole } = useAuth();
	if (!isAuthenticated || userRole !== "member") {
		return <Navigate to="/login" replace />;
	}
	return children;
}
