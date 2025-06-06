import React, { useState, useMemo } from "react";
import {
	Container,
	Typography,
	Box,
	Grid,
	CircularProgress,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookCard from "../components/BookCard";
import { useBooks } from "../contexts/BookContext";

export default function BooksPage() {
	const { books, loading } = useBooks();
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOption, setSortOption] = useState("");

	// Filter and sort books based on search and sortOption
	const filteredBooks = useMemo(() => {
		let result = books;

		if (searchTerm) {
			result = result.filter(
				(book) =>
					book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					book.author.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (sortOption === "title") {
			result = [...result].sort((a, b) => a.title.localeCompare(b.title));
		} else if (sortOption === "year") {
			result = [...result].sort((a, b) => b.yearPublished - a.yearPublished);
		}

		return result;
	}, [books, searchTerm, sortOption]);

	return (
		<Box sx={{ backgroundColor: "#f8d8b6", minHeight: "100vh" }}>
			<Container sx={{ py: 5 }}>
				<Typography variant="h4" gutterBottom align="center">
					Book List
				</Typography>

				{/* Search and Sort */}
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						justifyContent: "space-between",
						alignItems: "center",
						mb: 3,
						gap: 2,
					}}
				>
					<TextField
						variant="outlined"
						placeholder="Search by title or author"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						sx={{ width: { xs: "100%", sm: "60%" } }}
					/>

					<FormControl sx={{ width: { xs: "100%", sm: "35%" } }}>
						<InputLabel>Sort By</InputLabel>
						<Select
							value={sortOption}
							label="Sort By"
							onChange={(e) => setSortOption(e.target.value)}
						>
							<MenuItem value="">None</MenuItem>
							<MenuItem value="title">Title (A-Z)</MenuItem>
							<MenuItem value="year">Year Published (Newest)</MenuItem>
						</Select>
					</FormControl>
				</Box>

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
				) : filteredBooks.length === 0 ? (
					<Typography align="center">No books found.</Typography>
				) : (
					<Grid container spacing={3}>
						{filteredBooks.map((book) => (
							<BookCard key={book._id} book={book} />
						))}
					</Grid>
				)}
			</Container>
		</Box>
	);
}
