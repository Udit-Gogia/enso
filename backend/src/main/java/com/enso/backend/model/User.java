package com.enso.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity // Tells JPA that this class is an entity and should be mapped to a database table
@Table(name = "users") // Table name in the database. Overrides the default name "User".
@Data // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods
@Builder // Enables instance creation using methods instead of constructors.
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id // Primary key of the entity
    @GeneratedValue(strategy = GenerationType.UUID) // Auto generation
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @Builder.Default
    @Column(nullable = false)
    private boolean profileComplete = false;

    private String location;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist // Runs before insert
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}