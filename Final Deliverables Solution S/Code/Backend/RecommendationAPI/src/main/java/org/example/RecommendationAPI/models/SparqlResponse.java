package org.example.RecommendationAPI.models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SparqlResponse {

    public String message;
    public String status;
    public boolean isError;

    public String error;

    public String timestamp;

    public String path;


    public Map<String, List<String>> head = new HashMap<>();
    public Map<String, List<Map<String, Map<String, String>>>> results = new HashMap<>();

    public QueryResult retrieveRecords(Integer pageNumber, Integer numberOfItemsOnPage, String queryType) {
        QueryResult result = new QueryResult();
        List<Map<String, Map<String, String>>> bindings = this.results.get("bindings");
        List<Map<String, String>> processedResultsList = new ArrayList<>();
        int totalItems = bindings.size();
        if(numberOfItemsOnPage == 0) {
            numberOfItemsOnPage = totalItems;
        }
        pageNumber = pageNumber - 1;
        int startIndex = pageNumber * numberOfItemsOnPage;
        int endIndex = Math.min(totalItems, (pageNumber + 1) * numberOfItemsOnPage);
        for (int i = startIndex; i< endIndex; i++){
            Map<String, String> keyValueFinal = new HashMap<>();
            bindings.get(i).forEach((key, value) -> keyValueFinal.put(key, value.get("value")));
            processedResultsList.add(keyValueFinal);
        }

        result.records = processedResultsList;
        result.totalRecords = totalItems;
        result.variables = this.head.get("vars");
        result.jsonLDRepresentation = transformDataToJsonLd(processedResultsList, queryType);

        return result;

    }

    public QueryResult retrieveRecords(Integer pageNumber, Integer numberOfItemsOnPage, String queryType, Boolean shuffle) {
        QueryResult result = new QueryResult();
        List<Map<String, Map<String, String>>> bindings = this.results.get("bindings");
        if(shuffle) {
            java.util.Collections.shuffle(bindings);
        }
        List<Map<String, String>> processedResultsList = new ArrayList<>();
        int totalItems = bindings.size();
        if(numberOfItemsOnPage == 0) {
            numberOfItemsOnPage = totalItems;
        }
        pageNumber = pageNumber - 1;
        int startIndex = pageNumber * numberOfItemsOnPage;
        int endIndex = Math.min(totalItems, (pageNumber + 1) * numberOfItemsOnPage);
        for (int i = startIndex; i< endIndex; i++){
            Map<String, String> keyValueFinal = new HashMap<>();
            bindings.get(i).forEach((key, value) -> keyValueFinal.put(key, value.get("value")));
            processedResultsList.add(keyValueFinal);
        }
        if(shuffle) {
            java.util.Collections.shuffle(processedResultsList);
        }
        result.records = processedResultsList;
        result.totalRecords = totalItems;
        result.variables = this.head.get("vars");
        result.jsonLDRepresentation = transformDataToJsonLd(processedResultsList, queryType);

        return result;

    }

    public JsonLDResponse transformDataToJsonLd(List<Map<String, String>> finalListResult, String queryType) {
        Map<String, String> contextMap = new HashMap<>();
        contextMap.put("mo", "http://purl.org/ontology/mo/");
        contextMap.put("dc", "http://purl.org/dc/elements/1.1/");
        contextMap.put("foaf", "http://xmlns.com/foaf/0.1/");
        contextMap.put("xsd", "http://www.w3.org/2001/XMLSchema#");
        contextMap.put("rdfs", "http://www.w3.org/2000/01/rdf-schema#");

        List<Map<String, Object>> graphList = new ArrayList<>();
        if (queryType.equals("artist")) {
            for (Map<String, String> record : finalListResult) {
                Map<String, Object> artistRecord = new HashMap<>();
                artistRecord.put("@type", "mo:MusicArtist");
                artistRecord.put("@id", record.get("artist"));
                artistRecord.put("foaf:name", record.get("artistLabel"));

                graphList.add(artistRecord);
            }
            return new JsonLDResponse(contextMap, graphList);
        }
        if (queryType.equals("genre")) {
            for (Map<String, String> record : finalListResult) {

                Map<String, Object> genreObject = new HashMap<>();
                genreObject.put("@type", "mo:genre");
                genreObject.put("@id", record.get("genre"));
                genreObject.put("rdfs:label", record.get("genreLabel"));

                graphList.add(genreObject);
            }
            return new JsonLDResponse(contextMap, graphList);
        }
        for (Map<String, String> record : finalListResult) {
            Map<String, Object> vinylRecord = new HashMap<>();
            vinylRecord.put("@type", "mo:Vinyl");
            vinylRecord.put("@id", record.get("vinyl"));
            vinylRecord.put("dc:title", record.get("vinylLabel"));

            Map<String, Object> artistObject = new HashMap<>();
            artistObject.put("@type", "mo:MusicArtist");
            artistObject.put("foaf:name", record.get("artistLabel"));
            artistObject.put("@id", record.get("artist"));
            vinylRecord.put("foaf:maker", artistObject);

            Map<String, Object> genreObject = new HashMap<>();
            genreObject.put("@id", record.get("genre"));
            genreObject.put("rdfs:label", record.get("genreLabel"));
            vinylRecord.put("mo:genre", genreObject);

            Map<String, Object> dateObject = new HashMap<>();
            dateObject.put("@value", record.get("releaseDate"));
            dateObject.put("@type", "xsd:date");
            vinylRecord.put("dc:date", dateObject);

            graphList.add(vinylRecord);
        }

        return new JsonLDResponse(contextMap, graphList);
    }

}
