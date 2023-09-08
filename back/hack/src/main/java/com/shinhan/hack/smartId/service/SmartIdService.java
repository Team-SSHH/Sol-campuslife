package com.shinhan.hack.smartId.service;

import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.smartId.dto.SmartIdDto;
import com.shinhan.hack.smartId.entity.SmartId;
import com.shinhan.hack.smartId.repository.SmartIdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmartIdService {
    private final SmartIdRepository smartIdRepository;

    public SmartId getSmartId(Long studentId) {
        Student student = new Student();
        student.setStudentId(studentId);
        return smartIdRepository.findByStudent(student);
    }
}
