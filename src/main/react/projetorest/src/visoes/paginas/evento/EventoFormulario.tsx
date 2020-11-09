import React, {FC, useEffect, useState} from "react";
import {Evento} from "../../../modelos/evento";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {Endereco} from "../../../modelos/endereco";
import {FormularioProps} from "../../componentes/extensoes/formularioProps";
import {CLASS_NAME_EVENTO, CLASS_NAME_ENDERECO} from "../../../utils/nomeClasseVO";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {useToasts} from "react-toast-notifications";
import {TIPO_USUARIO_ENUM} from "../../../utils/tipoUsuarioEnum";
import Select from "react-select";

const EventoFormulario: FC<FormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register, errors} = useForm<any>();
    const history = useHistory();
    const [enderecosOptions, setEnderecosOptions] = useState(null);
    const [enderecoSelected, setEnderecoSelected] = useState(null);
    const { addToast } = useToasts();
    useEffect(() => {
        setTimeout(() => {
            register('id');
            register('usuario');
            if (selectedItem !== null) {
                control.setValue('id', selectedItem.id);
                control.setValue('nome', selectedItem.nome);
                control.setValue('descricao', selectedItem.descricao);
                control.setValue('numeroMaxParticipantes', selectedItem.numeroMaxParticipantes);
                control.setValue('dtInicio', selectedItem.dtInicio);
                control.setValue('dtFim', selectedItem.dtFim);
                control.setValue('usuario', selectedItem.usuario);

                const {endereco} = selectedItem;
                setEnderecoSelected({label: endereco.cidade, value: endereco.id});
            }
            carregarEnderecosOptions();
        }, 800);
    }, []);
    const onSubmit = (evento: Evento) => {
        evento.usuario = usuarioLogado;
        evento.nomeClasseVO = CLASS_NAME_EVENTO;
        evento.endereco = {
            id: enderecoSelected.value,
            nomeClasseVO: CLASS_NAME_ENDERECO
        };
        const formDataEvento = new FormData();
        formDataEvento.append('dados', JSON.stringify(evento));
        persistir(formDataEvento, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
            },
            funcaoSucesso: resultado => {
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                voltar();

            }
        })
    };
    const voltar = () => {
        if (setSelectedItem) {
            setSelectedItem(null);
        }
        history.goBack();
    };
    const deletar = () => {
        const formData = new FormData();
        const evento = {
            id: control.getValues('id'),
            nomeClasseVO: CLASS_NAME_EVENTO
        };
        formData.append('dados', JSON.stringify(evento));
        remover(formData, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            },
            funcaoSucesso: resultado => {
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                voltar();
            },
        })
    };
    const carregarEnderecosOptions = () => {
        const endereco: Endereco = {
            nomeClasseVO: CLASS_NAME_ENDERECO
        };
        buscarTodos(endereco, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            },
            funcaoSucesso: (enderecos: Endereco[]) => {
                setEnderecosOptions(enderecos.map(endereco => {
                    return {
                        label: endereco.cidade,
                        value: endereco.id
                    }
                }));
            },
        });
    };
    const onChangeEndereco = props => {
        setEnderecoSelected(props);
    };
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="digite o nome do evento" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="descricao">Descrição</Label>
                    <Input type="text" name="descricao" placeholder="digite a descrição do evento" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="numeroMaxParticipantes">N° máximo de pessoas</Label>
                    <Input type="number" name="numeroMaxParticipantes" placeholder="digite o número máximo de pessoas" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="dtInicio">Data de início</Label>
                    <Input type="datetime-local" name="dtInicio" placeholder="digite a data de início do evento" innerRef={register({ required: true })} />
                    {errors.dtInicio && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="dtFim">Data de finalização</Label>
                    <Input type="datetime-local" name="dtFim" placeholder="digite a data de finalização do evento" innerRef={register({ required: true })} />
                    {errors.dtFim && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="endereco.id">Endereço</Label>
                    <Select
                        placeholder="selecione o endereço do pessoa"
                        name="endereco.id"
                        ref={register}
                        options={enderecosOptions}
                        onChange={onChangeEndereco}
                        defaultValue={selectedItem === null ? null : { label: selectedItem.endereco.cidade, value: selectedItem.endereco.id }}
                    />
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <Button className="m-2" type="submit" color="success" disabled={usuarioLogado === null || usuarioLogado.tipoUsuario !== TIPO_USUARIO_ENUM[0].value}>Enviar</Button>
                    <Button className="m-2" color="danger" onClick={deletar} disabled={usuarioLogado === null || usuarioLogado.tipoUsuario !== TIPO_USUARIO_ENUM[0].value || selectedItem === null}>Deletar</Button>
                    <Button className="m-2" color="primary" onClick={voltar}>Voltar</Button>
                </div>
            </Form>
        </div>
    );
};

export default EventoFormulario;