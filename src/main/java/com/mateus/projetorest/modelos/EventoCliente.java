package com.mateus.projetorest.modelos;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Entity
@Table(name = "evento_cliente", uniqueConstraints={@UniqueConstraint(columnNames = {"evento_id", "cliente_id"})})
public class EventoCliente extends BasicVO {
    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Evento evento;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(final Evento evento) {
        this.evento = evento;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(final Cliente cliente) {
        this.cliente = cliente;
    }
}
