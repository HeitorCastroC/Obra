// WorkRepository.java
package com.example.obra.repository;

import com.example.obra.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByTitleContainingIgnoreCase(String title);
}