// dto/VendorProfileResponse.java
package com.enso.backend.dto;

import java.time.LocalTime;
import java.util.List;

import com.enso.backend.model.ProfileResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
@NoArgsConstructor
public class VendorProfileResponse extends ProfileResponse {
    private String bio;
    private String businessName;
    private Double experience;
    private LocalTime openTime;
    private LocalTime closeTime;
    private List<String> categories;
    private List<ServiceOfferingResponse> offerings;
    private boolean isVerified;
}