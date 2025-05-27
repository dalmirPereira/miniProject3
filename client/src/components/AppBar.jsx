import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/libraryLogo.jpg";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router";
import ButtonBase from "@mui/material/ButtonBase";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

export default function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const { userRole, logout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const pages = [
		{ label: "Browse Books", path: "/books" },
		{ label: "Contact Us", path: "/contactus" },
	];

	if (userRole === "admin") {
		pages.push({ label: "Add A Book", path: "/admin/addbooks" });
	}

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleNavigate = (path) => {
		handleCloseNavMenu();
		navigate(path);
	};

	return (
		<AppBar position="static" sx={{ backgroundColor: "#db7c1c" }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<ButtonBase onClick={() => navigate("/")}>
						<Box
							component="img"
							src={logo}
							alt="Library Logo"
							sx={{ height: 50, mr: 2, display: { xs: "none", md: "flex" } }}
						/>
					</ButtonBase>

					{/* <Typography
						variant="h6"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						AUS LIBRARY
					</Typography> */}

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: "block", md: "none" } }}
						>
							{pages.map(({ label, path }) => (
								<MenuItem key={label} onClick={() => handleNavigate(path)}>
									<Typography textAlign="center" color="black">
										{label}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<ButtonBase onClick={() => navigate("/")}>
						<Box
							component="img"
							src={logo}
							alt="Library Logo"
							sx={{ height: 50, mr: 2, display: { xs: "flex", md: "none" } }}
						/>
					</ButtonBase>

					<Typography
						variant="h5"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "white",
							textDecoration: "none",
						}}
					>
						AUS LIBRARY
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map(({ label, path }) => (
							<Button
								key={label}
								onClick={() => handleNavigate(path)}
								sx={{
									my: 2,
									color: "white",
									display: "block",
									borderBottom: location.pathname === path ? "1px solid white" : "none",
									borderRadius: 0,
								}}
							>
								{label}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<UserMenu
							onMenuSelect={(option) => {
								if (option === "Login") {
									navigate("/login");
								} else if (option === "Logout") {
									logout();
									navigate("/");
								}
							}}
						/>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
