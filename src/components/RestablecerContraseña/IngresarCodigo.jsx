import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Toaster, toast } from "sonner";

import { verificarCodigo } from "../../services/password_service";
import Header from "../Header/Header";

const IngresarCodigo = () => {
    const [tokenInput, setTokenInput] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('initial'); // 'initial', 'success', 'failed'
    const { token: tokenFromParams } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tokenFromQuery = searchParams.get('token');
    const navigate = useNavigate();

    const tokenFromUrl = tokenFromParams || tokenFromQuery;

    const handleVerificarCodigo = useCallback(async (tokenToVerify, isAutomatic = false) => {
        if (!tokenToVerify) return;

        setIsVerifying(true);
        try {
            const response = await verificarCodigo(tokenToVerify);
            if (response.message) {
                setVerificationStatus('success');
                if (!isAutomatic) {
                    toast.success(response.message);
                }
                navigate(`/restablecimientoContraseña/nuevaContraseña/${tokenToVerify}`);
            }
        } catch (error) {
            setVerificationStatus('failed');
            if (!isAutomatic) {
                toast.error(error.message || "Código inválido");
            }
        } finally {
            setIsVerifying(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (tokenFromUrl) {
            handleVerificarCodigo(tokenFromUrl, true);
        } else {
            setVerificationStatus('failed');
        }
    }, [tokenFromUrl, handleVerificarCodigo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleVerificarCodigo(tokenInput);
    };

    return (
        <>
            <CssBaseline />
            <Header />
            <Container
                component="form"
                onSubmit={handleSubmit}
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
                    {isVerifying ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Typography
                                variant="body1"
                                align="left"
                                sx={{
                                    mt: 2,
                                    mb: 1,
                                }}
                            >
                                {verificationStatus === 'failed' && tokenFromUrl
                                    ? "La verificación automática falló. Por favor, ingrese el código manualmente:"
                                    : "Ingrese el código de verificación que le enviamos a su correo electrónico:"}
                            </Typography>
                            <TextField
                                fullWidth
                                required
                                label="Código de verificación"
                                id="codigo"
                                name="codigo"
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value)}
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
                        </>
                    )}
                </Paper>
            </Container>
            <Toaster richColors closeButton duration={5000} />
        </>
    );
};

export default IngresarCodigo;