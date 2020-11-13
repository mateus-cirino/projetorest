import React, {useEffect, useState} from "react";
import {buscarTodos, persistir} from "../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO, CLASS_NAME_EVENTO_PESSOA, CLASS_NAME_PESSOA} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {Button, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Select from "react-select";
import {useForm} from "react-hook-form";
import {Evento} from "../../../modelos/evento";
import {confirmarPresencaEvento, recuperarEventoPessoa, recuperarPessoasRelacionadosEvento} from "../../../servicos/evento.servico";
import {SUCESSO} from "../../../utils/mensagensRequisicao";

interface PresencaEventoPessoaProps {
    matricula?: string;
}

const PresencaEventoPessoa = () => {
    const [eventoSelecionado, setEventoSelecionado] = useState<Evento>(null);
    const [eventosOptions, setEventosOptions] = useState<Object[]>([]);
    const { addToast } = useToasts();
    const { control, register } = useForm<PresencaEventoPessoaProps>();
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
        console.log(control.getValues())
        const { matricula } = control.getValues();
        confirmarPresencaEvento(eventoSelecionado.id, matricula, {
            funcaoErro: mensagem => addToast(mensagem, {appearance: "error", autoDismiss: true}),
            funcaoSucesso: resultado => {
                if (resultado) {
                    addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                } else {
                    addToast("Matrícula não encontrada", {appearance: "error", autoDismiss: true})
                }
            }
        })
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
                    <Label for="matricula">Matrícula</Label>
                    <Input name="matricula" innerRef={register} placeholder="digite a matrícula da pessoa para confirmar a presença" />
                </FormGroup>
                <Row className="d-flex justify-content-end m-2">
                    <Button color="primary" onClick={handleClickConfirma}>Confirmar</Button>
                </Row>
            </Form>
        </div>
    );
};

export default PresencaEventoPessoa;