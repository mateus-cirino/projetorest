package com.mateus.projetorest.modelos;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Entity
@Table(name = "cliente")
public class Cliente extends BasicVO {

    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "cpf", nullable = false)
    private String cpf;
    @Column(name = "rg", nullable = false)
    private String rg;
    @ManyToOne
    private Endereco endereco;
    @ManyToMany(mappedBy = "clientes")
    private List<Evento> eventos;

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

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(final Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Evento> getEventos() {
        return eventos;
    }

    public void setEventos(final List<Evento> eventos) {
        this.eventos = eventos;
    }
}
