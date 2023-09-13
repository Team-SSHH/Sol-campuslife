package com.shinhan.hack.remittance.controller;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.remittance.dto.DutchPayDetailDto;
import com.shinhan.hack.remittance.dto.DutchPayDto;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.entity.DutchPayDetail;
import com.shinhan.hack.remittance.mapper.RemittanceMapper;
import com.shinhan.hack.remittance.repository.DutchPayDetailRepository;
import com.shinhan.hack.remittance.service.RemittanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sshh/remittance")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class RemittanceController {

    private final RemittanceService remittanceService;
    private final RemittanceMapper remittanceMapper;
    private final DutchPayDetailRepository dutchPayDetailRepository;


    @PutMapping("/{studentId}/send/{friendStudentId}")
    public ResponseEntity<RemittanceDto.Response> remittance(
            @PathVariable("studentId") Long studentId,
            @PathVariable("friendStudentId") Long friendStudentId,
            @RequestBody RemittanceDto.update remittanceUpdate
    ) {
        remittanceUpdate.setStudentId(studentId);
        remittanceUpdate.setFriendId(friendStudentId);

        RemittanceDto.Response response = remittanceService.remittance(remittanceUpdate);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "아이디, 비번 확인해주세요");
    @PutMapping("/{studentId}/won1")
    public ResponseEntity<RemittanceDto.Response> won1(
            @PathVariable("studentId") Long studentId
    ){
        try {
            RemittanceDto.Response response = remittanceService.won1(studentId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{studentId}/consent")
    public ResponseEntity<DutchPayDetailDto.consent> sendDutch(
            @PathVariable("studentId") Long studentId,
            @RequestBody DutchPayDto.Post dutchPost
    ){
        dutchPost.setStudentId(studentId);

        DutchPayDetailDto.consent response = remittanceService.consentDutch(dutchPost);
        // 알림

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("{friendId}/dutch/{studentId}")
    public ResponseEntity<RemittanceDto.Response> dutchPaySend(
            @PathVariable("friendId") Long friendId,
            @PathVariable("studentId") Long studentId,
            @RequestBody DutchPayDetailDto.send sendInfo
    ){
        // 예외 처리
        DutchPayDetail detail = dutchPayDetailRepository.findByDutchIdAndFriendId(sendInfo.getDutchId(), friendId).orElseThrow(
                () -> new CustomException(ErrorCode.DUTCH_DETAIL_NOT_FOUND)
        );
        if(detail.getRemittanceState()){
            throw new CustomException(ErrorCode.ALREADY_PAY_MONEY);
        }

        sendInfo.setFriendId(friendId);
        sendInfo.setStudentId(studentId);

        // 더치페이 송금 및 거래 내역 저장
        RemittanceDto.update update = remittanceMapper.toUpdateFromSend(sendInfo);
        update.setContent("더치페이");
        update.setAmount(sendInfo.getDutchAmount());
        remittanceService.remittance(update);

        // 더치페이 상태 변경
        RemittanceDto.Response response = remittanceService.dutchSend(sendInfo);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{studentId}/dutch")
    public ResponseEntity<List<DutchPayDto.Response>> getDutchPay(
            @PathVariable("studentId") Long studentId
    ) {

        List<DutchPayDto.Response> response = remittanceMapper.toDutchResponseDto(remittanceService.dutchPay(studentId));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{studentId}/dutch/{dutchId}")
    public ResponseEntity<List<DutchPayDetailDto.Response>> getDutchPayDetail(
            @PathVariable("studentId") Long studentId,
            @PathVariable("dutchId") Long dutchId
    ){
        List<DutchPayDetailDto.Response> response = remittanceService.getDutchDetail(dutchId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{studentId}/dutchDetail")
    public ResponseEntity<List<DutchPayDetailDto.Response>> getDutchPayDetailAll(
            @PathVariable("studentId") Long studentId
    ){
        return new ResponseEntity<>(remittanceService.getDutchDetailAll(studentId), HttpStatus.OK);
    }
}
