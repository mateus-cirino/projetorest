import {FC, useEffect, useRef, useState} from "react";
import {recuperarRelatorioParticipacao} from "../../../../servicos/evento.servico";
import {useToasts} from "react-toast-notifications";
import {Button, Label, Table} from "reactstrap";
import React from "react";
import {EventoPessoa} from "../../../../modelos/eventoPessoa";
import moment from "moment";
import ReactToPrint from "react-to-print";
import {TIPO_USUARIO_ENUM} from "../../../../utils/tipoUsuarioEnum";
import Select from "react-select";
import {Evento} from "../../../../modelos/evento";
import {buscarTodos} from "../../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO} from "../../../../utils/nomeClasseVO";

interface DadosRelatorio {
    evento?: Evento;
    participante?: string;
    cpf?: string;
    matricula?: string;
    dataInscricao?: string;
}

const RelatorioParticipacao = () => {
    const [eventosOptions, setEventosOptions] = useState([]);
    const [selectEventoValue, setSelectEventoValue] = useState(null);
    const [dadosRelatorios, setDadosRelatorios] = useState(null);
    const [dadosRelatoriosFiltro, setDadosRelatoriosFiltro] = useState(null);
    const [tabelas, setTabelas] = useState(null);
    const { addToast } = useToasts();
    const componentRef = useRef();
    useEffect(() => {
        recuperarRelatorioParticipacao({
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: resultado => {
                const dadosRel = resultado.map((eventoPessoa: EventoPessoa) => {
                                                const dadosRelatorio: DadosRelatorio = {
                                                    evento: eventoPessoa.evento,
                                                    participante: eventoPessoa.pessoa.nome,
                                                    cpf: eventoPessoa.pessoa.cpf,
                                                    matricula: eventoPessoa.pessoa.matricula,
                                                    dataInscricao: moment(eventoPessoa.dataPresenca).format('DD/MM/YYYY')
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
            }
        })
    }, []);
    const separarTabelaData = (dadosRel) => {
        setTabelas(null);
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
    };
    const gerarTabela = (dados, data) => {
        const body = dados.map(dado =>
                                              <tr key={dado.matricula + dado.evento}>
                                                  <th scope="row">{dado.evento.nome}</th>
                                                  <td>{dado.participante}</td>
                                                  <td>{dado.cpf}</td>
                                                  <td>{dado.matricula}</td>
                                                  <td>{dado.dataInscricao}</td>
                                              </tr>);
        return (
            <div>
                <h1>{data}</h1>
                <Table striped>
                    <thead>
                    <tr>
                        <th>Evento</th>
                        <th>Participante</th>
                        <th>CPF</th>
                        <th>Matrícula</th>
                        <th>Data de Inscrição</th>
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
        separarTabelaData(dadosRelatoriosFiltro.filter((dados: DadosRelatorio) => dados.evento.id === props.value));
    };
    const limparFiltro = () => {
        setSelectEventoValue(null);
        separarTabelaData(dadosRelatorios);
    };
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center align-items-end mb-2">
                    <div className="col-8 mx-2">
                        <Label for="evento">Eventos</Label>
                        <Select
                            placeholder="selecione o evento para filtrar"
                            name="evento"
                            value={selectEventoValue}
                            options={eventosOptions}
                            onChange={handleChangeEvento}
                        />
                    </div>
                    <div className="mx-2">
                        <Button color="primary" onClick={limparFiltro}>Limpar</Button>
                    </div>
                    <div className="mx-2">
                        <ReactToPrint
                            trigger={() => <Button color="primary">Imprimir</Button>}
                            content={() => componentRef.current}/>
                    </div>
                </div>
            </div>
            <div className="container" ref={componentRef} >
                {tabelas}
            </div>
        </>
    );
};

export default RelatorioParticipacao;