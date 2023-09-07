package com.shinhan.hack.history.controller;

import com.shinhan.hack.history.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sshh")
@RequiredArgsConstructor
public class HistoryController {
    private final HistoryService historyService;

//    @GetMapping("/history")
//    public ResponseEntity<BooksResponse> getBooksOfMember(@PathVariable(value = "member-id") long memberId){
//
//        List<BooksDto.Response> booksResponseDtos = fishMapper.toBooksResponseDtos(fishService.readBooksOfMember(memberId));
//
//        BooksResponse responses = new BooksResponse(booksResponseDtos,fishService.checkCaughtFish(memberId));
//
//        // DB에 딕셔너리가 id 순으로 차곡차곡 쌓여있을텐데 과연 이렇게 처리해야할까?
//        return new ResponseEntity<>(responses,HttpStatus.OK);
//    }
}
