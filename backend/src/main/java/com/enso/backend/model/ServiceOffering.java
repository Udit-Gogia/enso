package com.enso.backend.model;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "service_offerings", uniqueConstraints = @UniqueConstraint(columnNames = {"category_id", "code"}))
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceOffering {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ServiceCategory category;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
}