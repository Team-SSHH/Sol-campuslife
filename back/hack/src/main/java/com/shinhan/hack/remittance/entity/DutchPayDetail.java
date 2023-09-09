package com.shinhan.hack.remittance.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DutchPayDetail {

    @Id
    @Column(name = "dutch_state_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dutchStateId;

    @ManyToOne
    @JoinColumn(name = "ducth_id", nullable = false)
    DutchPay dutchPay;

    @Column(name = "freind_id", nullable = false)
    private Long freindId;

    @Column(name = "dutch_amount", nullable = false)
    private Long dutchAmount;

    @Column(name = "remittance_state", nullable = false)
    @Builder.Default
    private Boolean remittanceState = false;


    static String patternTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    static LocalDateTime time = LocalDateTime.parse(patternTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

    @Column(name = "remittance_time", nullable = false)
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Builder.Default
    private LocalDateTime remittanceTime = time;
}
