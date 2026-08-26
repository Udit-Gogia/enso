package com.enso.backend.controller;

import com.enso.backend.dto.BookingCreateRequest;
import com.enso.backend.dto.BookingResponse;
import com.enso.backend.security.JwtUtil;
import com.enso.backend.service.BookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final JwtUtil jwtUtil;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<BookingResponse> createBooking(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody BookingCreateRequest request) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);
        return ResponseEntity.ok(bookingService.createBooking(email, request));
    }
}