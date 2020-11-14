import {AxiosInstance} from "axios";
import {AxiosParam, criar, enviar} from "./extensoes/axios.util";
import {EventoPessoa} from "../modelos/eventoPessoa";
import {Evento} from "../modelos/evento";
import {Pessoa} from "../modelos/pessoa";

function pegarServico(): AxiosInstance {
    return criar(`http://localhost:8080/api/evento`)
}

export function adicionarPessoasEvento(eventoPessoas: EventoPessoa[], param: AxiosParam<EventoPessoa[]>) {
    enviar(pegarServico().post<EventoPessoa[]>('/adicionarPessoasEvento', eventoPessoas), param);
}

export function recuperarPessoasRelacionadosEvento(evento: Evento, param: AxiosParam<Pessoa[]>) {
    enviar(pegarServico().post<Pessoa[]>('/buscarPessoasRelacionadasEvento', evento), param);
}

export function recuperarPessoasNaoRelacionadosEvento(evento: Evento, param: AxiosParam<Pessoa[]>) {
    enviar(pegarServico().post<Pessoa[]>('/buscarPessoasNaoRelacionadasEvento', evento), param);
}

export function recuperarEventoPessoa(eventoPessoa: EventoPessoa, param: AxiosParam<EventoPessoa>) {
    enviar(pegarServico().post<EventoPessoa>('/buscarEventoPessoa', eventoPessoa), param);
}

export function confirmarPresencaEvento(idEvento: number, credencial: string, tipoCredenciamento: string, param: AxiosParam<boolean>) {
    const formData = new FormData();
    formData.append('idEvento', idEvento.toString());
    formData.append('credencial', credencial);
    formData.append('tipoCredenciamento', tipoCredenciamento);
    enviar(pegarServico().post<boolean>('/confirmarPresencaEvento', formData), param);
}
