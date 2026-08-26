package com.enso.backend.service;

import com.enso.backend.dto.BookingCreateRequest;
import com.enso.backend.dto.BookingResponse;
import com.enso.backend.dto.ServiceOfferingResponse;
import com.enso.backend.model.*;
import com.enso.backend.repository.BookingRepository;
import com.enso.backend.repository.CustomerProfileRepository;
import com.enso.backend.repository.ServiceCategoryRepository;
import com.enso.backend.repository.ServiceOfferingRepository;
import com.enso.backend.repository.UserRepository;
import com.enso.backend.repository.VendorProfileRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {

        private final BookingRepository bookingRepository;
        private final UserRepository userRepository;
        private final CustomerProfileRepository customerProfileRepository;
        private final VendorProfileRepository vendorProfileRepository;
        private final ServiceCategoryRepository serviceCategoryRepository;
        private final ServiceOfferingRepository serviceOfferingRepository;

        public BookingResponse createBooking(String email, BookingCreateRequest request) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                CustomerProfile customer = customerProfileRepository.findByUser_Id(user.getId())
                                .orElseThrow(() -> new RuntimeException("Customer profile not found"));

                ServiceCategory category = serviceCategoryRepository.findByCode(request.getCategoryCode())
                                .orElseThrow(() -> new RuntimeException("Invalid category"));

                VendorProfile vendor = null;
                if (request.getVendorId() != null && !request.getVendorId().isBlank()) {
                        vendor = vendorProfileRepository.findById(UUID.fromString(request.getVendorId()))
                                        .orElseThrow(() -> new RuntimeException("Selected vendor not found"));
                }

                List<ServiceOffering> serviceOfferings = List.of();
                if (request.getServiceOfferingIds() != null && !request.getServiceOfferingIds().isEmpty()) {
                        serviceOfferings = request.getServiceOfferingIds().stream()
                                        .map(id -> serviceOfferingRepository.findById(UUID.fromString(id))
                                                        .orElseThrow(() -> new RuntimeException(
                                                                        "Selected service not found: " + id)))
                                        .toList();
                }

                Booking booking = Booking.builder()
                                .customer(customer)
                                .vendor(vendor)
                                .category(category)
                                .title(request.getTitle())
                                .description(request.getDescription())
                                .urgency(Urgency.valueOf(request.getUrgency()))
                                .address(request.getAddress())
                                .locality(request.getLocality())
                                .serviceOfferings(serviceOfferings)
                                .city(request.getCity())
                                .state(request.getState())
                                .pincode(request.getPincode())
                                .preferredDate(LocalDate.parse(request.getPreferredDate()))
                                .preferredTime(request.getPreferredTime() != null
                                                && !request.getPreferredTime().isBlank()
                                                                ? LocalTime.parse(request.getPreferredTime())
                                                                : null)
                                .estimatedBudget(request.getEstimatedBudget())
                                .visibility(vendor != null ? BookingVisibility.PRIVATE : BookingVisibility.PUBLIC)
                                .status(BookingStatus.PENDING)
                                .build();

                Booking saved = bookingRepository.save(booking);
                return toResponse(saved);
        }

        private BookingResponse toResponse(Booking b) {
                return BookingResponse.builder()
                                .id(b.getId())
                                .categoryCode(b.getCategory().getCode())
                                .serviceOfferings(b.getServiceOfferings() != null
                                                ? b.getServiceOfferings().stream()
                                                                .map(o -> new ServiceOfferingResponse(o.getId(),
                                                                                o.getCode(), o.getDisplayName(),
                                                                                o.getCategory().getCode(),
                                                                                o.getCategory().getDisplayName()))
                                                                .toList()
                                                : List.of())
                                .categoryName(b.getCategory().getDisplayName())
                                .vendorId(b.getVendor() != null ? b.getVendor().getId().toString() : null)
                                .vendorBusinessName(b.getVendor() != null ? b.getVendor().getBusinessName() : null)
                                .title(b.getTitle())
                                .description(b.getDescription())
                                .urgency(b.getUrgency().name())
                                .address(b.getAddress())
                                .locality(b.getLocality())
                                .city(b.getCity())
                                .state(b.getState())
                                .pincode(b.getPincode())
                                .preferredDate(b.getPreferredDate().toString())
                                .preferredTime(b.getPreferredTime() != null ? b.getPreferredTime().toString() : null)
                                .estimatedBudget(b.getEstimatedBudget())
                                .visibility(b.getVisibility().name())
                                .status(b.getStatus().name())
                                .createdAt(b.getCreatedAt())
                                .build();
        }
}