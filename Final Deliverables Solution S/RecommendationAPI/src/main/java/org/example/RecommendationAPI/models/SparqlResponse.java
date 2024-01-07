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

    public QueryResult GetResult(Integer pageIndex, Integer pageSize) {
        QueryResult result = new QueryResult();
        List<Map<String, Map<String, String>>> bindings = this.results.get("bindings");
        List<Map<String, String>> finalListResult = new ArrayList<>();
        int totalRecords = bindings.size();
        if(pageSize == 0) {
            pageSize = totalRecords;
        }
        pageIndex = pageIndex - 1;
        int startPosition = pageIndex * pageSize;
        int endPosition = Math.min((pageIndex + 1) * pageSize, totalRecords);
        for (int i = startPosition; i< endPosition; i++){
            Map<String, String> keyValueFinal = new HashMap<>();
            bindings.get(i).forEach((key, value) -> keyValueFinal.put(key, value.get("value")));
            finalListResult.add(keyValueFinal);
        }

        result.records = finalListResult;
        result.totalRecords = totalRecords;
        result.variables = this.head.get("vars");
        JsonLDResponse jsonLDResponse = transformDataToJsonLd(finalListResult);
        //jsonLDResponse.
        result.jsonLDRepresentation = transformDataToJsonLd(finalListResult);

        return result;

    }

    public JsonLDResponse transformDataToJsonLd(List<Map<String, String>> finalListResult) {
        Map<String, String> contextMap = new HashMap<>();
        contextMap.put("mo", "http://purl.org/ontology/mo/");
        contextMap.put("dc", "http://purl.org/dc/elements/1.1/");
        contextMap.put("foaf", "http://xmlns.com/foaf/0.1/");
        contextMap.put("xsd", "http://www.w3.org/2001/XMLSchema#");
        contextMap.put("rdfs", "http://www.w3.org/2000/01/rdf-schema#");

        List<Map<String, Object>> graphList = new ArrayList<>();

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
