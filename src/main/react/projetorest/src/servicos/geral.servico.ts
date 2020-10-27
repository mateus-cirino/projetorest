import {AxiosInstance} from "axios";
import {AxiosParam, criar, enviar} from "./extensoes/axios.util";

function pegarServico(): AxiosInstance {
    return criar(`http://localhost:8080/api/`)
}

export function persistir<T>(formData: FormData, param: AxiosParam<T>) {
    enviar(pegarServico().post<T>('/persistir', formData), param);
}

export function remover<T>(formData: FormData, param: AxiosParam<T>) {
    enviar(pegarServico().post<T>('/remover', formData), param);
}

export function buscarTodos<T>(entidade: T, param: AxiosParam<T[]>) {
    enviar(pegarServico().post<T[]>('/buscartodos', entidade), param);
}