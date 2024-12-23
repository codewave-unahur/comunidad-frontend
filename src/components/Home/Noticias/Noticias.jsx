import React, { useState } from "react";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material";

const CustomCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
        <Card sx={{ width: 290, position: "relative" }}>
        {/* Imagen */}
        <CardMedia
            component="img"
            image="https://via.placeholder.com/290x180"
            alt="Imagen"
            sx={{ width: 290, height: 180 }}
        />
        {/* Texto superpuesto en la parte inferior */}
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Fondo negro con opacidad
            color: hovered ? "yellow" : "white", // Cambia el color del texto al pasar el mouse
            padding: "8px",
            textAlign: "center",
            transition: "color 0.3s ease",
            cursor: "pointer",
            }}
        >
            <Typography variant="h6">Texto interactivo</Typography>
        </Box>
        </Card>
        
        <Button variant="outlined" sx={{
            color:"black"
        }}>
            MÁS NOTICIAS
        </Button>
    </>

  );
};

export default CustomCard;
