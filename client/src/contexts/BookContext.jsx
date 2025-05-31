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

	const deleteBook = (id) => {
		setBooks((prev) => prev.filter((book) => book.id !== id));
	};

	const updateBook = (updatedBook) => {
		setBooks((prev) =>
			prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
		);
	};

	return (
		<BookContext.Provider value={{ books, setBooks, deleteBook, updateBook }}>
			{children}
		</BookContext.Provider>
	);
};
