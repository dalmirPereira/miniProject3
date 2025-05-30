import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		const stored = localStorage.getItem("auth");
		return stored ? JSON.parse(stored) : {};
	});

	useEffect(() => {
		if (auth?.accessToken) {
			localStorage.setItem("auth", JSON.stringify(auth));
		} else {
			localStorage.removeItem("auth");
		}
	}, [auth]);

	const logout = () => setAuth({});

	//define roles
	const userRole = auth?.roles?.includes(5150)
		? "admin"
		: auth?.roles?.includes(2001)
		? "member"
		: "guest";

	return (
		<AuthContext.Provider value={{ auth, setAuth, logout, userRole }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
