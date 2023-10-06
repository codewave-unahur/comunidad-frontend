import DatosPersonales from "./DatosPersonales";
import DatosAcademicos from "./DatosAcademicos.jsx";
import Registro from "../Registro";

const steps = ["Datos personales", "Datos académicos"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DatosPersonales />;
    case 1:
      return <DatosAcademicos />;
    default:
      throw new Error("Paso desconocido");
  }
}

export default function RegistroPostulante() {
  return (
    <>
      {/* <Header /> */}
      <Registro steps={steps} getStepContent={getStepContent} />;
    </>
  );
}
