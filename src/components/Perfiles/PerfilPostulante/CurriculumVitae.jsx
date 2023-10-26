import { Button, CardHeader, Grid, Card, Box, Typography } from "@mui/material";

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
        justifyContent="space-evenly"
        alignItems="center"
        paddingX={2}
        paddingY={2}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="caption" display="block">
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
            >
              Cambiar Curriculum Vitae
              <input
                type="file"
                accept="application/pdf"
                hidden
                onChange={handleSubirCV}
              />
            </Button>
            {isCVSelected && (
              <Button
                onClick={() => {
                  console.log({ cvSeleccionado });
                }}
                sx={{
                  marginTop: 2,
                }}
                variant="outlined"
                size="medium"
                color="success"
              >
                Subir Curriculum Vitae seleccionado <br /> {cvSeleccionado.name}
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Button
            disableElevation
            variant="contained"
            sx={{
              float: "right",
            }}
            href={datosUsuario.cv}
            target="_blank"
            fullWidth
          >
            Ver Curriculum Vitae
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CurriculumVitae;
