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
import { uploadFoto } from "../../../services/files_service";

const DatosPersonales = () => {
  const idUsuario = sessionStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Para validar el formulario
  const [edit, setEdit] = useState(false); // Para habilitar los campos de edición
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null); // Para guardar la imagen seleccionada en el input[type=file]
  const [isImageSelected, setIsImageSelected] = useState(false); // Para controlar si se seleccionó una imagen o no
  const isFieldDisabled = !edit;
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [usuario, setUsuario] = useState({
    id: "",
    nombre: "",
    apellido: "",
    fecha_nac: "",
    tipo_documento: null,
    documento: "",
    telefono: "",
    nacionalidad: "",
    provincia: "",
    ciudad: "",
    cp: "",
    calle: "",
    nro: "",
    foto: "",
    Usuario: {
      usuario: "",
    },
    piso: "",
    depto: "",
    presentacion: "",
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

  const handleSaveFoto = async (foto, id, token) => {
    try {
      const response = await uploadFoto(foto, id, token);
      if (response) {
        setUsuario({ ...usuario, foto: response });
        const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
        datosUsuario.foto = response.url;
        sessionStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
        toast.success("Foto actualizada con éxito");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Error al actualizar la foto");
      }
    } catch (error) {
      console.log(error);
    }
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
          tipoDocumento: usuario.tipo_documento,
          documento: usuario.documento,
          telefono: usuario.telefono,
          nacionalidad: usuario.nacionalidad,
          provincia: usuario.provincia,
          ciudad: usuario.ciudad,
          cp: usuario.cp,
          calle: usuario.calle,
          nro: usuario.nro,
          foto: usuario.foto,
          Usuario: {
            usuario: usuario.Usuario.usuario,
          },
          piso: usuario.piso,
          depto: usuario.depto,
          presentacion: usuario.presentacion,
        };

        const response = putPostulante(usuario.id, datosActualizados, token);

        if (response) {
          setEdit(false);
          setUsuario(datosActualizados);
          setIsSubmitting(false);
          toast.success("Datos actualizados con éxito");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
    tipo_documento: yup.string(),
    // documento: yup.string(),
    telefono: yup
      .number()
      .typeError("Ingrese un número de teléfono válido")
      .required("El número de teléfono es obligatorio")
      .positive("El número de teléfono debe ser positivo")
      .integer("El número de teléfono debe ser un número entero"),
    nacionalidad: yup.string(),
    provincia: yup.string(),
    ciudad: yup.string(),
    cp: yup
      .number()
      .typeError("El código postal debe ser un número")
      .required("El código postal es obligatorio")
      .integer("El código postal debe ser un número entero")
      .positive("El código postal debe ser un número positivo")
      .max(9999, "El código postal debe tener como máximo 4 dígitos"),
    calle: yup.string(),
    nro: yup
      .number()
      .typeError("El número de calle debe ser un número")
      .integer("El número de calle debe ser un número entero")
      .positive("El número de calle debe ser un número positivo")
      .nullable(),
    Usuario: yup.object().shape({
      usuario: yup.string(),
    }),
    piso: yup
      .number()
      .typeError("El piso debe ser un número")
      .integer("El piso debe ser un número entero")
      .positive("El piso debe ser un número positivo")
      .nullable(),
    depto: yup.string().optional(),
    presentacion: yup.string().optional(),
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

  const handleImageChange = (e) => {
    setImagenSeleccionada(e.target.files[0]);
    setIsImageSelected(true);
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
            alt={usuario.nombre + " " + usuario.apellido}
            src={
              isImageSelected
                ? URL.createObjectURL(imagenSeleccionada)
                : usuario.foto
            }
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
              sx={{
                marginTop: 1,
              }}
            >
              Cambiar imagen
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {isImageSelected && (
              <Button
                onClick={() =>
                  handleSaveFoto(imagenSeleccionada, usuario.id, token)
                }
                sx={{
                  marginTop: 2,
                }}
                variant="outlined"
                size="medium"
                color="success"
              >
                Confirmar imagen
              </Button>
            )}
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
                id="tipo_documento"
                name="tipo_documento"
                variant="outlined"
                select
                value={
                  tiposDocumentos.find(
                    (tipo) => tipo.id === parseInt(usuario.tipo_documento)
                  )?.id || ""
                }
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    tipo_documento: e.target.value,
                  })
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
                value={
                  ciudades.find((ciudad) => ciudad.id === usuario.fk_id_ciudad)
                    ?.id || ""
                }
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setUsuario({
                    ...usuario,
                    ciudad: e.target.value,
                    fk_id_ciudad: e.target.value,
                  })
                }
              >
                <MenuItem value="">Selecciona una ciudad</MenuItem>
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
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Piso"
                variant="outlined"
                value={usuario.piso || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("piso", e.target.value)}
                error={Boolean(validarErrores.piso)}
                helperText={validarErrores.piso}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Departamento"
                variant="outlined"
                value={usuario.depto || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("depto", e.target.value)}
                error={Boolean(validarErrores.depto)}
                helperText={validarErrores.depto}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Presentación"
                variant="outlined"
                multiline
                value={usuario.presentacion || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  handleInputChange("presentacion", e.target.value)
                }
                error={Boolean(validarErrores.presentacion)}
                helperText={validarErrores.presentacion}
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
