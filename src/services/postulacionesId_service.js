import axios from "axios";
import { config } from "../config/config";

// Trae todas las postulaciones por id de la oferta

export async function getPostulacionesPorIdOferta(pagina, limite, id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulaciones/oferta/${id}/?pagina=${pagina}&limite=${limite}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todas las postulaciones por id de la oferta

export async function getPostulacionesPorIdOfertaTodas(pagina, limite, id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulaciones/ofertatodas/${id}/?pagina=${pagina}&limite=${limite}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Activa una postulación a una oferta

export async function activarPostulacion(id) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulaciones/activar/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Desactiva una postulación a una oferta

export async function desactivarPostulacion(id) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulaciones/desactivar/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Marca como contactado a un postulante

export async function marcarContactado(id) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulaciones/contactado/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Marca como no contactado a un postulante

export async function marcarNoContactado(id) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulaciones/noContactado/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae todas las postulaciones por id del postulante

export async function getPostulacionesPorIdPostulante(
  pagina,
  limite,
  id,
  nombreDeOferta
) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulaciones/postulante/${id}/?pagina=${pagina}&limite=${limite}&nombreDeOferta=${nombreDeOferta}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
