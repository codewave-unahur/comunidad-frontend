import { Card, CardHeader, Stack, TextField, Button } from "@mui/material";
import { EncryptStorage } from "encrypt-storage";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { cambiarPassword } from "../../services/usuarios_service";

const CambiarContraseña = () => {

    const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
        doNotParseValues: false,
        storageType: "sessionStorage"
    });

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');

    const token = sessionStorage.getItem('token');

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
                toast.error("Error al cambiar la contraseña");
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
                        justifyContent={{ xs: 'center', sm: 'flex-start' }}
                        alignItems={{ xs: 'center', sm: 'flex-start' }}
                    >
                        <TextField
                            label="Contraseña actual"
                            variant="outlined"
                            type="password"
                            onChange={handleChangePassword}
                        />
                        <TextField
                            label="Nueva contraseña"
                            variant="outlined"
                            type="password"
                            onChange={handleChangeNewPassword}
                        />
                        <TextField
                            label="Repetir nueva contraseña"
                            variant="outlined"
                            type="password"
                            onChange={handleChangeRepeatNewPassword}
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
            <Toaster richColors/>
        </>
     );
}
 
export default CambiarContraseña;