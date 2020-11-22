import {FC, useEffect, useState} from "react";
import {recuperarRelatorioParticipacao} from "../../../../servicos/evento.servico";
import {useToasts} from "react-toast-notifications";
import {Table} from "reactstrap";
import React from "react";
import {EventoPessoa} from "../../../../modelos/eventoPessoa";
import moment from "moment";

interface DadosRelatorio {
    evento?: string;
    participante?: string;
    cpf?: string;
    matricula?: string;
    dataInscricao?: string;
}

const RelatorioParticipacao = () => {
    const [tabelas, setTabelas] = useState(null);
    const [tabelasBody, setTabelasBody] = useState(null);
    const { addToast } = useToasts();
    useEffect(() => {
        recuperarRelatorioParticipacao({
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: resultado => {
                separarTabelaData(resultado.map((eventoPessoa: EventoPessoa) => {
                    const dadosRelatorio: DadosRelatorio = {
                        evento: eventoPessoa.evento.nome,
                        participante: eventoPessoa.pessoa.nome,
                        cpf: eventoPessoa.pessoa.cpf,
                        matricula: eventoPessoa.pessoa.matricula,
                        dataInscricao: moment(eventoPessoa.dataPresenca).format('DD/MM/YYYY')
                    };
                    return dadosRelatorio;
                }));
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
                dados = [];
                dados.push(value);
                data = value.dataInscricao;
            }
        });
        tabelas.push(gerarTabela(dados, data));
        setTabelas(<div>{tabelas}</div>);
    };
    const gerarTabela = (dados, data) => {
        const corpoTabela = dados.map(dado =>
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
                    {corpoTabela}
                    </tbody>
                </Table>
            </div>
        )
    };
    const gerarCorpoTabela = (dados) => {
        return (
            <tbody>
            {dados.forEach(dado =>
                               <tr>
                                   <th scope="row">{dado.evento}</th>
                                   <td>{dado.participante}</td>
                                   <td>{dado.cpf}</td>
                                   <td>{dado.matricula}</td>
                                   <td>{dado.dataInscricao}</td>
                               </tr>)}
            </tbody>
        );
    };
    return (
        <div>{tabelas}</div>
    );
};

export default RelatorioParticipacao;