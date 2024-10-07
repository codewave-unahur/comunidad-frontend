import Header from "../Header/Header";
import { useState, useEffect, forwardRef } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Slide,
  Avatar,
  Skeleton,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";

import { getOfertaById } from "../../services/ofertas_service";
import { postPostulacion } from "../../services/postulaciones_service";

import { Toaster, toast } from "sonner";
import { EncryptStorage } from "encrypt-storage";
// import PreferenciasOferta from "./PreferenciasOferta";
import { getPostulacionesPorIdPostulante } from "../../services/postulacionesId_service";
import Footer from "../Footer/Footer";
import Spinner from "../Template/Spinner";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Oferta = () => {


  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const estaLogueado = encryptStorage.getItem("estaLogueado");
  const tipoUsuario = encryptStorage.getItem("tipoUsuario");
  const datosUsuario = encryptStorage.getItem("datosUsuario");
  const token = sessionStorage.getItem("token");
  const idOferta = parseInt(window.location.pathname.split("/")[2]);
  const [oferta, setOferta] = useState({});
  const [open, setOpen] = useState(false);
  const [postulaciones, setPostulaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const traerOferta = async () => {
      try {
        const response = await getOfertaById(idOferta);
        setOferta(response);
      } catch (error) {
        console.log(error);
      }
    };
    traerOferta();
    setIsLoading(false);
  }, [idOferta]);

  useEffect(() => {
    if (tipoUsuario === "postulante") {
      const traerPostulaciones = async () => {
        try {
          const response = await getPostulacionesPorIdPostulante(
            0,
            20,
            datosUsuario.id,
            ""
          );
          setPostulaciones(response.postulaciones.rows);
        } catch (error) {
          console.log(error);
        }
      };
      traerPostulaciones();
      setIsLoading(false);

    }
  }, [tipoUsuario, datosUsuario?.id]);

  const publicadoHace = (fecha) => {
    const fechaPublicacion = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaPublicacion;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor(diferencia / (1000 * 60));

    if (dias > 0) {
      return dias === 1 ? "1 día" : `${dias} días`;
    } else if (horas > 0) {
      return horas === 1 ? "1 hora" : `${horas} horas`;
    }
    return minutos === 1 ? "1 minuto" : `${minutos} minutos`;
  };


  const handleClickOpen = () => {
    estaLogueado ? setOpen(true) : (window.location.href = "/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostularme = async () => {
    if (estaLogueado) {
      if (tipoUsuario === "postulante" && datosUsuario.cv !== "") {
        const postulacion = {
          postulante: datosUsuario.id,
          oferta: oferta.id,
          empresa: oferta.Empresa?.id,
        };
        try {
          const response = await postPostulacion(postulacion, token);
          if (response) {
            toast.success("Postulación exitosa");
            setTimeout(() => {
              window.location.reload();
            }, 200);
          }
        } catch (error) {
          console.log(error);        
        }
      } else if (tipoUsuario === "postulante" && datosUsuario.cv === "") {
        toast.error("Para postularte a una oferta, primero debes cargar tu CV");
        setTimeout(() => {
          window.location.href = "/perfil?section=curriculumVitae";
        }, 2000);
      }
      } else {
      window.location.href = "/login";
    }
  };

  const estaPostulado = postulaciones.some(
    (postulacion) => postulacion.fk_id_oferta === idOferta
  );

  return (
    <>
      <Header />
      {isLoading ? <Spinner /> :
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
              <Skeleton variant="text" width="60%" />
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
                src={oferta.Empresa?.logo}
                alt={oferta.Empresa?.nombre_empresa}
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "5rem",
                  width: 170,
                  height: 170,
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              />
              <CardHeader
                title={oferta.titulo_oferta}
                subheader={
                  <>
                    {oferta.zona_trabajo} {/*<PreferenciasOferta />*/}
                  </>
                }
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
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="70%" />
                <Divider sx={{ marginTop: "1rem" }} />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="30%" />
                <Divider sx={{ marginTop: "1rem" }} />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="60%" />
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
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ alignItems: "center", display: "flex" }}
                >
                  <CalendarMonthIcon
                    color="primary"
                    fontSize="medium"
                    sx={{
                      marginRight: "0.5rem",
                    }}
                  />
                  Publicado hace {publicadoHace(oferta.createdAt)}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Información de la empresa
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary={oferta.Empresa?.nombre_empresa} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={oferta.Empresa?.descripcion} />
                  </ListItem>
                </List>
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Descripción de la oferta
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary={oferta.descripcion} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={
                      <>
                        Rubro:
                        <br />
                        {oferta.RubroOferta?.nombre || "No especificado"}
                      </>
                    } />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <>
                          Tareas a realizar:
                          <br />
                          {oferta.otros_detalles || "No especificado"}
                        </>
                      }
                    />
                  </ListItem>
                </List>
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Requisitos
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        oferta.edad_desde === null &&
                        oferta.edad_hasta === null ? (
                          "Rango etario: " + "No hay requisitos de edad"
                        ) : (
                          <>
                            Rango etario: {oferta.edad_desde} -{" "}
                            {oferta.edad_hasta} años
                          </>
                        )
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        "Experiencia previa: " +
                        (oferta.experiencia_previa_desc === null
                          ? "No se requiere experiencia previa"
                          : oferta.experiencia_previa_desc)
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        "Estudios mínimos: " +
                        oferta.Estudio?.nombre_estudio
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        "Carrera: " +
                        (oferta.carrera || "No especificado")
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        "Idiomas: " +
                        ((oferta.Idiomas?.length > 0 &&
                          oferta.Idiomas?.map(
                            (idioma) =>
                              " " +
                              idioma["Idiomas de oferta"].nombre_idioma +
                              " (Nivel oral: " +
                              idioma["Idiomas de oferta"].nivel_oral +
                              " - Nivel escrito: " +
                              idioma["Idiomas de oferta"].nivel_escrito +
                              ")"
                          )) ||
                          "No especificado")
                      }
                    />
                  </ListItem>
                </List>
                {/*oferta.Aptitudes?.length > 0 && (
                  <>
                    <Divider sx={{ marginTop: "1rem" }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ marginTop: "1rem" }}
                    >
                      Aptitudes
                    </Typography>
                    <Grid container spacing={1} sx={{ marginTop: "0.5rem" }}>
                      {oferta.Aptitudes?.map((aptitud, index) => (
                        <Grid item key={index}>
                          <Chip
                            label={
                              aptitud["Aptitudes de oferta"].nombre_aptitud
                            }
                            sx={{ marginRight: "0.5rem" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )*/}
                {/*oferta.Preferencias?.length > 0 && (
                  <>
                    <Divider sx={{ marginTop: "1rem" }} />
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ marginTop: "1rem" }}
                    >
                      Preferencias
                    </Typography>
                    <Grid container spacing={1} sx={{ marginTop: "0.5rem" }}>
                      {oferta.Preferencias?.map((preferencia, index) => (
                        <Grid item key={index}>
                          <Chip
                            label={
                              preferencia["Preferencia de oferta"]
                                .nombre_preferencia
                            }
                            sx={{ marginRight: "0.5rem" }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </>
                )*/}
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Detalles de la oferta
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
                    <AttachMoneyIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={oferta.remuneracion || "No especificado"}
                      secondary="Salario"
                    />
                  </ListItem>
                  <ListItem>
                    <ScheduleIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={`De ${oferta.horario_laboral_desde}hs a ${oferta.horario_laboral_hasta}hs`}
                      secondary="Horario"
                    />
                  </ListItem>
                  <ListItem>
                    <WorkOutlineIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={oferta.Contrato?.nombre_contrato}
                      secondary="Tipo de contrato"
                    />
                  </ListItem>
                  <ListItem>
                    <WorkHistoryOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={oferta.Jornada?.nombre_jornada}
                      secondary="Jornada"
                    />
                  </ListItem>
                  <ListItem>
                    <VerifiedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={oferta.beneficios || "No especificado"}
                      secondary="Beneficios"
                    />
                  </ListItem>
                  <ListItem>
                    <MapsHomeWorkOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={oferta.modalidad_de_trabajo || "No especificado"}
                      secondary="Modalidad de trabajo"
                    />
                  </ListItem>
                </List>
              </>
            )}
          </CardContent>
          {isLoading ? (
            <Skeleton
              variant="rounded"
              width="50%"
              height={50}
              sx={{
                margin: "1rem",
                padding: "0.5rem",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
          ) : (
           tipoUsuario === "admin" ? null : <Button
              variant="contained"
              color="primary"
              onClick={
                tipoUsuario === "empresa" || tipoUsuario === "admin"
                  ? () => {
                      window.location.href = `/oferta/editar/${idOferta}`;
                    }
                  : handleClickOpen
              }
              disabled={
                tipoUsuario === "empresa" || tipoUsuario === "admin"
                  ? false
                  : tipoUsuario === "postulante" && estaPostulado
                  ? true
                  : false
              }
              sx={{
                margin: "1rem",
                padding: "0.5rem",
                width: {
                  xs: "90%",
                  sm: "50%",
                },
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            >
              {tipoUsuario === "empresa" || tipoUsuario === "admin"
                ? "Editar oferta"
                : tipoUsuario === "postulante" && estaPostulado
                ? "Ya estás postulado"
                : "Postularme"}
            </Button>
          )}
        </Card>
      </Container>
      }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          ¿Estás seguro que deseas postularte a {oferta.titulo_oferta}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si te postulas a esta oferta, la empresa podrá ver tu perfil y
            contactarte.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            No, cancelar postulación.
          </Button>
          <Button
            onClick={() => {
              handlePostularme();
            }}
            autoFocus
            color="success"
          >
            Si, postularme.
          </Button>
        </DialogActions>
      </Dialog>

      <Toaster richColors closeButton />
      <Footer/>
       
    </>
  );
};

export default Oferta;
