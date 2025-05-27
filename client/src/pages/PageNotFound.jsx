import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function PageNotFound() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			height="100vh"
			textAlign="center"
			px={2}
		>
			<Typography variant="h2" gutterBottom>
				404 - Page Not Found
			</Typography>
			<Typography variant="body1" gutterBottom>
				The page you're looking for doesn't exist.
			</Typography>
			<Button variant="contained" color="primary" component={RouterLink} to="/">
				Go to Login
			</Button>
		</Box>
	);
}

export default PageNotFound;
