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
    public List<Cliente> buscarClientesEvento(final Evento evento) {
        final TypedQuery<EventoCliente> pesquisa = entityManager.createQuery("select u from EventoCliente u where u.evento.id = ?1", EventoCliente.class);
        pesquisa.setParameter(1, evento.getId());
        return pesquisa.getResultList().stream().map(EventoCliente::getCliente).collect(Collectors.toList());
    }
}
