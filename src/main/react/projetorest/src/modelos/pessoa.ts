import {BasicVO} from "./extensoes/basicVO";
import {Endereco} from "./endereco";

export interface Pessoa extends BasicVO {
    nome?: string;
    cpf?: string;
    rg?: string;
    matricula?: string;
    endereco?: Endereco;
    nomeClasseVO: string;
}
