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

const aptitudes = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Node",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Sequelize",
  "Redux",
  "Material UI",
  "Bootstrap",
  "Git",
  "GitHub",
  "SCRUM",
  "Metodologías ágiles",
  "Trello",
];

export default function FiltroAptitudes() {
  const [aptitud, setAptitud] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAptitud(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
          {aptitudes.map((aptitud) => (
            <MenuItem key={aptitud} value={aptitud}>
              {aptitud}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
