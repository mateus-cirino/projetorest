import {useEffect, useState} from "react";
import {recuperarRelatorioParticipacaoSintetico} from "../../../../servicos/evento.servico";
import {useToasts} from "react-toast-notifications";
import {Label} from "reactstrap";
import React from "react";
import Select from "react-select";
import {Evento} from "../../../../modelos/evento";
import {buscarTodos} from "../../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO} from "../../../../utils/nomeClasseVO";
import {customStyles} from "../../../../utils/tabelaUtils";
import DataTable from "react-data-table-component";
import moment from "moment";

const RelatorioParticipacaoSintetico = () => {
    const [dadosRelatorios, setDadosRelatorios] = useState([]);
    const [eventosOptions, setEventosOptions] = useState([]);
    const [selectEventoValue, setSelectEventoValue] = useState(null);
    const { addToast } = useToasts();
    useEffect(() => {
        const entidadeEvento = {
            nomeClasseVO: CLASS_NAME_EVENTO
        };
        buscarTodos(entidadeEvento, {
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: eventos => {
                setEventosOptions(eventos.map((evento: Evento) => {
                    return {
                        value: evento.id,
                        label: evento.nome
                    }
                }));
            }
        });
    }, []);
    const columns = [
        {
            name: 'Data de Credenciamento',
            selector: 'dataEntrada',
            cell: row => {
                const { dataEntrada } = row;
                return moment(dataEntrada).format('DD/MM/YYYY')
            },
            sortable: true,
        },
        {
            name: 'Total',
            selector: 'numeroCredenciamentos',
            sortable: true,
        }
    ];
    const handleChangeEvento = props => {
        setSelectEventoValue(props);
        recuperarRelatorioParticipacaoSintetico(props.value, {
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: resultado => setDadosRelatorios(resultado)
        })
    };
    return (
        <div className="container">
            <div>
                <Label for="evento">Eventos</Label>
                <Select
                    placeholder="selecione o evento para filtrar"
                    name="evento"
                    value={selectEventoValue}
                    options={eventosOptions}
                    onChange={handleChangeEvento}
                />
            </div>
            <div className="d-flex flex-column align-items-end">
                <DataTable
                    title="Relatório de Participação Sintético"
                    columns={columns}
                    className="border rounded p-2"
                    data={dadosRelatorios}
                    striped={true}
                    highlightOnHover={true}
                    customStyles={customStyles}
                />
                <h6 className="m-2 font-weight-normal">Total geral: {dadosRelatorios.map(dadoRelatorio => dadoRelatorio.numeroCredenciamentos).reduce((a, b) => a + b, 0)}</h6>
            </div>
        </div>
    );
};

export default RelatorioParticipacaoSintetico;
