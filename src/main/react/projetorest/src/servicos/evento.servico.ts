import {AxiosInstance} from "axios";
import {AxiosParam, criar, enviar} from "./extensoes/axios.util";
import {EventoCliente} from "../modelos/eventoCliente";
import {Evento} from "../modelos/evento";
import {Cliente} from "../modelos/cliente";

function pegarServico(): AxiosInstance {
    return criar(`http://localhost:8080/api/evento`)
}

export function adicionarClientesEvento(eventoClientes: EventoCliente[], param: AxiosParam<EventoCliente[]>) {
    enviar(pegarServico().post<EventoCliente[]>('/adicionarClientesEvento', eventoClientes), param);
}

export function recuperarClientesRelacionadosEvento(evento: Evento, param: AxiosParam<Cliente[]>) {
    enviar(pegarServico().post<Cliente[]>('/buscarClientesRelacionadosEvento', evento), param);
}

export function recuperarClientesNaoRelacionadosEvento(evento: Evento, param: AxiosParam<Cliente[]>) {
    enviar(pegarServico().post<Cliente[]>('/buscarClientesNaoRelacionadosEvento', evento), param);
}

export function recuperarEventoCliente(eventoCliente: EventoCliente, param: AxiosParam<EventoCliente>) {
    enviar(pegarServico().post<EventoCliente>('/buscarEventoCliente', eventoCliente), param);
}
