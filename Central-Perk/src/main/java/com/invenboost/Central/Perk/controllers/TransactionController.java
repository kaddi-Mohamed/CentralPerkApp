package com.invenboost.Central.Perk.controllers;
import com.invenboost.Central.Perk.dto.TransactionDTO;
import com.invenboost.Central.Perk.entity.Transaction;
import com.invenboost.Central.Perk.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * @author HP
 **/

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/buyProduct")
    public Transaction buyProductWithCategoryPoints(@RequestBody TransactionDTO transactionDTO) {
        return transactionService.buyProduct(transactionDTO.getUserId(), transactionDTO.getProductId());
    }

    @PostMapping("/buyWithUserPoints")
    public Transaction buyProductWithUserPoints(@RequestBody TransactionDTO transactionDTO) {
        return transactionService.buyProductWithPoints(transactionDTO.getUserId(), transactionDTO.getProductId());
    }

    @GetMapping("/reward/points/weekly/current")
    public long getSumOfPointsRewardedForCurrentWeek() {
        return transactionService.getSumOfPointsRewardedForCurrentWeek();
    }

    @GetMapping("/redeemed/points/weekly/current")
    public long getSumOfPointsRedeemedForCurrentWeek() {
        return transactionService.getSumOfPointsRedeemedForCurrentWeek();
    }
}
