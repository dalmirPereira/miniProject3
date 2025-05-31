import React from "react";
import { Box, Typography, Button, Divider, Stack, Drawer } from "@mui/material";
import { useCart } from "../contexts/CartContext";

export default function BorrowCartDrawer({ open, onClose }) {
	const { cartItems, dispatch } = useCart();

	const handleRemove = (isbn) => {
		dispatch({ type: "removeFromCart", isbn });
	};

	const handleConfirm = () => {
		alert("Books borrowed successfully!");
		dispatch({ type: "clearCart" });
		onClose();
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
						{cartItems.map((book, index) => (
							<Box key={index}>
								<Typography variant="subtitle1">{book.title}</Typography>
								<Typography variant="body2" color="text.secondary">
									by {book.author}
								</Typography>
								<Button
									color="error"
									size="small"
									onClick={() => handleRemove(book.ISBN)}
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
