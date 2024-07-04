import axios from "axios";
import { config } from "../config/config";

// Trae todos los estudios

export async function getHabilidades() {
  try {
    const response = await axios.get(`${config.apiUrl}/habilidades`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
