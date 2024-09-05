import axios from "axios";
import { config } from "../config/config";
import { toast } from "sonner";

// Trae todas las empresas con filtros

export async function getEmpresas(
  pagina,
  limite,
  ordenar,
  estado,
  nombreEmpresa
) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/empresas/?pagina=${pagina}&limite=${limite}&ordenar=${ordenar}&nombreEmpresa=${nombreEmpresa}&idEstado=${estado}`,
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

// Trae todas las empresas sin filtros

export async function getEmpresasSinFiltros(pagina, limite) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/empresas/all/?pagina=${pagina}&limite=${limite}`,
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

// Trae una empresa por id/cuit

export async function getEmpresaByCuit(id) {
  try {
    const response = await axios.get(`${config.apiUrl}/empresas/cuit/${id}`,
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

// Trae una empresa por id de usuario

export async function getEmpresaByIdUsuario(id) {
  try {
    const response = await axios.get(
      `${config.apiUrl}/empresas/idUsuario/${id}`,
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

// Post de empresa

export async function postEmpresa(empresa) {
  try {
    console.log(empresa)
    const response = await axios.post(`${config.apiUrl}/empresas`, empresa,
      {
        headers: {
          Authorization: `bearer ${sessionStorage.getItem("token")}`,
        },
      }
    )
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

// Put de empresa

export async function putEmpresa(id, empresa, token) {
  try {
    const response = await axios.patch(
      `${config.apiUrl}/empresas/cuit/${id}?authorization=${token}`,
      empresa,
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

// Delete de empresa

export async function deleteEmpresa(id, token) {
  try {
    const response = await axios.delete(
      `${config.apiUrl}/empresas/cuit/${id}?authorization=${token}`,
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

// Path de empresa
// No se que es esto. Ademas no se usa en ningún lado
