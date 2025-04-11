import { MenuItem, Grid, TextField, Typography, Accordion, AccordionDetails, AccordionSummary, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRubros } from "../../../services/rubros_service";
import { getCadenaValor } from "../../../services/cadenaValor_service";
import { getProvincias } from "../../../services/provincias_service";
import { getCiudades } from "../../../services/ciudades_service";
import Terminos from "../../Template/Terminos";

export default function DatosPersonales({
  empresa,
  setEmpresa,
  schema,
  validarErrores,
  setValidarErrores,
}) {
  DatosPersonales.propTypes = {
    empresa: PropTypes.object.isRequired,
    setEmpresa: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
    validarErrores: PropTypes.object.isRequired,
    setValidarErrores: PropTypes.func.isRequired,
  };
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [cadenaValor, setCadenaValor] = useState([]);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  useEffect(() => {
    const traerProvincias = async () => {
      const response = await getProvincias();
      if (response) {
        setProvincias(response.provincias);
      }
    };
    traerProvincias();
  }, []);

  useEffect(() => {
    const traerRubros = async () => {
      const response = await getRubros();
      if (response) {
        setRubros(response.rubros);
      }
    };
    traerRubros();
  }, []);

  useEffect(() => {
    const traerCiudades = async () => {
      const response = await getCiudades(empresa.provincia);
      if (response && response.ciudades) {
        setCiudades(response.ciudades);
      }
    };

    if (empresa.provincia) {
      traerCiudades();
    }
  }, [empresa.provincia]);

  

  useEffect(() => {
    const traerCadenaValor = async () => {
      const response = await getCadenaValor();
      if (response) {
        setCadenaValor(response.cadenaValor);
      }
    };
    traerCadenaValor();
  }, []);

  const handleChange = (e) => {
    setEmpresa({
      ...empresa,
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
            label="Nombre de la empresa"
            id="nombreEmpresa"
            name="nombreEmpresa"
            variant="outlined"
            fullWidth
            value={empresa.nombreEmpresa || ""}
            InputLabelProps={{
              shrink: empresa.nombreEmpresa ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nombreEmpresa)}
            helperText={
              validarErrores.nombreEmpresa ? validarErrores.nombreEmpresa : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="CUIT"
            id="cuit"
            name="cuit"
            variant="outlined"
            fullWidth
            value={empresa.cuit || ""}
            InputLabelProps={{
              shrink: empresa.cuit ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.cuit)}
            helperText={validarErrores.cuit ? validarErrores.cuit : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Descripción"
            id="descripcion"
            name="descripcion"
            variant="outlined"
            fullWidth
            multiline
            value={empresa.descripcion || ""}
            InputLabelProps={{
              shrink: empresa.descripcion ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.descripcion)}
            helperText={
              validarErrores.descripcion ? validarErrores.descripcion : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nacionalidad"
            id="pais"
            name="pais"
            variant="outlined"
            fullWidth
            value={empresa.pais || ""}
            InputLabelProps={{
              shrink: empresa.pais ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.pais)}
            helperText={validarErrores.pais ? validarErrores.pais : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Rubro"
            id="idRubro"
            name="idRubro"
            variant="outlined"
            fullWidth
            value={empresa.idRubro || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.idRubro)}
            helperText={validarErrores.idRubro ? validarErrores.idRubro : ""}
          >
            {rubros.map((rubro) => (
              <MenuItem key={rubro.id} value={rubro.id}>
                {rubro.nombre_rubro}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            required
            label="Cadena de valor"
            id="idCadenaValor"
            name="idCadenaValor"
            variant="outlined"
            fullWidth
            value={empresa.idCadenaValor || ""}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.idCadenaValor)}
            helperText={
              validarErrores.idCadenaValor ? validarErrores.idCadenaValor : ""
            }
          >
            {cadenaValor.map((cadena) => (
              <MenuItem key={cadena.id} value={cadena.id}>
                {cadena.nombre}
              </MenuItem>
            ))}
          </TextField>
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
              provincias.find((provincia) => provincia.id === empresa.provincia)
                ?.id || ""
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
              ciudades.find((ciudad) => ciudad.id === empresa.ciudad)?.id || ""
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
            label="Nombre de la calle"
            id="calle"
            name="calle"
            variant="outlined"
            fullWidth
            value={empresa.calle || ""}
            InputLabelProps={{
              shrink: empresa.calle ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.calle)}
            helperText={validarErrores.calle ? validarErrores.calle : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Altura de la calle"
            id="nro"
            name="nro"
            variant="outlined"
            fullWidth
            value={empresa.nro || ""}
            InputLabelProps={{
              shrink: empresa.nro ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nro)}
            helperText={validarErrores.nro ? validarErrores.nro : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Piso"
            id="piso"
            name="piso"
            variant="outlined"
            fullWidth
            value={empresa.piso || ""}
            InputLabelProps={{
              shrink: empresa.piso ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.piso)}
            helperText={validarErrores.piso ? validarErrores.piso : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Departamento"
            id="depto"
            name="depto"
            variant="outlined"
            fullWidth
            value={empresa.depto || ""}
            InputLabelProps={{
              shrink: empresa.depto ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.depto)}
            helperText={validarErrores.depto ? validarErrores.depto : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Código postal"
            id="cp"
            name="cp"
            variant="outlined"
            fullWidth
            value={empresa.cp || ""}
            InputLabelProps={{
              shrink: empresa.cp ? true : false,
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
            value={empresa.telefono || ""}
            InputLabelProps={{
              shrink: empresa.telefono ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.telefono)}
            helperText={validarErrores.telefono ? validarErrores.telefono : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Página web"
            id="web"
            name="web"
            variant="outlined"
            fullWidth
            value={empresa.web || ""}
            InputLabelProps={{
              shrink: empresa.web ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.web)}
            helperText={validarErrores.web ? validarErrores.web : ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Rol del representante"
            id="rol_representante"
            name="rol_representante"
            variant="outlined"
            fullWidth
            value={empresa.rol_representante || ""}
            InputLabelProps={{
              shrink: empresa.rol_representante ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.rol_representante)}
            helperText={
              validarErrores.rol_representante
                ? validarErrores.rol_representante
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Nombre del representante"
            id="nombreRepresentante"
            name="nombreRepresentante"
            variant="outlined"
            fullWidth
            value={empresa.nombreRepresentante || ""}
            InputLabelProps={{
              shrink: empresa.nombreRepresentante ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.nombreRepresentante)}
            helperText={
              validarErrores.nombreRepresentante
                ? validarErrores.nombreRepresentante
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            label="Email del representante"
            id="emailRepresentante"
            name="emailRepresentante"
            variant="outlined"
            fullWidth
            value={empresa.emailRepresentante || ""}
            InputLabelProps={{
              shrink: empresa.emailRepresentante ? true : false,
            }}
            onChange={(e) => handleChange(e)}
            error={Boolean(validarErrores.emailRepresentante)}
            helperText={
              validarErrores.emailRepresentante
                ? validarErrores.emailRepresentante
                : ""
            }
          />
        </Grid>
        <Terminos />
      </Grid>
    </>
  );
}
