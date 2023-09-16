package com.shinhan.hack.login.mapper;

import com.shinhan.hack.login.dto.StudentCategoryDto;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-17T00:37:13+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 11.0.0.1 (Oracle Corporation)"
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
        response.name( student.getName() );
        response.university( student.getUniversity() );
        response.major( student.getMajor() );
        response.grade( student.getGrade() );
        response.gender( student.getGender() );
        response.nationality( student.getNationality() );
        response.bankNumber( student.getBankNumber() );
        response.balance( student.getBalance() );
        response.phoneId( student.getPhoneId() );
        response.imageUrl( student.getImageUrl() );
        response.locationState( student.getLocationState() );

        return response.build();
    }

    @Override
    public StudentCategoryDto.Response toCategoryResponseDto(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentCategoryDto.Response.ResponseBuilder response = StudentCategoryDto.Response.builder();

        response.studentId( student.getStudentId() );
        response.name( student.getName() );
        response.university( student.getUniversity() );
        response.major( student.getMajor() );
        response.grade( student.getGrade() );
        response.gender( student.getGender() );
        response.nationality( student.getNationality() );
        response.bankNumber( student.getBankNumber() );
        response.balance( student.getBalance() );
        response.phoneId( student.getPhoneId() );
        response.imageUrl( student.getImageUrl() );

        return response.build();
    }
}
