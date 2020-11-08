package com.mateus.projetorest.repositorios;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mateus.projetorest.modelos.Cliente;
import com.mateus.projetorest.modelos.Evento;
import com.mateus.projetorest.modelos.EventoCliente;
import com.mateus.projetorest.repositorios.extensoes.Repositorio;

@Repository
public class EventoRepositorio extends Repositorio {
    @Transactional
    public List<Cliente> buscarClientesRelacionadosEvento(final Evento evento) {
        final TypedQuery<EventoCliente> pesquisa = entityManager.createQuery("select u from EventoCliente u where u.evento.id = ?1", EventoCliente.class);
        pesquisa.setParameter(1, evento.getId());
        return pesquisa.getResultList().stream().map(EventoCliente::getCliente).collect(Collectors.toList());
    }

    @Transactional
    public List<Cliente> buscarClientesNaoRelacionadosEvento(final Evento evento) {
        final TypedQuery<Cliente> pesquisa = entityManager.createQuery(
                "select u from Cliente u where u not in (select e.cliente from EventoCliente e where e.evento.id =?1)",
                Cliente.class);
        pesquisa.setParameter(1, evento.getId());
        return pesquisa.getResultList();
    }

    @Transactional
    public EventoCliente buscarEventoCliente(final EventoCliente eventoCliente) {
        final TypedQuery<EventoCliente> pesquisa = entityManager.createQuery(
                "select u from EventoCliente u where u.evento.id =?1 and u.cliente.id =?2",
                EventoCliente.class);
        pesquisa.setParameter(1, eventoCliente.getEvento().getId());
        pesquisa.setParameter(2, eventoCliente.getCliente().getId());
        return pesquisa.getSingleResult();
    }
}
