import React, { useReducer } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

	const handleChange = (e) => {
		dispatch({
			type: "InputField",
			field: e.target.name,
			value: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const trimmedForm = Object.fromEntries(
			Object.entries(formData).map(([key, value]) => [key, value.trim()])
		);

		const missingFields = Object.entries(trimmedForm)
			.filter(([_, value]) => !value)
			.map(([key]) => key);

		if (missingFields.length > 0) {
			alert(
				`The following fields are required and missing: ${missingFields.join(", ")}`
			);
			return;
		}

		const { username, firstName, lastName, email, password, repassword } =
			formData;

		if (password !== repassword) {
			alert("Passwords do not match.");
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

			alert("Signup successful!");
			navigate("/login");
		} catch (error) {
			console.error("Signup error", error);
			alert("Signup failed: " + error.message);
		}
	};
	//---------------------------------------------------------------------------------------------------------------------------

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
	);
}
