import { MenuItem, Grid, TextField, Typography, Tooltip } from "@mui/material";

import PropTypes from "prop-types";

import { getTiposDocumentos } from "../../../services/tiposDocumentos_service";
import { getProvincias } from "../../../services/provincias_service";
import { getCiudades } from "../../../services/ciudades_service";
import { useEffect, useState } from "react";

export default function DatosPersonales({
  postulante,
  setPostulante,
  schema,
  validarErrores,
  setValidarErrores,
}) {
  DatosPersonales.propTypes = {
    postulante: PropTypes.object.isRequired,
    setPostulante: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    validarErrores: PropTypes.object.isRequired,
    setValidarErrores: PropTypes.func.isRequired,
  };
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [generos, setGeneros] = useState(["Masculino", "Femenino", "X", "Prefiero no decirlo"]);

  useEffect(() => {
    async function fetchData() {
      const [response1, response2] = await Promise.all([
        getTiposDocumentos(),
        getProvincias(),
      ]);
      if (response1 && response1.tipos_documentos) {
        setTiposDocumentos(response1.tipos_documentos);
      }
      if (response2 && response2.provincias) {
        setProvincias(response2.provincias);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const traerCiudades = async () => {
      const response = await getCiudades(postulante.provincia);
      if (response && response.ciudades) {
        setCiudades(response.ciudades);
      }
    };

    if (postulante.provincia) {
      traerCiudades();
    }
  }, [postulante.provincia]);

  const handleChange = (e) => {
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
      <Typography variant="h6" gutterBottom>
        Datos personales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nombre"
            id="nombre"
            name="nombre"
            variant="outlined"
            fullWidth
            value={postulante.nombre || ""}
            InputLabelProps={{
              shrink: postulante.nombre ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nombre)}
            helperText={validarErrores.nombre ? validarErrores.nombre : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Apellido"
            id="apellido"
            name="apellido"
            variant="outlined"
            fullWidth
            value={postulante.apellido || ""}
            InputLabelProps={{ shrink: postulante.apellido ? true : false }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.apellido)}
            helperText={validarErrores.apellido ? validarErrores.apellido : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="date"
            required
            label="Fecha de nacimiento"
            id="fecha_nac"
            name="fecha_nac"
            variant="outlined"
            fullWidth
            value={postulante.fecha_nac || ""}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.fecha_nac)}
            helperText={
              validarErrores.fecha_nac ? validarErrores.fecha_nac : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Tipo de documento"
            id="tipoDocumento"
            name="tipoDocumento"
            variant="outlined"
            fullWidth
            value={
              tiposDocumentos.find(
                (tipo) => tipo.id === postulante.tipoDocumento
              )?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.tipoDocumento)}
            helperText={
              validarErrores.tipoDocumento ? validarErrores.tipoDocumento : ""
            }
          >
            <MenuItem value="">Selecciona un tipo de documento</MenuItem>
            {tiposDocumentos.map((tipo) => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.tipo_documento}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Documento"
            id="documento"
            name="documento"
            variant="outlined"
            fullWidth
            value={postulante.documento || ""}
            InputLabelProps={{
              shrink: postulante.documento ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.documento)}
            helperText={
              validarErrores.documento ? validarErrores.documento : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nacionalidad"
            id="nacionalidad"
            name="nacionalidad"
            variant="outlined"
            fullWidth
            value={postulante.nacionalidad || ""}
            InputLabelProps={{
              shrink: postulante.nacionalidad ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nacionalidad)}
            helperText={
              validarErrores.nacionalidad ? validarErrores.nacionalidad : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Provincia"
            id="provincia"
            name="provincia"
            variant="outlined"
            fullWidth
            value={
              provincias.find(
                (provincia) => provincia.id === postulante.provincia
              )?.id || ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.provincia)}
            helperText={
              validarErrores.provincia ? validarErrores.provincia : ""
            }
          >
            {provincias.map((provincia) => (
              <MenuItem key={provincia.id} value={provincia.id}>
                {provincia.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Ciudad"
            id="ciudad"
            name="ciudad"
            variant="outlined"
            fullWidth
            value={
              ciudades.find((ciudad) => ciudad.id === postulante.ciudad)?.id ||
              ""
            }
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.ciudad)}
            helperText={validarErrores.ciudad ? validarErrores.ciudad : ""}
          >
            <MenuItem value="">Selecciona una ciudad</MenuItem>
            {ciudades.map((ciudad) => (
              <MenuItem key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Código postal"
            id="cp"
            name="cp"
            variant="outlined"
            fullWidth
            value={postulante.cp || ""}
            InputLabelProps={{
              shrink: postulante.cp ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.cp)}
            helperText={validarErrores.cp ? validarErrores.cp : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Teléfono"
            id="telefono"
            name="telefono"
            variant="outlined"
            fullWidth
            value={postulante.telefono || ""}
            InputLabelProps={{
              shrink: postulante.telefono ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.telefono)}
            helperText={validarErrores.telefono ? validarErrores.telefono : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Segundo teléfono"
            id="segundoTelefono"
            name="segundoTelefono"
            variant="outlined"
            fullWidth
            value={postulante.segundoTelefono || ""}
            InputLabelProps={{
              shrink: postulante.segundoTelefono ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.segundoTelefono)}
            helperText={
              validarErrores.segundoTelefono
                ? validarErrores.segundoTelefono
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Género"
            id="genero"
            name="genero"
            variant="outlined"
            fullWidth
            value={postulante.genero || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.genero)}
            helperText={validarErrores.genero ? validarErrores.genero : ""}
          >
            <MenuItem value="">Selecciona un género</MenuItem>
            {generos.map((genero) => (
              <MenuItem key={genero} value={genero}>
                {genero}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {/*<Grid item xs={12} sm={4}>
          <TextField
            label="Discapacidad"
            id="discapacidad"
            name="discapacidad"
            variant="outlined"
            fullWidth
            value={postulante.discapacidad || ""}
            InputLabelProps={{
              shrink: postulante.discapacidad ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.discapacidad)}
            helperText={
              validarErrores.discapacidad ? validarErrores.discapacidad : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="LinkedIn"
            id="linkedIn"
            name="linkedIn"
            variant="outlined"
            fullWidth
            value={postulante.linkedIn || ""}
            InputLabelProps={{
              shrink: postulante.linkedIn ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.linkedIn)}
            helperText={validarErrores.linkedIn ? validarErrores.linkedIn : ""}
          />
          </Grid>*/}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Portfolio o red social"
            id="portfolio"
            name="portfolio"
            variant="outlined"
            fullWidth
            value={postulante.portfolio || ""}
            InputLabelProps={{
              shrink: postulante.portfolio ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.portfolio)}
            helperText={
              validarErrores.portfolio ? validarErrores.portfolio : ""
            }
          />
          <Tooltip>
            <Typography variant="caption" color="textSecondary">
              Link de tu portfolio o red social (LinkedIn, Github, Behance, etc.)
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Presentación"
            id="presentacion"
            name="presentacion"
            variant="outlined"
            fullWidth
            value={postulante.presentacion || ""}
            InputLabelProps={{
              shrink: postulante.presentacion ? true : false,
            }}
            multiline
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.presentacion)}
            helperText={
              validarErrores.presentacion ? validarErrores.presentacion : ""
            }
          /> 
          <Tooltip>
            <Typography variant="caption" color="textSecondary">
              Breve descripción de tu perfil y/o link de presentacion audiovisual (Máximo 255 caracteres)
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
}
