import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Grid,
	CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function MyBookshelf() {
	const { auth } = useAuth();
	const [borrowedBooks, setBorrowedBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBorrowedBooks = async () => {
			try {
				const res = await fetch(`http://localhost:3000/borrow/${auth.username}`, {
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});

				const data = await res.json();
				if (!res.ok)
					throw new Error(data.message || "Failed to fetch borrowed books");

				setBorrowedBooks(data);
			} catch (err) {
				console.error("Error fetching borrowed books:", err);
			} finally {
				setLoading(false);
			}
		};

		if (auth?.username) fetchBorrowedBooks();
	}, [auth?.username, auth?.accessToken]);

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" mt={5}>
				<CircularProgress />
			</Box>
		);
	}

	if (!borrowedBooks.length) {
		return (
			<Box textAlign="center" mt={5}>
				<Typography variant="h6">No books borrowed yet.</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				My Bookshelf
			</Typography>
			<Grid container spacing={3}>
				{borrowedBooks.map((book) => (
					<Grid item xs={12} sm={6} md={4} key={book._id}>
						<Card>
							<CardMedia
								component="img"
								height="300"
								image={book.bookCover}
								alt={book.title}
							/>
							<CardContent>
								<Typography variant="h6">{book.title}</Typography>
								<Typography variant="subtitle2" color="text.secondary">
									by {book.author}
								</Typography>
								<Typography variant="body2" sx={{ mt: 1 }}>
									<strong>Borrowed:</strong>{" "}
									{new Date(book.borrowedDate).toLocaleDateString()}
								</Typography>
								<Typography variant="body2">
									<strong>Return by:</strong>{" "}
									{new Date(book.returnDate).toLocaleDateString()}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
