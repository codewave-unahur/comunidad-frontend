import { Box, Slide, Button, Card, MenuItem, ListItemIcon, CardHeader, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, TextField, Typography, Dialog, DialogTitle, DialogContent, Stack, DialogActions } from "@mui/material";
import React, { useEffect, forwardRef } from "react";
import { uploadImage } from "../../../services/galeria_service";
import { useState } from "react";
import { getGaleria } from "../../../services/galeria_service";
import { deleteGaleria } from "../../../services/galeria_service";
import { putGaleria } from "../../../services/galeria_service";
import { Toaster, toast } from "sonner";
import ImageIcon from '@mui/icons-material/Image';

export default function Galeria() {
  const [galeria, setGaleria] = useState([]);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [edit, setEdit] = useState(false);
  const [idImagen, setIdImagen] = useState(null);
  const [links, setLinks] = useState("");

  useEffect(() => {
    const fetchGaleria = async () => {
      const response = await getGaleria();
      if (response) {
        setGaleria(response.carouselImages);
        console.log(response.carouselImages)
      }
    };
    fetchGaleria();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setImagenSeleccionada(null);
    setOpen(false);
    setIsImageSelected(false);
  };

  const handleImagenSeleccionada = (e) => {
    setImagenSeleccionada(e.target.files[0]);
    setIsImageSelected(true);
  };

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleUploadImage = async (image) => {
    try {
      
      const response = await uploadImage(imagenSeleccionada);
      if (response) {
        toast.success("Imagen subida correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      }
    } catch (error) {
      toast.error("Error al subir la imagen");
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await deleteGaleria(id);
      if (response) {
        toast.success("Imagen eliminada correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleEditLink = async (id) => {
    setEdit(true);
    setIdImagen(id);
  }

  const handleSaveLink = async (id) => {
    try {
      const response = await putGaleria(id, links);
      if (response) {
        toast.success("Link actualizado correctamente");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  
 

  const convertirHora = (hora) => {
    const date = new Date(hora);
    return date.toLocaleString();
  }

  return (
    <>
      <Card type="section" elevation={8}>
        <CardHeader title="Galería" />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">
                    Imagen
                  </Typography> 
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">ID</Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5"> Link </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5"> Fecha de subida </Typography>
                </TableCell>
                <TableCell align="center" sx={{ width: "20%" }}>
                  <Typography variant="h5">Acciones</Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {galeria.map((image, index) => (
                <TableRow key={image.id}>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <img
                      src={image.imageUrl}
                      alt="imagen"
                      style={{ width: "100px" }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Typography variant="h5">{image.id}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    {
                     // crear input para editar link solo para el id seleccionado
                     edit && idImagen === image.id ? (
                      <TextField
                        id="links"
                        label="Link"
                        variant="outlined"
                        value={links}
                        onChange={(e) => setLinks(e.target.value)}
                      />
                    ) : (
                      <Typography variant="h5">{image.links}</Typography>
                    )
                    

                    }
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Typography variant="h5">
                      {convertirHora(image.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Button onClick={ edit ? () => handleSaveLink(image.id) : () => handleEditLink(image.id)} 
                    variant="contained" 
                    
                    sx={{
                      marginRight:"4px",
                      backgroundColor: edit ? "#0056b3" : "#fd7e14",
                      "&:hover": {
                        backgroundColor: edit ? "#0056b3" : "#fd7e14",
                        color: "white",
                        opacity: 0.8,
                      },
                      }}>
                      {edit ? "Guardar" : "Editar"}
                    </Button>
                    <Button onClick={() => handleDeleteImage(image.id)} variant="contained" color="error">
                      Eliminar
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <MenuItem
                  key="uploadImage"
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  Subir imagen a galeria
                </MenuItem>,
        <Box>
          <Dialog key="uploadImage" 
          open={open} 
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          maxWidth="sm"
          fullWidth >
            <DialogTitle>
              {"Por favor seleccione la imagen que desea subir a la galeria (Resolución: 1920x500)"}
            </DialogTitle>
            <DialogContent>
              <Stack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={6}
              paddingY={2}
              alignItems="center"
              justifyContent="center"
              >
                <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          paddingX: 2,
                        }}
                      >
                        <Button
                          component="label"
                          disableElevation
                          size="medium"
                          variant="contained"
                          endIcon={<ImageIcon />}
                          sx={{
                            marginTop: 1,
                          }}
                        >Seleccione su imagen
                        <input
                          type="file"
                          onChange={handleImagenSeleccionada}
                          hidden
                        /></Button>
                         {isImageSelected && (
                          <Typography
                            variant="subtitle1"
                            display="block"
                            sx={{
                              marginTop: 1,
                            }}
                          >
                            {imagenSeleccionada.name}
                          </Typography>
                        )}
                        </Box>
                        </Stack>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="error">
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleUploadImage}
                            color="success"
                            variant="contained"
                            disableElevation
                            disabled={!isImageSelected}
      
                          >
                            Subir imagen
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Toaster key="subirImagenToaster" richColors closeButton />
          
                  
        </Box>
      </Card>
    </>
  );
}
