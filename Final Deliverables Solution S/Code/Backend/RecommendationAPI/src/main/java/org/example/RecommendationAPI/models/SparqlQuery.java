package org.example.RecommendationAPI.models;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class SparqlQuery {

    private static final Logger logger = LoggerFactory.getLogger(SparqlQuery.class);

    public String query;
    private static final String SPARQL_ENDPOINT = "https://sparql-endpoint.onrender.com/sparqlRecommendation"; //http://localhost:8082/sparqlRecommendation

    public SparqlQuery(String query) {
        this.query = query;
    }

    public SparqlResponse sendRequest() {
        logger.info("Sending SPARQL query: {}", this.query);
        Client client = null;
        try {
            client = createClient();
            Response response = sendSparqlRequest(client);
            HttpStatus status = HttpStatus.valueOf(response.getStatus());
            logger.info("Response status: {}", status);

            SparqlResponse sparqlResponse = response.readEntity(SparqlResponse.class);
            sparqlResponse.isError = status.isError();

            return sparqlResponse;
        } catch (Exception e) {
            logger.error("Error sending SPARQL request: {}", e.getMessage(), e);
            SparqlResponse errorResponse = new SparqlResponse();
            errorResponse.isError = true;
            return errorResponse;
        } finally {
            if (client != null) {
                client.close();
            }
        }
    }

    private Client createClient() {
        return ClientBuilder.newBuilder().build();
    }

    private Response sendSparqlRequest(Client client) {
        return client.target(SPARQL_ENDPOINT)
                .request(MediaType.APPLICATION_JSON)
                .post(Entity.json(this), Response.class);
    }

    @Override
    public String toString() {
        return query;
    }
}
