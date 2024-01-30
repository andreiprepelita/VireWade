package org.example.RecommendationAPI.models;

public class VinylRanking {

    private String fieldToRankBy;
    private Integer numberOfItemsPerPage = 5;

    private Integer pageNumber = 1;

    private Integer limitQuery = 0;

    private Boolean shuffle = false;

    public String getFieldToRankBy() {
        return fieldToRankBy;
    }

    public void setFieldToRankBy(String fieldToRankBy) {
        this.fieldToRankBy = fieldToRankBy;
    }

    public Integer getNumberOfItemsPerPage() {
        return numberOfItemsPerPage;
    }

    public void setNumberOfItemsPerPage(Integer numberOfItemsPerPage) {
        this.numberOfItemsPerPage = numberOfItemsPerPage;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Integer getLimitQuery() {
        return limitQuery;
    }

    public void setLimitQuery(Integer limitQuery) {
        this.limitQuery = limitQuery;
    }

    public Boolean getShuffle() {
        return shuffle;
    }

    public void setShuffle(Boolean shuffle) {
        this.shuffle = shuffle;
    }
}
