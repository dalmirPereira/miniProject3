import { Container, Typography, Paper, Box } from "@mui/material";
import SignupForm from "../components/SignupForm";

export default function SignupPage() {
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
						Sign Up
					</Typography>
					<SignupForm />
				</Paper>
			</Container>
		</Box>
	);
}
