package com.mateus.projetorest.repositorios.extensoes;

import java.util.Optional;

import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mateus.projetorest.modelos.Usuario;

@Repository
public class UsuarioRepositorio extends Repositorio {

    @Transactional
    public Optional<Usuario> findByLogin(final Usuario usuario) {
        final TypedQuery<Usuario> query = entityManager.createQuery("select u from Usuario u where u.login like ?1", Usuario.class);
        query.setParameter(1, usuario.getLogin());
        try {
            return Optional.of(query.getSingleResult());
        } catch (final Exception e) {
            return Optional.empty();
        }
    }
}
