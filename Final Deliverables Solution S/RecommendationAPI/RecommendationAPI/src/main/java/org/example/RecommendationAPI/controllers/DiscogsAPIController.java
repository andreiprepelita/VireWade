package org.example.RecommendationAPI.controllers;

import org.example.RecommendationAPI.models.OAuth1DiscogsCredentials;
import org.example.RecommendationAPI.services.DiscogsAuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

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
    public ResponseEntity<OAuth1DiscogsCredentials> getRequestTokenOnDiscogs() {
        OAuth1DiscogsCredentials authorizePageURL = discogsAuthService.getAuthorizePageURL();
        if (authorizePageURL != null) {
            return new ResponseEntity<>(authorizePageURL, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}
