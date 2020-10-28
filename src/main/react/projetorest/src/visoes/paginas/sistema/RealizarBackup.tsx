import React, {FC} from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {FormularioProps} from "../../componentes/extensoes/formularioProps";
import {TIPO_USUARIO_ENUM} from "../../../utils/tipoUsuarioEnum";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {useToasts} from "react-toast-notifications";
import {realizarBackup} from "../../../servicos/sistema.servico";

interface RealizarBackupProps {
    backup?: string;
}

const RealizarBackup: FC<FormularioProps> = props => {
    const {usuarioLogado, setSelectedItem} = props;
    const {handleSubmit, register, control} = useForm<RealizarBackupProps>();
    const history = useHistory();
    const { addToast } = useToasts();
    const onSubmit = () => {
        realizarBackup({
            funcaoSucesso: (resultado: File) => {
                console.log(resultado);
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
            }, funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            }
        })
    };
    const voltar = () => {
        history.goBack();
    };
    return (
        <div className="container m-2">
            <Form onSubmit={handleSubmit(onSubmit)} >
                <FormGroup>
                    <Label for="backup">Realizar backup</Label>
                    <Input type="textarea" name="backup" innerRef={register} />
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <Button className="m-2" type="submit" color="success" disabled={usuarioLogado === null || usuarioLogado.tipoUsuario !== TIPO_USUARIO_ENUM[0].value}>Iniciar</Button>
                    <Button className="m-2" color="primary" onClick={voltar}>Voltar</Button>
                </div>
            </Form>
        </div>
  )
};

export default RealizarBackup;