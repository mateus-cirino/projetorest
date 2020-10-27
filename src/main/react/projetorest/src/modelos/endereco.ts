import {BasicVO} from "./extensoes/basicVO";

export interface Endereco extends BasicVO {
    estado?: string;
    cidade?: string;
    rua?: string;
    numero?: number;
    nomeClasseVO: string;
}

export const CLASS_NAME = 'com.mateus.projetorest.modelos.Endereco';