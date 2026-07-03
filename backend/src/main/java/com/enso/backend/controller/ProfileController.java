package com.enso.backend.controller;

import com.enso.backend.dto.AuthResponse;
import com.enso.backend.dto.ProfileSetupRequest;
import com.enso.backend.security.JwtUtil;
import com.enso.backend.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final JwtUtil jwtUtil;

    @PostMapping("/setup")
    public ResponseEntity<AuthResponse> setupProfile(
            @RequestHeader("Authorization") String authHeader,
            @Valid @RequestBody ProfileSetupRequest request) {
        String token = authHeader.substring(7);
        System.out.println("Token received in setupProfile: " + token); // Debugging line
        if (!jwtUtil.isSetupToken(token)) {
            throw new RuntimeException("Invalid token type for profile setup");
        }

        String email = jwtUtil.extractUsername(token);
        return ResponseEntity.ok(profileService.setupProfile(email, request));
    }
}