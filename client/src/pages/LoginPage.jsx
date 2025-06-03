import { Container, Typography, Paper, Box, Button } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const navigate = useNavigate();
	return (
		<Box sx={{ backgroundColor: "#f8d8b6", minHeight: "100vh" }}>
			<Container
				maxWidth="sm"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "start",
					alignItems: "center",
					minHeight: "100vh",
					py: 6,
				}}
			>
				<Paper
					elevation={3}
					sx={{ padding: 4, width: "100%", backgroundColor: "#f5ebdd" }}
				>
					<Typography variant="h5" align="center" gutterBottom>
						Login
					</Typography>
					<LoginForm />

					{/* Signup option */}
					<Box mt={3} textAlign="center">
						<Typography variant="body2">Don't have an account?</Typography>
						<Button
							variant="outlined"
							sx={{ mt: 1, backgroundColor: "white" }}
							onClick={() => navigate("/signup")}
						>
							Sign Up
						</Button>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}
