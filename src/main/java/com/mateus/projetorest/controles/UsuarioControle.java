package com.mateus.projetorest.controles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mateus.projetorest.modelos.Usuario;
import com.mateus.projetorest.servicos.UsuarioServico;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioControle {
    private final UsuarioServico usuarioServico;

    @Autowired
    public UsuarioControle(final UsuarioServico usuarioServico) {
        this.usuarioServico = usuarioServico;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<Boolean> login(@RequestBody final List<Usuario> usuario)
    {
        return new ResponseEntity<>(usuarioServico.fazerLogin(usuario.get(0)), HttpStatus.OK);
    }
}
