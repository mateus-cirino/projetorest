package com.mateus.projetorest.modelos.extensoes;

import java.lang.reflect.Type;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

@MappedSuperclass
public class BasicVO {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;
    @Transient
    protected String nomeClasseVO;
    private static final Gson gson = new GsonBuilder().registerTypeAdapter(LocalDateTime.class,
                                                                           (JsonDeserializer) (json, type, jsonDeserializationContext) -> LocalDateTime.parse(json.getAsJsonPrimitive().getAsString())).create();

    protected BasicVO() {
        nomeClasseVO = this.getClass().getName();
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public String getNomeClasseVO() {
        return nomeClasseVO;
    }

    public void setNomeClasseVO(final String nomeClasseVO) {
        this.nomeClasseVO = nomeClasseVO;
    }

    public static BasicVO jsonToObjeto(final String dados, final Class<?> classe) {
        return (BasicVO) gson.fromJson(dados, classe);
    }

    public static String objetoToJson(final BasicVO objeto) {
        return gson.toJson(objeto);
    }
}
