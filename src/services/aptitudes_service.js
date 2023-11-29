import axios from "axios";
import { config } from "../config/config";

// Trae todas las aptitudes

export async function getAptitudes() {
  try {
    const response = await axios.get(`${config.apiUrl}/aptitudes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de aptitudes

export async function createAptitud(idAptitud) {
  try {
    const response = await axios.post(`${config.apiUrl}/aptitudes`, {
      idAptitud,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
