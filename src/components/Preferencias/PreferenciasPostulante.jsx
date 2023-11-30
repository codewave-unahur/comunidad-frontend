import { Chip, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { eliminarPreferencias } from "../../services/postulantes_service";
import { toast } from "sonner";

export function PreferenciasPostulante({ edit, preferencias }) {
  PreferenciasPostulante.propTypes = {
    edit: PropTypes.bool.isRequired,
    preferencias: PropTypes.array,
  };

  const handleDeletePreferencia = async (idPreferencia) => {
    const response = await eliminarPreferencias(idPreferencia);
    if (response) {
      toast.success("Preferencia eliminada con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al eliminar la preferencia");
    }
  };

  return (
    <Stack direction="row" spacing={2} paddingY={2}>
      {preferencias?.map((preferencia) => (
        <Chip
          key={preferencia["Preferencias del postulante"].id}
          label={preferencia["Preferencias del postulante"].nombre_preferencia}
          onDelete={edit ? () => handleDeletePreferencia(preferencia.id) : null}
        />
      ))}
    </Stack>
  );
}
