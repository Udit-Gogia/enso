package com.enso.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class BookingResponse {
    private UUID id;
    private String categoryCode;
    private String categoryName;
private List<ServiceOfferingResponse> serviceOfferings;
    private String vendorId;
    private String vendorBusinessName;
    private String title;
    private String description;
    private String urgency;
    private String address;
    private String locality;
    private String city;
    private String state;
    private String pincode;
    private String preferredDate;
    private String preferredTime;
    private String estimatedBudget;
    private String visibility;
    private String status;
    private Instant createdAt;
}