import { Box, FormControl, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import logoVinculacion from '../../assets/logoVinculacion.svg';
import { toast } from "sonner";



const PreLogin = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const invitado = sessionStorage.getItem('invitado');



    const handleUser = (e) => {
        setUser(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }


    const handleLogin = () => {
        if (user === import.meta.env.VITE_USER && password === import.meta.env.VITE_PASSWORD) {
            console.log('Usuario y contraseña correctos');
            sessionStorage.setItem('invitado', true)
            window.location.href = '/home';
        }
        else {
            console.log('Usuario o contraseña incorrectos');
            toast.error('Usuario o contraseña incorrectos');
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('invitado');
        window.location.reload()
    }


    return ( 
        <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4'
        }}>
            {
                !invitado ? (
                <>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    justifyContent: 'center',
                    padding: '40px',
                    maxWidth: '330px',
                    
                }}>
                    <img src={logoVinculacion} alt="Logo Vinculación" style={{ 
                        width: '200px',
                        height: '200px',
                        marginBottom: '20px'
                     }} />
                     
                    <Box sx={{ 
                        padding: '1rem 1rem',
                        backgroundColor: '#fff3cd',
                        border : '1px solid transparent',
                        borderRadius: '.25rem',
                        borderColor: '#ffecb5',
                     }}>
                        <Typography 
                            variant="h4" 
                            align='center' 
                            sx={{
                                color: "#664d03",
                                fontSize: '1rem',
                                fontWeight: 400,
                                lineHeight: 1.5,
                                fontFamily: 'Roboto, sans-serif'

                            }} >
                            Para acceder primero debes loguearte.
                        </Typography>
                    </Box>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            onChange={handleUser}
                            width="330px" 
                            fullWidth
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        />
                    
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            onChange={handlePassword}
                            fullWidth 
                            sx={{
                                backgroundColor: '#fff',
                            }}
                        />
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        color='success'
                        fullWidth
                    >
                        Iniciar sesión
                    </Button>
                    
                </Box>
            </>) : (<Box>
                <h2>Ya estás logueado</h2>
                <Button
                    variant="contained"
                    onClick={handleLogout}
                    
                    
                >
                    Cerrar sesión
                </Button>
            </Box>)
            }
             </Box>   
        </>
     );
}
 
export default PreLogin;