import React, { useEffect, useState } from "react";
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
	CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function MyBookshelf() {
	const { auth } = useAuth();
	const [borrowedBooks, setBorrowedBooks] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBorrowLogs = async () => {
			try {
				const res = await fetch(
					`http://localhost:3001/booklog/user/${auth.username}`,
					{
						headers: {
							Authorization: `Bearer ${auth.accessToken}`,
						},
					}
				);
				if (!res.ok) {
					const err = await res.json();
					throw new Error(err.message || "Borrowlog went wrong.");
				}
				const data = await res.json();
				setBorrowedBooks(data);
			} catch (error) {
				console.error("Failed to fetch borrow logs:", error);
				setError(error.message);
			}
		};

		if (auth.username) {
			fetchBorrowLogs();
		}
	}, [auth]);

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
					{error && <Alert severity="error">{error}</Alert>}
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
							{borrowedBooks.map((book, index) => (
								<TableRow key={index}>
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
