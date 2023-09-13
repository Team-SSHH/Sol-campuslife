package com.shinhan.hack.remittance.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.repository.HistoryRepository;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import com.shinhan.hack.remittance.dto.DutchPayDetailDto;
import com.shinhan.hack.remittance.dto.DutchPayDto;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.entity.DutchPay;
import com.shinhan.hack.remittance.entity.DutchPayDetail;
import com.shinhan.hack.remittance.mapper.RemittanceMapper;
import com.shinhan.hack.remittance.repository.DutchPayDetailRepository;
import com.shinhan.hack.remittance.repository.DutchPayRepository;
import com.shinhan.hack.remittance.repository.RemittanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RemittanceService {

    private final RemittanceRepository remittanceRepository;
    private final DutchPayRepository dutchPayRepository;
    private final HistoryRepository historyRepository;
    private final LoginRepository loginRepository;
    private final DutchPayDetailRepository dutchPayDetailRepository;
    private final RemittanceMapper remittanceMapper;
    private final FirebaseMessaging firebaseMessaging;


    @Transactional
    public RemittanceDto.Response remittance(RemittanceDto.update remittanceUpdate) {
        Long studentId = remittanceUpdate.getStudentId();
        Long friendId = remittanceUpdate.getFriendId();
        Long amount = remittanceUpdate.getAmount();
        String content = remittanceUpdate.getContent();

        // 학번 존재 유무 예외 처리
        Student student = remittanceRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        Student friend = remittanceRepository.findById(friendId).orElseThrow(
                () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
        );

        // 송금
        Long myBalance = student.getBalance();
        Long friendBalance = friend.getBalance();

        // 잔고 확인 예외 처리
        if(myBalance < amount){
            throw new CustomException(ErrorCode.MEMBER_DONT_HAVE_MONEY);
        }

        // 거래 DB 저장
        remittanceRepository.send(studentId, amount);
        remittanceRepository.receive(friendId, amount);

        // 학생 잔고 update
        student.setBalance(myBalance - amount);
        friend.setBalance(friendBalance + amount);

        // 거래내역 추가
        History myHistory = History.builder()
                .balance(myBalance - amount)
                .content(content)
                .contentCategory("계좌이체")
                .pay(amount)
                .deposit(Long.valueOf(0))
                .student(Student.builder().studentId(studentId).build())
                .build();

        History fHistory = History.builder()
                .balance(friendBalance + amount)
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
                .phoneId(student.getPhoneId())
                .balance(student.getBalance())
                .friendPhoneId(friend.getPhoneId())
                .friendBalance(friend.getBalance())
                .content(content)
                .amount(amount)
                .build();

        return response;
    }

    @Transactional
    public RemittanceDto.Response won1(Long studentId) {
        Optional<Student> user = loginRepository.findStudentByStudentId(studentId);
        Long amount = Long.valueOf(1);
        int num = new Random().nextInt(9000) + 1000;
        String content = "인증번호 : " + String.valueOf(num);
        String randomNumberString = Integer.toString(num);
        String studentIdString = studentId.toString();

        if (user.isPresent()) {
            if (user.get().getToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle("친구 추가 인증")
                        .setBody(randomNumberString)
                        .build();

                Message message = Message.builder()
                        .setToken(user.get().getToken())
                        .setNotification(notification)
                        .putData("click_action", "OPEN_MAIN_PAGE")
                        .build();  // Message 객체 생성을 완료합니다.

                try {
                    firebaseMessaging.send(message);

                    // 송금
                    remittanceRepository.receive(studentId, amount);
                    Student student = remittanceRepository.findById(studentId).orElseThrow(
                            () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
                    );

                    // 거래내역 추가
                    History history = History.builder()
                            .balance(student.getBalance())
                            .content(content)
                            .contentCategory("1원 이체")
                            .pay(Long.valueOf(0))
                            .deposit(amount)
                            .student(Student.builder().studentId(studentId).build())
                            .build();

                    historyRepository.save(history);

                    // 정보 반환
                    RemittanceDto.Response response = RemittanceDto.Response.builder()
                            .phoneId(student.getPhoneId())
                            .balance(student.getBalance())
                            .content(content)
                            .amount(amount)
                            .build();

                    return response;
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();

                    return RemittanceDto.Response.builder()
                            .phoneId("실패")
                            .balance(Long.valueOf(123))
                            .content("알림 보내기 실패")
                            .amount(Long.valueOf(123))
                            .build();
                }
            } else {
                return RemittanceDto.Response.builder()
                        .phoneId("실패")
                        .balance(Long.valueOf(123))
                        .content("서버에 해당 유저의 토큰이 존재하지 않습니다")
                        .amount(Long.valueOf(123))
                        .build();
            }
        } else {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }
    }


    @Transactional
    public DutchPayDetailDto.consent consentDutch(
            DutchPayDto.Post dutchPost
    ) {
        // 더치페이 테이블에 저장
        Long number = Long.valueOf(dutchPost.getFriendList().size() + 1);
        Long studentId = dutchPost.getStudentId();

        // 예외 처리
        Student student = loginRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        DutchPay dutchpay = DutchPay.builder()
                .amount(dutchPost.getAmount())
                .number(number)
                .student(student)
                .build();

        dutchPayRepository.save(dutchpay);

        // 더치페이 디테일 테이블에 저장
        Long dutchAmount = dutchpay.getAmount() / number;
        List<Student> friendList = new ArrayList<>();

        for (Long friendsId : dutchPost.getFriendList()
        ) {
            Student friend = loginRepository.findById(friendsId).orElseThrow(
                    () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
            );

            // 알림 푸시 설정
            Notification notification = Notification.builder()
                    .setTitle("더치페이 요청")
                    .setBody("더치페이 해주세요")
                    .build();

            Message message = Message.builder()
                    .setToken(friend.getToken())  // 친구의 FCM 토큰 설정
                    .setNotification(notification)
                    .putData("click_action", "OPEN_DUTCHPAY_PAGE")  // 클릭 동작 설정
                    .build();
            try {
                firebaseMessaging.send(message);

                dutchPayDetailRepository.save(DutchPayDetail.builder()
                        .dutchPay(dutchpay)
                        .dutchAmount(dutchAmount)
                        .friendId(friendsId)
                        .build());
                friendList.add(friend);

                String studentName = student.getName();
                Long dutchId = dutchpay.getDutchId();

                return DutchPayDetailDto.consent.builder()
                        .amount(dutchPost.getAmount())
                        .dutchAmount(dutchAmount)
                        .frindList(friendList)
                        .content("더치페이 해주세요")
                        .studentName(studentName)
                        .dutchId(dutchId)
                        .build();
            } catch (FirebaseMessagingException e) {
                throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
            }

        }
        throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
    }

    @Transactional
    public RemittanceDto.Response dutchSend(DutchPayDetailDto.send sendInfo) {
        Long studentId = sendInfo.getStudentId();
        Long friendId = sendInfo.getFriendId();
        Long dutchId = sendInfo.getDutchId();

        if(dutchPayRepository.findByDutchId(dutchId).size() == 0){
            throw new CustomException(ErrorCode.DUTCH_DETAIL_NOT_FOUND);
        }

        Student student = loginRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        Student friend = loginRepository.findById(friendId).orElseThrow(
                () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
        );

        // 디테일에 상태 변경
        dutchPayDetailRepository.dutchDetailStateUpdate(friendId, dutchId);
        dutchPayDetailRepository.dutchDetailTimeUpdate(friendId, dutchId, LocalDateTime.now());

        // 디테일 조회 후 더치페이 상태 변화
        List<DutchPayDetail> dutchPayList = dutchPayRepository.findByDutchId(dutchId);
        boolean state = true;
        for (DutchPayDetail dutchDetail:dutchPayList
             ) {
            if(!dutchDetail.getRemittanceState()){
                state = false;
                break;
            }
        }
        dutchPayRepository.stateUpdate(dutchId, state);

        RemittanceDto.Response response = remittanceMapper.toResponseDto(student);
        response.setContent("더치페이");
        response.setAmount(sendInfo.getDutchAmount());

        return response;
    }

    public List<DutchPay> dutchPay(Long studentId) {
        List<DutchPay> dutchPayList = dutchPayRepository.findByStudentId(studentId);
        return dutchPayList;
    }

    public List<DutchPayDetailDto.Response> getDutchDetail(Long dutchId){

        // 더치페이 상세 내역 확인 예외 처리
        List<DutchPayDetail> dutchPayDetails = dutchPayRepository.findByDutchId(dutchId);

        if (dutchPayDetails.isEmpty()) {
            throw new CustomException(ErrorCode.DUTCH_DETAIL_NOT_FOUND);
        }

        List<DutchPayDetailDto.Response> responseList = new ArrayList<>();

        for (DutchPayDetail detail: dutchPayDetails
             ) {
            // 친구 없을 경우 예외처리
            Student friend = loginRepository.findById(detail.getFriendId()).orElseThrow(
                    () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
            );

            DutchPayDetailDto.Response response = remittanceMapper.toDetailResponseDto(detail);
            response.setName(friend.getName());
            response.setFriendId(friend.getStudentId());
            responseList.add(response);
        }
        return responseList;
    }


    public List<DutchPayDetailDto.Response> getDutchDetailAll(Long studentId) {
        loginRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        List<DutchPayDetail> dutchPayDetails = dutchPayDetailRepository.findByFriendId(studentId);

        if (dutchPayDetails.isEmpty()) {
            throw new CustomException(ErrorCode.DUTCH_DETAIL_NOT_FOUND);
        }

        List<DutchPayDetailDto.Response> responseList = new ArrayList<>();

        for (DutchPayDetail detail: dutchPayDetails
        ) {
            // 친구 없을 경우 예외처리
            Student friend = loginRepository.findById(detail.getDutchPay().getStudent().getStudentId()).orElseThrow(
                    () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
            );

            DutchPayDetailDto.Response response = remittanceMapper.toDetailResponseDto(detail);
            response.setName(friend.getName());
            response.setFriendId(friend.getStudentId());
            responseList.add(response);
        }

        return responseList;
    }
}
