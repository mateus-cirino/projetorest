package com.mateus.projetorest.repositorios;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mateus.projetorest.modelos.Pessoa;
import com.mateus.projetorest.modelos.Evento;
import com.mateus.projetorest.modelos.EventoPessoa;
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
}
