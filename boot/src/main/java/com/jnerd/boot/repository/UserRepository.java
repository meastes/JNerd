package com.jnerd.boot.repository;

import com.jnerd.boot.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for user data.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByUsername(String username);
    Optional<User> findOneByEmail(String email);
    Optional<User> findOneByActivationKey(String activationKey);
    Optional<User> findOneByPasswordResetKey(String resetKey);

}
