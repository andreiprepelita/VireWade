package org.example.RecommendationAPI.services;

import org.example.RecommendationAPI.models.SparqlQuery;
import org.springframework.stereotype.Service;

@Service
public class SparqlQueryBuilder {

    String queryBuilder = "";

    public SparqlQueryBuilder AddPrefixSparqlResults() {
        this.queryBuilder += "PREFIX sparqlResults: <http://www.w3.org/2005/sparql-results#>";
        return this;
    }

    public SparqlQueryBuilder AddPrefixRdfSyntax() {
        this.queryBuilder += "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>";
        return this;
    }

    public SparqlQueryBuilder AddPrefixXMLSchema() {
        this.queryBuilder += "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>";
        return this;
    }

    public SparqlQueryBuilder AddSelectDistinctSyntax() {
        this.queryBuilder += "\nSELECT DISTINCT ";
        return this;
    }
    public SparqlQueryBuilder AddSelectSyntax() {
        this.queryBuilder += "\nSELECT ";
        return this;
    }

    public SparqlQueryBuilder AddFieldToSelect(String fieldName) {
        this.queryBuilder += "?" + fieldName + " ";
        return this;
    }

    public SparqlQueryBuilder AddCountFieldToSelect(String fieldName, String countAlias) {
        this.queryBuilder += "(COUNT(?" + fieldName + ") AS ?" + countAlias + ") ";
        return this;
    }

    public SparqlQueryBuilder AddWhereSyntaxForResult() {
        this.queryBuilder += "\nWHERE {\n";
        this.queryBuilder += "?result a sparqlResults:ResultSet .\n";
        this.queryBuilder += "?result sparqlResults:solution ?solution .\n";
        return this;
    }

    public SparqlQueryBuilder AddBindingVariableInWhereSyntax(String fieldName) {
        this.queryBuilder += "?solution sparqlResults:binding [ sparqlResults:variable \"" + fieldName + "\" ; sparqlResults:value ?" + fieldName + " ] .\n";
        return this;
    }
    public SparqlQueryBuilder CleanQuery() {
        this.queryBuilder = "";
        return this;
    }

    public SparqlQuery QueryBuilder() {
        return new SparqlQuery(this.queryBuilder);
    }

    public SparqlQueryBuilder AddLimitSyntax (Integer limitValue) {
        this.queryBuilder += "\nLIMIT " + limitValue;
        return this;
    }

    public SparqlQueryBuilder AddGroupBySyntax(String filedName) {
        this.queryBuilder += "\nGROUP BY ?" + filedName;
        return this;
    }

    public SparqlQueryBuilder AddOrderBySyntax(boolean orderBy, String fieldName) {
        String order = orderBy ? "ASC" : "DESC";
        this.queryBuilder += "\nORDER BY " + order + "(?"+ fieldName +")";
        return this;
    }

    public SparqlQueryBuilder AddFilterSyntaxInWhereSyntax() {
        this.queryBuilder += "\nFILTER (";
        return this;
    }

    public SparqlQueryBuilder AddContainsSyntaxInFilterSyntax(String fieldName, String containedValue) {
        this.queryBuilder += "contains(?" + fieldName + ", \"" + containedValue + "\") ";
        return this;
    }

    public SparqlQueryBuilder AddNotContainsSyntaxInFilterSyntax(String fieldName, String containedValue) {
        this.queryBuilder += "!contains(?" + fieldName + ", \"" + containedValue + "\") ";
        return this;
    }

    public SparqlQueryBuilder AddOrOperatorInFilterSyntax() {
        this.queryBuilder += "||\n";
        return this;
    }

    public SparqlQueryBuilder AddAndOperatorInFilterSyntax() {
        this.queryBuilder += "&&\n";
        return this;
    }

    public SparqlQueryBuilder AddLeftParanthesisSyntax() {
        this.queryBuilder += "(";
        return this;
    }

    public SparqlQueryBuilder AddRightParanthesisSyntax() {
        this.queryBuilder += ")";
        return this;
    }
    public SparqlQueryBuilder CloseWhereSyntax() {
        this.queryBuilder += "}\n";
        return this;
    }

    public SparqlQueryBuilder CloseFilterSyntax() {
        this.queryBuilder += ")\n";
        return this;
    }

    public SparqlQueryBuilder AddConditionForDateRangeInFilter(String fieldName, String operator, String date) {
        this.queryBuilder += "?" + fieldName + " " + operator + " xsd:dateTime('" + date + "')";
        return this;
    }

    public SparqlQueryBuilder DeleteLastAndOrOperatorInFilter() {
        this.queryBuilder = this.queryBuilder.substring(0, this.queryBuilder.length() - 3);
        return this;
    }

}
