package com.mateus.projetorest.modelos;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

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
}
