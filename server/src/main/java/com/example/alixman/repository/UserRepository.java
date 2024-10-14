package com.example.alixman.repository;

import com.example.alixman.entity.Role;
import com.example.alixman.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByPhoneEqualsIgnoreCase(String phone);
//
//    @Query(nativeQuery = true, value = "select * from users where id = (id)")
//    Optional<UUID> findUserIdByRoleName(@Param("id") UUID id);
    boolean existsByPhoneEqualsIgnoreCase(String phone);
    boolean existsByPhoneEqualsIgnoreCaseAndIdNot(String phone, UUID id);

    Page<User> findUsersByRole(Role role, Pageable pageable);

    List<User> findUsersByRole(Role role);

    @Query(nativeQuery = true, value = "select * from users where role_id != 1 and enabled = true and money < 0 order by money")
    Page<User> findUsersWithDebt(Pageable pageable);

}
