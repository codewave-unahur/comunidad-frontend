import { useState } from "react";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { Toaster, toast } from "sonner";
import { signIn, signUp, aceptarTerminos } from "../../services/usuarios_service";
import { getPostulanteById } from "../../services/postulantes_service";
import { getEmpresaByIdUsuario } from "../../services/empresas_service";
import { EncryptStorage } from 'encrypt-storage';
import Terminos from "../Template/Terminos";


const Login = () => {

  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const [isSignup, setIsSignup] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("postulante");
  const [mostrarContraseñaInicio, setMostrarContraseñaInicio] = useState(false);
  const [mostrarContraseñaRegistro, setMostrarContraseñaRegistro] =
    useState(false);
  const [open, setOpen] = useState(false);

  const toggleMostrarContraseñaInicio = () => {
    setMostrarContraseñaInicio(!mostrarContraseñaInicio);
  };

  const toggleMostrarContraseñaRegistro = () => {
    setMostrarContraseñaRegistro(!mostrarContraseñaRegistro);
  };

  const schemaRegistro = yup.object().shape({
    emailRegistro: yup.string().email().required(),
    contraseñaRegistro: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required(),
    confirmarContraseñaRegistro: yup
      .string()
      .oneOf(
        [yup.ref("contraseñaRegistro"), null],
        "Las contraseñas no coinciden"
      )
      .required(),
  });

  const schemaInicioSesion = yup.object().shape({
    emailInicio: yup.string().email().required(),
    contraseñaInicio: yup
      .string()
      .required(),
  });

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();

    const email = e.target.emailRegistro.value;
    if (!isValidEmail(email)) {
      toast.error("El formato del correo electrónico no es válido.");
      return;
    }

    const response = await signUp({
      usuario: e.target.emailRegistro.value,
      password: e.target.contraseñaRegistro.value,
      grupo: tipoUsuario === "postulante" ? 1 : 2,
    });

    schemaRegistro
      .validate({
        emailRegistro: e.target.emailRegistro.value,
        contraseñaRegistro: e.target.contraseñaRegistro.value,
        confirmarContraseñaRegistro: e.target.confirmarContraseñaRegistro.value,
      })
      .then(() => {
        if (response === undefined) {
          toast.error(
            "El email ingresado ya se encuentra registrado. Por favor, ingrese otro email o inicie sesión."
          );
        } else {
          const idUsuario = response.id;
          tipoUsuario === "postulante"
            ? (window.location.href = `/registro/postulante/${idUsuario}`)
            : (window.location.href = `/registro/empresa/${idUsuario}`);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSubmitInicioSesion = async (e) => {
    e.preventDefault();

    const email = e.target.emailInicio.value;
    if (!isValidEmail(email)) {
      toast.error("El formato del correo electrónico no es válido.");
      return;
    }

    const response = await signIn({
      usuario: e.target.emailInicio.value,
      password: e.target.contraseñaInicio.value,
    });
    
    schemaInicioSesion
      .validate({
        emailInicio: e.target.emailInicio.value,
        contraseñaInicio: e.target.contraseñaInicio.value,
      })
      .then(async () => {

      
        if (response === undefined){
          toast.error("Usuario o contraseña incorrectos");
        } else {
          let datosUsuario;
          let tipoUsuario;
          sessionStorage.setItem("token", response.token);
          if (response.grupo === 1) {
            datosUsuario = await getPostulanteById(response.id);
            tipoUsuario = "postulante";
          } else if (response.grupo === 2) {
            datosUsuario = await getEmpresaByIdUsuario(response.id);
            tipoUsuario = "empresa";
          } else if (response.grupo === 3) {
            datosUsuario = {};
            tipoUsuario = "admin";
          }
            else if (response.grupo === 4) {
            datosUsuario = {};
            tipoUsuario = "graduado";
          } else {
            toast.error("Usuario o contraseña incorrectos");
            return;
          }
          if (response.estado === false) {
            if (tipoUsuario === "postulante") {
              window.location.href = `/registro/postulante/${response.id}`;
            } else if (tipoUsuario === "empresa") {
              window.location.href = `/registro/empresa/${response.id}`;
          }
        } else{
          
          if(response.aceptoTerminos === false){
            encryptStorage.setItem("datosUsuario", datosUsuario);
            encryptStorage.setItem("tipoUsuario", tipoUsuario);
            encryptStorage.setItem("idUsuario", response.id);   
            setOpen(true);
          }
          else{
            encryptStorage.setItem("datosUsuario", datosUsuario);
            encryptStorage.setItem("tipoUsuario", tipoUsuario);
            encryptStorage.setItem("idUsuario", response.id);
            encryptStorage.setItem("estaLogueado", "true");
            window.location.href = "/"
          }
      }
    }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const aceptarCondiciones = () => {
    setOpen(false);
    aceptarTerminos(encryptStorage.getItem("idUsuario"));
    encryptStorage.setItem("estaLogueado", "true");
    window.location.href = "/";
  };

  const rechazarCondiciones = () => {
    setOpen(false);
    sessionStorage.clear();
  };

  const isValidEmail = (email) => {
    // Esta función verifica si el correo electrónico tiene un formato válido.
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setTipoUsuario(newAlignment);
    }
  };

  


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        boxSizing: "border-box",
        minHeight: "95vh",
      }}
    >
      <Box
        sx={{
          boxShadow: "0 14px 28px rgba(0, 0, 0, 0.5)",
        }}
        className={`containerLogin ${isSignup ? "change" : ""}`}
      >
        <Box className="forms-containerLogin">
          {/* Registro */}
          <Box className="form-control signup-form">
            <Box
              component="form"
              onSubmit={handleSubmitRegistro}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0px 30px",
              }}
            >
              <Typography
                variant="h2"
                fontFamily={"Poppins, sans-serif"}
                fontSize="2rem"
                sx={{
                  fontWeight: "bold",
                  margin: "20px 0px",
                }}
              >
                Registrate
              </Typography>
              <ToggleButtonGroup
                value={tipoUsuario}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                size="small"
                sx={{
                  alignSelf: "center",
                  marginBottom: "10px",
                  "& .MuiToggleButton-root": {
                    backgroundColor: "#efefef",
                    color: "#000",
                    border: "none",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": {
                      backgroundColor: "#efefef",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#00496d",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#00759b",
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="postulante">
                  <SchoolIcon
                    sx={{
                      marginRight: "5px",
                    }}
                  />
                  Postulante
                </ToggleButton>
                <ToggleButton value="empresa">
                  <BusinessIcon sx={{ marginRight: "5px" }} />
                  Empresa
                </ToggleButton>
              </ToggleButtonGroup>
              <TextField
                type="email"
                label="Email"
                name="emailRegistro"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                sx={{
                  margin: "10px 0px",
                  border: "none",
                  backgroundColor: "#efefef",
                  borderRadius: "5px",

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
              <TextField
                type={mostrarContraseñaRegistro ? "text" : "password"}
                label="Contraseña"
                name="contraseñaRegistro"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={toggleMostrarContraseñaRegistro}>
                      {mostrarContraseñaRegistro ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff sx={{ cursor: "pointer" }} />
                      )}
                    </IconButton>
                  ),
                }}
                sx={{
                  margin: "10px 0px",
                  border: "none",
                  backgroundColor: "#efefef",
                  borderRadius: "5px",

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
              <TextField
                type={mostrarContraseñaRegistro ? "text" : "password"}
                label="Confirmar contraseña"
                name="confirmarContraseñaRegistro"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                sx={{
                  margin: "10px 0px",
                  border: "none",
                  backgroundColor: "#efefef",
                  borderRadius: "5px",

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  padding: "10px",
                  marginTop: "5px",
                  backgroundColor: "#00496d",
                  borderRadius: "5px",
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#00759b",
                  },
                }}
              >
                Siguiente
              </Button>
            </Box>
            {/*<Typography
              variant="caption"
              fontFamily={"Poppins, sans-serif"}
              fontSize="0.8rem"
              sx={{
                margin: "10px 0px",
              }}
            >
              o registrate con
            </Typography>
            <Box>
              <IconButton>
                <GoogleIcon />
              </IconButton>
              <IconButton>
                <GitHubIcon />
              </IconButton>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            </Box>*/}
            </Box>
          {/* Inicio de sesión */}
          <Box className="form-control signin-form">
            <Box
              component="form"
              onSubmit={handleSubmitInicioSesion}
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "0px 30px",
              }}
            >
              <Typography
                variant="h2"
                fontFamily={"Poppins, sans-serif"}
                fontSize="2rem"
                sx={{
                  fontWeight: "bold",
                  margin: "26px 0px",
                }}
              >
                Inicia sesión
              </Typography>
              <TextField
                type="email"
                label="Email"
                name="emailInicio"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                sx={{
                  margin: "10px 0px",
                  border: "none",
                  backgroundColor: "#efefef",
                  borderRadius: "5px",

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
              <TextField
                type={mostrarContraseñaInicio ? "text" : "password"}
                label="Contraseña"
                name="contraseñaInicio"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={toggleMostrarContraseñaInicio}>
                      {mostrarContraseñaInicio ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff sx={{ cursor: "pointer" }} />
                      )}
                    </IconButton>
                  ),
                }}
                sx={{
                  margin: "10px 0px",
                  border: "none",
                  backgroundColor: "#efefef",
                  borderRadius: "5px",

                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              />
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recuérdame"
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Link href="/restablecimientoContraseña " variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  padding: "10px",
                  marginTop: "5px",
                  backgroundColor: "#00404F",
                  borderRadius: "5px",
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#00759b",
                  },
                }}
              >
                Iniciar sesión
              </Button>
            </Box>
            {/*<Typography
              variant="caption"
              fontFamily={"Poppins, sans-serif"}
              fontSize="0.8rem"
              sx={{
                margin: "10px 0px",
              }}
            >
              o inicia sesión con
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton>
                <GoogleIcon />
              </IconButton>
              <IconButton>
                <GitHubIcon />
              </IconButton>
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            </Box>*/}
          </Box>
        </Box>

        {/* ---------- Textos ---------- */}

        <Box className="intros-containerLogin">
          <Box className="intro-control signin-intro">
            <Box className="intro-control__inner">
              <Typography
                variant="h2"
                fontFamily={"Poppins, sans-serif"}
                sx={{
                  fontSize: "1.4rem",
                  marginBlockStart: "0.83em",
                  marginBlockEnd: "0.83em",
                  fontWeight: "bold",
                  lineHeight: "1.4",
                }}
              >
                ¡Bienvenido de nuevo a la bolsa de empleo de la UNAHUR!
              </Typography>
              <Typography
                variant="body2"
                fontFamily={"Poppins, sans-serif"}
                sx={{
                  margin: "10px 0px",
                }}
              >
                Inicia sesión para seguir
                buscando trabajo o publicar tu oferta laboral.
              </Typography>
              <Button
                variant="contained"
                onClick={toggleForm}
                sx={{
                  textTransform: "none",
                  padding: "15px 30px",
                  backgroundColor: "#00496d",
                  borderRadius: "25px",
                  margin: "10px 0px",
                  fontSize: "0.8rem",
                  "&:hover": {
                    backgroundColor: "#00759b",
                  },
                }}
              >
                ¿No tenes una cuenta? Registrate.
              </Button>
            </Box>
          </Box>
          <Box className="intro-control signup-intro">
            {/* <Box
              component="img"
              src={logoUNAHUR}
              alt="Logo UNAHUR"
              sx={{
                width: "100px",
                margin: "0px auto",
                paddingTop: "20px",
                paddingBottom: "30px",
              }}
            /> */}
            <Box className="intro-control__inner">
              <Typography
                variant="h2"
                fontFamily={"Poppins, sans-serif"}
                sx={{
                  fontSize: "1.4rem",
                  marginBlockStart: "0.83em",
                  marginBlockEnd: "0.83em",
                  fontWeight: "bold",
                  lineHeight: "1.4",
                }}
              >
                ¡Sumate a nuestra bolsa de empleo abierta a la comunidad!
              </Typography>
              <Typography
                variant="body2"
                fontFamily={"Poppins, sans-serif"}
                sx={{
                  margin: "10px 0px",
                }}
              >
                Recordá revisar periódicamente las ofertas laborales que se
                publican en la plataforma.
              </Typography>
              <Button
                variant="contained"
                onClick={toggleForm}
                sx={{
                  textTransform: "none",
                  padding: "15px 30px",
                  backgroundColor: "#00496d",
                  borderRadius: "25px",
                  margin: "10px 0px",
                  fontSize: "0.8rem",
                  "&:hover": {
                    backgroundColor: "#00759b",
                  },
                }}
              >
                ¿Ya tenes una cuenta? Inicia sesión.
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Toaster richColors closeButton />
      <Dialog open={open} >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              margin: "10px 0px",
            }}
            
            
          >
            Acepta los términos y condiciones para continuar.
          </Typography>
          <Terminos />
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Button 
              variant="text"
              onClick={() => rechazarCondiciones()}
              sx={{
                color: "#dc3545",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  color: "#dc3545",
              }}
            }
            >
              Rechazar
            </Button>
            <Button
              variant="contained"
              onClick={aceptarCondiciones}
              sx={{
                backgroundColor: "#00496d",
                color: "#fff",
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#00759b",
              }}
            }
            >
              Aceptar
            </Button>
            </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Login;
