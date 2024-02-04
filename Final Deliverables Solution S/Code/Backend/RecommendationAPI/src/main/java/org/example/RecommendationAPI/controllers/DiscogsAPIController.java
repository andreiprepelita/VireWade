package org.example.RecommendationAPI.controllers;

import org.apache.http.HttpHeaders;
import org.example.RecommendationAPI.models.OAuth1DiscogsCredentials;
import org.example.RecommendationAPI.services.DiscogsAuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.io.IOException;

@RestController
@RequestMapping("/discogs")
@CrossOrigin
public class DiscogsAPIController {

    private final DiscogsAuthService discogsAuthService;

    @Inject
    public DiscogsAPIController(DiscogsAuthService discogsAuthService) {

        this.discogsAuthService = discogsAuthService;
    }
    @GetMapping(value = "request_token")
    public ResponseEntity<OAuth1DiscogsCredentials> getRequestTokenOnDiscogs() throws IOException {
        OAuth1DiscogsCredentials authorizePageURL = discogsAuthService.getAuthorizePageURL();
        if (authorizePageURL != null) {
            return new ResponseEntity<>(authorizePageURL, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @GetMapping (value = "access_token")
    public ResponseEntity<OAuth1DiscogsCredentials> getAccessTokenOnDiscogs(@RequestHeader(HttpHeaders.AUTHORIZATION) String authentication,
                                                                            @RequestParam("verifier") String verifier) throws IOException {
        OAuth1DiscogsCredentials accessToken = discogsAuthService.getAccessToken(authentication, verifier);
        if (accessToken != null) {
            return new ResponseEntity<>(accessToken, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
