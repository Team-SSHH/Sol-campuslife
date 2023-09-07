package com.shinhan.hack.login.service;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginRepository loginRepository;

    public Student login(StudentDto.Post student){
        System.out.println(1);
        Integer studentId = student.getStudentId();
        String password = student.getPassword();
        System.out.println(studentId);
        System.out.println(password);
        Student response = loginRepository.findStudentByStudentIdAndPassword(studentId, password);
        System.out.println(response);
        return  response;
    }

}
