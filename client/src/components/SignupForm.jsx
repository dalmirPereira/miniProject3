import React, { useReducer, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const formReducer = (state, action) => {
	switch (action.type) {
		case "InputField":
			return { ...state, [action.field]: action.value };
		case "Reset":
			return initialFormState;
		default:
			return state;
	}
};

const initialFormState = {
	username: "",
	firstName: "",
	lastName: "",
	email: "",
	password: "",

	repassword: "",
};

export default function SignupForm() {
	const [formData, dispatch] = useReducer(formReducer, initialFormState);
	const navigate = useNavigate();

	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleChange = (e) => {
		dispatch({
			type: "InputField",
			field: e.target.name,
			value: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const missingFields = Object.entries(formData)
			.filter(([, value]) => !value || value.trim() === "")
			.map(([key]) => key);

		if (missingFields.length > 0) {
			setSnackbar({
				open: true,
				message: `The following fields are required and missing: ${missingFields.join(
					", "
				)}`,
				severity: "error",
			});
			return;
		}

		const { username, firstName, lastName, email, password, repassword } =
			formData;

		if (password !== repassword) {
			setSnackbar({
				open: true,
				message: `Passwords do not match.`,
				severity: "error",
			});
			return;
		}

		//--------------------------------------------- REGISTER API CALL ---------------------------------------------------------------
		try {
			const response = await fetch("http://localhost:3000/register", {
				method: "POST",
				headers: {
					"content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					firstName,
					lastName,
					email,
					password,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Signup failed!");
			}

			setSnackbar({
				open: true,
				message: `Signup successful!`,
				severity: "success",
			});
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error("Signup error", error);
			setSnackbar({
				open: true,
				message: `Signup failed: ${error.message}`,
				severity: "error",
			});
		}
	};
	//---------------------------------------------------------------------------------------------------------------------------

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbar({ ...snackbar, open: false });
	};

	const formField = (label, name, type = "text") => (
		<Box display="flex" alignItems="center" mb={2}>
			<Typography sx={{ width: 120 }}>{label}</Typography>
			<TextField
				fullWidth
				type={type}
				name={name}
				value={formData[name]}
				onChange={handleChange}
				variant="outlined"
				size="small"
				sx={{ backgroundColor: "white" }}
			/>
		</Box>
	);

	return (
		<>
			<Box component="form" onSubmit={handleSubmit} noValidate>
				{formField("Username:", "username")}
				{formField("First Name:", "firstName")}
				{formField("Last Name:", "lastName")}
				{formField("Email:", "email")}
				{formField("Password:", "password", "password")}
				{formField("Retype Password:", "repassword", "password")}

				<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
					Sign Up
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
