import React, {
	createContext,
	useContext,
	useReducer,
	useEffect,
	useRef,
} from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const cartReducer = (state, action) => {
	switch (action.type) {
		case "addToCart":
			if (state.find((book) => book._id === action.book._id)) return state;
			return [...state, action.book];
		case "removeFromCart":
			return state.filter((book) => book._id !== action._id);
		case "clearCart":
			return [];
		default:
			return state;
	}
};

const getInitialCart = (username) => {
	try {
		const stored = localStorage.getItem(`cart_${username}`);
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error("Failed to load cart from localStorage:", error);
		return [];
	}
};

export const CartProvider = ({ children }) => {
	const { auth } = useAuth();
	const username = auth?.username;
	const prevUsername = useRef(username);

	const [cartItems, dispatch] = useReducer(cartReducer, [], () =>
		getInitialCart(username)
	);

	// save cart into LocalStorage
	useEffect(() => {
		if (username) {
			localStorage.setItem(`cart_${username}`, JSON.stringify(cartItems));
		}
	}, [cartItems, username]);

	// Clear cart and localStorage when user logs out
	useEffect(() => {
		if (prevUsername.current && !username) {
			localStorage.removeItem(`cart_${prevUsername.current}`);
			dispatch({ type: "clearCart" });
		}
		prevUsername.current = username;
	}, [username]);

	return (
		<CartContext.Provider value={{ cartItems, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
