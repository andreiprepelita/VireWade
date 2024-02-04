package org.example.RecommendationAPI.models;

import java.util.ArrayList;
import java.util.List;

public class UserOptions {
    private List<String> favoriteArtists = new ArrayList<>();
    private List<String> leastFavoriteArtists = new ArrayList<>();
    private List<String> favoriteGenres = new ArrayList<>();
    private List<String> leastFavoriteGenres = new ArrayList<>();
    private Integer yearRangeStart = 0;
    private Integer yearRangeEnd = 0;
    private Integer limit = 0;
    private Integer pageSize = 5;
    private Integer numberOfItemsPerPage = 1;

    // Getters and Setters
    public List<String> getFavoriteArtists() {
        return favoriteArtists;
    }

    public void setFavoriteArtists(List<String> favoriteArtists) {
        this.favoriteArtists = favoriteArtists;
    }

    public List<String> getLeastFavoriteArtists() {
        return leastFavoriteArtists;
    }

    public void setLeastFavoriteArtists(List<String> leastFavoriteArtists) {
        this.leastFavoriteArtists = leastFavoriteArtists;
    }

    public List<String> getFavoriteGenres() {
        return favoriteGenres;
    }

    public void setFavoriteGenres(List<String> favoriteGenres) {
        this.favoriteGenres = favoriteGenres;
    }

    public List<String> getLeastFavoriteGenres() {
        return leastFavoriteGenres;
    }

    public void setLeastFavoriteGenres(List<String> leastFavoriteGenres) {
        this.leastFavoriteGenres = leastFavoriteGenres;
    }

    public Integer getYearRangeStart() {
        return yearRangeStart;
    }

    public void setYearRangeStart(Integer yearRangeStart) {
        this.yearRangeStart = yearRangeStart;
    }

    public Integer getYearRangeEnd() {
        return yearRangeEnd;
    }

    public void setYearRangeEnd(Integer yearRangeEnd) {
        this.yearRangeEnd = yearRangeEnd;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getNumberOfItemsPerPage() {
        return numberOfItemsPerPage;
    }

    public void setNumberOfItemsPerPage(Integer numberOfItemsPerPage) {
        this.numberOfItemsPerPage = numberOfItemsPerPage;
    }

    @Override
    public String toString() {
        return "UserOptions{" +
                "favoriteArtists=" + favoriteArtists +
                ", leastFavoriteArtists=" + leastFavoriteArtists +
                ", favoriteGenres=" + favoriteGenres +
                ", leastFavoriteGenres=" + leastFavoriteGenres +
                ", yearRangeStart=" + yearRangeStart +
                ", yearRangeEnd=" + yearRangeEnd +
                ", limit=" + limit +
                ", pageSize=" + pageSize +
                ", pageIndex=" + numberOfItemsPerPage +
                '}';
    }
}