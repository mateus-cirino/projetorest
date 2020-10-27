import React, {Dispatch, FC, useEffect} from "react";
import {CLASS_NAME, Endereco} from "../../../modelos/endereco";
import {Button, Form, FormGroup, Input, Label, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {persistir, remover} from "../../../servicos/geral.servico";
import {Usuario} from "../../../modelos/usuario";

interface EnderecoFormularioProps {
    usuarioLogado: Usuario;
    selectedItem?: any;
    setSelectedItem?: Dispatch<Endereco>;
}

const EnderecoFormulario: FC<EnderecoFormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register} = useForm<Endereco>();
    const history = useHistory();
    useEffect(() => {
        register('id');
        register('nomeClasseVO');
        if (selectedItem !== null) {
            control.setValue('id', selectedItem.id);
            control.setValue('estado', selectedItem.estado);
            control.setValue('cidade', selectedItem.cidade);
            control.setValue('rua', selectedItem.rua);
            control.setValue('numero', selectedItem.numero);
        }
    }, []);
    const onSubmit = (endereco: Endereco) => {
        // @ts-ignore
        endereco.nomeClasseVO = CLASS_NAME;
        const formData = new FormData();
        formData.append('dados', JSON.stringify(endereco));
        persistir(formData, {
            funcaoSucesso: resultado => {
                history.push('/endereco/buscartodos');
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
        const endereco = {
            id: control.getValues('id'),
            nomeClasseVO: CLASS_NAME
        };
        formData.append('dados', JSON.stringify(endereco));
        remover(formData, {
            funcaoSucesso: resultado => {
                history.push('/endereco/buscartodos');
            }, funcaoErro: mensagem => {
                console.log(mensagem);
            }
        })
    };
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="estado">Estado</Label>
                    <Input type="text" name="estado" placeholder="digite o estado" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="cidade">Cidade</Label>
                    <Input type="text" name="cidade" placeholder="digite a cidade" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="rua">Password</Label>
                    <Input type="text" name="rua" placeholder="digite a rua" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="numero">Número</Label>
                    <Input type="number" name="numero" placeholder="digite o número" innerRef={register} />
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

export default EnderecoFormulario;