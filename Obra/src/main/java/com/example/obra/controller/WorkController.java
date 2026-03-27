// WorkController.java
package com.example.obra.controller;

import com.example.obra.model.Work;
import com.example.obra.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/works")
@RequiredArgsConstructor
public class WorkController {

    private final WorkService service;

    @PostMapping
    public ResponseEntity<Work> create(@RequestBody Work work) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(work));
    }

    @GetMapping
    public ResponseEntity<List<Work>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Work> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}