import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Helmet } from "react-helmet"; // Para SEO
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DOMPurify from 'dompurify';
import SocialShareButtons from "./SocialShareButtons";
import { getArticulo } from "../../services/articulos_service";
// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Verde oscuro
    },
    secondary: {
      main: "#c8e6c9", // Verde claro
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});



const ArticlePage = () => {

  const [articulo, setArticulo] = useState([]);
  const idArticulo = window.location.pathname.split("/").pop();



  const cleanHtml = DOMPurify.sanitize(articulo.contenido);


  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await getArticulo(idArticulo);
        setArticulo(response.articulo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticulo();
    console.log(articulo)
  }
  , [idArticulo]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>{articulo.titulo}</title>
        <meta
          name="description"
          content="Este es un artículo de noticias sobre temas actuales y tecnológicos."
        />
        <meta
          name="keywords"
          content="noticias, actualidad, tecnología, opinión"
        />
        <meta name="author" content="Redacción Noticias" />
      </Helmet>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h3" gutterBottom >
            {articulo.titulo}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {new Date(articulo.createdAt).toLocaleDateString()} por {articulo.autor}
          </Typography>
          <Box
            component="img"
            src={articulo.portada} // Reemplazar con la URL de tu imagen
            alt="Encabezado del artículo"
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
              mb: 3,
            }}
          />
          <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
            <SocialShareButtons/>
          </Box>
          <Typography variant="body1" paragraph>
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          </Typography>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default ArticlePage;
