import DatosPersonales from "./DatosPersonales";
import DatosAcademicos from "./DatosAcademicos.jsx";
import Registro from "../Registro";

import { toast } from "sonner";

import * as yup from "yup";

import { postPostulante } from "../../../services/postulantes_service.js";
import { useState } from "react";

export default function RegistroPostulante() {
  const steps = ["Datos personales", "Datos académicos"];
  const idUsuario = parseInt(window.location.pathname.split("/")[3]);

  const [postulante, setPostulante] = useState({
    documento: null,
    tipoDocumento: "",
    idUsuario: idUsuario,
    estudios: null,
    carrera: null,
    estado: "",
    nombre: "",
    apellido: "",
    nacionalidad: "",
    fecha_nac: null,
    pais: "",
    provincia: null,
    ciudad: null,
    calle: "",
    nro: null,
    piso: null,
    depto: "",
    cp: "",
    telefono: null,
    cantMaterias: null,
    alumnoUnahur: false,
    presentacion: "",
    cv: "",
    foto: "",
  });

  const [validarErrores, setValidarErrores] = useState({}); // Para controlar los errores de validación

  const schema = yup.object().shape({
    nombre: yup.string().required("Campo requerido"),
    apellido: yup.string().required("Campo requerido"),
    fecha_nac: yup.date().required("Campo requerido"),
    tipoDocumento: yup.string().required("Campo requerido"),
    documento: yup.number().required("Campo requerido"),
    nacionalidad: yup.string().required("Campo requerido"),
    provincia: yup.number().required("Campo requerido"),
    ciudad: yup.number().required("Campo requerido"),
    cp: yup
      .number()
      .typeError("El código postal debe ser un número")
      .required("El código postal es obligatorio")
      .integer("El código postal debe ser un número entero")
      .positive("El código postal debe ser un número positivo")
      .max(9999, "El código postal debe tener como máximo 4 dígitos"),
    calle: yup.string().optional(),
    nro: yup
      .number()
      .typeError("El número de calle debe ser un número")
      .integer("El número de calle debe ser un número entero")
      .positive("El número de calle debe ser un número positivo")
      .nullable(),
    piso: yup
      .number()
      .typeError("El piso debe ser un número")
      .integer("El piso debe ser un número entero")
      .positive("El piso debe ser un número positivo")
      .nullable(),
    depto: yup.string().optional(),
    telefono: yup
      .number()
      .typeError("El teléfono debe ser un número")
      .required("El teléfono es obligatorio")
      .integer("El teléfono debe ser un número entero")
      .positive("El teléfono debe ser un número positivo")
      .max(9999999999, "El teléfono debe tener como máximo 10 dígitos"),
    presentacion: yup.string().optional(),
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DatosPersonales
            postulante={postulante}
            setPostulante={setPostulante}
            schema={schema}
            validarErrores={validarErrores}
            setValidarErrores={setValidarErrores}
          />
        );
      case 1:
        return (
          <DatosAcademicos
            postulante={postulante}
            setPostulante={setPostulante}
          />
        );
      default:
        throw new Error("Paso desconocido");
    }
  };

  const handleFinish = async () => {
    try {
      // Intenta validar los campos con Yup
      schema.validateSync(postulante, { abortEarly: false });

      const response = await postPostulante(postulante);

      if (response) {
        toast.success("Tu cuenta fue creada con éxito");
        window.location.href = "/login";
      } else {
        toast.error("Hubo un error al crear tu cuenta");
      }
    } catch (error) {
      // Si hay errores, actualiza el estado de errores de validación
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setValidarErrores(errors);

      console.log("Error: ", error);
      toast.error("Hubo un error al crear tu cuenta");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Registro
        steps={steps}
        getStepContent={getStepContent}
        handleFinish={handleFinish}
        postulante={postulante}
        schema={schema}
        setValidarErrores={setValidarErrores}
      />
      ;
    </>
  );
}
