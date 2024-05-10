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
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

import { Toaster, toast } from "sonner";

import {
  getOfertas,
  getOfertaById,
  putOferta,
} from "../../../services/ofertas_service";
import { useEffect, useState, forwardRef } from "react";
import Buscador from "../../Buscador/Buscador";
import Paginacion from "../../Paginacion/Paginacion";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Ofertas = () => {
  const token = sessionStorage.getItem("token");

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const limite = 6;
  const [ofertas, setOfertas] = useState([]);
  const [estadoOferta, setEstadoOferta] = useState("Ofertas activas");
  const [open, setOpen] = useState(false);
  const [idOfertaAFinalizar, setIdOfertaAFinalizar] = useState(null);
  const [motivoCierre, setMotivoCierre] = useState(null);
  const [comentarioEmpresa, setComentarioEmpresa] = useState("");
  const [action, setAction] = useState(null);

  let estado =
    estadoOferta === "Ofertas activas"
      ? 1
      : estadoOferta === "Ofertas pendientes"
      ? 2
      : estadoOferta === "Ofertas en revisión"
      ? 3
      : estadoOferta === "Ofertas finalizadas"
      ? 4
      : null;

  const handleClickOpen = (ofertaID, action) => {
    setIdOfertaAFinalizar(ofertaID);
    setAction(action);
    setOpen(true);
    if (action === "cierre") {
      const traerMotivoCierre = async () => {
        const response = await getOfertaById(ofertaID, token);
        setMotivoCierre(response.check);
        setComentarioEmpresa(response.cierre);
      };
      traerMotivoCierre();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinalizarOferta = async (idOferta) => {
    let idEstado =
      action === "finalizar"
        ? "Finalizada"
        : action === "activar"
        ? "Activa"
        : action === "suspender"
        ? "Observada"
        : null;

    try {
      const response = await putOferta(idOferta, { estado: idEstado }, token);
      if (response === "OK") {
        toast.success(
          `La oferta se ha ${
            action === "finalizar"
              ? "finalizado"
              : action === "activar"
              ? "activado"
              : action === "suspender"
              ? "suspendido"
              : null
          } correctamente`
        );
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(
          `No se ha podido ${
            action === "finalizar"
              ? "finalizar"
              : action === "activar"
              ? "activar"
              : action === "suspender"
              ? "suspender"
              : null
          } la oferta`
        );
        handleClose();
      }
    } catch (error) {
      console.log("error", error);
      toast.error(
        `No se ha podido ${
          action === "finalizar"
            ? "finalizar"
            : action === "activar"
            ? "activar"
            : action === "suspender"
            ? "suspender"
            : null
        } la oferta`
      );
      handleClose();
    }
  };

  useEffect(() => {
    const traerOfertas = async () => {
      const response = await getOfertas(
        paginaActual - 1,
        limite,
        "",
        "id",
        estado
      );
      setOfertas(response.ofertas.rows);
      setTotalPaginas(response.totalPaginas);
    };
    traerOfertas();
    console.log(ofertas)
  }, [estado, paginaActual]);

  const handleSubmit = async (e, buscador) => {
    e.preventDefault();
    setPaginaActual(1);
    const response = await getOfertas(0, limite, buscador, "id", estado);
    setOfertas(response.ofertas.rows);
    setTotalPaginas(response.totalPaginas);
  };

  const handleChangeEstadoOferta = (e) => {
    setEstadoOferta(e.target.textContent);
    setPaginaActual(1);
    console.log(ofertas)
  };

  const botonVer = (oferta) => {
    return (
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
        Ver oferta
      </Button>
    );
  };

  const accionesOfertasActivas = (oferta) => {
    return (
      <>
        {botonVer(oferta)}
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
          sx={{
            color: "red",
            borderColor: "red",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
              borderColor: "red",
            },
          }}
          onClick={() => handleClickOpen(oferta.id, "finalizar")}
        >
          Finalizar
        </Button>
      </>
    );
  };

  const accionesOfertasPendientes = (oferta) => {
    return (
      <>
        {botonVer(oferta)}
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
          onClick={() => handleClickOpen(oferta.id, "activar")}
        >
          Activar
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
          onClick={() => handleClickOpen(oferta.id, "suspender")}
        >
          Suspender
        </Button>
      </>
    );
  };

  const accionesOfertasEnRevision = (oferta) => {
    return <>{botonVer(oferta)}</>;
  };

  const accionesOfertasFinalizadas = (oferta) => {
    return (
      <>
        {botonVer(oferta)}
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
          onClick={() => handleClickOpen(oferta.id, "cierre")}
        >
          Motivos de cierre
        </Button>
      </>
    );
  };

  const estadoMap = {
    activa: {
      name: "Ofertas activas",
      color: "green",
      actions: accionesOfertasActivas,
    },
    pendiente: {
      name: "Ofertas pendientes",
      color: "orange",
      actions: accionesOfertasPendientes,
    },
    observada: {
      name: "Ofertas en revisión",
      color: "red",
      actions: accionesOfertasEnRevision,
    },
    finalizada: {
      name: "Ofertas finalizadas",
      color: "black",
      actions: accionesOfertasFinalizadas,
    },
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader
        title={estadoOferta}
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
      <Stack
        component="header"
        my={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        textTransform="uppercase"
        paddingX={2}
      >
        {Object.entries(estadoMap).map(([key, { name, color }]) => (
          <Button
            key={key}
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: color,
              "&:hover": {
                backgroundColor: color,
                color: "white",
              },
              width: "200px",
              margin: 1,
            }}
            onClick={handleChangeEstadoOferta}
          >
            {name}
          </Button>
        ))}
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "40%" }}>
                <Typography variant="h5">Puesto</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                <Typography variant="h5">Empresa</Typography>
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
                  <Typography variant="subtitle1">
                    {oferta.Empresa?.nombre_empresa}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {estadoMap[oferta.Estado.nombre_estado].actions(oferta)}
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
          {action === "finalizar"
            ? "¿Está seguro que desea finalizar esta oferta?"
            : action === "activar"
            ? "¿Está seguro que desea activar esta oferta?"
            : action === "suspender"
            ? "¿Está seguro que desea suspender esta oferta?"
            : action === "cierre"
            ? "Motivos de cierre"
            : null}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {action === "finalizar" ? (
              "Una vez finalizada, la oferta no podrá ser modificada"
            ) : action === "activar" ? (
              "Una vez activada, la oferta podrá ser vista por los postulantes"
            ) : action === "suspender" ? (
              "Una vez suspendida, la oferta no podrá ser vista por los postulantes"
            ) : action === "cierre" ? (
              <>
                {motivoCierre}
                <br />
                <br />
                <strong>Comentario de la empresa:</strong>
                <br />
                {comentarioEmpresa
                  ? comentarioEmpresa
                  : "No hay comentarios por parte de la empresa"}
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {action === "cierre" ? null : "Cancelar"}
          </Button>
          <Button
            onClick={
              action === "cierre"
                ? () => handleClose()
                : () => handleFinalizarOferta(idOfertaAFinalizar)
            }
            color={
              action === "finalizar"
                ? "error"
                : action === "activar"
                ? "success"
                : action === "suspender"
                ? "error"
                : "primary"
            }
          >
            {action === "finalizar"
              ? "Finalizar"
              : action === "activar"
              ? "Activar"
              : action === "suspender"
              ? "Suspender"
              : action === "cierre"
              ? "Aceptar"
              : null}
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster richColors closeButton />
    </Card>
  );
};

export default Ofertas;
