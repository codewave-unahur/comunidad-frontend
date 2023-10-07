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
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VerifiedIcon from "@mui/icons-material/Verified";

import { postPostulacion } from "../../services/postulaciones_service";

import { Toaster, toast } from "sonner";

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

  const publicadoHace = (fecha) => {
    const fechaPublicacion = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual.getTime() - fechaPublicacion.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias;
  };

  const handleClickOpen = () => {
    setOpen(true);
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
          }}
        >
          <CardHeader
            title={oferta.titulo_oferta}
            subheader={oferta.zona_trabajo}
            sx={{
              "& .MuiTypography-h5": {
                fontSize: "2rem",
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
            </List>
            <Divider sx={{ marginTop: "1rem" }} />
            <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
              Detalles de la oferta
            </Typography>
            <List>
              <ListItem>
                <AttachMoneyIcon
                  color="primary"
                  fontSize="large"
                  sx={{
                    marginRight: "0.5rem",
                  }}
                />
                <ListItemText
                  primary={oferta.remuneracion}
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
                <VerifiedIcon
                  color="primary"
                  fontSize="large"
                  sx={{
                    marginRight: "0.5rem",
                  }}
                />
                <ListItemText
                  primary={oferta.beneficios}
                  secondary="Beneficios"
                />
              </ListItem>
            </List>
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={
              tipoUsuario === "empresa" || tipoUsuario === "admin"
                ? console.log("Editar oferta")
                : handleClickOpen
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
