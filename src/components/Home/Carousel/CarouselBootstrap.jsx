import Carousel from "react-bootstrap/Carousel";


const CarouselBootstrap = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="w-100 h-auto" 
          src="https://campus.unahur.edu.ar/wp-content/uploads/slider/cache/73e4073787e3f71b03a981d7db81a660/abanderadocampus.jpg"
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
          src="https://campus.unahur.edu.ar/wp-content/uploads/slider/cache/c25002faae1e80623ff82afc991fc897/clases-de-apoyo-campus_nuevo.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Segunda diapositiva</h3>
          <p>Descripción de la segunda diapositiva.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100 h-auto"
          src="https://campus.unahur.edu.ar/wp-content/uploads/slider/cache/e4a64014ee84273e7e562fa76905ff4e/dudas-gestion-estudiantilcampus-1.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Tercera diapositiva</h3>
          <p>Descripción de la tercera diapositiva.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default CarouselBootstrap;
