package com.example.alixman.controller;

import com.example.alixman.entity.Shipment;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.ShipmentDto;
import com.example.alixman.repository.ShipmentRepository;
import com.example.alixman.service.ShipmentService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipment")
public class ShipmentController {
    @Autowired
    ShipmentRepository shipmentRepository;
    @Autowired
    ShipmentService shipmentService;

    @PostMapping
    public HttpEntity<?> add(@RequestBody ShipmentDto shipmentDto) {
        ApiResponse apiResponse = shipmentService.addShipment(shipmentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Integer id) {
        Shipment shipment = shipmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getShipment"));
        return ResponseEntity.ok(shipmentService.getOne(shipment));
    }

    @GetMapping
    public HttpEntity<?> getList(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                 @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, shipmentService.getList(page,size)));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> update(@PathVariable Integer id, @RequestBody ShipmentDto shipmentDto) {
        ApiResponse apiResponse = shipmentService.updateShipment(id, shipmentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable Integer id) {
        ApiResponse apiResponse = shipmentService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 204 : 409).body(apiResponse);
    }
}