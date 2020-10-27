import React, {FC, useEffect} from "react";
import {CLASS_NAME, Usuario} from "../../../../modelos/usuario";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {TIPO_USUARIO_ENUM} from "../../../../modelos/extensoes/tipoUsuarioEnum";
import {persistir, remover} from "../../../../servicos/geral.servico";

interface UsuarioFormularioProps {
    usuarioLogado: Usuario;
    selectedItem?: any;
}

const UsuarioFormulario: FC<UsuarioFormularioProps> = props => {
    const {usuarioLogado, selectedItem} = props;
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
        <div className="container">
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
                <Button type="submit" color="primary" disabled={usuarioLogado === null || usuarioLogado.tipoUsuario !== TIPO_USUARIO_ENUM[0].value}>Enviar</Button>
                <Button color="primary" onClick={deletar}>Deletar</Button>
                <Button color="primary" onClick={voltar}>Voltar</Button>
            </Form>
        </div>
    );
};

export default UsuarioFormulario;