import DatosEmpresa from "./DatosEmpresa.jsx";
import Registro from "../Registro.jsx";

import { toast } from "sonner";

import * as yup from "yup";
import { useState } from "react";

import { postEmpresa } from "../../../services/empresas_service.js";

export default function RegistroPostulante() {
  const steps = ["Datos de la empresa"];
  const idUsuario = parseInt(window.location.pathname.split("/")[3]);

  const [usuario, setUsuario] = useState({
    cuit: null,
    idUsuario: idUsuario,
    idRubro: null,
    idCadenaValor: null,
    nombreEmpresa: "",
    descripcion: "",
    pais: "",
    provincia: null,
    ciudad: null,
    calle: "",
    nro: null,
    piso: null,
    depto: "",
    cp: "",
    telefono: null,
    web: "",
    rol_representante: "",
    nombreRepresentante: "",
    emailRepresentante: "",
  });

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores de validación

  const schema = yup.object().shape({
    cuit: yup
      .number()
      .typeError("El CUIT debe ser un número")
      .required("Campo requerido")
      .positive("El CUIT debe ser un número positivo"),
    nombreEmpresa: yup.string().required("Campo requerido"),
    descripcion: yup.string().required("Campo requerido"),
    pais: yup.string().required("Campo requerido"),
    idRubro: yup.number().required("Campo requerido"),
    idCadenaValor: yup.number().required("Campo requerido"),
    provincia: yup.number().required("Campo requerido"),
    ciudad: yup.number().required("Campo requerido"),
    calle: yup.string().required("Campo requerido"),
    nro: yup.number().required("Campo requerido"),
    piso: yup.number().nullable(),
    depto: yup.string().nullable(),
    cp: yup
      .number()
      .typeError("El código postal debe ser un número")
      .required("Campo requerido")
      .integer("El código postal debe ser un número entero")
      .positive("El código postal debe ser un número positivo")
      .max(9999, "El código postal debe tener 4 dígitos"),
    telefono: yup
      .number()
      .typeError("El teléfono debe ser un número")
      .required("Campo requerido")
      .positive("El teléfono debe ser un número positivo")
      .max(999999999999999, "El teléfono debe tener como máximo 15 dígitos"),
    web: yup.string().required("Campo requerido"),
    rol_representante: yup.string().required("Campo requerido"),
    nombreRepresentante: yup.string().required("Campo requerido"),
    emailRepresentante: yup
      .string()
      .email("Debe ser un email válido")
      .required("Campo requerido"),
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DatosEmpresa
            empresa={usuario}
            setEmpresa={setUsuario}
            schema={schema}
            validarErrores={validarErrores}
            setValidarErrores={setValidarErrores}
          />
        );
      default:
        throw new Error("Paso desconocido");
    }
  };

  const handleFinish = async () => {
    try {
      schema.validateSync(usuario, { abortEarly: false });

      const response = await postEmpresa(usuario);

      console.log(usuario)
      if (response) {
        toast.success("Empresa registrada con éxito");
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      } else {
        console.log(usuario)
        toast.error("Error al registrar la empresa");
        

      }
    } catch (error) {
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setValidarErrores(errors);
      console.log("Error: ", error);
      toast.error("Error al registrar la empresa");
    }
  };

  return (
    <Registro
      steps={steps}
      getStepContent={getStepContent}
      handleFinish={handleFinish}
      usuario={usuario}
      schema={schema}
      setValidarErrores={setValidarErrores}
    />
  );
}
