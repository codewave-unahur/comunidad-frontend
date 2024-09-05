import axios from "axios";
import { config } from "../config/config";
import { toast } from 'sonner'



export async function uploadImage(galeria, links="undefined", id) {
    const formData = new FormData();
    formData.append("galeria", galeria);
    formData.append("links", links);
  
    const pedido = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${config.apiUrl}/galeria/`,
      headers: {
        //no se como pasar este token al env pero bueno, va en el env
        Authorization:
          `bearer ${sessionStorage.getItem("token")}`,	
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

  export async function getGaleria(){
    try{
        const response = await axios.get(`${config.apiUrl}/galeria/`,
        {
          headers: {
            Authorization: `bearer ${sessionStorage.getItem("token")}`,
          },
        });
        return response.data;
       } catch(error){
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

  export async function deleteGaleria(id){
    try{
        const response = await axios.delete(`${config.apiUrl}/galeria/${id}`,
          {
            headers: {
              Authorization: `bearer ${sessionStorage.getItem("token")}`,
          }
        }
        )
        return response.data
    } catch(error){
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

  export async function putGaleria(id, links){
    try{
        const response = await axios.put(`${config.apiUrl}/galeria/${id}`,
          
          {links: links},
          {
            headers: {
              Authorization: `bearer ${sessionStorage.getItem("token")}`,
          }
          }
        )
        return response.data
    } catch(error){
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

 
    