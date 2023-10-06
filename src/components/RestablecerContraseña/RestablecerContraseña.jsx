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

const RestablecerContraseña = () => {
  return (
    <>
      <CssBaseline />
      <Container component="form" maxWidth="sm" sx={{ mb: 4 }}>
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
    </>
  );
};

export default RestablecerContraseña;
