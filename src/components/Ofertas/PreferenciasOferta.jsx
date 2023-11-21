import { Chip, Stack } from "@mui/material";

export function AptitudesOferta() {
  const aptitudes = [
    { key: 0, label: "JavaScript" },
    // { key: 1, label: "Material UI" },
    { key: 2, label: "React" },
    // { key: 3, label: "PostgreSQL" },
    // { key: 4, label: "NodeJS" },
  ];

  return (
    <Stack direction="row" spacing={2} paddingY={2}>
      {aptitudes.map((aptitud) => (
        <Chip key={aptitud.key} label={aptitud.label} />
      ))}
    </Stack>
  );
}

export function PreferenciasOferta() {
  const preferencias = [
    { key: 0, label: "Analista funcional" },
    { key: 1, label: "Desarrollador web" },
    // { key: 2, label: "Diseño gráfico" },
    // { key: 3, label: "Kinesiología" },
    // { key: 4, label: "Diseño industrial" },
  ];

  return (
    <Stack direction="row" spacing={2} paddingY={2}>
      {preferencias.map((preferencia) => (
        <Chip key={preferencia.key} label={preferencia.label} />
      ))}
    </Stack>
  );
}
