import { Box, Button, Card, CardHeader } from '@mui/material'
import React, { useEffect } from 'react'
import { uploadImage } from '../../../services/galeria_service'
import { useState } from 'react'
import { getGaleria } from '../../../services/galeria_service'

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
        console.log("Imagen subida correctamente")
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
            <img key={index} src={image.imageUrl} alt="imagen" style={{ width: "100px", height: "100px" }} />
          ))}
        </Box>

        

        
      </Card>

    </>
  )
}
