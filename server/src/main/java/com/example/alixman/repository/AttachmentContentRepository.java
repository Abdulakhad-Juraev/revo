package com.example.alixman.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.alixman.entity.*;

import java.util.UUID;

public interface AttachmentContentRepository extends JpaRepository<AttachmentContent, UUID> {
    AttachmentContent findByAttachmentId(UUID attachment_id);
}
