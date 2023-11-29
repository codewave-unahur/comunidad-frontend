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
  Grid,
  IconButton,
} from "@mui/material";

import { getPostulantes } from "../../../services/postulantes_service";
import { useEffect, useState } from "react";
import Buscador from "../../Buscador/Buscador";
import Paginacion from "../../Paginacion/Paginacion";
import FiltroAptitudes from "../../Filtros/FiltroAptitudes";
import FiltroPreferencias from "../../Filtros/FiltroPreferencias";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Postulantes = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const limite = 6;
  const [postulantes, setPostulantes] = useState([]);

  useEffect(() => {
    const traerPostulantes = async () => {
      const response = await getPostulantes(paginaActual - 1, limite, "id", "");
      setPostulantes(response.postulantes.rows);
      setTotalPaginas(response.totalPaginas);
    };
    traerPostulantes();
  }, [paginaActual]);

  const handleSubmit = async (e, buscador) => {
    e.preventDefault();
    setPaginaActual(1);
    const response = await getPostulantes(0, limite, "id", buscador);
    setPostulantes(response.postulantes.rows);
    setTotalPaginas(response.totalPaginas);
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader
        title="Listado de postulantes"
        action={
          <Buscador
            handleSubmit={handleSubmit}
            placeholder="Buscar postulante"
          />
        }
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      />
      <Grid
        container
        spacing={2}
        sx={{
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <Grid item xs={12} sm={6}>
          <FiltroAptitudes />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FiltroPreferencias />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "15%" }}>
                <Typography variant="h5">DNI</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                <Typography variant="h5">Nombre</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "25%" }}>
                <Typography variant="h5">Email</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "15%" }}>
                <Typography variant="h5">CV</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "20%" }}>
                <Typography variant="h5">Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postulantes.map((postulante) => (
              <TableRow
                key={postulante.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Typography variant="subtitle1">{postulante.id}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    {`${postulante.nombre} ${postulante.apellido}`}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    {postulante.Usuario?.usuario}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    <IconButton
                      href={postulante.cv}
                      disabled={postulante.cv === null}
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
                  </Typography>
                </TableCell>
                <TableCell align="center">
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
                    href={`/postulante/${postulante.id}`}
                  >
                    Ver postulante
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
  );
};

export default Postulantes;
