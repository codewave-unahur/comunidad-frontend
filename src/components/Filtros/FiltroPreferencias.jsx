import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import { useState } from "react";

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

const preferencias = [
  "Trabajo remoto",
  "Trabajo presencial",
  "Full time",
  "Part time",
  "Junior",
  "Semi-senior",
  "Senior",
];

export default function FiltroPreferencias() {
  const [preferencia, setPreferencia] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPreferencia(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-multiple-chip-label">
          Filtrar por referencias
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
              label="Filtrar por referencias"
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
          {preferencias.map((preferencia) => (
            <MenuItem key={preferencia} value={preferencia}>
              {preferencia}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
