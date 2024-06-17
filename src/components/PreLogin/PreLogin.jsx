import { Box, FormControl, Button, TextField } from '@mui/material';
import React from 'react';
import { toast } from 'sonner';
import { useState } from 'react';



const PreLogin = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const invitado = sessionStorage.getItem('invitado');
    const usuario = import.meta.env.USER_PRELOGIN
    const contrasena = import.meta.env.PASSWORD_PRELOGIN


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
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem('invitado');
        window.location.reload()
    }


    return ( 
        <>
            <Box>
                <h1>PreLogin</h1>
            </Box>
            
            {
                !invitado ? (
                <>
                <Box>
                <FormControl>
                    <TextField
                        label="Usuario"
                        variant="outlined"
                        value={user}
                        onChange={handleUser}
                        type='text'
                    />
                </FormControl>
            </Box>
            <Box>
                <FormControl>
                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        value={password}
                        onChange={handlePassword}
                        type="text"
                    />
                </FormControl>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    
                >
                    Ingresar
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
                
        </>
     );
}
 
export default PreLogin;