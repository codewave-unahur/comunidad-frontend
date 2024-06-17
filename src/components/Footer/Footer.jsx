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
import logoVinculacion from "../../assets/logoVinculacion.svg";

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
            padding: { xs: 2, sm: "60px", md: "120px" },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", gap: 2}}
          >
            <Grid item xs={12} sm={3}>
              <Box>
                <img
                  src={logoVinculacion}
                  alt="logo cpyme"
                  style={{ 
                    width: "100px",
                    height: "100px",
                    marginBottom: "20px", 
                  }}
                />
                <p style={{ color: "#636664", fontSize: "11.6px" }}>
                  &copy; {year} Direccion de Vinculación Tecnológica - UNAHUR
                </p>
                <p style={{ 
                  color: "#636664",
                  fontSize: "11.6px" 
                  }}
                >
                  Todos los derechos reservados
                </p>

                <Link href="#" style={{ color: "#636664", fontSize: "11.6px", textDecoration:"none" }}>
                  <p>Terminos legales</p>
                </Link>
                <Link href="#" style={{ color: "#636664", fontSize: "11.6px", textDecoration:"none"}}>
                  <p>Aviso de cookies</p>
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
            <Grid item xs={12} sm={5}>
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
