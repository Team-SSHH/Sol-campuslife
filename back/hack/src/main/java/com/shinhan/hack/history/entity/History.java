package com.shinhan.hack.history.entity;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class History {

    @Id
    private Integer history_id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Integer student_id;
    // 여긴 스튜던트 엔터티의 스튜던트

    private String content;

    private Integer deposit;

    private Integer pay;

    @Column(name = "transaction_time")
    private LocalDateTime transactionTime;

    private Integer balance;

    private String content_category;

}
