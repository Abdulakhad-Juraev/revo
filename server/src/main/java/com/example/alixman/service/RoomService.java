package com.example.alixman.service;

import com.example.alixman.entity.Category;
import com.example.alixman.entity.Room;
import com.example.alixman.repository.CategoryRepository;
import com.example.alixman.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Room createRoom(Room room, Integer categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        room.setCategory(category);
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Integer id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Room updateRoom(Integer id, Room roomDetails, Integer categoryId) {
        Room room = getRoomById(id);

        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            room.setCategory(category);
        }

        room.setNumber(roomDetails.getNumber());
        room.setPrice(roomDetails.getPrice());
        room.setAvailable(roomDetails.isAvailable());

        return roomRepository.save(room);
    }

    public void deleteRoom(Integer id) {
        Room room = getRoomById(id);
        roomRepository.delete(room);
    }

    // Kategoriyaga ko'ra xonalarni olish
    public List<Room> getRoomsByCategory(Integer categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return roomRepository.findByCategory(category);
    }
}
