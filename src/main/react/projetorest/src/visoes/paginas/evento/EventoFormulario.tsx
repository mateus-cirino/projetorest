import React, {FC, useEffect, useState} from "react";
import {Evento} from "../../../modelos/evento";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {Endereco} from "../../../modelos/endereco";
import {FormularioProps} from "../../componentes/extensoes/formularioProps";
import {CLASS_NAME_EVENTO, CLASS_NAME_ENDERECO, CLASS_NAME_CLIENTE, CLASS_NAME_EVENTO_CLIENTE} from "../../../utils/nomeClasseVO";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {useToasts} from "react-toast-notifications";
import {TIPO_USUARIO_ENUM} from "../../../utils/tipoUsuarioEnum";
import {Cliente} from "../../../modelos/cliente";
import Select from "react-select";
import {adicionarClientesEvento, recuperarClientesEvento} from "../../../servicos/evento.servico";

const EventoFormulario: FC<FormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register, errors} = useForm<any>();
    const history = useHistory();
    const [enderecosOptions, setEnderecosOptions] = useState(null);
    const [enderecoSelected, setEnderecoSelected] = useState(null);
    const [clientesOptions, setClientesOptions] = useState(null);
    const [clientesSelected, setClientesSelected] = useState(null);
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
                control.setValue('usuario', selectedItem.usuario);
                recuperarClientesEvento(selectedItem, {
                    funcaoSucesso: (clientesEvento) => {
                        const clientes = clientesEvento.map((cliente: Cliente) => {
                            return {
                                label: cliente.nome,
                                value: cliente.id
                            };
                        });
                        setClientesSelected([{label: "Mateus", value: 1}]);
                        const {endereco} = selectedItem;
                        setEnderecoSelected({label: endereco.cidade, value: endereco.id});
                    },
                    funcaoErro: mensagem => {
                        addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
                    }
                })
            }
            carregarEnderecosOptions();
            carregarClientesOptions();
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
            funcaoSucesso: (evento: Evento) => {
                const eventosClientes = clientesSelected.map(clienteOption => {
                    return {
                        evento: {
                          id: evento.id,
                          nomeClasseVO: CLASS_NAME_EVENTO
                        },
                        cliente: {
                            id: clienteOption.value,
                            nomeClasseVO: CLASS_NAME_CLIENTE
                        },
                    }
                });
                adicionarClientesEvento(eventosClientes, {
                    funcaoSucesso: resultado => {
                        addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                        voltar();
                    },
                    funcaoErro: mensagem => {
                        addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
                    }
                })
            }, funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
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
    const carregarEnderecosOptions = () => {
        const endereco: Endereco = {
            nomeClasseVO: CLASS_NAME_ENDERECO
        };
        buscarTodos(endereco, {
            funcaoSucesso: (enderecos: Endereco[]) => {
                setEnderecosOptions(enderecos.map(endereco => {
                    return {
                        label: endereco.cidade,
                        value: endereco.id
                    }
                }));
            },
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            }
        });
    };
    const onChangeEndereco = props => {
        setEnderecoSelected(props);
    };
    const carregarClientesOptions = () => {
        const cliente: Cliente = {
            nomeClasseVO: CLASS_NAME_CLIENTE
        };
        buscarTodos(cliente, {
            funcaoSucesso: (clientes: Cliente[]) => {
                setClientesOptions(clientes.map(cliente => {
                    return {
                        label: cliente.nome,
                        value: cliente.id
                    };
                }));
            },
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            }
        });
    };
    const onChangeClientes = props => {
        setClientesSelected(props);
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
                    <Label for="endereco.id">Endereço</Label>
                    <Select
                        placeholder="selecione o endereço do cliente"
                        name="endereco.id"
                        ref={register}
                        options={enderecosOptions}
                        onChange={onChangeEndereco}
                        defaultValue={selectedItem === null ? null : { label: selectedItem.endereco.cidade, value: selectedItem.endereco.id }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="clientes.id">Clientes</Label>
                    <Select
                        placeholder="selecione os clientes que participarão do evento"
                        name="clientes.id"
                        ref={register}
                        options={clientesOptions}
                        onChange={onChangeClientes}
                        isMulti={true}
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