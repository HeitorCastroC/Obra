// EntryRepository.java
package com.example.obra.repository;

import com.example.obra.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
    List<Entry> findByUserId(Long userId);
    List<Entry> findByWorkId(Long workId);
    Optional<Entry> findByUserIdAndWorkId(Long userId, Long workId);
    List<Entry> findByUserIdAndFavoriteTrue(Long userId);
}