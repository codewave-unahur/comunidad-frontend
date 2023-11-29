import { Chip, Stack } from "@mui/material";
import PropTypes from "prop-types";
import {
  eliminarAptitudes,
  eliminarPreferencias,
} from "../../services/postulantes_service";
import { toast } from "sonner";

export function AptitudesOferta({ edit, aptitudes }) {
  AptitudesOferta.propTypes = {
    edit: PropTypes.bool.isRequired,
    aptitudes: PropTypes.array,
  };

  const handleDeleteAptitud = async (idAptitud) => {
    const response = await eliminarAptitudes(idAptitud);
    if (response) {
      toast.success("Aptitud eliminada con éxito");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      toast.error("Error al eliminar la aptitud");
    }
  };

  return (
    <Stack direction="row" spacing={2} paddingY={2}>
      {aptitudes?.map((aptitud) => (
        <Chip
          key={aptitud["Aptitudes del postulante"].id}
          label={aptitud["Aptitudes del postulante"].nombre_aptitud}
          onDelete={edit ? () => handleDeleteAptitud(aptitud.id) : null}
        />
      ))}
    </Stack>
  );
}

export function PreferenciasOferta({ edit, preferencias }) {
  PreferenciasOferta.propTypes = {
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
