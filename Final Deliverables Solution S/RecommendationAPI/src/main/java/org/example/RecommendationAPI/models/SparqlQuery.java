package org.example.RecommendationAPI.models;

import org.springframework.http.HttpStatus;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

public class SparqlQuery {

    public String query;

    public SparqlQuery(String query) {

        this.query = query;
    }

    public SparqlResponse SendRequest() {
        System.out.println(this.query);
        Client client = ClientBuilder.newBuilder().build();
        String sparqlEndpoint = "http://localhost:8080/sparqlRecommendation";

        Response response = client.target(sparqlEndpoint)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.json(this), Response.class);

        HttpStatus status = Optional
                .of(HttpStatus.valueOf(response.getStatus()))
                .orElse(HttpStatus.SERVICE_UNAVAILABLE);

        System.out.println(status);
        SparqlResponse sparqlResponse = response.readEntity(SparqlResponse.class);
        if(status.isError()) {
            sparqlResponse.isError = true;
        }

        return sparqlResponse;

    }

    @Override
    public String toString() {
        return this.query;
    }
}
