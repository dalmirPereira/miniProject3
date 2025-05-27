import React from "react";
import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Box,
	Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function BookCard({ book }) {
	const { userRole, isAuthenticated } = useAuth();
	console.log(isAuthenticated);
	console.log("useRole:", userRole);

	const handleClick = (e) => {
		e.preventDefault();
		alert("Login to borrow book");
	};
	return (
		<Card sx={{ width: 250, mb: 3 }}>
			<CardMedia
				component="img"
				height="350"
				image={book.bookCover}
				alt={`${book.title} cover`}
			/>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					{book.title}
				</Typography>
				<Typography variant="subtitle1" color="text.secondary">
					<b>Author:</b> {book.author}
				</Typography>
				<Typography variant="caption" display="block">
					<b>ISBN:</b> {book.ISBN}
				</Typography>
				<Typography variant="caption" display="block">
					<b>Published:</b> {book.yearPublished}
				</Typography>
				<Typography variant="caption" display="block">
					<b>Pages:</b> {book.pages}
				</Typography>
				<Typography variant="body2" sx={{ mt: 1 }}>
					<em>{book.description}</em>
				</Typography>
				{userRole === "admin" && (
					<Box textAlign={"end"} sx={{ mt: 1 }}>
						<Button variant="outlined" sx={{ backgroundColor: "white" }}>
							Edit
						</Button>
						<Button variant="outlined" sx={{ backgroundColor: "white" }}>
							Delete
						</Button>
					</Box>
				)}

				{userRole === "member" && (
					<Box textAlign={"end"}>
						<Button variant="outlined" sx={{ mt: 1, backgroundColor: "white" }}>
							Borrow
						</Button>
					</Box>
				)}

				{userRole === "guest" && (
					<Box textAlign={"end"} sx={{ mt: 1 }}>
						<Button
							variant="outlined"
							sx={{ backgroundColor: "white" }}
							onClick={handleClick}
						>
							Borrow
						</Button>
					</Box>
				)}
			</CardContent>
		</Card>
	);
}
