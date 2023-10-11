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

import { getEmpresas } from "../../../services/empresas_service";
import { useEffect, useState } from "react";

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [estadoOferta, setEstadoOferta] = useState("Empresas activas");
  let estado =
    estadoOferta === "Empresas activas"
      ? 1
      : estadoOferta === "Empresas pendientes"
      ? 2
      : 1;

  useEffect(() => {
    const traerEmpresas = async () => {
      const response = await getEmpresas(0, 20, "id", estado, "");
      setEmpresas(response.empresas.rows);
    };
    traerEmpresas();
  }, [estado]);

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
            width: "220px",
            margin: 1,
          }}
          onClick={() => setEstadoOferta("Empresas activas")}
        >
          Empresas activas
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
            width: "220px",
            margin: 1,
          }}
          onClick={() => setEstadoOferta("Empresas pendientes")}
        >
          Empresas pendientes
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">CUIT</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Nombre</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Representante</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Email</Typography>
              </TableCell>
              <TableCell align="center">
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
                    Ver empresa
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

export default Empresas;
