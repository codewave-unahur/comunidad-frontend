import axios from "axios";
import { config } from "../config/config";

// Trae todos los rubros

export async function getRubros() {
    try {
        const response = await axios.get(`${config.apiUrl}/rubros`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
