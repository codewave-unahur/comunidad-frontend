import Carousel from "react-bootstrap/Carousel";


const CarouselBootstrap = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="w-100 h-auto" 
          src="https://i.pinimg.com/736x/9c/7b/e4/9c7be43979a736a8695361a544630b97.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Primera diapositiva</h3>
          <p>Descripción de la primera diapositiva.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="w-100 h-auto"
          src="https://i.pinimg.com/736x/9c/7b/e4/9c7be43979a736a8695361a544630b97.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Segunda diapositiva</h3>
          <p>Descripción de la segunda diapositiva.</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

export default CarouselBootstrap;
