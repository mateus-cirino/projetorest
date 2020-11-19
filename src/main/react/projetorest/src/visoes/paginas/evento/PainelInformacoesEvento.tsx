import React, {useEffect, useState} from "react";
import {buscarTodos} from "../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {Evento} from "../../../modelos/evento";
import Select from "react-select";
import {
    recuperarTotalEventosCadastrados,
    recuperarTotalPessoasCadastradas,
    recuperarTotalInscricoes,
    recuperarTotalInscricoesConfirmadas, recuperarTotalInscricoesEvento, recuperarTotalInscricoesConfirmadasEvento
} from "../../../servicos/evento.servico";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";

const PainelInformacoesEvento = () => {
    const { addToast } = useToasts();
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventosOptions, setEventosOptions] = useState([]);
    const [totalEventosCadastrados, setTotalEventosCadastrados] = useState(0);
    const [totalPessoasCadastradas, setTotalPessoasCadastradas] = useState(0);
    const [totalInscricoes, setTotalInscricoes] = useState(0);
    const [totalInscricoesConfirmadas, setTotalInscricoesConfirmadas] = useState(0);
    useEffect(() => {
        const entidade = {
            nomeClasseVO: CLASS_NAME_EVENTO
        };
        buscarTodos(entidade, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
            },
            funcaoSucesso: (resultado: Evento[]) => setEventosOptions(resultado.map(e => {
                return { value: e.id, label: e.nome };
            }))
        });
        recuperarTotalEventosCadastrados({
                                             funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                             funcaoSucesso: resultado => setTotalEventosCadastrados(resultado)
        });
        recuperarTotalPessoasCadastradas({
                                             funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                             funcaoSucesso: resultado => setTotalPessoasCadastradas(resultado)
                                         });
        recuperarTotalInscricoes({
                                             funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                             funcaoSucesso: resultado => setTotalInscricoes(resultado)
                                         });
        recuperarTotalInscricoesConfirmadas({
                                     funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                     funcaoSucesso: resultado => setTotalInscricoesConfirmadas(resultado)
                                 });

    }, []);
    const onChangeEvento = props => {
        const idEvento = props.value;
        recuperarTotalInscricoesEvento(idEvento, {
                                     funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                     funcaoSucesso: resultado => setTotalInscricoes(resultado)
                                 });
        recuperarTotalInscricoesConfirmadasEvento(idEvento, {
                                                funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                                funcaoSucesso: resultado => setTotalInscricoesConfirmadas(resultado)
                                            });

    };
    const limparFiltro = () => {
        setEventoSelecionado(null);
    };
    return (
        <div className="container m-auto col-md-12 col-xl-10 border rounded p-2">
            <Select
                placeholder="selecione um evento para trazer dados específicos"
                name="evento"
                value={eventoSelecionado}
                options={eventosOptions}
                onChange={onChangeEvento}
            />
            <Row>
                <Col sm="6">
                    <Card body>
                        <CardTitle tag="h5">Total de Eventos Cadastrados</CardTitle>
                        <CardText>{totalEventosCadastrados}</CardText>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                        <CardTitle tag="h5">Total de Pessoas Cadastrados</CardTitle>
                        <CardText>{totalPessoasCadastradas}</CardText>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                        <CardTitle tag="h5">Total de inscrições realizadas</CardTitle>
                        <CardText>{totalInscricoes}</CardText>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                        <CardTitle tag="h5">Total de inscrições confirmadas</CardTitle>
                        <CardText>{totalInscricoesConfirmadas}</CardText>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card body>
                        <CardTitle tag="h5">Relação entre as inscrições e as confirmações</CardTitle>
                        <CardText>{totalInscricoes/totalInscricoesConfirmadas}</CardText>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PainelInformacoesEvento;