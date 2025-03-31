import axios from 'axios';
import { config } from '../config/config';

export async function postArticulo(data) {
  try {
    const response = await axios.post(`${config.apiUrl}/articulos`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticulos() {
    try {
        const response = await axios.get(`${config.apiUrl}/articulos`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getArticulo(id) {
    try {
        const response = await axios.get(`${config.apiUrl}/articulos/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteArticulo(id) {
    try {
        const response = await axios.delete(`${config.apiUrl}/articulos/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


