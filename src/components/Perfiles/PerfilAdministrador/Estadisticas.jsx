import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { getUsuarios } from "../../../services/usuarios_service";
import { getEmpresasSinFiltros } from "../../../services/empresas_service";
import { getPostulantesSinFiltros } from "../../../services/postulantes_service";
import { getPostulaciones } from "../../../services/postulaciones_service";
import {
  getOfertas,
  getOfertasSinFiltros,
} from "../../../services/ofertas_service";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const Estadisticas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [postulantes, setPostulantes] = useState([]);
  const [postulantesUNAHUR, setPostulantesUNAHUR] = useState([]);
  const [postulaciones, setPostulaciones] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [postulacionesAceptadasAdmin, setPostulacionesAceptadasAdmin] =
    useState([]);
  const [postulacionesRechazadasAdmin, setPostulacionesRechazadasAdmin] =
    useState([]);
  const [postulacionesAceptadasEmpresa, setPostulacionesAceptadasEmpresa] =
    useState([]);
  const [postulacionesRechazadasEmpresa, setPostulacionesRechazadasEmpresa] =
    useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    const traerUsuarios = async () => {
      const response = await getUsuarios();
      if (response) {
        setUsuarios(response.usuarios.length);
      }
    };
    const traerEmpresas = async () => {
      const response = await getEmpresasSinFiltros();
      if (response) {
        setEmpresas(response.empresas.length);
      }
    };
    const traerPostulantes = async () => {
      const response = await getPostulantesSinFiltros();
      if (response) {
        setPostulantes(response.postulantes.count);
      }
    };

    const traerPostulantesUNAHUR = async () => {
      const response = await getPostulantesSinFiltros();
      if (response) {
        setPostulantesUNAHUR(
          response.postulantes.rows.filter(
            (postulante) => postulante.alumno_unahur === true
          ).length
        );
      }
    };

    const traerPostulaciones = async () => {
      const response = await getPostulaciones();
      if (response) {
        setPostulaciones(response.postulaciones.length);
        setPostulacionesAceptadasAdmin(
          response.postulaciones.filter(
            (postulacion) =>
              postulacion.Estado.nombre_estado === "desestimado" ||
              postulacion.Estado.nombre_estado === "en proceso" ||
              postulacion.Estado.nombre_estado === "aceptado"
          ).length
        );
        setPostulacionesRechazadasAdmin(
          response.postulaciones.filter(
            (postulacion) => postulacion.Estado.nombre_estado === "rechazado"
          ).length
        );
        setPostulacionesAceptadasEmpresa(
          response.postulaciones.filter(
            (postulacion) => postulacion.Estado.nombre_estado === "aceptado"
          ).length
        );
        setPostulacionesRechazadasEmpresa(
          response.postulaciones.filter(
            (postulacion) => postulacion.Estado.nombre_estado === "desestimado"
          ).length
        );
      }
    };

    const traerOfertas = async () => {
      const response = await getOfertasSinFiltros();
      if (response) {
        setOfertas(response.ofertas.count);
      }
    };

    traerUsuarios();
    traerEmpresas();
    traerPostulantes();
    traerPostulantesUNAHUR();
    traerPostulaciones();
    traerOfertas();
  }, []);

  const porcentajePostulantesUNAHUR = (postulantesUNAHUR * 100) / postulantes;
  const porcentajePostulacionesAceptadasAdmin =
    (postulacionesAceptadasAdmin * 100) / postulaciones;
  const porcentajePostulacionesRechazadasAdmin =
    (postulacionesRechazadasAdmin * 100) / postulaciones;
  const porcentajePostulacionesAceptadasEmpresa =
    (postulacionesAceptadasEmpresa * 100) / postulacionesAceptadasAdmin;
  const porcentajePostulacionesRechazadasEmpresa =
    (postulacionesRechazadasEmpresa * 100) / postulacionesAceptadasAdmin;

  const filtrarTodoPorFecha = async (e) => {
    e.preventDefault();
    const response = await getPostulaciones();
    const response2 = await getUsuarios();
    const response3 = await getOfertasSinFiltros();
    const response4 = await getEmpresasSinFiltros();
    const response5 = await getPostulantesSinFiltros();

    setPostulaciones(
      response.postulaciones.filter(
        (postulacion) =>
          postulacion.createdAt >= fechaInicio &&
          postulacion.createdAt <= fechaFin
      ).length
    );
    setPostulacionesAceptadasAdmin(
      response.postulaciones.filter(
        (postulacion) =>
          postulacion.Estado.nombre_estado === "desestimado" ||
          postulacion.Estado.nombre_estado === "en proceso" ||
          postulacion.Estado.nombre_estado === "aceptado"
      ).length
    );
    setPostulacionesRechazadasAdmin(
      response.postulaciones.filter(
        (postulacion) => postulacion.Estado.nombre_estado === "rechazado"
      ).length
    );
    setPostulacionesAceptadasEmpresa(
      response.postulaciones.filter(
        (postulacion) => postulacion.Estado.nombre_estado === "aceptado"
      ).length
    );
    setPostulacionesRechazadasEmpresa(
      response.postulaciones.filter(
        (postulacion) => postulacion.Estado.nombre_estado === "desestimado"
      ).length
    );
    setUsuarios(
      response2.usuarios.filter(
        (usuario) =>
          usuario.createdAt >= fechaInicio && usuario.createdAt <= fechaFin
      ).length
    );
    setOfertas(
      response3.ofertas.rows.filter(
        (oferta) =>
          oferta.createdAt >= fechaInicio && oferta.createdAt <= fechaFin
      ).length
    );
    setEmpresas(
      response4.empresas.rows.filter(
        (empresa) =>
          empresa.createdAt >= fechaInicio && empresa.createdAt <= fechaFin
      ).length
    );
    setPostulantes(
      response5.postulantes.rows.filter(
        (postulante) =>
          postulante.createdAt >= fechaInicio &&
          postulante.createdAt <= fechaFin
      ).length
    );
  };

  return (
    <>
      <Card type="section" elevation={8}>
        <CardHeader title="Estadísticas" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            margin: 2,
          }}
        >
          <Typography variant="h5">Filtrar por fecha</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <TextField
              type="date"
              label="Fecha de inicio"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <TextField
              type="date"
              label="Fecha de fin"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setFechaFin(e.target.value)}
            />
            <Button
              onClick={filtrarTodoPorFecha}
              variant="contained"
              sx={{
                backgroundColor: "#",
              }}
            >
              Filtrar
            </Button>
          </Box>
          <Grid container spacing={2}>
            {/*<Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Usuarios registrados</Typography>
                                <Typography variant = "h4">{usuarios}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Empresas registradas</Typography>
                                <Typography variant = "h4">{empresas}</Typography>
                            </Box>
                        </Grid>*/}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  displat: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="h6">Usuarios registrados</Typography>
                <PieChart width={400} height={400}>
                    <Pie
                        data={[
                        { name: "Usuarios", value: usuarios },
                        { name: "Empresas", value: empresas },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="white"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        <Cell fill="blue" />
                        <Cell fill="green" />
                    </Pie>
                </PieChart>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  displat: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Typography variant="h6">Postulantes</Typography>
                
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">Estudiantes UNAHUR</Typography>
                <Typography variant="h4">
                  {postulantesUNAHUR} ({Math.round(porcentajePostulantesUNAHUR)}
                  %){" "}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">Ofertas creadas</Typography>
                <Typography variant="h4">{ofertas}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">Postulaciones totales</Typography>
                <Typography variant="h4">{postulaciones}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">
                  Postulaciones aceptadas por administrador
                </Typography>
                <Typography variant="h4">
                  {postulacionesAceptadasAdmin} (
                  {Math.round(porcentajePostulacionesAceptadasAdmin)}%)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">
                  Postulaciones rechazadas por administrador
                </Typography>
                <Typography variant="h4">
                  {postulacionesRechazadasAdmin} (
                  {Math.round(porcentajePostulacionesRechazadasAdmin)}%)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">
                  Postulaciones aceptadas por empresas
                </Typography>
                <Typography variant="h4">
                  {postulacionesAceptadasEmpresa} (
                  {Math.round(porcentajePostulacionesAceptadasEmpresa)}%)
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">
                  Postulaciones rechazadas por empresas
                </Typography>
                <Typography variant="h4">
                  {postulacionesRechazadasEmpresa} (
                  {Math.round(porcentajePostulacionesRechazadasEmpresa)}%)
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default Estadisticas;
