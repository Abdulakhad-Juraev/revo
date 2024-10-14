package com.example.alixman.payload;

import com.example.alixman.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private UUID id;
    private String firstName;
    private String phone;
    private Role role;
    private String roleName;

    public UserDto(UUID id, String firstName, String phone, Role role) {
        this.id = id;
        this.firstName = firstName;
        this.phone = phone;
        this.role = role;
    }

}
