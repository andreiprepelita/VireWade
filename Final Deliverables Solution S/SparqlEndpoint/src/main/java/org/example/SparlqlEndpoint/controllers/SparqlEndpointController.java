package org.example.SparlqlEndpoint.controllers;

import org.example.SparlqlEndpoint.models.SparqlQuery;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;

@RestController
@RequestMapping("/sparqlRecommendation")
public class SparqlEndpointController {

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> getDataFromStardog(final HttpServletRequest request, final @RequestBody SparqlQuery query) {
        System.out.println(query.getQuery());
        Client client = ClientBuilder.newClient();
        Form form = new Form().param("query", query.getQuery()).param("reasoning", "true");
        System.out.println(form);
        Entity<Form> payload = Entity.form(form);

        Response response = client.target("https://sd-d9888383.stardog.cloud:5820/vire/query")
                .request(MediaType.TEXT_PLAIN)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED)
                .header(HttpHeaders.AUTHORIZATION, "Basic YW5kcmVpX3ByZXBlbGl0YUB5YWhvby5jb206TWVsYW5jb2xpZTIwMjQ=")
                .header(HttpHeaders.ACCEPT, "application/sparql-results+json")
                .header(HttpHeaders.CACHE_CONTROL, "no-cache")
                .post(payload);

        HttpStatus status = Optional
                .of(HttpStatus.valueOf(response.getStatus()))
                .orElse(HttpStatus.SERVICE_UNAVAILABLE);

        return new ResponseEntity<>(response.readEntity(String.class), status);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<String> testGetMethod() {

        return new ResponseEntity<>("Passed!", HttpStatus.OK);
    }


}
