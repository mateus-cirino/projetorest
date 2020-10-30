import React, {FC, useEffect, useState} from "react";
import {Evento} from "../../../modelos/evento";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {Endereco} from "../../../modelos/endereco";
import {FormularioProps} from "../../componentes/extensoes/formularioProps";
import {CLASS_NAME_EVENTO, CLASS_NAME_ENDERECO, CLASS_NAME_CLIENTE} from "../../../utils/nomeClasseVO";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {useToasts} from "react-toast-notifications";
import {TIPO_USUARIO_ENUM} from "../../../utils/tipoUsuarioEnum";
import {Cliente} from "../../../modelos/cliente";

const EventoFormulario: FC<FormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register, errors} = useForm<any>();
    const history = useHistory();
    const [enderecos, setEnderecos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const { addToast } = useToasts();
    useEffect(() => {
        setTimeout(() => {
            register('id');
            register('nomeClasseVO');
            register('endereco.id');
            register('clientes');
            register('usuario');
            if (selectedItem !== null) {
                control.setValue('id', selectedItem.id);
                control.setValue('nome', selectedItem.nome);
                control.setValue('descricao', selectedItem.descricao);
                control.setValue('numeroMaxParticipantes', selectedItem.numeroMaxParticipantes);
                control.setValue('endereco.id', selectedItem.endereco.id);
                control.setValue('dtInicio', selectedItem.dtInicio);
                control.setValue('clientes', selectedItem.clientes);
                control.setValue('usuario', selectedItem.usuario);
            }
            carregarEnderecos();
            carregarClientes();
        }, 800);
    }, []);
    const onSubmit = (evento: Evento) => {
        evento.usuario = usuarioLogado;
        evento.nomeClasseVO = CLASS_NAME_EVENTO;
        evento.endereco.id = control.getValues('endereco.id');
        evento.endereco.nomeClasseVO = CLASS_NAME_ENDERECO;
        evento.clientes = control.getValues('clientes').map(id => {
            return {
                id: id,
                nomeClasseVO: CLASS_NAME_CLIENTE
            };
        });
        const formData = new FormData();
        formData.append('dados', JSON.stringify(evento));
        persistir(formData, {
            funcaoSucesso: resultado => {
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                voltar();
            }, funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
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
            funcaoSucesso: resultado => {
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                voltar();
            }, funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            }
        })
    };
    const carregarEnderecos = () => {
        const endereco: Endereco = {
            nomeClasseVO: CLASS_NAME_ENDERECO
        };
        buscarTodos(endereco, {
            funcaoSucesso: (enderecos: Endereco[]) => {
                setEnderecos(enderecos);
            },
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            }
        });
    };
    const carregarClientes = () => {
        const cliente: Cliente = {
            nomeClasseVO: CLASS_NAME_CLIENTE
        };
        buscarTodos(cliente, {
            funcaoSucesso: (clientes: Cliente[]) => {
                setClientes(clientes);
            },
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            }
        });
    };
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="digite o nome do cliente" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="descricao">Descrição</Label>
                    <Input type="text" name="descricao" placeholder="digite a descrição do evento" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="numeroMaxParticipantes">N° máximo de clientes</Label>
                    <Input type="number" name="numeroMaxParticipantes" placeholder="digite o número máximo de clientes" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="dtInicio">Data de início</Label>
                    <Input type="date" name="dtInicio" placeholder="digite a data de início do evento" innerRef={register({ required: true })} />
                    {errors.dtInicio && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="dtFim">Data de finalização</Label>
                    <Input type="date" name="dtFim" placeholder="digite a data de finalização do evento" innerRef={register({ required: true })} />
                    {errors.dtFim && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="endereco">Endereço</Label>
                    <Input type="select" name="endereco.id" innerRef={register} defaultValue={selectedItem === null ? null
                                                                                                                    : selectedItem.endereco.id}>
                        {enderecos.map((endereco, index) => <option key={index} value={endereco.id}>{endereco.cidade}</option>)}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="clientes">Clientes</Label>
                    <Input type="select" multiple={true} name="clientes" innerRef={register} defaultValue={selectedItem === null ? null
                                                                                                                    : selectedItem.clientes.map(cliente => cliente.id)}>
                        {clientes.map((cliente, index) => <option key={index} value={cliente.id}>{cliente.nome}</option>)}
                    </Input>
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