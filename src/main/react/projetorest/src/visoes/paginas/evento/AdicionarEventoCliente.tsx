import React, {useEffect, useState} from "react";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO, CLASS_NAME_EVENTO_CLIENTE} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {Evento} from "../../../modelos/evento";
import Select from "react-select";
import {
    recuperarClientesRelacionadosEvento,
    recuperarClientesNaoRelacionadosEvento,
    recuperarEventoCliente
} from "../../../servicos/evento.servico";
import DataTable from "react-data-table-component";
import {Cliente} from "../../../modelos/cliente";
import {EventoCliente} from "../../../modelos/eventoCliente";
import {SUCESSO} from "../../../utils/mensagensRequisicao";

const AdicionarEventoCliente = () => {
    const { addToast } = useToasts();
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventosOptions, setEventosOptions] = useState([]);
    const [clientesRelacionados, setClientesRelacionados] = useState([]);
    const [clientesNaoRelacionados, setClientesNaoRelacionados] = useState([]);
    useEffect(() => {
        const entidade = {
            nomeClasseVO: CLASS_NAME_EVENTO
        };
        buscarTodos(entidade, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
            },
            funcaoSucesso: (resultado: Evento[]) => setEventosOptions(resultado.map(e => {
                return { value: e.id, label: e.nome };
            }))
        })
    }, []);
    const onChangeEvento = props => {
        const entidade: Evento = {
            id: props.value,
            nomeClasseVO: CLASS_NAME_EVENTO
        };
        setEventoSelecionado(entidade);
        recuperarClientesRelacionadosEvento(entidade, {
                funcaoErro: mensagem => {
                    addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
                },
                funcaoSucesso: resultado => setClientesRelacionados(resultado)
            }
        );
        recuperarClientesNaoRelacionadosEvento(entidade, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
            },
            funcaoSucesso: resultado => setClientesNaoRelacionados(resultado)
        })
    };
    const columns = [
        {
            name: 'Nome',
            selector: 'nome',
            sortable: true,
        },
        {
            name: 'CPF',
            selector: 'cpf',
            sortable: true,
        },
        {
            name: 'rg',
            selector: 'rg',
            sortable: true,
        },
        {
            name: 'Matrícula',
            selector: 'matricula',
            sortable: true,
        },
    ];
    const handleRemoveCliente = (cliente: Cliente) => {
        const eventoCliente: EventoCliente = {
            cliente: cliente,
            evento: eventoSelecionado,
            nomeClasseVO: CLASS_NAME_EVENTO_CLIENTE
        };
        recuperarEventoCliente(eventoCliente, {
            funcaoSucesso: eventoClienteComId => {
                const formData = new FormData();
                formData.append('dados', JSON.stringify(eventoClienteComId));
                remover(formData, {
                    funcaoSucesso: () => {
                        setClientesRelacionados(clientesRelacionados.filter((c: Cliente) => {
                            return c.id !== cliente.id;
                        }));
                        setClientesNaoRelacionados([...clientesNaoRelacionados, cliente]);
                        addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                    },
                    funcaoErro: mensagem => {
                        addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
                    }
                })
            },
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            }
        })
    };
    const handleAdicionaCliente = (cliente: Cliente) => {
        const eventoCliente: EventoCliente = {
            cliente: cliente,
            evento: eventoSelecionado,
            nomeClasseVO: CLASS_NAME_EVENTO_CLIENTE
        };
        const formData = new FormData();
        formData.append('dados', JSON.stringify(eventoCliente));
        persistir(formData, {
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: () => {
                setClientesNaoRelacionados(clientesNaoRelacionados.filter((c: Cliente) => {
                    return c.id !== cliente.id;
                }));
                setClientesRelacionados([...clientesRelacionados, cliente]);
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
            }
        })
    };
    return (
      <div className="container">
          <Select
              placeholder="selecione o endereço do cliente"
              name="endereco.id"
              options={eventosOptions}
              onChange={onChangeEvento}
          />
          <DataTable
              title="Clientes relacionados"
              columns={columns}
              data={clientesRelacionados}
              striped={true}
              highlightOnHover={true}
              onRowClicked={handleRemoveCliente}
          />

          <DataTable
              title="Clientes não relacionados"
              columns={columns}
              data={clientesNaoRelacionados}
              striped={true}
              highlightOnHover={true}
              onRowClicked={handleAdicionaCliente}
          />
      </div>
    );
};

export default AdicionarEventoCliente;