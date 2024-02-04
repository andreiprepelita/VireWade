package org.example.RecommendationAPI.controllers;

import org.example.RecommendationAPI.models.QueryResult;
import org.example.RecommendationAPI.models.SparqlResponse;
import org.example.RecommendationAPI.models.UserOptions;
import org.example.RecommendationAPI.models.VinylRanking;
import org.example.RecommendationAPI.services.LinkedDataService;
import org.example.RecommendationAPI.services.PlaylistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.inject.Inject;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

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

    @PostMapping("/top")
    public QueryResult getTopItemsByRankingUsingCount(@RequestBody VinylRanking vinylRanking) {
        SparqlResponse sparqlResponse = linkedDataService.getTopItemsByRankingUsingCount(vinylRanking.getLimitQuery(), vinylRanking.getFieldToRankBy());
        if (sparqlResponse.isError) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The query for the request is not valid." + sparqlResponse.message);
        }
        return sparqlResponse.retrieveRecords(vinylRanking.getPageNumber(), vinylRanking.getNumberOfItemsPerPage(), vinylRanking.getFieldToRankBy(), vinylRanking.getShuffle());
    }

    @PostMapping("/preferences")
    public QueryResult getRecommendationsByPreferences(@RequestBody UserOptions userOptions) {
        SparqlResponse sparqlResponse = linkedDataService.getRecommendationsByUserOptions(userOptions);
        if (sparqlResponse.isError) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The query for the request is not valid." + sparqlResponse.message);
        }
        return sparqlResponse.retrieveRecords(userOptions.getNumberOfItemsPerPage(), userOptions.getPageSize(), "userPreferences", true);
    }

    @PostMapping("/discogs")
    public QueryResult getRecommendationByDiscogsUsingDiscogsToken(@RequestParam("discogsToken") String discogsToken, @RequestParam("discogsTokenSecret") String discogsTokenSecret,
                                                                   @RequestParam("pageNumber")Integer pageNumber, @RequestParam("numberOfItemsPerPage") Integer numberOfItemsPerPage) throws IOException {
        System.out.println(pageNumber);
        System.out.println(numberOfItemsPerPage);
        SparqlResponse sparqlResponse = linkedDataService.getRecommendationByDiscogsUsingDiscogsToken(discogsToken, discogsTokenSecret);
        if (sparqlResponse.isError) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The query for the request is not valid." + sparqlResponse.message);
        }
        return sparqlResponse.retrieveRecords(pageNumber, numberOfItemsPerPage, "userPreferences", true);
    }

    @PostMapping("/playlist/local")
    public QueryResult getRecommendationByLocalPlaylist(@RequestBody byte[] fileContent) throws ParserConfigurationException, IOException, SAXException {
            Document doc = PlaylistService.processDocumentInByteFormat(fileContent);
            UserOptions userOptions = new UserOptions();
            userOptions.setFavoriteArtists(PlaylistService.getArtist(doc));
            userOptions.setFavoriteGenres(PlaylistService.getGenres(doc));
            SparqlResponse sparqlResponse = linkedDataService.getRecommendationsByUserOptions(userOptions);
            if (sparqlResponse.isError) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The query for the request is not valid." + sparqlResponse.message);
            }
            return sparqlResponse.retrieveRecords(userOptions.getNumberOfItemsPerPage(), userOptions.getPageSize(), "userPreferences", true);
    }


}
