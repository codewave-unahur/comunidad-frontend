import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { getGaleria } from "../../../services/galeria_service";


const CarouselBootstrap = () => {

  const [galeria, setGaleria] = useState([]);
  useEffect(() => {
    const fetchGaleria = async () => {
      const response = await getGaleria();
      if (response) {
        setGaleria(response.carouselImages);
      }
    };
    fetchGaleria();
  }, []);
  

  return (

    <Carousel className="d-flex justify-content-center">
      {galeria.map((imagen) => (
        <Carousel.Item key={imagen.id}>
          <img
            className="d-block w-100"
            src={imagen.imageUrl}
            alt={imagen.id}
          />
        </Carousel.Item>
      ))}

    </Carousel>
  );
}

export default CarouselBootstrap;
