package com.shinhan.hack.history.service;

import com.shinhan.hack.history.dto.HistoryDto;
import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.repository.HistoryRepository;
import com.shinhan.hack.login.entity.Student;
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
    public List<HistoryDto.Response> getMyHistory(Long studentId) {
        // long id로 객체 student 만들어서
        // student 객체로 탐색하기
        Student student = new Student();
        student.setStudentId(studentId);
        List<History> studentHistories = historyRepository.findByStudent(student);
        return studentHistories.stream()
                .map(this::ResponseDto)
                .collect(Collectors.toList());
    }



    private HistoryDto.Response ResponseDto(History history) {
        return HistoryDto.Response.builder()
                .historyId(history.getHistoryId())
                .studentId((history.getStudent().getStudentId()))
//                .student_id(history.getStudent_id())
                .content(history.getContent())
                .deposit(history.getDeposit())
                .pay(history.getPay())
                .transactionTime(history.getTransactionTime())
                .balance(history.getBalance())
                .contentCategory(history.getContentCategory())
                .day(history.getDay())
                .build();
    }
    }
