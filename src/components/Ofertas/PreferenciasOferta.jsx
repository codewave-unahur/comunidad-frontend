import { Chip, Stack } from "@mui/material";

export default function PreferenciasOferta() {
  const preferencias = [
    { key: 0, label: "JavaScript" },
    { key: 1, label: "Material UI" },
    { key: 2, label: "React" },
    { key: 3, label: "PostgreSQL" },
    { key: 4, label: "NodeJS" },
  ];

  return (
    <Stack direction="row" spacing={2} paddingY={2}>
      {preferencias.map((preferencia) => (
        <Chip key={preferencia.key} label={preferencia.label} />
      ))}
    </Stack>
  );
}
