import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getCarreras } from "../../../services/carreras_service";
import { getEstudios } from "../../../services/estudios_service";

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

export default function DatosAcademicos({
  postulante,
  setPostulante,
  schema,
  validarErrores,
  setValidarErrores,
}) {
  DatosAcademicos.propTypes = {
    postulante: PropTypes.object.isRequired,
    setPostulante: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    validarErrores: PropTypes.object.isRequired,
    setValidarErrores: PropTypes.func.isRequired,
  };

  const [carreras, setCarreras] = useState([]);
  const [estudios, setEstudios] = useState([]);
  const [carreraEnabled, setCarreraEnabled] = useState(false);
  const [idiomasElegidos, setIdiomasElegidos] = useState([]);

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

  const handleChange = (e) => {
    // Si se cambia la opción de Estudios, deshabilita Carrera y deselecciónala
    if (e.target.name === "estudios") {
      setCarreraEnabled(e.target.value === 7 || e.target.value === 8);
      setPostulante({
        ...postulante,
        carrera: null, // Desselecciona Carrera
      });
    }

    // Actualiza el resto de los campos
    setPostulante({
      ...postulante,
      [e.target.name]: e.target.value,
    });

    try {
      schema.validateSyncAt(e.target.name, {
        [e.target.name]: e.target.value,
      });
      setValidarErrores({
        ...validarErrores,
        [e.target.name]: false,
      });
    } catch (error) {
      setValidarErrores({
        ...validarErrores,
        [e.target.name]: true,
      });
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

  const handleDescartarIdioma = (index) => {
    return () => {
      setIdiomasElegidos((prevIdiomas) => {
        const nuevosIdiomas = [...prevIdiomas];
        nuevosIdiomas.splice(index, 1);
        return nuevosIdiomas;
      });
    };
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ marginY: 2 }}>
        Datos académicos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Estudios"
            id="estudios"
            name="estudios"
            variant="outlined"
            fullWidth
            value={
              estudios.find((estudio) => estudio.id === postulante.estudios)
                ?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.estudios)}
            helperText={validarErrores.estudios ? validarErrores.estudios : ""}
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {estudios.map((estudio) => (
              <MenuItem key={estudio.id} value={estudio.id}>
                {estudio.nombre_estudio_estado}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Carrera"
            id="carrera"
            name="carrera"
            variant="outlined"
            fullWidth
            value={
              carreras.find((carrera) => carrera.id === postulante.carrera)
                ?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.carrera)}
            helperText={validarErrores.carrera ? validarErrores.carrera : ""}
            disabled={!carreraEnabled}
          >
            <MenuItem value="">Seleccione una opción</MenuItem>
            {carreras.map((carrera) => (
              <MenuItem key={carrera.id} value={carrera.id}>
                {carrera.nombre_carrera}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Materias aprobadas"
            id="cantMaterias"
            name="cantMaterias"
            variant="outlined"
            fullWidth
            value={parseInt(postulante.cantMaterias) || null}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.cantMaterias)}
            helperText={
              validarErrores.cantMaterias ? validarErrores.cantMaterias : null
            }
          />
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom sx={{ marginY: 2 }}>
        Idiomas
      </Typography>
      <Grid container spacing={3}>
        {idiomasElegidos.map((idiomaElegido, index) => (
          <Fragment key={index}>
            <Grid item xs={12} sm={3} md={3}>
              <TextField
                select
                label="Idioma"
                variant="outlined"
                fullWidth
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
            <Grid item xs={12} sm={3} md={3}>
              <TextField
                select
                label="Nivel oral"
                variant="outlined"
                fullWidth
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
            <Grid item xs={12} sm={3} md={3}>
              <TextField
                select
                label="Nivel escrito"
                variant="outlined"
                fullWidth
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
        <Grid item xs={12}>
          <Button
            disableElevation
            variant="contained"
            onClick={agregarNuevoIdioma}
            sx={{ marginTop: 1 }}
          >
            Agregar nuevo idioma
          </Button>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Alumno de la UNAHUR"
            name="alumnoUnahur"
            checked={postulante.alumnoUnahur}
            onChange={(e) =>
              setPostulante({
                ...postulante,
                [e.target.name]: e.target.checked,
              })
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
