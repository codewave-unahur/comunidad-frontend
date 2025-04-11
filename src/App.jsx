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
import NotFound from "./components/404/NotFound.jsx";
import { checkLogged, checkNotLogged, checkRole } from "./components/PrivateRoute/PrivateRoute.jsx";
import RestablecerPassword from "./components/RestablecerContraseña/RestablecerPassword.jsx";
import IngresarCodigo from "./components/RestablecerContraseña/IngresarCodigo.jsx";
import Articulo from "./components/Articulos/Articulo.jsx";


function App() {

  return (
    <Routes>
      
      <Route path="/" element={<Inicio />} />
      <Route path="/articulo/:id" element={<Articulo />} />
      <Route path="/perfil" element={
        checkLogged(<Perfil />)
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
         checkNotLogged( <Login />)
      } />
      <Route path="/registro/postulante/:id" element={
         checkNotLogged(<RegistroPostulante />)
      } />
      <Route path="/registro/empresa/:id" element={
         checkNotLogged(<RegistroEmpresa />)
      } />
      <Route path="/restablecimientoContraseña" element={
         checkNotLogged(<RestablecerPassword/>)
      } />
        <Route
            path="/restablecimientoContraseña/ingresarCodigo/:token"
            element={
                checkNotLogged(<IngresarCodigo />)
            }
        />
      <Route
        path="/restablecimientoContraseña/nuevaContraseña/:token"
        element={
           checkNotLogged(<NuevoPassword />)
        }
      />
      <Route path="*" element={
        <NotFound />
      } />

    </Routes>
  );
}

export default App;
