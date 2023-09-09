package com.shinhan.hack.remittance.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shinhan.hack.login.entity.Student;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class DutchPay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dutch_id")
    private Long dutchId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "student_id")
    Student student;

    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "dutch_state", nullable = false)
    private Boolean dutchState;

    @Column(name = "number", nullable = false)
    private Long number;

    @Column(name = "request_time", nullable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime requestTime;

    @OneToMany(mappedBy = "dutchPay")
    List<DutchPayDetail> dutchPayDetails;
}
