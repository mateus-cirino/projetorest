import React, {FC, useEffect, useState} from "react";
import {PesquisaProps} from "../../componentes/extensoes/pesquisaProps";
import {Evento} from "../../../modelos/evento";
import {CLASS_NAME_EVENTO_PESSOA} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {buscarTodos} from "../../../servicos/geral.servico";
import {EventoPessoa} from "../../../modelos/eventoPessoa";
import DataTable from "react-data-table-component";
import {customStyles} from "../../../utils/tabelaUtils";
import {Button, Input, Label} from "reactstrap";
import Select from "react-select";
import moment from "moment";
import {useForm} from "react-hook-form";

interface EventoPessoaPesquisaFiltro {
    dataPresenca?: Date;
}

const EventoPessoaPesquisa: FC<PesquisaProps> = props => {
    const eventoPessoa: EventoPessoa = {
        nomeClasseVO: CLASS_NAME_EVENTO_PESSOA
    };
    const [eventosPessoa, setEventosPessoa] = useState([]);
    const [eventosPessoaFiltro, setEventosPessoaFiltro] = useState([]);
    const [eventosOptions, setEventosOptions] = useState([]);
    const [pessoasOptions, setPessoasOptions] = useState([]);
    const [selectPessoaValue, setSelectPessoaValue] = useState(null);
    const [selectEventoValue, setSelectEventoValue] = useState(null);
    const {control, register} = useForm<EventoPessoaPesquisaFiltro>();
    const { addToast } = useToasts();
    useEffect(() => {
        buscarTodos(eventoPessoa, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            },
            funcaoSucesso: (result: EventoPessoa[]) => {
                setEventosPessoa(result);
                setEventosPessoaFiltro(result);
                setEventosOptions(result.map((eventoPessoa: EventoPessoa) => {
                    return {
                        value: eventoPessoa.evento.id,
                        label: eventoPessoa.evento.nome
                    }
                }));
                setPessoasOptions(result.map((eventoPessoa: EventoPessoa) => {
                    return {
                        value: eventoPessoa.pessoa.id,
                        label: eventoPessoa.pessoa.nome
                    }
                }));
            },
        });
    }, []);
    const columns = [
        {
            name: 'Evento',
            selector: 'evento.nome',
            sortable: true,
        },
        {
            name: 'Pessoa',
            selector: 'pessoa.nome',
            sortable: true,
        },
        {
            name: 'Presença',
            selector: 'presenca',
            cell: row => {
                const { presente } = row;
                return presente ? "Sim" : "Não"
            },
            sortable: true,
        },
        {
            name: 'Data da presença',
            selector: 'dataPresenca',
            cell: row => {
                const { dataPresenca } = row;
                const dataHora = dataPresenca.split('T');
                const data = dataHora[0];
                const horaSegundo = dataHora[1].split('.');
                return `${data} ${horaSegundo[0]}`;
            },
            sortable: true,
        },
    ];
    const handleChangeEvento = props => {
        setSelectEventoValue(props);
        setEventosPessoaFiltro(eventosPessoa.filter((eventoPessoa: EventoPessoa) => {
            return eventoPessoa.evento.id === props.value;
        }));
    };
    const handleChangePessoa = props => {
        setSelectPessoaValue(props);
        setEventosPessoaFiltro(eventosPessoa.filter((eventoPessoa: EventoPessoa) => {
            return eventoPessoa.pessoa.id === props.value;
        }));
    };
    const handleChangeDataPresenca = () => {
        const { dataPresenca } = control.getValues();
        setEventosPessoaFiltro(eventosPessoa.filter((eventoPessoa: EventoPessoa) => {
            return moment(eventoPessoa.dataPresenca, 'YYYYMMDD').isSame(moment(dataPresenca, 'YYYYMMDD'));
        }));
    };
    const limparFiltro = () => {
      setSelectPessoaValue(null);
      setSelectEventoValue(null);
      control.setValue('dataPresenca', '');
      setEventosPessoaFiltro(eventosPessoa);
    };
    return (
            <div className="container">
                <div className="container d-md-flex flex-md-column d-xl-flex flex-xl-row col-12 align-items-end">
                    <div className="col-xl-4 col-md-12 mb-2">
                        <Label for="evento">Eventos</Label>
                        <Select
                            placeholder="selecione o evento para filtrar"
                            name="evento"
                            value={selectEventoValue}
                            options={eventosOptions}
                            onChange={handleChangeEvento}
                        />
                    </div>
                    <div className="col-xl-3 col-md-12 mb-2">
                        <Label for="dataPresenca">Data da presença</Label>
                        <Input type="datetime-local" name="dataPresenca" innerRef={register} placeholder="selecione uma data para filtrar" onChange={handleChangeDataPresenca} />
                    </div>
                    <div className="col-xl-4 col-md-12 mb-2">
                        <Label for="pessoaOption">Pessoas</Label>
                        <Select
                            placeholder="selecione a pessoa para filtrar"
                            name="pessoa"
                            value={selectPessoaValue}
                            options={pessoasOptions}
                            onChange={handleChangePessoa}
                        />
                    </div>
                    <div className="col-xl-2 col-md-12 mb-2">
                        <Button color="primary" onClick={limparFiltro}>Limpar</Button>
                    </div>
                </div>
                <DataTable
                    title="Lista de inscrições dos eventos"
                    columns={columns}
                    className="border rounded p-2"
                    data={eventosPessoaFiltro}
                    striped={true}
                    highlightOnHover={true}
                    customStyles={customStyles}
                />
            </div>
    );
};

export default EventoPessoaPesquisa;
