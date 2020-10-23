package com.mateus.projetorest.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Entity
@Table(name = "endereco")
public class Endereco extends BasicVO {

    @Column(name = "estado", nullable = false)
    private String estado;
    @Column(name = "cidade", nullable = false)
    private String cidade;
    @Column(name = "rua", nullable = false)
    private String rua;
    @Column(name = "numero")
    private int numero;

    public String getEstado() {
        return estado;
    }

    public void setEstado(final String estado) {
        this.estado = estado;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(final String cidade) {
        this.cidade = cidade;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(final String rua) {
        this.rua = rua;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(final int numero) {
        this.numero = numero;
    }

    @Override
    public void jsonToObjeto(final String... dados) {

    }

    @Override
    public String[] objetoToJson() {
        return new String[0];
    }
}
