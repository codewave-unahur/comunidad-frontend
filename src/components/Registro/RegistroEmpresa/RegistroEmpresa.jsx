import DatosEmpresa from "./DatosEmpresa.jsx";
import Registro from "../Registro.jsx";

const steps = ["???", "Datos de la empresa"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <h1>??</h1>;
    case 1:
      return <DatosEmpresa />;
    default:
      throw new Error("Paso desconocido");
  }
}

export default function RegistroPostulante() {
  return <Registro steps={steps} getStepContent={getStepContent} />;
}
