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
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

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
    const fechaNacimiento = new Date(fecha);
    const dia = fechaNacimiento.getDate();
    const mes = fechaNacimiento.getMonth() + 1;
    const anio = fechaNacimiento.getFullYear();
    return dia + "/" + mes + "/" + anio;
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
                  variant="h6"
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
                </List>
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h6"
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
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Postulante;
