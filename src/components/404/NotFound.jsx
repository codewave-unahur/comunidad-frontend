import Header from "../Header/Header";
import { Box, Typography } from "@mui/material";
import error404 from "../../assets/404.svg";
import logoDvt from "../../assets/logoDvt.png";


const NotFound = () => {

    const invitado = sessionStorage.getItem('invitado');

    return (
        <>
            {
                invitado ? (
                    <Header />
                ) : (
                    <></>
                )
            }
            <Box
                sx={{
                    display: "block",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    
                    
                }}
            >
                
                <img src={error404} alt="error404"
                    style={{
                        // configurar tamaño de la imagen para celulares y escritorio
                        width: "40%",
                        height: "auto",
                        margin: "auto",
                    }}

                />
            </Box>

        </>
    );
}

export default NotFound;