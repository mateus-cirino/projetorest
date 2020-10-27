import React, {Dispatch, FC, useEffect, useState} from "react";
import {CLASS_NAME, Cliente} from "../../../modelos/cliente";
import {buscarTodos} from "../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";

interface ClientePesquisaProps {
    setSelectedItem?: Dispatch<any>;
}

const ClientePesquisa: FC<ClientePesquisaProps> = props => {
    const cliente: Cliente = {
        nomeClasseVO: CLASS_NAME
    };
    const [clientes, setClientes] = useState([]);
    const history = useHistory();
    useEffect(() => {
        buscarTodos(cliente, {
            funcaoSucesso: (clientes: Cliente[]) => {
                // @ts-ignore
                setClientes(clientes);
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
        // @ts-ignore
        props.setSelectedItem(row);
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