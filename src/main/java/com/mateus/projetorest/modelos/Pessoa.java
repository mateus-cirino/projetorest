package com.mateus.projetorest.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Entity
@Table(name = "pessoas")
public class Pessoa extends BasicVO {

    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "cpf", unique = true, nullable = false)
    private String cpf;
    @Column(name = "rg", unique = true, nullable = false)
    private String rg;
    @Column(name = "matricula", unique = true, nullable = false)
    private String matricula;
    @ManyToOne
    private Endereco endereco;

    public String getNome() {
        return nome;
    }

    public void setNome(final String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(final String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(final String rg) {
        this.rg = rg;
    }

    public String getMatricula() {
        return matricula;
    }

    public void setMatricula(final String matricula) {
        this.matricula = matricula;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(final Endereco endereco) {
        this.endereco = endereco;
    }
}
