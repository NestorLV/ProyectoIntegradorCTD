package com.proyecto.integrador.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/categories/**");
        registry.addMapping("/cities/**");
        registry.addMapping("/products/**");
        registry.addMapping("/features/**");
        registry.addMapping("/images/**");
        registry.addMapping("/reservations/**");
        registry.addMapping("/users/**")
                .allowedMethods("GET", "PUT", "POST", "DELETE");
    }
}
