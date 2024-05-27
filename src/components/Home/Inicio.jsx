import { CssBaseline } from "@mui/material";
import Header from "../Header/Header";
import Ofertas from "../Ofertas/Ofertas.jsx";
import { useState } from "react";
import Paginacion from "../Paginacion/Paginacion";
import Footer from "../Footer/Footer.jsx";
import CarouselBootstrap from "./Carousel/CarouselBootstrap.jsx";

const Inicio = () => {
  const [ofertas, setOfertas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  return (
    <>
      <CssBaseline />
      <Header setOfertas={setOfertas} />
      <CarouselBootstrap />
      <Ofertas
        ofertas={ofertas}
        setOfertas={setOfertas}
        paginaActual={paginaActual}
        setTotalPaginas={setTotalPaginas}
      />
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        cambiarPagina={setPaginaActual}
      />
      <Footer />
    </>
  );
};

export default Inicio;
