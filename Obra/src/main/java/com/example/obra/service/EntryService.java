package com.example.obra.service;

import com.example.obra.model.Entry;
import com.example.obra.model.User;
import com.example.obra.model.Work;
import com.example.obra.repository.EntryRepository;
import com.example.obra.repository.UserRepository;
import com.example.obra.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EntryService {

    private final EntryRepository entryRepository;
    private final UserRepository  userRepository;
    private final WorkRepository  workRepository;

    public Entry create(Entry entry) {
        if (entry.getRating() < 0 || entry.getRating() > 5)
            throw new IllegalArgumentException("Rating deve ser entre 0 e 5");

        // Resolve user pelo ID enviado no JSON
        Long userId = entry.getUser().getId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User não encontrado: " + userId));

        // Resolve work pelo ID enviado no JSON
        Long workId = entry.getWork().getId();
        Work work = workRepository.findById(workId)
                .orElseThrow(() -> new RuntimeException("Work não encontrado: " + workId));

        entryRepository.findByUserIdAndWorkId(userId, workId)
                .ifPresent(e -> { throw new RuntimeException("Entry já existe para esse user e work"); });

        entry.setUser(user);
        entry.setWork(work);
        return entryRepository.save(entry);
    }

    public List<Entry> findByUser(Long userId) {
        return entryRepository.findByUserId(userId);
    }

    public List<Entry> findFavoritesByUser(Long userId) {
        return entryRepository.findByUserIdAndFavoriteTrue(userId);
    }

    public Entry findById(Long id) {
        return entryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entry não encontrada: " + id));
    }

    public Entry update(Long id, Entry incoming) {
        if (incoming.getRating() < 0 || incoming.getRating() > 5)
            throw new IllegalArgumentException("Rating deve ser entre 0 e 5");

        Entry entry = findById(id);
        entry.setRating(incoming.getRating());
        entry.setFavorite(incoming.getFavorite());
        entry.setConsumeDate(incoming.getConsumeDate());
        return entryRepository.save(entry);
    }

    public void delete(Long id) {
        entryRepository.deleteById(id);
    }
}