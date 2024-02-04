package org.example.RecommendationAPI.services;

import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.example.RecommendationAPI.models.UserOptions;
import org.example.RecommendationAPI.util.UtilDiscogs;
import org.json.JSONObject;
import org.json.JSONArray;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.Locale;
@Service
public class DiscogsService {

    private String tokenUser;

    private String tokenSecretUser;


    private JSONObject callToDiscogsAPI(String URL) throws IOException {
        HttpGet get = new HttpGet(URL);
        get.setHeader(HttpHeaders.AUTHORIZATION, getHeaderAPIOAuth1(this.tokenUser, this.tokenSecretUser));
        HttpResponse response = HttpClients.createDefault().execute(get);
        HttpEntity responseEntity = response.getEntity();
        String body = UtilDiscogs.transformInputFromByteToString(responseEntity.getContent());

        return new JSONObject(body);
    }

    private String getHeaderAPIOAuth1(String tokenUser, String tokenSecretUser){

        return "OAuth " +
                "oauth_consumer_key=\"" + UtilDiscogs.CONSUMER_KEY + "\", " +
                "oauth_nonce=\"" + UUID.randomUUID() + "\", " +
                "oauth_token=\"" + tokenUser + "\", " +
                "oauth_signature=\"" + UtilDiscogs.CONSUMER_SECRET + "&" + tokenSecretUser + "\", " +
                "oauth_signature_method=\"" + "PLAINTEXT" + "\", " +
                "oauth_timestamp=\"" + System.currentTimeMillis() / 1000 + "\"";
    }

    public UserOptions getPastPurchasesFromDiscogs(String tokenUser, String tokenSecretUser) throws IOException {
        this.tokenUser = tokenUser;
        this.tokenSecretUser = tokenSecretUser;
        String username = getUsernameFromDiscogs();
        Integer collectionId = getCollectionId(username);
        System.out.println(username);
        System.out.println(collectionId);
        return getPastPurchasesRecordsFromDiscogs(username, collectionId);
    }

    public String getUsernameFromDiscogs() throws IOException {
        JSONObject userIdentityAPI = callToDiscogsAPI(UtilDiscogs.IDENTITY_API);
        return (String) userIdentityAPI.get("username");
    }

    public Integer getCollectionId(String username) throws IOException {
        final JSONObject totalCollections = callToDiscogsAPI(String.format(UtilDiscogs.ALL_COLLECTIONS_API, username));
        final JSONArray totalCollectionsFoldersArray = totalCollections.getJSONArray("folders");
        if (totalCollectionsFoldersArray.isEmpty()) {
            throw new RuntimeException("No past purchase found");
        }

        return totalCollectionsFoldersArray.getJSONObject(0).getInt("id");

    }

    public UserOptions getPastPurchasesRecordsFromDiscogs(String username, Integer idCollection) throws IOException {
        JSONObject collectionItemsAPI = callToDiscogsAPI(String.format(UtilDiscogs.COLLECTION_ITEMS_API, username, idCollection));
        JSONArray collectionItemsAPIArray = collectionItemsAPI.getJSONArray("releases");
        System.out.println(collectionItemsAPIArray);
        List<String> artistsDataFinal = new ArrayList<>();
        List<String> genresDataFinal = new ArrayList<>();
        UserOptions userOptions = new UserOptions();

        if(collectionItemsAPIArray.isEmpty()) {
            throw new RuntimeException("No past purchase found");
        }

        for(int i=0; i< collectionItemsAPIArray.length(); i++) {
            JSONObject basicInformationKey = collectionItemsAPIArray.getJSONObject(i).getJSONObject("basic_information");
            JSONArray artists = basicInformationKey.getJSONArray("artists");
            artistsDataFinal.addAll(getArtistNames(artists));
            JSONArray genres = basicInformationKey.getJSONArray("genres");
            genresDataFinal.addAll(getGenresNames(genres));
        }

            userOptions.setFavoriteArtists(artistsDataFinal.stream().distinct().collect(Collectors.toList()));
            userOptions.setFavoriteGenres(genresDataFinal.stream().distinct().collect(Collectors.toList()));

            return userOptions;

    }

    private List<String> getArtistNames(JSONArray artists) {
        List<String> artistsData = new ArrayList<>();
        for(int i=0; i< artists.length(); i++) {
            artistsData.add(artists.getJSONObject(i).getString("name"));
        }
        System.out.println("Artists");
        System.out.println(artistsData);
        return artistsData;
    }

    private List<String> getGenresNames(JSONArray genres) {
        List<String> genresData = new ArrayList<>();
        for(int i=0; i< genres.length(); i++) {
            genresData.add(genres.getString(i).toLowerCase(Locale.ROOT));
        }
        return genresData;
    }
}
