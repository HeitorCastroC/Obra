package com.example.obra.model;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "works")
@Inheritance(strategy = InheritanceType.JOINED)  // cada subclasse terá sua própria tabela
@DiscriminatorColumn(name = "work_type")          // coluna que identifica o tipo
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder                                      // necessário para herança com Lombok



@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "work_type", insertable = false, updatable = false)
    private String workType;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
