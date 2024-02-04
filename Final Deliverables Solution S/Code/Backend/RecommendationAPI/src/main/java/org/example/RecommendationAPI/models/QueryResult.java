package org.example.RecommendationAPI.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.example.RecommendationAPI.models.JsonLDResponse;
public class QueryResult {
    public JsonLDResponse jsonLDRepresentation;
    public Integer totalRecords = 0;
    public List<Map<String,String>> records = new ArrayList<>();
    public List<String> variables = new ArrayList<>();

}
