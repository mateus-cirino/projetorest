import {Dispatch} from "react";
import {Usuario} from "../../../modelos/usuario";

export interface PesquisaProps {
    usuarioLogado: Usuario;
    setSelectedItem?: Dispatch<any>;
}