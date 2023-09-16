package com.shinhan.hack.Location.mapper;

import com.shinhan.hack.Location.dto.LocationDto;
import com.shinhan.hack.login.entity.Student;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-17T00:37:13+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 11.0.0.1 (Oracle Corporation)"
)
@Component
public class LocationMapperImpl implements LocationMapper {

    @Override
    public LocationDto.friend toResponse(Student student) {
        if ( student == null ) {
            return null;
        }

        LocationDto.friend.friendBuilder friend = LocationDto.friend.builder();

        friend.studentId( student.getStudentId() );
        friend.name( student.getName() );
        friend.university( student.getUniversity() );
        friend.major( student.getMajor() );
        friend.grade( student.getGrade() );
        friend.gender( student.getGender() );
        friend.nationality( student.getNationality() );
        friend.bankNumber( student.getBankNumber() );
        friend.balance( student.getBalance() );
        friend.phoneId( student.getPhoneId() );
        friend.imageUrl( student.getImageUrl() );

        return friend.build();
    }
}
