package com.example.demo.review;

import java.time.LocalDate;

import com.example.demo.film.Film;
import com.example.demo.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "film_id")
    private Film film;

    private Double rating;
    private LocalDate created_at;

    public void setRating(Double rating) {
        if (rating == null ||
                rating < 0.5 || rating > 5.0 ||
                rating * 2 % 1 != 0) {
            throw new IllegalArgumentException("Rating must be 0.5, 1, 1.5, ..., 5.0");
        }
        this.rating = rating;
    }

}
