import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BookProvider } from "./contexts/BookContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<BookProvider>
				<App />
			</BookProvider>
		</AuthProvider>
	</StrictMode>
);
