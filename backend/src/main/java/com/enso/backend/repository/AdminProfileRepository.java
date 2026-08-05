// repository/AdminProfileRepository.java
package com.enso.backend.repository;

import com.enso.backend.model.AdminProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdminProfileRepository extends JpaRepository<AdminProfile, UUID> {
    Optional<AdminProfile> findByUser_Id(UUID userId);
}