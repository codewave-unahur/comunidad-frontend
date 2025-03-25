import React, { useState } from "react";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

const CustomCard = () => {

  const navigate = useNavigate();

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
        <Card sx={{ width: 290, position: "relative" }} onClick={()=>{navigate("/articulo/1"); window.scrollTo(0, 0);}}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://unahur.edu.ar/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-20-at-10.40.42-980x653.jpeg"
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
              color:"white",
              
              cursor: "pointer",
              '&:hover .hover-text': { color: 'lightGreen',  }
            }}
          >
            <Typography
              className="hover-text"
              variant="h6"
              sx={{
                fontSize: "16px",
                transition: "color 0.3s ease-in-out"
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing aliquid
              provident ?
            </Typography>
          </Box>
        </Card>
        <Card sx={{ width: 290, position: "relative" }} onClick={()=>{navigate("/articulo/1"); window.scrollTo(0, 0);}}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://unahur.edu.ar/wp-content/uploads/2025/01/beca-manuel-belgrano_foto-980x653.jpg"
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
              color:"white",
              
              cursor: "pointer",
              '&:hover .hover-text': { color: 'lightGreen',  }
            }}
          >
            <Typography
              className="hover-text"
              variant="h6"
              sx={{
                fontSize: "16px",
                transition: "color 0.3s ease-in-out"
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing aliquid
              provident ?
            </Typography>
          </Box>
        </Card>
        <Card sx={{ width: 290, position: "relative" }} onClick={()=>{navigate("/articulo/1"); window.scrollTo(0, 0);}}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://unahur.edu.ar/wp-content/uploads/2025/03/TEC-980x551.png"
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
              color:"white",
              
              cursor: "pointer",
              '&:hover .hover-text': { color: 'lightGreen',  }
            }}
          >
            <Typography
              className="hover-text"
              variant="h6"
              sx={{
                fontSize: "16px",
                transition: "color 0.3s ease-in-out"
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing aliquid
              provident ?
            </Typography>
          </Box>
        </Card>
        <Card sx={{ width: 290, position: "relative" }} onClick={()=>{navigate("/articulo/1"); window.scrollTo(0, 0);}}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://unahur.edu.ar/wp-content/uploads/2025/03/IMG_7588-1-980x653.jpg"
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
              color:"white",
              
              cursor: "pointer",
              '&:hover .hover-text': { color: 'lightGreen',  }
            }}
          >
            <Typography
              className="hover-text"
              variant="h6"
              sx={{
                fontSize: "16px",
                transition: "color 0.3s ease-in-out"
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing aliquid
              provident ?
            </Typography>
          </Box>
        </Card>
      </Box>
      <Box sx={{
        display:"flex",
        justifyContent:"center",
        margin: "2rem"
      }}>
        <Button variant="outlined">
            MAS NOTICIAS
        </Button>
      </Box>
    </>
  );
};

export default CustomCard;
