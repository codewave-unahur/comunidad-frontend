import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import * as yup from "yup";

import { Toaster, toast } from "sonner";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import { getPostulanteById } from "../../../services/postulantes_service";
import { putPostulante } from "../../../services/postulantes_service";
import { getCarreras } from "../../../services/carreras_service";
import { getEstudios } from "../../../services/estudios_service";
// import { getIdiomasPostulante } from "../../../services/idiomasPostulantes_service";

import { useEffect, useState } from "react";

import {
  PreferenciasOferta,
  AptitudesOferta,
} from "../../Ofertas/PreferenciasOferta";

// Lista idiomas (español, inglés, portugués y alemán)
// Nivel oral (inicial, básico, intermedio, avanzado y nativo)
// Nivel escrito (inicial, básico, intermedio, avanzado y nativo)

const idiomas = [
  { id: 1, idioma: "Inglés" },
  { id: 2, idioma: "Portugués" },
  { id: 3, idioma: "Alemán" },
];

const niveles = [
  { id: 1, nivel: "Inicial" },
  { id: 2, nivel: "Básico" },
  { id: 3, nivel: "Intermedio" },
  { id: 4, nivel: "Avanzado" },
  { id: 5, nivel: "Nativo" },
];

const aptitudes = [
  { key: 0, label: "JavaScript" },
  { key: 1, label: "Material UI" },
  { key: 2, label: "React" },
  { key: 3, label: "PostgreSQL" },
  { key: 4, label: "NodeJS" },
];

const preferencias = [
  { key: 0, label: "Analista funcional" },
  { key: 1, label: "Desarrollador web" },
  { key: 2, label: "Diseño gráfico" },
  { key: 3, label: "Kinesiología" },
  { key: 4, label: "Diseño industrial" },
];

const DatosAcademicos = () => {
  const idUsuario = sessionStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Para validar el formulario
  const [edit, setEdit] = useState(false); // Para habilitar los campos de edición
  const isFieldDisabled = !edit;
  const [carreras, setCarreras] = useState([]);
  const [estudios, setEstudios] = useState([]);
  // const [idiomas, setIdiomas] = useState([
  //   { idioma: "Inglés", nivelOral: "Alto", nivelEscrito: "Alto" },
  // ]);
  const [usuario, setUsuario] = useState({
    carrera: "",
    fk_id_carrera: "",
    estudios: "",
    fk_id_estudios: "",
    cant_materias: "",
    alumno_unahur: "",
  });

  useEffect(() => {
    const getUsuario = async () => {
      const response = await getPostulanteById(idUsuario);
      setUsuario(response);
    };
    getUsuario();
  }, [idUsuario]);

  useEffect(() => {
    const getCarrerasData = async () => {
      const response = await getCarreras();
      setCarreras(response.carreras);
    };
    const getEstudiosData = async () => {
      const response = await getEstudios();
      setEstudios(response.estudios);
    };
    getEstudiosData();
    getCarrerasData();
  }, []);

  useEffect(() => {
    const getIdiomasData = async () => {
      // const response = await getIdiomasPostulante(datosUsuario.id);
      // setIdiomas(response.idiomas);
    };
    getIdiomasData();
  }, [datosUsuario.id]);

  const handleEdit = () => {
    setEdit(true);
    setIsSubmitting(false);
  };

  const handleSave = () => {
    schema
      .validate(usuario, { abortEarly: false })
      .then(() => {
        const datosActualizados = {
          carrera: usuario.carrera,
          fk_id_carrera: usuario.fk_id_carrera,
          estudios: usuario.estudios,
          fk_id_estudios: usuario.fk_id_estudios,
          cantMaterias: usuario.cant_materias,
          cant_materias: usuario.cant_materias,
          alumno_unahur: usuario.alumno_unahur,
          alumnoUnahur: usuario.alumno_unahur,
        };

        const response = putPostulante(usuario.id, datosActualizados, token);

        if (response) {
          setEdit(false);
          setUsuario(datosActualizados);
          setIsSubmitting(false);
          toast.success("Datos actualizados con éxito");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.error("Error al actualizar los datos");
        }
      })
      .catch((error) => {
        const errores = {};
        error.inner.forEach((element) => {
          errores[element.path] = element.message;
        });
        setValidarErrores(errores);
        setIsSubmitting(true);
        toast.error("Error al actualizar los datos");
      });
  };

  const schema = yup.object().shape({
    carrera: yup.string(),
    fk_id_carrera: yup.string(),
    estudios: yup.string(),
    fk_id_estudios: yup.string(),
    cant_materias: yup
      .number()
      .typeError("Debe ingresar un número")
      .positive("Debe ingresar un número positivo")
      .integer("Debe ingresar un número entero")
      .nullable(),
    alumno_unahur: yup.boolean(),
  });

  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Datos académicos" />
      <Stack spacing={6} paddingX={2} paddingBottom={3}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Carrera"
                variant="outlined"
                value={
                  carreras.find(
                    (carrera) => carrera.id === usuario.fk_id_carrera
                  )?.id || ""
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                onChange={(e) => {
                  setUsuario({
                    ...usuario,
                    carrera: e.target.value,
                    fk_id_carrera: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.fk_id_carrera)}
                helperText={
                  isSubmitting && validarErrores.fk_id_carrera
                    ? validarErrores.fk_id_carrera
                    : ""
                }
              >
                <MenuItem value="">Selecciona una carrera</MenuItem>
                {carreras.map((carrera) => (
                  <MenuItem key={carrera.id} value={carrera.id}>
                    {carrera.nombre_carrera}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Nivel académico"
                variant="outlined"
                value={
                  estudios.find(
                    (estudio) => estudio.id === usuario.fk_id_estudios
                  )?.id || ""
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                select
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                onChange={(e) => {
                  setUsuario({
                    ...usuario,
                    estudios: e.target.value,
                    fk_id_estudios: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.fk_id_estudios)}
                helperText={
                  isSubmitting && validarErrores.fk_id_estudios
                    ? validarErrores.fk_id_estudios
                    : ""
                }
              >
                <MenuItem value="">Selecciona un nivel académico</MenuItem>
                {estudios.map((estudio) => (
                  <MenuItem key={estudio.id} value={estudio.id}>
                    {estudio.nombre_estudio_estado}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Materias aprobadas"
                variant="outlined"
                value={
                  usuario.cant_materias === null
                    ? ""
                    : usuario.cant_materias || ""
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                onChange={(e) => {
                  setUsuario({
                    ...usuario,
                    cant_materias:
                      e.target.value === "" ? null : parseInt(e.target.value),
                  });
                }}
                error={Boolean(validarErrores.cant_materias)}
                helperText={
                  isSubmitting && validarErrores.cant_materias
                    ? validarErrores.cant_materias
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                select
                fullWidth
                label="¿Es alumno UNAHUR"
                variant="outlined"
                value={
                  usuario.alumno_unahur === null
                    ? ""
                    : usuario.alumno_unahur
                    ? true
                    : false
                }
                InputLabelProps={{ shrink: true }}
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                onChange={(e) => {
                  setUsuario({
                    ...usuario,
                    alumno_unahur: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.alumno_unahur)}
                helperText={
                  isSubmitting && validarErrores.alumno_unahur
                    ? validarErrores.alumno_unahur
                    : ""
                }
              >
                <MenuItem value={true}>Si</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Idiomas
              </Typography>
              <Grid container spacing={2} paddingY={2}>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    select
                    label="Idioma"
                    variant="outlined"
                    fullWidth
                    disabled={isFieldDisabled}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                      },
                      "&& .MuiFormLabel-root.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.80)",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Selecciona un idioma
                    </MenuItem>
                    {idiomas.map((idioma) => (
                      <MenuItem key={idioma.id} value={idioma.id}>
                        {idioma.idioma}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    select
                    label="Nivel oral"
                    variant="outlined"
                    fullWidth
                    disabled={isFieldDisabled}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                      },
                      "&& .MuiFormLabel-root.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.80)",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Selecciona un nivel oral
                    </MenuItem>
                    {niveles.map((nivel) => (
                      <MenuItem key={nivel.id} value={nivel.id}>
                        {nivel.nivel}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <TextField
                    select
                    label="Nivel escrito"
                    variant="outlined"
                    fullWidth
                    disabled={isFieldDisabled}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                      },
                      "&& .MuiFormLabel-root.Mui-disabled": {
                        color: "rgba(0, 0, 0, 0.80)",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Selecciona un nivel escrito
                    </MenuItem>
                    {niveles.map((nivel) => (
                      <MenuItem key={nivel.id} value={nivel.id}>
                        {nivel.nivel}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              {edit && (
                <Button
                  disableElevation
                  variant="contained"
                  // onClick={agregarNuevoIdioma}
                  sx={{ marginTop: 1 }}
                >
                  Agregar nuevo idioma
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Aptitudes
              </Typography>
              <Grid container spacing={2} paddingY={1}>
                <Grid item xs={12} sm={4} md={4}>
                  <AptitudesOferta edit={edit} />
                  {edit && (
                    <TextField
                      select
                      label="Aptitudes"
                      variant="outlined"
                      fullWidth
                      disabled={isFieldDisabled}
                    >
                      <MenuItem value="" disabled>
                        Selecciona una aptitud
                      </MenuItem>
                      {aptitudes.map((aptitud) => (
                        <MenuItem key={aptitud.key} value={aptitud.key}>
                          {aptitud.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Grid>
              </Grid>

              {edit && (
                <Button
                  disableElevation
                  variant="contained"
                  // onClick={agregarNuevoIdioma}
                  sx={{ marginTop: 1 }}
                >
                  Agregar una nueva aptitud
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Preferencias
              </Typography>
              <Grid container spacing={2} paddingY={1}>
                <Grid item xs={12} sm={4} md={4}>
                  <PreferenciasOferta edit={edit} />
                  {edit && (
                    <TextField
                      select
                      label="Preferencias"
                      variant="outlined"
                      fullWidth
                      disabled={isFieldDisabled}
                    >
                      <MenuItem value="" disabled>
                        Selecciona una preferencia
                      </MenuItem>
                      {preferencias.map((preferencia) => (
                        <MenuItem key={preferencia.key} value={preferencia.key}>
                          {preferencia.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Grid>
              </Grid>

              {edit && (
                <Button
                  disableElevation
                  variant="contained"
                  // onClick={agregarNuevoIdioma}
                  sx={{ marginTop: 1 }}
                >
                  Agregar una nueva preferencia
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                disableElevation
                variant="contained"
                onClick={edit ? handleSave : handleEdit}
                endIcon={edit ? <SaveIcon /> : <EditIcon />}
                sx={{
                  float: "right",
                }}
              >
                {edit ? "Guardar" : "Editar información"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <Toaster richColors closeButton />
    </Card>
  );
};

export default DatosAcademicos;
