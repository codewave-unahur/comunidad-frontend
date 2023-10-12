import { Routes, Route } from "react-router-dom";
import RegistroPostulante from "./components/Registro/RegistroPostulante/RegistroPostulante.jsx";
import RegistroEmpresa from "./components/Registro/RegistroEmpresa/RegistroEmpresa.jsx";
import Inicio from "./components/Home/Inicio";
import Login from "./components/LoginAnimado/Login.jsx";
import RestablecerContraseña from "./components/RestablecerContraseña/RestablecerContraseña.jsx";
import Oferta from "./components/Oferta/Oferta";
import Perfil from "./components/Perfiles/Perfil";
import Postulantes from "./components/Postulantes/Postulantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/oferta/:id" element={<Oferta />} />
      <Route path="/postulantes/:id" element={<Postulantes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro/postulante" element={<RegistroPostulante />} />
      <Route path="/registro/empresa" element={<RegistroEmpresa />} />
      <Route
        path="/restablecimientoContraseña"
        element={<RestablecerContraseña />}
      />
    </Routes>
  );
}

export default App;
