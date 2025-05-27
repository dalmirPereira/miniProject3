import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userRole, setUserRole] = useState(() => {
		return localStorage.getItem("userRole") || "guest";
	});

	useEffect(() => {
		localStorage.setItem("userRole", userRole);
	});

	const login = (role = "member") => setUserRole(role);

	const logout = () => {
		localStorage.removeItem("userRole");
		setUserRole("guest");
	};

	const isAuthenticated = userRole !== "guest";

	return (
		<AuthContext.Provider value={{ userRole, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
