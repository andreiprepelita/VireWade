package org.example.RecommendationAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class RecommendationAPIApplication {
    public static void main(String[] args) {

        SpringApplication.run(RecommendationAPIApplication.class, args);
    }
}
