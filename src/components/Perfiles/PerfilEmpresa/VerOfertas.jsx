import {
  Box,
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
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";
import LockIcon from "@mui/icons-material/Lock";
import { forwardRef, useEffect, useState } from "react";

import { getOfertaByCuit, putOferta } from "../../../services/ofertas_service";

import { Toaster, toast } from "sonner";
import Buscador from "../../Buscador/Buscador";
import Paginacion from "../../Paginacion/Paginacion";
import { EncryptStorage } from "encrypt-storage";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VerOfertas = () => {
  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });
  const datosUsuario = encryptStorage.getItem("datosUsuario");
  const token = sessionStorage.getItem("token");

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const limite = 6;
  const [ofertas, setOfertas] = useState([]);
  const [open, setOpen] = useState(false);
  const [idOfertaAFinalizar, setIdOfertaAFinalizar] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [motivoCheck, setMotivoCheck] = useState("");

  const handleMotivoCheck = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setMotivoCheck(name);
    } else {
      setMotivoCheck("");
    }
  };

  const handleClickOpen = (ofertaID) => {
    setIdOfertaAFinalizar(ofertaID);
    setOpen(true);
  };

  const handleClose = () => {
    setMotivo("");
    setMotivoCheck("");
    setOpen(false);
  };

  const handleFinalizarOferta = (idOferta) => async () => {
    if (!motivoCheck) {
      toast.error("Debe seleccionar un motivo para finalizar la oferta");
      return;
    }

    try {
      const response = await putOferta(
        idOferta,
        { idEstado:5, cierre: motivo, check: motivoCheck },
        token
      );
      if (response === "OK") {
        toast.success("Oferta finalizada con éxito");
        handleClose();
        setOfertas(
          ofertas.map((oferta) => {
            if (oferta.id === idOferta) {
              oferta.estado = "Finalizada";
            }
            return oferta;
          })
        );
        setMotivo("");
        setMotivoCheck("");
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
        limite,
        datosUsuario.id,
        ""
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
      limite,
      datosUsuario.id,
      busqueda
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

      {datosUsuario.Estado.id === 2 ? 
      (
        <>
          <Box padding={2} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2
          }}>
            <LockIcon fontSize="large" sx={{
              color: "#f44336"
            }} />
            <Typography variant="h5" gutterBottom>
              No puedes ver ofertas si tu cuenta no ha sido verificada. Por favor, contacta al administrador.
            </Typography>
          </Box>
        </>
      ) :<TableContainer component={Paper}>
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
                          oferta.Estado.nombre_estado === "activa"
                            ? "#28a745"
                            : oferta.Estado.nombre_estado === "observada"
                            ? "red"
                            : oferta.Estado.nombre_estado === "pendiente"
                            ? "orange"
                            : "black",
                      }}
                    />
                    {oferta.Estado.nombre_estado}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#28a745",
                      "&:hover": {
                        backgroundColor: "#28a745",
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
                      color: "#28a745",
                      borderColor: "#28a745",
                      "&:hover": {
                        backgroundColor: "lightgrey",
                        color: "black",
                        borderColor: "#28a745",
                      },
                    }}
                    disabled={oferta.Estado.nombre_estado === "pendiente" || oferta.Estado.nombre_estado === "observada"}
                    href={`/postulantes/${oferta.id}`}
                  >
                    Ver postulantes
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={oferta.estado === "Finalizada"}
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
      </TableContainer>}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {"¿Está seguro que desea finalizar la oferta?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Si finaliza esta oferta no podrá volver a activarla.
          </DialogContentText>
          <FormGroup
            sx={{
              marginY: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    motivoCheck ===
                    "La oferta se concreto dentro de la comunidad"
                  }
                  onChange={handleMotivoCheck}
                  name="La oferta se concreto dentro de la comunidad"
                />
              }
              label="La oferta se concreto dentro de la comunidad"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    motivoCheck ===
                    "La oferta se concreto fuera de la comunidad"
                  }
                  onChange={handleMotivoCheck}
                  name="La oferta se concreto fuera de la comunidad"
                />
              }
              label="La oferta se concreto fuera de la comunidad"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={motivoCheck === "La oferta no se concreto"}
                  onChange={handleMotivoCheck}
                  name="La oferta no se concreto"
                />
              }
              label="La oferta no se concreto"
            />
          </FormGroup>
          <TextField
            autoFocus
            margin="dense"
            id="motivo"
            label="Motivo del cierre (opcional)"
            type="text"
            fullWidth
            variant="standard"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
          />
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
