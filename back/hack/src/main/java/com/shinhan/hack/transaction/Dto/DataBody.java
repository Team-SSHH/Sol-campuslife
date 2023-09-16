package com.shinhan.hack.transaction.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DataBody {
    @JsonProperty("계좌번호")
    private String accountNumber;

}