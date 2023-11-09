import Header from "../Header/Header";
import { useState, useEffect, forwardRef } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Slide,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  IconButton,
  Icon,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { Toaster, toast } from "sonner";

// import PreferenciasOferta from "./PreferenciasOferta";
import { getPostulacionesPorIdOferta, getPostulacionesPorIdOfertaTodas,activarPostulacion, marcarContactado } from "../../services/postulacionesId_service";
import { getOfertaById } from "../../services/ofertas_service";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Postulantes = () => {
  const estaLogueado = sessionStorage.getItem("estaLogueado");
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");
  const idOferta = window.location.pathname.split("/")[2];

  const [open, setOpen] = useState(false);
  const [postulaciones, setPostulaciones] = useState([]);
  const [nombreOferta, setNombreOferta] = useState("");
  const [postulacionElegida, setPostulacionElegida] = useState({});

  useEffect(() => {
    const traerPostulaciones = async () => {
      try {
        if (tipoUsuario === "empresa") {
          const response = await getPostulacionesPorIdOferta(0, 20, idOferta);
          setPostulaciones(response.postulaciones.rows);
        }
        else {
          const response = await getPostulacionesPorIdOfertaTodas(0, 20, idOferta);
          setPostulaciones(response.postulaciones.rows);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const traerOferta = async () => {
      try {
        const response = await getOfertaById(idOferta);
        setNombreOferta(response.titulo_oferta);
      } catch (error) {
        console.log(error);
      }
    };
    traerOferta();
    traerPostulaciones();
  }, [idOferta]);

  const handleClickOpen = () => {
    estaLogueado === "true" ? setOpen(true) : (window.location.href = "/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAction = () => {
    if (tipoUsuario === "empresa") {
      const response = marcarContactado(postulacionElegida.id)
      console.log(response)
      window.location.reload()
      toast.success("Postulante evaluado correctamente");
    }
    else {
      const response = activarPostulacion(postulacionElegida.id)
      console.log(response)
      window.location.reload()
      toast.success("Postulante evaluado correctamente");
    }
  }

  const handleColor = (contactado, estado_postulacion) => {
    if (tipoUsuario === "empresa") {
      let color = "orange"
      if (contactado === true) {
        color = "green";
      }
      if (contactado === false) {
        color = "red";
      }
      return color
    }  else {
      let color = "orange"
      if (estado_postulacion === true) {
        color = "green";
      }
      if (estado_postulacion === false) {
        color = "red";
      }
      return color
    }
  }

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
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
            title={"Postulantes a " + nombreOferta}
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
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h5">Nombre</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">DNI</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">Teléfono</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">CV</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">
                      Evaluación de postulante
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5">Acciones</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulaciones.map((postulacion) => (
                  <TableRow
                    key={postulacion.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {postulacion.Postulante?.nombre +
                          " " +
                          postulacion.Postulante?.apellido}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {postulacion.Postulante?.id}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle1">
                        {postulacion.Postulante?.telefono}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        href={postulacion.Postulante?.cv}
                        target="_blank"
                        sx={{
                          color: "green",
                          "&:hover": {
                            backgroundColor: "lightgrey",
                            color: "black",
                          },
                        }}
                      >
                        <PictureAsPdfIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <Icon
                        sx={{
                          color:
                          handleColor(postulacion.contactado, postulacion.estado_postulacion)
                        }}
                      >
                        {postulacion.contactado === true ? (
                          <CheckOutlinedIcon />
                        ) : postulacion.contactado === false ? (
                          <CloseOutlinedIcon />
                        ) : (
                          <PendingOutlinedIcon />
                        )}
                      </Icon>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{
                          color: "white",
                          backgroundColor: "green",
                          "&:hover": {
                            backgroundColor: "green",
                            color: "white",
                          },
                        }}
                        href={`/postulante/${postulacion.Postulante?.id}`}
                      >
                        Ver perfil
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        sx={{
                          margin: 1,
                        }}
                        onClick={() => {
                          setPostulacionElegida(postulacion);
                          handleClickAction();
                        }}
                      >
                        Evaluar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{
                          margin: 1,
                        }}
                      >
                        No evaluar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {postulaciones.length === 0 ? (
            <Typography
              variant="h4"
              sx={{ textAlign: "center", padding: "1rem", margin: "1rem" }}
            >
              Aun no hay postulantes para esta oferta
            </Typography>
          ) : null}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {"¿Está seguro que desea finalizar la oferta?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Si finaliza esta oferta no podrá volver a activarla.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button color="error">Finalizar</Button>
            </DialogActions>
          </Dialog>
          <Toaster richColors closeButton />
        </Card>
      </Container>

      <Toaster richColors closeButton />
    </>
  );
};

export default Postulantes;
