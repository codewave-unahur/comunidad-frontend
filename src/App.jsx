import { Routes, Route } from "react-router-dom";
import RegistroPostulante from "./components/Registro/RegistroPostulante/RegistroPostulante.jsx";
import RegistroEmpresa from "./components/Registro/RegistroEmpresa/RegistroEmpresa.jsx";
import Inicio from "./components/Home/Inicio";
import Login from "./components/LoginAnimado/Login.jsx";
import Email from "./components/RestablecerContraseña/Email.jsx";
import Oferta from "./components/Ofertas/Oferta.jsx";
import Perfil from "./components/Perfiles/Perfil";
import Postulantes from "./components/Postulantes/Postulantes";
import Postulante from "./components/Postulantes/Postulante";
import Empresa from "./components/Empresa/Empresa";
import NuevaContraseña from "./components/RestablecerContraseña/NuevaContraseña.jsx";
import EdicionOferta from "./components/Ofertas/EdicionOferta.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import PreLogin from "./components/PreLogin/PreLogin.jsx";
import NotFound from "./components/404/NotFound.jsx";
import { checkInvitado } from "./components/PrivateRoute/PrivateRouteInvitado.jsx";

function App() {

  return (
    <Routes>
      
      <Route path="/" element={<PreLogin />} />
      <Route path="/home" element={
        checkInvitado(<Inicio />)
      } />
      <Route path="/perfil" element={
        checkInvitado(<Perfil />)
      } />
      <Route path="/oferta/:id" element={
        checkInvitado( <Oferta />)
        } />
      <Route path="/oferta/editar/:id" element={
        checkInvitado( <EdicionOferta />)
      } />
      <Route path="/empresa/:id" element={
        checkInvitado( <Empresa />)
      } />
      <Route path="/postulante/:id" element={
        checkInvitado( <Postulante />)
      } />
      <Route path="/postulantes/:id" element={
        checkInvitado( <Postulantes />)
      } />
      <Route path="/login" element={
        checkInvitado( <Login />)
      } />
      <Route path="/registro/postulante/:id" element={
        checkInvitado( <RegistroPostulante />)
      } />
      <Route path="/registro/empresa/:id" element={
        checkInvitado( <RegistroEmpresa />)
      } />
      <Route path="/restablecimientoContraseña" element={
        checkInvitado( <Email />)
      } />
      <Route
        path="/restablecimientoContraseña/nuevaContraseña/:id"
        element={
          checkInvitado( <NuevaContraseña />)
        }
      />
      <Route path="*" element={
        checkInvitado(<NotFound />)
      } />
      
    </Routes>
  );
}

export default App;
