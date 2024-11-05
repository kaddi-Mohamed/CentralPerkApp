package com.invenboost.Central.Perk.repository;

import com.invenboost.Central.Perk.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * @author HP
 **/
@Repository
public interface TransactionRepository extends JpaRepository<Transaction , Long> {
    List<Transaction> findAllByTransactionDateBetween(LocalDate startDate, LocalDate endDate);
}
