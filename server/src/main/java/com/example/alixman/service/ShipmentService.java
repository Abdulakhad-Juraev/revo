package com.example.alixman.service;

import com.example.alixman.entity.Order;
import com.example.alixman.entity.Shipment;
import com.example.alixman.entity.User;
import com.example.alixman.payload.*;
import com.example.alixman.repository.OrderRepository;
import com.example.alixman.repository.ProductTemplateRepository;
import com.example.alixman.repository.ShipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShipmentService {
    @Autowired
    ShipmentRepository shipmentRepository;
    @Autowired
    ProductTemplateRepository productTemplateRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderService orderService;

    public ApiResponse addShipment(ShipmentDto shipmentDto) {
        try {
            Shipment shipment = new Shipment();
//            shipment.setProductTemplate(productTemplateRepository.findById(shipmentDto.getProductTemplateId()).orElseThrow(() -> new ResourceNotFoundException("getProductTemplate")));
            shipment.setCount(shipmentDto.getCount());

//            shipment.setOrder();
            shipmentRepository.save(shipment);
            return apiResponseService.savedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ResPageable getList(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Shipment> allShipment = shipmentRepository.findAll(pageable);
//            List<ShipmentDto> shipmentDtoList = new ArrayList<>();
//            for (int i = 0; i < allShipment.getContent().size(); i++) {
//                shipmentDtoList.add(
//                        getOne(allShipment.getContent().get(i))
//                );
//            }
            return new ResPageable(
                    page,
                    size,
                    allShipment.getTotalElements(),
                    allShipment.getTotalPages(),
                    allShipment.getContent().stream().map(this::getOne));
        } catch (Exception e) {
            return null;
        }
    }

    public ShipmentDto getOne(Shipment shipment) {
        return new ShipmentDto(
                shipment.getId(),
                shipment.getCount(),
                shipment.getOrder().stream().map(order -> orderService.getOne(order)).collect(Collectors.toList()),
                shipment.getDate().toLocalDateTime()
        );
    }

    public ApiResponse updateShipment(Integer id, ShipmentDto shipmentDto) {
        try {
            Optional<Shipment> optionalShipment = shipmentRepository.findById(id);
            if (optionalShipment.isPresent()) {
                Shipment shipment = optionalShipment.get();
                shipment.setCount(shipmentDto.getCount());
                shipmentRepository.save(shipment);
                return apiResponseService.updatedResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }

    }

    public ApiResponse delete(Integer id) {
        try {
            shipmentRepository.deleteById(id);
            return apiResponseService.deletedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public List<ShipmentDto> getAllByDate(FilterDate filterDate, User user) {
        try {
            return shipmentRepository.getAllByDate(filterDate.getStartDate(),filterDate.getEndDate()).stream().map(this::getOne).collect(Collectors.toList());
        } catch (Exception e) {
            return null;
        }
    }



}
