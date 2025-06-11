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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function BookCard({ book }) {
	const { userRole } = useAuth();
	const { dispatch, cartItems } = useCart();
	const { deleteBook, updateBook } = useBooks();
	const [editing, setEditing] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	//when guest without login try to borrow book
	const handleClick = (e) => {
		e.preventDefault();
		setSnackbar({
			open: true,
			message: `Login to borrow book`,
			severity: "error",
		});
	};

	//Put book into cart
	const handleBorrow = () => {
		dispatch({ type: "addToCart", book });
		setSnackbar({
			open: true,
			message: `${book.title} added to your borrow cart.`,
			severity: "success",
		});
	};

	//Delete book
	const handleDelete = () => {
		if (window.confirm(`Delete "${book.title}"?`)) {
			deleteBook(book._id);
			setSnackbar({
				open: true,
				message: `Book deleted successfully.`,
				severity: "success",
			});
		}
	};

	//Edit book - handle logic in BookContext and EditModal will pop up
	const handleEdit = async (updatedBook) => {
		return await updateBook(updatedBook);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<>
			<Card
				sx={{
					width: 250,
					mb: 3,
					position: "relative",
					pb: 6,
					border: "solid",
					borderColor: "#db7c1c",
				}}
			>
				<CardMedia
					component="img"
					height="350"
					image={book.bookCover}
					alt={`${book.title} cover`}
					sx={{
						objectFit: "cover",
						padding: 1,
					}}
				/>
				<CardContent
					sx={{
						height: 200,
						display: "flex",
						flexDirection: "column",
						backgroundColor: "#f5ebdd",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					<Typography variant="h6" gutterBottom>
						{book.title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						<b>Author:</b> {book.author}
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
								sx={{
									position: "absolute",
									bottom: 8,
									left: 8,
									backgroundColor: "white",
								}}
								onClick={() => setEditing(true)}
							>
								Edit
							</Button>
							<Button
								variant="outlined"
								color="error"
								sx={{
									position: "absolute",
									bottom: 8,
									right: 8,
									backgroundColor: "white",
								}}
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
								sx={{
									position: "absolute",
									bottom: 8,
									right: 8,
									backgroundColor: "white",
								}}
								onClick={handleBorrow}
								disabled={
									!book.available || cartItems.find((item) => item._id === book._id)
								}
								color={book.available ? "primary" : "warning"}
							>
								{book.available
									? cartItems.find((item) => item._id === book._id)
										? "On Cart"
										: "Borrow"
									: "Unavailable"}
							</Button>
						</Box>
					)}

					{userRole === "guest" && (
						<Box textAlign={"end"} sx={{ mt: 1 }}>
							<Button
								variant="outlined"
								sx={{
									position: "absolute",
									bottom: 8,
									right: 8,
									backgroundColor: "white",
								}}
								onClick={handleClick}
								disabled={
									!book.available || cartItems.find((item) => item._id === book._id)
								}
								color={book.available ? "primary" : "warning"}
							>
								{book.available
									? cartItems.find((item) => item._id === book._id)
										? "On Cart"
										: "Borrow"
									: "Unavailable"}
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
