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
import TranslateIcon from "@mui/icons-material/Translate";
import { getIdiomasPostulante } from "../../services/idiomasPostulantes_service";
import { getExperienciaLaboral } from "../../services/experienciaLaboral_service";
import { getPostulanteByDni } from "../../services/postulantes_service";
import { getHabilidadesPostulante } from "../../services/habilidadesPostulante_service";

const Postulante = () => {
  const idPostulante = parseInt(window.location.pathname.split("/")[2]);

  const [postulante, setPostulante] = useState({});
  const [idiomasPostulante, setIdiomasPostulante] = useState([]);
  const [experienciaLaboral, setExperienciaLaboral] = useState([]);
  const [habilidadesPostulante, setHabilidadesPostulante] = useState([]);
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

    const traerIdiomasPostulante = async () => {
      try {
        const response = await getIdiomasPostulante(idPostulante);
        setIdiomasPostulante(response);
      } catch (error) {
        console.log(error);
      }
    };

    const traerExperienciaLaboral = async () => {
      try {
        const response = await getExperienciaLaboral(idPostulante);
        setExperienciaLaboral(response);
      } catch (error) {
        console.log(error);
      }
    };
    
    const traerHabilidadesPostulante = async () => {
      try {
        const response = await getHabilidadesPostulante(idPostulante);
        setHabilidadesPostulante(response);
      } catch (error) {
        console.log(error)
      }
    };

    traerPostulante();
    traerIdiomasPostulante();
    traerExperienciaLaboral();
    traerHabilidadesPostulante();
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

  const convertirFecha = (fecha) => {
    const fechaDate = new Date(fecha);
    fechaDate.setDate(fechaDate.getDate() + 1);
    return fechaDate.toLocaleDateString();
}

  const calcularTiempo = (fechaInicio, fechaFin) => {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    let años = fechaFinDate.getFullYear() - fechaInicioDate.getFullYear();
    let meses = fechaFinDate.getMonth() - fechaInicioDate.getMonth();
    if (meses < 0) {
      años--;
      meses = 12 + meses;
    }
    if (años === 0) {
      if (meses === 1) {
        return meses + " mes";
      } else {
        return meses + " meses";
      }
    } else {
      if (meses === 0) {
        return años + " años";
      } else {
        if (años === 1) {
          return años + " año y " + meses + " meses";
        } else {
          return años + " años y " + meses + " meses";
        }
      }
    }
  }

  const acortarLink = (link) => {
    let linkAcortado = link;
    if (link.length > 30) {
      linkAcortado = link.slice(0, 30) + "...";
    }
    return linkAcortado;
  }

  // Crea una función que reciba un nombre y apellido y devuelva las iniciales, y un color de fondo aleatorio
  const iniciales = (nombre, apellido) => {
    const iniciales = nombre.charAt(0) + apellido.charAt(0);
    const colores = [
      "#f44336",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#9e9e9e",
      "#607d8b",
    ];
    const color = colores[Math.floor(Math.random() * colores.length)];
    return { iniciales, color };
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
              {postulante.foto ? <Avatar
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
              /> : <Avatar
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "2rem",
                  alignContent: "center",
                  width: 150,
                  height: 150,
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                  backgroundColor: iniciales(postulante.nombre, postulante.apellido).color,
                }}
              >
                <Typography sx={{
                  fontSize: "4rem",
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                  
                }}>{iniciales(postulante.nombre, postulante.apellido).iniciales}</Typography>
              </Avatar>
                }
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
                  sx={{color: "#006982",marginTop: "1rem" }}
                  
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
                      sx={{color: "#006982", marginRight: "0.5rem"}}
                      fontSize="large"

                    />
                    <ListItemText
                      primary={postulante.Usuario?.usuario}
                      secondary="Email"
                    />
                  </ListItem>
                  <ListItem>
                    <LocalPhoneOutlinedIcon
                      sx={{color: "#006982", marginRight: "0.5rem"}}
                      fontSize="large"
                      
                    />
                    <ListItemText
                      primary={postulante.telefono}
                      secondary="Teléfono"
                    />
                  </ListItem>
                  {postulante.segundoTelefono && (
                    <ListItem>
                      <LocalPhoneOutlinedIcon
                        sx={{color: "#006982", marginRight: "0.5rem"}}
                        fontSize="large"
                        
                      />
                      <ListItemText
                        primary={postulante.segundoTelefono}
                        secondary="Segundo teléfono"
                      />
                    </ListItem>
                  )}
                  <ListItem>
                    <CalendarMonth
                      sx={{color: "#006982", marginRight: "0.5rem"}}
                      fontSize="large"
                      
                    />
                    <ListItemText
                      primary={convertirFecha(postulante.fecha_nac)}
                      secondary="Fecha de nacimiento"
                    />
                  </ListItem>
                  <ListItem>
                    <LocationOnOutlinedIcon
                      sx={{color: "#006982", marginRight: "0.5rem"}}
                      fontSize="large"
                     
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
                      sx={{color: "#006982", marginRight: "0.5rem"}}
                      fontSize="large"
                      
                    />
                    <ListItemText
                      primary={postulante.cp}
                      secondary="Código postal"
                    />
                  </ListItem>
                  {postulante.genero && (
                    <ListItem>
                      <TransgenderIcon
                        sx={{color: "#006982", marginRight: "0.5rem"}}
                        fontSize="large"
                        
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
                        sx={{color: "#006982", marginRight: "0.5rem"}}
                        fontSize="large"
                        
                      />
                      <ListItemText
                        primary={
                          <a
                            href={postulante.linkedIn}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {postulante.nombre + " " + postulante.apellido}
                          </a>
                        }
                        secondary="LinkedIn"
                      />
                    </ListItem>
                  )}
                  {postulante.portfolio && (
                    <ListItem>
                      <LanguageIcon
                        sx={{color: "#006982", marginRight: "0.5rem"}}
                        fontSize="large"
                        
                      />
                      <ListItemText
                        primary={
                          <a
                            href={postulante.portfolio}
                            target="_blank"
                            rel="noreferrer"
                            style={{ textDecoration: "none", color:"#00708a"}}
                          >
                            {acortarLink(postulante.portfolio)}
                          </a>
                        }
                        secondary="Portfolio o red social"
                      />
                    </ListItem>
                  )}
                  {postulante.discapacidad && (
                    <ListItem>
                      <AccessibilityIcon
                        sx={{color: "#006982", marginRight: "0.5rem"}}
                        fontSize="large"

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
                        sx={{color: "#006982", marginTop: "1rem"}}
                        
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
                  sx={{color: "#006982", marginTop: "1rem"}}
                
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
                      primary= {postulante.Estudios?.nombre_estudio + " " + postulante.Estudios?.estado_estudio}
                      secondary="Estudios"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={postulante.carrera}
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
                      secondary="¿Es estudiante de la UNAHUR?"
                    />
                  </ListItem>
                </List>
                {idiomasPostulante?.length > 0 && (
                  <>
                    <Divider sx={{ marginTop: "1rem" }} />
                    <Typography
                      variant="h5"
                      sx={{color: "#006982", marginTop: "1rem"}}
                      
                    >
                      Idiomas
                    </Typography>
                    <Grid container spacing={2}>
                      {idiomasPostulante.map(idioma => (
                        <Grid item key={idioma.id}>
                          <Chip
                            label={idioma.Idioma.nombre_idioma + " - " + idioma.Nivel.nivel}
                            icon={<TranslateIcon />}
                            sx={{ marginRight: "0.5rem" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                

                {habilidadesPostulante?.length > 0 && (
                  <>
                    <Divider sx={{ marginTop: "1rem" }} />
                    <Typography
                      variant="h5"
                      sx={{color: "#006982", marginTop: "1rem"}}
                   
                    >
                      Habilidades
                    </Typography>
                    <Grid container spacing={2}>
                      {habilidadesPostulante.map(habilidad => (
                        <Grid item key={habilidad.id}>
                          <Chip
                            label={habilidad.Aptitud.nombre_aptitud}
                            icon={<AccessibilityIcon />}
                            sx={{ marginRight: "0.5rem" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )}

                {
                  experienciaLaboral.length > 0 && (
                    <>
                      <Divider sx={{ marginTop: "1rem" }} />
                      <Typography
                        variant="h5"
                        sx={{color: "#006982", marginTop: "1rem"}}
                        
                      >
                        Experiencia laboral
                      </Typography>
                      <List>
                        {experienciaLaboral.map( experiencia => (
                          <ListItem key={experiencia.id}>
                            <Box sx={{ display: "flex", flexDirection:"column"}}>
                              <ListItemText
                                primary={experiencia.puesto}
                                secondary={experiencia.empresa}
                              />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{  }}
                              >
                                {convertirFecha(experiencia.fecha_inicio) +
                                  " - " +
                                  convertirFecha(experiencia.fecha_fin) + " ("  +  calcularTiempo(experiencia.fecha_inicio, experiencia.fecha_fin) +")"} 
                              </Typography>
                              
                              <Typography variant="body1" color="textPrimary" sx={{  }}>
                                {experiencia.descripcion}
                              </Typography>
                            

                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )
                }
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Postulante;
