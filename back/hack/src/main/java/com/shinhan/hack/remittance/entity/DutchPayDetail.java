package com.shinhan.hack.remittance.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.function.Supplier;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DutchPayDetail {

    @Id
    @Column(name = "dutch_detail_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dutchDetailId;

    @ManyToOne
    @JoinColumn(name = "ducth_id", nullable = false)
    DutchPay dutchPay;

    @Column(name = "friend_id", nullable = false)
    private Long friendId;

    @Column(name = "dutch_amount", nullable = false)
    private Long dutchAmount;

    @Column(name = "remittance_state", nullable = false)
    @Builder.Default
    private Boolean remittanceState = false;

    @Column(name = "remittance_time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime remittanceTime;

    static String dayStr = LocalDate.now().getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.KOREAN);
    @Column(name = "dutch_day", nullable = false)
    @Builder.Default
    private String dutchDetailDay = dayStr;

}
