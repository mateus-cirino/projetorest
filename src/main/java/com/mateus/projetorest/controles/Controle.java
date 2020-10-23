package com.mateus.projetorest.controles;

import java.time.LocalDateTime;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mateus.projetorest.modelos.Cliente;
import com.mateus.projetorest.modelos.Endereco;
import com.mateus.projetorest.modelos.Evento;
import com.mateus.projetorest.modelos.Usuario;
import com.mateus.projetorest.modelos.utils.TipoUsuario;
import com.mateus.projetorest.repositorios.extensoes.Repositorio;

@RestController
public class Controle {
    Repositorio repositorio;

    @Autowired
    public Controle(final Repositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping("/")
    public void home()
    {
        final Usuario usuario = new Usuario();
        usuario.setNome("Mateus Cirino");
        usuario.setLogin("mateusc");
        usuario.setSenha("cmateus");
        usuario.setTipoUsuario(TipoUsuario.Admin);

        repositorio.persist(usuario);

        final Endereco endereco = new Endereco();
        endereco.setEstado("MG");
        endereco.setCidade("Mercês");
        endereco.setRua("Rua Antonio");
        endereco.setNumero(202);

        repositorio.persist(endereco);

        final Cliente cliente = new Cliente();
        cliente.setNome("Mateus Cirino");
        cliente.setEndereco(endereco);
        cliente.setCpf("02154889894");
        cliente.setRg("4d5489897");

        repositorio.persist(cliente);

        final Evento evento = new Evento();
        evento.setUsuario(usuario);
        evento.setClientes(Collections.singletonList(cliente));
        evento.setNome("Fagoc");
        evento.setDescricao("Descricao");
        evento.setDtInicio(LocalDateTime.now());
        evento.setDtFim(LocalDateTime.now());
        evento.setEndereco(endereco);
        evento.setNumeroMaxParticipantes(22333);

        repositorio.persist(evento);
    }
}
