package com.shinhan.hack.freinds.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sshh/freinds")
@RequiredArgsConstructor
public class FreindsController {

    @GetMapping("/{studentId}/kkk/{hi}")
    public String abc(@PathVariable("studentId") String studentId, @PathVariable("hi") String hi) {
        return studentId + hi;
    }
}
