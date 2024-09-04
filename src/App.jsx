import { Routes, Route } from "react-router-dom";
import RegistroPostulante from "./components/Registro/RegistroPostulante/RegistroPostulante.jsx";
import RegistroEmpresa from "./components/Registro/RegistroEmpresa/RegistroEmpresa.jsx";
import Inicio from "./components/Home/Inicio";
import Login from "./components/LoginAnimado/Login.jsx";
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
import { checkLogged, checkRole } from "./components/PrivateRoute/PrivateRoute.jsx";
import RestablecerPassword from "./components/RestablecerContraseña/RestablecerPassword.jsx";
import IngresarCodigo from "./components/RestablecerContraseña/IngresarCodigo.jsx";


function App() {

  return (
    <Routes>
      
      <Route path="/" element={<Inicio />} />
      <Route path="/perfil" element={
        <Perfil />
      } />
      <Route path="/oferta/:id" element={
         <Oferta />
        } />
      <Route path="/oferta/editar/:id" element={
         checkRole(<EdicionOferta />)
      } />
      <Route path="/empresa/:id" element={
         checkRole(<Empresa />)
      } />
      <Route path="/postulante/:id" element={
         checkRole(<Postulante />)
      } />
      <Route path="/postulantes/:id" element={
         checkRole( <Postulantes />)
      } />
      <Route path="/login" element={
         checkLogged( <Login />)
      } />
      <Route path="/registro/postulante/:id" element={
         checkLogged(<RegistroPostulante />)
      } />
      <Route path="/registro/empresa/:id" element={
         checkLogged(<RegistroEmpresa />)
      } />
      <Route path="/restablecimientoContraseña" element={
         < RestablecerPassword/>
      } />
        <Route
            path="/restablecimientoContraseña/ingresarCodigo/:token"
            element={
                <IngresarCodigo />
            }
        />
      <Route
        path="/restablecimientoContraseña/nuevaContraseña/:token"
        element={
           <NuevoPassword />
        }
      />
      <Route path="*" element={
        <NotFound />
      } />

    </Routes>
  );
}

export default App;
