package com.shinhan.hack.history.entity;
import com.shinhan.hack.login.entity.Student;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id", nullable = false)
    private Integer history_id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student_id;
    // 여긴 스튜던트 엔터티의 스튜던트

    @Column(name = "content")
    private String content;

    @Column(name = "deposit")
    private Integer deposit;

    @Column(name = "pay")
    private Integer pay;

    @Column(name = "transaction_time", nullable = false)
    private LocalDateTime transactionTime;

    @Column(name = "balance", nullable = false)
    private Integer balance;

    @Column(name = "content_category", nullable = false)
    private String content_category;

}
