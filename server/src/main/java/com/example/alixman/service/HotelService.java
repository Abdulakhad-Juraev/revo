package com.example.alixman.service;

import com.example.alixman.entity.Hotel;
import com.example.alixman.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(Integer id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
    }

    public Hotel updateHotel(Integer id, Hotel hotelDetails) {
        Hotel hotel = getHotelById(id);

        hotel.setName(hotelDetails.getName());
        hotel.setAddress(hotelDetails.getAddress());
        hotel.setPhoneNumber(hotelDetails.getPhoneNumber());

        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Integer id) {
        Hotel hotel = getHotelById(id);
        hotelRepository.delete(hotel);
    }
}
