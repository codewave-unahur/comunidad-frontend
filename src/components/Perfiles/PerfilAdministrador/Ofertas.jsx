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
} from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";

import ofertasData from "../../Home/ofertas.json";
import { useState } from "react";

const Ofertas = () => {
  const { ofertas } = ofertasData;
  const [estadoOferta, setEstadoOferta] = useState("Ofertas activas");
  // Las ofertas pueden ser: Ofertas activas, Ofertas pendientes, Ofertas en revisión, Ofertas finalizadas

  return (
    <Card type="section" elevation={8}>
      <CardHeader title={estadoOferta} />
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
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "green",
              color: "white",
            },
            width: "200px",
            margin: 1,
          }}
          onClick={() => setEstadoOferta("Ofertas activas")}
        >
          Ofertas activas
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "orange",
            "&:hover": {
              backgroundColor: "orange",
              color: "white",
            },
            width: "200px",
            margin: 1,
          }}
          onClick={() => setEstadoOferta("Ofertas pendientes")}
        >
          Ofertas pendientes
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "red",
            "&:hover": {
              backgroundColor: "red",
              color: "white",
            },
            width: "200px",
            margin: 1,
          }}
          onClick={() => setEstadoOferta("Ofertas en revisión")}
        >
          Ofertas en revisión
        </Button>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
            width: "200px",
            margin: 1,
          }}
          onClick={() => setEstadoOferta("Ofertas finalizadas")}
        >
          Ofertas finalizadas
        </Button>
      </Stack>
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
                  <Typography variant="subtitle1">{oferta.puesto}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">{oferta.empresa}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    <CircleIcon
                      fontSize="small"
                      sx={{
                        verticalAlign: "middle",
                        color: oferta.estado === "Aprobado" ? "green" : "red",
                      }}
                    />
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

export default Ofertas;
