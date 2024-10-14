package com.example.alixman.controller;

import com.example.alixman.entity.Region;
import com.example.alixman.entity.User;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.RegionDto;
import com.example.alixman.payload.UserDto;
import com.example.alixman.repository.UserRepository;
import com.example.alixman.security.CurrentUser;
import com.example.alixman.service.ApiResponseService;
import com.example.alixman.service.UserService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;
    @Autowired
    ApiResponseService apiResponseService;

    @PostMapping
    public HttpEntity<?> add(@RequestBody UserDto userDto) {
        ApiResponse apiResponse = userService.addUser(userDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping
    public HttpEntity<?> getList(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                 @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, userService.getList(page, size)));
    }

    @GetMapping("/one/{id}")
    public HttpEntity<?> getOne(@PathVariable String id) {
        User user = userRepository.findById(UUID.fromString(id)).orElseThrow(() -> new UsernameNotFoundException("getUser"));
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, userService.getUserOne(user)));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> update(@PathVariable UUID id, @RequestBody UserDto userDto) {
        ApiResponse apiResponse = userService.updateUser(id, userDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        ApiResponse apiResponse = userService.deleteUser(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 204 : 409).body(apiResponse);
    }

    @GetMapping("/{roleName}")
    public HttpEntity<?> getUserByRole(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                       @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size,
                                       @CurrentUser User user,
                                       @PathVariable String roleName){
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS,true,userService.getUsersByRole(page, size, user, roleName)));
    }
}
