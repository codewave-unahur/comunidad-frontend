import { Button, Box, TextField, Tooltip, Card, CardHeader, Grid, Stack, List, ListItem, Typography, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import { getExperienciaLaboral, postExperienciaLaboral, deleteExperienciaLaboral } from '../../../services/experienciaLaboral_service';
import { toast } from 'sonner';
import { EncryptStorage } from 'encrypt-storage';


const ExperienciaLaboral = () => {
    const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
        doNotParseValues: false,
        storageType: "sessionStorage",
      });
    const idUsuario = encryptStorage.getItem("idUsuario");
    const token = sessionStorage.getItem("token");
    const datosUsuario = (encryptStorage.getItem("datosUsuario"));


    const [validarErrores, setValidadErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [edit, setEdit] = useState(false);
    const isFieldDisabled = !edit;
    const [experienciaLaboralPostulante, setExperienciaLaboralPostulante] = useState([]);
    const [descripcionElegida, setDescripcionElegida] = useState('');
    const [fechaInicioElegida, setFechaInicioElegida] = useState('');
    const [fechaFinElegida, setFechaFinElegida] = useState('');
    const [puestoElegido, setPuestoElegido] = useState('');
    const [empresaElegida, setEmpresaElegida] = useState('');


    useEffect(() => {
        const fetchExperienciaLaboral = async () => {
            const response = await getExperienciaLaboral(datosUsuario.id);
            setExperienciaLaboralPostulante(response);
        };

        fetchExperienciaLaboral();
        console.log(experienciaLaboralPostulante)
    }, []);

    const handleEdit = () => {
        setEdit(true);
        setIsSubmitting(false);
    }

    const handleChangePuesto = (event) => {
        setPuestoElegido(event.target.value);
    }

    const handleChangeEmpresa = (event) => {
        setEmpresaElegida(event.target.value);
    }

    const handleChangeDescripcion = (event) => {
        setDescripcionElegida(event.target.value);
    }

    const handleChangeFechaInicio = (event) => {
        setFechaInicioElegida(event.target.value);
    }

    const handleChangeFechaFin = (event) => {
        setFechaFinElegida(event.target.value);
    }

    const handleCancel = () => {
        setEdit(false);
        setIsSubmitting(false);
    } 

    const handleDelete = (idExperiencia) => {
        const response = deleteExperienciaLaboral(idExperiencia);
        if (response) {
            toast.success("Experiencia laboral eliminada con éxito");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } else {
            toast.error("Error al eliminar la experiencia laboral");
        }
    }


    const handleAgregarExpereinciaLaboral = () => {
        if (experienciaLaboralPostulante.length < 3) {
            const response = postExperienciaLaboral(
                puestoElegido,
                empresaElegida,
                descripcionElegida,
                fechaInicioElegida,
                fechaFinElegida,
                datosUsuario.id
            );
        if (response) {
            setExperienciaLaboralPostulante([...experienciaLaboralPostulante, response]);
            toast.success("Experiencia laboral agregada con éxito");
            setTimeout(() => {
                window.location.reload();
            } , 2000);
        } else {
            toast.error("Error al agregar la experiencia laboral");
        }
    } else {
        toast.error("No puedes agregar más de 3 experiencias laborales");
    }
    };

    const convertirFecha = (fecha) => {
        
        const fechaDate = new Date(fecha);
        fechaDate.setDate(fechaDate.getDate() + 1);
        return fechaDate.toLocaleDateString();

    }

    const calcularTiempo = (fechaInicio, fechaFin) => {
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);
        let años = fechaFinDate.getFullYear() - fechaInicioDate.getFullYear();
        let meses = fechaFinDate.getMonth() - fechaInicioDate.getMonth();
        if (meses < 0) {
          años--;
          meses = 12 + meses;
        }
        if (años === 0) {
          if (meses === 1) {
            return meses + " mes";
          } else {
            return meses + " meses";
          }
        } else {
          if (meses === 0) {
            return años + " años";
          } else {
            return años + " años y " + meses + " meses";
          }
        }
      }


    return ( 
        <>
        <Card>
            <CardHeader
                title="Experiencia Laboral"
            />
            <Stack spacing={6} paddingX={2} paddingBottom={3}>
                <List>
                {experienciaLaboralPostulante.map((experienciaLaboral) => (
                    <Box key={experienciaLaboral.id}
                    sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        p: 2,
                        m: 1,
                    
                    }}>
                        <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <ListItemText primary={experienciaLaboral.puesto} secondary="Puesto" />
                                    
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ListItemText primary={experienciaLaboral.empresa} secondary="Empresa" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ListItemText primary={experienciaLaboral.descripcion} secondary="Descripción" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ListItemText primary={convertirFecha(experienciaLaboral.fecha_inicio) +
                                         " - " + convertirFecha(experienciaLaboral.fecha_fin) + 
                                         " (" + calcularTiempo(experienciaLaboral.fecha_inicio, experienciaLaboral.fecha_fin) + ")"} 
                                         secondary="Tiempo" 
                                             
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        disableElevation
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(experienciaLaboral.id)}
                                        sx={{
                                            float:"right",
                                        }}

                                    >
                                        Eliminar
                                    </Button>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </Box>
                ))}
                </List>
                <Box>
                    {edit && (
                                            <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Puesto"
                                                    variant="outlined"
                                                    value={puestoElegido}
                                                    onChange={handleChangePuesto}
                                                    disabled={isFieldDisabled}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Empresa"
                                                    variant="outlined"
                                                    value={empresaElegida}
                                                    onChange={handleChangeEmpresa}
                                                    disabled={isFieldDisabled}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Descripción"
                                                    variant="outlined"
                                                    value={descripcionElegida}
                                                    onChange={handleChangeDescripcion}
                                                    disabled={isFieldDisabled}
                                                />
                                                <Tooltip>
                                                    <Typography variant="caption" color="textSecondary">
                                                        Máximo 255 caracteres
                                                    </Typography>
                                                </Tooltip>
                                            </Grid>
                                            
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    type='date'
                                                    fullWidth
                                                    variant="outlined"
                                                    value={fechaInicioElegida}
                                                    onChange={handleChangeFechaInicio}
                                                    disabled={isFieldDisabled}
                                                    onError={validarErrores.fechaInicio}
                                                    label="Fecha de inicio"
                                                    InputLabelProps={{ shrink: true}}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    type='date'
                                                    value={fechaFinElegida}
                                                    onChange={handleChangeFechaFin}
                                                    disabled={isFieldDisabled}
                                                    onError={validarErrores.fechaFin}
                                                    label="Fecha de fin"
                                                    InputLabelProps={{ shrink: true}}
                                                />
                                            </Grid>
                                        </Grid>
                    )}
                </Box>
                <Grid item xs={12} sm={12} md={12}>
                    {
                        edit && (
                            <Button
                                disableElevation
                                variant="outlined"
                                color="error"
                                sx={{
                                    float:"left",
                                }}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                        )
                    }
                    <Button 
                        disableElevation
                        variant="contained"
                        color="primary"
                        sx={{
                            float:"right",
                        }}
                        onClick={edit ? handleAgregarExpereinciaLaboral : handleEdit}
                        disabled={edit && (!puestoElegido || !empresaElegida || !descripcionElegida || !fechaInicioElegida || !fechaFinElegida)}

                    >
                        {edit ? "Agregar" : "Agregar experiencia laboral"}
                    </Button>
                </Grid>
            </Stack>
        </Card>
        </>
     );
}
 
export default ExperienciaLaboral;