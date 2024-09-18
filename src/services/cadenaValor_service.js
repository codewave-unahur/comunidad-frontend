import axios from "axios";
import {config} from "../config/config";

export async function getCadenaValor() {
    try {
        const response = await axios.get(`${config.apiUrl}/cadenaValor`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
