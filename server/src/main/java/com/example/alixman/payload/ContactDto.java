package com.example.alixman.payload;

import com.example.alixman.entity.District;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactDto {
    @NotNull
    private Integer districtId;
    private District district;
    private String address;
    @Email
    private String email;
    @Pattern(regexp = "^[+][9][9][8][0-9]{9}$", message = "Phone number")
    private Set<String> phoneNumbers;
    // REQ
    public ContactDto(Integer districtId, String address, String email, Set<String> phoneNumbers) {
        this.districtId = districtId;
        this.address = address;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
    }
    //RES
    public ContactDto(District district, String address, String email, Set<String> phoneNumbers) {
        this.district = district;
        this.address = address;
        this.email = email;
        this.phoneNumbers = phoneNumbers;
    }
}

