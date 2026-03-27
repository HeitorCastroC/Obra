package com.example.obra.model;
import jakarta.persistence.*;
import lombok.experimental.SuperBuilder;



@Entity
@Table(name = "books")
@DiscriminatorValue("book")
@SuperBuilder
public class Book extends Work {
    private String author;
    private String isbn;
}
