import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  return (
    <Stack
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <Pagination
        count={totalPaginas}
        page={paginaActual}
        onChange={(_event, value) => cambiarPagina(value)}
        showFirstButton
        showLastButton
        size="large"
      />
    </Stack>
  );
};

Paginacion.propTypes = {
  paginaActual: PropTypes.number.isRequired,
  totalPaginas: PropTypes.number.isRequired,
  cambiarPagina: PropTypes.func.isRequired,
};

export default Paginacion;
