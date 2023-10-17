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

import { getPostulantes } from "../../../services/postulantes_service";
import { useEffect, useState } from "react";
import Buscador from "../../Buscador/Buscador";

const Postulantes = () => {
  const [postulantes, setPostulantes] = useState([]);

  useEffect(() => {
    const traerPostulantes = async () => {
      const response = await getPostulantes(0, 20, "id", "");
      setPostulantes(response.postulantes.rows);
    };
    traerPostulantes();
  }, []);

  const handleSubmit = async (e, buscador) => {
    e.preventDefault();
    const response = await getPostulantes(0, 20, "id", buscador);
    setPostulantes(response.postulantes.rows);
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h5">DNI</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Nombre</Typography>
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
      </TableContainer>
    </Card>
  );
};

export default Postulantes;
