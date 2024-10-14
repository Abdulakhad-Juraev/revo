package com.example.alixman.repository;

import com.example.alixman.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;

public interface ContactRepository extends JpaRepository<Contact, UUID> {
//    boolean existsByPhoneNumbers(Set<String> phoneNumbers);
}
