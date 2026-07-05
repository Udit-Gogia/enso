package com.enso.backend.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.enso.backend.model.ServiceCategory;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, UUID> {
    /**
	 * Find the service category by its code.
	 *
	 * @param code the code of the service category to find. Must not be {@literal null}.
	 * @return the service category if found, otherwise an empty Optional.
	 */
    Optional<ServiceCategory> findByCode(String code);

    List<ServiceCategory> findByIsActiveTrue();
}
