import { Routes, Route } from "react-router-dom";
import RegistroPostulante from "./components/Registro/RegistroPostulante/RegistroPostulante.jsx";
import RegistroEmpresa from "./components/Registro/RegistroEmpresa/RegistroEmpresa.jsx";
import Inicio from "./components/Home/Inicio";
import Login from "./components/LoginAnimado/Login.jsx";
import Email from "./components/RestablecerContraseña/RestablecerPassword.jsx";
import Oferta from "./components/Ofertas/Oferta.jsx";
import Perfil from "./components/Perfiles/Perfil";
import Postulantes from "./components/Postulantes/Postulantes";
import Postulante from "./components/Postulantes/Postulante";
import Empresa from "./components/Empresa/Empresa";
import NuevoPassword from "./components/RestablecerContraseña/NuevoPassword.jsx";
import EdicionOferta from "./components/Ofertas/EdicionOferta.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import PreLogin from "./components/PreLogin/PreLogin.jsx";
import NotFound from "./components/404/NotFound.jsx";
import { checkInvitado } from "./components/PrivateRoute/PrivateRouteInvitado.jsx";
import { checkLogged, checkRole } from "./components/PrivateRoute/PrivateRoute.jsx";
import RestablecerPassword from "./components/RestablecerContraseña/RestablecerPassword.jsx";
import IngresarCodigo from "./components/RestablecerContraseña/IngresarCodigo.jsx";


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
        checkInvitado( checkRole(<EdicionOferta />))
      } />
      <Route path="/empresa/:id" element={
        checkInvitado( checkRole(<Empresa />))
      } />
      <Route path="/postulante/:id" element={
        checkInvitado( checkRole(<Postulante />))
      } />
      <Route path="/postulantes/:id" element={
        checkInvitado( checkRole( <Postulantes />))
      } />
      <Route path="/login" element={
        checkInvitado( checkLogged( <Login />))
      } />
      <Route path="/registro/postulante/:id" element={
        checkInvitado( checkLogged(<RegistroPostulante />))
      } />
      <Route path="/registro/empresa/:id" element={
        checkInvitado( checkLogged(<RegistroEmpresa />))
      } />
      <Route path="/restablecimientoContraseña" element={
        checkInvitado( < RestablecerPassword/>)
      } />
        <Route
            path="/restablecimientoContraseña/ingresarCodigo/:token"
            element={
                checkInvitado(<IngresarCodigo />)
            }
        />
      <Route
        path="/restablecimientoContraseña/nuevaContraseña/:token"
        element={
          checkInvitado( <NuevoPassword />)
        }
      />
      <Route path="*" element={
        checkInvitado(<NotFound />)
      } />

    </Routes>
  );
}

export default App;
