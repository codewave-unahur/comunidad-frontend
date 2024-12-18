import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Slide,
  Stack,
  Typography,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BusinessIcon from "@mui/icons-material/Business";
import PostAddIcon from "@mui/icons-material/PostAdd";
import StorageIcon from "@mui/icons-material/Storage";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BarChartIcon from '@mui/icons-material/BarChart';
import CollectionsIcon from "@mui/icons-material/Collections";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WorkIcon from "@mui/icons-material/Work";
import Header from "../Header/Header";
import DatosPersonales from "./PerfilPostulante/DatosPersonales";
import DatosAcademicos from "./PerfilPostulante/DatosAcademicos";
import MisPostulaciones from "./PerfilPostulante/MisPostulaciones";
import CurriculumVitae from "./PerfilPostulante/CurriculumVitae";
import DatosEmpresa from "./PerfilEmpresa/DatosEmpresa";
import VerOfertas from "./PerfilEmpresa/VerOfertas";
import CrearOferta from "./PerfilEmpresa/CrearOferta";
import Postulantes from "./PerfilAdministrador/Postulantes";
import Ofertas from "./PerfilAdministrador/Ofertas";
import Empresas from "./PerfilAdministrador/Empresas";
// import Base from "./PerfilPostulante/Base";
import Galeria from "./PerfilAdministrador/Galeria";
import { getPostulanteById } from "../../services/postulantes_service";
import { getEmpresaByIdUsuario } from "../../services/empresas_service";
import { forwardRef, useEffect, useState } from "react";
import { postularseBaseConstante } from "../../services/postulaciones_service";
import { uploadCV } from "../../services/files_service";
import { Toaster, toast } from "sonner";
import Newsletter from "./PerfilAdministrador/Newsletter";
import ExperienciaLaboral from "./PerfilPostulante/ExperienciaLaboral";
import { EncryptStorage } from "encrypt-storage";
import LockIcon from '@mui/icons-material/Lock';
import CambiarContraseña from "./CambiarContraseña";
import Estadisticas from "./PerfilAdministrador/Estadisticas";
import ArticleIcon from '@mui/icons-material/Article';
import Articulos from "./PerfilAdministrador/Articulos";
import VerArticulos from "./PerfilGraduado/VerArticulos";
import CrearArticulo from "./PerfilGraduado/CrearArticulo";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const menuOptionsPostulante = [
  {
    id: "1",
    name: "datosPersonales",
    Icon: PersonIcon,
    text: "Datos personales",
    renderSection: <DatosPersonales />,
  },
  {
    id: "2",
    name: "cambiarContraseña",
    Icon: LockIcon,
    text: "Cambiar contraseña",
    renderSection: <CambiarContraseña />
  },
  {
    id: "3",
    name: "datosAcademicos",
    Icon: SchoolIcon,
    text: "Datos académicos",
    renderSection: <DatosAcademicos />,
  },
  {
    id: "4",
    name: "experiencia",
    Icon: WorkIcon,
    text: "Experiencia laboral",
    renderSection: <ExperienciaLaboral />,
  },
  {
    id: "5",
    name: "curriculumVitae",
    Icon: DescriptionIcon,
    text: "Curriculum Vitae",
    renderSection: <CurriculumVitae />,
  },
  {
    id: "6",
    name: "misPostulaciones",
    Icon: AssignmentIcon,
    text: "Mis postulaciones",
    renderSection: <MisPostulaciones />,
  },
];

const menuOptionsEmpresa = [
  {
    id: "1",
    name: "datosEmpresa",
    Icon: BusinessIcon,
    text: "Datos",
    renderSection: <DatosEmpresa />,
  },
  {
    id: "2",
    name: "CambiarContraseña",
    Icon: LockIcon,
    text: "Cambiar contraseña",
    renderSection: <CambiarContraseña />
  },
  {
    id: "3",
    name: "verOfertas",
    Icon: AssignmentIcon,
    text: "Ver ofertas",
    renderSection: <VerOfertas />,
  },
  {
    id: "4",
    name: "crearOferta",
    Icon: PostAddIcon,
    text: "Crear oferta",
    renderSection: <CrearOferta />,
  },
];

const menuOptionsAdmin = [
  {
    id: "1",
    name: "postulantes",
    Icon: PersonIcon,
    text: "Postulantes",
    renderSection: <Postulantes />,
  },
  {
    id: "2",
    name: "cambiarContraseña",
    Icon: LockIcon,
    text: "Cambiar contraseña",
    renderSection: <CambiarContraseña />,
  },
  {
    id: "3",
    name: "ofertas",
    Icon: AssignmentIcon,
    text: "Ofertas",
    renderSection: <Ofertas />,
  },
  {
    id: "4",
    name: "empresas",
    Icon: BusinessIcon,
    text: "Empresas",
    renderSection: <Empresas />,
  },
  {
    id:"5",
    name: "galeria",
    Icon: CollectionsIcon,
    text: "Galería",
    renderSection: <Galeria />
  },
  {
    id:"6",
    name: "newsletters",
    Icon: NewspaperIcon,
    text: "Newsletters",
    renderSection: <Newsletter />
  
  },
  {
    id:"7",
    name: "articulos",
    Icon: ArticleIcon,
    text: "Artículos",
    renderSection: <Articulos />
  },
 {
    id:"8",
    name: "estadisticas",
    Icon: BarChartIcon,
    text: "Estadísticas",
    renderSection: <Estadisticas />
 }
];

const menuOptionsGraduado = [
  {
    id: "1",
    name: "VerArticulos",
    Icon: ArticleIcon,
    text: "Ver Artículos",
    renderSection: <VerArticulos />
  },
  {
    id: "2",
    name: "CrearArticulo",
    Icon: PostAddIcon,
    text: "Crear Artículo",
    renderSection: <CrearArticulo />
  }
]

function Perfil() {

  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const [open, setOpen] = useState(false);
  const [cvSeleccionado, setCvSeleccionado] = useState(null); // Para guardar la imagen seleccionada en el input[type=file]
  const [isCVSelected, setIsCVSelected] = useState(false); // Para controlar si se seleccionó una imagen o no
  const [searchParams, setSearchParams] = useSearchParams();
  const tipoUsuario = encryptStorage.getItem("tipoUsuario");
  const idUsuario = encryptStorage.getItem("idUsuario");
  const token = sessionStorage.getItem("token");

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCvSeleccionado(null);
    setIsCVSelected(false);
    setOpen(false);
  };

  const handleCVSeleccionado = (e) => {
    setCvSeleccionado(e.target.files[0]);
    setIsCVSelected(true);
  };

  const handleSubirCV = async () => {
    const response = await postularseBaseConstante(idUsuario);

    if (response) {
      await uploadCV(cvSeleccionado, response.idPostulante, token);
      toast.success("Su curriculum vitae se subió con éxito.");
      handleClose();
    } else {
      toast.error("No se pudo subir su curriculum vitae.");
      handleClose();
    }
  };

  useEffect(() => {
    if (tipoUsuario === "postulante") {
      getPostulanteById(idUsuario).then((response) => {
        setUsuario({
          nombre: response.nombre,
          apellido: response.apellido,
        });
      });
    } else if (tipoUsuario === "empresa") {
      getEmpresaByIdUsuario(idUsuario).then((response) => {
        setUsuario({
          nombre: response.nombre_empresa,
          apellido: "",
        });
      });
    }
  }, [tipoUsuario, idUsuario]);

  const menuOptions = () => {
    switch (tipoUsuario) {
      case "postulante":
        return menuOptionsPostulante;
      case "empresa":
        return menuOptionsEmpresa;
      case "admin":
        return menuOptionsAdmin;
      case "graduado":
        return menuOptionsGraduado;
      default:
        return menuOptionsPostulante;
    }
  };

  const activeSection = searchParams.get("section") || menuOptions()[0].name;

  const changeSectionHandler = (sectionName) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setSearchParams({ section: sectionName });
  };

  return (
    <>
      <Header />
      <Stack
        component="header"
        my={3}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        textTransform="uppercase"
        paddingX={2}
      >
        

        <IconButton
          onClick={() => (window.location.href = "/")}
          size="small"
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <ArrowBackIcon />
          Volver
        </IconButton>
        <Typography
          variant="h5"
          fontSize={18}
          borderLeft={5}
          borderColor="primary.main"
          pl={1.5}
        >
          Tu Perfil
        </Typography>
      </Stack>
      <Grid container rowSpacing={2} columnSpacing={4} paddingX={2}>
        <Grid item xs={12} sm={4} md={3}>
          <Card
            variant="outlined"
            sx={{
              position: "sticky",
              top: "30px",
              maxHeight: "80vh",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: "center",
                my: 1,
                fontWeight: "bold",
              }}
            >
              {tipoUsuario === "admin"
                ? "Administrador"
                : usuario.nombre + " " + usuario.apellido}
            </Typography>
            <Divider sx={{ borderColor: "primary.light", my: 1 }} />
            <MenuList
              sx={{
                "& .MuiMenuItem-root": {
                  borderRadius: 2,
                },
              }}
            >
              {menuOptions().map(({ id, name, Icon, text }) => (
                <MenuItem key={id} onClick={() => changeSectionHandler(name)}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  {text}
                </MenuItem>
              ))}
              {/*{tipoUsuario === "postulante" && [
                <MenuItem
                  key="subirCvMenuItem"
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  Subir cv a la base UNAHUR
                </MenuItem>,
                <Dialog
                  key="subirCvDialog"
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle>
                    {
                      "Por favor, seleccione el curriculum vitae que desea subir a la base general de la UNAHUR."
                    }
                  </DialogTitle>
                  <DialogContent>
                    <Stack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={6}
                      paddingY={2}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          paddingX: 2,
                        }}
                      >
                        <Button
                          component="label"
                          disableElevation
                          size="medium"
                          variant="contained"
                          endIcon={<DescriptionIcon />}
                          sx={{
                            marginTop: 1,
                          }}
                        >
                          Seleccione su curriculum vitae
                          <input
                            type="file"
                            accept="application/pdf"
                            hidden
                            onChange={handleCVSeleccionado}
                          />
                        </Button>
                        {isCVSelected && (
                          <Typography
                            variant="subtitle1"
                            display="block"
                            sx={{
                              marginTop: 1,
                            }}
                          >
                            {cvSeleccionado.name}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button color="error" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubirCV}
                      color="success"
                      variant="contained"
                      disableElevation
                      disabled={!isCVSelected}
                    >
                      Subir CV
                    </Button>
                  </DialogActions>
                </Dialog>,
                <Toaster key="subirCvToaster" richColors closeButton />,
              ]*/}
            </MenuList>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={9} paddingBottom={2}>
          {
            menuOptions().find((option) => option.name === activeSection)
              ?.renderSection
          }
        </Grid>
      </Grid>
      <Toaster richColors />
    </>
  );
}

export default Perfil;
