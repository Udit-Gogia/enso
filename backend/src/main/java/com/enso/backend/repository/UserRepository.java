package com.enso.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enso.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
	 * Find a User by their email address.
	 *
	 * @param email the email address of the user to find. Must not be {@literal null}.
	 * @return the user if found, otherwise an empty Optional.
	 */
    Optional<User> findByEmail(String email);
}
