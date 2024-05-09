import axios from "axios";
import { config } from "../config/config";

export async function uploadLogo(logo, id) {
  const formData = new FormData();
  formData.append("img", logo);

  const pedido = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${config.apiUrl}/files/logo`,
    headers: {
      //no se como pasar este token al env pero bueno, va en el env
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqanJ4aGNlcmpqdGhqZ2xxcHRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUyNjQ2NywiZXhwIjoyMDA5MTAyNDY3fQ.aJ54McCK2fK2Oac-hmGkXWfXZHYy5AiQ4GC_-W5ze8Y",
      id: id,
    },
    data: formData,
  };

  try {
    const response = await axios.request(pedido);
    return response.data;
  } catch (error) {
    console.log(error);
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
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqanJ4aGNlcmpqdGhqZ2xxcHRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUyNjQ2NywiZXhwIjoyMDA5MTAyNDY3fQ.aJ54McCK2fK2Oac-hmGkXWfXZHYy5AiQ4GC_-W5ze8Y",
      id: id,
    },
    data: formData,
  };

  try {
    const response = await axios.request(pedido);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadCV(cv, id, token) {
  const formData = new FormData();
  formData.append("img", cv);

  const pedido = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${config.apiUrl}/files/cv/?authorization=${token}`,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqanJ4aGNlcmpqdGhqZ2xxcHRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUyNjQ2NywiZXhwIjoyMDA5MTAyNDY3fQ.aJ54McCK2fK2Oac-hmGkXWfXZHYy5AiQ4GC_-W5ze8Y",
      id: id,
    },
    data: formData,
  };

  try {
    const response = await axios.request(pedido);
    return response.data;
  } catch (error) {
    console.log(error);
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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqanJ4aGNlcmpqdGhqZ2xxcHRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUyNjQ2NywiZXhwIjoyMDA5MTAyNDY3fQ.aJ54McCK2fK2Oac-hmGkXWfXZHYy5AiQ4GC_-W5ze8Y",
      id: id,
      },
      data: formData,
    };

    try{
      const response = await axios.request(pedido);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }