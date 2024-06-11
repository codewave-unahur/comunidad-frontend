import axios from "axios";
import { config } from "../config/config";

// ESTO NO SE USA EN NINGÚN LADO

// Trae todos los idiomas de los postulantes (???)

export async function getIdiomasPostulantes() {
  try {
    const response = await axios.get(`${config.apiUrl}/idiomasPostulantes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todos los idiomas de un postulante por id de postulante (???)

export async function getIdiomasPostulante(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/idiomasPostulantes/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de idiomas

export async function postIdiomasPostulantes(id, idIdioma, idNivel){
  try {
    const response = await axios.post(`${config.apiUrl}/idiomasPostulantes`, {
      idIdioma: idIdioma,
      idPostulante: id,
      idNivel: idNivel
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteIdioma(id) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/idiomasPostulantes/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

