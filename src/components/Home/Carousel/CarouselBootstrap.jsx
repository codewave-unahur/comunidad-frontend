import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect } from "react";
import { getGaleria } from "../../../services/galeria_service";
import { Link } from "react-router-dom";


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

    <Carousel className="d-flex justify-content-center ">
      {galeria.map((imagen) => (
        <Carousel.Item key={imagen.id}>
          <a href={imagen.links === "undefined" ? "#" : imagen.links} target={imagen.links === "undefined" ? "_self" : "_blank"}>
            <img
              className="d-block "
              src={imagen.imageUrl}
              alt={imagen.id}
              style={{heigth:"auto", width:"100%", objectFit:"cover"}}
            />
          </a>
        </Carousel.Item>
      ))}

    </Carousel>
  );
}

export default CarouselBootstrap;
