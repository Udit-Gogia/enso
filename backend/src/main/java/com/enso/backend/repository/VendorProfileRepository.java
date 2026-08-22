package com.enso.backend.repository;

import com.enso.backend.model.VendorProfile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VendorProfileRepository extends JpaRepository<VendorProfile, UUID> {
    Optional<VendorProfile> findByUser_Id(UUID email);

    @Query("""
            SELECT DISTINCT v FROM VendorProfile v
            JOIN v.user u
            LEFT JOIN v.categories c
            WHERE (:category IS NULL OR c.code = :category)
            AND (:location IS NULL OR LOWER(u.location) LIKE :location)
            AND (:name IS NULL OR LOWER(v.businessName) LIKE :name)
            """)
    Page<VendorProfile> searchVendors(@Param("category") String category,
                                       @Param("location") String location,
                                       @Param("name") String name,
                                       Pageable pageable);
}