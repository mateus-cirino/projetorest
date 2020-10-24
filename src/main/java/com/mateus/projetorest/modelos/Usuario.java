package com.mateus.projetorest.modelos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;


import com.mateus.projetorest.modelos.extensoes.BasicVO;
import com.mateus.projetorest.modelos.utils.TipoUsuario;

@Entity
@Table(name = "usuario")
public final class Usuario extends BasicVO {

    @Column(name = "nome", nullable = false)
    private String nome;
    @Column(name = "login", unique=true, nullable = false)
    private String login;
    @Column(name = "senha", nullable = false)
    private String senha;
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipoUsuario;

    public String getNome() {
        return nome;
    }

    public void setNome(final String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(final String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(final String senha) {
        this.senha = senha;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(final TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
