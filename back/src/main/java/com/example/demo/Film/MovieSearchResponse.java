package com.example.demo.film;

import java.util.List;
import lombok.Data;

@Data
public class MovieSearchResponse {
    private int page;
    private List<FilmResult> results;
    private int total_pages;
    private int total_results;
}
