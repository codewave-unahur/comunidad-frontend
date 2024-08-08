import Header from "../Header/Header";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Skeleton,
  Box,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { getEmpresaByCuit } from "../../services/empresas_service";
import { Link } from "react-router-dom";

const Empresa = () => {
  const idEmpresa = parseInt(window.location.pathname.split("/")[2]);

  const [empresa, setEmpresa] = useState({});
  const isLoading = Object.keys(empresa).length === 0;

  useEffect(() => {
    const traerempresa = async () => {
      try {
        const response = await getEmpresaByCuit(idEmpresa);
        setEmpresa(response);
      } catch (error) {
        console.log(error);
      }
    };
    traerempresa();
  }, [idEmpresa]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Container
        maxWidth="md"
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            padding: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            borderRadius: 2,
            position: "relative",
          }}
        >
          {isLoading ? (
            <>
              <Skeleton variant="text" width="50%" />
              <Skeleton
                variant="circular"
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "1rem",
                  width: 170,
                  height: 170,
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              />
            </>
          ) : (
            <>
              <Avatar
                src={empresa.logo}
                alt={empresa.nombre_empresa}
                sx={{
                  position: "absolute",
                  right: "2rem",
                  top: "1rem",
                  width: 150,
                  height: 150,
                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              />
              <CardHeader
                title={empresa.nombre_empresa}
                sx={{
                  "& .MuiTypography-h5": {
                    fontSize: "2rem",
                    width: {
                      xs: "50%",
                      sm: "100%",
                    },
                  },
                }}
              />
            </>
          )}
          <CardContent>
            {isLoading ? (
              <>
                <Skeleton variant="text" width="50%" sx={{ mt: 10 }} />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="30%" />
                <Divider sx={{ marginTop: "1rem" }} />
                <Skeleton variant="text" width="50%" />
                <Box
                  sx={{
                    display: "grid",
                    mt: 2,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "1rem",
                  }}
                >
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                  <Skeleton variant="rounded" width="65%" height={50} />
                </Box>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginY: "1rem" }}
                >
                  Información de la empresa
                </Typography>
                <ListItem>
                  <ListItemText primary={empresa.id} secondary="CUIT" />
                </ListItem>
                <ListItem>
                  <ListItemText primary={empresa.descripcion} secondary="Descripción"/>
                </ListItem>

                <List
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "1rem",
                  }}
                >
                  <ListItem>
                    <ListItemText
                      primary={empresa.Rubro.nombre_rubro}
                      secondary="Rubro"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={empresa.CadenaValor.nombre}
                      secondary="Cadena de valor"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={empresa.calle + " " + empresa.nro}
                      secondary="Dirección de la empresa"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        empresa.Ciudad?.nombre +
                        ", " +
                        empresa.Provincia?.nombre +
                        ", " +
                        empresa.pais
                      }
                      secondary="Lugar de la empresa"
                    />
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary={empresa.cp}
                      secondary="Código postal"
                    />
                  </ListItem>
                  {/*<ListItem>
                    <ListItemText
                      primary={empresa.Rubro?.nombre_rubro
                        .toLowerCase()
                        .replace(/\b[a-z]/g, (c) => c.toUpperCase())}
                      secondary="Rubro de la empresa"
                    />
                      </ListItem>*/}
                </List>
                <Divider sx={{ marginTop: "1rem" }} />
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Información de contacto
                </Typography>
                <List
                  sx={{
                    display: {
                      xs: "block",
                      sm: "grid",
                    },
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                    gap: "1rem",
                  }}
                >
                  
                  <ListItem>
                    <SupervisorAccountOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={empresa.rol_representante}
                      secondary="Rol del representante de la empresa"
                    />
                  </ListItem>
                  <ListItem>
                    <PersonOutlineOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={empresa.nombre_representante}
                      secondary="Representante de la empresa"
                    />
                  </ListItem>
                  <ListItem>
                    <EmailOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={empresa.Usuario?.usuario}
                      secondary="Email "
                    />
                  </ListItem>
                  <ListItem>
                    <LocalPhoneOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={empresa.telefono}
                      secondary="Teléfono"
                    />
                  </ListItem>
                  <ListItem>
                    <LanguageOutlinedIcon
                      color="primary"
                      fontSize="large"
                      sx={{
                        marginRight: "0.5rem",
                      }}
                    />
                    <ListItemText
                      primary={
                        <a 
                          href={
                            empresa.web.includes("http") ? empresa.web : "https://" + empresa.web
                          }
                          target="_blank"
                          rel="noreferrer">
                          {empresa.nombre_empresa}
                          </a>
                      }
                      secondary="Sitio web de la empresa"
                    />
                  </ListItem>
                </List>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Empresa;
