package com.example.obra.controller;

import com.example.obra.model.Entry;
import com.example.obra.service.EntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/entries")
@RequiredArgsConstructor
public class EntryController {

    private final EntryService service;

    @PostMapping
    public ResponseEntity<Entry> create(@RequestBody Entry entry) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(entry));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Entry>> byUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.findByUser(userId));
    }

    @GetMapping("/user/{userId}/favorites")
    public ResponseEntity<List<Entry>> favorites(@PathVariable Long userId) {
        return ResponseEntity.ok(service.findFavoritesByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Entry> byId(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entry> update(@PathVariable Long id, @RequestBody Entry entry) {
        return ResponseEntity.ok(service.update(id, entry));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}