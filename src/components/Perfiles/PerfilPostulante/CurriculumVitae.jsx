import { Button, CardHeader, Grid, Card } from "@mui/material";

import { useState } from "react";

const CurriculumVitae = () => {
  const [cvSubido, setCvSubido] = useState(false);
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));

  const handleSubirCV = () => {
    setCvSubido(true);
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
          <Button
            disableElevation
            variant="contained"
            sx={{
              float: "right",
            }}
            onClick={handleSubirCV}
            fullWidth
          >
            Subir Curriculum Vitae
          </Button>
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
            disabled={!cvSubido}
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
