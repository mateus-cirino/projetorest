import {BasicVO} from "./extensoes/basicVO";
import {Endereco} from "./endereco";
import {Cliente} from "./cliente";
import {Usuario} from "./usuario";

export interface Evento extends BasicVO {
    nome?: string;
    descricao?: string;
    numeroMaxParticipantes?: number;
    endereco?: Endereco;
    dtInicio?: string;
    dtFim?: string;
    usuario?: Usuario;
    clientes?: Cliente[];
    nomeClasseVO: 'com.mateus.projetorest.modelos.Evento'
}