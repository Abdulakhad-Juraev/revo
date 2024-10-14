package com.example.alixman.payload;

import com.example.alixman.entity.Attachment;
import com.example.alixman.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductTemplateDto {
    private Integer id;
    private String name;
    private Integer categoryId;
    private Category category;
    private UUID attachmentId;
    private Attachment attachment;
    private boolean active;
    private String description;
    private double price;
    private double minCount;
    private double count;
    private double workerPrice;


    //REQ

    public ProductTemplateDto(String name, Integer categoryId, UUID attachmentId, boolean active, String description, double price, double minCount, double workerPrice) {
        this.name = name;
        this.categoryId = categoryId;
        this.attachmentId = attachmentId;
        this.active = active;
        this.description = description;
        this.price = price;
        this.minCount = minCount;
        this.workerPrice = workerPrice;
    }

    //RES
    public ProductTemplateDto(Integer id, String name, Category category, Attachment attachment, boolean active, String description, double price, double minCount, double count, double workerPrice) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.attachment = attachment;
        this.active = active;
        this.description = description;
        this.price = price;
        this.minCount = minCount;
        this.count = count;
        this.workerPrice = workerPrice;
    }

}
