package com.enso.backend.dto;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VendorSearchResponse {
    private UUID vendorId;
    private String email;
    private String businessName;
    private String phone;
    private String bio;
    private LocalTime openTime;
    private LocalTime closeTime;
    private String location;
    private List<String> categories;
    private String profilePhotoUrl;
    private boolean isVerified;
}