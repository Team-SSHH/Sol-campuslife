package com.shinhan.hack.history.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.shinhan.hack.login.entity.Student;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

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
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    // 여긴 스튜던트 엔터티의 스튜던트 스튜던트로 받고 탐색할떄 객체 스튜던트로 찾기

    @Column(name = "content")
    private String content;

    @Column(name = "deposit")
    private Long deposit;

    @Column(name = "pay")
    private Long pay;

    @Column(name = "transaction_time", nullable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime transactionTime;

    @Column(name = "balance", nullable = false)
    private Long balance;

    @Column(name = "content_category", nullable = false)
    private String contentCategory;

}
