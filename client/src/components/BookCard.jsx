import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Box,
	Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useBooks } from "../contexts/BookContext";
import EditBookModal from "./EditBookModal";

export default function BookCard({ book }) {
	const { userRole } = useAuth();
	const { dispatch } = useCart();
	// console.log("useRole:", userRole);
	const { deleteBook, updateBook } = useBooks();
	const [editing, setEditing] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		alert("Login to borrow book");
	};

	const handleBorrow = () => {
		dispatch({ type: "addToCartT", book });
		alert(`"${book.title}" added to your borrow cart.`);
	};

	//update book
	const handleDelete = () => {
		if (window.confirm(`Delete "${book.title}"?`)) {
			deleteBook(book.id);
			alert("Book deleted successfully.");
		}
	};

	const handleEdit = (updatedBook) => {
		updateBook(updatedBook);
	};

	return (
		<>
			<Card sx={{ width: 250, mb: 3 }}>
				<CardMedia
					component="img"
					height="350"
					image={book.bookCover}
					alt={`${book.title} cover`}
				/>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						{book.title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						<b>Author:</b> {book.author}
					</Typography>
					<Typography variant="caption" display="block">
						<b>ISBN:</b> {book.ISBN}
					</Typography>
					<Typography variant="caption" display="block">
						<b>Published:</b> {book.yearPublished}
					</Typography>
					<Typography variant="caption" display="block">
						<b>Pages:</b> {book.pages}
					</Typography>
					<Typography variant="body2" sx={{ mt: 1 }}>
						<em>{book.description}</em>
					</Typography>
					{userRole === "admin" && (
						<Box textAlign={"end"} sx={{ mt: 1 }}>
							<Button
								variant="outlined"
								sx={{ backgroundColor: "white", mr: 1 }}
								onClick={() => setEditing(true)}
							>
								Edit
							</Button>
							<Button
								variant="outlined"
								color="error"
								sx={{ backgroundColor: "white" }}
								onClick={handleDelete}
							>
								Delete
							</Button>
						</Box>
					)}

					{userRole === "member" && (
						<Box textAlign={"end"}>
							<Button
								variant="outlined"
								sx={{ mt: 1, backgroundColor: "white" }}
								onClick={handleBorrow}
							>
								Borrow
							</Button>
						</Box>
					)}

					{userRole === "guest" && (
						<Box textAlign={"end"} sx={{ mt: 1 }}>
							<Button
								variant="outlined"
								sx={{ backgroundColor: "white" }}
								onClick={handleClick}
							>
								Borrow
							</Button>
						</Box>
					)}
				</CardContent>
			</Card>
			{editing && (
				<EditBookModal
					open={editing}
					book={book}
					onClose={() => setEditing(false)}
					onSave={handleEdit}
				/>
			)}
		</>
	);
}
