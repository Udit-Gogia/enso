package com.enso.backend.controller;

import com.enso.backend.model.AdminInvite;
import com.enso.backend.repository.AdminInviteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminInviteRepository adminInviteRepository;

    @PostMapping("/invite")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> inviteAdmin(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");

        if (email == null || otp == null) {
            return ResponseEntity.badRequest().body("Email and OTP are required");
        }

        if (adminInviteRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.badRequest().body("Invite already exists for this email");
        }

        AdminInvite invite = AdminInvite.builder()
                .email(email)
                .otp(otp)
                .build();

        adminInviteRepository.save(invite);

        // TODO: Send email notification to invited admin
        System.out.println("ADMIN INVITE — Email: " + email + " | OTP: " + otp);

        return ResponseEntity.ok(Map.of("message", "Invite created successfully"));
    }
}