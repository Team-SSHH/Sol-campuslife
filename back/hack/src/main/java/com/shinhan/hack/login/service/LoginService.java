package com.shinhan.hack.login.service;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginRepository loginRepository;

    public Student login(StudentDto.Post student) {
        Student response = loginRepository.findStudentByStudentIdAndPassword(student.getStudentId(), student.getPassword()).orElseThrow(
                () -> new CustomException(ErrorCode.LOGIN_FAIL)
        );
        return response;
    }
}
