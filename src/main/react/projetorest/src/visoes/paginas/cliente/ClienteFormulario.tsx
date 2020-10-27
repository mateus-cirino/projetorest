import React, {FC, useEffect, useState} from "react";
import {CLASS_NAME, Cliente} from "../../../modelos/cliente";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {Endereco} from "../../../modelos/endereco";
import Select from "react-select";
import FormularioProps from "../../componentes/extensoes/formularioProps";

const ClienteFormulario: FC<FormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register} = useForm<Cliente>();
    const history = useHistory();
    const [enderecosOptions, setEnderecosOptions] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            register('id');
            register('nomeClasseVO');
            register('endereco');
            if (selectedItem !== null) {
                control.setValue('nome', selectedItem.nome);
                control.setValue('cpf', selectedItem.cpf);
                control.setValue('rg', selectedItem.rg);
                control.setValue('matricula', selectedItem.matricula);
                control.setValue('endereco', selectedItem.endereco);
                control.setValue('eventos', selectedItem.eventos);
            }
            carregarEnderecos();
        }, 800);
    }, []);
    const onSubmit = (cliente: Cliente) => {
        // @ts-ignore
        cliente.nomeClasseVO = CLASS_NAME;
        const formData = new FormData();
        formData.append('dados', JSON.stringify(cliente));
        persistir(formData, {
            funcaoSucesso: resultado => {
                history.push('/cliente/buscartodos');
            }, funcaoErro: mensagem => {
                console.log(mensagem);
            }
        })
    };
    const voltar = () => {
        if (setSelectedItem) {
            // @ts-ignore
            setSelectedItem(null);
        }
        history.goBack();
    };
    const deletar = () => {
        const formData = new FormData();
        const cliente = {
            id: control.getValues('id'),
            nomeClasseVO: CLASS_NAME
        };
        formData.append('dados', JSON.stringify(cliente));
        remover(formData, {
            funcaoSucesso: resultado => {
                history.push('/cliente/buscartodos');
            }, funcaoErro: mensagem => {
                console.log(mensagem);
            }
        })
    };
    const carregarEnderecos = () => {
        const endereco: Endereco = {
            nomeClasseVO: 'com.mateus.projetorest.modelos.Endereco'
        };
        buscarTodos(endereco, {
            funcaoSucesso: (enderecos: Endereco[]) => {
                // @ts-ignore
                setEnderecosOptions(enderecos.map((endereco => {
                    return {value: endereco, label: `${endereco.id}-${endereco.cidade}`}
                })));
            },
            funcaoErro: mensagem => {
                //alert(mensagem);
            }
        });
    };
    const handleChangeEnderecoOption = (selectedOption: any) => {
        control.setValue('endereco', selectedOption.value);
    };
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="digite o nome do cliente" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="cpf">CPF</Label>
                    <Input type="text" name="cpf" placeholder="digite o cpf do cliente" innerRef={register} />
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
                    <Select options={enderecosOptions} name="endereco" placeholder="selecione o seu endereco" onChange={handleChangeEnderecoOption} />
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <Button className="m-2" type="submit" color="success" disabled={usuarioLogado === null}>Enviar</Button>
                    <Button className="m-2" color="danger" onClick={deletar} disabled={usuarioLogado === null || selectedItem === null}>Deletar</Button>
                    <Button className="m-2" color="primary" onClick={voltar}>Voltar</Button>
                </div>
            </Form>
        </div>
    );
};

export default ClienteFormulario;