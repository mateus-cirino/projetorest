import React, {FC, useEffect, useState} from "react";
import {Usuario} from "../../../../modelos/usuario";
import {buscarTodos} from "../../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {PesquisaProps} from "../../../componentes/extensoes/pesquisaProps";
import {CLASS_NAME_USUARIO} from "../../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {customStyles} from "../../../../utils/tabelaUtils";

const UsuarioPesquisa: FC<PesquisaProps> = props => {
    const usuario: Usuario = {
        nomeClasseVO: CLASS_NAME_USUARIO
    };
    const [usuarios, setUsuarios] = useState([]);
    const {usuarioLogado, setSelectedItem} = props;
    const history = useHistory();
    const { addToast } = useToasts();
    useEffect(() => {
        if (usuarioLogado === null) {
            history.goBack();
        }
        buscarTodos(usuario, {
            funcaoSucesso: (usuarios: Usuario[]) => {
                setUsuarios(usuarios);
            },
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
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
        setSelectedItem(row);
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
            <div className="container m-auto col-md-12 col-xl-10">
                <DataTable
                    title="Lista de usuários"
                    actions={actions()}
                    columns={columns}
                    className="border rounded p-2"
                    data={usuarios}
                    onRowClicked={handleChangeRow}
                    customStyles={customStyles}
                />
            </div>
    );
};

export default UsuarioPesquisa;