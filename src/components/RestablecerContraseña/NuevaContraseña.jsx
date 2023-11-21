import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Toaster, toast } from "sonner";

import { postResetPassword } from "../../services/password_service";

import * as yup from "yup";
import Header from "../Header/Header";

const NuevaContraseña = () => {
  const id = window.location.href.split("/")[5];

  const schema = yup.object().shape({
    contraseña: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    confirmarContraseña: yup
      .string()
      .oneOf([yup.ref("contraseña"), null], "Las contraseñas deben coincidir")
      .required("La confirmación de contraseña es requerida"),
  });

  const handleCambioContraseña = async (e) => {
    e.preventDefault();

    const token = e.target.token.value;
    const contraseña = e.target.contraseña.value;
    const confirmarContraseña = e.target.confirmarContraseña.value;

    try {
      schema.validate(
        { contraseña, confirmarContraseña },
        { abortEarly: false }
      );
      const response = await postResetPassword(id, token, contraseña);

      if (response) {
        toast.success("La contraseña fue cambiada exitosamente.");
        setTimeout(() => {
          window.location.href = `/login`;
        }, 3000);
      } else {
        toast.error(
          "El código de restablecimiento es incorrecto o ha expirado."
        );
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        toast.error("Ha ocurrido un error inesperado.");
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container
        component="form"
        onSubmit={handleCambioContraseña}
        maxWidth="sm"
        sx={{ mb: 4 }}
      >
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 10 },
            p: { xs: 2, md: 3 },
            borderRadius: "12px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          }}
        >
          <Box sx={{ pb: 2 }}>
            <Avatar
              sx={{
                margin: "auto",
                background: "#5FA92C",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
          </Box>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
            }}
          >
            Restablecer contraseña
          </Typography>
          <Typography
            variant="body1"
            align="left"
            sx={{
              mt: 2,
              mb: 1,
            }}
          >
            Ingrese el código de restablecimiento que le enviamos a su correo
            electrónico y su nueva contraseña para poder acceder a su cuenta.
          </Typography>
          <TextField
            fullWidth
            required
            label="Código de restablecimiento"
            id="token"
            name="token"
            sx={{
              mt: 2,
            }}
          />
          <TextField
            fullWidth
            required
            type="password"
            label="Contraseña nueva"
            id="contraseña"
            name="contraseña"
            sx={{
              mt: 2,
            }}
          />
          <TextField
            fullWidth
            required
            type="password"
            label="Confirmar contraseña"
            id="confirmarContraseña"
            name="confirmarContraseña"
            sx={{
              mt: 2,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              mt: 2,
              mb: 2,
            }}
          >
            Cambiar contraseña
          </Button>
        </Paper>
      </Container>
      <Toaster richColors closeButton duration={5000} />
    </>
  );
};

export default NuevaContraseña;
