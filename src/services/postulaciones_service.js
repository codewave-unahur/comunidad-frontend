import axios from "axios";
import { config } from "../config/config";
import { toast } from "sonner";


// Trae todas las postulaciones

export async function getPostulaciones() {
  try {
    const response = await axios.get(`${config.apiUrl}/postulaciones/`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
      setTimeout(() => {
        sessionStorage.clear();
      }, 3000);
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  }
}

// Trae una postulación por id

export async function getPostulacionById(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/postulaciones/${id}`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
      setTimeout(() => {
        sessionStorage.clear();
      }, 3000);
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  }
}

// Post de postulación

export async function postPostulacion(postulacion, token) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulaciones/?authorization=${token}`,
      postulacion,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
      setTimeout(() => {
        sessionStorage.clear();
      }, 3000);
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  }
}

// Put de postulación

export async function putPostulacion(idPostulacion, postulacion, token) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulaciones/${idPostulacion}?authorization=${token}`,
      postulacion,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
      setTimeout(() => {
        sessionStorage.clear();
      }, 3000);
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  }
}

export async function putCvVisto(id) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulaciones/cv-visto/${id}`,
      {}, // Cuerpo de la solicitud, que puede ser un objeto vacío si no hay datos que enviar
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
  catch (error) {
    console.error(error);
  }
}


// Delete de postulación

export async function deletePostulacion(idPostulacion, token) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulaciones/${idPostulacion}?authorization=${token}`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
      setTimeout(() => {
        sessionStorage.clear();
      }, 3000);
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  }
}

// POST postularse base UNAHUR

export async function postularseBaseConstante(idUsuario) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulaciones/baseconstante/${idUsuario}`,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response.status === 401) {
      toast.error("Su sesión ha expirado, por favor vuelva a iniciar sesión");
      setTimeout(() => {
        sessionStorage.clear();
      }, 3000);
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
  }
}
