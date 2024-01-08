package org.example.RecommendationAPI.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

public class JsonLDResponse {
    @JsonProperty("@context")
    private Map<String, String> context;

    @JsonProperty("@graph")
    private List<Map<String, Object>> graph;

    public JsonLDResponse(Map<String, String> context, List<Map<String, Object>> graph) {
        this.context = context;
        this.graph = graph;
    }

    public Map<String, String> getContext() {
        return context;
    }

    public void setContext(Map<String, String> context) {
        this.context = context;
    }

    public List<Map<String, Object>> getGraph() {
        return graph;
    }

    public void setGraph(List<Map<String, Object>> graph) {
        this.graph = graph;
    }
}
