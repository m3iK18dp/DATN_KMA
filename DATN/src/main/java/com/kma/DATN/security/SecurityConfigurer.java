package com.kma.DATN.security;

import com.kma.DATN.services.authenticationService.CustomLogoutSuccessHandler;
import com.kma.DATN.services.authenticationService.CustomUserDetailsService;
import com.kma.DATN.util.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
//@RequiredArgsConstructor
public class SecurityConfigurer {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;
    @Autowired
    private LogoutHandler logoutHandler;
    @Autowired
    private CustomLogoutSuccessHandler customLogoutSuccessHandler;


    @Bean
    public JwtRequestFilter jwtAuthenticationFilter() {
        return new JwtRequestFilter();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

//    @Bean
//    public WebSecurityCustomizer webSecurityCustomizer() {
//        return (web) -> web.ignoring()
//                .requestMatchers("/**");
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.requiresChannel()
                .anyRequest().requiresInsecure();
        // Tắt CSRF protection cho endpoint WebSocket
        http.csrf().ignoringRequestMatchers("/ws", "/ws/**");
        http.cors().and().csrf().disable()
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests((authorize) ->
                        authorize
                                .requestMatchers("/api/auth/logout").authenticated()
                                .requestMatchers("/api/auth", "/api/auth/**").permitAll()
                                .requestMatchers("/ws", "/ws/**").permitAll()
                                .requestMatchers("/api/socket", "/api/socket/**").permitAll()
                                .requestMatchers("/api/otp", "/api/otp/**").permitAll()
                                .requestMatchers("/api/test", "/api/test/**").permitAll()
                                .requestMatchers("/api/transaction/**").authenticated()
                                .requestMatchers(
                                        "/api/user/information",
                                        "/api/user/getFullNameByAccount/**",
                                        "/api/user/update_email",
                                        "/api/user/update_password",
                                        "/api/pin",
                                        "/api/pin/**"
                                ).authenticated()
                                .requestMatchers(HttpMethod.PUT, " /api/user/**").authenticated()
                                .requestMatchers("/api/user").hasAnyAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET, " /api/user/**").hasAnyAuthority("ADMIN")
                                .requestMatchers(HttpMethod.POST, " /api/user/**").hasAnyAuthority("ADMIN")
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        " /user/reset_password/**",
                                        "/user/update_email",
                                        "/user/update_password",
                                        "/user/change_status/**"
                                ).hasAnyAuthority("ADMIN")
                                .anyRequest().authenticated()
                ).sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/api/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler(customLogoutSuccessHandler);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
//        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
