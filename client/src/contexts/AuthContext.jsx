import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const initialAuthState = {
	username: null,
	roles: [],
	accessToken: null,
};

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(() => {
		const stored = localStorage.getItem("auth");
		return stored ? JSON.parse(stored) : initialAuthState;
	});

	useEffect(() => {
		if (auth?.accessToken) {
			//console.log("auth", auth);
			localStorage.setItem("auth", JSON.stringify(auth));
		} else {
			localStorage.removeItem("auth");
			//console.log("auth2", auth);
		}
	}, [auth]);

	const login = async ({ identifier, password }) => {
		try {
			const response = await fetch("http://localhost:3000/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ identifier, password }),
			});

			const data = await response.json();

			if (!response.ok) throw new Error(data.message || "Login failed");
			
			const decoded = jwtDecode(data.accessToken);
			const username = decoded.UserInfo.username;
			const roles = decoded.UserInfo.roles;

			const user = {
				username,
				roles,
				accessToken: data.accessToken,
			};
			
			setAuth(user);
			return { success: true, user };

		} catch (error) {
			console.error("Login error:", error);
			return { success: false, message: error.message };
		}
	};

	const logout = () => {
		if (auth?.username) {
			localStorage.removeItem(`cart_${auth.username}`);
		}
		setAuth(null);
	};

	//define roles
	const userRole = auth?.roles?.includes(5150)
		? "admin"
		: auth?.roles?.includes(2001)
		? "member"
		: "guest";

	return (
		<AuthContext.Provider value={{ auth, login, logout, userRole }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
