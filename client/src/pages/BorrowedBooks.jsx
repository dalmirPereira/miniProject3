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
	Button,
	Box,
} from "@mui/material";

// Sample data (replace with API data)
const borrowedData = [
	{
		memberId: 1,
		name: "Alice Johnson",
		books: [
			{
				id: 101,
				title: "1984",
				borrowedDate: "2025-05-20",
				returnDate: "2025-06-10",
			},
			{
				id: 102,
				title: "Brave New World",
				borrowedDate: "2025-05-22",
				returnDate: "2025-06-12",
			},
		],
	},
	{
		memberId: 2,
		name: "Bob Smith",
		books: [
			{
				id: 103,
				title: "The Catcher in the Rye",
				borrowedDate: "2025-05-25",
				returnDate: "2025-06-15",
			},
		],
	},
];

const BorrowedBooksAdmin = () => {
	const handleReturn = (memberId, bookId) => {
		console.log(`Returning book ID ${bookId} for member ID ${memberId}`);
		// Add your backend logic here
	};

	return (
		<Box
			display="flex"
			flexDirection="column"
			gap={3}
			sx={{ backgroundColor: "#f8d8b6", padding: 3, minHeight: "90vh" }}
		>
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
};

export default BorrowedBooksAdmin;
