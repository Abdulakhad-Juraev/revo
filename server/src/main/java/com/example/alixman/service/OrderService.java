package com.example.alixman.service;

import com.example.alixman.entity.Order;
import com.example.alixman.entity.Room;
import com.example.alixman.entity.User;
import com.example.alixman.repository.OrderRepository;
import com.example.alixman.repository.RoomRepository;
import com.example.alixman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    // Buyurtma yaratish
    public Order createOrder(Order order, Integer roomId, UUID userId) {
        // Xonani tekshirish
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));

        // Foydalanuvchini tekshirish
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Buyurtma vaqtida xona bandmi yoki yo'qmi, tekshiramiz
        boolean isRoomAvailable = checkRoomAvailability(room, order.getStartDate(), order.getEndDate());
        if (!isRoomAvailable) {
            throw new RuntimeException("Room is already booked for the selected dates");
        }

        order.setRoom(room);
        order.setUser(user);
        order.setPaid(false); // Buyurtma dastlab to'lanmagan bo'ladi

        return orderRepository.save(order);
    }

    // Xonaning band emasligini tekshirish
    private boolean checkRoomAvailability(Room room, LocalDate startDate, LocalDate endDate) {
        List<Order> existingOrders = orderRepository.findByRoomAndDates(room.getId(), startDate, endDate);
        return existingOrders.isEmpty();
    }

    // Barcha buyurtmalarni olish
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Buyurtmani ID bo'yicha olish
    public Order getOrderById(Integer id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Buyurtmani yangilash (faqat to'lov holatini yangilash kabi)
    public Order updateOrder(Integer id, Order orderDetails) {
        Order order = getOrderById(id);

        order.setPaid(orderDetails.isPaid());
        // Qo'shimcha o'zgarishlar kiritish mumkin (startDate yoki endDate kabi)

        return orderRepository.save(order);
    }

    // Buyurtmani o'chirish
    public void deleteOrder(Integer id) {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }

    // Foydalanuvchi buyurtmalarini olish
    public List<Order> getOrdersByUser(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        return orderRepository.findByUser(user);
    }

    // Xonaga bo'lgan barcha buyurtmalarni olish
    public List<Order> getOrdersByRoom(Integer roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));

        return orderRepository.findByRoom(room);
    }

    public Order rateOrder(Integer orderId, Integer rating, String comment) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (rating != null && (rating < 1 || rating > 5)) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        order.setRating(rating);
        order.setComment(comment);

        return orderRepository.save(order);
    }
}

