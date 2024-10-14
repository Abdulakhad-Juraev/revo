package com.example.alixman.payload;

import com.example.alixman.entity.Product;
import com.example.alixman.entity.ProductTemplate;
import com.example.alixman.entity.Status;
import com.example.alixman.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ManyToMany;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    private Integer id;
    private Integer productTemplateId;
    private ProductTemplate productTemplate;
    private double count;

    // REQ
    public OrderDto(Integer productTemplateId, double count) {
        this.productTemplateId = productTemplateId;
        this.count = count;
    }

    // RES
    public OrderDto(Integer id, ProductTemplate productTemplate, double count) {
        this.id = id;
        this.productTemplate = productTemplate;
        this.count = count;
    }
}
