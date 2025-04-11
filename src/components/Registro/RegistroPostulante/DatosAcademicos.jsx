import {
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getEstudios } from "../../../services/estudios_service";
import Terminos from "../../Template/Terminos";

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

  const [estudios, setEstudios] = useState([]);
  const [carreraEnabled, setCarreraEnabled] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  useEffect(() => {
    
    const getEstudiosData = async () => {
      const response = await getEstudios();
      setEstudios(response);
    };
    getEstudiosData();
  }, []);

  const handleChange = (e) => {
    // Si se cambia la opción de Estudios, deshabilita Carrera y deselecciónala
    if (e.target.name === "estudios") {
      setCarreraEnabled(e.target.value === 7 || e.target.value === 8);
      setPostulante({
        ...postulante,
        carrera: null, // Desselecciona Carrera
      });
    }

    // Actualiza el resto de los campos
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

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ marginY: 2 }}>
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
            <MenuItem value="" disabled>
              Seleccione una opción
            </MenuItem>
            {estudios.map((estudio) => (
              <MenuItem key={estudio.id} value={estudio.id}>
                {estudio.nombre_estudio} {estudio.estado_estudio}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Carrera"
            id="carrera"
            name="carrera"
            variant="outlined"
            fullWidth
            value={postulante.carrera || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.carrera)}
            helperText={validarErrores.carrera ? validarErrores.carrera : ""}
            disabled={!carreraEnabled}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Materias aprobadas"
            id="cantMaterias"
            name="cantMaterias"
            variant="outlined"
            fullWidth
            value={parseInt(postulante.cantMaterias) || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.cantMaterias)}
            helperText={
              validarErrores.cantMaterias ? validarErrores.cantMaterias : ""
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginY: "4px" }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="¿Es estudiante de UNAHUR?"
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
      <Terminos />
      {/*<Grid container spacing={1} sx={{ marginY: "4px" }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Acepto los términos y condiciones"
            name="aceptaTerminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
          />
        </Grid>
      </Grid>*/}

    </>
  );
}
