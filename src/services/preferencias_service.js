import axios from "axios";
import { config } from "../config/config";

// Traer todas las preferencias

export async function getPreferencias() {
  try {
    const response = await axios.get(`${config.apiUrl}/preferencias`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
