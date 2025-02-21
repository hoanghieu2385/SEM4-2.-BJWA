package com.example.demo.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;


@Configuration
public class SecurityConfiguration {

//    @Bean
//    public InMemoryUserDetailsManager userDetailsManager() {
//        UserDetails user = User.builder()
//                .username("user")
//                .password("{noop}123456")
//                .roles("USER").build();
//        UserDetails admin = User.builder()
//                .username("admin")
//                .password("{noop}123456")
//                .roles("ADMIN").build();
//        UserDetails op = User.builder()
//                .username("operator")
//                .password("{noop}123456")
//                .roles("OPERATOR").build();
//        return new InMemoryUserDetailsManager(user, admin, op);
//    }

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource)
    {
        JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
        userDetailsManager.setUsersByUsernameQuery("select user_id,password,is_active from members where user_id=?");
        userDetailsManager.setAuthoritiesByUsernameQuery("select user_id,role from roles where user_id=?");
        return userDetailsManager;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.authorizeHttpRequests(config->
                        config
                                .anyRequest().authenticated())
                .formLogin(
                        form->form.loginPage("/authen/login")
                                .loginProcessingUrl("/authenticateUser")
                                .permitAll()
                )
                .logout(logout->{
                    logout.permitAll();
                })
                .exceptionHandling(config->config.accessDeniedPage("/authen/accessDenied"));
        return httpSecurity.build();
    }
}
