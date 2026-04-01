package com.example.obra.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table (name = "reviews",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "work_id"})
)



public class Review {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String headline;

    @Column
    private String subHeading;

    @Column
    private String bodyText;

    @Column(name = "register_date", updatable = false)
    private LocalDateTime registerDate; // quando registrou no sistema

    @PrePersist
    public void prePersist() {
        this.registerDate = LocalDateTime.now();
    }


}
