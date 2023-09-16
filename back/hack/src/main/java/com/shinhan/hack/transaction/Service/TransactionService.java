package com.shinhan.hack.transaction.Service;

import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.service.HistoryService;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import com.shinhan.hack.transaction.Dto.DataBody;
import com.shinhan.hack.transaction.Dto.DataHeader;
import com.shinhan.hack.transaction.Dto.RequestData;
import com.shinhan.hack.transaction.Dto.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class TransactionService {

    private final LoginRepository studentRepository;
    private final HistoryService historyService;

    @Autowired
    public TransactionService(LoginRepository studentRepository, HistoryService historyService) {
        this.studentRepository = studentRepository;
        this.historyService = historyService;
    }

    public ResponseData getTransactionData(Long studentId) {
        // 학생 ID로 학생 정보 조회
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("No such student with id: " + studentId));

        return getTransactionDataForStudent(student);
    }

    public List<ResponseData> getAllStudentsTransactionData() {
        List<Student> students = (List<Student>)studentRepository.findAll();

        List<ResponseData> allStudentsResponseData = new ArrayList<>();

        for(Student s : students){
            ResponseData responseData = getTransactionDataForStudent(s);
            allStudentsResponseData.add(responseData);
        }

        return allStudentsResponseData;
    }

    private ResponseData getTransactionDataForStudent(Student student){

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        RequestData requestData = new RequestData();
        requestData.setDataHeader(new DataHeader("2023_Shinhan_SSAFY_Hackathon"));

        // 학생의 계좌번호로 DataBody 생성
        requestData.setDataBody(new DataBody(String.valueOf(student.getBankNumber())));

        HttpEntity<RequestData> entity = new HttpEntity<>(requestData, headers);

        ResponseEntity<ResponseData> responseEntity =
                restTemplate.exchange(
                        "https://shbhack.shinhan.com/v1/search/transaction",
                        HttpMethod.POST,
                        entity,
                        ResponseData.class);

        if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
            List<ResponseData.Transaction> transactions = responseEntity.getBody().getDataBody().getTransactions();
            for (ResponseData.Transaction transaction : transactions) {
                System.out.println(transaction.getContent());
                String transactionDateTimeStr = transaction.getTransactionDate() + transaction.getTransactionTime() ;
                // 이를 LocalDateTime 객체로 변환합니다.
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
                LocalDateTime transactionDateTime = LocalDateTime.parse(transactionDateTimeStr, formatter);

                History history = new History();
                history.setContent(transaction.getContent());
                history.setBalance(Long.parseLong(transaction.getBalance()));
                history.setTransactionTime(transactionDateTime);

                historyService.updateHistoryWithKakaoLocalAPI(history);
            }
            return responseEntity.getBody();
        } else {
            throw new RuntimeException("Failed to get transaction data");
        }
    }
}
