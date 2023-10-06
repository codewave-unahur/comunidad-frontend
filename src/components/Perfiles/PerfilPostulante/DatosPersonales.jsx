import {
  Box,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
  Button,
  Card,
  TextField,
  MenuItem,
} from "@mui/material";

import * as yup from "yup";

import EditIcon from "@mui/icons-material/Edit";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";

import { Toaster, toast } from "sonner";

import { getPostulanteById } from "../../../services/postulantes_service";
import { putPostulante } from "../../../services/postulantes_service";
import { getTiposDocumentos } from "../../../services/tiposDocumentos_service";
import { getProvincias } from "../../../services/provincias_service";
import { getCiudades } from "../../../services/ciudades_service";

const DatosPersonales = () => {
  const idUsuario = sessionStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Para validar el formulario
  const [edit, setEdit] = useState(false); // Para habilitar los campos de edición
  const isFieldDisabled = !edit;
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    fecha_nac: "",
    tipoDocumento: "",
    documento: "",
    telefono: "",
    nacionalidad: "",
    provincia: "",
    ciudad: "",
    cp: "",
    calle: "",
    nro: "",
    foto: "",
    fk_id_usuario: "",
    fk_id_tipo_documento: "",
    fk_id_provincia: "",
    fk_id_ciudad: "",
    Usuario: {
      usuario: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      const [response1, response2, response3] = await Promise.all([
        getPostulanteById(idUsuario),
        getTiposDocumentos(),
        getProvincias(),
      ]);

      setUsuario(response1);
      if (response2 && response2.tipos_documentos) {
        setTiposDocumentos(response2.tipos_documentos);
      }
      if (response3 && response3.provincias) {
        setProvincias(response3.provincias);
      }
    }

    fetchData();
  }, [idUsuario]);

  useEffect(() => {
    const traerCiudades = async () => {
      const response = await getCiudades(usuario.fk_id_provincia);
      if (response && response.ciudades) {
        setCiudades(response.ciudades);
      }
    };

    if (usuario.fk_id_provincia) {
      traerCiudades();
    }
  }, [usuario.fk_id_provincia]);

  const handleEdit = () => {
    setEdit(true);
    setIsSubmitting(false);
  };

  const handleSave = () => {
    schema
      .validate(usuario, { abortEarly: false })
      .then(() => {
        const datosActualizados = {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          fecha_nac: usuario.fecha_nac,
          tipoDocumento: usuario.tipoDocumento,
          documento: usuario.documento,
          telefono: usuario.telefono,
          nacionalidad: usuario.nacionalidad,
          provincia: usuario.provincia,
          ciudad: usuario.ciudad,
          cp: usuario.cp,
          calle: usuario.calle,
          nro: usuario.nro,
          foto: usuario.foto,
          fk_id_usuario: usuario.fk_id_usuario,
          fk_id_tipo_documento: usuario.fk_id_tipo_documento,
          fk_id_provincia: usuario.fk_id_provincia,
          fk_id_ciudad: usuario?.fk_id_ciudad,
          Usuario: {
            usuario: usuario.Usuario.usuario,
          },
        };

        const response = putPostulante(usuario.id, datosActualizados, token);

        if (response) {
          setEdit(false);
          setUsuario(datosActualizados);
          setIsSubmitting(false);
          toast.success("Datos actualizados con éxito");
        } else {
          toast.error("Error al actualizar los datos");
        }
      })
      .catch((error) => {
        const errores = {};
        error.inner.forEach((element) => {
          errores[element.path] = element.message;
        });
        setValidarErrores(errores);
        setIsSubmitting(true);
        toast.error("Error al actualizar los datos");
      });
  };

  const schema = yup.object().shape({
    id: yup.string().required("El número de documento es obligatorio"),
    nombre: yup.string().required("El nombre es obligatorio"),
    apellido: yup.string().required("El apellido es obligatorio"),
    // email: yup.string().email("Ingrese un correo electrónico válido"),
    fecha_nac: yup.date("La fecha de nacimiento es obligatoria").nullable(),
    tipoDocumento: yup.string(),
    // documento: yup.string(),
    telefono: yup.string().required("El número de teléfono es obligatorio"),
    nacionalidad: yup.string(),
    provincia: yup.string(),
    ciudad: yup.string(),
    cp: yup.string(),
    calle: yup.string(),
    nro: yup.string(),
    foto: yup.string(),
    fk_id_usuario: yup.string(),
    fk_id_tipo_documento: yup.string(),
    fk_id_provincia: yup.string(),
    fk_id_ciudad: yup.string(),
    Usuario: yup.object().shape({
      usuario: yup.string(),
    }),
  });

  const handleInputChange = (fieldName, value) => {
    setUsuario({ ...usuario, [fieldName]: value });

    try {
      schema.validateSyncAt(fieldName, { [fieldName]: value });
      setValidarErrores({ ...validarErrores, [fieldName]: null });
    } catch (error) {
      setValidarErrores({ ...validarErrores, [fieldName]: error.message });
    }
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Datos personales" />
      <Stack spacing={6}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            alt="User Img"
            src={usuario.foto}
            sx={{
              width: 180,
              height: 180,
              border: 2,
              borderColor: "primary.light",
              borderStyle: "dashed",
              boxShadow: 2,
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingX: 2,
            }}
          >
            <Typography variant="caption" display="block">
              Formato de imagen admitido: JPEG, PNG, JPG.
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
              endIcon={<AccountBoxIcon />}
            >
              Cambiar imagen
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                hidden
                onChange={(e) => console.log(e.target.files[0])}
              />
            </Button>
          </Box>
        </Stack>
        <Divider />
        <Box>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={4}
            paddingX={2}
            paddingBottom={3}
          >
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Nombre"
                variant="outlined"
                value={usuario.nombre || ""}
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={isFieldDisabled}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                error={Boolean(validarErrores.nombre)}
                helperText={
                  isSubmitting && validarErrores.nombre
                    ? validarErrores.nombre
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Apellido"
                variant="outlined"
                value={usuario.apellido || ""}
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={isFieldDisabled}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                error={Boolean(validarErrores.apellido)}
                helperText={
                  isSubmitting && validarErrores.apellido
                    ? validarErrores.apellido
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                type="email"
                label="Email"
                variant="outlined"
                value={usuario.Usuario.usuario || ""}
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={isFieldDisabled}
                onChange={(e) => {
                  setUsuario({
                    ...usuario,
                    Usuario: { ...usuario.Usuario, usuario: e.target.value },
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                type="date"
                disabled={isFieldDisabled}
                label="Fecha de nacimiento"
                variant="outlined"
                value={usuario.fecha_nac?.slice(0, 10) || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("fecha_nac", e.target.value)}
                error={Boolean(validarErrores.fecha_nac)}
                helperText={validarErrores.fecha_nac}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Tipo de documento"
                variant="outlined"
                select
                value={usuario.fk_id_tipo_documento || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    tipoDocumento: e.target.value,
                    fk_id_tipo_documento: e.target.value,
                  })
                }
              >
                {tiposDocumentos.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.tipo_documento}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Número de documento"
                variant="outlined"
                value={usuario.id || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("id", e.target.value)}
                error={Boolean(validarErrores.id)}
                helperText={validarErrores.id}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Número de teléfono"
                variant="outlined"
                value={usuario.telefono || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                error={Boolean(validarErrores.telefono)}
                helperText={
                  isSubmitting && validarErrores.telefono
                    ? validarErrores.telefono
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Nacionalidad"
                variant="outlined"
                value={usuario.nacionalidad || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handleInputChange("nacionalidad", e.target.value)
                }
                error={Boolean(validarErrores.nacionalidad)}
                helperText={validarErrores.nacionalidad}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Provincia"
                variant="outlined"
                select
                value={usuario.fk_id_provincia || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    provincia: e.target.value,
                    fk_id_provincia: e.target.value,
                  })
                }
              >
                {provincias.map((provincia) => (
                  <MenuItem key={provincia.id} value={provincia.id}>
                    {provincia.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Ciudad"
                variant="outlined"
                select
                value={usuario.fk_id_ciudad || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    ciudad: e.target.value,
                    fk_id_ciudad: e.target.value,
                  })
                }
              >
                {ciudades.map((ciudad) => (
                  <MenuItem key={ciudad.id} value={ciudad.id}>
                    {ciudad.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Código postal"
                variant="outlined"
                value={usuario.cp || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("cp", e.target.value)}
                error={Boolean(validarErrores.cp)}
                helperText={validarErrores.cp}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Calle"
                variant="outlined"
                value={usuario.calle || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("calle", e.target.value)}
                error={Boolean(validarErrores.calle)}
                helperText={validarErrores.calle}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Número de calle"
                variant="outlined"
                value={usuario.nro || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("nro", e.target.value)}
                error={Boolean(validarErrores.nro)}
                helperText={validarErrores.nro}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Button
                onClick={edit ? handleSave : handleEdit}
                disableElevation
                variant="contained"
                endIcon={edit ? <SaveIcon /> : <EditIcon />}
                sx={{
                  float: "right",
                }}
              >
                {edit ? "Guardar" : "Editar información"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <Toaster richColors closeButton />
    </Card>
  );
};

export default DatosPersonales;
