package com.mateus.projetorest.controles;

import java.lang.reflect.Constructor;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @CrossOrigin
    @PostMapping(path = "/persistir")
    public ResponseEntity<String> persistir(@RequestParam final String dados)
    {
        final JSONObject jsonObject = new JSONObject(dados);

        final String nomeDaClasse = jsonObject.getString("nomeClasseVO");
        try {
            final Class<?> classe = Class.forName(nomeDaClasse);

            final BasicVO basicVO = BasicVO.jsonToObjeto(dados, classe);

            repositorio.persistir(basicVO);
            return new ResponseEntity<>(BasicVO.objetoToJson(basicVO), HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/remover")
    public ResponseEntity<String> remover(@RequestParam final String dados)
    {
        final JSONObject jsonObject = new JSONObject(dados);

        final String nomeDaClasse = jsonObject.getString("nomeClasseVO");
        try {
            final Class<?> classe = Class.forName(nomeDaClasse);

            repositorio.remover(BasicVO.jsonToObjeto(dados, classe));
            return new ResponseEntity<>(dados, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @CrossOrigin
    @PostMapping(path = "/buscartodos")
    public ResponseEntity<List<BasicVO>> buscarTodos(@RequestBody final BasicVO basicVO)
    {
        try {
            final List<String> entidades = repositorio.buscarTodos(Class.forName(basicVO.getNomeClasseVO())).stream().map(BasicVO::objetoToJson).collect(Collectors.toList());
            return new ResponseEntity<>(repositorio.buscarTodos(Class.forName(basicVO.getNomeClasseVO())), HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(Collections.emptyList(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
