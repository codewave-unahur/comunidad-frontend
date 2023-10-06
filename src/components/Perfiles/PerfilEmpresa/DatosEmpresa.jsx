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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SaveIcon from "@mui/icons-material/Save";

import { getEmpresaByIdUsuario } from "../../../services/empresas_service";
import { getProvincias } from "../../../services/provincias_service";
import { getCiudades } from "../../../services/ciudades_service";

import { useEffect, useState } from "react";

const DatosEmpresa = () => {
  const idUsuario = sessionStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [isSubmitting, setIsSubmitting] = useState(false); // Para validar el formulario
  const [edit, setEdit] = useState(false); // Para habilitar los campos de edición
  const isFieldDisabled = !edit;
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [empresa, setEmpresa] = useState({});

  console.log(empresa);

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

  const handleSave = () => {
    setEdit(false);
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
            alt="User Img"
            src={empresa.logo}
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
                value={empresa.nombre_empresa || ""}
                fullWidth
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Descripción"
                variant="outlined"
                value={empresa.descripcion || ""}
                fullWidth
                multiline
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Nombre del representante"
                variant="outlined"
                value={empresa.nombre_representante || ""}
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
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Teléfono del representante"
                variant="outlined"
                value={empresa.telefono || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Web de la empresa"
                variant="outlined"
                value={empresa.web || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Nacionalidad"
                variant="outlined"
                value={empresa.pais || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Provincia"
                variant="outlined"
                value={empresa.Provincia?.nombre || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Ciudad"
                variant="outlined"
                value={empresa.Ciudad?.nombre || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Código postal"
                variant="outlined"
                value={empresa.cp || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Calle"
                variant="outlined"
                value={empresa.calle || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Número de calle"
                variant="outlined"
                value={empresa.nro || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Piso"
                variant="outlined"
                value={empresa.piso || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                disabled={isFieldDisabled}
                label="Departamento"
                variant="outlined"
                value={empresa.depto || ""}
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
    </Card>
  );
};

export default DatosEmpresa;
