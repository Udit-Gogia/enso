package com.enso.backend.service;

import com.enso.backend.dto.AuthResponse;
import com.enso.backend.dto.ProfileSetupRequest;
import com.enso.backend.model.*;
import com.enso.backend.repository.CustomerProfileRepository;
import com.enso.backend.repository.UserRepository;
import com.enso.backend.repository.VendorProfileRepository;
import com.enso.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final VendorProfileRepository vendorProfileRepository;
    private final JwtUtil jwtUtil;

    public AuthResponse setupProfile(String email, ProfileSetupRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isProfileComplete()) {
            throw new RuntimeException("Profile already set up");
        }

        Role role = Role.valueOf(request.getRole().toUpperCase());

        switch (role) {
            case CUSTOMER -> {
                CustomerProfile profile = CustomerProfile.builder()
                        .user(user)
                        .preferredLocation(request.getPreferredLocation())
                        .profilePhotoUrl(request.getProfilePhotoUrl())
                        .build();
                customerProfileRepository.save(profile);
            }
            case VENDOR -> {
                if (request.getBusinessName() == null || request.getBusinessName().isBlank()) {
                    throw new RuntimeException("Business name is required for vendors");
                }
                VendorProfile profile = VendorProfile.builder()
                        .user(user)
                        .businessName(request.getBusinessName())
                        .bio(request.getBio())
                        .yearsOfExperience(request.getYearsOfExperience() != null ? request.getYearsOfExperience() : 0)
                        .openTime(request.getOpenTime() != null ? LocalTime.parse(request.getOpenTime()) : null)
                        .closeTime(request.getCloseTime() != null ? LocalTime.parse(request.getCloseTime()) : null)
                        .tags(request.getTags())
                        .profilePhotoUrl(request.getProfilePhotoUrl())
                        .build();
                vendorProfileRepository.save(profile);
            }
            case ADMIN -> {
                // OTP validation — to be implemented
                throw new RuntimeException("Admin setup not yet implemented");
            }
        }

        user.setRole(role);
        user.setProfileComplete(true);
        userRepository.save(user);

        String accessToken = jwtUtil.generateAccessToken(user);
        return new AuthResponse(accessToken, role.name(), user.getEmail(), user.getName());
    }
}