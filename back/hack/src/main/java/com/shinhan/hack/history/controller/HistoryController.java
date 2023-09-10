package com.shinhan.hack.history.controller;

import com.shinhan.hack.history.dto.HistoryDto;
import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.history.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sshh")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class HistoryController {
    private final HistoryService historyService;

    @GetMapping("/history")
    public ResponseEntity<List<HistoryDto.Response>> getAllHistory() {
        List<HistoryDto.Response> responses = historyService.getAllHistory();
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @GetMapping("/history/{studentId}")
    public ResponseEntity<List<HistoryDto.Response>> getMyHistory(@PathVariable Long studentId) {
        List<HistoryDto.Response> responses = historyService.getMyHistory(studentId);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
