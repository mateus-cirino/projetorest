package com.mateus.projetorest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@EntityScan(basePackages = {"com.mateus.projetorest.modelos"})
public class ProjetorestApplication {

    public static void main(final String... args) {
        SpringApplication.run(ProjetorestApplication.class, args);
    }

}
