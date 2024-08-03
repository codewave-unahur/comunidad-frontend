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
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SaveIcon from "@mui/icons-material/Save";

import {
  getEmpresaByIdUsuario,
  putEmpresa,
} from "../../../services/empresas_service";
import { getProvincias } from "../../../services/provincias_service";
import { getCiudades } from "../../../services/ciudades_service";
import { uploadLogo } from "../../../services/files_service";

import { Toaster, toast } from "sonner";

import * as yup from "yup";
import { EncryptStorage } from "encrypt-storage";
import { useEffect, useState } from "react";

const DatosEmpresa = () => {


  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const idUsuario = encryptStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");
  const datosUsuario = encryptStorage.getItem("datosUsuario");

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Para validar el formulario
  const [edit, setEdit] = useState(false); // Para habilitar los campos de edición
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null); // Para guardar la imagen seleccionada en el input[type=file]
  const [isImageSelected, setIsImageSelected] = useState(false); // Para controlar si se seleccionó una imagen o no
  const isFieldDisabled = !edit;
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [empresa, setEmpresa] = useState({});

  useEffect(() => {
    const getEmpresa = async () => {
      const response = await getEmpresaByIdUsuario(idUsuario);
      setEmpresa(response);
    };
    getEmpresa();
  }, [idUsuario]);

  useEffect(() => {
    const traerProvincias = async () => {
      const response = await getProvincias();
      setProvincias(response.provincias);
    };
    traerProvincias();
  }, []);

  useEffect(() => {
    const traerCiudades = async () => {
      const response = await getCiudades(empresa.fk_id_provincia);
      if (response && response.ciudades) {
        setCiudades(response.ciudades);
      }
    };

    if (empresa.fk_id_provincia) {
      traerCiudades();
    }
  }, [empresa.fk_id_provincia]);

  const handleEdit = () => {
    setEdit(true);
    setIsSubmitting(false);
  };

  const handleSaveLogo = async (logo, id) => {
    try {
      const response = await uploadLogo(logo, id);
      if (response) {
        setEmpresa({
          ...empresa,
          logo: response,
        });
        const datosUsuario = encryptStorage.getItem("datosUsuario");
        datosUsuario.logo = response.url;
        encryptStorage.setItem("datosUsuario", datosUsuario);
        toast.success("Logo actualizado correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Error al actualizar el logo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    schema
      .validate(empresa, { abortEarly: false })
      .then(() => {
        const datosActualizados = {
          nombre_empresa: empresa.nombre_empresa,
          nombreEmpresa: empresa.nombre_empresa,
          descripcion: empresa.descripcion,
          rol_representante: empresa.rol_representante,
          rolRepresentante: empresa.rol_representante,
          nombre_representante: empresa.nombre_representante,
          nombreRepresentante: empresa.nombre_representante,
          email_representante: empresa.email_representante,
          emailRepresentante: empresa.email_representante,
          telefono: empresa.telefono,
          web: empresa.web,
          pais: empresa.pais,
          fk_id_provincia: empresa.fk_id_provincia,
          provincia: empresa.fk_id_provincia,
          fk_id_ciudad: empresa.fk_id_ciudad,
          ciudad: empresa.fk_id_ciudad,
          cp: empresa.cp,
          calle: empresa.calle,
          nro: empresa.nro,
          piso: empresa.piso,
          depto: empresa.depto,
          logo: empresa.logo,
        };

        const response = putEmpresa(empresa.id, datosActualizados, token);

        if (response) {
          setEdit(false);
          setEmpresa(datosActualizados);
          setIsSubmitting(false);
          toast.success("Datos actualizados correctamente");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.error("Error al actualizar los datos");
        }
      })
      .catch((error) => {
        const errores = {};
        error.inner.forEach((e) => {
          errores[e.path] = e.message;
        });
        setValidarErrores(errores);
        setIsSubmitting(true);
        toast.error("Error al actualizar los datos");
      });
  };

  const schema = yup.object().shape({
    nombre_empresa: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripción es obligatoria"),
    rol_representante: yup.string().required("El rol es obligatorio"),
    nombre_representante: yup
      .string()
      .required("El nombre del representante es obligatorio"),
    email_representante: yup
      .string()
      .email("El email debe ser un email válido")
      .required("El email es obligatorio"),
    telefono: yup
      .number()
      .typeError("El teléfono debe ser un número")
      .required("El teléfono es obligatorio")
      .integer("El teléfono debe ser un número entero")
      .positive("El teléfono debe ser un número positivo")
      .max(9999999999, "El teléfono debe tener como máximo 10 dígitos"),
    web: yup
      .string()
      .url("La web debe ser una URL válida")
      .required("La web es obligatoria"),
    pais: yup.string().required("El país es obligatorio"),
    fk_id_provincia: yup.string().required("La provincia es obligatoria"),
    fk_id_ciudad: yup.string().required("La ciudad es obligatoria"),
    cp: yup
      .number()
      .typeError("El código postal debe ser un número")
      .required("El código postal es obligatorio")
      .integer("El código postal debe ser un número entero")
      .positive("El código postal debe ser un número positivo")
      .max(9999, "El código postal debe tener como máximo 4 dígitos"),
    calle: yup.string().required("La calle es obligatoria"),
    nro: yup
      .number()
      .typeError("El número de calle debe ser un número")
      .required("El número de calle es obligatorio")
      .integer("El número de calle debe ser un número entero")
      .positive("El número de calle debe ser un número positivo"),
    piso: yup
      .number()
      .typeError("El piso debe ser un número")
      .integer("El piso debe ser un número entero")
      .positive("El piso debe ser un número positivo")
      .max(999, "El piso debe tener como máximo 3 dígitos")
      .nullable(),
    depto: yup.string(),
  });

  const handleImageChange = (e) => {
    setImagenSeleccionada(e.target.files[0]);
    setIsImageSelected(true);
  };

  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Datos de la empresa" />
      <Stack spacing={6}>
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            alt={empresa.nombre_empresa}
            src={
              isImageSelected
                ? URL.createObjectURL(imagenSeleccionada)
                : empresa.logo
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
              <>
              <Button
                onClick={() => handleSaveLogo(imagenSeleccionada, empresa.id)}
                sx={{
                  marginTop: 2,
                }}
                variant="outlined"
                size="medium"
                color="success"
              >
                Confirmar imagen
              </Button>
              <Tooltip>
                <Typography variant="caption" color="textSecondary">
                    Para cambiar la imagen, presione el botón "Confirmar imagen".
                </Typography>
              </Tooltip>
              </>
            )}
            {
              datosUsuario.Estado.id === 2 && !datosUsuario.logo ? (
                <Typography variant="caption" color="error">
                    Su cuenta aún no ha sido verificada. Para agilizar el proceso, por favor suba el logo de su empresa.
                </Typography>
              ) : null
            }
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
                value={empresa.nombre_empresa || ""}
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    nombre_empresa: e.target.value,
                    nombreEmpresa: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.nombre_empresa}
                helperText={
                  isSubmitting && validarErrores.nombre_empresa
                    ? validarErrores.nombre_empresa
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Descripción"
                variant="outlined"
                value={empresa.descripcion || ""}
                InputLabelProps={{ shrink: true }}
                fullWidth
                multiline
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    descripcion: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.descripcion}
                helperText={
                  isSubmitting && validarErrores.descripcion
                    ? validarErrores.descripcion
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Rol del representante"
                variant="outlined"
                value={empresa.rol_representante || ""}
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    rol_representante: e.target.value,
                    rolRepresentante: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.rol_representante}
                helperText={
                  isSubmitting && validarErrores.rol_representante
                    ? validarErrores.rol_representante
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Nombre del representante"
                variant="outlined"
                value={empresa.nombre_representante || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    nombre_representante: e.target.value,
                    nombreRepresentante: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.nombre_representante}
                helperText={
                  isSubmitting && validarErrores.nombre_representante
                    ? validarErrores.nombre_representante
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                type="email"
                label="Email del representante"
                variant="outlined"
                value={empresa.email_representante || ""}
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    email_representante: e.target.value,
                    emailRepresentante: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.email_representante}
                helperText={
                  isSubmitting && validarErrores.email_representante
                    ? validarErrores.email_representante
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Teléfono del representante"
                variant="outlined"
                value={empresa.telefono || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    telefono: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.telefono}
                helperText={
                  isSubmitting && validarErrores.telefono
                    ? validarErrores.telefono
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Web de la empresa"
                variant="outlined"
                value={empresa.web || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    web: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.web}
                helperText={
                  isSubmitting && validarErrores.web ? validarErrores.web : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Nacionalidad"
                variant="outlined"
                value={empresa.pais || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    pais: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.pais}
                helperText={
                  isSubmitting && validarErrores.pais ? validarErrores.pais : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Provincia"
                variant="outlined"
                select
                value={
                  provincias.find(
                    (provincia) => provincia.id === empresa.fk_id_provincia
                  )?.id || ""
                }
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    fk_id_provincia: e.target.value,
                    provincia: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.fk_id_provincia}
                helperText={
                  isSubmitting && validarErrores.fk_id_provincia
                    ? validarErrores.fk_id_provincia
                    : ""
                }
              >
                <MenuItem value="">Selecciona una provincia</MenuItem>
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Ciudad"
                variant="outlined"
                select
                value={
                  ciudades.find((ciudad) => ciudad.id === empresa.fk_id_ciudad)
                    ?.id || ""
                }
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    fk_id_ciudad: e.target.value,
                    ciudad: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.fk_id_ciudad}
                helperText={
                  isSubmitting && validarErrores.fk_id_ciudad
                    ? validarErrores.fk_id_ciudad
                    : ""
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
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Código postal"
                variant="outlined"
                value={empresa.cp || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    cp: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.cp}
                helperText={
                  isSubmitting && validarErrores.cp ? validarErrores.cp : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Calle"
                variant="outlined"
                value={empresa.calle || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    calle: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.calle}
                helperText={
                  isSubmitting && validarErrores.calle
                    ? validarErrores.calle
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Número de calle"
                variant="outlined"
                value={empresa.nro || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    nro: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.nro}
                helperText={
                  isSubmitting && validarErrores.nro ? validarErrores.nro : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Piso"
                variant="outlined"
                value={empresa.piso === null ? "" : empresa.piso || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    piso:
                      e.target.value === "" ? null : parseInt(e.target.value),
                  })
                }
                error={isSubmitting && validarErrores.piso}
                helperText={
                  isSubmitting && validarErrores.piso ? validarErrores.piso : ""
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                  },
                  "&& .MuiFormLabel-root.Mui-disabled": {
                    color: "rgba(0, 0, 0, 0.80)",
                  },
                }}
                label="Departamento"
                variant="outlined"
                value={empresa.depto || ""}
                InputLabelProps={{ shrink: true }}
                onChange={(e) =>
                  setEmpresa({
                    ...empresa,
                    depto: e.target.value,
                  })
                }
                error={isSubmitting && validarErrores.depto}
                helperText={
                  isSubmitting && validarErrores.depto
                    ? validarErrores.depto
                    : ""
                }
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

export default DatosEmpresa;
