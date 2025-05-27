import { Container, Typography, Paper, Box } from "@mui/material";
import AddBookForm from "../components/AddBookForm";

export default function AddBookPage() {
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
						Add a Book
					</Typography>
					<AddBookForm />
				</Paper>
			</Container>
		</Box>
	);
}
