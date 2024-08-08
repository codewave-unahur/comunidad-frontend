import React, { useState } from 'react';
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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Toaster, toast } from "sonner";

import { verificarCodigo } from "../../services/password_service";
import Header from "../Header/Header";

const IngresarCodigo = () => {
    const [codigo, setCodigo] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleVerificarCodigo = async (e) => {
        e.preventDefault();
        try {
            const response = await verificarCodigo(token, codigo);
            if (response.message) {
                toast.success(response.message);
                navigate(`/restablecimientoContraseña/nuevaContraseña/${token}`);
            }
        } catch (error) {
            toast.error(error.message || "Código inválido");
        }
    };

    return (
        <>
            <CssBaseline />
            <Header />
            <Container
                component="form"
                onSubmit={handleVerificarCodigo}
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
                        Verificar código
                    </Typography>
                    <Typography
                        variant="body1"
                        align="left"
                        sx={{
                            mt: 2,
                            mb: 1,
                        }}
                    >
                        Ingrese el código de verificación que le enviamos a su correo electrónico.
                    </Typography>
                    <TextField
                        fullWidth
                        required
                        label="Código de verificación"
                        id="codigo"
                        name="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        sx={{
                            mt: 2,
                        }}
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
                        Verificar
                    </Button>
                </Paper>
            </Container>
            <Toaster richColors closeButton duration={5000} />
        </>
    );
};

export default IngresarCodigo;