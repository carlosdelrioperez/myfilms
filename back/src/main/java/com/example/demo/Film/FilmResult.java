package com.example.demo.film;

import lombok.Data;

@Data
public class FilmResult {
    private Long id;
    private String title;
    private String director;
    private String overview;
    private String poster_path;
    private String release_date;
    private Double vote_average;
}
