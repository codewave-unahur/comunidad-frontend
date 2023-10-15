import PropTypes from "prop-types";
import { useState } from "react";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const Buscador = (props) => {
  const { handleSubmit, placeholder } = props;
  const [buscador, setBuscador] = useState("");

  const handleChange = (e) => {
    setBuscador(e.target.value);
  };

  return (
    <Paper
      component="form"
      onSubmit={(e) => handleSubmit(e, buscador)}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: "5px",
        border: "1px solid #ccc",
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
        placeholder={placeholder}
        value={buscador}
        onChange={handleChange}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={(e) => handleSubmit(e, buscador)}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

Buscador.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
};

export default Buscador;
