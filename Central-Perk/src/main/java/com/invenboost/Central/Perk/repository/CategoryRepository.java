package com.invenboost.Central.Perk.repository;

import com.invenboost.Central.Perk.entity.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author HP
 **/
@Repository
public interface CategoryRepository extends JpaRepository<Category , Long> {
    @Query("SELECT c FROM Category c ORDER BY FUNCTION('RAND')")
    List<Category> findRandomCategories(Pageable pageable);

}
