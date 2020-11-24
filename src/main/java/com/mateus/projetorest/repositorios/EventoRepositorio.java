package com.mateus.projetorest.repositorios;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.apache.tomcat.jni.Local;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mateus.projetorest.modelos.Pessoa;
import com.mateus.projetorest.modelos.Evento;
import com.mateus.projetorest.modelos.EventoPessoa;
import com.mateus.projetorest.modelos.utils.MomentoCredenciamento;
import com.mateus.projetorest.modelos.utils.RelatorioParticipacaoSinteticoUtil;
import com.mateus.projetorest.modelos.utils.TipoCredenciamento;
import com.mateus.projetorest.repositorios.extensoes.Repositorio;

@Repository
public class EventoRepositorio extends Repositorio {
    @Transactional
    public List<Pessoa> buscarPessoasRelacionadosEvento(final Evento evento) {
        final TypedQuery<EventoPessoa> pesquisa = entityManager.createQuery("select u from EventoPessoa u where u.evento.id = ?1", EventoPessoa.class);
        pesquisa.setParameter(1, evento.getId());
        return pesquisa.getResultList().stream().map(EventoPessoa::getPessoa).collect(Collectors.toList());
    }

    @Transactional
    public List<Pessoa> buscarPessoasNaoRelacionadosEvento(final Evento evento) {
        final TypedQuery<Pessoa> pesquisa = entityManager.createQuery(
                "select u from Pessoa u where u not in (select e.pessoa from EventoPessoa e where e.evento.id =?1)",
                Pessoa.class);
        pesquisa.setParameter(1, evento.getId());
        return pesquisa.getResultList();
    }

    @Transactional
    public EventoPessoa buscarEventoPessoa(final EventoPessoa eventoPessoa) {
        final TypedQuery<EventoPessoa> pesquisa = entityManager.createQuery(
                "select u from EventoPessoa u where u.evento.id =?1 and u.pessoa.id =?2",
                EventoPessoa.class);
        pesquisa.setParameter(1, eventoPessoa.getEvento().getId());
        pesquisa.setParameter(2, eventoPessoa.getPessoa().getId());
        return pesquisa.getSingleResult();
    }
    @Transactional
    public boolean confirmarPresenca(final int idEvento, final String credencial, final
                                                           TipoCredenciamento tipoCredenciamento, final MomentoCredenciamento momentoCredenciamento) {
        final TypedQuery<EventoPessoa> pesquisa;
        if (TipoCredenciamento.NOME == tipoCredenciamento) {
            pesquisa = entityManager.createQuery(
                    "select u from EventoPessoa u where u.evento.id =?1 and u.pessoa.nome =?2",
                    EventoPessoa.class);
            pesquisa.setParameter(1, idEvento);
            pesquisa.setParameter(2, credencial);
        } else if (TipoCredenciamento.CPF == tipoCredenciamento) {
            pesquisa = entityManager.createQuery(
                    "select u from EventoPessoa u where u.evento.id =?1 and u.pessoa.cpf =?2",
                    EventoPessoa.class);
            pesquisa.setParameter(1, idEvento);
            pesquisa.setParameter(2, credencial);
        } else if (TipoCredenciamento.RG == tipoCredenciamento) {
            pesquisa = entityManager.createQuery(
                    "select u from EventoPessoa u where u.evento.id =?1 and u.pessoa.rg =?2",
                    EventoPessoa.class);
            pesquisa.setParameter(1, idEvento);
            pesquisa.setParameter(2, credencial);
        } else {
            return false;
        }
        try {
            final EventoPessoa eventoPessoa = pesquisa.getSingleResult();
            eventoPessoa.setPresente(true);
            if (MomentoCredenciamento.ENTRADA == momentoCredenciamento) {
                eventoPessoa.setDataEntrada(LocalDateTime.now());
            } else {
                eventoPessoa.setDataSaida(LocalDateTime.now());
            }
            persistir(eventoPessoa);
            return true;
        } catch (final Exception e) {
            return false;
        }
    }

    @Transactional
    public Long totalEventosCadastrados() {
        final TypedQuery<Long> pesquisa = entityManager.createQuery("select count(u) from Evento u", Long.class);
        return pesquisa.getSingleResult();
    }

    @Transactional
    public Long totalPessoasCadastradas() {
        final TypedQuery<Long> pesquisa = entityManager.createQuery("select count(u) from Pessoa u", Long.class);
        return pesquisa.getSingleResult();
    }

    @Transactional
    public Long totalInscricoes() {
        final TypedQuery<Long> pesquisa = entityManager.createQuery("select count(u) from EventoPessoa u", Long.class);
        return pesquisa.getSingleResult();
    }

    @Transactional
    public Long totalInscricoes(final int idEvento) {
        final TypedQuery<Long> pesquisa = entityManager.createQuery("select count(u) from EventoPessoa u where u.evento.id =?1", Long.class);
        pesquisa.setParameter(1, idEvento);
        return pesquisa.getSingleResult();
    }

    @Transactional
    public Long totalInscricoesConfirmadas() {
        final TypedQuery<Long> pesquisa = entityManager.createQuery("select count(u) from EventoPessoa u where u.presente = true", Long.class);
        return pesquisa.getSingleResult();
    }

    @Transactional
    public Long totalInscricoesConfirmadas(final int idEvento) {
        final TypedQuery<Long> pesquisa = entityManager.createQuery("select count(u) from EventoPessoa u where u.evento.id =?1 and u.presente = true", Long.class);
        pesquisa.setParameter(1, idEvento);
        return pesquisa.getSingleResult();
    }

    @Transactional
    public List<EventoPessoa> relatorioParticipacaoAnalitico() {
        final TypedQuery<EventoPessoa> pesquisa = entityManager.createQuery("select u from EventoPessoa u order by u.dataInscricao", EventoPessoa.class);
        return pesquisa.getResultList();
    }

    @Transactional
    public List<RelatorioParticipacaoSinteticoUtil> relatorioParticipacaoSintetico(final int idEvento) {
        final Query pesquisa = entityManager.createNativeQuery("select DATE(u.data_entrada) , COUNT(u.data_entrada) from evento_pessoa u where u.evento_id = " + idEvento + " group by DATE(u.data_entrada), DATE(u.data_inscricao) order by DATE(u.data_inscricao)");
        final List<Object[]> dadosRelatorios = pesquisa.getResultList();
        final List<RelatorioParticipacaoSinteticoUtil> relatorioParticipacaoSinteticoUtils = new LinkedList<>();
        for (Object[] dadosRelatorio : dadosRelatorios) {
            relatorioParticipacaoSinteticoUtils.add(new RelatorioParticipacaoSinteticoUtil((Date) dadosRelatorio[0], (BigInteger) dadosRelatorio[1]));
        }
        return relatorioParticipacaoSinteticoUtils;
    }
}
