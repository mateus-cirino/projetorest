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
import {Button, Card, CardBody, CardGroup, CardSubtitle, CardText, CardTitle, Col, Row} from "reactstrap";

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
        setEventoSelecionado(props);
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
        recuperarTotalInscricoes({
                                     funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                     funcaoSucesso: resultado => setTotalInscricoes(resultado)
        });
        recuperarTotalInscricoesConfirmadas({
                                                funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
                                                funcaoSucesso: resultado => setTotalInscricoesConfirmadas(resultado)
        });
    };
    return (
        <div className="container m-auto col-md-12 col-xl-10 border rounded p-2">
            <div className="d-flex justify-content-center">
                <Select
                    placeholder="selecione um evento para trazer dados específicos"
                    name="evento"
                    value={eventoSelecionado}
                    options={eventosOptions}
                    onChange={onChangeEvento}
                    className="w-75 m-2"
                />
                <Button className="m-2" color="primary" onClick={limparFiltro}>Limpar</Button>
            </div>
            <CardGroup className="text-center">
                <Card className="m-2 border rounded text-white" color="primary">
                    <CardBody>
                        <CardTitle tag="h5">Total de Eventos Cadastrados</CardTitle>
                        <CardText tag="h5">{totalEventosCadastrados}</CardText>
                    </CardBody>
                </Card>
                <Card className="m-2 border rounded text-white" color="success">
                    <CardBody>
                        <CardTitle tag="h5">Total de Pessoas Cadastrados</CardTitle>
                        <CardText tag="h5">{totalPessoasCadastradas}</CardText>
                    </CardBody>
                </Card>
                <Card className="m-2 border rounded text-white" color="info">
                    <CardBody>
                        <CardTitle tag="h5">Total de inscrições realizadas</CardTitle>
                        <CardText tag="h5">{totalInscricoes}</CardText>
                    </CardBody>
                </Card>
                <Card className="m-2 border rounded text-white" color="warning">
                    <CardBody>
                        <CardTitle tag="h5">Total de inscrições confirmadas</CardTitle>
                        <CardText tag="h5">{totalInscricoesConfirmadas}</CardText>
                    </CardBody>
                </Card>
                <Card className="m-2 border rounded text-white" color="danger">
                    <CardBody>
                        <CardTitle tag="h5">Relação entre as inscrições e as confirmações</CardTitle>
                        <CardText tag="h5">{totalInscricoes/totalInscricoesConfirmadas}</CardText>
                    </CardBody>
                </Card>
            </CardGroup>
        </div>
    );
};

export default PainelInformacoesEvento;