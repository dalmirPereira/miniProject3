import React from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	CircularProgress,
} from "@mui/material";
import BookCard from "../components/BookCard";
import { useBooks } from "../contexts/BookContext";

export default function BooksPage() {
	const { books, loading } = useBooks();

	// useEffect(() => {
	// 	// When books array is updated (not empty or fetched), stop loading
	// 	if (books.length > 0) {
	// 		setLoading(false);
	// 		//console.log("setLoading")
	// 	}
	// }, [books]);

	return (
		<Box sx={{ backgroundColor: "#f8d8b6", minHeight: "100vh" }}>
			<Container sx={{ py: 5 }}>
				<Typography variant="h4" gutterBottom align="center">
					Book List
				</Typography>

				{loading ? (
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "50vh",
						}}
					>
						<CircularProgress />
					</Box>
				) : books.length === 0 ? (
					<Typography align="center">No books found.</Typography>
				) : (
					<Grid container spacing={3}>
						{books.map((book) => (
							<BookCard key={book._id} book={book} />
						))}
					</Grid>
				)}
			</Container>
		</Box>
	);
}
