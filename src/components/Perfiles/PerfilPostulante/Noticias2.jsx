import { Card, Box, Grid, CardHeader } from '@mui/material'
import React from 'react'
import {useState, useEffect} from 'react'

export default function Noticias() {

  const [articulos, setArticulos] = useState([])
  
  return (
    <>
        <Card type="section" elevation={8}>

            <CardHeader title="Noticias" />
            <Box sx={{ padding: "1rem" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ padding: "1rem", marginBottom: "1rem" }}>
                            <h3>Título de la noticia</h3>
                            <p>Descripción breve de la noticia.</p>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ padding: "1rem", marginBottom: "1rem" }}>
                            <h3>Título de la noticia</h3>
                            <p>Descripción breve de la noticia.</p>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    </>
  )
}
