package com.proyecto.integrador.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;

public class SpringFoxConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                 .title("sample application API")
                 .version("1.0")
                 .description("Categories Service")
                 .termsOfService("http://swagger.io/terms/")
                 .license(new License().name("Apache 2.0").url("http://springdoc.org")));

    }
}
