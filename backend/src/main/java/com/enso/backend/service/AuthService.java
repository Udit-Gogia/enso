package com.enso.backend.service;

import com.enso.backend.dto.AuthResponse;
import com.enso.backend.dto.LoginRequest;
import com.enso.backend.dto.RegisterRequest;
import com.enso.backend.dto.RegisterResponse;
import com.enso.backend.model.User;
import com.enso.backend.repository.UserRepository;
import com.enso.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public RegisterResponse register(RegisterRequest request) {
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new RuntimeException("Email already in use");
    }

    User user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .phone(request.getPhone())
            .location(request.getLocation())
            .profileComplete(false)
            .build();

    userRepository.save(user);

    String setupToken = jwtUtil.generateSetupToken(user.getEmail());

    return new RegisterResponse(setupToken, user.getEmail(), "Profile setup required");
}

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateAccessToken(user);

        return new AuthResponse(token, user.getRole().name(), user.getEmail(), user.getName());
    }
}