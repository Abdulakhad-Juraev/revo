package com.example.alixman.entity;

import com.example.alixman.entity.template.AbsNameEntity;
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
public class ProductTemplate extends AbsNameEntity {

    @OneToOne
    private Attachment attachment;

    @ManyToOne
    private Category category;

    private boolean active;

    private String description;

    private double price;

    private double workerPrice;

    private double minCount;
}
