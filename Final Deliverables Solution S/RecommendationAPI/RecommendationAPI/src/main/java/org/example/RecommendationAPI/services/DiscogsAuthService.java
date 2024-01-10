package org.example.RecommendationAPI.services;

import org.example.RecommendationAPI.models.OAuth1DiscogsCredentials;
import org.springframework.stereotype.Service;

@Service
public class DiscogsAuthService {

    private OAuth1DiscogsCredentials oAuth1DiscogsCredentials;

    public OAuth1DiscogsCredentials getAuthorizePageURL() {
        return oAuth1DiscogsCredentials;
    }
}
