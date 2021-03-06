import React, {FC, useEffect, useState} from "react";
import {Evento} from "../../../modelos/evento";
import {buscarTodos} from "../../../servicos/geral.servico";
import DataTable from 'react-data-table-component';
import {Button} from "reactstrap";
import {Link, useHistory} from "react-router-dom";
import {PesquisaProps} from "../../componentes/extensoes/pesquisaProps";
import {CLASS_NAME_EVENTO} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {customStyles} from "../../../utils/tabelaUtils";

const EventoPesquisa: FC<PesquisaProps> = props => {
    const evento: Evento = {
        nomeClasseVO: CLASS_NAME_EVENTO
    };
    const [eventos, setEventos] = useState([]);
    const {usuarioLogado, setSelectedItem} = props;
    const history = useHistory();
    const { addToast } = useToasts();
    useEffect(() => {
        buscarTodos(evento, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            },
            funcaoSucesso: (eventos: Evento[]) => {
                setEventos(eventos);
            },
        });
    }, []);
    const columns = [
        {
            name: 'Nome',
            selector: 'nome',
            sortable: true,
        },
        {
            name: 'Descrição',
            selector: 'descricao',
            sortable: true,
        },
        {
            name: 'Nº máximo de participantes',
            selector: 'numeroMaxParticipantes',
            sortable: true,
        },
        {
            name: 'Data de início',
            selector: 'dtInicio',
            cell: row => {
                const { dtInicio } = row;
                const dataHora = dtInicio.split('T');
                return `${dataHora[0]} ${dataHora[1]}`;
            },
            sortable: true,
        },
        {
            name: 'Data de finalização',
            selector: 'dtFim',
            cell: row => {
                const { dtFim } = row;
                const dataHora = dtFim.split('T');
                return `${dataHora[0]} ${dataHora[1]}`;
            },
            sortable: true,
        },
    ];
    const handleChangeRow = (row: any, click: any) => {
        setSelectedItem(row);
        history.push('/evento/persistir');
    };
    const actions = () => {
        return (
            <>
                <Link to="/evento/persistir">
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
            <div className="container m-auto col-md-12 col-xl-10">
                <DataTable
                    title="Lista de eventos"
                    actions={actions()}
                    columns={columns}
                    className="border rounded p-2"
                    data={eventos}
                    onRowClicked={handleChangeRow}
                    striped={true}
                    highlightOnHover={true}
                    customStyles={customStyles}
                />
            </div>
        </>
    );
};

export default EventoPesquisa;