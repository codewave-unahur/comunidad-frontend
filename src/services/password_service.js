import axios from "axios";
import { config } from "../config/config";

// Post de solicitud de reseteo de contraseña

export async function postResetPasswordRequest(mail) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/password/auth/requestResetPassword`,
      {
        usuario: mail,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error, "aaaaaaaa");
  }
}

// Post de reseteo de contraseña

export async function postResetPassword(userId, token, password) {
  try {
    const response = await axios.post(
      `${config.apiUrl}/password/auth/resetPassword`,
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
