import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Checkbox, FormControlLabel, MenuItem, TextField } from "@mui/material";

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
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="idioma1"
            name="idioma1"
            label="Idioma 1"
            fullWidth
            autoComplete="idioma1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nivelIdioma1"
            name="nivelIdioma1"
            label="Nivel idioma 1"
            fullWidth
            autoComplete="nivelIdioma1"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="idioma2"
            name="idioma2"
            label="Idioma 2"
            fullWidth
            autoComplete="idioma2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nivelIdioma2"
            name="nivelIdioma2"
            label="Nivel idioma 2"
            fullWidth
            autoComplete="nivelIdioma2"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="idioma3"
            name="idioma3"
            label="Idioma 3"
            fullWidth
            autoComplete="idioma3"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nivelIdioma3"
            name="nivelIdioma3"
            label="Nivel idioma 3"
            fullWidth
            autoComplete="nivelIdioma3"
            variant="outlined"
          />
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
