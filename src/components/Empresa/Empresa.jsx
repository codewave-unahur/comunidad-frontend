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
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { getEmpresaByCuit } from "../../services/empresas_service";

const Empresa = () => {
  const idEmpresa = parseInt(window.location.pathname.split("/")[2]);

  const [empresa, setEmpresa] = useState({});

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
          <Avatar
            src={empresa.logo}
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
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
              Información de la empresa
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={empresa.descripcion} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    empresa.pais +
                    ", " +
                    empresa.Provincia?.nombre +
                    ", " +
                    empresa.Ciudad?.nombre
                  }
                  secondary="Lugar de la empresa"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={empresa.Rubro?.nombre_rubro
                    .toLowerCase()
                    .replace(/\b[a-z]/g, (c) => c.toUpperCase())}
                  secondary="Rubro de la empresa"
                />
              </ListItem>
            </List>
            <Divider sx={{ marginTop: "1rem" }} />
            <Typography variant="h6" color="primary" sx={{ marginTop: "1rem" }}>
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
                <ListItemText primary={empresa.telefono} secondary="Teléfono" />
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
                  primary={empresa.web}
                  secondary="Sitio web de la empresa"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Empresa;
