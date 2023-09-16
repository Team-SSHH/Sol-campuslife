package com.shinhan.hack.initializer;

import com.shinhan.hack.transaction.Dto.ResponseData;
import com.shinhan.hack.transaction.Service.TransactionService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TransactionDataInitializer implements ApplicationRunner {

    private final TransactionService transactionService;

    public TransactionDataInitializer(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        List<ResponseData> allStudentsTransactionData = transactionService.getAllStudentsTransactionData();

    }
}