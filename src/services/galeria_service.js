import axios from "axios";
import { config } from "../config/config";



export async function uploadImage(galeria, id) {
    const formData = new FormData();
    formData.append("galeria", galeria);
  
    const pedido = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${config.apiUrl}/galeria/`,
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

  export async function getGaleria(){
    try{
        const response = await axios.get(`${config.apiUrl}/galeria/`)
        return response.data
    } catch(error){
        console.error(error)
    }
  }

  export async function deleteGaleria(id){
    try{
        const response = await axios.delete(`${config.apiUrl}/galeria/${id}`)
        return response.data
    } catch(error){
        console.error(error)
    }
  }


    