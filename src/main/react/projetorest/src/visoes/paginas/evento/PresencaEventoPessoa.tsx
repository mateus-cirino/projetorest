import React, {useEffect, useState} from "react";
import {buscarTodos, persistir} from "../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO, CLASS_NAME_EVENTO_PESSOA, CLASS_NAME_PESSOA} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {Button, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import {useForm} from "react-hook-form";
import {Evento} from "../../../modelos/evento";
import {confirmarPresencaEvento} from "../../../servicos/evento.servico";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {CPF, NOME, RG, TIPO_CREDENCIAMENTO_ENUM} from "../../../utils/tipoCredenciamentoEnum";

interface PresencaEventoPessoaProps {
    nome?: string;
    cpf?: string;
    rg?: string;
    tipoCredenciamento?: string;
}

const PresencaEventoPessoa = () => {
    const [eventoSelecionado, setEventoSelecionado] = useState<Evento>(null);
    const [eventosOptions, setEventosOptions] = useState<Object[]>([]);
    const { addToast } = useToasts();
    const { control, register } = useForm<PresencaEventoPessoaProps>();
    const [tipoCredenciamentoNome, setTipoCredenciamentoNome] = useState(true);
    const [tipoCredenciamentoCPF, setTipoCredenciamentoCPF] = useState(false);
    const [tipoCredenciamentoRG, setTipoCredenciamentoRG] = useState(false);
    useEffect(() => {
        const entidade: Evento = {
            nomeClasseVO: CLASS_NAME_EVENTO
        };
        buscarTodos(entidade, {
            funcaoErro: mensagem => addToast(mensagem, {appearance: "error", autoDismiss: true}),
            funcaoSucesso: resultado => setEventosOptions(resultado.map((value: Evento) => {
                    return {
                        value: value.id,
                        label: value.nome
                    }}))
        })
    }, []);
    const handleChangeEvento = props => {
        const evento: Evento = {
            id: props.value,
            nomeClasseVO: CLASS_NAME_EVENTO
        };
        setEventoSelecionado(evento);
    };
    const handleClickConfirma = () => {
        let credencial;
        const { tipoCredenciamento } = control.getValues();
        if (tipoCredenciamento === NOME.value) {
            credencial = control.getValues().nome;
        } else if (tipoCredenciamento === CPF.value) {
            credencial = control.getValues().cpf;
        } else {
            credencial = control.getValues().rg;
        }
        confirmarPresencaEvento(eventoSelecionado.id, credencial, tipoCredenciamento, {
            funcaoErro: mensagem => addToast(mensagem, {appearance: "error", autoDismiss: true}),
            funcaoSucesso: resultado => {
                if (resultado) {
                    addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                } else {
                    addToast("Registro não encontrado", {appearance: "error", autoDismiss: true})
                }
            }
        })
    };
    const handleChangeTipoCredenciamento = () => {
        const { tipoCredenciamento } = control.getValues();
        if (tipoCredenciamento === NOME.value) {
            setTipoCredenciamentoNome(true);
            setTipoCredenciamentoCPF(false);
            setTipoCredenciamentoRG(false);
        } else if (tipoCredenciamento === CPF.value) {
            setTipoCredenciamentoNome(false);
            setTipoCredenciamentoCPF(true);
            setTipoCredenciamentoRG(false);
        } else {
            setTipoCredenciamentoNome(false);
            setTipoCredenciamentoCPF(false);
            setTipoCredenciamentoRG(true);
        }
    };
    return (
        <div className="container m-auto col-md-12 col-xl-4">
            <Form className="border rounded p-2">
                <FormGroup>
                    <Label for="evento">Eventos</Label>
                    <Select
                        placeholder="selecione o evento para confirmar presença"
                        name="evento"
                        options={eventosOptions}
                        onChange={handleChangeEvento}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="tipoCredenciamento">Tipo de credenciamento</Label>
                    <Input type="select" name="tipoCredenciamento" onChange={handleChangeTipoCredenciamento} innerRef={register}>
                        <option value={NOME.value}>{NOME.label}</option>
                        <option value={CPF.value}>{CPF.label}</option>
                        <option value={RG.value}>{RG.label}</option>
                    </Input>
                </FormGroup>
                <FormGroup hidden={!tipoCredenciamentoNome}>
                    <Label for="nome">Nome</Label>
                    <Input name="nome" innerRef={register} placeholder="digite o nome da pessoa para confirmar a presença" />
                </FormGroup>
                <FormGroup hidden={!tipoCredenciamentoCPF}>
                    <Label for="cpf">CPF</Label>
                    <Input name="cpf" innerRef={register} placeholder="digite o cpf da pessoa para confirmar a presença" />
                </FormGroup>
                <FormGroup hidden={!tipoCredenciamentoRG}>
                    <Label for="rg">RG</Label>
                    <Input name="rg" innerRef={register} placeholder="digite o rg da pessoa para confirmar a presença" />
                </FormGroup>
                <Row className="d-flex justify-content-end m-2">
                    <Button color="primary" onClick={handleClickConfirma}>Confirmar</Button>
                </Row>
            </Form>
        </div>
    );
};

export default PresencaEventoPessoa;