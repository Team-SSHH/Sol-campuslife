package com.shinhan.hack.history.controller;

import com.shinhan.hack.history.dto.HistoryDto;
import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sshh")
@RequiredArgsConstructor
public class HistoryController {
    private final HistoryService historyService;

    @GetMapping("/history")
    public ResponseEntity<List<HistoryDto.Response>> getAllHistory() {
        List<HistoryDto.Response> responses = historyService.getAllHistory();
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

//    @GetMapping("/history/{student-id}")
//    public ResponseEntity<List<HistoryDto.Response>> getMyHistory(@PathVariable("student-id") int studentId) {
//        List<HistoryDto.Response> responses = historyService.getMyHistory(studentId);
//        return new ResponseEntity<>(responses, HttpStatus.OK);
//    }
}
