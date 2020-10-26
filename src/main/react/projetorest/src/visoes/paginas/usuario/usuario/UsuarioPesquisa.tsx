import React, {FC} from "react";
import {CLASS_NAME, Usuario} from "../../../../modelos/usuario";
import {buscarTodos} from "../../../../servicos/geral.servico";

const UsuarioPesquisa: FC = () => {
    const usuario: Usuario = {
        nomeClasseVO: CLASS_NAME
    };
    buscarTodos(usuario, {
        funcaoSucesso: result => {
            console.log(result);
        },
        funcaoErro: mensagem => {
            console.log(mensagem);
        }
    });
    return (
        <p>Teste</p>
    );
};

export default UsuarioPesquisa;