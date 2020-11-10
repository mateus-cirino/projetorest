import React, {Dispatch, FC} from "react";
import {fazerLogin} from "../../../../servicos/usuario.servico";
import {Usuario} from "../../../../modelos/usuario";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Label, Input, Button, Row} from "reactstrap";
import {useHistory} from "react-router-dom"
import {SUCESSO} from "../../../../utils/mensagensRequisicao";
import {useToasts} from "react-toast-notifications";
import md5 from "md5";

export interface LoginProps {
    setUsuario: Dispatch<Usuario>;
}

const Login: FC<LoginProps> = props => {
    const {handleSubmit, register} = useForm<Usuario>();
    const {setUsuario} = props;
    const history = useHistory();
    const { addToast } = useToasts();
    const onSubmit = (usuario: Usuario) => {
        usuario.senha = md5(usuario.senha);
        fazerLogin(usuario, {
            funcaoSucesso: usuario =>  {
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                setUsuario(usuario);
                history.push('/usuario/buscartodos');
            },
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
        });
    };

    return (
        <div className="container m-auto col-md-12 col-xl-4">
            <Form className="border rounded p-2" onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="login">Login</Label>
                    <Input type="text" name="login" placeholder="digite o seu login" innerRef={register} />
                </FormGroup>
                <FormGroup>
                    <Label for="senha">Password</Label>
                    <Input type="password" name="senha" placeholder="digite a sua senha" innerRef={register} />
                </FormGroup>
                <Row className="d-flex justify-content-end m-2">
                    <Button color="primary">Entrar</Button>
                </Row>
            </Form>
        </div>
        );
};

export default Login;