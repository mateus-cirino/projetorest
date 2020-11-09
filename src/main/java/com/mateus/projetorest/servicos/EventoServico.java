package com.mateus.projetorest.servicos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mateus.projetorest.repositorios.EventoRepositorio;
import com.mateus.projetorest.repositorios.UsuarioRepositorio;

@Service
public class EventoServico {
    private final EventoRepositorio eventoRepositorio;
    @Autowired
    public EventoServico(final EventoRepositorio eventoRepositorio) {
        this.eventoRepositorio = eventoRepositorio;
    }
    public boolean confirmarPresenca(final int idEvento, final String matricula) {
        return eventoRepositorio.confirmarPresenca(idEvento, matricula);
    }
}
