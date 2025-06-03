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

export default function EditBookModal({ book, open, onClose, onSave }) {
	const [formData, setFormData] = useState(book);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		onSave(formData);
		onClose();
	};

	return (
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
						label="ISBN"
						name="ISBN"
						value={formData.ISBN}
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
	);
}
