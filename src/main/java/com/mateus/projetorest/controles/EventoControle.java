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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mateus.projetorest.modelos.Pessoa;
import com.mateus.projetorest.modelos.Evento;
import com.mateus.projetorest.modelos.EventoPessoa;
import com.mateus.projetorest.modelos.utils.TipoCredenciamento;
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
    @PostMapping(path = "/buscarPessoasRelacionadasEvento")
    public ResponseEntity<List<Pessoa>> buscarPessoasRelacionadasEvento(@RequestBody final Evento evento)
    {
        try {
            final List<Pessoa> pessoas = eventoRepositorio.buscarPessoasRelacionadosEvento(evento);
            return new ResponseEntity<>(pessoas, HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/buscarPessoasNaoRelacionadasEvento")
    public ResponseEntity<List<Pessoa>> buscarPessoasNaoRelacionadasEvento(@RequestBody final Evento evento)
    {
        try {
            final List<Pessoa> pessoas = eventoRepositorio.buscarPessoasNaoRelacionadosEvento(evento);
            return new ResponseEntity<>(pessoas, HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/buscarEventoPessoa")
    public ResponseEntity<EventoPessoa> buscarEventoPessoa(@RequestBody final EventoPessoa eventoPessoa)
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.buscarEventoPessoa(eventoPessoa), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/confirmarPresencaEvento")
    public ResponseEntity<Boolean> confirmarPresencaEvento(@RequestParam final int idEvento, @RequestParam final String credencial, @RequestParam final
                                                           TipoCredenciamento tipoCredenciamento)
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.confirmarPresenca(idEvento, credencial, tipoCredenciamento), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/totalEventosCadastrados")
    public ResponseEntity<Long> totalEventosCadastrados()
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.totalEventosCadastrados(), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/totalPessoasCadastradas")
    public ResponseEntity<Long> totalPessoasCadastradas()
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.totalPessoasCadastradas(), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/totalInscricoes")
    public ResponseEntity<Long> totalInscricoes()
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.totalInscricoes(), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/totalInscricoesEvento")
    public ResponseEntity<Long> totalInscricoesEvento(@RequestParam final int idEvento)
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.totalInscricoes(idEvento), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/totalInscricoesConfirmadas")
    public ResponseEntity<Long> totalInscricoesConfirmadas()
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.totalInscricoesConfirmadas(), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/totalInscricoesConfirmadasEvento")
    public ResponseEntity<Long> totalInscricoesConfirmadas(@RequestParam final int idEvento)
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.totalInscricoesConfirmadas(idEvento), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/relatorioParticipacao")
    public ResponseEntity<List<EventoPessoa>> relatorioParticipacao()
    {
        try {
            return new ResponseEntity<>(eventoRepositorio.relatorioParticipacao(), HttpStatus.OK);
        } catch (final Exception erro) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
