import { Card, CardHeader, Stack, TextField, Button, Box } from "@mui/material";
import { EncryptStorage } from "encrypt-storage";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { cambiarPassword } from "../../services/usuarios_service";

const CambiarContraseña = () => {


    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');


    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleChangeRepeatNewPassword = (e) => {
        setRepeatNewPassword(e.target.value);
    }


    

    
    const handleSubmit = async () => {
        if (newPassword === repeatNewPassword) {
            const response = await cambiarPassword(password, newPassword);
            if (response) {
                toast.success("Contraseña cambiada exitosamente");
            } else {
                toast.error("Contraseña actual incorrecta");
            }
        } else {
            toast.error("Las contraseñas no coinciden");
    }
}


    return ( 
        <>
            <Card type="section" elevation={8}>
                <CardHeader title="Cambiar Contraseña" />
                <Stack spacing={6}>
                    <Stack 
                        direction='column'
                        spacing={2}
                        
                    >
                        
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            width: '100%',
                            padding: '1rem'
                        }}>
                            <TextField
                                label="Contraseña Actual"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={handleChangePassword}
                            />
                            <TextField
                                label="Nueva Contraseña"
                                variant="outlined"
                                type="password"
                                value={newPassword}
                                onChange={handleChangeNewPassword}
                            />
                            <TextField
                                label="Repetir Nueva Contraseña"
                                variant="outlined"
                                type="password"
                                value={repeatNewPassword}
                                onChange={handleChangeRepeatNewPassword}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{
                                    backgroundColor: '#00404f',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#006064'
                                    }
                                }}
                            >
                                Cambiar Contraseña
                            </Button>

                        </Box>

                    </Stack>
                    
                </Stack>
            </Card>
            <Toaster richColors/>
        </>
     );
}
 
export default CambiarContraseña;