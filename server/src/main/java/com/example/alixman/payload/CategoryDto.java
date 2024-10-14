package com.example.alixman.payload;

import com.example.alixman.entity.Attachment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {
    private Integer id;
    private String name;
    private boolean active;
    private Attachment attachment;
    private UUID attachmentId;
    private String description;

    //REQ
    public CategoryDto(String name, boolean active, Attachment attachment, String description) {
        this.name = name;
        this.active = active;
        this.attachment = attachment;
        this.description = description;
    }

    //RES
    public CategoryDto(Integer id, String name, boolean active, Attachment attachment, String description) {
        this.id = id;
        this.name = name;
        this.active = active;
        this.attachment = attachment;
        this.description = description;
    }
}
