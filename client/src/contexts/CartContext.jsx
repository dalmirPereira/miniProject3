import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "addToCartT":
			if (state.find((book) => book.ISBN === action.book.ISBN)) return state;
			return [...state, action.book];
		case "removeFromCart":
			return state.filter((book) => book.ISBN !== action.isbn);
		case "clearCart":
			return [];
		default:
			return state;
	}
};

const getInitialCart = () => {
	try {
		const stored = localStorage.getItem("cart");
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error("Failed to load cart from localStorage:", error);
		return [];
	}
};

export const CartProvider = ({ children }) => {
	const [cartItems, dispatch] = useReducer(cartReducer, [], getInitialCart);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}, [cartItems]);

	return (
		<CartContext.Provider value={{ cartItems, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
