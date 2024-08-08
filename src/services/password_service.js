import axios from "axios";
import { config } from "../config/config";

export async function postResetPasswordRequest(usuario) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/restablecerPassword/solicitar-restablecimiento`,
            { usuario }
        );
        return response.data;
    } catch (error) {
        console.error('Error en postResetPasswordRequest:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Error en la solicitud');
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la solicitud');
        }
    }
}

export async function verificarCodigo(token, codigo) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/restablecerPassword/verificar-codigo`,
            { token, codigo }
        );
        return response.data;
    } catch (error) {
        console.error('Error en verificarCodigo:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Error en la verificación');
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la solicitud');
        }
    }
}

export async function cambiarContrasena(token, nuevaContrasena) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/restablecerPassword/cambiar-contrasena`,
            { token, nuevaContrasena }
        );
        return response.data;
    } catch (error) {
        console.error('Error en cambiarContrasena:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'Error al cambiar la contraseña');
        } else if (error.request) {
            throw new Error('No se recibió respuesta del servidor');
        } else {
            throw new Error('Error al configurar la solicitud');
        }
    }
}