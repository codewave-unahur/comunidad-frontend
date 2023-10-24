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

import { forwardRef, useEffect, useState } from "react";

import { getOfertaByCuit, putOferta } from "../../../services/ofertas_service";

import { Toaster, toast } from "sonner";
import Buscador from "../../Buscador/Buscador";
import Paginacion from "../../Paginacion/Paginacion";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VerOfertas = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const token = sessionStorage.getItem("token");

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const limite = 6;
  const [ofertas, setOfertas] = useState([]);
  const [open, setOpen] = useState(false);
  const [idOfertaAFinalizar, setIdOfertaAFinalizar] = useState(null);
  const handleClickOpen = (ofertaID) => {
    setIdOfertaAFinalizar(ofertaID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinalizarOferta = (idOferta) => async () => {
    try {
      const response = await putOferta(
        idOferta,
        {
          idEstado: 5,
        },
        token
      );
      if (response === "OK") {
        toast.success("Oferta finalizada con éxito");
        handleClose();
        setOfertas(
          ofertas.map((oferta) => {
            if (oferta.id === idOferta) {
              oferta.Estado = { id: 5, nombre_estado: "finalizada" };
            }
            return oferta;
          })
        );
      } else {
        toast.error("Error al finalizar la oferta");
        handleClose();
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error al finalizar la oferta");
      handleClose();
    }
  };

  useEffect(() => {
    const traerOfertas = async () => {
      const response = await getOfertaByCuit(
        paginaActual - 1,
        "",
        limite,
        datosUsuario.id
      );
      setOfertas(response.ofertas.rows);
      setTotalPaginas(response.totalPaginas);
    };
    traerOfertas();
  }, [datosUsuario.id, paginaActual]);

  const handleSubmit = async (e, busqueda) => {
    e.preventDefault();
    const response = await getOfertaByCuit(
      paginaActual - 1,
      busqueda,
      limite,
      datosUsuario.id
    );
    setOfertas(response.ofertas.rows);
    setTotalPaginas(response.totalPaginas);
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader
        title="Ofertas de trabajo"
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
              <TableCell align="center" sx={{ width: "40%" }}>
                <Typography variant="h5">Puesto</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                <Typography variant="h5">Estado</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "40%" }}>
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
                    {oferta.titulo_oferta}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <CircleIcon
                      fontSize="small"
                      sx={{
                        verticalAlign: "middle",
                        color:
                          oferta.Estado?.nombre_estado === "activa"
                            ? "green"
                            : oferta.Estado?.nombre_estado === "pendiente"
                            ? "orange"
                            : "black",
                      }}
                    />
                    {oferta.Estado?.nombre_estado[0].toUpperCase() +
                      oferta.Estado?.nombre_estado.slice(1)}
                  </Typography>
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
                    href={`/oferta/${oferta.id}`}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      margin: 1,
                      color: "green",
                      borderColor: "green",
                      "&:hover": {
                        backgroundColor: "lightgrey",
                        color: "black",
                        borderColor: "green",
                      },
                    }}
                    href={`/postulantes/${oferta.id}`}
                  >
                    Ver postulantes
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={oferta.Estado?.id === 5}
                    onClick={() => handleClickOpen(oferta.id)}
                    sx={{
                      color: "red",
                      borderColor: "red",
                      "&:hover": {
                        backgroundColor: "red",
                        color: "white",
                        borderColor: "red",
                      },
                    }}
                  >
                    Finalizar
                  </Button>
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
          {"¿Está seguro que desea finalizar la oferta?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Si finaliza esta oferta no podrá volver a activarla.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={handleFinalizarOferta(idOfertaAFinalizar)}
            color="error"
          >
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster richColors closeButton />
    </Card>
  );
};

export default VerOfertas;
