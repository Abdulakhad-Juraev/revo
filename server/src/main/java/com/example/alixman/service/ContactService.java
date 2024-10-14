package com.example.alixman.service;

import com.example.alixman.entity.Contact;
import com.example.alixman.entity.User;
import com.example.alixman.payload.ContactDto;
import com.example.alixman.repository.ContactRepository;
import com.example.alixman.repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ContactService {
    @Autowired
    ContactRepository contactRepository;
    @Autowired
    DistrictRepository districtRepository;

    public Contact addContact(ContactDto contactDto) {
        return contactRepository.save(new Contact(
                districtRepository.findById(contactDto.getDistrictId()).orElseThrow(() -> new ResourceNotFoundException("getDistrict")),
                contactDto.getAddress(),
                contactDto.getEmail(),
                contactDto.getPhoneNumbers()
        ));
    }

    public ContactDto getContact(Contact contact) {
        try {
            return new ContactDto(
                    contact.getDistrict(),
                    contact.getAddress(),
                    contact.getEmail(),
                    contact.getPhoneNumbers()
            );
        } catch (Exception e) {
            return null;
        }
    }

    public Contact updateContact(Contact contact, ContactDto contactDto) {
        try {
            contact.setDistrict(districtRepository.findById(contactDto.getDistrictId()).orElseThrow(() -> new ResourceNotFoundException("getDistrict")));
            contact.setAddress(contactDto.getAddress());
            contact.setEmail(contactDto.getEmail());
            contact.setPhoneNumbers(contactDto.getPhoneNumbers());
            return contactRepository.save(contact);
        } catch (Exception e) {
            return null;
        }
    }

}
