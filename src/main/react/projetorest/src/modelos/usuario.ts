import {BasicVO} from "./extensoes/basicVO";

export interface Usuario extends BasicVO {
    nome?: string;
    login?: string;
    senha?: string;
    tipoUsuario?: string;
    nomeClasseVO: string;
}
