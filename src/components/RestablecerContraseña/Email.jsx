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

import { postResetPasswordRequest } from "../../services/password_service";
import Header from "../Header/Header";

const RestablecerContraseña = () => {
  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await postResetPasswordRequest(e.target.email.value);
      const id = response.link.split("=")[2];
      if (response) {
        toast.success("El código de restablecimiento fue enviado a su correo");
        setTimeout(() => {
          window.location.href = `/restablecimientoContraseña/nuevaContraseña/${id}`;
        }, 3000);
      } else {
        toast.error("El correo electrónico ingresado no existe");
      }
    } catch (error) {
      toast.error("El correo electrónico ingresado no existe");
    }
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container
        component="form"
        onSubmit={handleSendEmail}
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
            Ingrese su correo electrónico y le enviaremos un enlace para
            restablecer su contraseña.
          </Typography>
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            id="email"
            name="email"
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
            Enviar
          </Button>
        </Paper>
      </Container>
      <Toaster richColors closeButton duration={5000} />
    </>
  );
};

export default RestablecerContraseña;
