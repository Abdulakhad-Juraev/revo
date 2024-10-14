package com.example.alixman.entity;

import com.example.alixman.entity.template.AbsNameEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class District extends AbsNameEntity {

    @ManyToOne(optional = false)
    private Region region;

    private String description;

    private boolean active;
}
