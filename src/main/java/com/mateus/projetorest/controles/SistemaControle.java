package com.mateus.projetorest.controles;

import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mateus.projetorest.modelos.Cliente;
import com.mateus.projetorest.modelos.Endereco;
import com.mateus.projetorest.modelos.Evento;
import com.mateus.projetorest.modelos.Usuario;
import com.mateus.projetorest.modelos.extensoes.BasicVO;
import com.mateus.projetorest.repositorios.extensoes.Repositorio;

@RestController
@RequestMapping("/api/sistema")
public class SistemaControle {
    private final Repositorio repositorio;

    @Autowired
    public SistemaControle(final Repositorio repositorio) {
        this.repositorio = repositorio;
    }

    @CrossOrigin
    @GetMapping(path = "/realizarbackup")
    public ResponseEntity<List<String>> fazerBackup() {
        final List<String> json = repositorio.buscarTodos(Endereco.class).stream().map(BasicVO::objetoToJson).collect(Collectors.toList());
        json.addAll(repositorio.buscarTodos(Cliente.class).stream().map(BasicVO::objetoToJson).collect(Collectors.toList()));
        json.addAll(repositorio.buscarTodos(Usuario.class).stream().map(BasicVO::objetoToJson).collect(Collectors.toList()));
        json.addAll(repositorio.buscarTodos(Evento.class).stream().map(BasicVO::objetoToJson).collect(Collectors.toList()));

        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(path = "/restaurarbackup")
    public ResponseEntity<Boolean> restaurarBackup(@RequestBody final List<String> backup) {
        try {
            for (final String json:backup) {
                final JSONObject jsonObject = new JSONObject(json);

                final String nomeDaClasse = jsonObject.getString("nomeClasseVO");

                final Class<?> classe = Class.forName(nomeDaClasse);

                final BasicVO basicVO = BasicVO.jsonToObjeto(json, classe);

                repositorio.persistir(basicVO);
            }
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }
}
