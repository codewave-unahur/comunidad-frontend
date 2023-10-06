import {
  Box,
  CardHeader,
  Grid,
  Stack,
  Button,
  Card,
  TextField,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";

const CrearOferta = () => {
  return (
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
              <TextField label="Nombre" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Fecha de vigencia"
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                type="email"
                label="Horario laboral (desde)"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Horario laboral (hasta)"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Edad mínima" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Edad máxima" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Experiencia previa"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Zona de trabajo" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Area de estudio" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Otros detalles" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Beneficios" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Remuneración" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Estudio" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Carrera" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Jornada" variant="outlined" />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField fullWidth label="Contrato" variant="outlined" />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Button
                onClick={() => {}}
                disableElevation
                variant="contained"
                endIcon={<AddCircleIcon />}
                sx={{
                  float: "right",
                }}
              >
                Crear oferta
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Card>
  );
};

export default CrearOferta;
