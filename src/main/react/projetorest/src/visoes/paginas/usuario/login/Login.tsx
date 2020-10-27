import React, {Dispatch, FC} from "react";
import {fazerLogin} from "../../../../servicos/usuario.servico";
import {Usuario} from "../../../../modelos/usuario";
import {useForm} from "react-hook-form";
import {Form, FormGroup, Label, Input, Button} from "reactstrap";
import {useHistory} from "react-router-dom"

export interface LoginProps {
    setUsuario: Dispatch<Usuario>;
}

const Login: FC<LoginProps> = props => {
    const {handleSubmit, register} = useForm<Usuario>();
    const history = useHistory();
    const onSubmit = (usuario: Usuario) => {
        fazerLogin(usuario, {
            funcaoSucesso: usuario =>  {
                props.setUsuario(usuario);
                history.push('/usuario/buscartodos');
            },
            funcaoErro: erro => console.log(erro)
        });
    };

    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="login">Login</Label>
                    <Input type="text" name="login" placeholder="digite o seu login" innerRef={register} />
                </FormGroup><FormGroup>
                    <Label for="senha">Password</Label>
                    <Input type="password" name="senha" placeholder="digite a sua senha" innerRef={register} />
                </FormGroup>
                <Button color="primary">Entrar</Button>
            </Form>
        </div>
        );
};

export default Login;