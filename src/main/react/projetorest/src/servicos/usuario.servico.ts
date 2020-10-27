import {Usuario} from "../modelos/usuario";
import {AxiosInstance} from "axios";
import {AxiosParam, criar, enviar} from "./extensoes/axios.util";

function pegarServico(): AxiosInstance {
    return criar(`http://localhost:8080/api/usuario`)
}

export function fazerLogin(usuario: Usuario, param: AxiosParam<Usuario>) {
    enviar(pegarServico().post<Usuario>('/login', usuario), param);
}