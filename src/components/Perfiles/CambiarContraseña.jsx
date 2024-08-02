import { Card, CardHeader, Stack, TextField, Button, Box } from "@mui/material";
import { EncryptStorage } from "encrypt-storage";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { cambiarPassword } from "../../services/usuarios_service";
import * as yup from 'yup';

const CambiarContraseña = () => {


    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [validarErrores, setValidarErrores] = useState({});




    const schema = yup.object().shape({
        password: yup.string().required('La contraseña actual es requerida'),
        newPassword: yup.string().required('La nueva contraseña es requerida').min(8, "La contraseña debe tener al menos 8 caracteres"),
        repeatNewPassword: yup.string().required('La nueva contraseña es requerida').min(8, "La contraseña debe tener al menos 8 caracteres").oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
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


    

    
   /* const handleSubmit = async () => {
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
}*/

    const handleSubmit = async () => {
        schema
            .validate({ password, newPassword, repeatNewPassword }, { abortEarly: false })
            .then(async () => {
                const response = await cambiarPassword(password, newPassword);
                if(response) {
                    toast.success('Contraseña cambiada exitosamente');
                    //recargar la pagina pasados 2 segundos
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else{
                    toast.error('Contraseña actual incorrecta');
                }
            })
            .catch((err) => {
                const errores = {};
                err.inner.forEach((e)=>{
                    errores[e.path] = e.errors[0];
                })
                setValidarErrores(errores);
            });
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
                                error={Boolean(validarErrores.password)}
                                helperText={validarErrores.password}
                            />
                            <TextField
                                label="Nueva Contraseña"
                                variant="outlined"
                                type="password"
                                value={newPassword}
                                onChange={handleChangeNewPassword}
                                error={Boolean(validarErrores.newPassword)}
                                helperText={validarErrores.newPassword}
                                
                            />
                            <TextField
                                label="Repetir Nueva Contraseña"
                                variant="outlined"
                                type="password"
                                value={repeatNewPassword}
                                onChange={handleChangeRepeatNewPassword}
                                error={Boolean(validarErrores.repeatNewPassword)}
                                helperText={validarErrores.repeatNewPassword}
                                
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