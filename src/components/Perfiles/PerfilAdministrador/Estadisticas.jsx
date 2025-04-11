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
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getRubrosOfertas } from "../../../services/rubros_ofertas_service";
import { getStats } from "../../../services/stats_service";

const Estadisticas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosSinFormulario, setUsuariosSinFormulario] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [postulantes, setPostulantes] = useState([]);
  const [postulantesUNAHUR, setPostulantesUNAHUR] = useState([]);
  const [postulantesExternos, setPostulantesExternos] = useState([]);
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
  const [rubrosOfertas, setRubrosOfertas] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const traerStats = async () => {
      const response = await getStats();
      if (response) {
        setStats(response);
      }
    };
    const traerUsuarios = async () => {
      const response = await getUsuarios();
      if (response) {
        setUsuarios(response.usuarios);
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
        setPostulantes(response.postulantes.rows);
      }
    };

    const traerRubrosOfertas = async () => {
      const response = await getRubrosOfertas();
      if (response) {
        setRubrosOfertas(response);
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
        setOfertas(response.ofertas.rows);
      }
    };

    
    traerStats();
    traerUsuarios();
    traerEmpresas();
    traerPostulantes();
    traerPostulaciones();
    traerOfertas();
    traerRubrosOfertas();
  }, []);


  useEffect(() => {
    //filtrar postulantes unahur y externos 
    setPostulantesUNAHUR(
      postulantes.filter((postulante) => postulante.alumno_unahur === true)
    );
    setPostulantesExternos(
      postulantes.filter((postulante) => postulante.alumno_unahur === false)
    );
    console.log(postulantes);
    console.log(postulantesUNAHUR)
    console.log(postulantesExternos)
  }, [postulantes]);

  useEffect(() => {
    //filtrar usuarios que no completaon el formulario
    setUsuariosSinFormulario(
      usuarios.filter((usuario) => usuario.estado === false)
    );
  }, [usuarios]);




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

  const contarOfertasPorRubro = (ofertas) => {
    const rubros = [];
    ofertas.forEach((oferta) => {
      rubros.push(oferta.RubroOferta.nombre);
    });
    const rubrosUnicos = [...new Set(rubros)];
    const rubrosOfertas = [];
    rubrosUnicos.forEach((rubro) => {
      rubrosOfertas.push({
        rubro,
        cantidad: rubros.filter((r) => r === rubro).length,
      });
    });
    return rubrosOfertas
      .sort((a, b) => (a.cantidad < b.cantidad ? 1 : -1))
      .slice(0, 5);
  };

  function diezRubrosConMasOfertas(ofertas) {
    const rubros = contarOfertasPorRubro(ofertas);
    const diezRubros = rubros.slice(0, 10);
    return diezRubros;
  }

  

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
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  displat: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="h6">Usuarios registrados</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart width={700} height={400}>
                    <Pie
                      data={[
                        { name: "Postulantes", value: stats.postulantes },
                        { name: "Empresas", value: stats.empresas },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ name, percent, value }) =>
                        `${name} ${(percent * 100).toFixed(0)}% (${value})`
                      }
                    >
                      <Cell fill="#4E79A7" />
                      <Cell fill="#F28E2C" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                <Typography variant="h6">Usuarios por estado</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart width={700} height={400}>
                    <Pie
                      data={[
                        { name: "Registro Completo", value: usuarios.length - usuariosSinFormulario.length },
                        {
                          name: "Registro Incompleto",
                          value: usuariosSinFormulario.length,
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ name, percent, value }) =>
                        `${name} ${(percent * 100).toFixed(0)}% (${value})`
                      }
                    >
                      <Cell fill="#4E79A7" />
                      <Cell fill="#F28E2C" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
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
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart width={400} height={400}>
                    <Pie
                      data={[
                        {
                          name: "UNAHUR",
                          value: stats.postulantesUnahur,
                        },
                        {
                          name: "Externos",
                          value: stats.postulantesExternos,
                        },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label={({ name, percent, value }) =>
                        `${name} ${(percent * 100).toFixed(0)}% (${value})`
                      }
                    >
                      <Cell fill="#59A14F" />
                      <Cell fill="#AF7AA1" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            


            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">Ofertas creadas</Typography>
                <Typography variant="h4">{stats.ofertas}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">Rubros de ofertas</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    width={400}
                    height={400}
                    data={diezRubrosConMasOfertas(ofertas)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="rubro" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6">Postulaciones totales</Typography>
                <Typography variant="h4">{stats.postulaciones}</Typography>
              </Box>
            </Grid>
            
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6"> Postulaciones </Typography>
                <PieChart width={800} height={400}>
                  <Pie
                    data={[
                      {
                        name: "Aceptadas por admin",
                        value: stats.postulacionesAceptadasPorAdmin,
                      },
                      {
                        name: "Rechazadas por admin",
                        value: stats.postulacionesRechazadasPorAdmin,
                      },
                      {
                        name: "Pendientes",
                        value: stats.postulacionesPendientes,
                      },
                      {
                        name: "Rechazadas por empresa",
                        value: stats.postulacionesRechazadasPorEmpresa,
                      },
                      {
                        name: "Aceptadas por empresas",
                        value: stats.postulacionesAceptadasPorEmpresas,
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent, value }) =>
                      `${name} ${(percent * 100).toFixed(0)}% (${value})`
                    }
                  >
                    <Cell fill="#4E79A7" />
                    <Cell fill="#F28E2C" />
                    <Cell fill="#59A14F" />
                    <Cell fill="#AF7AA1" />
                    <Cell fill="#E15759" />
                  </Pie>
                </PieChart>
              </Box>
            
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default Estadisticas;
