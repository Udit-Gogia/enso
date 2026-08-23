package com.enso.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enso.backend.model.ServiceOffering;

@Repository
public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, UUID> {
    List<ServiceOffering> findByCategory_CodeAndIsActiveTrue(String categoryCode);
}