import {BasicVO} from "./extensoes/basicVO";
import {Endereco} from "./endereco";
import {Cliente} from "./cliente";
import {Usuario} from "./usuario";

export interface Evento extends BasicVO {
    nome?: string;
    descricao?: string;
    numeroMaxParticipantes?: number;
    endereco?: Endereco;
    dtInicio?: Date;
    dtFim?: Date;
    usuario?: Usuario;
    clientes?: Cliente[];
    nomeClasseVO: string;
}
