import {
  Button,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";

import { getPostulacionesPorIdPostulante } from "../../../services/postulacionesId_service";
import { getPostulanteById } from "../../../services/postulantes_service";
import { deletePostulacion } from "../../../services/postulaciones_service";

import { Toaster, toast } from "sonner";

import { forwardRef, useEffect, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MisPostulaciones = () => {
  const [ofertas, setOfertas] = useState([]);
  const [postulante, setPostulante] = useState([]);
  const idUsuario = sessionStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchPostulante = async () => {
      const postulante = await getPostulanteById(idUsuario);
      setPostulante(postulante);
    };
    fetchPostulante();
  }, [idUsuario]);

  useEffect(() => {
    if (!postulante || !postulante.id) {
      return;
    }

    const fetchPostulaciones = async () => {
      try {
        const postulaciones = await getPostulacionesPorIdPostulante(
          0,
          20,
          postulante.id
        );

        if (
          postulaciones &&
          postulaciones.postulaciones &&
          postulaciones.postulaciones.rows
        ) {
          setOfertas(postulaciones.postulaciones.rows);
        } else {
          console.error(
            "La respuesta no tiene la estructura esperada:",
            postulaciones
          );
        }
      } catch (error) {
        console.error("Error al obtener las postulaciones:", error);
      }
    };

    fetchPostulaciones();
  }, [postulante]);

  const handleDeletePostulacion = (idPostulacion) => async () => {
    try {
      const response = await deletePostulacion(idPostulacion, token);
      if (response) {
        setOfertas(ofertas.filter((oferta) => oferta.id !== idPostulacion));
        toast.success("Postulación eliminada con éxito");
        handleClose();
      } else {
        handleClose();
        toast.error("Error al eliminar la postulación");
      }
    } catch (error) {
      console.error("Error al eliminar la postulación:", error);
      toast.error("Error al eliminar la postulación");
    }
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Mis postulaciones" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">Puesto</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Empresa</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Estado</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ofertas.map((oferta) => (
              <TableRow
                key={oferta.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    {oferta.Oferta?.titulo_oferta}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    {oferta.Empresa?.nombre_empresa}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircleIcon
                      fontSize="small"
                      sx={{
                        color: oferta.contactado === true ? "green" : "red",
                      }}
                    />
                    {oferta.contactado === true
                      ? "Contactado"
                      : "No contactado"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      margin: 1,
                      color: "white",
                      backgroundColor: "green",
                      "&:hover": {
                        backgroundColor: "green",
                        color: "white",
                      },
                    }}
                    href={`/oferta/${oferta.Oferta?.id}`}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "red",
                      borderColor: "red",
                      "&:hover": {
                        backgroundColor: "red",
                        color: "white",
                        borderColor: "red",
                      },
                    }}
                    onClick={handleClickOpen}
                  >
                    Eliminar
                  </Button>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    sx={
                      {
                        // Quitar el blur del fondo
                        // "& .MuiBackdrop-root": {
                        //   backgroundColor: "unset",
                        // },
                      }
                    }
                  >
                    <DialogTitle>
                      {"¿Estás seguro que deseas eliminar esta postulación?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Si eliminas esta postulación no podrás volver a
                        postularte a esta oferta.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button
                        onClick={handleDeletePostulacion(oferta.id)}
                        color="error"
                      >
                        Eliminar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Toaster richColors closeButton />
    </Card>
  );
};

export default MisPostulaciones;
