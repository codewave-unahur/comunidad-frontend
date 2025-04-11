import {
  Button,
  Card,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { postArticulo } from "../../../services/articulos_service";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { jwtDecode } from "jwt-decode";


export default function CrearArticulo() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [portada, setPortada] = useState(null);
  const [autor, setAutor] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  

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

  

  useEffect(() => {
    decodificarToken(token);
  }, [token]);
   

  const decodificarToken = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const { usuario } = decoded;
      setAutor(usuario);
    } else {
      console.error("Token no encontrado o inválido");
    }
  };

  const handleTitulo = (e) => {
    setTitulo(e.target.value);
  }

  const handleContenido = (value) => {
    setContenido(value);
  }

  const handlePortada = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPortada(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const datos = {
      titulo: titulo,
      portada: portada,
      contenido: contenido,
      autor: autor
    };
  
    try {
      const response = await postArticulo(datos);
      console.log("Artículo creado:", response);
      toast.success("Artículo creado con éxito");
      setTimeout(() => {
        navigate("/perfil");
      }, 2000);
    } catch (error) {
      console.error("Error al crear el artículo:", error);
    }
  };




  return (
    <>
      <Card type="section" elevation={8}>
        <CardHeader title="Crear Articulo" />
        <Grid container spacing={2} mt={2} p={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Titulo"
              variant="outlined"
              required
              onChange={handleTitulo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="file"
              label="Portada"
              variant="outlined"
              
              InputLabelProps={{ shrink: true }}
              required
              onChange={handlePortada}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              modules={modules}
              formats={formats}
              placeholder="Escribe tu articulo"
              onChange={handleContenido}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Crear
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Toaster/>
    </>
  );
}
