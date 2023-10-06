import { CssBaseline } from "@mui/material";
import Header from "../Header/Header";
import Ofertas from "./Ofertas.jsx";
import { useState } from "react";

const Inicio = () => {
  const [ofertas, setOfertas] = useState([]);

  return (
    <>
      <CssBaseline />
      <Header setOfertas={setOfertas} />
      <Ofertas ofertas={ofertas} setOfertas={setOfertas} />
    </>
  );
};

export default Inicio;
