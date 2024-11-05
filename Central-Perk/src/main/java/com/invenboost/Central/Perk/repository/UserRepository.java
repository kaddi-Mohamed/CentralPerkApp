package com.invenboost.Central.Perk.repository;

import com.invenboost.Central.Perk.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;

/**
 * @author HP
 **/
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByName(String name);
    @Query("SELECT u FROM User u ORDER BY u.point DESC")
    List<User> findTop3ByPoints(Pageable pageable);



}
