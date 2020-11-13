package com.mateus.projetorest.modelos;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.CreationTimestamp;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Entity
@Table(name = "evento_pessoa", uniqueConstraints={@UniqueConstraint(columnNames = {"evento_id", "pessoa_id"})})
public class EventoPessoa extends BasicVO {
    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @ManyToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;

    @Column(name = "presente", columnDefinition = "boolean default false")
    private boolean presente;

    @CreationTimestamp
    private LocalDateTime dataPresenca;

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(final Evento evento) {
        this.evento = evento;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(final Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public boolean isPresente() {
        return presente;
    }

    public void setPresente(final boolean presente) {
        this.presente = presente;
    }

    public LocalDateTime getDataPresenca() {
        return dataPresenca;
    }

    public void setDataPresenca(final LocalDateTime dataPresenca) {
        this.dataPresenca = dataPresenca;
    }
}
