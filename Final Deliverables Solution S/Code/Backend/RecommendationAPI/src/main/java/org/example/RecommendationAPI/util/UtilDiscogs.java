package org.example.RecommendationAPI.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
@Component
public class UtilDiscogs {

    public static String CONSUMER_SECRET;
    public static String CONSUMER_KEY;

    public static final String ALL_COLLECTIONS_API = "https://api.discogs.com/users/%s/collection/folders";
    public static final String IDENTITY_API = "https://api.discogs.com/oauth/identity";
    public static final String COLLECTION_ITEMS_API = "https://api.discogs.com/users/%s/collection/folders/%d/releases";
    public static final String REQUEST_TOKEN_URL = "https://api.discogs.com/oauth/request_token";
    public static final String AUTHORIZE_URL = "https://www.discogs.com/oauth/authorize";
    public static final String ACCESS_TOKEN_URL = "https://api.discogs.com/oauth/access_token";

    @Autowired
    public UtilDiscogs(DiscogsConfig config) {
        CONSUMER_SECRET = config.getConsumerSecret();
        CONSUMER_KEY = config.getConsumerKey();
    }

    public static String transformInputFromByteToString(InputStream inStream) throws IOException {

        ByteArrayOutputStream finalResult = new ByteArrayOutputStream();
        byte[] buffer = new byte[1024];
        int size;

        while ((size = inStream.read(buffer)) != -1) {
            finalResult.write(buffer, 0, size);
        }

        return finalResult.toString("UTF-8");
    }


}