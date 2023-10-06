import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";

const PasswordVisibilityIcon = ({ visible, onClick }) => {
  const Icon = visible ? (
    <Visibility sx={{ cursor: "pointer" }} onClick={onClick} />
  ) : (
    <VisibilityOff sx={{ cursor: "pointer" }} onClick={onClick} />
  );

  return Icon;
};

const PasswordField = ({ mostrarContraseña, onToggle }) => {
  return (
    <TextField
      required
      type={mostrarContraseña ? "text" : "password"}
      id="Contraseña"
      label="Contraseña"
      fullWidth
      autoComplete="password"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <PasswordVisibilityIcon
            visible={mostrarContraseña}
            onClick={onToggle}
          />
        ),
      }}
    />
  );
};

PasswordField.propTypes = {
  mostrarContraseña: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default function DatosUsuario() {
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const toggleMostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Datos del usuario
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            type="email"
            id="Email"
            label="Email"
            fullWidth
            autoFocus
            autoComplete="email"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PasswordField
            mostrarContraseña={mostrarContraseña}
            onToggle={toggleMostrarContraseña}
          />
        </Grid>
      </Grid>
    </>
  );
}
