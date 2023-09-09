package com.shinhan.hack.remittance.service;

import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.repository.HistoryRepository;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import com.shinhan.hack.remittance.dto.DutchPayDetailDto;
import com.shinhan.hack.remittance.dto.DutchPayDto;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.entity.DutchPay;
import com.shinhan.hack.remittance.entity.DutchPayDetail;
import com.shinhan.hack.remittance.repository.DutchPayRepository;
import com.shinhan.hack.remittance.repository.RemittanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RemittanceService {

    private final RemittanceRepository remittanceRepository;
    private final DutchPayRepository dutchPayRepository;
    private final HistoryRepository historyRepository;
    private final LoginRepository loginRepository;

    @Transactional
    public RemittanceDto.Response remittance(RemittanceDto.update remittanceUpdate) {
        Long studentId = remittanceUpdate.getStudentId();
        Long freindId = remittanceUpdate.getFreindStudentId();
        Long amount = remittanceUpdate.getAmount();
        String content = remittanceUpdate.getContent();
        // 학번 유무 확인
        if(!remittanceRepository.existsById(studentId) || !remittanceRepository.existsById(freindId)){
            return new RemittanceDto.Response();
        }

        // 송금
        remittanceRepository.send(studentId, amount);
        remittanceRepository.receive(freindId, amount);
        Optional<Student> student = remittanceRepository.findById(studentId);
        Optional<Student> freind = remittanceRepository.findById(freindId);


        String patternTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        LocalDateTime time = LocalDateTime.parse(patternTime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        // 거래내역 추가
        History myHistory = History.builder()
                .balance(student.get().getBalance())
                .content(content)
                .contentCategory("계좌이체")
                .pay(amount)
                .transactionTime(time)
                .student(Student.builder().studentId(studentId).build())
                .build();

        History fHistory = History.builder()
                .balance(freind.get().getBalance())
                .content(content)
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

    public List<DutchPay> dutchPay(Long studentId) {
        List<DutchPay> dutchPayList = dutchPayRepository.findByStudentId(studentId);
        return dutchPayList;
    }

    public List<DutchPayDetailDto.Response> getDutchDetail(Long dutchId){
        List<DutchPayDetail> dutchPayDetails = dutchPayRepository.findByDutchId(dutchId);
        List<DutchPayDetailDto.Response> responseList = new ArrayList<>();
        for (DutchPayDetail detail: dutchPayDetails
             ) {
            Optional<Student> freind = loginRepository.findById(detail.getFreindId());

            responseList.add(DutchPayDetailDto.Response.builder()
                    .dutchDetailId(detail.getDutchDetailId())
                    .dutchAmount(detail.getDutchAmount())
                    .remittanceState(detail.getRemittanceState())
                    .remittanceTime(detail.getRemittanceTime())
                    .name(freind.get().getName())
                    .build());
        }
        return responseList;
    }
}
