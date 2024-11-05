package com.invenboost.Central.Perk.repository;

import com.invenboost.Central.Perk.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * @author HP
 **/
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p ORDER BY FUNCTION('RAND')")
    List<Product> findRandomProducts(Pageable pageable);
    List<Product> findAllByOrderByPointDesc(Pageable pageable);

}
