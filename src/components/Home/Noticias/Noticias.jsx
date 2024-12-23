import React, { useState } from "react";
import { Card, CardMedia, Box, Typography, Button } from "@mui/material";

const CustomCard = () => {

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Card sx={{ width: 290, position: "relative" }}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://via.placeholder.com/290x180"
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
        <Card sx={{ width: 290, position: "relative" }}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://via.placeholder.com/290x180"
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
        <Card sx={{ width: 290, position: "relative" }}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://via.placeholder.com/290x180"
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
        <Card sx={{ width: 290, position: "relative" }}>
          {/* Imagen */}
          <CardMedia
            component="img"
            image="https://via.placeholder.com/290x180"
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
        justifyContent:"center"
        
        
      }}>
        <Button variant="outlined" 
        sx={{
            color:"#281ac2"
        }}>
            MAS NOTICIAS
        </Button>
      </Box>
    </>
  );
};

export default CustomCard;
