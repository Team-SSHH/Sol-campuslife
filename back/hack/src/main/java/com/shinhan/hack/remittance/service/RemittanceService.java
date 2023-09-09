package com.shinhan.hack.remittance.service;

import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.repository.HistoryRepository;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.repository.RemittanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RemittanceService {

    private final RemittanceRepository remittanceRepository;
    private final HistoryRepository historyRepository;

    @Transactional
    public RemittanceDto.Response remittance(RemittanceDto.update remittanceUpdate) {
        Long studentId = remittanceUpdate.getStudentId();
        Long freindId = remittanceUpdate.getFreindStudentId();
        Long amount = remittanceUpdate.getAmount();
        // 학번 유무 확인
        if(!remittanceRepository.existsById(studentId) || !remittanceRepository.existsById(freindId)){
            return new RemittanceDto.Response();
        }

        // 송금
//        student.get().setBalance(student.get().getBalance() - amount);
//        freind.get().setBalance(freind.get().getBalance() + amount);
        remittanceRepository.send(studentId, amount);
        remittanceRepository.receive(freindId, amount);
        Optional<Student> student = remittanceRepository.findById(studentId);
        Optional<Student> freind = remittanceRepository.findById(freindId);


        String patternTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        LocalDateTime time = LocalDateTime.parse(patternTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // 거래내역 추가
        History myHistory = History.builder()
                .balance(student.get().getBalance())
                .content("송금")
                .contentCategory("계좌이체")
                .pay(amount)
                .transactionTime(time)
                .student(Student.builder().studentId(studentId).build())
                .build();

        History fHistory = History.builder()
                .balance(freind.get().getBalance())
                .content("입금")
                .contentCategory("계좌이체")
                .deposit(amount)
                .transactionTime(time)
                .student(Student.builder().studentId(freindId).build())
                .build();

        historyRepository.save(myHistory);
        historyRepository.save(fHistory);

        // 정보 반환
        RemittanceDto.Response response = RemittanceDto.Response.builder()
                .phoneId(student.get().getPhoneId())
                .balance(student.get().getBalance())
                .freindPhoneId(freind.get().getPhoneId())
                .freindBalance(freind.get().getBalance())
                .build();
        return response;
    }

}
