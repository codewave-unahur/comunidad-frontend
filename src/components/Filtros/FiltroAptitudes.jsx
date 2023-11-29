import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import { useEffect, useState } from "react";
import { getAptitudes } from "../../services/aptitudes_service";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function FiltroAptitudes( { postulantes, setPostulantes, traerPostulantes, aptitud, setAptitud, preferencia } ) {
  const [aptitudesDB, setAptitudesDB] = useState([])

  useEffect(() => {
    const obtenerAptitudes = async () => {
      const response = await getAptitudes();
      const apt = response.aptitudes.map((aptitud) => aptitud.nombre_aptitud)
      setAptitudesDB(apt);
    };
    obtenerAptitudes();
  }, []);
  
  let post = postulantes

  function filterPostulantesByAptitudes(postulantes, aptitudes) {
    const postulantesTotales = JSON.parse(sessionStorage.getItem("postulantesTotales"))
    return postulantesTotales.filter((postulante) => {
      const preferenciasPostulante = postulante.Preferencias.map((preferencia) => preferencia['Preferencias del postulante'].nombre_preferencia)
      const aptitudesPostulante = postulante.Aptitudes.map((aptitud) => aptitud['Aptitudes del postulante'].nombre_aptitud)
      const valorDeVerdadPreferencias = preferencia.some((pref) => preferenciasPostulante.includes(pref)) 
      const valorDeVerdadAptitudes = aptitudes.some((apt) => aptitudesPostulante.includes(apt))
      return valorDeVerdadAptitudes || valorDeVerdadPreferencias
    }
    )}

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAptitud(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (value.length === 0 && preferencia.length === 0) {
      traerPostulantes()
      return
    } else {
      setPostulantes(filterPostulantesByAptitudes(post, value))
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">
          Filtrar por aptitudes
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={aptitud}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Filtrar por aptitudes"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {aptitudesDB.map((aptitud) => (
            <MenuItem key={aptitud} value={aptitud}>
              {aptitud}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
