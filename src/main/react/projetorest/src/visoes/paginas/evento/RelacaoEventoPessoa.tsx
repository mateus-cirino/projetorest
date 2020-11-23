import React, {FC, useEffect, useState} from "react";
import {buscarTodos, persistir, remover} from "../../../servicos/geral.servico";
import {CLASS_NAME_EVENTO, CLASS_NAME_EVENTO_PESSOA} from "../../../utils/nomeClasseVO";
import {useToasts} from "react-toast-notifications";
import {Evento} from "../../../modelos/evento";
import Select from "react-select";
import {
    recuperarPessoasRelacionadosEvento,
    recuperarPessoasNaoRelacionadosEvento,
    recuperarEventoPessoa
} from "../../../servicos/evento.servico";
import DataTable from "react-data-table-component";
import {Pessoa} from "../../../modelos/pessoa";
import {EventoPessoa} from "../../../modelos/eventoPessoa";
import {SUCESSO} from "../../../utils/mensagensRequisicao";
import {customStyles} from "../../../utils/tabelaUtils";
import {Usuario} from "../../../modelos/usuario";

interface RelacaoEventoPessoaProps {
    usuarioLogado?: Usuario;
}

const RelacaoEventoPessoa:FC<RelacaoEventoPessoaProps> = props => {
    const { usuarioLogado } = props;
    const { addToast } = useToasts();
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventosOptions, setEventosOptions] = useState([]);
    const [pessoasRelacionadas, setPessoasRelacionadas] = useState([]);
    const [pessoasNaoRelacionados, setPessoasNaoRelacionados] = useState([]);
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
        recuperarPessoasRelacionadosEvento(entidade, {
                funcaoErro: mensagem => {
                    addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
                },
                funcaoSucesso: resultado => setPessoasRelacionadas(resultado)
            }
        );
        recuperarPessoasNaoRelacionadosEvento(entidade, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true });
            },
            funcaoSucesso: resultado => setPessoasNaoRelacionados(resultado)
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
            name: 'RG',
            selector: 'rg',
            sortable: true,
        },
        {
            name: 'Matrícula',
            selector: 'matricula',
            sortable: true,
        },
    ];
    const handleRemovePessoa = (pessoa: Pessoa) => {
        const eventoPessoa: EventoPessoa = {
            pessoa: pessoa,
            evento: eventoSelecionado,
            nomeClasseVO: CLASS_NAME_EVENTO_PESSOA
        };
        recuperarEventoPessoa(eventoPessoa, {
            funcaoErro: mensagem => {
                addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
            },
            funcaoSucesso: eventoPessoaComId => {
                const formData = new FormData();
                formData.append('dados', JSON.stringify(eventoPessoaComId));
                remover(formData, {
                    funcaoErro: mensagem => {
                        addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true })
                    },
                    funcaoSucesso: () => {
                        setPessoasRelacionadas(pessoasRelacionadas.filter((c: Pessoa) => {
                            return c.id !== pessoa.id;
                        }));
                        setPessoasNaoRelacionados([...pessoasNaoRelacionados, pessoa]);
                        addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
                    },
                })
            },
        })
    };
    const handleAdicionaPessoa = (pessoa: Pessoa) => {
        const eventoPessoa: EventoPessoa = {
            pessoa: pessoa,
            evento: eventoSelecionado,
            nomeClasseVO: CLASS_NAME_EVENTO_PESSOA,
            usuario: usuarioLogado
        };
        const formData = new FormData();
        formData.append('dados', JSON.stringify(eventoPessoa));
        persistir(formData, {
            funcaoErro: mensagem => addToast(mensagem.toString(), { appearance: 'error', autoDismiss: true }),
            funcaoSucesso: () => {
                setPessoasNaoRelacionados(pessoasNaoRelacionados.filter((c: Pessoa) => {
                    return c.id !== pessoa.id;
                }));
                setPessoasRelacionadas([...pessoasRelacionadas, pessoa]);
                addToast(SUCESSO, { appearance: 'success', autoDismiss: true });
            }
        })
    };
    return (
      <div className="container m-auto col-md-12 col-xl-10 border rounded p-2">
          <Select
              placeholder="selecione o evento para carregar as relações entre ele e as pessoas"
              name="evento"
              options={eventosOptions}
              onChange={onChangeEvento}
          />
          <DataTable
              title="pessoas relacionadas"
              columns={columns}
              className="border rounded p-2"
              data={pessoasRelacionadas}
              striped={true}
              highlightOnHover={true}
              onRowClicked={handleRemovePessoa}
              customStyles={customStyles}
          />

          <DataTable
              title="pessoas não relacionadas"
              columns={columns}
              className="border rounded p-2"
              data={pessoasNaoRelacionados}
              striped={true}
              highlightOnHover={true}
              onRowClicked={handleAdicionaPessoa}
              customStyles={customStyles}
          />
      </div>
    );
};

export default RelacaoEventoPessoa;