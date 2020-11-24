import {useEffect, useRef, useState} from "react";
import {recuperarRelatorioParticipacaoAnalitico} from "../../../../servicos/evento.servico";
import {useToasts} from "react-toast-notifications";
import {Button, Input, Label, Table} from "reactstrap";
import React from "react";
import {EventoPessoa} from "../../../../modelos/eventoPessoa";
import moment from "moment";
import ReactToPrint from "react-to-print";
import Select from "react-select";
import {Evento} from "../../../../modelos/evento";
import {buscarTodos} from "../../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO, CLASS_NAME_PESSOA} from "../../../../utils/nomeClasseVO";
import {Pessoa} from "../../../../modelos/pessoa";
import {useForm} from "react-hook-form";

interface DadosRelatorio {
    evento?: Evento;
    pessoa?: Pessoa;
    cpf?: string;
    matricula?: string;
    dataInscricao?: string;
    dataEntrada?: string;
    dataSaida?: string;
}

interface DadosRelatorioFiltro {
    dataInscricao?: string;
    dataEntrada?: string;
    dataSaida?: string;
}

const RelatorioParticipacaoAnalitico = () => {
    const [eventosOptions, setEventosOptions] = useState([]);
    const [selectEventoValue, setSelectEventoValue] = useState(null);
    const [pessoasOptions, setPessoasOptions] = useState([]);
    const [selectPessoaValue, setSelectPessoaValue] = useState(null);
    const {control, register} = useForm<DadosRelatorioFiltro>();
    const [dadosRelatorios, setDadosRelatorios] = useState(null);
    const [dadosRelatoriosFiltro, setDadosRelatoriosFiltro] = useState(null);
    const [tabelas, setTabelas] = useState(null);
    const { addToast } = useToasts();
    const componentRef = useRef();
    useEffect(() => {
        recuperarRelatorioParticipacaoAnalitico({
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: resultado => {
                const dadosRel = resultado.map((eventoPessoa: EventoPessoa) => {
                                                const dadosRelatorio: DadosRelatorio = {
                                                    evento: eventoPessoa.evento,
                                                    pessoa: eventoPessoa.pessoa,
                                                    cpf: eventoPessoa.pessoa.cpf,
                                                    matricula: eventoPessoa.pessoa.matricula,
                                                    dataInscricao: moment(eventoPessoa.dataInscricao).format('DD/MM/YYYY'),
                                                    dataEntrada: eventoPessoa.dataEntrada ? moment(eventoPessoa.dataEntrada).format('DD/MM/YYYY HH:mm') : '-',
                                                    dataSaida: eventoPessoa.dataSaida ? moment(eventoPessoa.dataSaida).format('DD/MM/YYYY HH:mm') : '-'
                                                };
                                                return dadosRelatorio;
                                            });
                separarTabelaData(dadosRel);
                setDadosRelatorios(dadosRel);
                setDadosRelatoriosFiltro(dadosRel);
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
                const entidadePessoa = {
                    nomeClasseVO: CLASS_NAME_PESSOA
                };
                buscarTodos(entidadePessoa, {
                    funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                    funcaoSucesso: pessoas => {
                        setPessoasOptions(pessoas.map((pessoa: Pessoa) => {
                            return {
                                value: pessoa.id,
                                label: pessoa.nome
                            }
                        }));
                    }
                });
            }
        })
    }, []);
    const separarTabelaData = (dadosRel) => {
        setTabelas(null);
        if (dadosRel.length > 0) {
            let data = dadosRel[0].dataInscricao;
            let dados = [];
            let tabelas = [];
            dadosRel.forEach((value: DadosRelatorio) => {
                if (value.dataInscricao === data) {
                    dados.push(value);
                } else {
                    tabelas.push(gerarTabela(dados, data));
                    data = value.dataInscricao;
                    dados = [];
                    dados.push(value);
                }
            });
            tabelas.push(gerarTabela(dados, data));
            setTabelas(<>{tabelas}</>);
        }
    };
    const gerarTabela = (dados, data) => {
        const body = dados.map(dado =>
                                              <tr key={dado.matricula + dado.evento}>
                                                  <th scope="row">{dado.evento.nome}</th>
                                                  <td>{dado.pessoa.nome}</td>
                                                  <td>{dado.cpf}</td>
                                                  <td>{dado.matricula}</td>
                                                  <td>{dado.dataInscricao}</td>
                                                  <td>{dado.dataEntrada}</td>
                                                  <td>{dado.dataSaida}</td>
                                              </tr>);
        return (
            <div>
                <h5>{data}</h5>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Participante</th>
                        <th>CPF</th>
                        <th>Matrícula</th>
                        <th>Data de Inscrição</th>
                        <th>Data de Entrada</th>
                        <th>Data de Saída</th>
                    </tr>
                    </thead>
                    <tbody>
                    {body}
                    </tbody>
                </Table>
            </div>
        )
    };
    const handleChangeEvento = props => {
        setSelectEventoValue(props);
        setTimeout(() => {
            const dadosRelFiltrados = dadosRelatoriosFiltro.filter((dados: DadosRelatorio) => dados.evento.id === props.value);
            setDadosRelatoriosFiltro(dadosRelFiltrados);
            separarTabelaData(dadosRelFiltrados);
        }, 200);
    };
    const handleChangePessoa = props => {
        setSelectPessoaValue(props);
        setTimeout(() => {
            const dadosRelFiltrados = dadosRelatoriosFiltro.filter((dados: DadosRelatorio) => dados.pessoa.id === props.value);
            setDadosRelatoriosFiltro(dadosRelFiltrados);
            separarTabelaData(dadosRelFiltrados);
        }, 200);
    };
    const handleChangeDataInscricao = () => {
        const { dataInscricao } = control.getValues();
        setTimeout(() => {
            const dadosRelFiltrados = dadosRelatorios.filter((dados: DadosRelatorio) => moment(dataInscricao).format('DD/MM/YYYY') === dados.dataInscricao);
            setDadosRelatoriosFiltro(dadosRelFiltrados);
            separarTabelaData(dadosRelFiltrados);
        }, 200);
    };
    const handleChangeDataEntrada = () => {
        const { dataEntrada } = control.getValues();
        setTimeout(() => {
            const dadosRelFiltrados = dadosRelatorios.filter((dados: DadosRelatorio) => moment(dataEntrada).format('DD/MM/YYYY HH:mm') === dados.dataEntrada);
            setDadosRelatoriosFiltro(dadosRelFiltrados);
            separarTabelaData(dadosRelFiltrados);
        }, 200);
    };
    const handleChangeDataSaida = () => {
        const { dataSaida } = control.getValues();
        setTimeout(() => {
            const dadosRelFiltrados = dadosRelatorios.filter((dados: DadosRelatorio) => moment(dataSaida).format('DD/MM/YYYY HH:mm') === dados.dataSaida);
            setDadosRelatoriosFiltro(dadosRelFiltrados);
            separarTabelaData(dadosRelFiltrados);
        }, 200);
    };
    const limparFiltro = () => {
        setSelectEventoValue(null);
        setSelectPessoaValue(null);
        control.setValue('dataInscricao', '');
        control.setValue('dataEntrada', '');
        control.setValue('dataSaida', '');
        separarTabelaData(dadosRelatorios);
    };
    return (
        <>
            <div className="container">
                <div>
                    <div>
                        <Label for="evento">Evento</Label>
                        <Select
                            placeholder="selecione o evento para filtrar"
                            name="evento"
                            value={selectEventoValue}
                            options={eventosOptions}
                            onChange={handleChangeEvento}
                        />
                    </div>
                    <div>
                        <Label for="pessoa">Pessoa</Label>
                        <Select
                            placeholder="selecione a pessoa para filtrar"
                            name="pessoa"
                            value={selectPessoaValue}
                            options={pessoasOptions}
                            onChange={handleChangePessoa}
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                        <div>
                            <Label for="dataInscricao">Data de inscrição</Label>
                            <Input type="date" name="dataInscricao" innerRef={register} placeholder="selecione uma data de inscrição para filtrar" onChange={handleChangeDataInscricao} />
                        </div>
                        <div>
                            <Label for="dataEntrada">Data de Entrada</Label>
                            <Input type="datetime-local" name="dataEntrada" innerRef={register} placeholder="selecione uma data de entrada para filtrar" onChange={handleChangeDataEntrada} />
                        </div>
                        <div>
                            <Label for="dataSaida">Data de Saída</Label>
                            <Input type="datetime-local" name="dataSaida" innerRef={register} placeholder="selecione uma data de saída para filtrar" onChange={handleChangeDataSaida} />
                        </div>
                        <div className="d-flex">
                            <div className="mr-2">
                                <Button color="primary" onClick={limparFiltro}>Limpar</Button>
                            </div>
                            <div className="mr-2">
                                <ReactToPrint
                                    trigger={() => <Button color="primary">Imprimir</Button>}
                                    content={() => componentRef.current}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" ref={componentRef} >
                <h4 className="font-weight-normal my-2">Relatório de Participação Analítico</h4>
                {tabelas}
            </div>
        </>
    );
};

export default RelatorioParticipacaoAnalitico;