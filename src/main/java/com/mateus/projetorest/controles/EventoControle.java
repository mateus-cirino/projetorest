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
import com.mateus.projetorest.modelos.extensoes.BasicVO;
import com.mateus.projetorest.repositorios.EventoRepositorio;
import com.mateus.projetorest.repositorios.extensoes.Repositorio;

@RestController
@RequestMapping("/api/evento")
public class EventoControle {
    private final EventoRepositorio eventoRepositorio;

    @Autowired
    public EventoControle(final EventoRepositorio eventoRepositorio) {
        this.eventoRepositorio = eventoRepositorio;
    }

    @CrossOrigin
    @PostMapping(path = "/adicionarClientesEvento")
    public ResponseEntity<Boolean> adicionarClientesEvento(@RequestBody final List<EventoCliente> eventosClientes)
    {
        try {
            eventosClientes.forEach(eventoRepositorio::persistir);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(false, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/buscarClientesEvento")
    public ResponseEntity<List<Cliente>> buscarClientesEvento(@RequestBody final Evento evento)
    {
        try {
            final List<Cliente> clientes = eventoRepositorio.buscarClientesEvento(evento);
            return new ResponseEntity<>(clientes, HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
