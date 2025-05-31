import { Typography, Box, Container, Card, CardContent } from "@mui/material";
import Footer from "../components/Footer";
import CarouselImage from "../components/CarouselImage";

export default function HomePage() {
	return (
		<Box sx={{ backgroundColor: "#f8d8b6", minHeight: "100vh" }}>
			{/* Main Content */}
			<Container sx={{ textAlign: "center" }}>
				<Typography variant="h4" gutterBottom>
					Location
				</Typography>
				<Card
					sx={{
						mx: "auto",
						width: { xs: "90%", sm: "80%", md: "70%", lg: "70%" },
						maxWidth: "1200px",
						border: "1px solid black",
						my: 4,
					}}
				>
					<CarouselImage></CarouselImage>
				</Card>

				<Typography variant="h4" sx={{ mt: 4 }} gutterBottom>
					About Us
				</Typography>
				<Card
					sx={{
						mx: "auto",
						width: { xs: "60%", sm: "70%", md: "80%", lg: "90%" },
						maxWidth: "1200px",
						border: "none",
						boxShadow: "none",
						backgroundColor: "#f5ebdd",
					}}
				>
					<CardContent>
						<Typography sx={{ color: "black" }}>
							Nestled in the heart of Australia, our library has stood as a beacon of
							knowledge, community, and cultural heritage for over a century. Founded
							in the early 1900s, our institution began with a modest collection of
							books and periodicals donated by passionate locals who believed in the
							power of education and storytelling. Over the decades, we’ve grown
							alongside the nation—evolving from a traditional reading room into a
							vibrant hub of learning, digital innovation, and community connection.
							From the days when visitors arrived on horseback to today's digital age,
							our mission has remained constant: to provide free and open access to
							information, foster lifelong learning, and preserve the stories that
							shape our identity. Our shelves house everything from Indigenous
							Australian oral histories and early settler documents to the latest
							global bestsellers. We’re not just a place to borrow books—we’re a
							sanctuary for thinkers, dreamers, researchers, and everyone in between.
							Today, the library welcomes thousands of visitors annually—families
							attending weekend storytime, students seeking quiet study space, and
							researchers delving into Australia’s rich historical archives. Whether
							you’re here for knowledge, inspiration, or connection, we’re proud to be
							a part of your story.
						</Typography>
					</CardContent>
				</Card>
			</Container>
		</Box>
	);
}
