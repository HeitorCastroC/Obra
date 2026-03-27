package com.example.obra.model;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "entries",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "work_id"}) // um user só avalia uma work uma vez
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"entries", "hibernateLazyInitializer"})
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "work_id", nullable = false)
    @JsonIgnoreProperties({"entries", "hibernateLazyInitializer"})
    private Work work;

    @Column(nullable = false)
    private Integer rating;          // 0 a 5

    @Column(nullable = false)
    private Boolean favorite;        // true = y, false = n

    @Column(name = "consume_date")
    private LocalDate consumeDate;   // quando assistiu/leu

    @Column(name = "register_date", updatable = false)
    private LocalDateTime registerDate; // quando registrou no sistema

    @PrePersist
    public void prePersist() {
        this.registerDate = LocalDateTime.now();
    }


}