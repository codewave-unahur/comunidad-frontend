import axios from "axios";
import { config } from "../config/config";

// Trae todos los rubros de ofertas

export async function getRubrosOfertas() {
    try {
        const response = await axios.get(`${config.apiUrl}/rubrosOfertas`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}