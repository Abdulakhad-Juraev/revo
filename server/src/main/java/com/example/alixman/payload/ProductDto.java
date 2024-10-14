package com.example.alixman.payload;

import com.example.alixman.entity.Attachment;
import com.example.alixman.entity.Category;
import com.example.alixman.entity.ProductTemplate;
import com.example.alixman.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private UUID id;
    private double count;
    private double leftOver;
    private Integer productTemplateId;
    private ProductTemplate productTemplate;
    private User worker;
    private UUID workerId;

    // REQ


    public ProductDto(double count, double leftOver, Integer productTemplateId,UUID workerId) {
        this.count = count;
        this.leftOver = leftOver;
        this.productTemplateId = productTemplateId;
        this.workerId = workerId;
    }

    // RES

    public ProductDto(UUID id, double count, double leftOver, ProductTemplate productTemplate,User worker) {
        this.id = id;
        this.count = count;
        this.leftOver = leftOver;
        this.productTemplate = productTemplate;
        this.worker = worker;
    }
}
