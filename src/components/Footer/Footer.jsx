import { Box, Divider, Grid, Link } from "@mui/material";
import React from "react";
import logodvt from "../../assets/logoDvt.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedIn from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MapaCpyme from "./MapaCpyme";
import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import logocpyme from "../../assets/logo-cpyme.svg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection:"row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#F4F4F4",
            padding: { xs: 2, sm: "60px", md: "120px"}
          }}
        >
        <Grid container spacing={2} sx={{display:"flex", justifyContent:"space-between"}}>
            <Grid item xs={12} sm={4}>
                <Box>
                <img
                    src={logocpyme}
                    alt="logo cpyme"
                    style={{ width: "50%", height: "50%" }}
                />
                <p style={{ color: "#636664", fontSize: "11.6px" }}>
                    &copy; {year} Direccion de Vinculación Tecnológica - UNAHUR
                </p>
                <p style={{ color: "#636664", fontSize: "11.6px" }}>
                    Todos los derechos reservados
                </p>
    
                <Link href="#" style={{ color: "#636664", fontSize: "11.6px" }}>
                    <p>
                    Terminos legales
                    </p>
                </Link>
                <Link href="#" style={{ color: "#636664", fontSize: "11.6px" }}>
                    <p>
                    Aviso de cookies
                    </p>
                </Link>
                
                <Box
                    sx={{
                    display: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                >
                    <Link href="#">
                    <InstagramIcon sx={{ color: "#5C5A5E" }} />
                    </Link>
                    <Link href="#">
                    <FacebookIcon sx={{ color: "#5C5A5E" }} />
                    </Link>
                    <Link href="#">
                    <TwitterIcon sx={{ color: "#5C5A5E" }}/>
                    </Link>
                    <Link href="#">
                    <LinkedIn sx={{ color: "#5C5A5E" }}/>
                    </Link>
                    <Link href="#">
                    <YouTubeIcon sx={{ color: "#5C5A5E" }} />
                    </Link>
                </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
    
          <Box>
            <MapaCpyme />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <PlaceIcon sx={{ color: "#5C5A5E" }} />
                <p style={{ color: "#636664", fontSize: "11.6px" }}>
                    Ausebione 8, B1688 Villa Tesei, Provincia de Buenos Aires
                </p>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ color: "#5C5A5E" }} />
                <p style={{ color: "#636664", fontSize: "11.6px" }}>
                    empleabilidad@unahur.edu.aria
                </p>
                </Box>
                
                <Box sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon sx={{ color: "#5C5A5E" }} />
                <p style={{ color: "#636664", fontSize: "11.6px" }}>
                    dvt@unahur.edu.ar
                </p>
                </Box>
            </Box>
        </Grid>
        </Grid>
        </Box>
        </Box>
        
          
    </>
  );
}
