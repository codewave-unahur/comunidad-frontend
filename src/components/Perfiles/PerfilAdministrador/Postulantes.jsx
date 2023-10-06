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

import postulantesData from "../../Home/postulantes.json";

const Postulantes = () => {
  const { postulantes } = postulantesData;
  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Listado de postulantes" />
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
                  <Typography variant="subtitle1">{postulante.dni}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    {`${postulante.nombre} ${postulante.apellido}`}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    {postulante.email}
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
