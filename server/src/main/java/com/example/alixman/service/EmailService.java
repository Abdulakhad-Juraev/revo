package com.example.alixman.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationConfirmation(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Ro'yxatdan o'tishni tasdiqlash");
        message.setText("Iltimos, quyidagi link orqali ro'yxatdan o'tishingizni tasdiqlang: " + "silka");
        message.setFrom("computerstatuff@gmail.com");

        mailSender.send(message);
    }
}
