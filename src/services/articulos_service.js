import axios from 'axios';
import { config } from '../config/config';
 
export async function postArticulo(datosArticulo) {
    try {
      const respuesta = await axios.post(
        `${config.apiUrl}/articulo/crear-articulo`,
        datosArticulo,
        {
          headers: {
            'Content-Type': 'application/json', // Opcional, Axios lo hace por defecto
          },
        }
      );
      console.log('Artículo creado:', respuesta.data);
      return respuesta.data;
    } catch (error) {
      console.error('Error al crear el artículo:', error.response?.data || error.message);
      throw error; // Puedes manejar el error en el componente
    }
  };
  

export async function getArticulos() {
    try {
        const response = await axios.get(`${config.apiUrl}/articulo/obtener-articulos`);
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


