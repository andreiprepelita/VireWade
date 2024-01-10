package org.example.RecommendationAPI.util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class UtilDiscogs {

    public static final String CONSUMER_SECRET = "GXDTaxFlYYkxJpIJcKSlLMomqdFzfhKL";
    public static final String CONSUMER_KEY = "MJtxlqEfAtxaJyDDyvvx";

    public static final String ALL_COLLECTIONS_API = "https://api.discogs.com/users/%s/collection/folders";
    public static final String IDENTITY_API = "https://api.discogs.com/oauth/identity";
    public static final String COLLECTION_ITEMS_API = "https://api.discogs.com/users/%s/collection/folders/%d/releases";
    private static final String TOKEN_URL = "https://api.discogs.com/oauth/request_token";
    private static final String AUTHENTICATION_URL = "https://www.discogs.com/oauth/authorize";
    private static final String ACCESS_TOKEN_URL = "https://api.discogs.com/oauth/access_token";



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