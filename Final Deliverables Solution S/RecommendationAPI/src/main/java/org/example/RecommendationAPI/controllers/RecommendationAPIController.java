package org.example.RecommendationAPI.controllers;

import org.example.RecommendationAPI.models.QueryResult;
import org.example.RecommendationAPI.models.SparqlResponse;
import org.example.RecommendationAPI.models.UserOptions;
import org.example.RecommendationAPI.services.LinkedDataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.inject.Inject;

@RestController
@RequestMapping("/recommendation")
@CrossOrigin
public class RecommendationAPIController {

    private final LinkedDataService linkedDataService;

    @Inject
    public RecommendationAPIController(LinkedDataService linkedDataService) {
        this.linkedDataService = linkedDataService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<String> testGetMethod() {

        return new ResponseEntity<>("Passed Preferences!", HttpStatus.OK);
    }

    @PostMapping("/preferences")
    public QueryResult getRecommendationsByPreferences(@RequestBody UserOptions userOptions) {
        SparqlResponse sparqlResponse = linkedDataService.GetRecommendationsByPreferences(userOptions);
        if (sparqlResponse.isError) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "The query for the request is not valid." + sparqlResponse.message);
        }
        return sparqlResponse.GetResult(userOptions.getPageIndex(), userOptions.getPageSize());
    }


}
