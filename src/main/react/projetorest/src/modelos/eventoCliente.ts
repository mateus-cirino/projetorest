import {BasicVO} from "./extensoes/basicVO";
import {Cliente} from "./cliente";
import {Evento} from "./evento";

export interface EventoCliente extends BasicVO {
    evento?: Evento;
    cliente?: Cliente;
}
