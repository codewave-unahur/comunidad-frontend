import axios from "axios";
import { config } from "../config/config";

export async function postNewsletter(titulo, tipo_destinatario, asunto, contenido) {
  try {
    const response = await axios.post(`${config.apiUrl}/newsletter/nueva-newsletter`, 
        {
            titulo: titulo,
            tipo_destinatario: tipo_destinatario,
            asunto: asunto,
            contenido: contenido
        },
        {
            headers: {
            Authorization: `bearer ${sessionStorage.getItem("token")}`,
            },
        }
        );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getNewsletters() {
  try {
    const response = await axios.get(`${config.apiUrl}/newsletter/`, {
      headers: {
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
}

export async function sendNewsletter(newsletterId) {
  try {
    const response = await axios.post(`${config.apiUrl}/newsletter/enviar-newsletter/${newsletterId}`, 
        {},
        {
            headers: {
            Authorization: `bearer ${sessionStorage.getItem("token")}`,
            },
        }
        );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}