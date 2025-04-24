import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Button,
  TextField,
} from "@mui/material";
import { Helmet } from "react-helmet"; // Para SEO
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DOMPurify from "dompurify";
import SocialShareButtons from "./SocialShareButtons";
import { getArticulo, updateArticulo, updateArticuloVistas } from "../../services/articulos_service";
import ReactQuill from "react-quill";
import { EncryptStorage } from "encrypt-storage";
import Spinner from "../Template/Spinner";

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

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Encabezados
    ["bold", "italic", "underline", "strike"], // Negrita, Cursiva, Subrayado, Tachado
    [{ color: [] }, { background: [] }], // Color de texto y fondo
    [{ list: "ordered" }, { list: "bullet" }], // Listas ordenadas y desordenadas
    ["link", "image"], // Enlaces e imágenes
    [{ align: ["justify", "center", "right", "left"] }],
    ["clean"], // Botón para limpiar estilos
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "link",
  "image",
];

const ArticlePage = () => {
  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });


  const [articulo, setArticulo] = useState({});
  const [edit, setEdit] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [nuevaPortada, setNuevaPortada] = useState(""); // Almacena la imagen en Base64
  const [loading, setLoading] = useState(true);
  const idArticulo = window.location.pathname.split("/").pop();
  const cleanHtml = DOMPurify.sanitize(articulo.contenido || "");
  const tipoUsuario = encryptStorage.getItem("tipoUsuario");

  
  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const response = await getArticulo(idArticulo);
        setArticulo(response.articulo);
        setNuevoTitulo(response.articulo.titulo); // Inicializa el título editable
        setNuevoContenido(response.articulo.contenido); // Inicializa el contenido editable
        setNuevaPortada(response.articulo.portada); // Inicializa la portada editable
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticulo();
  }, [idArticulo]);

  useEffect(() => {
    const updateVistas = async () => {
      try {
        await updateArticuloVistas(idArticulo);
      } catch (error) {
        console.error("Error al actualizar las vistas:", error);
      }
    };
    updateVistas();
  }, [idArticulo]);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevaPortada(reader.result); // Convierte el archivo a Base64 y lo guarda
      };
      reader.readAsDataURL(file); // Convierte el archivo a Base64
    }
  };

  const handleUpdate = async () => {
    try {
      // Actualiza el artículo con la nueva portada (en Base64), título y contenido
      await updateArticulo(idArticulo, {
        titulo: nuevoTitulo,
        contenido: nuevoContenido,
        portada: nuevaPortada,
      });

      setEdit(false);
      setArticulo((prevArticulo) => ({
        ...prevArticulo,
        titulo: nuevoTitulo,
        contenido: nuevoContenido,
        portada: nuevaPortada,
      }));
    } catch (error) {
      console.error("Error al actualizar el artículo:", error);
    }
  };

  const obtenerNombreAutor = (email) => {
    const autores = {
      "graduados@unahur.edu.ar": "Graduados UNAHUR",
      "empleabilidad@unahur.edu.ar": "Empleabilidad UNAHUR",
      "ingenieria@unahur.edu.ar": "Instituto de Tecnología e Ingeniería",
      "biotecnologia@unahur.edu.ar": "Instituto de Biotecnología",
      "educacion@unahur.edu.ar": "Instituto de Educación",
      "saludcomunitaria@unahur.edu.ar": "Instituto de Salud Comunitaria",
      "admin@unahur.edu.ar": "Administrador",
      "servicios.comunidad@unahur.edu.ar": "Secretaria de Servicios a la Comunidad"
    };
    return autores[email] || email; // Devuelve el nombre mapeado o el email si no está en la lista
  };
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
      {loading ? <Spinner /> :
      <Container maxWidth="md">
        <Box sx={{ mt: 4, mb: 6 }}>
          {edit ? (
            <TextField
              fullWidth
              variant="outlined"
              label="Título del artículo"
              value={nuevoTitulo}
              onChange={(e) => setNuevoTitulo(e.target.value)}
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="h3" gutterBottom>
              {articulo.titulo}
            </Typography>
          )}
          <Typography variant="subtitle1" gutterBottom>
            {new Date(articulo.createdAt).toLocaleDateString()} por{" "}
            {obtenerNombreAutor(articulo.autor)}
          </Typography>
          {edit ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ marginBottom: "20px" }}
              />
              {nuevaPortada && (
                <Box
                  component="img"
                  src={nuevaPortada} // Muestra la imagen seleccionada
                  alt="Vista previa de la portada"
                  sx={{
                    width: "100%",
                    borderRadius: 2,
                    boxShadow: 3,
                    mb: 3,
                  }}
                />
              )}
            </>
          ) : (
            <Box
              component="img"
              src={articulo.portada || "https://unahur.edu.ar/wp-content/uploads/2022/01/comunicadoinstitucionalnot01.jpg"} // Muestra la portada original
              alt="Encabezado del artículo"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
                mb: 3,
              }}
            />
          )}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            <SocialShareButtons />
          </Box>
          {tipoUsuario === "graduado" || tipoUsuario === "admin" ? <Typography variant="body1" paragraph>
            <Button variant="contained" color="warning" onClick={handleEdit} disabled={edit}>
              Editar
            </Button>
          </Typography> : null}
          {edit ? (
            <>
              <ReactQuill
                modules={modules}
                formats={formats}
                value={nuevoContenido} // Usa el estado `nuevoContenido`
                onChange={setNuevoContenido}
                style={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Guardar Cambios
              </Button>
            </>
          ) : (
            <Typography
              variant="body1"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            ></Typography>
          )}
        </Box>
      </Container>}
      <Footer />
    </ThemeProvider>
  );
};

export default ArticlePage;