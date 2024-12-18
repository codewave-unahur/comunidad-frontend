import { Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function Articulos() {

  return (
    <>
        <Card type="section" elevation={8}>
            <CardHeader title="Articulos" />
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Publicado por</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">Articulo 1</TableCell>
                            <TableCell align="center">01/01/2021</TableCell>
                            <TableCell align="center">Admin</TableCell>
                            <TableCell align="center">Publicado</TableCell>
                            <TableCell align="center">
                                <Button variant="contained" color="success" sx={{
                                    margin: "0.5rem"
                                }}>Ver</Button>
                                <Button variant="contained" color="warning" sx={{
                                    margin: "0.5rem"
                                }}>Editar</Button>
                                <Button variant="outlined" color="error" sx={{
                                    margin: "0.5rem"
                                }}>Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>

    </>
  )
}
