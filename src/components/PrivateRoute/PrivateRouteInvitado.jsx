import NotFound from "../404/NotFound";
import PreLogin from "../PreLogin/PreLogin";

const invitado = sessionStorage.getItem('invitado');

export const checkInvitado = (component) => {
    return invitado ? component : <PreLogin />
}

export default checkInvitado;
