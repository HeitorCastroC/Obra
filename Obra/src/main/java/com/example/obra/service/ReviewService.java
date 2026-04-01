package com.example.obra.service;

import com.example.obra.controller.ReviewController;
import com.example.obra.model.Review;
import com.example.obra.repository.ReviewRepository;
import com.example.obra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class ReviewService {

    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    private final int headlineMAX = 40;
    private final int subHeadlineMAX = 100;
    private final int bodyMAX = 400;

    public Review create(Review review) {
        return null;
    }



    }


