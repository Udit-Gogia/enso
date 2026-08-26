package com.enso.backend.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingCreateRequest {
    private String categoryCode;
    private List<String> serviceOfferingIds;
    private String vendorId;
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
}