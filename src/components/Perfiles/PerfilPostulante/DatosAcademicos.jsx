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
  putPostulante,
  agregarAptitudes,
  agregarPreferencias,
} from "../../../services/postulantes_service";
import { getEstudios } from "../../../services/estudios_service";
import { getAptitudes } from "../../../services/aptitudes_service";
import { getPreferencias } from "../../../services/preferencias_service";
import { getIdiomasPostulante } from "../../../services/idiomasPostulantes_service";
import { postIdiomasPostulantes } from "../../../services/idiomasPostulantes_service";
import { deleteIdioma } from "../../../services/idiomasPostulantes_service";
import { Fragment, useEffect, useState } from "react";
import { getHabilidadesPostulante, postHabilidadesPostulantes, deleteHabilidad } from "../../../services/habilidadesPostulante_service";
import { getHabilidades } from "../../../services/habilidades_service";
import { EncryptStorage } from 'encrypt-storage';


const idiomas = [
  { id: 1, idioma: "Español" },
  { id: 2, idioma: "Inglés" },
  { id: 3, idioma: "Portugués" },
  { id: 4, idioma: "Francés" },
  { id: 5, idioma: "Alemán" },
];

const niveles = [
  { id: 1, nivel: "Inicial" },
  { id: 2, nivel: "Intermedio" },
  { id: 3, nivel: "Avanzado" }
];



const DatosAcademicos = () => {

  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const idUsuario = encryptStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");
  const datosUsuario = (encryptStorage.getItem("datosUsuario"));

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Para validar el formulario
  const [edit, setEdit] = useState(false); // Para habilitar los campos de edición
  const isFieldDisabled = !edit;
  const [estudios, setEstudios] = useState([]);
  const [aptitudes, setAptitudes] = useState([]);
  const [aptitudesElegidas, setAptitudesElegidas] = useState([]);
  const [preferencias, setPreferencias] = useState([]);
  const [preferenciasElegidas, setPreferenciasElegidas] = useState([]);
  const [idiomaSeleccionado, setIdiomaSeleccionado] = useState(null);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [idiomasPostulante, setIdiomasPostulante] = useState([]);
  const [habilidadSeleccionada, setHabilidadSeleccionada] = useState(null);
  const [habilidadesPostulante, setHabilidadesPostulante] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
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
      setEstudios(response);
    };
    const getIdiomasData = async () => {
      const response = await getIdiomasPostulante(datosUsuario.id);
      setIdiomasPostulante(response);
    }

    const getAptitudesData = async () => {
      const response = await getAptitudes();
      setAptitudes(response.aptitudes);
    };
    const getPreferenciasData = async () => {
      const response = await getPreferencias();
      setPreferencias(response.preferencias);
    };

    const getHabilidadesData = async () => {
      const response = await getHabilidadesPostulante(datosUsuario.id);
      setHabilidadesPostulante(response);
    };

    const traerHabilidades = async () => {
      const response = await getHabilidades();
      setHabilidades(response.aptitudes);
    };
    
    getEstudiosData();
    getIdiomasData();
    traerHabilidades()
    getHabilidadesData();

  }, []);

  const handleEdit = () => {
    setEdit(true);
    setIsSubmitting(false);
  };



  const handleIdiomaSeleccionado = (event) => {
    setIdiomaSeleccionado(event.target.value);
  };

  const handleNivelSeleccionado = (event) => {
    setNivelSeleccionado(event.target.value);
  };

  const handleHabilidadSeleccionada = (event) => {
    setHabilidadSeleccionada(event.target.value);
  };



  const handleDeleteIdioma = async (id) => {
    const response = await deleteIdioma(id);
    if (response) {
      toast.success("Idioma eliminado con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al eliminar el idioma");
    }
  };

  const handleDeleteHabilidad = async (id) => {
    const response = await deleteHabilidad(id);
    if (response) {
      toast.success("Habilidad eliminada con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al eliminar la habilidad");
    }
  };

  const handleAgregarIdioma = async () => {

    if (idiomasPostulante.length < 4) {
      const response = await postIdiomasPostulantes(
        datosUsuario.id,
        idiomaSeleccionado,
        nivelSeleccionado
      );
      if (response) {
        toast.success("Idioma agregado con éxito");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Error al agregar el idioma");
      }
    } else {
      toast.error("No se pueden agregar más de 4 idiomas");
    }
  };

  const handleAgregarHabilidad = async () => {
    if (habilidadesPostulante.length < 4) {
      const response = await postHabilidadesPostulantes(
        datosUsuario.id,
        habilidadSeleccionada
      );
      if (response) {
        toast.success("Habilidad agregada con éxito");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Error al agregar la habilidad");
      }
    }
    else {
      toast.error("No se pueden agregar más de 4 habilidades");
    }
  };
  const cancelarEdicion = () => {
    setEdit(false);
    setIsSubmitting(false);
  };



  const handleSave = () => {
    schema
      .validate(usuario, { abortEarly: false })
      .then(async () => {
        const datosActualizados = {
          carrera: usuario.carrera,
          estudios: usuario.fk_id_estudios,
          cantMaterias: usuario.cant_materias,
          alumnoUnahur: usuario.alumno_unahur,
        };


        const response = await putPostulante(
          usuario.id,
          datosActualizados,
          token
        );

        

        if (response || responseIdiomas) {
          setEdit(false);
          setUsuario(datosActualizados);
          setIsSubmitting(false);
          toast.success("Datos actualizados con éxito");
         // setTimeout(() => {
          //  window.location.reload();
          //}, 1500);
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
                label="¿Es estudiante de UNAHUR?"
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
              <Box>
                {idiomasPostulante.map((idioma) => (
                  <Chip 
                    key={idioma.id} 
                    label={idioma.Idioma.nombre_idioma + " " + idioma.Nivel.nivel} 
                    color="success"
                    onDelete={edit ? () => handleDeleteIdioma(idioma.id) : undefined}
                  />
                ))}
              </Box>
              {edit && (
                <Grid container spacing={2} paddingY={1}>

                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl sx={{ width: "100%"}}>
                      <TextField 
                        select
                        label="Idioma"
                        variant="outlined"
                        value={idiomaSeleccionado || ""}
                        onChange={handleIdiomaSeleccionado}
                        error={Boolean(validarErrores.idioma)}
                        helperText={
                          isSubmitting && validarErrores.idioma
                            ? validarErrores.idioma
                            : ""
                        }
                        
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
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        select
                        label="Nivel"
                        variant="outlined"
                        value={nivelSeleccionado || ""}
                        onChange={handleNivelSeleccionado}
                        error={Boolean(validarErrores.nivel)}
                        helperText={
                          isSubmitting && validarErrores.nivel
                            ? validarErrores.nivel
                            : ""
                        }
                        
                      >
                        <MenuItem value="" disabled>
                          Selecciona un nivel
                        </MenuItem>
                        {niveles.map((nivel) => (
                          <MenuItem key={nivel.id} value={nivel.id}>
                            {nivel.nivel}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    
                  </Grid>
                    
                  <Grid item xs={12} sm={4} md={4}>
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={handleAgregarIdioma}
                      sx={{ marginTop: 1 }}
                      disabled={!idiomaSeleccionado || !nivelSeleccionado}
                    >
                      Agregar idioma
                    </Button>
                  </Grid>
                </Grid>
           )}
           
            
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Habilidades
              </Typography>
              <Box>
                {habilidadesPostulante.map((habilidad) => (
                  <Chip 
                    key={habilidad.id} 
                    label={habilidad.Aptitud.nombre_aptitud} 
                    color="primary"
                    onDelete={edit ? () => handleDeleteHabilidad(habilidad.id) : undefined}
                  />
                ))}
              </Box>
              {edit && (
                <Grid container spacing={2} paddingY={1}>

                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl sx={{ width: "100%"}}>
                      <TextField 
                        select
                        label="Habilidades"
                        variant="outlined"
                        value={habilidadSeleccionada || ""}
                        onChange={handleHabilidadSeleccionada}
                        error={Boolean(validarErrores.habilidad)}
                        helperText={
                          isSubmitting && validarErrores.habilidad
                            ? validarErrores.habilidad
                            : ""
                        }
                        
                      >
                        <MenuItem value="" disabled>
                          Selecciona una habilidad
                        </MenuItem>
                        {habilidades.map((habilidad) => (
                          <MenuItem key={habilidad.id} value={habilidad.id}>
                            {habilidad.nombre_aptitud}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                 
                    
                  <Grid item xs={12} sm={4} md={4}>
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={handleAgregarHabilidad}
                      sx={{ marginTop: 1 }}
                      disabled={!habilidadSeleccionada}
                    >
                      Agregar habilidad
                    </Button>
                  </Grid>
                </Grid>
           )}
           
            
            </Grid>
            
            <Grid item xs={12} sm={12} md={12}>
              {
                edit && (
                  <Button
                    disableElevation
                    variant="outlined"
                    onClick={cancelarEdicion}
                    color="error"
                    sx={{
                      float: "left",
                    }}
                  >
                    Cancelar
                  </Button>
                )
              }
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
}

export default DatosAcademicos;
