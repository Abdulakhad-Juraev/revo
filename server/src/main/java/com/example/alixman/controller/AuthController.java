package com.example.alixman.controller;

import com.example.alixman.entity.User;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.JwtToken;
import com.example.alixman.payload.ReqLogin;
import com.example.alixman.repository.UserRepository;
import com.example.alixman.security.CurrentUser;
import com.example.alixman.security.JwtTokenProvider;
import com.example.alixman.service.AuthService;
import com.example.alixman.service.UserService;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserService userService;
    @PostMapping("/login")
    private HttpEntity<?> login(@Valid @RequestBody ReqLogin reqLogin) {
        try {
            Authentication authentication = authenticationManager.authenticate(new
                    UsernamePasswordAuthenticationToken(reqLogin.getPhone(), reqLogin.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = (User) authentication.getPrincipal();
            String token = jwtTokenProvider.generateToken(user);
            return ResponseEntity
                    .status(200)
                    .body(new ApiResponse(MessageConst.LOGIN_SUCCESS, true, new JwtToken(token)));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(new ApiResponse(MessageConst.LOGIN_ERROR, false));
        }
    }

    @GetMapping("/me")
    public HttpEntity<?> getUserMe(@CurrentUser User user) {
//        User getUser = userRepository.findById(user.getId()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        return ResponseEntity.ok(user);
    }


    @GetMapping("/encoder/{password}")
    public String encodePassword(@PathVariable String password){
        return passwordEncoder.encode(password);
    }

    @GetMapping("/roles")
    public HttpEntity<?> getRoles(){
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS,true,userService.getRoleNames()));
    }
}
