import {
  Button,
  Card,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";

export default function CrearArticulo() {
  const [titulo, setTitulo] = useState("");
  const [tags, setTags] = useState([]);
  const [contenido, setContenido] = useState("");

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

  const handleTitulo = (e) => {
    setTitulo(e.target.value);
  };

  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const handleContenido = (e) => {
    setContenido(e.target.value);
  };

  const crearArticulo = () => {
    console.log(contenido);
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
              label="Tags"
              variant="outlined"
              required
              onChange={handleTags}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              modules={modules}
              formats={formats}
              placeholder="Escribe tu articulo"
              onChange={(e) => setContenido(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={crearArticulo}>
              Crear
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
