import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import * as yup from "yup";

import { Toaster, toast } from "sonner";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import {
  getPostulanteById,
  agregarIdiomas,
  putPostulante,
  eliminarIdioma,
  agregarAptitudes,
  agregarPreferencias,
} from "../../../services/postulantes_service";
import { getEstudios } from "../../../services/estudios_service";
import { getAptitudes } from "../../../services/aptitudes_service";
import { getPreferencias } from "../../../services/preferencias_service";
// import { getIdiomasPostulante } from "../../../services/idiomasPostulantes_service";

import { Fragment, useEffect, useState } from "react";

import { PreferenciasPostulante } from "../../Preferencias/PreferenciasPostulante";
import { AptitudesPostulante } from "../../Aptitudes/AptitudesPostulate";

const idiomas = [
  { id: 1, idioma: "Chino" },
  { id: 2, idioma: "Inglés" },
  { id: 3, idioma: "Portugués" },
  { id: 4, idioma: "Alemán" },
  { id: 5, idioma: "Francés" },
];

const niveles = [
  { id: 1, nivel: "Inicial" },
  { id: 2, nivel: "Intermedio" },
  { id: 3, nivel: "Avanzado" },
  { id: 4, nivel: "Nativo" },
];

const DatosAcademicos = () => {
  const idUsuario = sessionStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Para validar el formulario
  const [edit, setEdit] = useState(false); // Para habilitar los campos de edición
  const isFieldDisabled = !edit;
  const [estudios, setEstudios] = useState([]);
  const [aptitudes, setAptitudes] = useState([]);
  const [aptitudesElegidas, setAptitudesElegidas] = useState([]);
  const [preferencias, setPreferencias] = useState([]);
  const [preferenciasElegidas, setPreferenciasElegidas] = useState([]);
  const [idiomasElegidos, setIdiomasElegidos] = useState([]);
  const [usuario, setUsuario] = useState({
    carrera: "",
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
    
    const getEstudiosData = async () => {
      const response = await getEstudios();
      setEstudios(response.estudios);
    };
    const getAptitudesData = async () => {
      const response = await getAptitudes();
      setAptitudes(response.aptitudes);
    };
    const getPreferenciasData = async () => {
      const response = await getPreferencias();
      setPreferencias(response.preferencias);
    };
    getEstudiosData();
    getAptitudesData();
    getPreferenciasData();
  }, []);

  const handleEdit = () => {
    setEdit(true);
    setIsSubmitting(false);
  };

  const handleChangeAptitudes = (event) => {
    setAptitudesElegidas(event.target.value);
  };

  const agregarNuevasAptitudes = async (aptitudes) => {
    const apt = [
      ...aptitudesElegidas.map((aptitud) => ({
        id: aptitudes.find((apt) => apt.nombre_aptitud === aptitud).id,
      })),
    ];
    const response = await agregarAptitudes(datosUsuario.id, apt);
    if (response) {
      toast.success("Aptitudes agregadas con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al agregar las aptitudes");
    }
  };

  const handleChangePreferencias = (event) => {
    setPreferenciasElegidas(event.target.value);
  };

  const agregarNuevasPreferencias = async (preferencias) => {
    const pref = [
      ...preferenciasElegidas.map((preferencia) => ({
        id: preferencias.find((pref) => pref.nombre_preferencia === preferencia)
          .id,
      })),
    ];
    const response = await agregarPreferencias(datosUsuario.id, pref);
    if (response) {
      toast.success("Preferencias agregadas con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al agregar las preferencias");
    }
  };

  const agregarNuevoIdioma = () => {
    setIdiomasElegidos([
      ...idiomasElegidos,
      {
        nombre_idioma: "",
        nivel_oral: "",
        nivel_escrito: "",
      },
    ]);
  };

  const handleIdiomaChange = (e, index) => {
    const { value } = e.target;
    setIdiomasElegidos((prevIdiomas) => {
      const nuevosIdiomas = [...prevIdiomas];
      nuevosIdiomas[index] = { ...nuevosIdiomas[index], nombre_idioma: value };
      return nuevosIdiomas;
    });
  };

  const handleNivelOralChange = (e, index) => {
    const { value } = e.target;
    setIdiomasElegidos((prevIdiomas) => {
      const nuevosIdiomas = [...prevIdiomas];
      nuevosIdiomas[index] = { ...nuevosIdiomas[index], nivel_oral: value };
      return nuevosIdiomas;
    });
  };

  const handleNivelEscritoChange = (e, index) => {
    const { value } = e.target;
    setIdiomasElegidos((prevIdiomas) => {
      const nuevosIdiomas = [...prevIdiomas];
      nuevosIdiomas[index] = { ...nuevosIdiomas[index], nivel_escrito: value };
      return nuevosIdiomas;
    });
  };

  const handleEliminarIdioma = async (e, index) => {
    e.preventDefault();
    const response = await eliminarIdioma(usuario.Idiomas[index].id);

    if (response) {
      toast.success("Idioma eliminado con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error("Error al eliminar el idioma");
    }
  };

  const handleDescartarIdioma = (index) => {
    return () => {
      setIdiomasElegidos((prevIdiomas) => {
        const nuevosIdiomas = [...prevIdiomas];
        nuevosIdiomas.splice(index, 1);
        return nuevosIdiomas;
      });
    };
  };

  const handleSave = () => {
    schema
      .validate(usuario, { abortEarly: false })
      .then(async () => {
        const datosActualizados = {
          carrera: usuario.carrera,
          estudios: usuario.estudios,
          fk_id_estudios: usuario.fk_id_estudios,
          cantMaterias: usuario.cant_materias,
          cant_materias: usuario.cant_materias,
          alumno_unahur: usuario.alumno_unahur,
          alumnoUnahur: usuario.alumno_unahur,
        };

        const response = await putPostulante(
          usuario.id,
          datosActualizados,
          token
        );
        const responseIdiomas = await agregarIdiomas(
          datosUsuario.id,
          idiomasElegidos
        );

        if (response && responseIdiomas) {
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
        console.log("Errores: ", errores);
        console.log("Error: ", error);
        toast.error("Error al actualizar los datos");
      });
  };

  const schema = yup.object().shape({
    carrera: yup.string(),
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
                  usuario.carrera === null
                    ? ""
                    : usuario.carrera || ""
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
                    carrera:
                      e.target.value === "" ? null : e.target.value,
                  });
                }}
                error={Boolean(validarErrores.carrera)}
                helperText={
                  isSubmitting && validarErrores.carrera
                    ? validarErrores.carrera
                    : ""
                }
              />
                
              
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
                    {estudio.nombre_estudio} {estudio.estado_estudio}
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
                {usuario.Idiomas?.map((idioma, index) => (
                  <Fragment key={index}>
                    <Grid
                      item
                      xs={12}
                      sm={isFieldDisabled ? 4 : 3}
                      md={isFieldDisabled ? 4 : 3}
                    >
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
                        value={
                          idioma["Idiomas del postulante"].nombre_idioma || ""
                        }
                        onChange={(e) => handleIdiomaChange(e, index)}
                      >
                        <MenuItem value="" disabled>
                          Selecciona un idioma
                        </MenuItem>
                        {idiomas.map((idioma) => (
                          <MenuItem key={idioma.id} value={idioma.idioma}>
                            {idioma.idioma}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={isFieldDisabled ? 4 : 3}
                      md={isFieldDisabled ? 4 : 3}
                    >
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
                        value={
                          idioma["Idiomas del postulante"].nivel_oral || ""
                        }
                        onChange={(e) => handleNivelOralChange(e, index)}
                      >
                        <MenuItem value="" disabled>
                          Selecciona un nivel oral
                        </MenuItem>
                        {niveles.map((nivel) => (
                          <MenuItem key={nivel.id} value={nivel.nivel}>
                            {nivel.nivel}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={isFieldDisabled ? 4 : 3}
                      md={isFieldDisabled ? 4 : 3}
                    >
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
                        value={
                          idioma["Idiomas del postulante"].nivel_escrito || ""
                        }
                        onChange={(e) => handleNivelEscritoChange(e, index)}
                      >
                        <MenuItem value="" disabled>
                          Selecciona un nivel escrito
                        </MenuItem>
                        {niveles.map((nivel) => (
                          <MenuItem key={nivel.id} value={nivel.nivel}>
                            {nivel.nivel}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    {edit && (
                      <Grid item xs={12} sm={3} md={3}>
                        <Button
                          disableElevation
                          variant="outlined"
                          color="error"
                          sx={{ marginTop: 1 }}
                          fullWidth
                          onClick={(e) => handleEliminarIdioma(e, index)}
                        >
                          Eliminar idioma
                        </Button>
                      </Grid>
                    )}
                  </Fragment>
                ))}
                {edit &&
                  idiomasElegidos.map((idiomaElegido, index) => (
                    <Fragment key={index}>
                      <Grid
                        item
                        xs={12}
                        sm={isFieldDisabled ? 4 : 3}
                        md={isFieldDisabled ? 4 : 3}
                      >
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
                          value={idiomaElegido.nombre_idioma || ""}
                          onChange={(e) => handleIdiomaChange(e, index)}
                        >
                          <MenuItem value="" disabled>
                            Selecciona un idioma
                          </MenuItem>
                          {idiomas.map((idioma) => (
                            <MenuItem key={idioma.id} value={idioma.idioma}>
                              {idioma.idioma}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={isFieldDisabled ? 4 : 3}
                        md={isFieldDisabled ? 4 : 3}
                      >
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
                          value={idiomaElegido.nivel_oral || ""}
                          onChange={(e) => handleNivelOralChange(e, index)}
                        >
                          <MenuItem value="" disabled>
                            Selecciona un nivel oral
                          </MenuItem>
                          {niveles.map((nivel) => (
                            <MenuItem key={nivel.id} value={nivel.nivel}>
                              {nivel.nivel}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={isFieldDisabled ? 4 : 3}
                        md={isFieldDisabled ? 4 : 3}
                      >
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
                          value={idiomaElegido.nivel_escrito || ""}
                          onChange={(e) => handleNivelEscritoChange(e, index)}
                        >
                          <MenuItem value="" disabled>
                            Selecciona un nivel escrito
                          </MenuItem>
                          {niveles.map((nivel) => (
                            <MenuItem key={nivel.id} value={nivel.nivel}>
                              {nivel.nivel}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={3} md={3}>
                        <Button
                          disableElevation
                          variant="outlined"
                          color="error"
                          sx={{ marginTop: 1 }}
                          fullWidth
                          onClick={handleDescartarIdioma(index)}
                        >
                          Eliminar idioma
                        </Button>
                      </Grid>
                    </Fragment>
                  ))}
              </Grid>

              {edit && (
                <Button
                  disableElevation
                  variant="contained"
                  onClick={agregarNuevoIdioma}
                  sx={{ marginTop: 1 }}
                >
                  Agregar nuevo idioma
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Habilidades
              </Typography>
              <Grid container spacing={2} paddingY={1}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <AptitudesPostulante
                      edit={edit}
                      aptitudes={usuario?.Aptitudes}
                    />
                    {edit && (
                      <>
                        <Select
                          labelId="aptitudes-chip-label"
                          id="aptitudes-chip"
                          multiple
                          value={aptitudesElegidas || []}
                          onChange={handleChangeAptitudes}
                          input={
                            <OutlinedInput
                              id="select-aptitudes-chip"
                              label="Aptitudes"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                        >
                          <MenuItem value="" disabled>
                            Selecciona una habilidad
                          </MenuItem>
                          {aptitudes
                            .filter(
                              (aptitud) =>
                                !usuario.Aptitudes.find(
                                  (apt) =>
                                    apt["Aptitudes del postulante"].id ===
                                    aptitud.id
                                )
                            )
                            .map((aptitud) => (
                              <MenuItem
                                key={aptitud.id}
                                value={aptitud.nombre_aptitud}
                              >
                                {aptitud.nombre_aptitud}
                              </MenuItem>
                            ))}
                        </Select>
                      </>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              {edit && (
                <Button
                  disableElevation
                  variant="contained"
                  onClick={() => agregarNuevasAptitudes(aptitudes)}
                  sx={{ marginTop: 1 }}
                >
                  Agregar habilidades
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Preferencias
              </Typography>
              <Grid container spacing={2} paddingY={1}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <PreferenciasPostulante
                      edit={edit}
                      preferencias={usuario?.Preferencias}
                    />
                    {edit && (
                      <>
                        <Select
                          labelId="preferencias-chip-label"
                          id="preferencias-chip"
                          multiple
                          value={preferenciasElegidas || []}
                          onChange={handleChangePreferencias}
                          input={
                            <OutlinedInput
                              id="select-preferencias-chip"
                              label="Preferencias"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                        >
                          <MenuItem value="" disabled>
                            Selecciona una preferencia
                          </MenuItem>
                          {preferencias
                            .filter(
                              (preferencia) =>
                                !usuario.Preferencias.find(
                                  (pref) =>
                                    pref["Preferencias del postulante"].id ===
                                    preferencia.id
                                )
                            )
                            .map((preferencia) => (
                              <MenuItem
                                key={preferencia.id}
                                value={preferencia.nombre_preferencia}
                              >
                                {preferencia.nombre_preferencia}
                              </MenuItem>
                            ))}
                        </Select>
                      </>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              {edit && (
                <Button
                  disableElevation
                  variant="contained"
                  onClick={() => agregarNuevasPreferencias(preferencias)}
                  sx={{ marginTop: 1 }}
                >
                  Agregar preferencias
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
