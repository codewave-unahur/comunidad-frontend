import { Typography } from "@mui/material";
import NotFound from "../404/NotFound";
import { EncryptStorage } from "encrypt-storage";

const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
    });

const tipoUsuario = encryptStorage.getItem("tipoUsuario");
const estaLogueado = encryptStorage.getItem("estaLogueado");

export const checkRole = (component) => {
    return tipoUsuario === "empresa" || tipoUsuario === "admin" ? component : <NotFound />
}

export const checkNotLogged = (component) => {
    return !estaLogueado ? component : <NotFound />
}

export const checkLogged = (component) => {
    return estaLogueado? component : <NotFound />
}
    