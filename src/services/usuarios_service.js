// import { API_URL } from "../utils/constants";
import axios from "axios";
import { config } from "../config/config";

// Trae todos los usuarios
export async function getUsuarios() {
  try {
    const response = await axios.get(`${config.apiUrl}/usuarios`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Put de usuario
export async function putUsuario(id) {
  try {
    const response = await axios.put(`${config.apiUrl}/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Sign in de usuario
export async function signIn(usuario) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/usuarios/signin`,
      usuario
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Sign up de usuario
export async function signUp(usuario) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/usuarios/signup`,
      usuario
    )
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function cambiarPassword(passwordActual, passwordNueva) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/usuarios/cambiar-password`,
      { 
        passwordActual,
        passwordNueva
      },
      { headers: { Authorization: `bearer ${sessionStorage.getItem("token")}` } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function aceptarTerminos(id) {
  try {
    const response = await axios.put(
      `${config.apiUrl}/usuarios/${id}/aceptar-terminos`,
      {},
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

