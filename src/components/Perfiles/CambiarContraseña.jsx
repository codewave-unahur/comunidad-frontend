import { Card, CardHeader, Stack, TextField, Button } from "@mui/material";
import { EncryptStorage } from "encrypt-storage";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import * as yup from 'yup';

const CambiarContraseña = () => {

    const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
        doNotParseValues: false,
        storageType: "sessionStorage"
    });

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [validarErrores, setValidarErrores] = useState({}); 

    const idUsuario = encryptStorage.getItem('idUsuario');
    const token = sessionStorage.getItem('token');


    const schema = yup.object().shape({
        password: yup.string().required('La contraseña actual es requerida'),
        newPassword: yup.string().required('La nueva contraseña es requerida'),
        repeatNewPassword: yup.string().required('La confirmación de la nueva contraseña es requerida')
    });
    
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
        
    }
    


    return ( 
        <>
            <Card type="section" elevation={8}>
                <CardHeader title="Cambiar Contraseña" />
                <Stack spacing={6}>
                    <Stack 
                        direction='column'
                        spacing={2}
                        justifyContent={{ xs: 'center', sm: 'flex-start' }}
                        alignItems={{ xs: 'center', sm: 'flex-start' }}
                    >
                        <TextField
                            label="Contraseña actual"
                            variant="outlined"
                            type="password"
                            error={validarErrores.password}
                        />
                        <TextField
                            label="Nueva contraseña"
                            variant="outlined"
                            type="password"
                            error={validarErrores.newPassword}
                            
                        />
                        <TextField
                            label="Repetir nueva contraseña"
                            variant="outlined"
                            type="password"
                            error={validarErrores.repeatNewPassword}
                        />
                    </Stack>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Cambiar contraseña
                    </Button>
                </Stack>
            </Card>
            <Toaster />
        </>
     );
}
 
export default CambiarContraseña;