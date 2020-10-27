import {Usuario} from "../../../modelos/usuario";
import {Dispatch} from "react";
import {Endereco} from "../../../modelos/endereco";

export default interface FormularioProps {
    usuarioLogado: Usuario;
    selectedItem?: any;
    setSelectedItem?: Dispatch<Endereco>;
}