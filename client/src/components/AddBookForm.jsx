import React, { useReducer } from "react";
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Paper,
} from "@mui/material";

const initialBookState = {
	title: "",
	author: "",
	description: "",
	isbn: "",
	yearPublished: "",
	pages: "",
	coverUrl: "",
};

const formReducer = (state, action) => {
	switch (action.type) {
		case "InputField":
			return { ...state, [action.field]: action.value };
		case "Reset":
			return initialBookState;
		default:
			return state;
	}
};

export default function AddBookForm() {
	const [formBook, dispatch] = useReducer(formReducer, initialBookState);

	const handleChange = (e) => {
		dispatch({
			type: "InputField",
			field: e.target.name,
			value: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you can send formBook to backend
		console.log("Book added:", formBook);
		alert("Book added successfully!");
		dispatch({ type: "Reset" });
	};

	const formField = (label, name, type = "text", multiline = false) => (
		<Box mb={2}>
			<Typography sx={{ mb: 0.5 }}>{label}</Typography>
			<TextField
				fullWidth
				type={type}
				name={name}
				value={formBook[name]}
				onChange={handleChange}
				variant="outlined"
				size="small"
				multiline={multiline}
				rows={multiline ? 4 : 1}
				sx={{ backgroundColor: "white" }}
			/>
		</Box>
	);

	return (
		<Container maxWidth="sm">
			<form onSubmit={handleSubmit} noValidate>
				{formField("Title", "title")}
				{formField("Author", "author")}
				{formField("Description", "description", "text", true)}
				{formField("ISBN", "isbn")}
				{formField("Year Published", "yearPublished", "number")}
				{formField("Pages", "pages", "number")}
				{formField("Cover Image URL", "coverUrl")}

				<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
					Add Book
				</Button>
			</form>
		</Container>
	);
}
