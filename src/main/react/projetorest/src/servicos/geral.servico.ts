import {AxiosInstance} from "axios";
import {AxiosParam, criar, enviar} from "./extensoes/axios.util";
import {BasicVO} from "../modelos/extensoes/basicVO";

function pegarServico(): AxiosInstance {
    return criar(`http://localhost:8080/api/`)
}

export function buscarTodos<T>(usuario: T, param: AxiosParam<T>) {
    enviar(pegarServico().post<T>('/buscartodos', usuario), param);
}