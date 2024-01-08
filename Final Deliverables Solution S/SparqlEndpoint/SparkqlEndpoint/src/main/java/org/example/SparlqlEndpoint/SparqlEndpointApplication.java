package org.example.SparlqlEndpoint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SparqlEndpointApplication {
    public static void main(String[] args) {

        SpringApplication.run(SparqlEndpointApplication.class, args);
    }
}
