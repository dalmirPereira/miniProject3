import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {

	const { auth } = useAuth();
	//console.log("top auth", auth)

	const [books, setBooks] = useState([]);
	//console.log("books from context", books);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState(null);

	//GET the updated list of books from the DB
	const fetchBooks = async () => {
		try {
			const res = await fetch(
				`http://localhost:3000/admin`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${auth.accessToken}`
					}
				}
			);

			if (!res.ok) throw new Error("Failed to fetch books");

			const data = await res.json();
			
			setBooks(data);

		} catch (err) {
			console.error("Error fetching books:", err);
			return { success: false, message: err.message };
		} 
		// } finally {
		// 	setLoading(false);
		// }
	};

	//When we first load the page it get the data from the DB.
	useEffect(() => {
		if(auth.accessToken) {
			fetchBooks()
		}
	}, []);

	//API call POST method - AddBookForm.jsx
	const addBook = async (newBook) => {
		try {
			const res = await fetch(
				`http://localhost:3000/admin`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${auth.accessToken}`
					},
					body: JSON.stringify(newBook),
				}
			);

			const data = await res.json();

			if (!res.ok) throw new Error(data.message || "Login failed");

			//update state with book list
			fetchBooks();

			return { success: true };

		} catch (err) {
			console.error("New Book Error:", err);
			return { success: false, message: err.message };
		}
	};

	//API call PUT method - EditBookModal.jsx
	const updateBook = async (updatedBook) => {
		try {
			const res = await fetch(
				`http://localhost:3000/admin/${updatedBook._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${auth.accessToken}`
					},
					body: JSON.stringify(updatedBook)
				}
			);
			
			const data = await res.json();

			if (!res.ok) throw new Error(data.message || "Update failed");

			//update state with book list
			fetchBooks();

			return { success: true };

		} catch (err) {
			console.error("Update error:", err);
			return { success: false, message: err.message || "Update failed" };
		}
	};

	//API call DELETE method - BookCard.jsx
	const deleteBook = async (id) => {
		try {
			const res = await fetch(
				`http://localhost:3000/admin/${id}`, 
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${auth.accessToken}`
					}
				});
			
			if (!res.ok) throw new Error(data.message || "Delete failed");

			//update state with book list
			fetchBooks();

			return { success: true };

		} catch (err) {
			console.error("Delete error:", err);
			return { success: false, message: err.message || "Failed to delete." };
		}
	};

	
	return (
		<BookContext.Provider value={{ books, addBook, setBooks, updateBook, deleteBook}}>
			{children}
		</BookContext.Provider>
	);
};
