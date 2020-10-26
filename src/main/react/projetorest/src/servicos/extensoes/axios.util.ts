import Axios, { AxiosResponse } from 'axios';
export interface AxiosParam<T> {
    funcaoSucesso: (resultado: T) => void;
    funcaoErro: (mensagem: string) => void;
}

export function criar(path: string) {
    return Axios.create({baseURL: path});
}

export function enviar<T = any>(promise: Promise<AxiosResponse<T>>, param: AxiosParam<T>) {
    promise.then(resultado => param.funcaoSucesso(resultado.data)).catch(erro => param.funcaoErro(erro));
}