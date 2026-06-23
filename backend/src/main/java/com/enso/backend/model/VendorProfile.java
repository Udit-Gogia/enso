package com.enso.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(name = "vendor_profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VendorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String businessName;
    private String bio;
    private int yearsOfExperience;
    private LocalTime openTime;
    private LocalTime closeTime;
    private String tags;
    private String profilePhotoUrl;

    @Builder.Default
    @Column(nullable = false)
    private boolean isVerified = false;
}