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

    public SparqlResponse GetRecommendationsByPreferences(UserOptions userOptions) {
        sparqlQueryBuilder.CleanQuery();
        AddGeneralPrefixes();
        AddSelectAllFields();
        AddWhereBindingsAllFields();
        AddFilters(userOptions.getLeastFavoriteArtists(), userOptions.getLeastFavoriteGenres(),
                userOptions.getFavoriteArtists(), userOptions.getFavoriteGenres(),
                userOptions.getYearRangeStart(), userOptions.getYearRangeEnd());

        sparqlQueryBuilder.CloseWhereSyntax();

        SparqlQuery query = userOptions.getLimit() == 0
                ? sparqlQueryBuilder.QueryBuilder()
                : sparqlQueryBuilder.AddLimitSyntax(userOptions.getLimit())
                .QueryBuilder();
        System.out.println("QUERY:");
        System.out.println(query);

        return query.SendRequest();
    }

    private void AddFilters(List<String> leastFavoriteArtists, List<String> leastFavoriteGenres, List<String> favoriteArtists, List<String> favoriteGenres, Integer yearRangeStart, Integer yearRangeEnd) {

        if (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty() ||
                !leastFavoriteArtists.isEmpty() || !leastFavoriteGenres.isEmpty() ||
                yearRangeStart != 0 || yearRangeEnd != 0) {
            sparqlQueryBuilder.AddFilterSyntaxInWhereSyntax();

            AddFilterForFavoriteThings(favoriteArtists, favoriteGenres);
            AddYearRangeFilter(favoriteArtists, favoriteGenres, yearRangeStart, yearRangeEnd);
            AddFilterForLeastFavoriteThings(favoriteArtists, favoriteGenres, yearRangeStart, yearRangeEnd, leastFavoriteArtists, leastFavoriteGenres);

            sparqlQueryBuilder.CloseFilterSyntax();
        }
    }

    private void AddFilterForFavoriteThings(List<String> favoriteArtists, List<String> favoriteGenres) {
        if (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty()) {
            sparqlQueryBuilder.AddLeftParanthesisSyntax();
        }
        if(!favoriteArtists.isEmpty()) {
            AddContainsLikedList(favoriteArtists, Util.ARTIST_LABEL);
        }
        if(!favoriteArtists.isEmpty() && !favoriteGenres.isEmpty()) {
            sparqlQueryBuilder.AddOrOperatorInFilterSyntax();
        }
        if(!favoriteGenres.isEmpty()) {
            AddContainsLikedList(favoriteGenres, Util.GENRE_LABEL);
        }
        if (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty()) {
            sparqlQueryBuilder.AddRightParanthesisSyntax();
        }
    }

    private void AddYearRangeFilter(List<String> favoriteArtists, List<String> favoriteGenres, Integer yearRangeStart, Integer yearRangeEnd) {
        if ((yearRangeStart!=0 || yearRangeEnd!=0) && (!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty())) {
            sparqlQueryBuilder.AddAndOperatorInFilterSyntax();
        }
        if (yearRangeStart!=0) {
            sparqlQueryBuilder.AddConditionForDateRangeInFilter(Util.RELEASEDDATE, ">=", yearRangeStart.toString() + "-01-01");
        }
        if(yearRangeStart!=0 && yearRangeEnd!=0) {
            sparqlQueryBuilder.AddAndOperatorInFilterSyntax();
        }
        if(yearRangeEnd!=0) {
            sparqlQueryBuilder.AddConditionForDateRangeInFilter(Util.RELEASEDDATE, "<=", yearRangeEnd.toString() + "-12-31");
        }
    }

    private void AddFilterForLeastFavoriteThings(List<String> favoriteArtists, List<String> favoriteGenres, Integer yearRangeStart, Integer yearRangeEnd, List<String> leastFavoriteArtists, List<String> leastFavoriteGenres) {
        if ((!favoriteArtists.isEmpty() || !favoriteGenres.isEmpty() || yearRangeStart!=0 || yearRangeEnd!=0) &&
                (!leastFavoriteArtists.isEmpty() || !leastFavoriteGenres.isEmpty())) {
            sparqlQueryBuilder.AddAndOperatorInFilterSyntax();
        }
        if(!leastFavoriteArtists.isEmpty()) {
            AddNotContainsLikedList(leastFavoriteArtists, Util.ARTIST_LABEL);
        }
        if(!leastFavoriteArtists.isEmpty() && !leastFavoriteGenres.isEmpty()) {
            sparqlQueryBuilder.AddAndOperatorInFilterSyntax();
        }
        if(!leastFavoriteGenres.isEmpty()) {
            AddNotContainsLikedList(leastFavoriteGenres, Util.GENRE_LABEL);
        }
    }
    private void AddGeneralPrefixes() {
        this.sparqlQueryBuilder
                .AddPrefixRdfSyntax()
                .AddPrefixSparqlResults()
                .AddPrefixXMLSchema();
    }

    private void AddSelectAllFields() {
        this.sparqlQueryBuilder.AddSelectDistinctSyntax()
                .AddFieldToSelect(Util.VINYL_URI)
                .AddFieldToSelect(Util.VINYL_LABEL)
                .AddFieldToSelect(Util.ARTIST_URI)
                .AddFieldToSelect(Util.ARTIST_LABEL)
                .AddFieldToSelect(Util.GENRE_URI)
                .AddFieldToSelect(Util.GENRE_LABEL)
                .AddFieldToSelect(Util.RELEASEDDATE);
    }

    private void AddWhereBindingsAllFields() {
        this.sparqlQueryBuilder.AddWhereSyntaxForResult()
                .AddBindingVariableInWhereSyntax(Util.VINYL_URI)
                .AddBindingVariableInWhereSyntax(Util.VINYL_LABEL)
                .AddBindingVariableInWhereSyntax(Util.ARTIST_URI)
                .AddBindingVariableInWhereSyntax(Util.ARTIST_LABEL)
                .AddBindingVariableInWhereSyntax(Util.GENRE_URI)
                .AddBindingVariableInWhereSyntax(Util.GENRE_LABEL)
                .AddBindingVariableInWhereSyntax(Util.RELEASEDDATE);
    }

    private void AddContainsLikedList(List<String> likedList, String entity) {
        likedList
                .forEach(likeditem -> sparqlQueryBuilder.AddContainsSyntaxInFilterSyntax(entity, likeditem)
                        .AddOrOperatorInFilterSyntax());
        this.sparqlQueryBuilder.DeleteLastAndOrOperatorInFilter();

    }

    private void AddNotContainsLikedList(List<String> dislikedList, String entity) {
        dislikedList
                .forEach(dislikedItem -> sparqlQueryBuilder.AddNotContainsSyntaxInFilterSyntax(entity, dislikedItem)
                        .AddAndOperatorInFilterSyntax());
        this.sparqlQueryBuilder.DeleteLastAndOrOperatorInFilter();
    }

}
