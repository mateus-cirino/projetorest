import React, {Dispatch, FC, useEffect, useState} from "react";
import {CLASS_NAME, Endereco} from "../../../modelos/endereco";
import {buscarTodos} from "../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import Menu from "../../componentes/menu/Menu";

interface EnderecoPesquisaProps {
    setSelectedItem?: Dispatch<any>;
}

const EnderecoPesquisa: FC<EnderecoPesquisaProps> = props => {
    const endereco: Endereco = {
        nomeClasseVO: CLASS_NAME
    };
    const [enderecos, setEnderecos] = useState([]);
    const history = useHistory();
    useEffect(() => {
        buscarTodos(endereco, {
            funcaoSucesso: (enderecos: Endereco[]) => {
                // @ts-ignore
                setEnderecos(enderecos);
            },
            funcaoErro: mensagem => {
                //alert(mensagem);
            }
        });
    }, []);
    const columns = [
        {
            name: 'Estado',
            selector: 'estado',
            sortable: true,
        },
        {
            name: 'Cidade',
            selector: 'cidade',
            sortable: true,
        },
        {
            name: 'Rua',
            selector: 'rua',
            sortable: true,
        },
        {
            name: 'Número',
            selector: 'numero',
            sortable: true,
        },
    ];
    const handleChangeRow = (row: any, click: any) => {
        // @ts-ignore
        props.setSelectedItem(row);
        history.push('/endereco/persistir');
    };
    const actions = () => {
        return (
            <>
                <Link to="/endereco/persistir">
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
            <Menu />
            <div className="container m-2">
                <DataTable
                    title="Lista de usuários"
                    actions={actions()}
                    columns={columns}
                    data={enderecos}
                    onRowClicked={handleChangeRow}
                />
            </div>
        </>
    );
};

export default EnderecoPesquisa;