import React, {FC, useEffect, useState} from "react";
import {Pessoa} from "../../../modelos/pessoa";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {Endereco} from "../../../modelos/endereco";
import {FormularioProps} from "../../componentes/extensoes/formularioProps";
import {CLASS_NAME_PESSOA, CLASS_NAME_ENDERECO} from "../../../utils/nomeClasseVO";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {useToasts} from "react-toast-notifications";
import Select from "react-select";

const PessoaFormulario: FC<FormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register, errors} = useForm<Pessoa>();
    const history = useHistory();
    const [enderecosOptions, setEnderecosOptions] = useState(null);
    const [enderecoSelected, setEnderecoSelected] = useState(null);
    const { addToast } = useToasts();
    useEffect(() => {
        setTimeout(() => {
            register('id');
            if (selectedItem !== null) {
                control.setValue('id', selectedItem.id);
                control.setValue('nome', selectedItem.nome);
                control.setValue('cpf', selectedItem.cpf);
                control.setValue('rg', selectedItem.rg);
                control.setValue('matricula', selectedItem.matricula);

                const { endereco } = selectedItem;
                setEnderecoSelected({label: endereco.cidade, value: endereco.id});
            }
            carregarEnderecosOptions();
        }, 100);
    }, []);
    const onSubmit = (pessoa: Pessoa) => {
        pessoa.nomeClasseVO = CLASS_NAME_PESSOA;
        pessoa.endereco = {
            id: enderecoSelected.value,
            nomeClasseVO: CLASS_NAME_ENDERECO
        };
        const formData = new FormData();
        formData.append('dados', JSON.stringify(pessoa));
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
        const pessoa = {
            id: control.getValues('id'),
            nomeClasseVO: CLASS_NAME_PESSOA,
        };
        formData.append('dados', JSON.stringify(pessoa));
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
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="digite o nome do pessoa" innerRef={register({ required: true })} />
                    {errors.nome && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="cpf">CPF</Label>
                    <Input type="text" name="cpf" placeholder="digite o cpf do pessoa" innerRef={register({ required: true })} />
                    {errors.cpf && <span>Este campo é obrigatório</span>}
                </FormGroup>
                <FormGroup>
                    <Label for="rg">RG</Label>
                    <Input type="text" name="rg" placeholder="digite o rg do pessoa" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="matricula">Matrícula</Label>
                    <Input type="text" name="matricula" placeholder="digite a matrícula do pessoa" innerRef={register} />
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
                    <Button className="m-2" type="submit" color="success" disabled={usuarioLogado === null}>Enviar</Button>
                    <Button className="m-2" color="danger" onClick={deletar} disabled={usuarioLogado === null || false}>Deletar</Button>
                    <Button className="m-2" color="primary" onClick={voltar}>Voltar</Button>
                </div>
            </Form>
        </div>
    );
};

export default PessoaFormulario;