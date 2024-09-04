import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Link,
  Paper,
  Toolbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import IconUser from "./IconUser";
import logoDvt from "../../assets/logoDvt.png";
import { getOfertas } from "../../services/ofertas_service";
import PropTypes from "prop-types";
import logouni from "../../assets/logo-cpyme-uni.svg";
import logoVinculacion from "../../assets/logoVinculacion.svg";
import logoUnahur from "../../assets/logoUnahur.svg";
import { EncryptStorage } from 'encrypt-storage';



const Header = (props) => {

  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });

  const { setOfertas } = props;

  const Buscador = () => {
    const [buscador, setBuscador] = useState("");

    const handleChange = (e) => {
      setBuscador(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const traerOfertas = async () => {
        const response = await getOfertas(0, 20, buscador, "id", "Activa");
        setOfertas(response.ofertas.rows);
      };
      traerOfertas();

      window.location.href = `/?busqueda=${buscador}`;
    };

    return (
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "5px",
        }}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            fontSize: {
              xs: "0.8rem",
              sm: "1rem",
            },
            fontFamily: "Poppins, sans-serif",
          }}
          placeholder="Buscar ofertas..."
          value={buscador}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  };

  const [estaLogueado, setEstaLogueado] = useState(false);

  useEffect(() => {
    if (encryptStorage.getItem("estaLogueado")) {
      setEstaLogueado(true);
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              background: "#ffffff",
              color: "#fff",
              padding: "20px",
            }}
          >
            <Grid
              container
              item
              xs={false}
              sm={3}
              sx={{
                display: { xs: "none", sm: "block"},
                justifyContent: "flex-start",
                flexDirection: "row",
                
              }}
              
            >
              <Link href="/">
                {/*<img
                  src={logouni}
                  alt="UNAHUR-DVT"
                  style={{ width: "auto" }}
                  
                />*/}
                <img
                  src={logoUnahur}
                  alt="Universidad Nacional de Hurlingham"
                  style={{
                    width: "auto",
                    height: "85px",
                    marginRight: "4px",
                  }}
                  
                />
                <img
                  src={logoVinculacion}
                  alt="Dirección de Vinculación Tecnológica"
                  style={{
                    width: "auto",
                    height: "85px",
                    marginRight: "4px",
                  }}
                />
              </Link>
            </Grid>
            <Grid
              container
              item
              xs={8}
              sm={6}
              margin={{ xs: 1, sm: 2 }}
              justifyContent="center"
              alignItems="center"
            >
              <Buscador />
            </Grid>
            <Grid
              container
              item
              xs={4}
              sm={3}
              justifyContent="flex-end"
              alignItems="center"
            >
              {estaLogueado ? (
                <IconUser />
              ) : (
                <Button
                  variant="contained"
                  href="/login"
                  size="large"
                  
                  sx={{
                    borderRadius: "5px",
                    borderWidth: "2px",
                    backgroundColor: "#00404f",
                    color: "#ffffff",
                  }}
                >
                  Ingresá
                </Button>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

Header.propTypes = {
  setOfertas: PropTypes.func,
};

export default Header;
