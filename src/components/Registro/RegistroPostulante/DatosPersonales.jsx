import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

const tiposDocumentos = ["DNI", "PASAPORTE", "LC", "LE"];

const provincias = ["Acá", "van", "las", "provincias", "de", "la", "Argentina"];

const ciudades = [
  "Acá",
  "van",
  "las",
  "ciudades",
  "de",
  "la",
  "provincia",
  "seleccionada",
];

export default function DatosPersonales() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Datos personales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="text"
            id="nombre"
            name="nombre"
            label="Nombre"
            fullWidth
            autoFocus
            autoComplete="nombre"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="text"
            id="apellido"
            name="apellido"
            label="Apellido"
            fullWidth
            autoComplete="apellido"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            InputLabelProps={{ shrink: true }}
            fullWidth
            autoComplete="fechaNacimiento"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            select
            id="tipoDocumento"
            name="tipoDocumento"
            label="Tipo de documento"
            fullWidth
            autoComplete="tipoDocumento"
            variant="outlined"
            defaultValue=""
          >
            {tiposDocumentos.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="number"
            id="numeroDocumento"
            name="numeroDocumento"
            label="Numero de documento"
            fullWidth
            autoComplete="numeroDocumento"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="nacionalidad"
            name="nacionalidad"
            label="Nacionalidad"
            fullWidth
            autoComplete="nacionalidad"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            select
            id="provincia"
            name="provincia"
            label="Provincia"
            fullWidth
            autoComplete="provincia"
            variant="outlined"
            defaultValue=""
          >
            {provincias.map((provincia) => (
              <MenuItem key={provincia} value={provincia}>
                {provincia}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            select
            id="ciudad"
            name="ciudad"
            label="Ciudad"
            fullWidth
            autoComplete="ciudad"
            variant="outlined"
            defaultValue=""
          >
            {ciudades.map((ciudad) => (
              <MenuItem key={ciudad} value={ciudad}>
                {ciudad}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="nombreCalle"
            name="nombreCalle"
            label="Nombre de la calle"
            fullWidth
            autoComplete="nombreCalle"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="number"
            id="alturaCalle"
            name="alturaCalle"
            label="Altura de la calle"
            fullWidth
            autoComplete="alturaCalle"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="tel"
            id="telefono"
            name="telefono"
            label="Teléfono de contacto"
            fullWidth
            autoComplete="telefono"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
}
