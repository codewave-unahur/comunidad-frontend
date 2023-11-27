import axios from "axios";
import { config } from "../config/config";

// Trae todas las carreras

export async function getAptitudes() {
  try {
    const response = await axios.get(`${config.apiUrl}/aptitudes`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}