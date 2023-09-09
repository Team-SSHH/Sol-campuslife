package com.shinhan.hack.remittance.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    @JoinColumn(nullable = false, name = "ducth_id")
    DutchPay dutchPay;

    @Column(name = "freind_id", nullable = false)
    private Long freindId;

    @Column(name = "dutch_amount", nullable = false)
    private Long dutchAmount;

    @Column(name = "remittance_state", nullable = false)
    private Boolean remittanceState;

    @Column(name = "remittance_time")
    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime remittanceTime;
}
