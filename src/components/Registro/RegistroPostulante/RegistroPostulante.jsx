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
    carrera: "",
    estado: 1,
    nombre: "",
    apellido: "",
    nacionalidad: "",
    fecha_nac: null,
    pais: "",
    provincia: null,
    ciudad: null,
    cp: "",
    telefono: null,
    segundoTelefono: null,
    cantMaterias: null,
    alumnoUnahur: false,
    presentacion: "",
    cv: "",
    foto: "",
    genero: "",
    discapacidad: null,
    linkedIn: "",
    portfolio: "",
  });

  const [validarErroresDatosPersonales, setValidarErroresDatosPersonales] =
    useState({}); // Para controlar los errores de validación

  const schemaDatosPersonales = yup.object().shape({
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
    telefono: yup
      .number()
      .typeError("El teléfono debe ser un número")
      .required("El teléfono es obligatorio")
      .integer("El teléfono debe ser un número entero")
      .positive("El teléfono debe ser un número positivo")
      .max(9999999999, "El teléfono debe tener como máximo 10 dígitos"),
    segundoTelefono: yup
      .number()
      .typeError("El teléfono debe ser un número")
      .nullable()
      .integer("El teléfono debe ser un número entero")
      .positive("El teléfono debe ser un número positivo")
      .max(9999999999, "El teléfono debe tener como máximo 10 dígitos"),
    presentacion: yup.string().required("Campo requerido").max(255, "Máximo 255 caracteres"),
    genero: yup.string().required("Campo requerido"),
    discapacidad: yup.string().optional().nullable(),
    linkedIn: yup.string().optional().url("Debe ser una URL válida"),
    portfolio: yup.string().optional().url("Debe ser una URL válida"),
  });

  const [validarErroresDatosAcademicos, setValidarErroresDatosAcademicos] =
    useState({}); // Para controlar los errores de validación

  const schemaDatosAcademicos = yup.object().shape({
    estudios: yup.string().required("Campo requerido"),
    carrera: yup.string().optional(),
    cantMaterias: yup
      .number()
      .typeError("La cantidad de materias debe ser un número")
      .integer("La cantidad de materias debe ser un número entero")
      .nullable(),
    alumnoUnahur: yup.boolean().optional(),
    cv: yup.string().optional(),
    foto: yup.string().optional(),
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DatosPersonales
            postulante={postulante}
            setPostulante={setPostulante}
            schema={schemaDatosPersonales}
            validarErrores={validarErroresDatosPersonales}
            setValidarErrores={setValidarErroresDatosPersonales}
          />
        );
      case 1:
        return (
          <DatosAcademicos
            postulante={postulante}
            setPostulante={setPostulante}
            schema={schemaDatosAcademicos}
            validarErrores={validarErroresDatosAcademicos}
            setValidarErrores={setValidarErroresDatosAcademicos}
          />
        );
      default:
        throw new Error("Paso desconocido");
    }
  };

  const handleFinish = async () => {
    try {
      // Intenta validar los campos con Yup
      schemaDatosPersonales.validateSync(postulante, { abortEarly: false });
      schemaDatosAcademicos.validateSync(postulante, { abortEarly: false });

      const response = await postPostulante(postulante);

      if (response) {
        toast.success("Tu cuenta fue creada con éxito");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast.error("Hubo un error al crear tu cuenta");
      }
    } catch (error) {
      // Si hay errores, actualiza el estado de errores de validación
      const errors = {};
      error.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setValidarErroresDatosPersonales(errors);
      setValidarErroresDatosAcademicos(errors);
      console.log("Error: ", error);
      toast.error("Hubo un error al crear tu cuenta");
    }
  };

  return (
    <>
      <Registro
        steps={steps}
        getStepContent={getStepContent}
        handleFinish={handleFinish}
        usuario={postulante}
        schema={schemaDatosPersonales}
        setValidarErrores={setValidarErroresDatosPersonales}
      />
    </>
  );
}
