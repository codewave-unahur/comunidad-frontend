import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";

const datosEstudio = [
  { id: 1, nombre_estudio: "Primario", estado_estudio: "Incompleto" },
  { id: 2, nombre_estudio: "Primario", estado_estudio: "Completo" },
  { id: 3, nombre_estudio: "Secundario", estado_estudio: "Incompleto" },
  { id: 4, nombre_estudio: "Secundario", estado_estudio: "Completo" },
  { id: 5, nombre_estudio: "Terciario", estado_estudio: "Incompleto" },
  { id: 6, nombre_estudio: "Terciario", estado_estudio: "Completo" },
  { id: 7, nombre_estudio: "Universitario", estado_estudio: "Incompleto" },
  { id: 8, nombre_estudio: "Universitario", estado_estudio: "Completo" },
];

const listaCarreras = [
  { id: 1, nombre: "Tecnicatura en informática" },
  { id: 2, nombre: "Licenciatura en informática" },
  { id: 3, nombre: "Tecnicatura en laboratorio" },
  { id: 4, nombre: "Licenciatura en biotecnología" },
  { id: 5, nombre: "Tecnicatura universitaria en gestión ambiental" },
  { id: 6, nombre: "Tecnicatura universitaria en tecnología de los alimentos" },
  { id: 7, nombre: "Tecnicatura universitaria en viverismo" },
  { id: 8, nombre: "Profesorado universitario de letras" },
  { id: 9, nombre: "Profesorado universitario en educación física" },
  { id: 10, nombre: "Profesorado universitario de ingles" },
  { id: 11, nombre: "Profesorado universitario de matemática" },
  { id: 12, nombre: "Profesorado universitario de biología" },
  { id: 13, nombre: "Tecnicatura universitaria en programación" },
  {
    id: 14,
    nombre: "Tecnicatura universitaria en redes y operaciones informáticas",
  },
  { id: 15, nombre: "Tecnicatura universitaria en diseño industrial" },
];

export default function DatosAcademicos() {
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
            required
            select
            id="estudios"
            name="estudios"
            label="Estudios"
            fullWidth
            autoComplete="estudios"
            variant="outlined"
            defaultValue=""
          >
            {datosEstudio.map((estudio) => (
              <MenuItem key={estudio.id} value={estudio.nombre_estudio}>
                {estudio.nombre_estudio} - {estudio.estado_estudio}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            id="carrera"
            name="carrera"
            label="Carrera"
            fullWidth
            autoComplete="carrera"
            variant="outlined"
            defaultValue=""
          >
            {listaCarreras.map((carrera) => (
              <MenuItem key={carrera.id} value={carrera.nombre}>
                {carrera.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="materiasAprobadas"
            name="materiasAprobadas"
            label="Materias aprobadas"
            fullWidth
            autoComplete="materiasAprobadas"
            variant="outlined"
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
          />
        </Grid>
      </Grid>
    </>
  );
}
