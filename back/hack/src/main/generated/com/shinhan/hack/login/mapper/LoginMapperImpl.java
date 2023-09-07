package com.shinhan.hack.login.mapper;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-08T00:17:22+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.0.1 (Oracle Corporation)"
)
@Component
public class LoginMapperImpl implements LoginMapper {

    @Override
    public StudentDto.Response toResponseDto(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentDto.Response.ResponseBuilder response = StudentDto.Response.builder();

        response.studentId( student.getStudentId() );
        response.bankNumber( student.getBankNumber() );
        response.balance( student.getBalance() );
        response.phoneId( student.getPhoneId() );

        return response.build();
    }
}
