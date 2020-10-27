import React, {FC, useEffect, useState} from "react";
import {Endereco} from "../../../modelos/endereco";
import {buscarTodos} from "../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {PesquisaProps} from "../../componentes/extensoes/pesquisaProps";
import {CLASS_NAME_ENDERECO} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";

const EnderecoPesquisa: FC<PesquisaProps> = props => {
    const endereco: Endereco = {
        nomeClasseVO: CLASS_NAME_ENDERECO
    };
    const [enderecos, setEnderecos] = useState([]);
    const {setSelectedItem} = props;
    const history = useHistory();
    const { addToast } = useToasts();
    useEffect(() => {
        buscarTodos(endereco, {
            funcaoSucesso: (enderecos: Endereco[]) => {
                setEnderecos(enderecos);
            },
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
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
        setSelectedItem(row);
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
            <div className="container m-2">
                <DataTable
                    title="Lista de endereços"
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