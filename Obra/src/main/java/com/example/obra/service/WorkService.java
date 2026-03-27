// WorkService.java
package com.example.obra.service;

import com.example.obra.model.Work;
import com.example.obra.repository.WorkRepository;
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
    public void delete(Long id)        { repository.deleteById(id); }
}