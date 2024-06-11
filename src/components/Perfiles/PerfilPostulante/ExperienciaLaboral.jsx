import { Button, Box, TextField, Card, CardHeader, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getExperienciaLaboral, postExperienciaLaboral } from '../../../services/experienciaLaboral_service';
import { toast } from 'sonner';


const ExperienciaLaboral = () => {

    const idUsuario = sessionStorage.getItem("idUsuario");
    const token = sessionStorage.getItem("token");
    const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));


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
        const fechaConvertida = new Date(fecha);
        return fechaConvertida.toLocaleDateString();

    }



    return ( 
        <>
        <Card>
            <CardHeader
                title="Experiencia Laboral"
            />
            <Stack spacing={6} paddingX={2} paddingBottom={3}>
                {experienciaLaboralPostulante.map((experienciaLaboral) => (
                    <Box key={experienciaLaboral.id}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Puesto"
                                    variant="outlined"
                                    value={experienciaLaboral.puesto}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Empresa"
                                    variant="outlined"
                                    value={experienciaLaboral.empresa}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Descripción"
                                    variant="outlined"
                                    value={experienciaLaboral.descripcion}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Fecha de inicio"
                                    variant="outlined"
                                    value={convertirFecha(experienciaLaboral.fecha_inicio)}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Fecha de fin"
                                    variant="outlined"
                                    value={convertirFecha(experienciaLaboral.fecha_fin)}
                                    disabled
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ))}
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
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Fecha de inicio"
                                                    variant="outlined"
                                                    type='date'
                                                    value={fechaInicioElegida}
                                                    onChange={handleChangeFechaInicio}
                                                    disabled={isFieldDisabled}
                                                    onError={validarErrores.fechaInicio}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Fecha de fin"
                                                    variant="outlined"
                                                    type='date'
                                                    value={fechaFinElegida}
                                                    onChange={handleChangeFechaFin}
                                                    disabled={isFieldDisabled}
                                                    onError={validarErrores.fechaFin}
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
                    >
                        {edit ? "Agregar" : "Editar"}
                    </Button>
                </Grid>
            </Stack>
        </Card>
        </>
     );
}
 
export default ExperienciaLaboral;