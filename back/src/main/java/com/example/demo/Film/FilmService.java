package com.example.demo.film;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class FilmService {

    private final WebClient webClient;

    @Value("${api.key}")
    private String apiKey;

    public FilmService(WebClient webClient){
        this.webClient = webClient;
    }

    public Mono<MovieSearchResponse> searchMovies(String query) {
    return webClient.get()
        .uri(uriBuilder -> uriBuilder
            .path("/search/movie")
            .queryParam("query", query)
            .queryParam("api_key", apiKey)
            .queryParam("language", "es-ES")
            .build())
        .retrieve()
        .bodyToMono(MovieSearchResponse.class);
    }


}
