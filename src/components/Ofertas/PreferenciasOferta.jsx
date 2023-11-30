import { Chip, Stack } from "@mui/material";
import PropTypes from "prop-types";
import {
  eliminarAptitudes,
  eliminarPreferencias,
} from "../../services/postulantes_service";
import { toast } from "sonner";

export function AptitudesOferta({ aptitudes }) {
  console.log(aptitudes);
  AptitudesOferta.propTypes = {
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
          key={aptitud.id}
          label={aptitud.nombre_aptitud}
          onDelete={() => handleDeleteAptitud(aptitud.id)}
        />
      ))}
    </Stack>
  );
}

export function PreferenciasOferta({ preferencias }) {
  console.log(preferencias);
  PreferenciasOferta.propTypes = {
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
          key={preferencia.id}
          label={preferencia.nombre_preferencia}
          onDelete={() => handleDeletePreferencia(preferencia.id)}
        />
      ))}
    </Stack>
  );
}
