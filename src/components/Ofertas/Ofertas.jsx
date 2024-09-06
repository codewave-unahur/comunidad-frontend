import { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { EncryptStorage } from 'encrypt-storage';
import {
  getOfertas,
  getOfertaByCuit,
  getOfertasPorFiltrosRecomendados,
} from "../../services/ofertas_service";
import { getPostulacionesPorIdPostulante } from "../../services/postulacionesId_service";
import PropTypes from "prop-types";
import Spinner from "../Template/Spinner";

const Ofertas = (props) => {


  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const tipoUsuario = encryptStorage.getItem("tipoUsuario");
  const datosUsuario = encryptStorage.getItem("datosUsuario");
  const idUsuario = encryptStorage.getItem("idUsuario");
  const { ofertas, setOfertas, paginaActual, setTotalPaginas } = props;
  const scrollRef = useRef({});
  const nombreBusqueda = window.location.search.split("=")[1] || "";

  const [postulaciones, setPostulaciones] = useState([]);
  const limite = 12;
  const [loading, setLoading] = useState(true);


  const removeFbclid = (url) => {
    if (url.includes("fbclid")) {
      const urlSplit = url.split("?");
      const urlSinFbclid = urlSplit[0];
      window.history.replaceState({}, document.title, urlSinFbclid);
    };
  };
  





  useEffect(() => {

    if (tipoUsuario === "empresa") {
      const traerOfertas = async () => {
        try {
          const response = await getOfertaByCuit(
            paginaActual - 1,
            limite,
            datosUsuario.id,
            nombreBusqueda
          );
          setOfertas(response.ofertas.rows);
          setTotalPaginas(response.totalPaginas);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
      traerOfertas();
    }
    else if (tipoUsuario === "postulante") {
      const traerOfertas = async () => {
        try {
          const response = await getOfertasPorFiltrosRecomendados(
            paginaActual - 1,
            limite,
            nombreBusqueda,
            "id",
            1,
            idUsuario
          );
          setOfertas(response.ofertas.rows);
          setTotalPaginas(response.totalPaginas);
          setLoading(false);

        } catch (error) {
          console.log(error);
        }
      }
      traerOfertas();
    }
    else {
      const traerOfertas = async () => {
        try {
          removeFbclid(window.location.href);
          const response = await getOfertas(
            paginaActual - 1,
            limite,
            nombreBusqueda,
            "id",
            1,
          );
          setOfertas(response.ofertas.rows);
          setTotalPaginas(response.totalPaginas);
          setLoading(false);

        } catch (error) {
          console.log(error);
        }
      }
      traerOfertas();
    }
  }, [tipoUsuario, datosUsuario?.cuit, paginaActual, nombreBusqueda]);



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

  return (  loading ? <Spinner/> :
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

      { ofertas.map((oferta, index) => (
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
              avatar={oferta.Empresa.logo?
                <Avatar
                  src={oferta.Empresa?.logo}
                  alt={oferta.Empresa?.nombre_empresa}
                />: <Avatar
                      alt={oferta.Empresa?.nombre_empresa}
                      sx={{ backgroundColor: "#00404f" }}
                    >
                      {oferta.Empresa?.nombre_empresa.charAt(0)}
                    </Avatar>
              }
              title={oferta.Empresa?.nombre_empresa}
              subheader={oferta.zona_trabajo}
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
                {oferta.titulo_oferta}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Publicado hace {publicadoHace(oferta.createdAt)}
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
              <Button variant="contained" sx={{backgroundColor:"#00404f"}} href={`/oferta/${oferta.id}`}>
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
