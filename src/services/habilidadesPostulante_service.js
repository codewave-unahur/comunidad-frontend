import axios from "axios";
import { config } from "../config/config";

// Trae todas las habilidades de los postulantes

export async function getHabilidadesPostulantes() {
    try {
        const response = await axios.get(`${config.apiUrl}/habilidadesPostulantes`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }

// Trae todas las habilidades de un postulante por id de postulante

export async function getHabilidadesPostulante(id) {
    try {
        const response = await axios.get(
            `${config.apiUrl}/habilidadesPostulantes/${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


// Post de habilidades

export async function postHabilidadesPostulantes(id, idHabilidad) {
    try {
        const response = await axios.post(
            `${config.apiUrl}/habilidadesPostulantes`,{
                idAptitud: idHabilidad,
                idPostulante: id
            }
            
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteHabilidad(id) {
    try {
        const response = await axios.delete(
            `${config.apiUrl}/habilidadesPostulantes/${id}`
        );
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

