import React from "react";
import { Container, Typography, Box, Grid } from "@mui/material";
import BookCard from "../components/BookCard";
import { useBooks } from "../contexts/BookContext";

export default function BooksPage() {
	const { books } = useBooks();

	return (
		<Box sx={{ backgroundColor: "#f8d8b6", minHeight: "100vh" }}>
			<Container sx={{ py: 5 }}>
				<Typography variant="h4" gutterBottom align="center">
					Book List
				</Typography>
				<Grid container spacing={3}>
					{books.map((book) => (
						// <Grid item xs={12} sm={6} md={4} key={book.id}>
						<BookCard key={book.id} book={book} />
						// </Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
}
