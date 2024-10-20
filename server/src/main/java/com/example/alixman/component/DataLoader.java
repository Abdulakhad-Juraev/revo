package com.example.alixman.component;

import com.example.alixman.entity.User;
import com.example.alixman.entity.enums.RoleName;
import com.example.alixman.repository.RoleRepository;
import com.example.alixman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Value("${spring.datasource.initialization-mode}")
    private String initMode;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (initMode.equals("always")) {
            saveUser("+998916662669", "Abdulakhad", "Juraev");
        }
    }

    public void saveUser(String phone, String f, String l){
        User user = new User();
        user.setPhone(phone);
        user.setFirstName(f + " " + l);
        user.setEnabled(true);
        user.setPassword("$2a$10$lNlFQIsKpPMoQmnmnCaUzOz4UZNLDlMQG4031NuSNfjGGcutZ3sXO");
        user.setRole(roleRepository.findByRoleName(RoleName.ADMIN).orElseThrow(() -> new ResourceNotFoundException("get")));
        userRepository.save(user);
    }
}
