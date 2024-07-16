import { Button, CardHeader, Grid, Card, Typography } from "@mui/material";

import { useState } from "react";

import { uploadCV } from "../../../services/files_service";
import {Tooltip} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Toaster, toast } from "sonner";
import { EncryptStorage } from "encrypt-storage";

const CurriculumVitae = () => {
  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });
  const datosUsuario = encryptStorage.getItem("datosUsuario");
  const token = sessionStorage.getItem("token");

  const [cvSeleccionado, setCvSeleccionado] = useState(null); // Para guardar la imagen seleccionada en el input[type=file]
  const [isCVSelected, setIsCVSelected] = useState(false); // Para controlar si se seleccionó una imagen o no

  const handleCVSeleccionado = (e) => {
    setCvSeleccionado(e.target.files[0]);
    setIsCVSelected(true);
  };

  const handleSaveCV = async (cv, id, token) => {
    try {
      const response = await uploadCV(cv, id, token);
      if (response) {
        datosUsuario.cv = response.url;
        encryptStorage.setItem("datosUsuario", datosUsuario);
        toast.success("Curriculum Vitae subido con éxito");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Error al subir el Curriculum Vitae");
      }
    } catch (error) {
      console.log(error);
    }
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
              onChange={handleCVSeleccionado}
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
              backgroundColor: datosUsuario.cv ? "#57A42D" : "#D3D3D3",
              ":hover": {
                backgroundColor: datosUsuario.cv ? "#4c8c2b" : "#D3D3D3",
              },
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
            <>
            <Button
              onClick={() =>
                handleSaveCV(cvSeleccionado, datosUsuario.id, token)
              }
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
            <Tooltip>
                <Typography variant="caption" color="textSecondary">
                    Para cambiar el Currículum Vitae, presione el botón "Subir ${cvSeleccionado.name}".
                </Typography>
              </Tooltip>
            </>
          )}
        </Grid>
      </Grid>
      <Toaster richColors closeButton />
    </Card>
  );
};

export default CurriculumVitae;
