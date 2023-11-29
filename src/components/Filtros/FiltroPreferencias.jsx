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
import { getPreferencias } from "../../services/preferencias_service";


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

export default function FiltroPreferencias( { postulantes, setPostulantes, traerPostulantes, preferencia, setPreferencia, aptitud }) {
  const [preferenciasDB, setPreferenciasDB] = useState([])

  useEffect(() => {
    const obtenerPreferencias = async () => {
      const response = await getPreferencias();
      const pref = response.preferencias.map((preferencia) => preferencia.nombre_preferencia)
      setPreferenciasDB(pref);
    };
    obtenerPreferencias();
  }, []);

  let post = postulantes


  function filterPostulantesByPreferencias(postulantes, preferencias) {
    const postulantesTotales = JSON.parse(sessionStorage.getItem("postulantesTotales"))
    return postulantesTotales.filter((postulante) => {
      const preferenciasPostulante = postulante.Preferencias.map((preferencia) => preferencia['Preferencias del postulante'].nombre_preferencia)
      const aptitudesPostulante = postulante.Aptitudes.map((aptitud) => aptitud['Aptitudes del postulante'].nombre_aptitud)
      const valorDeVerdadPreferencias = preferencias.some((pref) => preferenciasPostulante.includes(pref)) 
      const valorDeVerdadAptitudes = aptitud.some((apt) => aptitudesPostulante.includes(apt))
      return valorDeVerdadAptitudes || valorDeVerdadPreferencias
    }
  )}

  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPreferencia(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (value.length === 0 && aptitud.length === 0) {
      traerPostulantes()
      return
    } else {
      setPostulantes(filterPostulantesByPreferencias(post, value))
    }
    console.log(postulantes)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">
          Filtrar por preferencias
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={preferencia}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Filtrar por preferencias"
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
          {preferenciasDB.map((preferencia) => (
            <MenuItem key={preferencia} value={preferencia}>
              {preferencia}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
