import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import React from "react";
import logodvt from "../../assets/logoDvt.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedIn from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MapaCpyme from "./MapaCpyme";
import PlaceIcon from "@mui/icons-material/Place";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import logoVinculacion from "../../assets/logoVinculacion.svg";
import logoCodewave from "../../assets/logoCodewave.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F4F4F4",
            padding: { xs: 2, sm: "60px" },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", gap: 2}}
          >
            <Grid item xs={12} sm={2}>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "start" },
                justifyContent: "center",
                gap: 2,
              }}>
                <img
                  src={logoVinculacion}
                  alt="Direccion de Vinculacion Tecnologica"
                  style={{ 
                    width: "100px",
                    height: "100px",
                    marginBottom: "20px", 
                  }}
                />
                <Typography sx={{
                    color: "#636664",
                    fontSize: "11.6px",
                    marginBottom: "20px" 
                   }}
                >
                  &copy; {year} UNAHUR
                </Typography>
                <Typography sx={{ 
                  color: "#636664",
                  fontSize: "11.6px",
                  marginBottom: "20px"  
                  }}
                  
                >
                 Todos los derechos reservados
                </Typography>

               {/*<Link href="#" style={{textDecoration:"none" }}>
                  <Typography sx={{
                      color: "#636664", 
                      fontSize: "11.6px",
                      marginBottom: "20px",
                      
                    }}>Terminos legales</Typography>
                </Link>
                <Link href="#" style={{ color: "#636664", fontSize: "11.6px", textDecoration:"none"}}>
                  <Typography sx={{
                      color: "#636664",
                      fontSize: "11.6px",
                      marginBottom: "20px",
                    }}>Aviso de cookies</Typography>
                  
                </Link>*/}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Link
                    href="https://www.instagram.com/cpymeunahur/"
                    target="__blank"
                  >
                    <InstagramIcon sx={{ color: "#5C5A5E" }} />
                  </Link>
                  <Link
                    href="https://www.facebook.com/cpymeUNAHUR"
                    target="__blank"
                  >
                    <FacebookIcon sx={{ color: "#5C5A5E" }} />
                  </Link>
                  <Link
                    href="https://twitter.com/cpymeUNAHUR/"
                    target="__blank"
                  >
                    <TwitterIcon sx={{ color: "#5C5A5E" }} />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/company/centro-pyme-unahur/"
                    target="__blank"
                  >
                    <LinkedIn sx={{ color: "#5C5A5E" }} />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@cpymeunahur"
                    target="__blank"
                  >
                    <YouTubeIcon sx={{ color: "#5C5A5E" }} />
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "start" },
                justifyContent: "center",
                gap: 1
              }}>
                <img
                  src={logoCodewave}
                  alt="Codewave S.A." 
                  style={{ 
                    width: "180px",
                    height: "180px",

                  }}
                />
                <Typography sx={{ 
                  color: "#636664", 
                  fontSize: "11.6px",
                  marginBottom:"20px" 
                  }}
                >
                  &copy; {year} Codewave S.A
                </Typography>
                
                <Typography sx={{
                  color: "#636664",
                  fontSize: "11.6px",
                  marginBottom:"20px"
                  }}
                >
                  Este sitio fue desarrollado por Codewave S.A.
                </Typography>

                <Link href="https://drive.google.com/file/d/1YkFotZV7rQC5KyzZOVnrQN-v4RjGbw3f/view" target="_blank" style={{textDecoration:"none"}}>
                  <Typography sx={{
                      color: "#636664",
                      fontSize: "11.6px",
                      marginBottom:"20px"
                    }}>
                      Conocé nuestras propuestas
                    </Typography>
                </Link>
                
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: 1,
                    
                  }}
                >
                  
                  <Link
                    href="https://instagram.com/codewavear"
                    target="__blank"
                  >
                    <InstagramIcon sx={{ color: "#5C5A5E" }} />
                  </Link>
                  <Link
                    href="https://www.facebook.com/codewavear"
                    target="__blank"
                  >
                    <FacebookIcon sx={{ color: "#5C5A5E" }} />
                  </Link>
                  <Link
                    href="https://x.com/codewavear/"
                    target="__blank"
                  >
                    <TwitterIcon sx={{ color: "#5C5A5E" }} />
                  </Link>
                  <Link
                    href="#"
                    target="__blank"
                  >
                    <LinkedIn sx={{ color: "#5C5A5E" }} />
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <MapaCpyme />
              </Box>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Box sx={{ display:"flex", flexDirection:"column"}}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom:"1rem" }}>
                  <PlaceIcon sx={{ color: "#5C5A5E" }} />
                  <Typography sx={{ color: "#636664", fontSize: "11.6px" }}>
                    Ausebione 8, B1688 Villa Tesei, Provincia de Buenos Aires
                  </Typography>
                </Box>
                <hr />
                <Link href="mailto:empleabilidad@unahur.edu.ar" style={{textDecoration:"none"}}>
                <Box sx={{ display: "flex", alignItems:"center" }} >
                  <EmailOutlinedIcon sx={{ color: "#5C5A5E" }} />
                  <Typography sx={{ color: "#636664", fontSize: "11.6px", textAlign:"center"}}>
                    empleabilidad@unahur.edu.ar
                  </Typography>
                </Box>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
