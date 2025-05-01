import React, { useEffect, useState } from "react";
import Spinner from "../../Template/Spinner";
import {
  Card,
  CardHeader,
  Box,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import { getOfertas } from "../../../services/ofertas_service";

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(6);

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        const response = await getOfertas(pagina, limite, "", "id", 1);
        setOfertas(response.ofertas.rows);
      } catch (error) {
        console.error("Error fetching ofertas:", error);
      }
    };
    fetchOfertas();
    console.log(ofertas);
  }, []);

  const publicadoHace = (fecha) => {
    const fechaPublicacion = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaPublicacion;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor(diferencia / (1000 * 60));

    if (dias > 0) {
      return dias === 1 ? "1 día" : `${dias} días`;
    } else if (horas > 0) {
      return horas === 1 ? "1 hora" : `${horas} horas`;
    }
    return minutos === 1 ? "1 minuto" : `${minutos} minutos`;
  };

  return (
    <>
      <Card type="section" elevation={8}>
        <CardHeader title="Ofertas" />
        <Box sx={{ padding: "1rem" }}>
          {ofertas.length > 0 ? (
            <Grid container spacing={2}>
              {ofertas.map((oferta) => (
                <Grid item xs={12} sm={6} key={oferta.id}>
                  <Card
                    elevation={3}
                    sx={{
                      padding: "1rem",
                      maxWidth: "100%",
                    }}
                  >
                    <CardHeader
                      avatar={
                        oferta.Empresas.logo ? (
                          <Avatar
                            src={oferta.Empresas?.logo}
                            alt={oferta.Empresas?.nombre_empresa}
                            sx={{ backgroundColor: "#00404f" }}
                          />
                        ) : (
                          <Avatar
                            src="https://via.placeholder.com/150"
                            alt="Logo de la empresa"
                          >
                            {oferta.Empresas?.nombre_empresa.charAt(0)}
                          </Avatar>
                        )
                      }
                      title={oferta.titulo_oferta}
                      subheader={oferta.Empresas?.nombre_empresa}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Publicado hace {publicadoHace(oferta.createdAt)} -{" "}
                      {oferta.zona_trabajo}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Spinner />
          )}
        </Box>
      </Card>
    </>
  );
}
