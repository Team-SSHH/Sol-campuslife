package com.shinhan.hack.smartId.mapper;

import com.shinhan.hack.smartId.dto.SmartIdDto;
import com.shinhan.hack.smartId.entity.SmartId;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-08T22:44:08+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.17 (Oracle Corporation)"
)
@Component
public class SmartIdMapperImpl implements SmartIdMapper {

    @Override
    public SmartIdDto.Response toResponseDto(SmartId smartId) {
        if ( smartId == null ) {
            return null;
        }

        SmartIdDto.Response.ResponseBuilder response = SmartIdDto.Response.builder();

        response.cardId( smartId.getCardId() );
        response.student( smartId.getStudent() );
        response.university( smartId.getUniversity() );
        response.major( smartId.getMajor() );
        response.grade( smartId.getGrade() );
        response.gender( smartId.getGender() );
        response.nationality( smartId.getNationality() );

        return response.build();
    }
}
