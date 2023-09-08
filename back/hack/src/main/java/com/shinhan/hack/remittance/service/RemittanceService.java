package com.shinhan.hack.remittance.service;

import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.repository.RemittanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RemittanceService {

    private final RemittanceRepository remittanceRepository;

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
