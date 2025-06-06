import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Box,
} from "@mui/material";

// Replace with real member data (e.g., from context or API)
const myBorrowedBooks = [
	{
		id: 201,
		title: "The Great Gatsby",
		borrowedDate: "2025-05-18",
		returnDate: "2025-06-08",
	},
	{
		id: 202,
		title: "To Kill a Mockingbird",
		borrowedDate: "2025-05-25",
		returnDate: "2025-06-15",
	},
];

export default function MyBookshelf() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			sx={{ backgroundColor: "#f8d8b6", padding: 3, minHeight: "90vh" }}
		>
			<Card
				elevation={3}
				sx={{ backgroundColor: "#f5ebdd", width: "100%", maxWidth: 800 }}
			>
				<CardContent>
					<Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
						My Bookshelf
					</Typography>
					<Table sx={{ backgroundColor: "white" }}>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
									Title
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
									Borrowed Date
								</TableCell>
								<TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
									Return Date
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{myBorrowedBooks.map((book) => (
								<TableRow key={book.id}>
									<TableCell sx={{ fontSize: "0.9rem" }}>{book.title}</TableCell>
									<TableCell sx={{ fontSize: "0.9rem" }}>{book.borrowedDate}</TableCell>
									<TableCell sx={{ fontSize: "0.9rem" }}>{book.returnDate}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</Box>
	);
}

// import React, { useEffect, useState } from "react";
// import {
// 	Box,
// 	Card,
// 	CardMedia,
// 	CardContent,
// 	Typography,
// 	Grid,
// 	CircularProgress,
// } from "@mui/material";
// import { useAuth } from "../contexts/AuthContext";

// export default function MyBookshelf() {
// 	const { auth } = useAuth();
// 	const [borrowedBooks, setBorrowedBooks] = useState([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		const fetchBorrowedBooks = async () => {
// 			try {
// 				const res = await fetch(`http://localhost:3000/borrow/${auth.username}`, {
// 					headers: {
// 						Authorization: `Bearer ${auth.accessToken}`,
// 					},
// 				});

// 				const data = await res.json();
// 				if (!res.ok)
// 					throw new Error(data.message || "Failed to fetch borrowed books");

// 				setBorrowedBooks(data);
// 			} catch (err) {
// 				console.error("Error fetching borrowed books:", err);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		if (auth?.username) fetchBorrowedBooks();
// 	}, [auth?.username, auth?.accessToken]);

// 	if (loading) {
// 		return (
// 			<Box display="flex" justifyContent="center" mt={5}>
// 				<CircularProgress />
// 			</Box>
// 		);
// 	}

// 	if (!borrowedBooks.length) {
// 		return (
// 			<Box textAlign="center" mt={5}>
// 				<Typography variant="h6">No books borrowed yet.</Typography>
// 			</Box>
// 		);
// 	}

// 	return (
// 		<Box sx={{ p: 3 }}>
// 			<Typography variant="h4" gutterBottom>
// 				My Bookshelf
// 			</Typography>
// 			<Grid container spacing={3}>
// 				{borrowedBooks.map((book) => (
// 					<Grid item xs={12} sm={6} md={4} key={book._id}>
// 						<Card>
// 							<CardMedia
// 								component="img"
// 								height="300"
// 								image={book.bookCover}
// 								alt={book.title}
// 							/>
// 							<CardContent>
// 								<Typography variant="h6">{book.title}</Typography>
// 								<Typography variant="subtitle2" color="text.secondary">
// 									by {book.author}
// 								</Typography>
// 								<Typography variant="body2" sx={{ mt: 1 }}>
// 									<strong>Borrowed:</strong>{" "}
// 									{new Date(book.borrowedDate).toLocaleDateString()}
// 								</Typography>
// 								<Typography variant="body2">
// 									<strong>Return by:</strong>{" "}
// 									{new Date(book.returnDate).toLocaleDateString()}
// 								</Typography>
// 							</CardContent>
// 						</Card>
// 					</Grid>
// 				))}
// 			</Grid>
// 		</Box>
// 	);
// }
