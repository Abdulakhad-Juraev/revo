package com.example.alixman.controller;

import com.example.alixman.entity.Room;
import com.example.alixman.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/category/{categoryId}")
    public ResponseEntity<Room> createRoom(@RequestBody Room room, @PathVariable Integer categoryId) {
        Room createdRoom = roomService.createRoom(room, categoryId);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return new ResponseEntity<>(roomService.getAllRooms(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Integer id) {
        Room room = roomService.getRoomById(id);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @PutMapping("/{id}/category/{categoryId}")
    public ResponseEntity<Room> updateRoom(@PathVariable Integer id, @RequestBody Room room, @PathVariable Integer categoryId) {

        Room updatedRoom = roomService.updateRoom(id, room, categoryId);
        return new ResponseEntity<>(updatedRoom, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Room>> getRoomsByCategory(@PathVariable Integer categoryId) {
        return new ResponseEntity<>(roomService.getRoomsByCategory(categoryId), HttpStatus.OK);
    }
}

