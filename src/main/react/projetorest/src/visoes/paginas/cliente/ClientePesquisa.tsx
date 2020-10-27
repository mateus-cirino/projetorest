import React, {FC, useEffect, useState} from "react";
import {Cliente} from "../../../modelos/cliente";
import {buscarTodos} from "../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {PesquisaProps} from "../../componentes/extensoes/pesquisaProps";
import {CLASS_NAME_CLIENTE} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";

const ClientePesquisa: FC<PesquisaProps> = props => {
    const cliente: Cliente = {
        nomeClasseVO: CLASS_NAME_CLIENTE
    };
    const [clientes, setClientes] = useState([]);
    const {usuarioLogado, setSelectedItem} = props;
    const history = useHistory();
    const { addToast } = useToasts();
    useEffect(() => {
        if (usuarioLogado === null) {
            history.goBack();
        }
        buscarTodos(cliente, {
            funcaoSucesso: (clientes: Cliente[]) => {
                setClientes(clientes);
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
            name: 'CPF',
            selector: 'cpf',
            sortable: true,
        },
        {
            name: 'rg',
            selector: 'rg',
            sortable: true,
        },
        {
            name: 'Matrícula',
            selector: 'matricula',
            sortable: true,
        },
    ];
    const handleChangeRow = (row: any, click: any) => {
        setSelectedItem(row);
        history.push('/cliente/persistir');
    };
    const actions = () => {
        return (
            <>
                <Link to="/cliente/persistir">
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
                    title="Lista de clientes"
                    actions={actions()}
                    columns={columns}
                    data={clientes}
                    onRowClicked={handleChangeRow}
                />
            </div>
        </>
    );
};

export default ClientePesquisa;