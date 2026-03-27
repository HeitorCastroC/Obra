// WorkService.java
package com.example.obra.service;

import com.example.obra.model.Work;
import com.example.obra.repository.WorkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkService {

    private final WorkRepository repository;

    public Work create(Work work)      { return repository.save(work); }
    public List<Work> findAll()        { return repository.findAll(); }
    public Work findById(Long id)      { return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Work não encontrado: " + id)); }


    @Transactional
    public void delete(Long id) {
        Work work = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Work not found"));

        repository.delete(work); // ← esse é o certo!
    }



}