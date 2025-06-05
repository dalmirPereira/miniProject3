import React from "react";
import { Box, Typography, Button, Divider, Stack, Drawer } from "@mui/material";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function BorrowCartDrawer({ open, onClose }) {
	const { cartItems, dispatch } = useCart();
	const { auth } = useAuth();

	const handleRemove = (_id) => {
		dispatch({ type: "removeFromCart", _id });
	};

	//Send Borrowed books to API
	const handleConfirm = async () => {
		try {
			const res = await fetch("http://localhost:3000/borrow", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.accessToken}`,
				},
				body: JSON.stringify({
					username: auth.username,
					books: cartItems,
				}),
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.message || "Failed to borrow");

			alert("Books borrowed successfully!");
			dispatch({ type: "clearCart" });
			onClose();
		} catch (error) {
			console.error("Borrow failed:", error);
			alert("Failed to borrow books: " + error.message);
		}
	};

	return (
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
								<Typography variant="subtitle1">{book.title}</Typography>
								<Typography variant="body2" color="text.secondary">
									by {book.author}
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
	);
}
