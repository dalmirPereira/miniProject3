import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	//authentification state/context that cares: username, roles, accesstoken
	const [auth, setAuth] = useState({});
	
	// const [userRole, setUserRole] = useState(() => {
	// 	return localStorage.getItem("userRole") || "guest";
	// });

	// useEffect(() => {
	// 	localStorage.setItem("userRole", userRole);
	// });

	// const login = (role = "member") => setUserRole(role);

	// const logout = () => {
	// 	localStorage.removeItem("userRole");
	// 	setUserRole("guest");
	// };

	// const isAuthenticated = userRole !== "guest";

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
