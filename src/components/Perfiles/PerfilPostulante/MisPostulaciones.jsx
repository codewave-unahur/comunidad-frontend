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

import { getPostulacionesPorIdPostulante } from "../../../services/postulacionesId_service";
import { getPostulanteById } from "../../../services/postulantes_service";
import { deletePostulacion } from "../../../services/postulaciones_service";

import { Toaster, toast } from "sonner";

import { forwardRef, useEffect, useState } from "react";
import Buscador from "../../Buscador/Buscador";
import Paginacion from "../../Paginacion/Paginacion";
import { EncryptStorage } from "encrypt-storage";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MisPostulaciones = () => {

  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });
  
  const [ofertas, setOfertas] = useState([]);
  const [postulante, setPostulante] = useState([]);
  const idUsuario = encryptStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [idOfertaParaEliminar, setIdOfertaParaEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const limite = 6;

  const handleClickOpen = (ofertaID) => {
    setIdOfertaParaEliminar(ofertaID);
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
          paginaActual - 1,
          limite,
          postulante.id,
          ""
        );
        if (
          postulaciones &&
          postulaciones.postulaciones &&
          postulaciones.postulaciones.rows
        ) {
          setOfertas(postulaciones.postulaciones.rows);
          setTotalPaginas(postulaciones.totalPaginas);
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
  }, [postulante, paginaActual]);

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

  const handleSubmit = async (e, buscador) => {
    e.preventDefault();
    setPaginaActual(1);
    const response = await getPostulacionesPorIdPostulante(
      0,
      limite,
      postulante.id,
      buscador
    );
    setOfertas(response.postulaciones.rows);
    setTotalPaginas(response.totalPaginas);
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader
        title="Mis postulaciones"
        action={
          <Buscador handleSubmit={handleSubmit} placeholder="Buscar oferta" />
        }
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "30%" }}>
                <Typography variant="h5">Puesto</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                <Typography variant="h5">Empresa</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "30%" }}>
                <Typography variant="h5">Estado</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "30%" }}>
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
                  <Typography variant="subtitle1">
                    {
                      oferta.Estado.nombre_estado === "pendiente" ? "Pendiente de revisión" :
                      oferta.Estado.nombre_estado === "aceptado" ? "Aceptado" :
                      oferta.Estado.nombre_estado === "en proceso" ? "En proceso de selección" :
                      "Rechazado"
                    }
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      margin: 1,
                      color: "white",
                      backgroundColor: "#28a745",
                      "&:hover": {
                        backgroundColor: "#28a745",
                        color: "white",
                      },
                    }}
                    href={`/oferta/${oferta.Oferta?.id}`}
                  >
                    Ver
                  </Button>
                  {/*<Button
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
                    onClick={() => handleClickOpen(oferta.id)}
                  >
                    Eliminar
                  </Button>*/}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={setPaginaActual}
        />
      </TableContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"¿Estás seguro que deseas eliminar esta postulación?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Si eliminas esta postulación no podrás volver a postularte a esta
            oferta.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {<Button
            onClick={handleDeletePostulacion(idOfertaParaEliminar)}
            color="error"
          >
            Eliminar
          </Button>}
        </DialogActions>
      </Dialog>
      <Toaster richColors closeButton />
    </Card>
  );
};

export default MisPostulaciones;
