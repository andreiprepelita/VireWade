package org.example.RecommendationAPI.services;

import org.example.RecommendationAPI.models.SparqlQuery;
import org.example.RecommendationAPI.models.SparqlResponse;
import org.example.RecommendationAPI.models.UserOptions;
import org.example.RecommendationAPI.util.UtilUserOptionsCase;
import org.example.RecommendationAPI.services.DiscogsService;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.io.IOException;
import java.util.List;

@Service
public class LinkedDataService {

    private final SparqlQueryBuilder sparqlQueryBuilder;

    private final DiscogsService discogsService;


    @Inject
    public LinkedDataService(SparqlQueryBuilder sparqlQueryBuilder, DiscogsService discogsService) {

        this.sparqlQueryBuilder = sparqlQueryBuilder;
        this.discogsService = discogsService;
    }

    public SparqlResponse getTopItemsByRankingUsingCount(Integer limitQuery, String fieldToRankBy) {
        sparqlQueryBuilder.cleanQuery();
        addBasedPrefixes();
        sparqlQueryBuilder.addSelectSyntax();
        sparqlQueryBuilder.addFieldToSelect(fieldToRankBy);
        sparqlQueryBuilder.addFieldToSelect(fieldToRankBy+"Label");
        sparqlQueryBuilder.addCountFieldToSelect(UtilUserOptionsCase.VINYL_URI, "numberOfVinyls");
        sparqlQueryBuilder.addWhereSyntaxForResult();
        sparqlQueryBuilder.addBindingVariableInWhereSyntax(UtilUserOptionsCase.VINYL_URI);
        sparqlQueryBuilder.addBindingVariableInWhereSyntax(fieldToRankBy);
        sparqlQueryBuilder.addBindingVariableInWhereSyntax(fieldToRankBy+"Label");
        sparqlQueryBuilder.closeWhereSyntax();
        sparqlQueryBuilder.addGroupBySyntax(fieldToRankBy + " ?" + fieldToRankBy+"Label");
        sparqlQueryBuilder.addOrderBySyntax(false, "numberOfVinyls");

        SparqlQuery query = limitQuery == 0
                ? sparqlQueryBuilder.QueryBuilder()
                : sparqlQueryBuilder.addLimitSyntax(limitQuery)
                .QueryBuilder();
        //sparqlQueryBuilder.cleanQuery();
        return query.sendRequest();
    }

    public SparqlResponse getRecommendationsByUserOptions(UserOptions userOptions) {
        sparqlQueryBuilder.cleanQuery();
        addBasedPrefixes();
        addInSelectClauseAllFields();
        addWhereBindingsAllFields();
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

    public SparqlResponse getRecommendationByDiscogsUsingDiscogsToken(String discogsToken, String discogsTokenSecret) throws IOException {
        UserOptions userOptions = discogsService.getPastPurchasesFromDiscogs(discogsToken, discogsTokenSecret);

        sparqlQueryBuilder.cleanQuery();
        addBasedPrefixes();
        addInSelectClauseAllFields();
        addWhereBindingsAllFields();
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
            addContainsFavoriteList(favoriteArtists, UtilUserOptionsCase.ARTIST_LABEL);
        }
        if(!favoriteArtists.isEmpty() && !favoriteGenres.isEmpty()) {
            sparqlQueryBuilder.addOrOperatorInFilterSyntax();
        }
        if(!favoriteGenres.isEmpty()) {
            addContainsFavoriteList(favoriteGenres, UtilUserOptionsCase.GENRE_LABEL);
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
            sparqlQueryBuilder.addConditionForDateRangeInFilter(UtilUserOptionsCase.RELEASEDDATE, ">=", yearRangeStart.toString() + "-01-01");
        }
        if(yearRangeStart!=0 && yearRangeEnd!=0) {
            sparqlQueryBuilder.addAndOperatorInFilterSyntax();
        }
        if(yearRangeEnd!=0) {
            sparqlQueryBuilder.addConditionForDateRangeInFilter(UtilUserOptionsCase.RELEASEDDATE, "<=", yearRangeEnd.toString() + "-12-31");
        }
    }

    private void addFilterForLeastFavoriteThings(List<String> favoriteArtists, List<String> favoriteGenres, Integer yearRangeStart, Integer yearRangeEnd, List<String> leastFavoriteArtists, List<String> leastFavoriteGenres) {
        if ((!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty() || yearRangeStart!=0 || yearRangeEnd!=0) &&
                (!leastFavoriteArtists.isEmpty() || !leastFavoriteGenres.isEmpty())) {
            sparqlQueryBuilder.addAndOperatorInFilterSyntax();
        }
        if(!leastFavoriteArtists.isEmpty()) {
            addNotContainsFavoriteList(leastFavoriteArtists, UtilUserOptionsCase.ARTIST_LABEL);
        }
        if(!leastFavoriteArtists.isEmpty() && !leastFavoriteGenres.isEmpty()) {
            sparqlQueryBuilder.addAndOperatorInFilterSyntax();
        }
        if(!leastFavoriteGenres.isEmpty()) {
            addNotContainsFavoriteList(leastFavoriteGenres, UtilUserOptionsCase.GENRE_LABEL);
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
                .addFieldToSelect(UtilUserOptionsCase.VINYL_URI)
                .addFieldToSelect(UtilUserOptionsCase.VINYL_LABEL)
                .addFieldToSelect(UtilUserOptionsCase.ARTIST_URI)
                .addFieldToSelect(UtilUserOptionsCase.ARTIST_LABEL)
                .addFieldToSelect(UtilUserOptionsCase.GENRE_URI)
                .addFieldToSelect(UtilUserOptionsCase.GENRE_LABEL)
                .addFieldToSelect(UtilUserOptionsCase.RELEASEDDATE);
    }

    private void addWhereBindingsAllFields() {
        this.sparqlQueryBuilder.addWhereSyntaxForResult()
                .addBindingVariableInWhereSyntax(UtilUserOptionsCase.VINYL_URI)
                .addBindingVariableInWhereSyntax(UtilUserOptionsCase.VINYL_LABEL)
                .addBindingVariableInWhereSyntax(UtilUserOptionsCase.ARTIST_URI)
                .addBindingVariableInWhereSyntax(UtilUserOptionsCase.ARTIST_LABEL)
                .addBindingVariableInWhereSyntax(UtilUserOptionsCase.GENRE_URI)
                .addBindingVariableInWhereSyntax(UtilUserOptionsCase.GENRE_LABEL)
                .addBindingVariableInWhereSyntax(UtilUserOptionsCase.RELEASEDDATE);
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
