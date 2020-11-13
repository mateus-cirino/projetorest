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

interface Filtro {
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
    const {control, register} = useForm<Filtro>();
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
        setEventosPessoaFiltro(eventosPessoa.filter((eventoPessoa: EventoPessoa) => {
            return eventoPessoa.evento.id === props.value;
        }));
    };
    const handleChangePessoa = props => {
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
    return (
            <div className="container m-auto col-md-12 col-xl-12">
                <div className="container m-auto col-md-12 col-xl-12 border rounded p-2 d-flex justify-content-center">
                    <div className="col-md-5 col-xl-4">
                        <Label for="evento">Eventos</Label>
                        <Select
                            placeholder="selecione o evento para filtrar"
                            name="evento"
                            options={eventosOptions}
                            onChange={handleChangeEvento}
                        />
                    </div>
                    <div>
                        <Label for="dataPresenca">Data da presença</Label>
                        <Input type="datetime-local" name="dataPresenca" innerRef={register} placeholder="selecione uma data para filtrar" onChange={handleChangeDataPresenca} />
                    </div>
                    <div className="col-md-5 col-xl-4">
                        <Label for="pessoa">Pessoas</Label>
                        <Select
                            placeholder="selecione a pessoa para filtrar"
                            name="pessoa"
                            options={pessoasOptions}
                            onChange={handleChangePessoa}
                        />
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
