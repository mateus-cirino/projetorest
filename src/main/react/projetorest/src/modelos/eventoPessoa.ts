import {BasicVO} from "./extensoes/basicVO";
import {Pessoa} from "./pessoa";
import {Evento} from "./evento";
import {Usuario} from "./usuario";

export interface EventoPessoa extends BasicVO {
    evento?: Evento;
    pessoa?: Pessoa;
    presenca?: boolean;
    dataInscricao?: Date;
    usuario?: Usuario;
    nomeClasseVO: string;
}
