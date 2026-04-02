// UserService.java
package com.example.obra.service;

import com.example.obra.model.User;
import com.example.obra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service

public class UserService {

    private final UserRepository repository;


        public UserService(UserRepository repository) {
        this.repository = repository;

    }

    public User create(User user) {
        repository.findByEmail(user.getEmail())
                .ifPresent(u -> { throw new RuntimeException("Email já cadastrado"); });
        return repository.save(user);
    }

    public List<User> findAll()        { return repository.findAll(); }
    public User findById(Long id)      { return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("User não encontrado: " + id)); }
    public void delete(Long id)        { repository.deleteById(id); }
}