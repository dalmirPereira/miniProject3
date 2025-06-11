import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css"; // Just in case it's not already imported

export default function CarouselImage() {
	return (
		<Carousel style={{ height: "100%" }}>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/8/19/1408432557874/391b43b5-6273-4eac-94b4-eaf8c2983f06-1020x612.jpeg?width=700&quality=85&auto=format&fit=max&s=729c75642de6bdf94886102b6024bd50"
					alt="First slide"
					style={{ objectFit: "cover", height: "450px" }}
				/>
				<Carousel.Caption>
					<h3>Victoria Library</h3>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://www.canberratimes.com.au/images/transform/v1/crop/frm/tPntrWhUbGLyDWYCTv46rt/e34998d8-4bc0-46f3-8bf3-bea4b1171bcb.jpg/r0_372_3800_2517_w1200_h678_fmax.jpg"
					alt="Second slide"
					style={{ objectFit: "cover", height: "450px" }}
				/>
				<Carousel.Caption>
					<h3>Brisbane Library</h3>
				</Carousel.Caption>
			</Carousel.Item>

			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://media3.architecturemedia.net/site_media/media/cache/7f/e8/7fe885c5eac3287a1f1f35f0b12a4911.jpg"
					alt="Third slide"
					style={{ objectFit: "cover", height: "450px" }}
				/>
				<Carousel.Caption>
					<h3>New South Wales Library</h3>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
