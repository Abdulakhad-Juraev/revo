package com.example.alixman.entity;

import com.example.alixman.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends AbsEntity {
    private double count;
    private double leftOver;

    @ManyToOne(optional = false)
    private ProductTemplate productTemplate;

    @ManyToOne(optional = false)
    private User worker;
}
