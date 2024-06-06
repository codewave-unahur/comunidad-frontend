import { Box, Button, Card, CardHeader } from '@mui/material'
import React, { useEffect } from 'react'
import { uploadImage } from '../../../services/galeria_service'
import { useState } from 'react'
import { getGaleria } from '../../../services/galeria_service'
import { deleteGaleria } from '../../../services/galeria_service'
import { toast } from 'sonner'

export default function Galeria() {

  const [galeria, setGaleria] = useState([])



  useEffect(() => {
    const fetchGaleria = async () => {
      const response = await getGaleria()
      if (response) {
        setGaleria(response.carouselImages)
      }
    }
    fetchGaleria()
  }, []) 

  

  const handleUploadImage = async (image) => {
    try {
      const response = await uploadImage(image)
      if (response) {
        toast.success("Imagen subida correctamente")
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleDeleteImage = async (id) => {
    try {
      const response = await deleteGaleria(id)
      if (response) {
        toast.success("Imagen eliminada correctamente")
        setGaleria(galeria.filter(image => image.id !== id))
      }
    }
    catch (error) {
      console.log(error)
    }
  }



    

  return (
    <>
      <Card type="section" elevation={8}>
        <CardHeader title="Galería" />
        <Box>
          {galeria.map((image, index) => ( 
            <Box key={index}>
              <img src={image.imageUrl} alt="imagen" style={{width: '100px'}} />
              <Button onClick={() => handleDeleteImage(image.id)}>Eliminar</Button>
            </Box>

          ))}
        </Box>

        

        
      </Card>

    </>
  )
}
