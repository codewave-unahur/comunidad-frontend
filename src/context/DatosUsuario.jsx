import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DatosUsuarioContext = createContext();

const DatosUsuarioProvider = ({ children }) => {
  const [datosUsuario, setDatosUsuario] = useState({});
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [token, setToken] = useState("");
  const [idUsuario, setIdUsuario] = useState("");

  console.log("DatosUsuarioContext: ", datosUsuario);

  return (
    <DatosUsuarioContext.Provider
      value={{
        datosUsuario,
        setDatosUsuario,
        tipoUsuario,
        setTipoUsuario,
        token,
        setToken,
        idUsuario,
        setIdUsuario,
      }}
    >
      {children}
    </DatosUsuarioContext.Provider>
  );
};

DatosUsuarioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DatosUsuarioProvider;
