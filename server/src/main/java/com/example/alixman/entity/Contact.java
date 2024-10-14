package com.example.alixman.entity;

import com.example.alixman.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contact extends AbsEntity {

    @ManyToOne(optional = false)
    private District district;
    private String address;
    @Column(nullable = false)
    private String email;
    @ElementCollection
    private Set<String> phoneNumbers;
}
