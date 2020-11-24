package com.mateus.projetorest.modelos.utils;

import java.math.BigInteger;
import java.util.Date;

public class RelatorioParticipacaoSinteticoUtil {
    private Date dataEntrada;
    private BigInteger numeroCredenciamentos;

    public RelatorioParticipacaoSinteticoUtil(final Date dataEntrada, final BigInteger numeroCredenciamentos) {
        this.dataEntrada = dataEntrada;
        this.numeroCredenciamentos = numeroCredenciamentos;
    }

    public Date getDataEntrada() {
        return dataEntrada;
    }

    public void setDataEntrada(final Date dataEntrada) {
        this.dataEntrada = dataEntrada;
    }

    public BigInteger getNumeroCredenciamentos() {
        return numeroCredenciamentos;
    }

    public void setNumeroCredenciamentos(final BigInteger numeroCredenciamentos) {
        this.numeroCredenciamentos = numeroCredenciamentos;
    }
}
