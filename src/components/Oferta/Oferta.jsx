import Header from "../Header/Header";

import { getOfertaById } from "../../services/ofertas_service";
import { useState } from "react";

const Oferta = () => {
  const idOferta = parseInt(window.location.pathname.split("/")[2]);
  const [oferta, setOferta] = useState({});

  useState(() => {
    const traerOferta = async () => {
      try {
        const response = await getOfertaById(idOferta);
        setOferta(response);
      } catch (error) {
        console.log(error);
      }
    };
    traerOferta();
  }, []);

  const publicadoHace = (fecha) => {
    const fechaPublicacion = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual.getTime() - fechaPublicacion.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias;
  };

  return (
    <>
      <Header />
      <h1>{oferta.titulo_oferta}</h1>
      <h3>{oferta.Empresa?.nombre_empresa}</h3>
      <h4>{oferta.zona_trabajo}</h4>
      <p>{oferta.descripcion}</p>
      <p>{`Publicado hace ${publicadoHace(oferta.createdAt)} días`}</p>
      <p>{oferta.beneficios}</p>
      <button>Postularse</button>
    </>
  );
};

export default Oferta;
