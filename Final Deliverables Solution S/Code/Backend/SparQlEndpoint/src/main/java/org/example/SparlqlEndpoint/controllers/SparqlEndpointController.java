package org.example.SparlqlEndpoint.controllers;

import org.example.SparlqlEndpoint.models.SparqlQuery;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@RestController
@RequestMapping("/sparqlRecommendation")
public class SparqlEndpointController {

    @Value("${auth.token}")
    private String authToken;

    @GetMapping("/token")
    public String getToken() {
        return authToken;
    }
    
    @Value("${sparql.endpoint}")
    private String sparqlEndpoint;

    @GetMapping("/sparqlEndpoint")
    public String getSparqlEndpoint() {
        return sparqlEndpoint;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<String> testGetMethod() {

        return new ResponseEntity<>("Passed Sparql Query!", HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> getDataFromStardog(@RequestBody SparqlQuery query) {
        Client client = createClient();
        System.out.println(query.getQuery());
        try {
            Entity<Form> payload = createPayload(query);
            System.out.println("Payload");
            System.out.println(payload);
            Response response = sendRequest(client, payload);
            HttpStatus status = HttpStatus.valueOf(response.getStatus());
            String responseString = response.readEntity(String.class);
            return new ResponseEntity<>(responseString, status);
        } catch (Exception e) {
            // Consider logging the exception here
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
        } finally {
            client.close(); // Ensure the client is closed in the finally block
        }
    }

    private Client createClient() {
        return ClientBuilder.newClient();
    }

    private Entity<Form> createPayload(SparqlQuery query) {
        Form form = new Form()
                .param("query", query.getQuery())
                .param("reasoning", "true");
        return Entity.form(form);
    }

    private Response sendRequest(Client client, Entity<Form> payload) {
        return client.target(getSparqlEndpoint())
                .request(MediaType.TEXT_PLAIN)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED)
                .header(HttpHeaders.AUTHORIZATION, getToken())
                .header(HttpHeaders.ACCEPT, "application/sparql-results+json")
                .header(HttpHeaders.CACHE_CONTROL, "no-cache")
                .post(payload);
    }



}
