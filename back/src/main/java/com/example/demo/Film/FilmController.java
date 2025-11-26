package com.example.demo.film;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/movies")
public class FilmController {

    @Value("${api.key}")
    private String apiKey;

    private final FilmService filmService;
    private final WebClient webClient;

    public FilmController(FilmService filmService, WebClient webClient){
        this.filmService = filmService;
        this.webClient = webClient;
    }

    @GetMapping("/search")
   public Mono<MovieSearchResponse> searchMovies(String query) {
    return filmService.searchMovies(query);
    }
    
    @GetMapping("/trending")
   public Mono<MovieSearchResponse> getTrendingMovies(String timeWindow) {
    return webClient.get()
            .uri(uriBuilder -> uriBuilder
                    .scheme("https")
                    .host("api.themoviedb.org")
                    .path("/trending/movie/week")
                    .queryParam("api_key", apiKey)
                    .build(timeWindow))
            .retrieve()
            .bodyToMono(MovieSearchResponse.class);
}

    

}
