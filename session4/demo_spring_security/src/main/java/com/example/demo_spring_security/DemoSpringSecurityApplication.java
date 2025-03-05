package com.example.demo_spring_security;

import com.example.demo_spring_security.configs.RsaKeyProperties;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
@SecurityScheme(name = "security-api", scheme = "bearer", type = SecuritySchemeType.HTTP, in = SecuritySchemeIn.HEADER)
public class DemoSpringSecurityApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoSpringSecurityApplication.class, args);
    }

}
