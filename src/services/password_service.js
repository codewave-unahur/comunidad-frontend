import axios from "axios";
import { config } from "../config/config";

// Post de solicitud de reseteo de contraseña

export async function postResetPasswordRequest(mail) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/reset-password`,
      {
        usuario: mail,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Post de reseteo de contraseña

export async function postResetPassword(userId, token, password) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/reset-password/${token}`,
      {
        userId,
        token,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
