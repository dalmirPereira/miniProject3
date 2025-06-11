import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		identifier: "",
		password: "",
	});

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	//Send login username and password to login - AuthContext
	const handleSubmit = async (e) => {
		e.preventDefault();

		const result = await login(credentials);

		if (result.success) {
			setSnackbar({
				open: true,
				message: `Welcome ${result.user.username}`,
				severity: "success",
			});
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} else {
			setSnackbar({
				open: true,
				message: "Login failed: " + result.message,
				severity: "error",
			});
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} noValidate>
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
			<Snackbar
				open={snackbar.open}
				autoHideDuration={4000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbar.severity}
					sx={{ width: "100%" }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
}
