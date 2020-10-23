package com.mateus.projetorest.controles;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mateus.projetorest.modelos.Usuario;
import com.mateus.projetorest.modelos.extensoes.BasicVO;
import com.mateus.projetorest.repositorios.extensoes.Repositorio;

@RestController
@RequestMapping("/api")
public class Controle {
    private final Repositorio repositorio;

    @Autowired
    public Controle(final Repositorio repositorio) {
        this.repositorio = repositorio;
    }

    @PostMapping(path = "/persistir")
    public ResponseEntity<?> persistir(@RequestParam final String dados)
    {
        final JSONObject jsonObject = new JSONObject(dados);

        final String nomeDaClasse = jsonObject.getString("nomeClasseVO");
        try {
            final Class<?> classe = Class.forName(nomeDaClasse);

            final Usuario usuario = (Usuario) BasicVO.jsonToObjeto(dados, classe);

            repositorio.persistir(usuario);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping(path = "/remover")
    public ResponseEntity<?> remover(@RequestParam final String dados)
    {
        final JSONObject jsonObject = new JSONObject(dados);

        final String nomeDaClasse = jsonObject.getString("nomeClasseVO");
        try {
            final Class<?> classe = Class.forName(nomeDaClasse);

            final Usuario usuario = (Usuario) BasicVO.jsonToObjeto(dados, classe);

            repositorio.remover(usuario);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping(path = "/buscar")
    public ResponseEntity<String> buscar(@RequestParam final String dados)
    {
        final JSONObject jsonObject = new JSONObject(dados);

        final String nomeDaClasse = jsonObject.getString("nomeClasseVO");
        final int id = jsonObject.getInt("id");
        try {
            final Class<?> classe = Class.forName(nomeDaClasse);

            final String usuario = BasicVO.objetoToJson(repositorio.buscar((BasicVO) classe.getConstructor().newInstance(), id));
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping(path = "/buscartodos")
    public ResponseEntity<List<String>> buscarTodos(@RequestParam final String dados)
    {
        final JSONObject jsonObject = new JSONObject(dados);

        final String nomeDaClasse = jsonObject.getString("nomeClasseVO");
        try {
            final Class<?> classe = Class.forName(nomeDaClasse);

            final List<String> usuarios = repositorio.buscarTodos(classe).stream().map(BasicVO::objetoToJson).collect(Collectors.toList());
            return new ResponseEntity<>(usuarios, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
