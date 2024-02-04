package org.example.RecommendationAPI.services;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.example.RecommendationAPI.models.OAuth1DiscogsCredentials;
import org.example.RecommendationAPI.util.UtilDiscogs;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;

@Service
public class DiscogsAuthService {

    private OAuth1DiscogsCredentials oAuth1DiscogsCredentials;

    private String tokenUser;
    private String tokenSecretUser;

    private String verifierUser;

    public OAuth1DiscogsCredentials getAuthorizePageURL() throws IOException {

        HttpGet getInitialToken = new HttpGet(UtilDiscogs.REQUEST_TOKEN_URL);
        getInitialToken.setHeader(HttpHeaders.AUTHORIZATION, getInitialTokenHeader());
        HttpResponse response = HttpClients.createDefault().execute(getInitialToken);
        HttpEntity entity = response.getEntity();
        String body = UtilDiscogs.transformInputFromByteToString(entity.getContent());
        oAuth1DiscogsCredentials = new OAuth1DiscogsCredentials();
        return transformBodyToOAuth1DiscogsCredentials(oAuth1DiscogsCredentials,body);
    }

    private OAuth1DiscogsCredentials transformBodyToOAuth1DiscogsCredentials(OAuth1DiscogsCredentials oAuth1DiscogsCredentials, String body) {
        String[] parts = body.split("&");
        System.out.println("Parts");
        System.out.println(body);
        tokenUser = parts[0].substring(parts[0].indexOf("=") + 1);
        tokenSecretUser = parts[1].substring(parts[1].indexOf("=") + 1);
        System.out.println(tokenUser);
        System.out.println(tokenSecretUser);
        oAuth1DiscogsCredentials.setAuthorizationURL(UtilDiscogs.AUTHORIZE_URL + "?" + parts[0] + "&" + parts[1]);
        return oAuth1DiscogsCredentials;
    }

    private String getInitialTokenHeader() {
        return "OAuth " +
                "oauth_consumer_key=\"" + UtilDiscogs.CONSUMER_KEY + "\", " +
                "oauth_nonce=\"" + UUID.randomUUID() + "\", " +
                "oauth_signature=\"" + UtilDiscogs.CONSUMER_SECRET + "&\", " +
                "oauth_signature_method=\"" + "PLAINTEXT" + "\", " +
                "oauth_timestamp=" + System.currentTimeMillis() / 1000 + "\", " +
                "oauth_callback=" + "\"http://localhost:8080/profile/1\"";
    }

    public OAuth1DiscogsCredentials getAccessToken(String authentication, String verifier) throws IOException {
        HttpPost postAccessToken = new HttpPost(UtilDiscogs.ACCESS_TOKEN_URL);
        postAccessToken.setHeader(HttpHeaders.AUTHORIZATION, getAccessTokenHeader(verifier));
        oAuth1DiscogsCredentials.setVerifierCodeUser(verifier);

        HttpResponse response = HttpClients.createDefault().execute(postAccessToken);
        if(response.getStatusLine().getStatusCode() == 200) {
            HttpEntity entity = response.getEntity();
            String body = UtilDiscogs.transformInputFromByteToString(entity.getContent());
            System.out.println("TEST!");
            System.out.println(body);
            return transformBodyToOAuth1DiscogsCredentialsForAccessToken(authentication, body, oAuth1DiscogsCredentials);
        } else {
            return null;
        }
    }

    private String getAccessTokenHeader(String verifier) {

        return "OAuth " +
                "oauth_consumer_key=\"" + UtilDiscogs.CONSUMER_KEY + "\", " +
                "oauth_nonce=\"" + UUID.randomUUID() + "\", " +
                "oauth_token=\"" + tokenUser + "\", " +
                "oauth_signature=\"" + UtilDiscogs.CONSUMER_SECRET + "&" + tokenSecretUser + "\", " +
                "oauth_signature_method=\"" + "PLAINTEXT" + "\", " +
                "oauth_timestamp=\"" + System.currentTimeMillis() / 1000 + "\", " +
                "oauth_verifier=\"" + verifier + "\"";
    }

    public OAuth1DiscogsCredentials transformBodyToOAuth1DiscogsCredentialsForAccessToken(String authentication, String body, OAuth1DiscogsCredentials oAuth1DiscogsCredentials) {
        String[] parts = body.split("&");
        System.out.println("Access Body");
        System.out.println(body);
        tokenUser = parts[0].substring(parts[0].indexOf("=") + 1);
        tokenSecretUser = parts[1].substring(parts[1].indexOf("=") + 1);
        System.out.println(tokenUser);
        System.out.println(tokenSecretUser);
        oAuth1DiscogsCredentials.setUserToken(tokenUser);
        oAuth1DiscogsCredentials.setUserTokenSecret(tokenSecretUser);
        //saveDiscogsTokenToUserDB(oAuth1DiscogsCredentials, authentication);
        return oAuth1DiscogsCredentials;
    }
    private void saveDiscogsTokenToUserDB(OAuth1DiscogsCredentials oAuth1DiscogsCredentials, String authentication) {
        HttpPost userPostRequest = makeHttpPostToUserAPI(oAuth1DiscogsCredentials, authentication);
        try {
            HttpResponse response = HttpClients.createDefault().execute(userPostRequest);
            System.out.println(response.getStatusLine());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private HttpPost makeHttpPostToUserAPI(OAuth1DiscogsCredentials oAuth1DiscogsCredentials, String authentication) {
        HttpPost userPostRequest = new HttpPost(UtilDiscogs.IDENTITY_API);
        userPostRequest.setHeader(HttpHeaders.AUTHORIZATION, String.format("Bearer %s", authentication));
        userPostRequest.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
        JSONObject jsonData = returnDiscogsTokens(oAuth1DiscogsCredentials);
        StringEntity data = new StringEntity(jsonData.toString(), "UTF-8");
        userPostRequest.setEntity(data);
        return userPostRequest;
    }
    private JSONObject returnDiscogsTokens(OAuth1DiscogsCredentials oAuth1DiscogsCredentials) {
        JSONObject discogsTokens = new JSONObject();
        discogsTokens.put("token", oAuth1DiscogsCredentials.getUserToken());
        discogsTokens.put("tokenSecret", oAuth1DiscogsCredentials.getUserTokenSecret());
        return discogsTokens;
    }

}
