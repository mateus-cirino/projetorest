package com.mateus.projetorest.repositorios.extensoes;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mateus.projetorest.modelos.extensoes.BasicVO;

@Repository
public class Repositorio {
    @PersistenceContext
    private EntityManager entityManager;


    @Transactional
    public void persist(final BasicVO basicVO) {
        entityManager.persist(basicVO);
    }

    @Transactional
    public void remove(final BasicVO basicVO) {
        entityManager.remove(basicVO);
    }
}
