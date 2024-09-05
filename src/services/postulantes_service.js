import axios from "axios";
import { config } from "../config/config";
import { toast } from "sonner";


// Trae todos los postulantes con filtros
// NO SE SI ES ASI 🥴

export async function getPostulantes(
  pagina,
  limite,
  ordenar,
  buscarPostulante
) {
  try {
    // HACER EL GET CON EL TOKEN DEL PARAMETRO PASADO COMO HEADER BEARER 
    const response = await axios.get(
      `${config.apiUrl}/postulantes?pagina=${pagina}&limite=${limite}&ordenar=${ordenar}&buscarPostulante=${buscarPostulante}`,
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

// Trae todos los postulantes sin filtros

export async function getPostulantesSinFiltros() {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulantes/`,
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

export async function getPostulantesBaseUnahur(
  pagina,
  limite,
  ordenar,
  buscarPostulante
) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulantes/baseConstante?pagina=${pagina}&limite=${limite}&ordenar=${ordenar}&buscarPostulante=${buscarPostulante}`,
    {
      headers: {
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
    });
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

// Trae un postulante por id de usuario

export async function getPostulanteById(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/postulantes/idUsuario/${id}`,
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

// Trae un postulante por id/dni

export async function getPostulanteByDni(dni) {
  try {
    const response = await axios.get(`${config.apiUrl}/postulantes/dni/${dni}`,
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

// Put de postulante

export async function putPostulante(id, postulante, token) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/postulantes/dni/${id}?authorization=${token}`,
      postulante,
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

// Delete de postulante

export async function deletePostulante(id, token) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/dni/${id}?authorization=${token}`,
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

// Post de preferencias

export async function agregarPreferencias(id, preferencias) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulantes/preferencias/${id}`,
      {
        preferencias,
        
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

// Post de idiomas

export async function agregarIdiomas(id, idiomas) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulantes/idiomas/${id}`,
      {
        idiomas,
      
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

// Delete idioma

export async function eliminarIdioma(id) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/idiomas/${id}`,
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

// Delete preferencias

export async function eliminarPreferencias(id) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/preferencias/${id}`,
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

// Post de aptitudes

export async function agregarAptitudes(idPostulante, aptitudes) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/postulantes/aptitudes/${idPostulante}`,
      {
        aptitudes,
        
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

// Delete aptitudes

export async function eliminarAptitudes(id) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/postulantes/aptitudes/${id}`,
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
