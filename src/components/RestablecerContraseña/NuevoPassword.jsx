import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Paper,
    TextField,
    Typography,
    Tooltip,
    IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Toaster, toast } from "sonner";
import { cambiarContrasena } from "../../services/password_service";
import Header from "../Header/Header";
import * as yup from "yup";

const schema = yup.object().shape({
    contraseña: yup
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .matches(/\d/, "Debe contener al menos un número")
        .required("La contraseña es requerida"),
    confirmarContraseña: yup
        .string()
        .oneOf([yup.ref("contraseña"), null], "Las contraseñas deben coincidir")
        .required("La confirmación de contraseña es requerida"),
});

const NuevoPassword = () => {
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [errors, setErrors] = useState({});
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        schema.validate({ contraseña, confirmarContraseña }, { abortEarly: false })
            .then(() => setErrors({}))
            .catch((err) => {
                const newErrors = {};
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);
            });
    }, [contraseña, confirmarContraseña]);

    const handleCambioContraseña = async (e) => {
        e.preventDefault();

        try {
            await schema.validate({ contraseña, confirmarContraseña }, { abortEarly: false });
            const response = await cambiarContrasena(token, contraseña);

            if (response.message) {
                toast.success(response.message);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                error.inner.forEach((validationError) => {
                    toast.error(validationError.message);
                });
            } else {
                toast.error(error.message || "Ha ocurrido un error inesperado.");
            }
        }
    };

    return (
        <>
            <CssBaseline />
            <Header />
            <Container
                component="main"
                maxWidth="sm"
                sx={{ mb: 4 }}
            >
                <Paper
                    variant="outlined"
                    sx={{
                        my: { xs: 3, md: 10 },
                        p: { xs: 2, md: 3 },
                        borderRadius: "12px",
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    }}
                >
                    <Box sx={{ pb: 2 }}>
                        <Avatar
                            sx={{
                                margin: "auto",
                                background: "#00404F",
                            }}
                        >
                            <LockOutlinedIcon />
                        </Avatar>
                    </Box>
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Nueva contraseña
                    </Typography>
                    <Typography
                        variant="body1"
                        align="left"
                        sx={{
                            mt: 2,
                            mb: 1,
                        }}
                    >
                        Ingrese su nueva contraseña.
                        <Tooltip title="La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número." arrow>
                            <IconButton size="small" sx={{ ml: 1 }}>
                                <InfoOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Box component="form" onSubmit={handleCambioContraseña} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            required
                            type="password"
                            label="Contraseña nueva"
                            id="contraseña"
                            name="contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            error={!!errors.contraseña}
                            helperText={errors.contraseña}
                            sx={{ mt: 2 }}
                        />
                        <TextField
                            fullWidth
                            required
                            type="password"
                            label="Confirmar contraseña"
                            id="confirmarContraseña"
                            name="confirmarContraseña"
                            value={confirmarContraseña}
                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                            error={!!errors.confirmarContraseña}
                            helperText={errors.confirmarContraseña}
                            sx={{ mt: 2 }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                                mt: 2,
                                mb: 2,
                            }}
                        >
                            Cambiar contraseña
                        </Button>
                    </Box>
                </Paper>
            </Container>
            <Toaster richColors closeButton duration={5000} />
        </>
    );
};

export default NuevoPassword;