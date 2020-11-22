import {FC, useEffect, useRef, useState} from "react";
import {recuperarRelatorioParticipacao} from "../../../../servicos/evento.servico";
import {useToasts} from "react-toast-notifications";
import {Button, Table} from "reactstrap";
import React from "react";
import {EventoPessoa} from "../../../../modelos/eventoPessoa";
import moment from "moment";
import ReactToPrint from "react-to-print";
import {TIPO_USUARIO_ENUM} from "../../../../utils/tipoUsuarioEnum";

interface DadosRelatorio {
    evento?: string;
    participante?: string;
    cpf?: string;
    matricula?: string;
    dataInscricao?: string;
}

const RelatorioParticipacao = () => {
    const [tabelas, setTabelas] = useState(null);
    const { addToast } = useToasts();
    const componentRef = useRef();
    useEffect(() => {
        recuperarRelatorioParticipacao({
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: resultado => {
                const dadosRelatorio = resultado.map((eventoPessoa: EventoPessoa) => {
                                                const dadosRelatorio: DadosRelatorio = {
                                                    evento: eventoPessoa.evento.nome,
                                                    participante: eventoPessoa.pessoa.nome,
                                                    cpf: eventoPessoa.pessoa.cpf,
                                                    matricula: eventoPessoa.pessoa.matricula,
                                                    dataInscricao: moment(eventoPessoa.dataPresenca).format('DD/MM/YYYY')
                                                };
                                                return dadosRelatorio;
                                            });
                separarTabelaData(dadosRelatorio);
            }
        })
    }, []);
    const separarTabelaData = (dadosRelatorio) => {
        let data = dadosRelatorio[0].dataInscricao;
        let dados = [];
        let tabelas = [];
        dadosRelatorio.forEach((value: DadosRelatorio) => {
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
                                                  <th scope="row">{dado.evento}</th>
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
    return (
        <>
            <div className="container d-flex justify-content-end">
            <ReactToPrint
                trigger={() => <Button className="m-2" color="primary">Imprimir</Button>}
                content={() => componentRef.current}/>
            </div>
            <div className="container" ref={componentRef} >
                {tabelas}
            </div>
        </>
    );
};

export default RelatorioParticipacao;