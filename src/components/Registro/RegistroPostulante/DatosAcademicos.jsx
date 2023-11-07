import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getCarreras } from "../../../services/carreras_service";
import { getEstudios } from "../../../services/estudios_service";

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

  const [idiomas, setIdiomas] = useState([
    { idioma: "", nivelOral: "", nivelEscrito: "" },
  ]);

  const agregarNuevoIdioma = () => {
    setIdiomas([
      ...idiomas,
      { id: idiomas.length, idioma: "", nivelOral: "", nivelEscrito: "" },
    ]);
  };

  const quitarIdioma = (index) => {
    setIdiomas(idiomas.filter((idioma) => idioma.id !== index));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
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
      <Grid container spacing={3} paddingTop={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h5" gutterBottom>
            Idiomas
          </Typography>
          {idiomas.map((idioma, index) => (
            <Grid container spacing={2} paddingY={2} key={index}>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  label="Idioma"
                  variant="outlined"
                  value={idioma.idioma}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  label="Nivel oral"
                  variant="outlined"
                  value={idioma.nivelOral}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <TextField
                  label="Nivel escrito"
                  variant="outlined"
                  value={idioma.nivelEscrito}
                  fullWidth
                />
              </Grid>
              {index === 0 ? null : (
                <Button
                  disableElevation
                  variant="contained"
                  onClick={() => quitarIdioma(index)}
                  sx={{ marginTop: 1, marginLeft: 2 }}
                >
                  Quitar idioma
                </Button>
              )}
            </Grid>
          ))}
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
