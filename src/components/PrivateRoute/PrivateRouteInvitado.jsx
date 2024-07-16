import NotFound from "../404/NotFound";
import PreLogin from "../PreLogin/PreLogin";

const invitado = localStorage.getItem('invitado');

export const checkInvitado = (component) => {
    return invitado ? component : <PreLogin />
}

export default checkInvitado;
