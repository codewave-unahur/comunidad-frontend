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
} from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";

import { useEffect, useState } from "react";

import { getOfertaByCuit } from "../../../services/ofertas_service";

const VerOfertas = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));

  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const traerOfertas = async () => {
      const response = await getOfertaByCuit(0, "", 20, datosUsuario.id);
      setOfertas(response.ofertas.rows);
    };
    traerOfertas();
  }, [datosUsuario.id]);

  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Ofertas de trabajo" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">Puesto</Typography>
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
                  >
                    Ver postulantes
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={oferta.Estado?.nombre_estado === "finalizada"}
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
      </TableContainer>
    </Card>
  );
};

export default VerOfertas;
