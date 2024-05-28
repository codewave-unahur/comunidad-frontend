import axios from "axios";
import {config} from "../config/config";

// Trae todas las cadenas de valor

export async function getCadenasValor() {
    try {
        const response = await axios.get(`${config.apiUrl}/cadenasValor`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
