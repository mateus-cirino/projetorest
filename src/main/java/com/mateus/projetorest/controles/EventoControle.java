package com.mateus.projetorest.controles;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mateus.projetorest.modelos.Cliente;
import com.mateus.projetorest.modelos.Evento;
import com.mateus.projetorest.modelos.EventoCliente;
import com.mateus.projetorest.repositorios.EventoRepositorio;

@RestController
@RequestMapping("/api/evento")
public class EventoControle {
    private final EventoRepositorio eventoRepositorio;

    @Autowired
    public EventoControle(final EventoRepositorio eventoRepositorio) {
        this.eventoRepositorio = eventoRepositorio;
    }

    @CrossOrigin
    @PostMapping(path = "/buscarClientesRelacionadosEvento")
    public ResponseEntity<List<Cliente>> buscarClientesRelacionadosEvento(@RequestBody final Evento evento)
    {
        try {
            final List<Cliente> clientes = eventoRepositorio.buscarClientesRelacionadosEvento(evento);
            return new ResponseEntity<>(clientes, HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/buscarClientesNaoRelacionadosEvento")
    public ResponseEntity<List<Cliente>> buscarClientesNaoRelacionadosEvento(@RequestBody final Evento evento)
    {
        try {
            final List<Cliente> clientes = eventoRepositorio.buscarClientesNaoRelacionadosEvento(evento);
            return new ResponseEntity<>(clientes, HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/buscarEventoCliente")
    public ResponseEntity<EventoCliente> buscarEventoCliente(@RequestBody final EventoCliente eventoCliente)
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.buscarEventoCliente(eventoCliente), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
