package com.invenboost.Central.Perk.service;

import com.invenboost.Central.Perk.entity.Product;
import com.invenboost.Central.Perk.entity.Transaction;
import com.invenboost.Central.Perk.entity.User;
import com.invenboost.Central.Perk.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

/**
 * @author HP
 **/
@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    public Transaction buyProduct(long userId, long productId) {
        User user = userService.getUserById(userId);
        Product product = productService.getProductById(productId);

        if (user == null || product == null) {
            throw new IllegalArgumentException("User or Product not found");
        }

        long pointsRewarded = product.getCategory().getPoint();

        Transaction transaction = Transaction.builder()
                .user(user)
                .product(product)
                .pointsRedeemed(0)
                .pointRewarded(pointsRewarded)
                .transactionDate(LocalDate.now())
                .build();

        userService.addPoint(user.getId(), pointsRewarded);

        return transactionRepository.save(transaction);
    }

    public Transaction buyProductWithPoints(long userId, long productId) {
        User user = userService.getUserById(userId);
        Product product = productService.getProductById(productId);

        if (user == null || product == null) {
            throw new RuntimeException("User or Product not found");
        }

        long productPoints = product.getPoint();

        if (user.getPoint() < productPoints) {
            throw new RuntimeException("Not enough points");
        }

        Transaction transaction = Transaction.builder()
                        .user(user)
                        .product(product)
                        .pointsRedeemed(productPoints)
                        .pointRewarded(0)
                        .transactionDate(LocalDate.now())
                        .build();
        userService.deductPoint(user.getId(), productPoints);
        return transactionRepository.save(transaction);
    }

    public long getSumOfPointsRewardedForCurrentWeek() {
        List<Transaction> transactions = getTransactionsForCurrentWeek();
       return  transactions.stream().mapToLong(Transaction::getPointRewarded).sum();
    }

    public long getSumOfPointsRedeemedForCurrentWeek() {
        List<Transaction> transactions = getTransactionsForCurrentWeek();
        return transactions.stream().mapToLong(Transaction::getPointsRedeemed).sum();
    }
    private List<Transaction> getTransactionsForCurrentWeek() {
        LocalDate startOfWeek = LocalDate.now().with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = LocalDate.now().with(TemporalAdjusters.nextOrSame(java.time.DayOfWeek.SUNDAY));
        return transactionRepository.findAllByTransactionDateBetween(startOfWeek, endOfWeek);
    }
}
