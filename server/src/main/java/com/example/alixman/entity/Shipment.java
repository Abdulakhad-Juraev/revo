package com.example.alixman.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
//
//    @ManyToOne(optional = false)
//    private ProductTemplate productTemplate;

    private Timestamp date;
    private double count;

    @OneToMany
    public List<Order> order;


}
