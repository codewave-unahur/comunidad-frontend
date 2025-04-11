import {
  Typography,
  TextField,
  Grid,
  Checkbox,
  Box,
  Select,
  MenuItem,
  Card,
  CardHeader,
  Stack,
  Slide,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
    TableBody
} from "@mui/material";
import React, { useState, forwardRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "@mui/material/Button";
import { postNewsletter, getNewsletters, sendNewsletter } from "../../../services/newsletter_service";
import DOMPurify from "dompurify";
import { Toaster, toast } from "sonner";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function Newsletter() {
  const [open, setOpen] = useState(false);
  const [asunto, setAsunto] = useState("");
  const [titulo, setTitulo] = useState("");
  const [algo, setAlgo] = useState("");
  const [preview, setPreview] = useState(false);
  const [destinatario, setDestinatario] = useState("");
  const [newletters, setNewsletters] = useState([]);
  const destinatarios = ["empresa", "postulante", "ambos"];
  const [selectedContent, setSelectedContent] = useState('');

  const secciones = ["Newsletters", "Crear Newsletter"];

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

  const sanitizedPreview = DOMPurify.sanitize(algo);
  const sanitizedContent = DOMPurify.sanitize(selectedContent);

  useEffect(() => {
    const fetchData = async () => {
        const response = await getNewsletters();
        setNewsletters(response.newsletters);
    };
    fetchData();
    console.log(newletters)
    }, []);

  const handleChange = (value) => {
    setAlgo(value);
  };

  const selectDestinatary = (e) => {
    setDestinatario(e.target.value);
  };

  const showPreview = (content) => {
    setPreview(content);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const showContent = (content) => {
    setSelectedContent(content);
    };
  const crearNewsletter = async () => {
    const response = await postNewsletter(titulo, destinatario, asunto, algo);
    if (response) {
      toast.success("Newsletter enviado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al enviar el newsletter");
    }
  };

  const enviarNewsletter = async (id) => {
    const response = await sendNewsletter(id);
    if (response) {
      toast.success("Newsletter enviado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al enviar el newsletter");
    }
  }


return (
    <>
        <Card type="section" elevation={8}>
            <CardHeader
                title={open ? secciones[1] : secciones[0]}
                sx={{
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                }}
            />
            
            <Grid container spacing={2} mt={2} p={2}>
                {open ? (
                    <>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Titulo"
                                variant="outlined"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                fullWidth
                                label="Destinatario"
                                variant="outlined"
                                value={destinatario}
                                onChange={selectDestinatary}
                            >
                                {destinatarios.map((destinatario) => (
                                    <MenuItem key={destinatario} value={destinatario}>
                                        {destinatario}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Asunto"
                                variant="outlined"
                                value={asunto}
                                onChange={(e) => setAsunto(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                value={algo}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            margin: '1rem'
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={crearNewsletter}
                                sx={{
                                    margin: '1rem',

                                }}
                            >
                                Enviar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={showPreview}
                                sx={{
                                    margin: '1rem',
                                }}
                            >
                                Vista Previa
                            </Button>
                            <Button 
                                    variant="outlined"
                                    color="error"
                                    onClick={handleOpen}
                                    sx={{
                                            margin: '1rem',
                                    }}
                            >
                                    Cancelar
                            </Button>
                        </Box>
                            {preview && (
                                    <Grid item xs={12}>
                                    
                                    <Typography
                                            variant="body1"
                                            dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
                                    ></Typography>
                                    </Grid>
                            )}
                    </>
                ) : (
                    <>
                            <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '1rem'
                                    }}>
                                    <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleOpen}
                                    >
                                            Crear Newsletter
                                    </Button>
                            </Box>
                            <TableContainer>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                    <TableRow>
                                                            <TableCell>Titulo</TableCell>
                                                            <TableCell>Destinatario</TableCell>
                                                            <TableCell>Asunto</TableCell>
                                                            <TableCell>Fecha</TableCell>
                                                            <TableCell>Preview</TableCell>
                                                    </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                    {newletters.map((newsletter) => (
                                                            <TableRow
                                                                    key={newsletter._id}
                                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                            >
                                                                    <TableCell component="th" scope="row">
                                                                            {newsletter.titulo}
                                                                    </TableCell>
                                                                    <TableCell>{newsletter.tipo_destinatario}</TableCell>
                                                                    <TableCell>{newsletter.asunto}</TableCell>
                                                                    <TableCell>{new Date(newsletter.createdAt).toLocaleDateString()}</TableCell>
                                                                    <TableCell>
                                                                            <Button
                                                                                    variant="outlined"
                                                                                    color="secondary"
                                                                                    onClick={() => showContent(newsletter.contenido)}
                                                                                    sx={{
                                                                                            margin: '0.5rem',
                                                                                    }}
                                                                            >
                                                                                    Vista Previa
                                                                            </Button>
                                                                            <Button 
                                                                                    variant="contained"
                                                                                    color="primary"
                                                                                    onClick={() => enviarNewsletter(newsletter.id)}
                                                                                    sx={{
                                                                                            margin: '0.5rem',
                                                                                    }}
                                                                            >
                                                                                    Enviar
                                                                            </Button>
                                                                    </TableCell>
                                                            </TableRow>
                                                    ))}
                                            </TableBody>
                                    </Table>
                            </TableContainer>
                            {selectedContent && (
                                    <div>
                                            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                                    </div>
                            )}
                    </>
                )}
            </Grid>
        </Card>
        <Toaster />
    </>
);
}
