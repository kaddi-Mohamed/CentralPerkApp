package com.invenboost.Central.Perk.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * @author HP
 **/
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;
    private String name ;
    private Long point ;
    private String imageUrl ;
    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    private Set<Transaction> transactions = new HashSet<>();
}
