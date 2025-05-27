import { BrowserRouter, Routes, Route } from "react-router";
import ResponsiveAppBar from "./components/AppBar";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactUsPage from "./pages/ContactPage";
import BooksPage from "./pages/BooksPage";
import AddBookPage from "./pages/AddBookPage";
import { useAuth } from "./contexts/AuthContext";

export default function AppRouter() {
	const { userRole, isAuthenticated } = useAuth();
	console.log(isAuthenticated);
	return (
		<BrowserRouter>
			<ResponsiveAppBar></ResponsiveAppBar>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/books" element={<BooksPage />} />
				<Route path="/contactus" element={<ContactUsPage />} />
				{userRole === "admin" && (
					<Route path="/admin/addbooks" element={<AddBookPage />} />
				)}
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
}
