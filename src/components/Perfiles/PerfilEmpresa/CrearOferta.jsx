import {
  Box,
  CardHeader,
  Grid,
  Stack,
  Button,
  Card,
  TextField,
  MenuItem,
  Typography,

} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import * as yup from "yup";
import { useState, useEffect } from "react";
import { getEstudios } from "../../../services/estudios_service";
import { getJornadas } from "../../../services/jornadas_service";
import { getTiposContratos } from "../../../services/contratos_service";
import { postOferta } from "../../../services/ofertas_service";
import { getRubrosOfertas } from "../../../services/rubros_ofertas_service";
import { Toaster, toast } from "sonner";
import LockIcon from "@mui/icons-material/Lock";
import { EncryptStorage } from "encrypt-storage";
import { useNavigate } from "react-router-dom";

const modalidadDeTrabajo = [
  {
    value: "Presencial",
    label: "Presencial",
  },
  {
    value: "Remoto",
    label: "Remoto",
  },
  {
    value: "Híbrido",
    label: "Híbrido",
  },
];

const idiomas = [
  { id: 1, idioma: "Chino" },
  { id: 2, idioma: "Inglés" },
  { id: 3, idioma: "Portugués" },
  { id: 4, idioma: "Alemán" },
  { id: 5, idioma: "Francés" },
];

const niveles = [
  { id: 1, nivel: "Inicial" },
  { id: 2, nivel: "Intermedio" },
  { id: 3, nivel: "Avanzado" },
  { id: 4, nivel: "Nativo" },
];

const CrearOferta = () => {

  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const token = sessionStorage.getItem("token");
  const datosUsuario = encryptStorage.getItem("datosUsuario");
  const idEmpresa = datosUsuario.id;

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores
  const [estudios, setEstudios] = useState([]);
  const [jornadas, setJornadas] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [idiomasElegidos, setIdiomasElegidos] = useState([]);
  const [rubrosOfertas, setRubrosOfertas] = useState([]);
  const navigate = useNavigate();

  const [oferta, setOferta] = useState({
    tituloOferta: "",
    descripcion: "",
    fechaVigencia: "",
    horarioLaboralDesde: "",
    horarioLaboralHasta: "",
    edadDesde: null,
    edadHasta: null,
    experienciaPreviaDesc: "",
    idRubroOferta: null,
    zonaTrabajo: "",
    areasEstudio: "",
    otrosDetalles: "",
    beneficios: "",
    remuneracion: null,
    idEstudio: "",
    carrera: "",
    idJornada: "",
    idContrato: "",
    idEmpresa: idEmpresa,
    modalidadDeTrabajo: "",
    idiomas: [
      {
        nombre_idioma: "",
        nivel_oral: "",
        nivel_escrito: "",
      },
    ],
    preferencias: [
      {
        id: "",
      },
    ],
    aptitudes: [
      {
        id: "",
      },
    ],
  });

  useEffect(() => {
    const fetchEstudios = async () => {
      const response = await getEstudios();
      setEstudios(response);
    };
    const fetchJornadas = async () => {
      const response = await getJornadas();
      setJornadas(response.jornadas);
    };
    const fetchContratos = async () => {
      const response = await getTiposContratos();
      setContratos(response);
    };
    const getAptitudesData = async () => {
      const response = await getAptitudes();
      setAptitudes(response.aptitudes);
    };
    const getPreferenciasData = async () => {
      const response = await getPreferencias();
      setPreferencias(response.preferencias);
    };
    const fetchRubrosOfertasData = async () => {
      const response = await getRubrosOfertas();
      setRubrosOfertas(response);
    };

    fetchEstudios();
    fetchJornadas();
    fetchContratos();
    fetchRubrosOfertasData();
  }, []);

  const handleChangeAptitudes = (event) => {
    const idsAptitudes = [];
    event.target.value.forEach((aptitud) => {
      aptitudes.forEach((a) => {
        if (a.nombre_aptitud === aptitud) {
          idsAptitudes.push({ id: a.id });
        }
      });
    });
    setAptitudesElegidas(event.target.value);
    setOferta({ ...oferta, aptitudes: idsAptitudes });
  };

  const handleChangePreferencias = (event) => {
    const idsPreferencias = [];
    event.target.value.forEach((preferencia) => {
      preferencias.forEach((p) => {
        if (p.nombre_preferencia === preferencia) {
          idsPreferencias.push({ id: p.id });
        }
      });
    });
    setPreferenciasElegidas(event.target.value);
    setOferta({ ...oferta, preferencias: idsPreferencias });
  };

  const agregarNuevoIdioma = () => {
    setIdiomasElegidos([
      ...idiomasElegidos,
      {
        nombre_idioma: "",
        nivel_oral: "",
        nivel_escrito: "",
      },
    ]);
  };

  const handleIdiomaChange = (e, index) => {
    const { value } = e.target;
    setIdiomasElegidos((prevIdiomas) => {
      const nuevosIdiomas = [...prevIdiomas];
      nuevosIdiomas[index] = { ...nuevosIdiomas[index], nombre_idioma: value };
      return nuevosIdiomas;
    });
  };

  const handleNivelOralChange = (e, index) => {
    const { value } = e.target;
    setIdiomasElegidos((prevIdiomas) => {
      const nuevosIdiomas = [...prevIdiomas];
      nuevosIdiomas[index] = { ...nuevosIdiomas[index], nivel_oral: value };
      return nuevosIdiomas;
    });
  };

  const handleNivelEscritoChange = (e, index) => {
    const { value } = e.target;
    setIdiomasElegidos((prevIdiomas) => {
      const nuevosIdiomas = [...prevIdiomas];
      nuevosIdiomas[index] = { ...nuevosIdiomas[index], nivel_escrito: value };
      return nuevosIdiomas;
    });
  };

  const handleDescartarIdioma = (index) => {
    return () => {
      setIdiomasElegidos((prevIdiomas) => {
        const nuevosIdiomas = [...prevIdiomas];
        nuevosIdiomas.splice(index, 1);
        return nuevosIdiomas;
      });
    };
  };

  const handleSubmit = () => {
    schema
      .validate(oferta, { abortEarly: false })
      .then(async () => {
        const response = await postOferta(oferta, token);
        if (response) {
          toast.success("Oferta creada con éxito");
          toast("A la brevedad será revisada por un administrador");
          setTimeout(() => {
            navigate("/perfil?section=verOfertas");
          }, 3000);
        } else {
          toast.error("Error al crear la oferta");
        }
      })
      .catch((err) => {
        const errores = {};
        err.inner.forEach((e) => {
          errores[e.path] = e.errors[0];
        });
        setValidarErrores(errores);
      });
  };

  useEffect(() => {
    setOferta({ ...oferta, idiomas: idiomasElegidos });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idiomasElegidos]);

  const schema = yup.object().shape({
    tituloOferta: yup.string().required("El nombre es obligatorio"),
    descripcion: yup.string().required("La descripción es obligatoria"),
    fechaVigencia: yup
      .date()
      .typeError("Ingrese una fecha válida")
      .required("La fecha de vigencia es obligatoria")
      .min(new Date(), "La fecha de vigencia debe ser mayor a la fecha actual"),
    horarioLaboralDesde: yup
      .string()
      .required("El horario desde es obligatorio"),
    horarioLaboralHasta: yup
      .string()
      .required("El horario hasta es obligatorio"),
    edadDesde: yup
      .number()
      .typeError("Ingrese un número válido")
      .positive("La edad mínima debe ser mayor a 0")
      .integer("La edad mínima debe ser un número entero")
      .max(yup.ref("edadHasta"), "La edad mínima debe ser menor a la máxima")
      .nullable(),
    edadHasta: yup
      .number()
      .typeError("Ingrese un número válido")
      .positive("La edad máxima debe ser mayor a 0")
      .integer("La edad máxima debe ser un número entero")
      .min(yup.ref("edadDesde"), "La edad máxima debe ser mayor a la mínima")
      .nullable(),
    experienciaPreviaDesc: yup
      .string()
      .required("La experiencia previa es obligatoria"),
    zonaTrabajo: yup.string().required("La zona de trabajo es obligatoria"),
    areasEstudio: yup.string().required("El área de estudio es obligatoria"),
    otrosDetalles: yup.string().optional(),
    beneficios: yup.string().optional(),
    remuneracion: yup
      .number()
      .typeError("Ingrese un número válido")
      .positive("La remuneración debe ser mayor a 0")
      .integer("La remuneración debe ser un número entero")
      .nullable(),
    idEstudio: yup.string().required("El estudio es obligatorio"),
    idJornada: yup.string().required("La jornada es obligatoria"),
    idContrato: yup.string().required("El contrato es obligatorio"),
    modalidadDeTrabajo: yup.string().required("La modalidad es obligatoria"),
    
  });

  return (
    <Card type="section" elevation={8}>
      <CardHeader title="Datos de la oferta" />
      {datosUsuario.Estado.id === 2 ? 
      (
        <>
          <Box padding={2} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2
          }}>
            <LockIcon fontSize="large" sx={{
              color: "#f44336"
            }} />
            <Typography variant="h5" gutterBottom>
              No puedes crear ofertas si tu cuenta no ha sido verificada. Por favor, contacta al administrador.
            </Typography>
          </Box>
        </>
      ) : <Stack spacing={6}>
        <Box>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={4}
            paddingX={2}
            paddingBottom={3}
            paddingTop={3}
          >
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Nombre de la oferta"
                variant="outlined"
                value={oferta.tituloOferta || ""}
                onChange={(e) => {
                  setOferta({ ...oferta, tituloOferta: e.target.value });
                }}
                error={Boolean(validarErrores.tituloOferta)}
                helperText={validarErrores.tituloOferta}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                multiline
                value={oferta.descripcion || ""}
                onChange={(e) => {
                  setOferta({ ...oferta, descripcion: e.target.value });
                }}
                error={Boolean(validarErrores.descripcion)}
                helperText={validarErrores.descripcion}
              />
            </Grid>
           
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                label="Horario laboral (desde)"
                variant="outlined"
                fullWidth
                value={oferta.horarioLaboralDesde || ""}
                onChange={(e) => {
                  setOferta({ ...oferta, horarioLaboralDesde: e.target.value });
                }}
                error={Boolean(validarErrores.horarioLaboralDesde)}
                helperText={validarErrores.horarioLaboralDesde}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Horario laboral (hasta)"
                variant="outlined"
                value={oferta.horarioLaboralHasta || ""}
                onChange={(e) => {
                  setOferta({ ...oferta, horarioLaboralHasta: e.target.value });
                }}
                error={Boolean(validarErrores.horarioLaboralHasta)}
                helperText={validarErrores.horarioLaboralHasta}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Edad mínima"
                variant="outlined"
                value={oferta.edadDesde || ""}
                onChange={(e) => {
                  setOferta({ ...oferta, edadDesde: e.target.value });
                }}
                error={Boolean(validarErrores.edadDesde)}
                helperText={validarErrores.edadDesde}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Edad máxima"
                variant="outlined"
                value={oferta.edadHasta || ""}
                onChange={(e) => {
                  setOferta({ ...oferta, edadHasta: e.target.value });
                }}
                error={Boolean(validarErrores.edadHasta)}
                helperText={validarErrores.edadHasta}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Fecha de vigencia"
                InputLabelProps={{ shrink: true }}
                type="date"
                variant="outlined"
                value={oferta.fechaVigencia || ""}
                onChange={(e) => {
                  setOferta({ ...oferta, fechaVigencia: e.target.value });
                }}
                error={Boolean(validarErrores.fechaVigencia)}
                helperText={validarErrores.fechaVigencia}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                multiline
                label="Experiencia previa"
                variant="outlined"
                value={oferta.experienciaPreviaDesc || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    experienciaPreviaDesc: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.experienciaPreviaDesc)}
                helperText={validarErrores.experienciaPreviaDesc}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Rubro"
                variant="outlined"
                select
                value={oferta.idRubroOferta || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    idRubroOferta: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.idRubroOferta)}
                helperText={validarErrores.idRubroOferta}
              >
                {rubrosOfertas.map((rubro) => (
                  <MenuItem key={rubro.id} value={rubro.id}>
                    {rubro.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Zona de trabajo"
                variant="outlined"
                value={oferta.zonaTrabajo || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    zonaTrabajo: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.zonaTrabajo)}
                helperText={validarErrores.zonaTrabajo}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                multiline
                label="Area de estudio"
                variant="outlined"
                value={oferta.areasEstudio || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    areasEstudio: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.areasEstudio)}
                helperText={validarErrores.areasEstudio}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                multiline
                label="Tareas a realizar"
                variant="outlined"
                value={oferta.otrosDetalles || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    otrosDetalles: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.otrosDetalles)}
                helperText={validarErrores.otrosDetalles}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                multiline
                label="Beneficios"
                variant="outlined"
                value={oferta.beneficios || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    beneficios: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.beneficios)}
                helperText={validarErrores.beneficios}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Remuneración"
                variant="outlined"
                value={oferta.remuneracion || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    remuneracion: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.remuneracion)}
                helperText={validarErrores.remuneracion}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                select
                fullWidth
                label="Estudio"
                variant="outlined"
                value={oferta.idEstudio || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    idEstudio: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.idEstudio)}
                helperText={validarErrores.idEstudio}
              >
                {estudios.map((estudio) => (
                  <MenuItem key={estudio.id} value={estudio.id}>
                    {estudio.nombre_estudio} {estudio.estado_estudio}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                fullWidth
                label="Carrera"
                variant="outlined"
                value={oferta.carrera || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    carrera: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.carrera)}
                helperText={validarErrores.carrera}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                select
                fullWidth
                label="Jornada"
                variant="outlined"
                value={oferta.idJornada || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    idJornada: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.idJornada)}
                helperText={validarErrores.idJornada}
              >
                {jornadas.map((jornada) => (
                  <MenuItem key={jornada.id} value={jornada.id}>
                    {jornada.nombre_jornada}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                select
                fullWidth
                label="Contrato"
                variant="outlined"
                value={oferta.idContrato || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    idContrato: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.idContrato)}
                helperText={validarErrores.idContrato}
              >
                {contratos.map((contrato) => (
                  <MenuItem key={contrato.id} value={contrato.id}>
                    {contrato.nombre_contrato}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                select
                fullWidth
                label="Modalidad de trabajo"
                variant="outlined"
                value={oferta.modalidadDeTrabajo || ""}
                onChange={(e) => {
                  setOferta({
                    ...oferta,
                    modalidadDeTrabajo: e.target.value,
                  });
                }}
                error={Boolean(validarErrores.modalidadDeTrabajo)}
                helperText={validarErrores.modalidadDeTrabajo}
              >
                {modalidadDeTrabajo.map((modalidad) => (
                  <MenuItem key={modalidad.value} value={modalidad.value}>
                    {modalidad.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            {/*<Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Idiomas requeridos
              </Typography>
              <Grid container spacing={2} paddingY={2}>
                {idiomasElegidos.map((idiomaElegido, index) => (
                  <Fragment key={index}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        select
                        label="Idioma"
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                          },
                          "&& .MuiFormLabel-root.Mui-disabled": {
                            color: "rgba(0, 0, 0, 0.80)",
                          },
                        }}
                        value={idiomaElegido.nombre_idioma || ""}
                        onChange={(e) => handleIdiomaChange(e, index)}
                      >
                        <MenuItem value="" disabled>
                          Selecciona un idioma
                        </MenuItem>
                        {idiomas.map((idioma) => (
                          <MenuItem key={idioma.id} value={idioma.idioma}>
                            {idioma.idioma}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        select
                        label="Nivel oral"
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                          },
                          "&& .MuiFormLabel-root.Mui-disabled": {
                            color: "rgba(0, 0, 0, 0.80)",
                          },
                        }}
                        value={idiomaElegido.nivel_oral || ""}
                        onChange={(e) => handleNivelOralChange(e, index)}
                      >
                        <MenuItem value="" disabled>
                          Selecciona un nivel oral
                        </MenuItem>
                        {niveles.map((nivel) => (
                          <MenuItem key={nivel.id} value={nivel.nivel}>
                            {nivel.nivel}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        select
                        label="Nivel escrito"
                        variant="outlined"
                        fullWidth
                        sx={{
                          "& .MuiInputBase-input.Mui-disabled": {
                            WebkitTextFillColor: "rgba(0, 0, 0, 0.80)",
                          },
                          "&& .MuiFormLabel-root.Mui-disabled": {
                            color: "rgba(0, 0, 0, 0.80)",
                          },
                        }}
                        value={idiomaElegido.nivel_escrito || ""}
                        onChange={(e) => handleNivelEscritoChange(e, index)}
                      >
                        <MenuItem value="" disabled>
                          Selecciona un nivel escrito
                        </MenuItem>
                        {niveles.map((nivel) => (
                          <MenuItem key={nivel.id} value={nivel.nivel}>
                            {nivel.nivel}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <Button
                        disableElevation
                        variant="outlined"
                        color="error"
                        sx={{ marginTop: 1 }}
                        fullWidth
                        onClick={handleDescartarIdioma(index)}
                      >
                        Eliminar idioma
                      </Button>
                    </Grid>
                  </Fragment>
                ))}
              </Grid>
              <Button
                disableElevation
                variant="contained"
                onClick={agregarNuevoIdioma}
                sx={{ marginTop: 1 }}
              >
                Agregar nuevo idioma
              </Button>
            </Grid>*/}
            {/*<Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Aptitudes
              </Typography>
              <Grid container spacing={2} paddingY={1}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <>
                      <Select
                        labelId="aptitudes-chip-label"
                        id="aptitudes-chip"
                        multiple
                        value={aptitudesElegidas || []}
                        onChange={handleChangeAptitudes}
                        input={
                          <OutlinedInput
                            id="select-aptitudes-chip"
                            label="Aptitudes"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        <MenuItem value="" disabled>
                          Selecciona una aptitud
                        </MenuItem>
                        {aptitudes.map((aptitud) => (
                          <MenuItem
                            key={aptitud.id}
                            value={aptitud.nombre_aptitud}
                          >
                            {aptitud.nombre_aptitud}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  </FormControl>
                </Grid>
              </Grid>
                      </Grid>*/}
            {/*<Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" gutterBottom>
                Preferencias
              </Typography>
              <Grid container spacing={2} paddingY={1}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl sx={{ width: "100%" }}>
                    <>
                      <Select
                        labelId="preferencias-chip-label"
                        id="preferencias-chip"
                        multiple
                        value={preferenciasElegidas || []}
                        onChange={handleChangePreferencias}
                        input={
                          <OutlinedInput
                            id="select-preferencias-chip"
                            label="Preferencias"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        <MenuItem value="" disabled>
                          Selecciona una preferencia
                        </MenuItem>
                        {preferencias.map((preferencia) => (
                          <MenuItem
                            key={preferencia.id}
                            value={preferencia.nombre_preferencia}
                          >
                            {preferencia.nombre_preferencia}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  </FormControl>
                </Grid>
              </Grid>
                      </Grid>*/}

            <Grid item xs={12} sm={12} md={12}>
              <Button
                onClick={handleSubmit}
                disableElevation
                variant="contained"
                endIcon={<AddCircleIcon />}
                sx={{
                  float: "right",
                }}
              >
                Crear oferta
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>}
      <Toaster richColors closeButton />
    </Card>
  );
};

export default CrearOferta;
