import { Box, Divider, Link } from "@mui/material";
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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F4F4F4",
            padding: "10px",
          }}
        >
          <Box>
            <img
              src={logodvt}
              alt="logodvt"
              style={{ width: "100px", height: "100px" }}
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
            <Divider />
            <Box
              sx={{
                display: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link href="#">
                <InstagramIcon />
              </Link>
              <Link href="#">
                <FacebookIcon />
              </Link>
              <Link href="#">
                <TwitterIcon />
              </Link>
              <Link href="#">
                <LinkedIn />
              </Link>
              <Link href="#">
                <YouTubeIcon />
              </Link>
            </Box>
          </Box>
          <Box>
            <MapaCpyme />
          </Box>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PlaceIcon sx={{ color: "#5C5A5E" }} />
              <p style={{ color: "#636664", fontSize: "11.6px" }}>
              Ausebione 8, B1688 Villa Tesei, Provincia de Buenos Aires
              </p>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ color: "#5C5A5E" }} />
              <p style={{ color: "#636664", fontSize: "11.6px" }}>
                empleabilidad@unahur.edu.ar
              </p>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ color: "#5C5A5E" }} />
              <p style={{ color: "#636664", fontSize: "11.6px" }}>
                dvt@unahur.edu.ar
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
