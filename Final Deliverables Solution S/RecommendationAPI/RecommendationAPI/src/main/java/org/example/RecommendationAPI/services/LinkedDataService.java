package org.example.RecommendationAPI.services;

import org.example.RecommendationAPI.models.SparqlQuery;
import org.example.RecommendationAPI.models.SparqlResponse;
import org.example.RecommendationAPI.models.UserOptions;
import org.example.RecommendationAPI.util.Util;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

@Service
public class LinkedDataService {

    private final SparqlQueryBuilder sparqlQueryBuilder;


    @Inject
    public LinkedDataService(SparqlQueryBuilder sparqlQueryBuilder) {
        this.sparqlQueryBuilder = sparqlQueryBuilder;
    }

    public SparqlResponse getTopItemsByRankingUsingCount(Integer limitQuery, String fieldToRankBy) {
        sparqlQueryBuilder.cleanQuery();
        addBasedPrefixes();
        sparqlQueryBuilder.addSelectSyntax();
        sparqlQueryBuilder.addFieldToSelect(fieldToRankBy);
        sparqlQueryBuilder.addFieldToSelect(fieldToRankBy+"Label");
        sparqlQueryBuilder.addCountFieldToSelect(Util.VINYL_URI, "numberOfVinyls");
        sparqlQueryBuilder.addWhereSyntaxForResult();
        sparqlQueryBuilder.addBindingVariableInWhereSyntax(Util.VINYL_URI);
        sparqlQueryBuilder.addBindingVariableInWhereSyntax(fieldToRankBy);
        sparqlQueryBuilder.addBindingVariableInWhereSyntax(fieldToRankBy+"Label");
        sparqlQueryBuilder.closeWhereSyntax();
        sparqlQueryBuilder.addGroupBySyntax(fieldToRankBy + " ?" + fieldToRankBy+"Label");
        sparqlQueryBuilder.addOrderBySyntax(false, "numberOfVinyls");

        SparqlQuery query = limitQuery == 0
                ? sparqlQueryBuilder.QueryBuilder()
                : sparqlQueryBuilder.addLimitSyntax(limitQuery)
                .QueryBuilder();

        return query.sendRequest();
    }

    public SparqlResponse getRecommendationsByUserOptions(UserOptions userOptions) {
        sparqlQueryBuilder.cleanQuery();
        addBasedPrefixes();
        addInSelectClauseAllFields();
        AddWhereBindingsAllFields();
        addFiltersForUserOptions(userOptions.getLeastFavoriteArtists(), userOptions.getLeastFavoriteGenres(),
                userOptions.getFavoriteArtists(), userOptions.getFavoriteGenres(),
                userOptions.getYearRangeStart(), userOptions.getYearRangeEnd());

        sparqlQueryBuilder.closeWhereSyntax();

        SparqlQuery query = userOptions.getLimit() == 0
                ? sparqlQueryBuilder.QueryBuilder()
                : sparqlQueryBuilder.addLimitSyntax(userOptions.getLimit())
                .QueryBuilder();
        System.out.println("QUERY:");
        System.out.println(query);

        return query.sendRequest();
    }

    private void addFiltersForUserOptions(List<String> leastFavoriteArtists, List<String> leastFavoriteGenres, List<String> favoriteArtists, List<String> favoriteGenres, Integer yearRangeStart, Integer yearRangeEnd) {

        if (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty() ||
                !leastFavoriteArtists.isEmpty() || !leastFavoriteGenres.isEmpty() ||
                yearRangeStart != 0 || yearRangeEnd != 0) {
            sparqlQueryBuilder.addFilterSyntaxInWhereSyntax();

            addFilterForFavoriteThings(favoriteArtists, favoriteGenres);
            addYearRangeFilter(favoriteArtists, favoriteGenres, yearRangeStart, yearRangeEnd);
            addFilterForLeastFavoriteThings(favoriteArtists, favoriteGenres, yearRangeStart, yearRangeEnd, leastFavoriteArtists, leastFavoriteGenres);

            sparqlQueryBuilder.closeFilterSyntax();
        }
    }

    private void addFilterForFavoriteThings(List<String> favoriteArtists, List<String> favoriteGenres) {
        if (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty()) {
            sparqlQueryBuilder.addLeftParanthesisSyntax();
        }
        if(!favoriteArtists.isEmpty()) {
            addContainsFavoriteList(favoriteArtists, Util.ARTIST_LABEL);
        }
        if(!favoriteArtists.isEmpty() && !favoriteGenres.isEmpty()) {
            sparqlQueryBuilder.addOrOperatorInFilterSyntax();
        }
        if(!favoriteGenres.isEmpty()) {
            addContainsFavoriteList(favoriteGenres, Util.GENRE_LABEL);
        }
        if (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty()) {
            sparqlQueryBuilder.addRightParanthesisSyntax();
        }
    }

    private void addYearRangeFilter(List<String> favoriteArtists, List<String> favoriteGenres, Integer yearRangeStart, Integer yearRangeEnd) {
        if ((yearRangeStart!=0 || yearRangeEnd!=0) && (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty())) {
            sparqlQueryBuilder.addAndOperatorInFilterSyntax();
        }
        if (yearRangeStart!=0) {
            sparqlQueryBuilder.addConditionForDateRangeInFilter(Util.RELEASEDDATE, ">=", yearRangeStart.toString() + "-01-01");
        }
        if(yearRangeStart!=0 && yearRangeEnd!=0) {
            sparqlQueryBuilder.addAndOperatorInFilterSyntax();
        }
        if(yearRangeEnd!=0) {
            sparqlQueryBuilder.addConditionForDateRangeInFilter(Util.RELEASEDDATE, "<=", yearRangeEnd.toString() + "-12-31");
        }
    }

    private void addFilterForLeastFavoriteThings(List<String> favoriteArtists, List<String> favoriteGenres, Integer yearRangeStart, Integer yearRangeEnd, List<String> leastFavoriteArtists, List<String> leastFavoriteGenres) {
        if ((!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty() || yearRangeStart!=0 || yearRangeEnd!=0) &&
                (!leastFavoriteArtists.isEmpty() || !leastFavoriteGenres.isEmpty())) {
            sparqlQueryBuilder.addAndOperatorInFilterSyntax();
        }
        if(!leastFavoriteArtists.isEmpty()) {
            addNotContainsFavoriteList(leastFavoriteArtists, Util.ARTIST_LABEL);
        }
        if(!leastFavoriteArtists.isEmpty() && !leastFavoriteGenres.isEmpty()) {
            sparqlQueryBuilder.addAndOperatorInFilterSyntax();
        }
        if(!leastFavoriteGenres.isEmpty()) {
            addNotContainsFavoriteList(leastFavoriteGenres, Util.GENRE_LABEL);
        }
    }
    private void addBasedPrefixes() {
        this.sparqlQueryBuilder
                .addPrefixRdfSyntax()
                .addPrefixSparqlResults()
                .addPrefixXMLSchema();
    }

    private void addInSelectClauseAllFields() {
        this.sparqlQueryBuilder.addSelectDistinctSyntax()
                .addFieldToSelect(Util.VINYL_URI)
                .addFieldToSelect(Util.VINYL_LABEL)
                .addFieldToSelect(Util.ARTIST_URI)
                .addFieldToSelect(Util.ARTIST_LABEL)
                .addFieldToSelect(Util.GENRE_URI)
                .addFieldToSelect(Util.GENRE_LABEL)
                .addFieldToSelect(Util.RELEASEDDATE);
    }

    private void AddWhereBindingsAllFields() {
        this.sparqlQueryBuilder.addWhereSyntaxForResult()
                .addBindingVariableInWhereSyntax(Util.VINYL_URI)
                .addBindingVariableInWhereSyntax(Util.VINYL_LABEL)
                .addBindingVariableInWhereSyntax(Util.ARTIST_URI)
                .addBindingVariableInWhereSyntax(Util.ARTIST_LABEL)
                .addBindingVariableInWhereSyntax(Util.GENRE_URI)
                .addBindingVariableInWhereSyntax(Util.GENRE_LABEL)
                .addBindingVariableInWhereSyntax(Util.RELEASEDDATE);
    }

    private void addContainsFavoriteList(List<String> likedList, String entity) {
        likedList.forEach(likeditem -> sparqlQueryBuilder.addContainsSyntaxInFilterSyntax(entity, likeditem)
                 .addOrOperatorInFilterSyntax());
        this.sparqlQueryBuilder.deleteLastAndOrOperatorInFilter(); //elimina ultimul OR

    }

    private void addNotContainsFavoriteList(List<String> dislikedList, String entity) {
        dislikedList.forEach(dislikedItem -> sparqlQueryBuilder.addNotContainsSyntaxInFilterSyntax(entity, dislikedItem)
                    .addAndOperatorInFilterSyntax());
        this.sparqlQueryBuilder.deleteLastAndOrOperatorInFilter(); //elimina ultimul AND
    }

}
