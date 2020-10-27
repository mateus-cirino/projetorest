import React, {FC, useEffect, useState} from "react";
import {Usuario} from "../../../../modelos/usuario";
import {buscarTodos} from "../../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import PesquisaProps from "../../../componentes/extensoes/pesquisaProps";
import {CLASS_NAME_USUARIO} from "../../../../modelos/extensoes/nomeClasseVO";

const UsuarioPesquisa: FC<PesquisaProps> = props => {
    const usuario: Usuario = {
        nomeClasseVO: CLASS_NAME_USUARIO
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
            name: 'Nome',
            selector: 'nome',
            sortable: true,
        },
        {
            name: 'Login',
            selector: 'login',
            sortable: true,
        },
        {
            name: 'Senha',
            selector: 'senha',
            sortable: true,
        },
        {
            name: 'Tipo de usuário',
            selector: 'tipoUsuario',
            sortable: true,
        },
    ];
    const handleChangeRow = (row: any, click: any) => {
        // @ts-ignore
        props.setSelectedItem(row);
        history.push('/usuario/persistir');
    };
    const actions = () => {
        return (
            <>
                <Link to="/usuario/persistir">
                    <Button className="m-2" color="success">Adicionar</Button>
                </Link>
                <Link to="/">
                    <Button className="m-2" color="primary">Voltar</Button>
                </Link>
            </>
        )
    };
    return (
        <>
            <div className="container m-2">
                <DataTable
                    title="Lista de usuários"
                    actions={actions()}
                    columns={columns}
                    data={usuarios}
                    onRowClicked={handleChangeRow}
                />
            </div>
        </>
    );
};

export default UsuarioPesquisa;