import React, { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
	const [books, setBooks] = useState([
		{
			id: 1,
			title: "The Great Gatsby",
			author: "F. Scott Fitzgerald",
			pages: 180,
			description: "A novel set in the Roaring Twenties...",
			ISBN: "9780743273565",
			yearPublished: 1925,
			bookCover: "https://m.media-amazon.com/images/I/71ZjK3BqlBL.jpg",
		},
		{
			id: 2,
			title: "To Kill a Mockingbird",
			author: "Harper Lee",
			pages: 281,
			description: "A story of racial injustice in the Deep South...",
			ISBN: "9780061120084",
			yearPublished: 1960,
			bookCover:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS68RY84hFCFEv79YFlT9_dhetWuxhIO9Un6w&s",
		},
	]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);

	const deleteBook = (id) => {
		setBooks((prev) => prev.filter((book) => book.id !== id));
	};

	const updateBook = (updatedBook) => {
		setBooks((prev) =>
			prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
		);
	};

	// useEffect(() => {
	// 	const fetchBooks = async () => {
	// 		try {
	// 			const res = await fetch("http://localhost:3000/api/books");
	// 			if (!res.ok) throw new Error("Failed to fetch books");

	// 			const data = await res.json();
	// 			setBooks(data);
	// 		} catch (err) {
	// 			console.error("Error fetching books:", err);
	// 			setError(err.message);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchBooks();
	// }, []);

	// const deleteBook = async (id) => {
	// 	try {
	// 		const res = await fetch(`http://localhost:3000/api/books/${id}`, {
	// 			method: "DELETE",
	// 		});
	// 		if (!res.ok) throw new Error("Delete failed");

	// 		setBooks((prev) => prev.filter((book) => book.id !== id));
	// 	} catch (err) {
	// 		console.error("Delete error:", err);
	// 		alert("Failed to delete book.");
	// 	}
	// };

	// const updateBook = async (updatedBook) => {
	// 	try {
	// 		const res = await fetch(
	// 			`http://localhost:3000/api/books/${updatedBook.id}`,
	// 			{
	// 				method: "PUT",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(updatedBook),
	// 			}
	// 		);
	// 		if (!res.ok) throw new Error("Update failed");

	// 		const newBook = await res.json();
	// 		setBooks((prev) =>
	// 			prev.map((book) => (book.id === newBook.id ? newBook : book))
	// 		);
	// 	} catch (err) {
	// 		console.error("Update error:", err);
	// 		alert("Failed to update book.");
	// 	}
	// };

	return (
		<BookContext.Provider value={{ books, setBooks, deleteBook, updateBook }}>
			{children}
		</BookContext.Provider>
	);
};
