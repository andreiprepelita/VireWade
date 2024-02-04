package org.example.RecommendationAPI.models;

public class OAuth1DiscogsCredentials {
    private String userToken;

    private String userTokenSecret;

    private String authorizationURL;

    private String verifierCodeUser;

    public OAuth1DiscogsCredentials() {

    }

    public OAuth1DiscogsCredentials(String userToken, String userTokenSecret, String authorizationURL, String verifierCodeUser) {
        this.userToken = userToken;
        this.userTokenSecret = userTokenSecret;
        this.authorizationURL = authorizationURL;
        this.verifierCodeUser = verifierCodeUser;
    }

    public String getUserToken() {
        return userToken;
    }

    public void setUserToken(String userToken) {
        this.userToken = userToken;
    }

    public String getUserTokenSecret() {
        return userTokenSecret;
    }

    public void setUserTokenSecret(String userTokenSecret) {
        this.userTokenSecret = userTokenSecret;
    }

    public String getAuthorizationURL() {
        return authorizationURL;
    }

    public void setAuthorizationURL(String authorizationURL) {
        this.authorizationURL = authorizationURL;
    }

    public String getVerifierCodeUser() {
        return verifierCodeUser;
    }

    public void setVerifierCodeUser(String verifierCodeUser) {
        this.verifierCodeUser = verifierCodeUser;
    }
}
