import { Chip, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { eliminarAptitudes } from "../../services/postulantes_service";
import { toast } from "sonner";

export function AptitudesPostulante({ edit, aptitudes }) {
  AptitudesPostulante.propTypes = {
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
