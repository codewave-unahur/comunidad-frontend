import Carousel from "react-bootstrap/Carousel";


const CarouselBootstrap = () => {
  return (

    <Carousel className="d-flex justify-content-center">
      <Carousel.Item>
        <img
          className="d-block w-100 " 
          src="https://campus.unahur.edu.ar/wp-content/uploads/slider/cache/73e4073787e3f71b03a981d7db81a660/abanderadocampus.jpg"
          alt="First slide"
        />
        
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://campus.unahur.edu.ar/wp-content/uploads/slider/cache/c25002faae1e80623ff82afc991fc897/clases-de-apoyo-campus_nuevo.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://campus.unahur.edu.ar/wp-content/uploads/slider/cache/e4a64014ee84273e7e562fa76905ff4e/dudas-gestion-estudiantilcampus-1.jpg"
          alt="Third slide"
        />
        
      </Carousel.Item>

    </Carousel>
  );
}

export default CarouselBootstrap;
