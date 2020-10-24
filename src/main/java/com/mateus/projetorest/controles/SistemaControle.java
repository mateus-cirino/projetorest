package com.mateus.projetorest.controles;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mateus.projetorest.modelos.Endereco;
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
    @GetMapping(path = "/fazerbackup")
    public ResponseEntity<List<String>> fazerBackup() {
        final List<String> jsonEndereco = repositorio.buscarTodos(Endereco.class).stream().map(BasicVO::objetoToJson).collect(Collectors.toList());
        return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
    }
    @PostMapping(path = "/restaurarbackup")
    public ResponseEntity<List<String>> restaurarBackup() {
        final List<String> jsonEndereco = repositorio.buscarTodos(Endereco.class).stream().map(BasicVO::objetoToJson).collect(Collectors.toList());
        return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
    }
}
