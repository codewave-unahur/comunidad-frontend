import { useSearchParams } from "react-router-dom";
import {
  Card,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
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

import { getPostulanteById } from "../../services/postulantes_service";
import { getEmpresaByIdUsuario } from "../../services/empresas_service";
import { useEffect, useState } from "react";

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
    name: "datosAcademicos",
    Icon: SchoolIcon,
    text: "Datos académicos",
    renderSection: <DatosAcademicos />,
  },
  {
    id: "3",
    name: "formacion",
    Icon: SchoolIcon,
    text: "Formación",
    renderSection: (
      <p>
        Acá iría lo que propuso Carolina sobre los cursos o demás experiencia.
        No sé como se llamaría la sección.
      </p>
    ),
  },
  {
    id: "4",
    name: "curriculumVitae",
    Icon: DescriptionIcon,
    text: "Curriculum Vitae",
    renderSection: <CurriculumVitae />,
  },
  {
    id: "5",
    name: "misPostulaciones",
    Icon: AssignmentIcon,
    text: "Mis postulaciones",
    renderSection: <MisPostulaciones />,
  },
  {
    id: "6",
    name: "baseUnahur",
    Icon: StorageIcon,
    text: "Aplicar a la base UNAHUR",
    // renderSection: <Base />,
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
    name: "verOfertas",
    Icon: AssignmentIcon,
    text: "Ver ofertas",
    renderSection: <VerOfertas />,
  },
  {
    id: "3",
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
    name: "ofertas",
    Icon: AssignmentIcon,
    text: "Ofertas",
    renderSection: <Ofertas />,
  },
  {
    id: "3",
    name: "empresas",
    Icon: BusinessIcon,
    text: "Empresas",
    renderSection: <Empresas />,
  },
];

function Perfil() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");
  const idUsuario = sessionStorage.getItem("idUsuario");
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
  });

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
        <Typography
          variant="h5"
          fontSize={18}
          borderLeft={5}
          borderColor="primary.main"
          pl={1.5}
        >
          Tu Perfil
        </Typography>

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
    </>
  );
}

export default Perfil;
