import React, { useEffect, useState } from "react";
import Spinner from "../../Template/Spinner";
import {
  Card,
  CardHeader,
  Box,
  Typography,
  Avatar,
  Grid,
  Pagination,
} from "@mui/material";
import { getOfertas } from "../../../services/ofertas_service";

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [page, setPage] = useState(1); // Página actual (1-basado para Material-UI)
  const itemsPerPage = 6; // Número de ofertas por página
  const [totalOfertas, setTotalOfertas] = useState(0); // Total de ofertas para calcular el número de páginas

  const handleChange = (event, value) => {
    setPage(value); // Actualiza la página actual
  };

  useEffect(() => {
    const fetchOfertas = async () => {
      try {
        // Llama al servicio para obtener las ofertas paginadas
        const response = await getOfertas(page - 1, itemsPerPage, "", "id", 1); // Ajusta la página para que sea 0-basado
        setOfertas(response.ofertas.rows); // Actualiza las ofertas
        setTotalOfertas(response.ofertas.count); // Total de ofertas para el paginado
      } catch (error) {
        console.error("Error fetching ofertas:", error);
      }
    };
    fetchOfertas();
  }, [page]); // Vuelve a cargar las ofertas cuando cambia la página

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
          <Pagination
            count={Math.ceil(totalOfertas / itemsPerPage)} // Número total de páginas
            page={page}
            onChange={handleChange}
            sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
          />
        </Box>
      </Card>
    </>
  );
}
