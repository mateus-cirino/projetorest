import React, {FC, useEffect, useState} from "react";
import {CLASS_NAME, Usuario} from "../../../../modelos/usuario";
import {buscarTodos} from "../../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';

const UsuarioPesquisa: FC = () => {
    const usuario: Usuario = {
        nomeClasseVO: CLASS_NAME
    };
    const [usuarios, setUsuarios] = useState([]);
    const columns = [
        {
            name: 'nome',
            sortable: true,
        },
        {
            name: 'login',
            sortable: true,
        },
    ];
    useEffect(() => {
        buscarTodos(usuario, {
            funcaoSucesso: usuarios => {
                // @ts-ignore
                setUsuarios(usuarios);
            },
            funcaoErro: mensagem => {
                //alert(mensagem);
            }
        });
    }, []);
    return (
        <DataTable
            columns={columns}
            data={usuarios}
        />
    );
};

export default UsuarioPesquisa;