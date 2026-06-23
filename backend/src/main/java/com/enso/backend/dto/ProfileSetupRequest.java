package com.enso.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProfileSetupRequest {

    @NotBlank(message = "Role is required")
    private String role;

    // Admin only
    private String adminOtp;

    // Customer fields
    private String preferredLocation;

    // Vendor fields
    private String businessName;
    private String bio;
    private Integer yearsOfExperience;
    private String openTime;
    private String closeTime;
    private String tags;

    // Shared
    private String profilePhotoUrl;
}