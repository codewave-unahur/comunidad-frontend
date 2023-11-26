import Header from "../Header/Header";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Skeleton,
  Box,
  Grid,
  Stack,
  Chip,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MarkunreadMailboxOutlinedIcon from "@mui/icons-material/MarkunreadMailboxOutlined";
import TransgenderIcon from "@mui/icons-material/Transgender";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import AccessibilityIcon from "@mui/icons-material/Accessibility";

import { getPostulanteByDni } from "../../services/postulantes_service";

const Postulante = () => {
  const idPostulante = parseInt(window.location.pathname.split("/")[2]);

  const [postulante, setPostulante] = useState({});
  const isLoading = Object.keys(postulante).length === 0;

  useEffect(() => {
    const traerPostulante = async () => {
      try {
        const response = await getPostulanteByDni(idPostulante);
        setPostulante(response);
      } catch (error) {
        console.log(error);
      }
    };
    traerPostulante();
  }, [idPostulante]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  };

  const formatoFecha = (fecha) => {
    // dia/mes/año
    const fechaNacimiento = new Date(fecha);
    let dia = fechaNacimiento.getDate() + 1;
    let mes = fechaNacimiento.getMonth() + 1;
    const año = fechaNacimiento.getFullYear();
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
    return dia + "/" + mes + "/" + año;
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="md"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            borderRadius: 2,
            position: "relative",
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width="50%" />
              <Skeleton variant="text" width="20%" />
              <Skeleton
                variant="circular"
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "1rem",
                  width: 170,
                  height: 170,
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              />
            </>
          ) : (
            <>
              <Avatar
                src={postulante.foto}
                alt={postulante.nombre + " " + postulante.apellido}
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "2rem",
                  width: 150,
                  height: 150,
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              />
              <CardHeader
                title={postulante.nombre + " " + postulante.apellido}
                subheader={calcularEdad(postulante.fecha_nac) + " años"}
                sx={{
                  "& .MuiTypography-h5": {
                    fontSize: "2rem",
                    width: {
                      xs: "50%",
                      sm: "100%",
                    },
                  },
                }}
              />
            </>
          )}

          <CardContent>
            {isLoading ? (
              <>
                <Skeleton variant="text" width="40%" sx={{ mt: 10 }} />
                <Box
                  sx={{
                    display: "grid",
                    mt: 2,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "1rem",
                  }}
                >
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                </Box>
                <Divider sx={{ marginTop: "1rem" }} />
                <Skeleton variant="text" width="40%" />
                <Box
                  sx={{
                    display: "grid",
                    mt: 2,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "1rem",
                  }}
                >
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Datos personales
                </Typography>
                <List
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "1rem",
                  }}
                >
                  <ListItem>
                    <EmailOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={postulante.Usuario?.usuario}
                      secondary="Email"
                    />
                  </ListItem>
                  {postulante.segundoTelefono && (
                    <ListItem>
                      <LocalPhoneOutlinedIcon
                        color="primary"
                        fontSize="large"
                        sx={{
                          marginRight: "0.5rem",
                        }}
                      />
                      <ListItemText
                        primary={postulante.segundoTelefono}
                        secondary="Teléfono"
                      />
                    </ListItem>
                  )}
                  <ListItem>
                    <LocalPhoneOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={postulante.telefono}
                      secondary="Teléfono"
                    />
                  </ListItem>
                  <ListItem>
                    <CalendarMonth
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={formatoFecha(postulante.fecha_nac)}
                      secondary="Fecha de nacimiento"
                    />
                  </ListItem>
                  <ListItem>
                    <LocationOnOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={
                        postulante.Ciudad?.nombre +
                        ", " +
                        postulante.Provincia?.nombre
                      }
                      secondary="Lugar de residencia"
                    />
                  </ListItem>
                  <ListItem>
                    <MarkunreadMailboxOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={postulante.cp}
                      secondary="Código postal"
                    />
                  </ListItem>
                  {postulante.genero && (
                    <ListItem>
                      <TransgenderIcon
                        color="primary"
                        fontSize="large"
                        sx={{
                          marginRight: "0.5rem",
                        }}
                      />
                      <ListItemText
                        primary={postulante.genero}
                        secondary="Género"
                      />
                    </ListItem>
                  )}
                  {postulante.linkedIn && (
                    <ListItem>
                      <LinkedInIcon
                        color="primary"
                        fontSize="large"
                        sx={{
                          marginRight: "0.5rem",
                        }}
                      />
                      <ListItemText
                        primary={
                          <a
                            href={postulante.linkedIn}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {postulante.linkedIn}
                          </a>
                        }
                        secondary="LinkedIn"
                      />
                    </ListItem>
                  )}
                  {postulante.portfolio && (
                    <ListItem>
                      <LanguageIcon
                        color="primary"
                        fontSize="large"
                        sx={{
                          marginRight: "0.5rem",
                        }}
                      />
                      <ListItemText
                        primary={
                          <a
                            href={postulante.portfolio}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {postulante.portfolio}
                          </a>
                        }
                        secondary="Portfolio o red social"
                      />
                    </ListItem>
                  )}
                  {postulante.discapacidad && (
                    <ListItem>
                      <AccessibilityIcon
                        color="primary"
                        fontSize="large"
                        sx={{
                          marginRight: "0.5rem",
                        }}
                      />
                      <ListItemText
                        primary={postulante.discapacidad}
                        secondary="Discapacidad"
                      />
                    </ListItem>
                  )}
                </List>
                {postulante.presentacion && (
                  <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        variant="h5"
                        color="primary"
                        sx={{ marginTop: "1rem" }}
                      >
                        Presentación
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                      >
                        {postulante.presentacion}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Datos académicos
                </Typography>
                <List
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "1rem",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary={postulante.Estudios?.nombre_estudio_estado}
                      secondary="Estudios"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={postulante.Carrera?.nombre_carrera}
                      secondary="Carrera"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={postulante.cant_materias}
                      secondary="Materias aprobadas"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={postulante.alumno_unahur ? "Si" : "No"}
                      secondary="¿Es alumno de la UNAHUR?"
                    />
                  </ListItem>
                </List>
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Idiomas
                </Typography>
                <Grid container spacing={2}>
                  {postulante.Idiomas?.map((idioma, index) => (
                    <Grid item key={index} xs={12} sm={6}>
                      <Card variant="outlined" sx={{ marginTop: "1rem" }}>
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              marginBottom: "1rem",
                            }}
                          >
                            {idioma["Idiomas del postulante"].nombre_idioma}
                          </Typography>
                          <Typography>
                            Nivel escrito:{" "}
                            {idioma["Idiomas del postulante"].nivel_escrito}
                          </Typography>
                          <Typography>
                            Nivel oral:{" "}
                            {idioma["Idiomas del postulante"].nivel_oral}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Aptitudes
                </Typography>
                <Stack direction="row" spacing={2} paddingY={2}>
                  {postulante.Aptitudes?.map((aptitud) => (
                    <Chip
                      key={aptitud["Aptitudes del postulante"].id}
                      label={aptitud["Aptitudes del postulante"].nombre_aptitud}
                    />
                  ))}
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Postulante;
