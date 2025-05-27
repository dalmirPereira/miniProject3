import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
	const [credentials, setCredentials] = useState({
		identifier: "",
		password: "",
	});
	const { login } = useAuth();
	const navigate = useNavigate();
	console.log(login);
	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleLogin = (e) => {
		e.preventDefault();
		const { identifier, password } = credentials;

		if (identifier === "admin" && password === "Password1") {
			login("admin");
			alert("Login successful as Admin!");
			navigate("/");
		} else if (identifier === "member" && password === "Password1") {
			login("member");
			alert("Login successful as Member!");
			navigate("/");
		} else {
			alert("Invalid credentials");
		}
	};

	return (
		<Box component="form" onSubmit={handleLogin} noValidate>
			<TextField
				label="Email or Username"
				name="identifier"
				value={credentials.identifier}
				onChange={handleChange}
				fullWidth
				required
				margin="normal"
				sx={{ backgroundColor: "white" }}
			/>
			<TextField
				label="Password"
				name="password"
				type="password"
				value={credentials.password}
				onChange={handleChange}
				fullWidth
				required
				margin="normal"
				sx={{ backgroundColor: "white" }}
			/>
			<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
				Log In
			</Button>
		</Box>
	);
};

export default LoginForm;
