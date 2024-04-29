import axios from "axios";
import { config } from "../config/config";

// Trae todos los postulantes con filtros
// NO SE SI ES ASI 🥴

export async function getPostulantes(
  pagina,
  limite,
  ordenar,
  buscarPostulante
) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulantes/?pagina=${pagina}&limite=${limite}&ordenar=${ordenar}&buscarPostulante=${buscarPostulante}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPostulantesBaseUnahur(
  pagina,
  limite,
  ordenar,
  buscarPostulante
) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulantes/baseConstante?pagina=${pagina}&limite=${limite}&ordenar=${ordenar}&buscarPostulante=${buscarPostulante}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae un postulante por id de usuario

export async function getPostulanteById(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulantes/idUsuario/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Trae un postulante por id/dni

export async function getPostulanteByDni(dni) {
  try {
    const response = await axios.get(`${config.apiUrl}/postulantes/dni/${dni}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de postulante

export async function postPostulante(postulante) {
  try {
    console.log(postulante);
    const response = await axios.post(
      `${config.apiUrl}/postulantes`,
      postulante
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Put de postulante

export async function putPostulante(id, postulante, token) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulantes/dni/${id}?authorization=${token}`,
      postulante
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Delete de postulante

export async function deletePostulante(id, token) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/dni/${id}?authorization=${token}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de preferencias

export async function agregarPreferencias(id, preferencias) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulantes/preferencias/${id}`,
      {
        preferencias,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de idiomas

export async function agregarIdiomas(id, idiomas) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulantes/idiomas/${id}`,
      {
        idiomas,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Delete idioma

export async function eliminarIdioma(id) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/idiomas/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Delete preferencias

export async function eliminarPreferencias(id) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/preferencias/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de aptitudes

export async function agregarAptitudes(idPostulante, aptitudes) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulantes/aptitudes/${idPostulante}`,
      {
        aptitudes,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Delete aptitudes

export async function eliminarAptitudes(id) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/aptitudes/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
