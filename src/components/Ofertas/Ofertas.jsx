import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";

import {
  getOfertas,
  getOfertaByCuit,
  getOfertasPorFiltrosRecomendados,
} from "../../services/ofertas_service";
import { getPostulacionesPorIdPostulante } from "../../services/postulacionesId_service";
import PropTypes from "prop-types";

const Ofertas = (props) => {
  const tipoUsuario = sessionStorage.getItem("tipoUsuario");
  const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
  const idUsuario = sessionStorage.getItem("idUsuario");
  const { ofertas, setOfertas, paginaActual, setTotalPaginas } = props;
  const scrollRef = useRef({});
  const nombreBusqueda = window.location.search.split("=")[1] || "";

  const [postulaciones, setPostulaciones] = useState([]);
  const limite = 12;

  useEffect(() => {
    const traerOfertas = async () => {
      let response;
      if (tipoUsuario === "empresa") {
        response = await getOfertaByCuit(
          paginaActual - 1,
          limite,
          datosUsuario.id,
          nombreBusqueda
        );
      } else if (tipoUsuario === "postulante") {
        response = await getOfertasPorFiltrosRecomendados(
          paginaActual - 1,
          limite,
          nombreBusqueda,
          "id",
          "Activa",
          idUsuario
        );
      } else {
        response = await getOfertas(
          paginaActual - 1,
          limite,
          nombreBusqueda,
          "id",
          "Activa"
        );
      }
      if (tipoUsuario === "postulante") {
        const ofertasFiltradas = response.ofertas.rows.filter((oferta) => {
          return !postulaciones.some(
            (postulacion) => postulacion.fk_id_oferta === oferta.id
          );
        });
        setTotalPaginas(response.totalPaginas);
        setOfertas(ofertasFiltradas);
      } else {
        setOfertas(response.ofertas.rows);
        setTotalPaginas(response.totalPaginas);
      }
    };
    traerOfertas();
  }, [
    setOfertas,
    nombreBusqueda,
    tipoUsuario,
    datosUsuario?.id,
    postulaciones,
    setTotalPaginas,
    paginaActual,
  ]);

  useEffect(() => {
    if (tipoUsuario === "postulante") {
      const traerPostulaciones = async () => {
        try {
          const response = await getPostulacionesPorIdPostulante(
            paginaActual - 1,
            9999,
            datosUsuario.id,
            ""
          );
          setPostulaciones(response.postulaciones.rows);
        } catch (error) {
          console.log(error);
        }
      };
      traerPostulaciones();
    }
  }, [tipoUsuario, datosUsuario?.id, paginaActual]);

  const publicadoHace = (fecha) => {
    const fechaPublicacion = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual.getTime() - fechaPublicacion.getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    return dias;
  };

  return (
    <Grid
      container
      spacing={4}
      paddingLeft={4}
      paddingRight={4}
      paddingTop={5}
      paddingBottom={5}
      ref={scrollRef}
      sx={{
        "@media (max-width: 450px)": {
          padding: 1,
          paddingBottom: 5,
        },
      }}
    >
      {ofertas.length === 0 && (
        <Grid item xs={12}>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              textAlign: "center",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            No se encontraron ofertas
          </Typography>
        </Grid>
      )}

      {ofertas.map((oferta, index) => (
        <Grid xs={12} md={6} lg={4} xl={3} item key={index}>
          <Card
            variant="outlined"
            sx={{
              height: 380,
              position: "relative",
              borderRadius: 2,
              "@media (max-width: 450px)": {
                height: 400,
              },
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={oferta.Empresa?.logo}
                  alt={oferta.Empresa?.nombre_empresa}
                />
              }
              title={oferta.titulo_oferta}
              subheader={`Publicado hace ${publicadoHace(
                oferta.createdAt
              )} días`}
              sx={{
                "& .css-et1ao3-MuiTypography-root": {
                  fontSize: "1.4rem",
                  overflow: "hidden",
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                },
                height: 100,
              }}
            />
            <CardContent>
              <Typography variant="h6">
                {oferta.Empresa?.nombre_empresa}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {oferta.zona_trabajo}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  marginTop: 2,
                  overflow: "hidden",
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {oferta.descripcion}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              sx={{
                position: "absolute",
                bottom: 2,
                left: 0,
                right: 0,
                justifyContent: "center",
              }}
            >
              <Button variant="contained" href={`/oferta/${oferta.id}`}>
                Ver oferta
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

Ofertas.propTypes = {
  ofertas: PropTypes.array.isRequired,
  setOfertas: PropTypes.func.isRequired,
  paginaActual: PropTypes.number.isRequired,
  setTotalPaginas: PropTypes.func.isRequired,
};

export default Ofertas;
