import {BasicVO} from "./extensoes/basicVO";
import {Endereco} from "./endereco";
import {Evento} from "./evento";

export interface Cliente extends BasicVO {
    nome?: string;
    cpf?: string;
    rg?: string;
    matricula?: string;
    endereco?: Endereco;
    eventos?: Evento[];
    nomeClasseVO: 'com.mateus.projetorest.modelos.Cliente'
}