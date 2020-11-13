import {BasicVO} from "./extensoes/basicVO";
import {Pessoa} from "./pessoa";
import {Evento} from "./evento";

export interface EventoPessoa extends BasicVO {
    evento?: Evento;
    pessoa?: Pessoa;
    presenca?: boolean;
    dataPresenca?: Date;
    nomeClasseVO: string;
}
