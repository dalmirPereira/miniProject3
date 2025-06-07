import React, { useState } from "react";
import { Box, Typography, Button, Divider, Stack, Drawer } from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useBooks } from "../contexts/BookContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function BorrowCartDrawer({ open, onClose }) {
	const { cartItems, dispatch } = useCart();
	const { auth } = useAuth();
	const { fetchBooks } = useBooks();

	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	//Remove item from cart
	const handleRemove = (_id) => {
		dispatch({ type: "removeFromCart", _id });
	};

	//Send cart items to API
	const handleConfirm = async () => {
		try {
			const res = await fetch(`http://localhost:3000/user/${auth.userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.accessToken}`,
				},
				body: JSON.stringify({
					bookIds: cartItems,
				}),
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.message || "Failed to borrow");

			setSnackbar({
				open: true,
				message: `Books borrowed successfully!`,
				severity: "success",
			});
			dispatch({ type: "clearCart" });
			fetchBooks();
			onClose();
		} catch (error) {
			console.error("Borrow failed:", error);
			setSnackbar({
				open: true,
				message: `Failed to borrow books: ${error.message}`,
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
			<Drawer anchor="right" open={open} onClose={onClose}>
				<Box sx={{ width: 350, p: 3 }}>
					<Typography variant="h6" gutterBottom>
						Your Borrow Cart
					</Typography>
					<Divider sx={{ mb: 2 }} />

					{cartItems.length === 0 ? (
						<Typography>No books in cart.</Typography>
					) : (
						<Stack spacing={2}>
							{cartItems.map((book) => (
								<Box key={book._id}>
									<Typography variant="subtitle1">Title: {book.title}</Typography>
									<Typography variant="body2" color="text.secondary">
										Author: {book.author}
									</Typography>
									<Button
										color="error"
										size="small"
										onClick={() => handleRemove(book._id)}
										sx={{ mt: 1 }}
									>
										Remove
									</Button>
									<Divider sx={{ my: 1 }} />
								</Box>
							))}

							<Button
								variant="contained"
								fullWidth
								color="primary"
								onClick={handleConfirm}
							>
								Confirm Borrow
							</Button>
						</Stack>
					)}
				</Box>
			</Drawer>
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
