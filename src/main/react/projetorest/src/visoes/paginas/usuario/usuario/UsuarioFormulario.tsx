import React, {FC, useEffect} from "react";
import {CLASS_NAME, Usuario} from "../../../../modelos/usuario";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {TIPO_USUARIO_ENUM} from "../../../../modelos/extensoes/tipoUsuarioEnum";
import {persistir, remover} from "../../../../servicos/geral.servico";
import md5 from "md5";
import FormularioProps from "../../../componentes/extensoes/formularioProps";

const UsuarioFormulario: FC<FormularioProps> = props => {
    const {usuarioLogado, selectedItem, setSelectedItem} = props;
    const {control, handleSubmit, register} = useForm<Usuario>();
    const history = useHistory();
    useEffect(() => {
        register('id');
        register('nomeClasseVO');
        if (selectedItem !== null) {
            control.setValue('id', selectedItem.id);
            control.setValue('nome', selectedItem.nome);
            control.setValue('login', selectedItem.login);
            control.setValue('senha', selectedItem.senha);
            control.setValue('tipoUsuario', selectedItem.tipoUsuario);
        }
    }, []);
    const onSubmit = (usuario: Usuario) => {
        // @ts-ignore
        usuario.senha = md5(usuario.senha);
        usuario.nomeClasseVO = CLASS_NAME;
        const formData = new FormData();
        formData.append('dados', JSON.stringify(usuario));
        persistir(formData, {
            funcaoSucesso: resultado => {
                history.push('/usuario/buscartodos');
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
        const usuario = {
            id: control.getValues('id'),
            nomeClasseVO: CLASS_NAME
        };
        formData.append('dados', JSON.stringify(usuario));
        remover(formData, {
            funcaoSucesso: resultado => {
                history.push('/usuario/buscartodos');
            }, funcaoErro: mensagem => {
                console.log(mensagem);
            }
        })
    };
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="nome">Nome</Label>
                    <Input type="text" name="nome" placeholder="digite o seu nome" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="login">Login</Label>
                    <Input type="text" name="login" placeholder="digite o seu login" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="senha">Password</Label>
                    <Input type="password" name="senha" placeholder="digite a sua senha" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="tipoUsuario">Tipo</Label>
                    <Input type="select" name="tipoUsuario" innerRef={register} >
                        <option value={TIPO_USUARIO_ENUM[0].value}>{TIPO_USUARIO_ENUM[0].label}</option>
                        <option value={TIPO_USUARIO_ENUM[1].value}>{TIPO_USUARIO_ENUM[1].label}</option>
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

export default UsuarioFormulario;