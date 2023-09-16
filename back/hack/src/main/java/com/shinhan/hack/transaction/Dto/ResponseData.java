package com.shinhan.hack.transaction.Dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseData {
    private DataHeader dataHeader;
    private TransactionDataBody dataBody;


    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TransactionDataBody {
        @JsonProperty("계좌번호")
        private String accountNumber;

        @JsonProperty("상품명")
        private String productName;

        @JsonProperty("계좌잔액")
        private String accountBalance;

        @JsonProperty("고객명")
        private String customerName;

        @JsonProperty("거래내역반복횟수")
        private int transactionRepeatCount;

        @JsonProperty("거래내역")
        List<Transaction> transactions;
    }

    @Getter
    @Setter
    public static class Transaction {
        @JsonProperty("거래일자")
        private String transactionDate;

        @JsonProperty("거래시간")
        private String transactionTime;

        @JsonProperty("적요")
        private String summary;

        @JsonProperty("출금금액")
        private String withdrawalAmount;

        @JsonProperty("입금금액")
        private String depositAmount;

        @JsonProperty("내용")
        private String content;

        @JsonProperty("잔액")
        private String balance;


    }




}