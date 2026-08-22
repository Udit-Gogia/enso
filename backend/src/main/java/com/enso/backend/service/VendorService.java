package com.enso.backend.service;

import com.enso.backend.dto.VendorSearchResponse;
import com.enso.backend.model.ServiceCategory;
import com.enso.backend.model.VendorProfile;
import com.enso.backend.repository.VendorProfileRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorProfileRepository vendorProfileRepository;

    public Page<VendorSearchResponse> searchVendors(String category, String location, String name, Pageable pageable) {
    Page<VendorProfile> results = vendorProfileRepository.searchVendors(
            blankToNull(category), toLikePattern(location), toLikePattern(name), pageable);

    return results.map(this::toSearchResponse);
}

    private String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value;
    }

    private String toLikePattern(String value) {
        return (value == null || value.isBlank()) ? null : "%" + value.toLowerCase() + "%";
    }

    private VendorSearchResponse toSearchResponse(VendorProfile profile) {
        return VendorSearchResponse.builder()
                .vendorId(profile.getId())
                .businessName(profile.getBusinessName())
                .email(profile.getUser().getEmail())
                .openTime(profile.getOpenTime())
                .closeTime(profile.getCloseTime())
                .phone(profile.getUser().getPhone())
                .bio(profile.getBio())
                .location(profile.getUser().getLocation())
                .categories(profile.getCategories() != null
                        ? profile.getCategories().stream().map(ServiceCategory::getCode).toList()
                        : List.of())
                .profilePhotoUrl(profile.getProfilePhotoUrl())
                .isVerified(profile.isVerified())
                .build();
    }

}