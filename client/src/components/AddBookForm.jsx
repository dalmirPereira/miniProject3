import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Paper,
} from "@mui/material";
import { useBooks } from "../contexts/BookContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const initialBookState = {
	title: "",
	author: "",
	description: "",
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
	const { addBook } = useBooks();
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

	//submir formBook data into BookContext
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newBook = {
			title: formBook.title,
			author: formBook.author,
			description: formBook.description,
			yearPublished: parseInt(formBook.yearPublished),
			pages: parseInt(formBook.pages),
			bookCover: formBook.coverUrl,
		};

		const result = await addBook(newBook);

		if (result.success) {
			setSnackbar({
				open: true,
				message: `Book added successfully!`,
				severity: "success",
			});
			setTimeout(() => {
				navigate("/books");
			}, 2000);
		} else {
			setSnackbar({
				open: true,
				message: `Failed to add book: ${result.message}`,
				severity: "error",
			});
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbar({ ...snackbar, open: false });
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
		<>
			<Container maxWidth="sm">
				<form onSubmit={handleSubmit} noValidate>
					{formField("Title", "title")}
					{formField("Author", "author")}
					{formField("Description", "description", "text", true)}
					{formField("Year Published", "yearPublished", "number")}
					{formField("Pages", "pages", "number")}
					{formField("Cover Image URL", "coverUrl")}

					<Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
						Add Book
					</Button>
				</form>
			</Container>
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
