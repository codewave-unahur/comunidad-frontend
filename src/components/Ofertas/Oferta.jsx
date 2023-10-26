import Header from "../Header/Header";
import { getOfertaById } from "../../services/ofertas_service";
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
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";

import { postPostulacion } from "../../services/postulaciones_service";

import { Toaster, toast } from "sonner";

// import PreferenciasOferta from "./PreferenciasOferta";
import { getPostulacionesPorIdPostulante } from "../../services/postulacionesId_service";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Oferta = () => {
  const estaLogueado = sessionStorage.getItem("estaLogueado");
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const token = sessionStorage.getItem("token");

  const idOferta = parseInt(window.location.pathname.split("/")[2]);
  const [oferta, setOferta] = useState({});
  const [open, setOpen] = useState(false);
  const [postulaciones, setPostulaciones] = useState([]);

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
  }, [idOferta]);

  useEffect(() => {
    if (tipoUsuario === "postulante") {
      const traerPostulaciones = async () => {
        try {
          const response = await getPostulacionesPorIdPostulante(
            0,
            20,
            datosUsuario.id
          );
          setPostulaciones(response.postulaciones.rows);
        } catch (error) {
          console.log(error);
        }
      };
      traerPostulaciones();
    }
  }, [tipoUsuario, datosUsuario?.id]);

  const publicadoHace = (fecha) => {
    const fechaPublicacion = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual.getTime() - fechaPublicacion.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias;
  };

  const handleClickOpen = () => {
    estaLogueado === "true" ? setOpen(true) : (window.location.href = "/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostularme = async () => {
    if (estaLogueado === "true") {
      if (tipoUsuario === "postulante") {
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
              window.location.href = "/";
            }, 1500);
          }
        } catch (error) {
          console.log(error);
          toast.error("Error al postularse");
        }
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
          <Avatar
            src="https://cdn.discordapp.com/attachments/955646153297395722/996230598853148792/unknown.png"
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

          <CardContent>
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
              Publicado hace {publicadoHace(oferta.createdAt)} días
            </Typography>
            <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
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
            <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
              Descripción de la oferta
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={oferta.descripcion} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      Tareas a realizar:
                      <br />
                      Acá va la descripción de las tareas a realizar
                    </>
                  }
                />
              </ListItem>
            </List>
            <Divider sx={{ marginTop: "1rem" }} />
            <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
              Requisitos
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    oferta.edad_desde === null && oferta.edad_hasta === null ? (
                      "Rango etario: " + "No hay requisitos de edad"
                    ) : (
                      <>
                        Rango etario: {oferta.edad_desde} - {oferta.edad_hasta}{" "}
                        años
                      </>
                    )
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    "Experiencia previa: " + oferta.experiencia_previa_desc
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    "Estudios mínimos: " + oferta.Estudio?.nombre_estudio_estado
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={"Carrera: " + oferta.Carrera?.nombre_carrera}
                />
              </ListItem>
            </List>
            <Divider sx={{ marginTop: "1rem" }} />
            <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
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
                  primary={"Presencial, remoto, híbrido"}
                  secondary="Modalidad de trabajo"
                />
              </ListItem>
            </List>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={
              tipoUsuario === "empresa" || tipoUsuario === "admin"
                ? () => window.location.reload()
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
        </Card>
      </Container>
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
    </>
  );
};

export default Oferta;
