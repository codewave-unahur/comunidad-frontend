import axios from "axios";
import { config } from "../config/config";

export async function updateLogo(logo, id) {
    const formData = new FormData();
    formData.append("uploadLogo", logo);

    const pedido = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${config.apiUrl}/files/logo`,
        headers: { 
            //no se como pasar este token al env pero bueno, va en el env
          'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqanJ4aGNlcmpqdGhqZ2xxcHRwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzUyNjQ2NywiZXhwIjoyMDA5MTAyNDY3fQ.aJ54McCK2fK2Oac-hmGkXWfXZHYy5AiQ4GC_-W5ze8Y', 
          'id': id
        },
        data : formData
      }

  try {
    const response = await axios.request(pedido);
    return response.data;
  }
    catch (error) {
        console.log(error);
    }
}