import { BrowserRouter, Routes, Route } from "react-router";
import ResponsiveAppBar from "../components/AppBar";
import PageNotFound from "../pages/PageNotFound";
import HomePage from "../pages/HomePage";
import Footer from "../components/Footer";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ContactUsPage from "../pages/ContactPage";
import BooksPage from "../pages/BooksPage";
import AddBookPage from "../pages/AddBookPage";
import AdminRoute from "../routes/AdminRoute";
import MyBookshelf from "../pages/MyBookshelf";
import BorrowedBooks from "../pages/BorrowedBooks";
import MemberRoute from "./MemberRoute";

export default function AppRouter() {
	//console.log(isAuthenticated);
	return (
		<BrowserRouter>
			<ResponsiveAppBar></ResponsiveAppBar>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/books" element={<BooksPage />} />
				<Route path="/contactus" element={<ContactUsPage />} />
				<Route element={<AdminRoute />}>
					<Route path="/admin/addbooks" element={<AddBookPage />} />
					<Route path="/admin/borrowedbooks" element={<BorrowedBooks />} />
				</Route>
				<Route element={<MemberRoute />}>
					<Route path="/member/bookshelf" element={<MyBookshelf />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			<Footer></Footer>
		</BrowserRouter>
	);
}
