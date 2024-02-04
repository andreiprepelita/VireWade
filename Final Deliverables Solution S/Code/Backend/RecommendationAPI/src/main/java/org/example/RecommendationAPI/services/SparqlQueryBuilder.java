package org.example.RecommendationAPI.services;

import org.example.RecommendationAPI.models.SparqlQuery;
import org.springframework.stereotype.Service;

@Service
public class SparqlQueryBuilder {

    String queryBuilder = "";

    public SparqlQueryBuilder addPrefixSparqlResults() {
        this.queryBuilder += "PREFIX sparqlResults: <http://www.w3.org/2005/sparql-results#>" +"\n";
        return this;
    }

    public SparqlQueryBuilder addPrefixRdfSyntax() {
        this.queryBuilder += "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>"+"\n";
        return this;
    }

    public SparqlQueryBuilder addPrefixXMLSchema() {
        this.queryBuilder += "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>"+"\n";
        return this;
    }

    public SparqlQueryBuilder addSelectDistinctSyntax() {
        this.queryBuilder += "\nSELECT DISTINCT ";
        return this;
    }
    public SparqlQueryBuilder addSelectSyntax() {
        this.queryBuilder += "\nSELECT ";
        return this;
    }

    public SparqlQueryBuilder addFieldToSelect(String fieldName) {
        this.queryBuilder += "?" + fieldName + " ";
        return this;
    }

    public SparqlQueryBuilder addCountFieldToSelect(String fieldName, String countAlias) {
        this.queryBuilder += "(COUNT(?" + fieldName + ") AS ?" + countAlias + ") ";
        return this;
    }

    public SparqlQueryBuilder addWhereSyntaxForResult() {
        this.queryBuilder += "\nWHERE {\n";
        this.queryBuilder += "?result a sparqlResults:ResultSet .\n";
        this.queryBuilder += "?result sparqlResults:solution ?solution .\n";
        return this;
    }

    public SparqlQueryBuilder addBindingVariableInWhereSyntax(String fieldName) {
        this.queryBuilder += "?solution sparqlResults:binding [ sparqlResults:variable \"" + fieldName + "\" ; sparqlResults:value ?" + fieldName + " ] .\n";
        return this;
    }
    public SparqlQueryBuilder cleanQuery() {
        this.queryBuilder = "";
        return this;
    }

    public SparqlQuery QueryBuilder() {
        return new SparqlQuery(this.queryBuilder);
    }

    public SparqlQueryBuilder addLimitSyntax(Integer limitValue) {
        this.queryBuilder += "\nLIMIT " + limitValue;
        return this;
    }

    public SparqlQueryBuilder addGroupBySyntax(String filedName) {
        this.queryBuilder += "\nGROUP BY ?" + filedName;
        return this;
    }

    public SparqlQueryBuilder addOrderBySyntax(boolean orderBy, String fieldName) {
        String order = orderBy ? "ASC" : "DESC";
        this.queryBuilder += "\nORDER BY " + order + "(?"+ fieldName +")";
        return this;
    }

    public SparqlQueryBuilder addFilterSyntaxInWhereSyntax() {
        this.queryBuilder += "\nFILTER (";
        return this;
    }

    public SparqlQueryBuilder addContainsSyntaxInFilterSyntax(String fieldName, String containedValue) {
        this.queryBuilder += "contains(?" + fieldName + ", \"" + containedValue + "\") ";
        return this;
    }

    public SparqlQueryBuilder addNotContainsSyntaxInFilterSyntax(String fieldName, String containedValue) {
        this.queryBuilder += "!contains(?" + fieldName + ", \"" + containedValue + "\") ";
        return this;
    }

    public SparqlQueryBuilder addOrOperatorInFilterSyntax() {
        this.queryBuilder += "||\n";
        return this;
    }

    public SparqlQueryBuilder addAndOperatorInFilterSyntax() {
        this.queryBuilder += "&&\n";
        return this;
    }

    public SparqlQueryBuilder addLeftParanthesisSyntax() {
        this.queryBuilder += "(";
        return this;
    }

    public SparqlQueryBuilder addRightParanthesisSyntax() {
        this.queryBuilder += ")";
        return this;
    }
    public SparqlQueryBuilder closeWhereSyntax() {
        this.queryBuilder += "}\n";
        return this;
    }

    public SparqlQueryBuilder closeFilterSyntax() {
        this.queryBuilder += ")\n";
        return this;
    }

    public SparqlQueryBuilder addConditionForDateRangeInFilter(String fieldName, String operator, String date) {
        this.queryBuilder += "?" + fieldName + " " + operator + " xsd:dateTime('" + date + "')";
        return this;
    }

    public SparqlQueryBuilder deleteLastAndOrOperatorInFilter() {
        this.queryBuilder = this.queryBuilder.substring(0, this.queryBuilder.length() - 3);
        return this;
    }

}
