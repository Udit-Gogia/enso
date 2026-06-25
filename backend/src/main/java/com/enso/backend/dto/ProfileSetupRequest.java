package com.enso.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ProfileSetupRequest {

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be a valid 10-digit Indian mobile number")
    private String phone;

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