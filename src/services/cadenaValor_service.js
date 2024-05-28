import axios from "axios";
import {config} from "../config/config";

// Trae todas las cadenas de valor

export async function getCadenaValor() {
    try {
        const response = await axios.get(`${config.apiUrl}/cadenaValor`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
