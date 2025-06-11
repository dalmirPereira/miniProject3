import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Stack,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function EditBookModal({ book, open, onClose, onSave }) {
	const [formData, setFormData] = useState(book);

	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	//update edited book
	const handleSubmit = async () => {
		const result = await onSave(formData);

		if (result?.success) {
			setSnackbar({
				open: true,
				message: `Book updated successfully!`,
				severity: "success",
			});
			setTimeout(() => {
				onClose();
			}, 2000);
			onClose();
		} else {
			setSnackbar({
				open: true,
				message: `Failed to update book: ${result.message}`,
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
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Edit Book</DialogTitle>
				<DialogContent>
					<Stack spacing={2} sx={{ mt: 1 }}>
						<TextField
							label="Title"
							name="title"
							value={formData.title}
							onChange={handleChange}
						/>
						<TextField
							label="Author"
							name="author"
							value={formData.author}
							onChange={handleChange}
						/>
						<TextField
							label="Year Published"
							name="yearPublished"
							value={formData.yearPublished}
							onChange={handleChange}
						/>
						<TextField
							label="Pages"
							name="pages"
							value={formData.pages}
							onChange={handleChange}
						/>
						<TextField
							label="Description"
							name="description"
							multiline
							value={formData.description}
							onChange={handleChange}
						/>
						<TextField
							label="Book Cover URL"
							name="bookCover"
							value={formData.bookCover}
							onChange={handleChange}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={handleSubmit} variant="contained">
						Save
					</Button>
				</DialogActions>
			</Dialog>
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
