package com.mateus.projetorest.modelos;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Entity
@Table(name = "evento")
public class Evento extends BasicVO {
    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "descricao", nullable = false)
    private String descricao;
    @Column(name = "numeroMaxParticipantes", nullable = false)
    private int numeroMaxParticipantes;
    @ManyToOne
    private Endereco endereco;
    @Column(name = "dtInicio", nullable = false)
    private Date dtInicio;
    @Column(name = "dtFim", nullable = false)
    private Date dtFim;
    @ManyToOne
    private Usuario usuario;

    public String getNome() {
        return nome;
    }

    public void setNome(final String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(final String descricao) {
        this.descricao = descricao;
    }

    public int getNumeroMaxParticipantes() {
        return numeroMaxParticipantes;
    }

    public void setNumeroMaxParticipantes(final int numeroMaxParticipantes) {
        this.numeroMaxParticipantes = numeroMaxParticipantes;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(final Endereco endereco) {
        this.endereco = endereco;
    }

    public Date getDtInicio() {
        return dtInicio;
    }

    public void setDtInicio(final Date dtInicio) {
        this.dtInicio = dtInicio;
    }

    public Date getDtFim() {
        return dtFim;
    }

    public void setDtFim(final Date dtFim) {
        this.dtFim = dtFim;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(final Usuario usuario) {
        this.usuario = usuario;
    }
}
