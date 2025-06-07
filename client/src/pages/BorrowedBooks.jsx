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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function BorrowedBooks() {
	const { auth } = useAuth();
	const [borrowedData, setBorrowedData] = useState([]);
	const [error, setError] = useState(null);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success",
	});

	const fetchAllBorrowLogs = async () => {
		try {
			const res = await fetch("http://localhost:3000/admin/returns", {
				method: "GET",
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

	useEffect(() => {
		if (auth?.accessToken) {
			fetchAllBorrowLogs();
		}
	}, []);

	const handleReturn = async (memberId, bookId) => {
		try {
			const res = await fetch(`http://localhost:3000/admin/returns/${memberId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.accessToken}`,
				},
				body: JSON.stringify({ bookId }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to return book.");

			setSnackbar({
				open: true,
				message: `Book returned successfully!`,
				severity: "success",
			});
			fetchAllBorrowLogs();
		} catch (err) {
			console.error("Return failed:", err);
			setError(err.message);
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<>
			<Box
				display="flex"
				flexDirection="column"
				gap={3}
				sx={{ backgroundColor: "#f8d8b6", padding: 3, minHeight: "90vh" }}
			>
				{error && <Alert severity="error">{error}</Alert>}

				{borrowedData.map((member) => (
					<Card
						key={member.userId}
						elevation={3}
						sx={{ backgroundColor: "#f5ebdd" }}
					>
						<CardContent>
							<Typography variant="h5" gutterBottom>
								{member.username}
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
										<TableRow key={book.bookId}>
											<TableCell>{book.title}</TableCell>
											<TableCell>{book.borrowedDate}</TableCell>
											<TableCell>{book.returnDate}</TableCell>
											<TableCell>
												<Button
													variant="contained"
													color="primary"
													onClick={() => handleReturn(member.userId, book.bookId)}
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
