package com.enso.backend.service;

import com.enso.backend.dto.AdminProfileResponse;
import com.enso.backend.dto.AuthResponse;
import com.enso.backend.dto.CustomerProfileResponse;
import com.enso.backend.dto.ProfileSetupRequest;
import com.enso.backend.dto.ProfileUpdateRequest;
import com.enso.backend.dto.VendorProfileResponse;
import com.enso.backend.model.*;
import com.enso.backend.repository.AdminInviteRepository;
import com.enso.backend.repository.AdminProfileRepository;
import com.enso.backend.repository.CustomerProfileRepository;
import com.enso.backend.repository.ServiceCategoryRepository;
import com.enso.backend.repository.UserRepository;
import com.enso.backend.repository.VendorProfileRepository;
import com.enso.backend.security.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;
    private final VendorProfileRepository vendorProfileRepository;
    private final AdminProfileRepository adminProfileRepository;
    private final AdminInviteRepository adminInviteRepository;
    private final ServiceCategoryRepository serviceCategoryRepository;
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
                        .categories(request.getCategoryCodes() != null ? request.getCategoryCodes().stream()
                                .map(serviceCategoryRepository::findByCode)
                                .filter(optional -> optional != null && optional.isPresent())
                                .map(optional -> optional.get())
                                .collect(Collectors.toList())
                                : List.of())
                        .profilePhotoUrl(request.getProfilePhotoUrl())
                        .build();
                vendorProfileRepository.save(profile);
            }
            case ADMIN -> {
                AdminInvite invite = adminInviteRepository.findByEmail(email)
                        .orElseThrow(() -> new RuntimeException("No admin invite found for this email"));

                if (invite.isUsed()) {
                    throw new RuntimeException("This invite has already been used");
                }

                if (!invite.getOtp().equals(request.getAdminOtp())) {
                    throw new RuntimeException("Invalid OTP");
                }

                invite.setUsed(true);
                adminInviteRepository.save(invite);

                AdminProfile profile = AdminProfile.builder()
                        .user(user)
                        .build();
                adminProfileRepository.save(profile);
            }
            case SUPER_ADMIN -> {
                throw new RuntimeException("Cannot set up profile for super admin");
            }
        }

        user.setRole(role);
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());
        user.setProfileComplete(true);
        userRepository.save(user);

        String accessToken = jwtUtil.generateAccessToken(user);
        return new AuthResponse(accessToken, role.name(), user.getEmail(), user.getName());
    }

    public ProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = user.getRole();

        switch (role) {
            case CUSTOMER -> {
                CustomerProfile profile = customerProfileRepository.findByUser_Id(user.getId())
                        .orElseThrow(() -> new RuntimeException("Profile Not found"));

                return CustomerProfileResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .profileComplete(user.isProfileComplete())
                        .location(user.getLocation())
                        .profilePhotoUrl(profile.getProfilePhotoUrl())
                        .createdAt(user.getCreatedAt())
                        .preferredLocation(profile.getPreferredLocation())
                        .build();
            }
            case VENDOR -> {
                VendorProfile profile = vendorProfileRepository.findByUser_Id(user.getId())
                        .orElseThrow(() -> new RuntimeException("Profile Not found"));

                return VendorProfileResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .profileComplete(user.isProfileComplete())
                        .location(user.getLocation())
                        .profilePhotoUrl(profile.getProfilePhotoUrl())
                        .createdAt(user.getCreatedAt())
                        .bio(profile.getBio())
                        .businessName(profile.getBusinessName())
                        .experience(profile.getYearsOfExperience())
                        .openTime(profile.getOpenTime())
                        .closeTime(profile.getCloseTime())
                        .categories(profile.getCategories() != null
                                ? profile.getCategories().stream().map(ServiceCategory::getCode).toList()
                                : List.of())
                        .isVerified(profile.isVerified())
                        .build();
            }
            case ADMIN, SUPER_ADMIN -> {
                adminProfileRepository.findByUser_Id(user.getId())
                        .orElseThrow(() -> new RuntimeException("Profile Not found"));

                return AdminProfileResponse.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .profileComplete(user.isProfileComplete())
                        .location(user.getLocation())
                        .profilePhotoUrl(user.getProfilePhotoUrl())
                        .createdAt(user.getCreatedAt())
                        .build();
            }

            default -> throw new IllegalStateException("Unexpected role: " + role);
        }
    }

    public ProfileResponse updateProfile(String email, ProfileUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getPhone().isPresent())
            user.setPhone(request.getPhone().get());
        if (request.getLocation().isPresent())
            user.setLocation(request.getLocation().get());
        userRepository.save(user);

        Role role = user.getRole();

        switch (role) {
            case CUSTOMER -> {
                CustomerProfile profile = customerProfileRepository.findByUser_Id(user.getId())
                        .orElseThrow(() -> new RuntimeException("Profile Not found"));
                if (request.getPreferredLocation().isPresent())
                    profile.setPreferredLocation(request.getPreferredLocation().get());
                if (request.getProfilePhotoUrl().isPresent())
                    profile.setProfilePhotoUrl(request.getProfilePhotoUrl().get());
                customerProfileRepository.save(profile);
            }
            case VENDOR -> {
                VendorProfile profile = vendorProfileRepository.findByUser_Id(user.getId())
                        .orElseThrow(() -> new RuntimeException("Profile Not found"));
                if (request.getBio().isPresent())
                    profile.setBio(request.getBio().get());
                if (request.getBusinessName().isPresent())
                    profile.setBusinessName(request.getBusinessName().get());
                if (request.getYearsOfExperience().isPresent())
                    profile.setYearsOfExperience(request.getYearsOfExperience().get());
                if (request.getOpenTime().isPresent())
                    profile.setOpenTime(LocalTime.parse(request.getOpenTime().get()));
                if (request.getCloseTime().isPresent())
                    profile.setCloseTime(LocalTime.parse(request.getCloseTime().get()));
                if (request.getCategoryCodes().isPresent()) {
                    profile.setCategories(request.getCategoryCodes().get().stream()
                            .map(serviceCategoryRepository::findByCode)
                            .filter(optional -> optional != null && optional.isPresent())
                            .map(optional -> optional.get())
                            .collect(Collectors.toList()));
                }
                if (request.getProfilePhotoUrl().isPresent())
                    profile.setProfilePhotoUrl(request.getProfilePhotoUrl().get());
                vendorProfileRepository.save(profile);
            }
            case ADMIN, SUPER_ADMIN -> {
                // no role-specific updatable fields yet
            }
            default -> throw new IllegalStateException("Unexpected role: " + role);
        }

        return getProfile(email);
    }
}