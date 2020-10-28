import React, {FC, useEffect, useState} from "react";
import {Cliente} from "../../../modelos/cliente";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {Endereco} from "../../../modelos/endereco";
import {FormularioProps} from "../../componentes/extensoes/formularioProps";
import {CLASS_NAME_CLIENTE, CLASS_NAME_ENDERECO} from "../../../utils/nomeClasseVO";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {useToasts} from "react-toast-notifications";

const ClienteFormulario: FC<FormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register, errors} = useForm<Cliente>();
    const history = useHistory();
    const [enderecos, setEnderecos] = useState([]);
    const { addToast } = useToasts();
    useEffect(() => {
        setTimeout(() => {
            register('id');
            register('nomeClasseVO');
            register('endereco.id');
            if (selectedItem !== null) {
                control.setValue('id', selectedItem.id);
                control.setValue('nome', selectedItem.nome);
                control.setValue('cpf', selectedItem.cpf);
                control.setValue('rg', selectedItem.rg);
                control.setValue('matricula', selectedItem.matricula);
                control.setValue('endereco.id', selectedItem.endereco.id);
                control.setValue('eventos', selectedItem.eventos);
                }
            carregarEnderecos();
        }, 800);
    }, []);
    const onSubmit = (cliente: Cliente) => {
        cliente.nomeClasseVO = CLASS_NAME_CLIENTE;
        cliente.endereco.id = control.getValues('endereco.id');
        cliente.endereco.nomeClasseVO = CLASS_NAME_ENDERECO;
        const formData = new FormData();
        formData.append('dados', JSON.stringify(cliente));
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
        const cliente = {
            id: control.getValues('id'),
            nomeClasseVO: CLASS_NAME_CLIENTE,
        };
        formData.append('dados', JSON.stringify(cliente));
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
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="digite o nome do cliente" innerRef={register({ required: true })} />
                    {errors.nome && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="cpf">CPF</Label>
                    <Input type="text" name="cpf" placeholder="digite o cpf do cliente" innerRef={register({ required: true })} />
                    {errors.cpf && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="rg">RG</Label>
                    <Input type="text" name="rg" placeholder="digite o rg do cliente" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="matricula">Matrícula</Label>
                    <Input type="text" name="matricula" placeholder="digite a matrícula do cliente" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="endereco">Endereço</Label>
                    <Input type="select" name="endereco.id" innerRef={register} defaultValue={selectedItem === null ? null
                                                                                                                    : selectedItem.endereco.id}>
                        {enderecos.map(endereco => <option value={endereco.id}>{endereco.cidade}</option>)}
                    </Input>
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <Button className="m-2" type="submit" color="success" disabled={usuarioLogado === null}>Enviar</Button>
                    <Button className="m-2" color="danger" onClick={deletar} disabled={usuarioLogado === null || false}>Deletar</Button>
                    <Button className="m-2" color="primary" onClick={voltar}>Voltar</Button>
                </div>
            </Form>
        </div>
    );
};

export default ClienteFormulario;