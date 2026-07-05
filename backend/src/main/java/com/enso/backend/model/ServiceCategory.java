package com.enso.backend.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "service_categories")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name="code", nullable = false, unique = true)
    private String code;

    @Column(name="display_name", nullable = false)
    private String displayName;

    @Column(name="icon_name")
    private String iconName;
    
    @Builder.Default
    @Column(name="is_active", nullable = false)
    private boolean isActive = true;

}
