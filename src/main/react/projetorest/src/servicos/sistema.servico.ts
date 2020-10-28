import {AxiosInstance} from "axios";
import {AxiosParam, criar, enviar} from "./extensoes/axios.util";

function pegarServico(): AxiosInstance {
    return criar(`http://localhost:8080/api/sistema`)
}

export function realizarBackup(param: AxiosParam<[String]>) {
    enviar(pegarServico().get<[String]>('/realizarbackup'), param);
}

export function restaurarBackup(backup: [string], param: AxiosParam<void>) {
    enviar(pegarServico().post<void>('/restaurarbackup', backup), param);
}