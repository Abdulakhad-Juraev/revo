package com.example.alixman.payload;

import lombok.Data;

import javax.validation.constraints.Pattern;

@Data
public class ReqLogin {
    private String phone;
    private String password;
}
