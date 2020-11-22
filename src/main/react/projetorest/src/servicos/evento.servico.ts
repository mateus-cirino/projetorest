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

export function recuperarTotalEventosCadastrados(param: AxiosParam<number>) {
    enviar(pegarServico().post<number>('/totalEventosCadastrados'), param);
}

export function recuperarTotalPessoasCadastradas(param: AxiosParam<number>) {
    enviar(pegarServico().post<number>('/totalPessoasCadastradas'), param);
}

export function recuperarTotalInscricoes(param: AxiosParam<number>) {
    enviar(pegarServico().post<number>('/totalInscricoes'), param);
}

export function recuperarTotalInscricoesEvento(idEvento: number, param: AxiosParam<number>) {
    const formData = new FormData();
    formData.append('idEvento', idEvento.toString());
    enviar(pegarServico().post<number>('/totalInscricoesEvento', formData), param);
}

export function recuperarTotalInscricoesConfirmadas(param: AxiosParam<number>) {
    enviar(pegarServico().post<number>('/totalInscricoesConfirmadas'), param);
}

export function recuperarTotalInscricoesConfirmadasEvento(idEvento: number, param: AxiosParam<number>) {
    const formData = new FormData();
    formData.append('idEvento', idEvento.toString());
    enviar(pegarServico().post<number>('/totalInscricoesConfirmadasEvento', formData), param);
}

export function recuperarRelatorioParticipacao(param: AxiosParam<EventoPessoa[]>) {
    enviar(pegarServico().post<EventoPessoa[]>('/relatorioParticipacao'), param);
}
