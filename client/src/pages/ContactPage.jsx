import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Paper,
	Grid,
	Container,
} from "@mui/material";

const ContactUsPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Feedback submitted:", formData);
		alert("Thank you for your feedback!");
		setFormData({ name: "", email: "", message: "" });
	};

	return (
		<Box sx={{ backgroundColor: "#f8d8b6", minHeight: "100vh" }}>
			<Container maxWidth="md" sx={{ py: 6 }}>
				<Typography variant="h4" gutterBottom align="center">
					Contact Us
				</Typography>

				<Grid container spacing={4} justifyContent={"center"}>
					<Grid item xs={12} md={6}>
						<Paper elevation={3} sx={{ p: 4, backgroundColor: "#f5ebdd" }}>
							<Typography variant="h6" gutterBottom>
								Send Us a Message
							</Typography>
							<form onSubmit={handleSubmit}>
								<TextField
									fullWidth
									label="Name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									margin="normal"
									sx={{ backgroundColor: "white" }}
									required
								/>
								<TextField
									fullWidth
									label="Email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									margin="normal"
									sx={{ backgroundColor: "white" }}
									required
								/>
								<TextField
									fullWidth
									label="Message"
									name="message"
									multiline
									rows={4}
									value={formData.message}
									onChange={handleChange}
									margin="normal"
									sx={{ backgroundColor: "white" }}
									required
								/>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
									sx={{ mt: 2 }}
								>
									Submit Feedback
								</Button>
							</form>
						</Paper>
					</Grid>

					<Grid item xs={12} md={6}>
						<Paper elevation={3} sx={{ p: 4, backgroundColor: "#f5ebdd" }}>
							<Typography variant="h6" gutterBottom>
								Trading Hours
							</Typography>
							<Typography>🕘 Mon - Fri: 9:00 AM – 6:00 PM</Typography>
							<Typography>🕙 Sat: 10:00 AM – 4:00 PM</Typography>
							<Typography>🚪 Sun: Closed</Typography>

							<Box mt={4}>
								<Typography variant="h6" gutterBottom>
									Contact Details
								</Typography>
								<Typography>📧 Email: support@libraryapp.com</Typography>
								<Typography>📞 Phone: (123) 456-7890</Typography>
								<Typography>📍 Address: 123 Book St, Readville</Typography>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default ContactUsPage;
