package com.example.alixman.service;

import com.example.alixman.entity.User;
import com.example.alixman.entity.enums.RoleName;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.UserDto;
import com.example.alixman.repository.RoleRepository;
import com.example.alixman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    ApiResponseService apiResponseService;

    @Autowired
    EmailService emailService;

    @Autowired
    RoleRepository roleRepository;

    public UserDetails getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByPhoneEqualsIgnoreCase(s).orElseThrow(() -> new ResourceNotFoundException("getUsername"));
    }

    public UserDto getUserOne(User user) {
        return new UserDto(user.getId(), user.getFirstName(), user.getPhone(), user.getRole());
    }

    public ApiResponse addUser(UserDto userDto) {
        try {
            if (!userRepository.existsByPhoneEqualsIgnoreCase(userDto.getPhone())) {
                User user = new User();
//                String confirmationLink = "http://localhost:8080/confirm?token=" + userDto.getConfirmationToken();
//                emailService.sendRegistrationConfirmation(userDto.getEmail());
                user.setFirstName(userDto.getFirstName());
                user.setPhone(userDto.getPhone());
                user.setRole(roleRepository.findByRoleName(RoleName.valueOf(userDto.getRoleName())).orElseThrow(() -> new ResourceNotFoundException("getRole")));
                userRepository.save(user);
                return apiResponseService.savedResponse();
            }
            return apiResponseService.existsResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
