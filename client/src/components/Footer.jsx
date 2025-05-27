import { IconButton, Box, Typography, Divider } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
	return (
		<>
			{/* Footer with Social Icons */}
			<Box
				sx={{
					backgroundColor: "#db7c1c",
					py: 2,
					display: "flex",
					justifyContent: "center",
					gap: 4,
				}}
			>
				<Box
					display="flex"
					justifyContent="space-between"
					flexWrap="wrap"
					color="secondary"
				>
					<Box mb={2} mx={3}>
						<Typography variant="h6">Contact Us</Typography>
						<Typography>Email: support@libraryapp.com.au</Typography>
						<Typography>Phone: (61) 9292-7878</Typography>
						<Typography>Address: 123 George St, New South Wales, Sydney</Typography>
					</Box>

					<Box mb={2} mx={3}>
						<Typography variant="h6">Trading Hours</Typography>
						<Typography>Mon - Fri: 9:00 AM - 5:00 PM</Typography>
						<Typography>Sat: 10:00 AM - 4:00 PM</Typography>
						<Typography>Sun: Closed</Typography>
					</Box>
				</Box>

				<Divider sx={{ my: 2 }} />

				<Typography variant="h6" color="offwhite" align="center">
					© {new Date().getFullYear()} Library App. All rights reserved.
				</Typography>
			</Box>
		</>
	);
}
