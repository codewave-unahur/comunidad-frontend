import React, { useEffect, useState } from "react";
import { Card, CardMedia, Box, Typography, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getArticulos } from "../../../services/articulos_service";

const CustomCard = () => {
  const navigate = useNavigate();

  const [noticias, setNoticias] = useState([]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 4; // Número de noticias por página

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await getArticulos();
        setNoticias(response.articulos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticulos();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Calcular las noticias a mostrar en la página actual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const noticiasPaginadas = noticias.slice(startIndex, endIndex);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {noticiasPaginadas.map((noticia) => (
          <Card
            key={noticia.id}
            sx={{ width: 290, position: "relative" }}
            onClick={() => {
              navigate(`/articulo/${noticia.id}`);
              window.scrollTo(0, 0);
            }}
          >
            {/* Imagen */}
            <CardMedia
              component="img"
              image={noticia.portada || "https://unahur.edu.ar/wp-content/uploads/2022/01/comunicadoinstitucionalnot01.jpg"}
              alt="Imagen"
              sx={{ width: 290, height: 180 }}
            />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                margin: "8px 8px 0px 8px",
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo negro con opacidad
                padding: "8px",
                textAlign: "left",
                transition: "color 0.3s ease",
                color: "white",
                cursor: "pointer",
                "&:hover .hover-text": { color: "lightGreen" },
              }}
            >
              <Typography
                className="hover-text"
                variant="h6"
                sx={{
                  fontSize: "16px",
                  transition: "color 0.3s ease-in-out",
                }}
              >
                {noticia.titulo}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        <Pagination
          count={Math.ceil(noticias.length / itemsPerPage)} // Número total de páginas
          page={page}
          onChange={handleChange}
          
        />
      </Box>
    </>
  );
};

export default CustomCard;