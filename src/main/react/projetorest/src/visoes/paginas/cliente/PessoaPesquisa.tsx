import React, {FC, useEffect, useState} from "react";
import {Pessoa} from "../../../modelos/pessoa";
import {buscarTodos} from "../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {PesquisaProps} from "../../componentes/extensoes/pesquisaProps";
import {CLASS_NAME_PESSOA} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";

const PessoaPesquisa: FC<PesquisaProps> = props => {
    const pessoa: Pessoa = {
        nomeClasseVO: CLASS_NAME_PESSOA
    };
    const [pessoas, setPessoas] = useState([]);
    const {usuarioLogado, setSelectedItem} = props;
    const history = useHistory();
    const { addToast } = useToasts();
    useEffect(() => {
        setTimeout(() => {
            buscarTodos(pessoa, {
                funcaoSucesso: (pessoas: Pessoa[]) => {
                    setPessoas(pessoas);
                },
                funcaoErro: mensagem => {
                    addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
                }
            });
        }, 800);
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
        history.push('/pessoa/persistir');
    };
    const actions = () => {
        return (
            <>
                <Link to="/pessoa/persistir">
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
                    title="Lista de pessoas"
                    actions={actions()}
                    columns={columns}
                    data={pessoas}
                    onRowClicked={handleChangeRow}
                />
            </div>
        </>
    );
};

export default PessoaPesquisa;