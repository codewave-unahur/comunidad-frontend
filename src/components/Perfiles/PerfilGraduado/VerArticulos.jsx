import { Box, Button, Card, CardHeader, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useState, useEffect } from 'react'
import { getArticulos } from '../../../services/articulos_service'
import { useNavigate } from 'react-router-dom'

export default function VerArticulos() {
    const [articulos, setArticulos] = useState([])
    const [page, setPage] = useState(1);
    const itemsPerPage = 4; // Número de noticias por página

    const navigate = useNavigate()
    const handleChange = (event, value) => {
        setPage(value);
    };

    // Calcular las noticias a mostrar en la página actual
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const articulosPaginados = articulos.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const response = await getArticulos()
                setArticulos(response.articulos)
            } catch (error) {
                console.error(error)
            }
        }
        fetchArticulos()
    }
    , [])

  return (
        <>
        <Box>
           
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
                                    <TableCell align="center">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {articulosPaginados.map((articulo) => (
                                <TableRow>
                                    <TableCell align="center">{articulo.id}</TableCell>
                                    <TableCell align="center">{articulo.titulo}</TableCell>
                                    <TableCell align="center">{new Date(articulo.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">{articulo.autor}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" href={`/articulo/${articulo.id}`} color="success" sx={{
                                            margin: "0.5rem"
                                        }}>Ver</Button>
                                        <Button variant="contained" color="warning" sx={{
                                            margin: "0.5rem"
                                        }}>Editar</Button>
                                    </TableCell>
                                </TableRow>
                                 ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
           
            <Pagination
                      count={Math.ceil(articulos.length / itemsPerPage)} // Número total de páginas
                      page={page}
                      onChange={handleChange}
                      
                    />
            </Box>
        </>
  )
}
