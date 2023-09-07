package com.shinhan.hack.history.service;

import com.shinhan.hack.history.dto.HistoryDto;
import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.repository.HistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoryService {
    private final HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }
    public List<HistoryDto.Response> getAllHistory() {
        List<History> histories = historyRepository.findAll();
        return histories.stream()
                .map(this::ResponseDto)
                .collect(Collectors.toList());
    }
    private HistoryDto.Response ResponseDto(History history) {
        return HistoryDto.Response.builder()
                .history_id(history.getHistory_id())
//                .student_id(history.getStudent_id())
                .student_id(history.getStudent_id().getStudentId())
                .content(history.getContent())
                .deposit(history.getDeposit())
                .pay(history.getPay())
                .transactionTime(history.getTransactionTime())
                .balance(history.getBalance())
                .content_category(history.getContent_category())
                .build();
    }
    }
