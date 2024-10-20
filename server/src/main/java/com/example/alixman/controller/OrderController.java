package com.example.alixman.controller;

import com.example.alixman.entity.Order;
import com.example.alixman.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/room/{roomId}/user/{userId}")
    public ResponseEntity<Order> createOrder(@RequestBody Order order, @PathVariable Integer roomId, @PathVariable UUID userId) {
        Order createdOrder = orderService.createOrder(order, roomId, userId);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
        Order order = orderService.getOrderById(id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Integer id, @RequestBody Order orderDetails) {
        Order updatedOrder = orderService.updateOrder(id, orderDetails);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // User bo'yicha buyurtmalarni olish
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable UUID userId) {
        return new ResponseEntity<>(orderService.getOrdersByUser(userId), HttpStatus.OK);
    }

    // Xona bo'yicha buyurtmalarni olish
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Order>> getOrdersByRoom(@PathVariable Integer roomId) {
        return new ResponseEntity<>(orderService.getOrdersByRoom(roomId), HttpStatus.OK);
    }

    @PutMapping("/{id}/rate")
    public ResponseEntity<Order> rateOrder(
            @PathVariable Integer id,
            @RequestParam(required = false) Integer rating,
            @RequestParam(required = false) String comment) {

        Order ratedOrder = orderService.rateOrder(id, rating, comment);
        return new ResponseEntity<>(ratedOrder, HttpStatus.OK);
    }
}

