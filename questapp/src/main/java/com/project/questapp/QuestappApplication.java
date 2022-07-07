package com.project.questapp;

import com.project.questapp.security.JwtAuthenticationEntryPoint;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class QuestappApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuestappApplication.class, args);
    }

}
