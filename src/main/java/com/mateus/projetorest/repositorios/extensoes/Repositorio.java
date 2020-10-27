package com.mateus.projetorest.repositorios.extensoes;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Repository
public class Repositorio {
    @PersistenceContext
    protected EntityManager entityManager;

    @Transactional
    public void persistir(final BasicVO basicVO) {
        if (basicVO.getId() == 0) {
            entityManager.persist(basicVO);
        } else {
            entityManager.merge(basicVO);
        }
    }

    @Transactional
    public void remover(final BasicVO basicVO) {
        entityManager.remove(entityManager.getReference(basicVO.getClass(), basicVO.getId()));
    }

    @Transactional
    public List<BasicVO> buscarTodos(final Class<?> classe) {
        final Query pesquisa = entityManager.createQuery("FROM " + classe.getName(), classe);
        return pesquisa.getResultList();
    }
}
