package com.mateus.projetorest.repositorios;

import java.util.Optional;

import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mateus.projetorest.modelos.Usuario;
import com.mateus.projetorest.repositorios.extensoes.Repositorio;

@Repository
public class UsuarioRepositorio extends Repositorio {

    @Transactional
    public Optional<Usuario> buscarPeloLogin(final Usuario usuario) {
        final TypedQuery<Usuario> pesquisa = entityManager.createQuery("select u from Usuario u where u.login like ?1", Usuario.class);
        pesquisa.setParameter(1, usuario.getLogin());
        try {
            return Optional.of(pesquisa.getSingleResult());
        } catch (final Exception e) {
            return Optional.empty();
        }
    }
}
