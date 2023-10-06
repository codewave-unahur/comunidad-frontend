import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

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
            label="Nombre de la empresa"
            fullWidth
            autoFocus
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="text"
            id="cuit"
            name="cuit"
            label="Cuit"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="text"
            id="descripción"
            name="descripción"
            label="Descripción"
            fullWidth
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
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="number"
            id="piso"
            name="piso"
            label="Piso"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="departamento"
            name="departamento"
            label="Departamento"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="number"
            id="códigoPostal"
            name="códigoPostal"
            label="Código postal"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            type="tel"
            id="teléfono"
            name="teléfono"
            label="Teléfono"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="web"
            name="web"
            label="Página web"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="nombreRepresentante"
            name="nombreRepresentante"
            label="Nombre del representante"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="emailRepresentante"
            name="emailRepresentante"
            label="Email del representante"
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
    </>
  );
}
