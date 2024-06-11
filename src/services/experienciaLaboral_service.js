import axios from "axios";

import { config } from "../config/config";

// Trae todas las experiencias laborales de un postulante

export async function getExperienciaLaboral(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/experienciaLaboral/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Crea una experiencia laboral

export async function postExperienciaLaboral(puesto, empresa, descripcion, fecha_inicio, fecha_fin, idPostulante) {
    try {
        const response = await axios.post(`${config.apiUrl}/experienciaLaboral/${idPostulante}`, {
            puesto: puesto,
            empresa: empresa,
            descripcion: descripcion,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            postulante_id: idPostulante
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }

// Actualiza una experiencia laboral

export async function updateExperienciaLaboral(experienciaLaboral) {
    try {
        const response = await axios.put(`${config.apiUrl}/experienciaLaboral`, experienciaLaboral);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }

// Elimina una experiencia laboral

export async function deleteExperienciaLaboral(id) {
    try {
        const response = await axios.delete(`${config.apiUrl}/experienciaLaboral/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }
