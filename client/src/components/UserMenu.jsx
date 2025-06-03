import React, { useState } from "react";
import { IconButton, Box, Typography, Badge } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import BorrowCartDrawer from "./BorrowCartDrawer";

export default function UserMenu() {
	const { auth, logout } = useAuth();
	const isAuthenticated = !!auth?.username;
	const navigate = useNavigate();
	const { cartItems } = useCart();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleClick = () => {
		if (isAuthenticated) {
			logout();
			navigate("/");
		} else {
			navigate("/login");
		}
	};

	return (
		<Box display="flex" alignItems="center" gap={1}>
			{isAuthenticated && (
				<>
					<Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
						<Typography variant="body1" sx={{ color: "white" }}>
							Cart
						</Typography>
						<IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "white" }}>
							<Badge badgeContent={cartItems.length} color="error">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
					</Box>
					<BorrowCartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
				</>
			)}
			<IconButton sx={{ color: "white" }} onClick={handleClick}>
				<AccountCircleIcon />
			</IconButton>
			<Typography
				variant="body1"
				sx={{ color: "white", cursor: "pointer" }}
				onClick={handleClick}
			>
				{isAuthenticated ? "Logout" : "Login"}
			</Typography>
		</Box>
	);
}
