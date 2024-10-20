package com.example.alixman.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Data
public class RegisterDto {

    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    @NotBlank
    private String login;
    //    @Pattern(
//            regexp = "^(?:(?=.*?\\p{N})(?=.*?[\\p{S}\\p{P} ])(?=.*?\\p{Lu})(?=.*?\\p{Ll}))[^\\p{C}]{8,16}$",
//            message = "PrePassword  Password bilan bir xil bolishi kerak"
//    )
    @NotBlank
    private String password;
    //    @Pattern(
//            regexp = "^(?:(?=.*?\\p{N})(?=.*?[\\p{S}\\p{P} ])(?=.*?\\p{Lu})(?=.*?\\p{Ll}))[^\\p{C}]{8,16}$",
//            message = "PrePassword  Password bilan bir xil bolishi kerak"
//    )
    @NotBlank
    private String prePassword;
    private UUID attachmentId;
    private String description;
    private boolean active;
}
