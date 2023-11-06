import { Button, CardHeader, Grid, Card, Typography } from "@mui/material";

import { useState } from "react";

import DescriptionIcon from "@mui/icons-material/Description";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CurriculumVitae = () => {
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const [cvSeleccionado, setCvSeleccionado] = useState(null); // Para guardar la imagen seleccionada en el input[type=file]
  const [isCVSelected, setIsCVSelected] = useState(false); // Para controlar si se seleccionó una imagen o no

  const handleSubirCV = (e) => {
    setCvSeleccionado(e.target.files[0]);
    setIsCVSelected(true);
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Mi Curriculum Vitae" />
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        paddingX={2}
        paddingY={2}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="body2" display="block">
            Formato de archivo admitido: PDF
            <ErrorOutlineIcon
              fontSize="small"
              sx={{
                verticalAlign: "middle",
                ml: 0.5,
              }}
            />
          </Typography>
          <Button
            component="label"
            disableElevation
            size="medium"
            variant="contained"
            endIcon={<DescriptionIcon />}
            sx={{
              marginTop: 1,
            }}
            fullWidth
          >
            Seleccionar Curriculum Vitae
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={handleSubirCV}
            />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Button
            disableElevation
            variant="contained"
            size="medium"
            endIcon={<DescriptionIcon />}
            sx={{
              marginTop: 3.6,
            }}
            href={datosUsuario.cv}
            target="_blank"
            fullWidth
            disabled={!datosUsuario.cv}
          >
            Ver Curriculum Vitae
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {isCVSelected && (
            <Button
              onClick={() => {
                console.log({ cvSeleccionado });
              }}
              sx={{
                marginTop: 2,
              }}
              variant="outlined"
              color="success"
              fullWidth
              disableElevation
            >
              Subir {cvSeleccionado.name}
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default CurriculumVitae;
