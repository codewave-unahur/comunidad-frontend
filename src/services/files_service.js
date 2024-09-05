import axios from "axios";
import { config } from "../config/config";
import { toast } from "sonner";


export async function uploadLogo(logo, id) {
  const formData = new FormData();
  formData.append("img", logo);

  const pedido = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${config.apiUrl}/files/logo`,
    headers: {
      //no se como pasar este token al env pero bueno, va en el env
      Authorization: `bearer ${sessionStorage.getItem("token")}`,
      id: id,
    },
    data: formData,
  };

  try {
    const response = await axios.request(pedido);
    return response.data;
  } catch (error) {
    console.log(error);
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

export async function uploadFoto(foto, id, token) {
  const formData = new FormData();
  formData.append("img", foto);

  const pedido = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${config.apiUrl}/files/foto/?authorization=${token}`,
    headers: {
      Authorization: `bearer ${sessionStorage.getItem("token")}`,
      id: id,
    },
    data: formData,
  };

  try {
    const response = await axios.request(pedido);
    return response.data;
  } catch (error) {
    console.log(error);
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

export async function uploadCV(cv, id, token) {
  const formData = new FormData();
  formData.append("cv", cv);

  const pedido = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${config.apiUrl}/files/cv/?authorization=${token}`,
    headers: {
      Authorization: `bearer ${sessionStorage.getItem("token")}`,
      id: id
    },
    data: formData,
  };

  try {
    const response = await axios.request(pedido);
    return response.data;
  } catch (error) {
    console.log(error);
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

export async function uploadCUD(cud, id, token) {
  const formData = new FormData();
  formData.append("uploadCUD", cud);

  const pedido = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${config.apiUrl}/files/cud/?authorization=${token}`,
    headers: {
      Authorization:
        `bearer ${sessionStorage.getItem("token")}`,
      id: id,
      },
      data: formData,
    };

    try{
      const response = await axios.request(pedido);
      return response.data;
    } catch (error) {
      console.log(error);
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