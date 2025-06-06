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
	Button,
	Box,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function BorrowedBooks() {
	const { auth } = useAuth();
	const [borrowedData, setBorrowedData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAllBorrowLogs = async () => {
			try {
				const res = await fetch("http://localhost:3001/booklog/all", {
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});

				const data = await res.json();
				if (!res.ok) throw new Error(data.message || "Failed to fetch Book Log");
				setBorrowedData(data);
			} catch (err) {
				console.error("Fetch error:", err);
				setError(err.message);
			}
		};

		if (auth?.accessToken) {
			fetchAllBorrowLogs();
		}
	}, [auth]);

	const handleReturn = async (memberId, bookId) => {
		try {
			const res = await fetch("http://localhost:3001/booklog/return", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.accessToken}`,
				},
				body: JSON.stringify({ userId: memberId, bookId }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to return book.");

			alert("Book returned successfully!");

			// Refresh borrow logs
			setBorrowedData((prev) =>
				prev
					.map((member) =>
						member.memberId === memberId
							? {
									...member,
									books: member.books.filter((book) => book.id !== bookId),
							  }
							: member
					)
					.filter((member) => member.books.length > 0)
			);
		} catch (err) {
			console.error("Return failed:", err);
			setError(err.message);
		}
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			gap={3}
			sx={{ backgroundColor: "#f8d8b6", padding: 3, minHeight: "90vh" }}
		>
			{error && <Alert severity="error">{error}</Alert>}

			{borrowedData.map((member) => (
				<Card
					key={member.memberId}
					elevation={3}
					sx={{ backgroundColor: "#f5ebdd" }}
				>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							{member.name}
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
									<TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
										Action
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{member.books.map((book) => (
									<TableRow key={book.id}>
										<TableCell>{book.title}</TableCell>
										<TableCell>{book.borrowedDate}</TableCell>
										<TableCell>{book.returnDate}</TableCell>
										<TableCell>
											<Button
												variant="contained"
												color="primary"
												onClick={() => handleReturn(member.memberId, book.id)}
											>
												Return
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			))}
		</Box>
	);
}
