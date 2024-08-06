import { Box, Card, CardHeader, Grid, Typography} from "@mui/material";
import { useState, useEffect } from "react";
import { getUsuarios } from "../../../services/usuarios_service";
import { getEmpresasSinFiltros } from "../../../services/empresas_service";
import { getPostulantesSinFiltros } from "../../../services/postulantes_service";
import { getPostulaciones } from "../../../services/postulaciones_service";
import { getOfertasSinFiltros } from "../../../services/ofertas_service";

const Estadisticas = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [postulantes, setPostulantes] = useState([]);
    const [postulantesUNAHUR, setPostulantesUNAHUR] = useState([]);
    const [postulaciones, setPostulaciones] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    

    useEffect(() => {
        const traerUsuarios = async () => {
            const response = await getUsuarios();
            if (response) {
                setUsuarios(response.usuarios.length);
            }
        }
        const traerEmpresas = async () => {
            const response = await getEmpresasSinFiltros();
            if (response) {
                setEmpresas(response.empresas.count);
            }
        }
        const traerPostulantes = async () => {
            const response = await getPostulantesSinFiltros();
            if (response) {
                setPostulantes(response.postulantes.count);
            }
        }

        const traerPostulantesUNAHUR = async () => {
            const response = await getPostulantesSinFiltros();
            if (response) {
                setPostulantesUNAHUR(response.postulantes.rows.filter(postulante => postulante.alumno_unahur === true).length);
            }
        }

        const traerPostulaciones = async () => {
            const response = await getPostulaciones();
            if (response) {
                setPostulaciones(response.postulaciones.length);
            }
        }

        const traerOfertas = async () => {
            const response = await getOfertasSinFiltros();
            if (response) {
                setOfertas(response.ofertas.count);
            }
        }
            
        traerUsuarios();
        traerEmpresas();
        traerPostulantes();
        traerPostulantesUNAHUR();
        traerPostulaciones();
        traerOfertas();
    }, []);

    const porcentajePostulantesUNAHUR = (postulantesUNAHUR * 100) / postulantes;



    return ( 
        <>
            <Card type="section" elevation={8}>
                <CardHeader title="Estadísticas" />
                <Box sx={{
                    padding: 2,
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",

                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Usuarios registrados</Typography>
                                <Typography variant = "h4">{usuarios}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Empresas registradas</Typography>
                                <Typography variant = "h4">{empresas}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Postulantes registrados</Typography>
                                <Typography variant = "h4">{postulantes}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Alumnos UNAHUR</Typography>
                                <Typography variant = "h4">{postulantesUNAHUR} ({porcentajePostulantesUNAHUR}%) </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Postulaciones totales</Typography>
                                <Typography variant = "h4">{postulaciones}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography variant = "h6">Ofertas creadas</Typography>
                                <Typography variant = "h4">{ofertas}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </>
     );
}
 
export default Estadisticas;