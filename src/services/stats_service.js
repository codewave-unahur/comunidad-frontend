import axios from "axios";
import { config } from "../config/config";


export async function getStats() {
    try {
        const response = await axios.get(`${config.apiUrl}/stats`, {
            headers: {
                Authorization: `bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
        if (error.response.status === 401) {
            sessionStorage.clear();
            toast.error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
            setTimeout(() => {
                window.location.href = "/login";
            }, 5000);
        }
    }
}

