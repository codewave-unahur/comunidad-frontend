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
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { getEmpresas, putEmpresa } from "../../../services/empresas_service";
import { useEffect, useState, forwardRef } from "react";
import Buscador from "../../Buscador/Buscador";

import { Toaster, toast } from "sonner";
import Paginacion from "../../Paginacion/Paginacion";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Empresas = () => {
  const token = sessionStorage.getItem("token");

  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const limite = 6;
  const [open, setOpen] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [idEmpresaAActivar, setIdEmpresaAActivar] = useState(null);
  const [nombreEmpresaAActivar, setNombreEmpresaAActivar] = useState(null);
  const [estadoEmpresa, setEstadoEmpresa] = useState("Empresas activas");
  let estado =
    estadoEmpresa === "Empresas activas"
      ? 1
      : estadoEmpresa === "Empresas pendientes"
      ? 2
      : 1;

  useEffect(() => {
    const traerEmpresas = async () => {
      const response = await getEmpresas(
        paginaActual - 1,
        limite,
        "id",
        estado,
        ""
      );
      setEmpresas(response.empresas.rows);
      setTotalPaginas(response.totalPaginas);
    };
    traerEmpresas();
  }, [estado, paginaActual]);

  const handleClickOpen = (empresaID, empresaNombre) => {
    setIdEmpresaAActivar(empresaID);
    setNombreEmpresaAActivar(empresaNombre);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const activarEmpresa = (id) => async () => {
    const estadoActivo = {
      idEstado: 1,
    };

    try {
      const response = await putEmpresa(id, estadoActivo, token);
      if (response) {
        toast.success("La empresa fue activada con éxito.");
        setEmpresas(empresas.filter((empresa) => empresa.id !== id));
        setOpen(false);
      } else {
        toast.error("No se pudo activar la empresa.");
      }
    } catch (error) {
      toast.error("No se pudo activar la empresa.");
    }
  };

  const handleSubmit = async (e, buscador) => {
    e.preventDefault();
    setPaginaActual(1);
    const response = await getEmpresas(0, limite, "id", estado, buscador);
    setEmpresas(response.empresas.rows);
    setTotalPaginas(response.totalPaginas);
  };

  const handleChangeEstadoEmpresa = (e) => {
    setEstadoEmpresa(e.target.textContent);
    setPaginaActual(1);
  };

  return (
    <>
      <Card type="section" elevation={8}>
        <CardHeader
          title={estadoEmpresa}
          action={
            <Buscador
              handleSubmit={handleSubmit}
              placeholder="Buscar empresa"
            />
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
          justifyContent="flex-start"
          alignItems="center"
          flexWrap="wrap"
          textTransform="uppercase"
          paddingX={2}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#28a745",
              "&:hover": {
                backgroundColor: "#28a745",
                color: "white",
              },
              width: "220px",
              margin: 1,
            }}
            onClick={handleChangeEstadoEmpresa}
          >
            Empresas activas
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "#f0ad4e",
              "&:hover": {
                backgroundColor: "#f0ad4e",
                color: "white",
              },
              width: "220px",
              margin: 1,
            }}
            onClick={handleChangeEstadoEmpresa}
          >
            Empresas pendientes
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">CUIT</Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">Nombre</Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">Representante</Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">Email</Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">Acciones</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empresas.map((empresa) => (
                <TableRow
                  key={empresa.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Typography variant="subtitle1">{empresa.id}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {empresa.nombre_empresa}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {empresa.nombre_representante}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1">
                      {empresa.email_representante}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {estadoEmpresa === "Empresas pendientes" ? (
                      <Button
                        variant="contained"
                        onClick={() =>
                          handleClickOpen(empresa.id, empresa.nombre_empresa)
                        }
                        sx={{
                          color: "white",
                          backgroundColor: "#28a745",
                          "&:hover": {
                            backgroundColor: "#28a745",
                            color: "white",
                            opacity: 0.8,
                          },
                        }}
                      >
                        Activar
                      </Button>
                    ) : null}
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
                      href={`/empresa/${empresa.id}`}
                    >
                      Ver empresa
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
      </Card>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          {"¿Está seguro que desea activar la empresa "}
          <b>{nombreEmpresaAActivar}</b>?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Una vez activada, la empresa podrá publicar ofertas laborales.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            No, cancelar.
          </Button>
          <Button
            onClick={activarEmpresa(idEmpresaAActivar)}
            autoFocus
            color="success"
          >
            Sí, activar.
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster richColors closeButton />
    </>
  );
};

export default Empresas;
