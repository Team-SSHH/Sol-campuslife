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
import com.shinhan.hack.remittance.repository.DutchPayDetailRepository;
import com.shinhan.hack.remittance.repository.DutchPayRepository;
import com.shinhan.hack.remittance.repository.RemittanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;

@Service
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class RemittanceService {

    private final RemittanceRepository remittanceRepository;
    private final DutchPayRepository dutchPayRepository;
    private final HistoryRepository historyRepository;
    private final LoginRepository loginRepository;
    private final DutchPayDetailRepository dutchPayDetailRepository;

    @Transactional
    public RemittanceDto.Response remittance(RemittanceDto.update remittanceUpdate) {
        Long studentId = remittanceUpdate.getStudentId();
        Long friendId = remittanceUpdate.getFriendStudentId();
        Long amount = remittanceUpdate.getAmount();
        String content = remittanceUpdate.getContent();

        // 송금
        remittanceRepository.send(studentId, amount);
        remittanceRepository.receive(friendId, amount);
        Optional<Student> student = remittanceRepository.findById(studentId);
        Optional<Student> friend = remittanceRepository.findById(friendId);
        if(student.isEmpty()){
            throw new NoSuchElementException("내 학번이 틀렸습니다.");
        }else if(friend.isEmpty()){
            throw new NoSuchElementException("친구 학번이 없습니다.");
        }

        // 거래내역 추가
        History myHistory = History.builder()
                .balance(student.get().getBalance())
                .content(content)
                .contentCategory("계좌이체")
                .pay(amount)
                .deposit(Long.valueOf(0))
                .student(Student.builder().studentId(studentId).build())
                .build();

        History fHistory = History.builder()
                .balance(friend.get().getBalance())
                .content(content)
                .contentCategory("계좌이체")
                .pay(Long.valueOf(0))
                .deposit(amount)
                .student(Student.builder().studentId(friendId).build())
                .build();

        historyRepository.save(myHistory);
        historyRepository.save(fHistory);

        // 정보 반환
        RemittanceDto.Response response = RemittanceDto.Response.builder()
                .phoneId(student.get().getPhoneId())
                .balance(student.get().getBalance())
                .friendPhoneId(friend.get().getPhoneId())
                .friendBalance(friend.get().getBalance())
                .content(content)
                .amount(amount)
                .build();
        return response;
    }
    public RemittanceDto.Response won1(RemittanceDto.update remittanceUpdate) {
        Long studentId = remittanceUpdate.getStudentId();
        Long amount = Long.valueOf(1);
        String content = remittanceUpdate.getContent();

        // 송금
        remittanceRepository.receive(studentId, amount);
        Optional<Student> student = remittanceRepository.findById(studentId);
        if(student.isEmpty()){
            throw new NoSuchElementException("없는 학번이 입니다.");
        }

        // 거래내역 추가
        History history = History.builder()
                .balance(student.get().getBalance())
                .content(content)
                .contentCategory("1원 이체")
                .pay(Long.valueOf(0))
                .deposit(amount)
                .student(Student.builder().studentId(studentId).build())
                .build();

        historyRepository.save(history);

        // 정보 반환
        RemittanceDto.Response response = RemittanceDto.Response.builder()
                .phoneId(student.get().getPhoneId())
                .balance(student.get().getBalance())
                .content(content)
                .amount(amount)
                .build();
        return response;
    }

    public DutchPayDetailDto.consent sendDutch(
            DutchPayDto.Post dutchPost
    ){
        Long number = Long.valueOf(dutchPost.getFriendList().size() + 1);

        // 더치페이 테이블에 저장
        Student student = Student.builder().studentId(dutchPost.getStudentId()).build();
        DutchPay dutchpay = DutchPay.builder()
                .amount(dutchPost.getAmount())
                .number(number)
                .student(student)
                .build();

        dutchPayRepository.save(dutchpay);

        // 더치페이 디테일 테이블에 저장
        Long dutchAmount = dutchpay.getAmount()/number;
        List<Student> friendList = new ArrayList<>();
        String studentName = loginRepository.findById(dutchPost.getStudentId()).get().getName();
        for (Long friendsId: dutchPost.getFriendList()
             ) {
            dutchPayDetailRepository.save(DutchPayDetail.builder()
                    .dutchPay(dutchpay)
                    .dutchAmount(dutchAmount)
                    .friendId(friendsId)
                    .build());
            Optional<Student> friend = loginRepository.findById(friendsId);
            friendList.add(friend.get());
        }

        return DutchPayDetailDto.consent.builder()
                .amount(dutchPost.getAmount())
                .dutchAmount(dutchAmount)
                .frindList(friendList)
                .content("더치페이 해주세요")
                .studentName(studentName)
                .build();
    }

    public List<DutchPay> dutchPay(Long studentId) {
        List<DutchPay> dutchPayList = dutchPayRepository.findByStudentId(studentId);
        return dutchPayList;
    }

    public List<DutchPayDetailDto.Response> getDutchDetail(Long dutchId){
        List<DutchPayDetail> dutchPayDetails = dutchPayRepository.findByDutchId(dutchId);
        if (dutchPayDetails.size() == 0) {
            throw new NoSuchElementException("더치페이 상세 내역이 없습니다.");
        }
        List<DutchPayDetailDto.Response> responseList = new ArrayList<>();
        for (DutchPayDetail detail: dutchPayDetails
             ) {
            System.out.println(detail);
            Optional<Student> friend = loginRepository.findById(detail.getFriendId());
            if (friend.isEmpty()) {
                throw new NoSuchElementException("더치페이한 친구가 없어요..");
            }
            System.out.println(friend);
            responseList.add(DutchPayDetailDto.Response.builder()
                    .dutchDetailId(detail.getDutchDetailId())
                    .dutchAmount(detail.getDutchAmount())
                    .remittanceState(detail.getRemittanceState())
                    .remittanceTime(detail.getRemittanceTime())
                    .name(friend.get().getName())
                    .build());
        }
        return responseList;
    }


}
