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

import { getOfertas } from "../../services/ofertas_service";
import PropTypes from "prop-types";

const Header = (props) => {
  const { setOfertas } = props;

  const Buscador = () => {
    const [buscador, setBuscador] = useState("");

    const handleChange = (e) => {
      setBuscador(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const traerOfertas = async () => {
        const response = await getOfertas(0, 20, buscador, "id", 1);
        setOfertas(response.ofertas.rows);
      };
      traerOfertas();

      if (window.location.pathname !== "/") {
        window.location.href = `/?busqueda=${buscador}`;
      }
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
            fontWeight: "bold",
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
    if (sessionStorage.getItem("estaLogueado") === "true") {
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
              background: "linear-gradient(90deg, #34d399, #5fa92c)",
              color: "#fff",
              padding: "10px",
            }}
          >
            <Grid
              container
              item
              xs={false}
              sm={3}
              display={{ xs: "none", sm: "block" }}
              justifyContent="flex-start"
              alignItems="center"
              alignContent="center"
            >
              <Link href="/">
                <img
                  src="https://cdn.discordapp.com/attachments/956988369693454466/989600731369709669/Logoblanco.png"
                  alt="logo"
                  style={{
                    height: "60px",
                    width: "auto",
                    padding: "5px",
                    marginTop: "5px",
                    alignContent: "center",
                  }}
                />
              </Link>
            </Grid>
            <Grid
              container
              item
              xs={8}
              sm={6}
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
                  variant="outlined"
                  color="inherit"
                  href="/login"
                  size="large"
                  sx={{
                    borderRadius: "5px",
                    borderWidth: "2px",
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
