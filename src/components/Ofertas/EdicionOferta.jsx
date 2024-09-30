import {
  Box,
  CardHeader,
  Grid,
  Stack,
  Button,
  Card,
  TextField,
  MenuItem,
  Container,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";
import { getEstudios } from "../../services/estudios_service";
import { getJornadas } from "../../services/jornadas_service";
import { getTiposContratos } from "../../services/contratos_service";
import { getOfertaById, putOferta } from "../../services/ofertas_service";
import { getRubrosOfertas } from "../../services/rubros_ofertas_service";

import * as yup from "yup";

import { Toaster, toast } from "sonner";
import Header from "../Header/Header";

const modalidadDeTrabajo = [
  {
    value: "Presencial",
    label: "Presencial",
  },
  {
    value: "Remoto",
    label: "Remoto",
  },
  {
    value: "Híbrido",
    label: "Híbrido",
  },
];

const EdicionOferta = () => {
  const idOferta = window.location.href.split("/")[5];
  const token = sessionStorage.getItem("token");

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [estudios, setEstudios] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [rubrosOfertas, setRubrosOfertas] = useState([]);

  const [oferta, setOferta] = useState({
    tituloOferta: "",
    descripcion: "",
    fechaVigencia: "",
    horarioLaboralDesde: "",
    horarioLaboralHasta: "",
    edadDesde: null,
    edadHasta: null,
    experienciaPreviaDesc: "",
    zonaTrabajo: "",
    areasEstudio: "",
    otrosDetalles: "",
    beneficios: "",
    remuneracion: null,
    idEstudio: "",
    carrera: "",
    idJornada: "",
    idContrato: "",
    modalidadDeTrabajo: "",
  });

  useEffect(() => {
    const fetchEstudios = async () => {
      const response = await getEstudios();
      setEstudios(response);
    };
    const fetchJornadas = async () => {
      const response = await getJornadas();
      setJornadas(response.jornadas);
    };
    const fetchContratos = async () => {
      const response = await getTiposContratos();
      setContratos(response);
    };
    const fetchRubrosOfertas = async () => {
      const response = await getRubrosOfertas();
      setRubrosOfertas(response);
    };
    fetchEstudios();
    fetchJornadas();
    fetchContratos();
    fetchRubrosOfertas();
  }, []);

  useEffect(() => {
    const fetchOferta = async () => {
      const response = await getOfertaById(idOferta);
      const fechaVigencia = new Date(
        response.fecha_vigencia
      ).toLocaleDateString("fr-CA");
      setOferta({
        tituloOferta: response.titulo_oferta,
        descripcion: response.descripcion,
        fechaVigencia: fechaVigencia,
        horarioLaboralDesde: response.horario_laboral_desde,
        horarioLaboralHasta: response.horario_laboral_hasta,
        edadDesde: response.edad_desde,
        edadHasta: response.edad_hasta,
        experienciaPreviaDesc: response.experiencia_previa_desc,
        idRubroOferta: response.fk_id_rubro_oferta,
        zonaTrabajo: response.zona_trabajo,
        areasEstudio: response.areas_estudio,
        otrosDetalles: response.otros_detalles,
        beneficios: response.beneficios,
        remuneracion: response.remuneracion,
        idEstudio: response.fk_id_estudio,
        carrera: response.carrera,
        idJornada: response.fk_id_jornada,
        idContrato: response.fk_id_contrato,
        modalidadDeTrabajo: response.modalidadDeTrabajo,
        idEstado: 2
      });
    };
    fetchOferta();
  }, [idOferta]);

  const schema = yup.object().shape({
    tituloOferta: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripción es obligatoria"),
    fechaVigencia: yup
      .date()
      .typeError("Ingrese una fecha válida")
      .required("La fecha de vigencia es obligatoria")
      .min(new Date(), "La fecha de vigencia debe ser mayor a la fecha actual"),
    horarioLaboralDesde: yup
      .string()
      .required("El horario desde es obligatorio"),
    horarioLaboralHasta: yup
      .string()
      .required("El horario hasta es obligatorio"),
    edadDesde: yup
      .number()
      .typeError("Ingrese un número válido")
      .positive("La edad mínima debe ser mayor a 0")
      .integer("La edad mínima debe ser un número entero")
      .max(yup.ref("edadHasta"), "La edad mínima debe ser menor a la máxima")
      .nullable(),
    edadHasta: yup
      .number()
      .typeError("Ingrese un número válido")
      .positive("La edad máxima debe ser mayor a 0")
      .integer("La edad máxima debe ser un número entero")
      .min(yup.ref("edadDesde"), "La edad máxima debe ser mayor a la mínima")
      .nullable(),
    experienciaPreviaDesc: yup
      .string()
      .required("La experiencia previa es obligatoria"),
    zonaTrabajo: yup.string().required("La zona de trabajo es obligatoria"),
    areasEstudio: yup.string().required("El área de estudio es obligatoria"),
    otrosDetalles: yup.string().required("Las tareas a realizar son obligatorias"),
    beneficios: yup.string().optional(),
    remuneracion: yup
      .number()
      .typeError("Ingrese un número válido")
      .positive("La remuneración debe ser mayor a 0")
      .integer("La remuneración debe ser un número entero")
      .nullable(),
    idEstudio: yup.string().required("El estudio es obligatorio"),
    carrera: yup.string().required("La carrera es obligatoria"),
    idJornada: yup.string().required("La jornada es obligatoria"),
    idContrato: yup.string().required("El contrato es obligatorio"),
    modalidadDeTrabajo: yup.string().required("La modalidad es obligatoria"),
  });

  const handleSubmit = async () => {
    schema
      .validate(oferta, { abortEarly: false })
      .then(async () => {
        const response = await putOferta(idOferta, oferta, token);
        if (response) {
          toast.success("Oferta editada con éxito");
          setTimeout(() => {
            window.location.href = `/oferta/${idOferta}`;
          }, 2000);
        } else {
          toast.error("Error al editar la oferta");
        }
      })
      .catch((err) => {
        const errores = {};
        err.inner.forEach((e) => {
          errores[e.path] = e.errors[0];
        });
        setValidarErrores(errores);
      });
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Card type="section" elevation={8}>
          <CardHeader title="Datos de la oferta" />
          <Stack spacing={6}>
            <Box>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={4}
                paddingX={2}
                paddingBottom={3}
                paddingTop={3}
              >
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre de la oferta"
                    variant="outlined"
                    value={oferta.tituloOferta || ""}
                    onChange={(e) => {
                      setOferta({ ...oferta, tituloOferta: e.target.value });
                    }}
                    error={Boolean(validarErrores.tituloOferta)}
                    helperText={validarErrores.tituloOferta}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={oferta.descripcion || ""}
                    onChange={(e) => {
                      setOferta({ ...oferta, descripcion: e.target.value });
                    }}
                    error={Boolean(validarErrores.descripcion)}
                    helperText={validarErrores.descripcion}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Horario laboral (desde)"
                    variant="outlined"
                    fullWidth
                    value={oferta.horarioLaboralDesde || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        horarioLaboralDesde: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.horarioLaboralDesde)}
                    helperText={validarErrores.horarioLaboralDesde}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Horario laboral (hasta)"
                    variant="outlined"
                    value={oferta.horarioLaboralHasta || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        horarioLaboralHasta: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.horarioLaboralHasta)}
                    helperText={validarErrores.horarioLaboralHasta}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Edad mínima"
                    variant="outlined"
                    value={oferta.edadDesde || ""}
                    onChange={(e) => {
                      setOferta({ ...oferta, edadDesde: e.target.value });
                    }}
                    error={Boolean(validarErrores.edadDesde)}
                    helperText={validarErrores.edadDesde}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Edad máxima"
                    variant="outlined"
                    value={oferta.edadHasta || ""}
                    onChange={(e) => {
                      setOferta({ ...oferta, edadHasta: e.target.value });
                    }}
                    error={Boolean(validarErrores.edadHasta)}
                    helperText={validarErrores.edadHasta}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Fecha de vigencia"
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    variant="outlined"
                    value={oferta.fechaVigencia || ""}
                    onChange={(e) => {
                      setOferta({ ...oferta, fechaVigencia: e.target.value });
                    }}
                    error={Boolean(validarErrores.fechaVigencia)}
                    helperText={validarErrores.fechaVigencia}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    label="Experiencia previa"
                    variant="outlined"
                    value={oferta.experienciaPreviaDesc || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        experienciaPreviaDesc: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.experienciaPreviaDesc)}
                    helperText={validarErrores.experienciaPreviaDesc}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    select
                    label="Rubro"
                    variant="outlined"
                    value={oferta.idRubroOferta || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        idRubroOferta: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.idRubroOferta)}
                    helperText={validarErrores.idRubroOferta}
                  >
                    {rubrosOfertas.map((rubro) => (
                      <MenuItem key={rubro.id} value={rubro.id}>
                        {rubro.nombre}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Zona de trabajo"
                    variant="outlined"
                    value={oferta.zonaTrabajo || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        zonaTrabajo: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.zonaTrabajo)}
                    helperText={validarErrores.zonaTrabajo}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    label="Area de estudio"
                    variant="outlined"
                    value={oferta.areasEstudio || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        areasEstudio: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.areasEstudio)}
                    helperText={validarErrores.areasEstudio}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    label="Tareas a realizar"
                    variant="outlined"
                    value={oferta.otrosDetalles || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        otrosDetalles: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.otrosDetalles)}
                    helperText={validarErrores.otrosDetalles}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    label="Beneficios"
                    variant="outlined"
                    value={oferta.beneficios || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        beneficios: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.beneficios)}
                    helperText={validarErrores.beneficios}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Remuneración"
                    variant="outlined"
                    value={oferta.remuneracion || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        remuneracion: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.remuneracion)}
                    helperText={validarErrores.remuneracion}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Estudio"
                    variant="outlined"
                    value={oferta.idEstudio || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        idEstudio: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.idEstudio)}
                    helperText={validarErrores.idEstudio}
                  >
                    {estudios.map((estudio) => (
                      <MenuItem key={estudio.id} value={estudio.id}>
                        {estudio.nombre_estudio} {estudio.estado_estudio}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    fullWidth
                    label="Carrera"
                    variant="outlined"
                    value={oferta.carrera || ""}
                    onChange={(e) => {
                      setOferta({ ...oferta, carrera: e.target.value });
                    }}
                    error={Boolean(validarErrores.carrera)}
                    helperText={validarErrores.carrera}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Jornada"
                    variant="outlined"
                    value={oferta.idJornada || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        idJornada: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.idJornada)}
                    helperText={validarErrores.idJornada}
                  >
                    {jornadas.map((jornada) => (
                      <MenuItem key={jornada.id} value={jornada.id}>
                        {jornada.nombre_jornada}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Contrato"
                    variant="outlined"
                    value={oferta.idContrato || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        idContrato: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.idContrato)}
                    helperText={validarErrores.idContrato}
                  >
                    {contratos.map((contrato) => (
                      <MenuItem key={contrato.id} value={contrato.id}>
                        {contrato.nombre_contrato}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    select
                    fullWidth
                    label="Modalidad de trabajo"
                    variant="outlined"
                    value={oferta.modalidadDeTrabajo || ""}
                    onChange={(e) => {
                      setOferta({
                        ...oferta,
                        modalidadDeTrabajo: e.target.value,
                      });
                    }}
                    error={Boolean(validarErrores.modalidadDeTrabajo)}
                    helperText={validarErrores.modalidadDeTrabajo}
                  >
                    {modalidadDeTrabajo.map((modalidad) => (
                      <MenuItem key={modalidad.value} value={modalidad.value}>
                        {modalidad.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                

                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    onClick={handleSubmit}
                    disableElevation
                    variant="contained"
                    endIcon={<SaveIcon />}
                    sx={{
                      float: "right",
                    }}
                  >
                    Guardar cambios
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Stack>
          <Toaster richColors closeButton />
        </Card>
      </Container>
    </>
  );
};

export default EdicionOferta;
