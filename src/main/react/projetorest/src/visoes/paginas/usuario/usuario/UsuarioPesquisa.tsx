import React, {Dispatch, FC, useEffect, useState} from "react";
import {CLASS_NAME, Usuario} from "../../../../modelos/usuario";
import {buscarTodos} from "../../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";

interface UsuarioPesquisaProps {
    setSelectedItem?: Dispatch<any>;
}

const UsuarioPesquisa: FC<UsuarioPesquisaProps> = props => {
    const usuario: Usuario = {
        nomeClasseVO: CLASS_NAME
    };
    const [usuarios, setUsuarios] = useState([]);
    const history = useHistory();
    useEffect(() => {
        buscarTodos(usuario, {
            funcaoSucesso: (usuarios: Usuario[]) => {
                // @ts-ignore
                setUsuarios(usuarios);
            },
            funcaoErro: mensagem => {
                //alert(mensagem);
            }
        });
    }, []);
    const columns = [
        {
            name: 'nome',
            selector: 'nome',
            sortable: true,
        },
        {
            name: 'login',
            selector: 'login',
            sortable: true,
        },
    ];
    const handleChangeRow = (row: any, click: any) => {
        // @ts-ignore
        props.setSelectedItem(row);
        history.push('/usuario/persistir');
    };
    return (
        <>
            <Link to="/usuario/persistir">
                <Button>Adicionar</Button>
            </Link>
            <DataTable
                columns={columns}
                data={usuarios}
                onRowClicked={handleChangeRow}
            />
        </>
    );
};

export default UsuarioPesquisa;