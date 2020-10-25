package com.mateus.projetorest.servicos;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mateus.projetorest.modelos.Usuario;
import com.mateus.projetorest.repositorios.UsuarioRepositorio;

@Service
public class UsuarioServico {
    private final UsuarioRepositorio usuarioRepositorio;
    @Autowired
    public UsuarioServico(final UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }
    public Usuario fazerLogin(final Usuario usuario) {
        return usuarioRepositorio.buscarPeloLogin(usuario);
    }
}
