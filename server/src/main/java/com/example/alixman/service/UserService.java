package com.example.alixman.service;

import com.example.alixman.entity.Contact;
import com.example.alixman.entity.Role;
import com.example.alixman.entity.User;
import com.example.alixman.entity.enums.RoleName;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.ResPageable;
import com.example.alixman.payload.UserDto;
import com.example.alixman.repository.ContactRepository;
import com.example.alixman.repository.RoleRepository;
import com.example.alixman.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ContactService contactService;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    ContactRepository contactRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public ApiResponse addUser(UserDto userDto) {
        try {
            if (!userRepository.existsByPhoneEqualsIgnoreCase(userDto.getPhone())) {
                User user = new User();
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

    public ResPageable getList(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<User> allUser = userRepository.findAll(pageable);
            List<UserDto> userDtoList = new ArrayList<>();
            for (int i = 0; i < allUser.getContent().size(); i++) {
                userDtoList.add(
                        getUserOne(allUser.getContent().get(i))
                );
            }
            return new ResPageable(
                    page,
                    size,
                    allUser.getTotalElements(),
                    allUser.getTotalPages(),
                    allUser.getContent().stream().map(this::getUserOne));
        } catch (Exception e) {
            return null;
        }
    }

    public UserDto getUserOne(User user) {
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getPhone(),
                user.getRole()
        );
    }

    public ApiResponse updateUser(UUID id, UserDto userDto) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isPresent()) {
                if (!userRepository.existsByPhoneEqualsIgnoreCaseAndIdNot(userDto.getPhone(), id)) {
                    User user = optionalUser.get();
                    user.setFirstName(userDto.getFirstName());
                    user.setPhone(userDto.getPhone());
                    user.setRole(roleRepository.findByRoleName(RoleName.valueOf(userDto.getRoleName())).orElseThrow(() -> new ResourceNotFoundException("getRole")));
                    userRepository.save(user);
                    return apiResponseService.updatedResponse();
                }
                return apiResponseService.existsResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteUser(UUID id) {
        try {
            Optional<User> optionalUser = userRepository.findById(id);
            if (optionalUser.isPresent()) {
                userRepository.deleteById(id);
                return apiResponseService.deletedResponse();
            }
            return apiResponseService.deletedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ResPageable getUsersByRole(int page, int size, User user, String roleName) {
        try {

            if (!roleName.equals("debt")) {
                String roleN = roleName.toUpperCase().replace("-", "_");
                Role role = roleRepository.findByRoleName(RoleName.valueOf(roleN)).orElseThrow(() -> new ResourceNotFoundException("get"));

                Page<User> all = userRepository.findUsersByRole(role, PageRequest.of(page, size));

                return new ResPageable(
                        page,
                        size,
                        all.getTotalElements(),
                        all.getTotalPages(),
                        all.getContent().stream().map(this::getUserOne).collect(Collectors.toList())
                );
            } else {
                Page<User> all = userRepository.findUsersWithDebt(PageRequest.of(page, size));
                return new ResPageable(
                        page,
                        size,
                        all.getTotalElements(),
                        all.getTotalPages(),
                        all.getContent().stream().map(this::getUserOne).collect(Collectors.toList())
                );
            }

        } catch (Exception e) {
            return null;
        }
    }


    public List<RoleName> getRoleNames() {
        List<RoleName> roleNameList = new ArrayList<>();
        roleNameList.add(RoleName.ADMIN);
        roleNameList.add(RoleName.MODERATOR);
        roleNameList.add(RoleName.WORKER);
        roleNameList.add(RoleName.USER);
        return roleNameList;
    }
}
