package com.enso.backend.repository;

import com.enso.backend.model.AdminInvite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdminInviteRepository extends JpaRepository<AdminInvite, String> {
    Optional<AdminInvite> findByEmail(String email);
}