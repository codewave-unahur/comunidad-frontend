import React from 'react';
import { Box, Typography, Chip, Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Helmet } from 'react-helmet'; // Para SEO
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Verde oscuro
    },
    secondary: {
      main: '#c8e6c9', // Verde claro
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const ArticlePage = () => {
  const title = 'Lorem Ipsum Dolor Sit Amet'; 
  const tags = ['Actualidad', 'Tecnología', 'Opinión'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Este es un artículo de noticias sobre temas actuales y tecnológicos." />
        <meta name="keywords" content="noticias, actualidad, tecnología, opinión" />
        <meta name="author" content="Redacción Noticias" />
      </Helmet>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h2" color="primary" gutterBottom>
            {title}
          </Typography>
          <Box
            component="img"
            src="https://via.placeholder.com/800x400" // Reemplazar con la URL de tu imagen
            alt="Encabezado del artículo"
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 3,
              mb: 3,
            }}
          />
          <Box sx={{ mb: 2 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color="secondary"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lacinia odio ut turpis tempor, nec laoreet
            mauris suscipit. Nullam auctor, mi a fermentum pharetra, sapien libero tincidunt odio, sed euismod eros
            tortor non libero. Morbi nec orci nec ligula luctus mollis sit amet sit amet nulla.
          </Typography>
          <Typography variant="body1" paragraph>
            Sed convallis, ipsum nec sagittis porttitor, nisi urna efficitur mauris, ut viverra nisi eros eget arcu.
            Integer nec neque a metus vulputate finibus. Praesent interdum ultricies quam, non facilisis sapien
            fermentum a. Vivamus suscipit, tortor sed posuere pellentesque, erat eros interdum ligula, eu lacinia
            libero magna sed orci.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default ArticlePage;
